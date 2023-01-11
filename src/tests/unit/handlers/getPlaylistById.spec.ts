import { expect } from 'chai';
import * as sinon from 'sinon';
import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters } from 'aws-lambda';
import GetPlaylistByIdHandler from '../../../handlers/getPlaylistById';
import { IPlaylistRepository } from '../../../types';

describe('Get Playlist by ID handler', () => {
  let sut: GetPlaylistByIdHandler;
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  context('handler function', () => {
    it('should get a playlist by id successfully and return status 200', async () => {
      const playlist = {
        id: 'valid_id',
        name: 'cool playlist',
        description: 'cool playlist description',
        songs: [
          {
            name: 'Sandstorm',
            artist: 'Darude',
            genre: 'EDM',
            url: 'https://www.youtube.com/watch?v=y6120QOlsfU',
          },
        ],
      };
      const getPlaylistByIdMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new GetPlaylistByIdHandler({ playlistRepository });
      const payload = {
        pathParameters: <APIGatewayProxyEventPathParameters>{
          id: 'valid_id',
        },
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { playlist: playlistResponse } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(200);
      expect(playlist).to.be.deep.equal(playlistResponse);
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(true);
    });

    it('should return status code 400 when not sending an id', async () => {
      const playlist = {
        id: 'valid_id',
        name: 'cool playlist',
        description: 'cool playlist description',
        songs: [
          {
            name: 'Sandstorm',
            artist: 'Darude',
            genre: 'EDM',
            url: 'https://www.youtube.com/watch?v=y6120QOlsfU',
          },
        ],
      };
      const getPlaylistByIdMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new GetPlaylistByIdHandler({ playlistRepository });
      const payload = {} as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(400);
      expect(message).to.be.equal('Invalid playlist id');
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(false);
    });

    it('should return status code 404 when playlist not found', async () => {
      const getPlaylistByIdMock = sandbox.stub().returns(null);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new GetPlaylistByIdHandler({ playlistRepository });
      const payload = {
        pathParameters: <APIGatewayProxyEventPathParameters>{
          id: 'not_found_id',
        },
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(404);
      expect(message).to.be.equal('Playlist not found');
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(true);
    });

    it('should return status code 500 when repository fails to get a playlist', async () => {
      const getPlaylistByIdMock = sandbox.stub().throws(new Error('Unexpected error'));
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new GetPlaylistByIdHandler({ playlistRepository });
      const payload = {
        pathParameters: <APIGatewayProxyEventPathParameters>{
          id: 'not_found_id',
        },
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(500);
      expect(message).to.be.equal('Unexpected error');
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(true);
    });
  });
});
