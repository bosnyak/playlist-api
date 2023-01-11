import { expect } from 'chai';
import * as sinon from 'sinon';
import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters } from 'aws-lambda';
import UpdatePlaylistByIdHandler from '../../../handlers/updatePlaylistById';
import { IPlaylistRepository } from '../../../types';

describe('Update Playlist by ID handler', () => {
  let sut: UpdatePlaylistByIdHandler;
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  context('handler function', () => {
    it('should update a playlist by id successfully and return status 200', async () => {
      const playlist = {
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
      const updatePlaylistByIdMock = sandbox.stub().returns(playlist);
      const getPlaylistByIdMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.updatePlaylistById = updatePlaylistByIdMock;
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new UpdatePlaylistByIdHandler({ playlistRepository });
      const body = playlist;
      const payload = {
        body: JSON.stringify(body),
        pathParameters: <APIGatewayProxyEventPathParameters>{
          id: 'valid_id',
        },
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      console.log(result.body);
      const { playlist: playlistResponse } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(200);
      expect(playlist).to.be.deep.equal(playlistResponse);
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(true);
      expect(updatePlaylistByIdMock.calledOnce).to.be.equals(true);
    });

    it('should return status code 400 when not sending an id', async () => {
      const playlist = {
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
      const updatePlaylistByIdMock = sandbox.stub().returns({});
      const getPlaylistByIdMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.updatePlaylistById = updatePlaylistByIdMock;
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new UpdatePlaylistByIdHandler({ playlistRepository });
      const body = playlist;
      const payload = {
        body: JSON.stringify(body),
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(400);
      expect(message).to.be.equal('Invalid playlist id');
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(false);
      expect(updatePlaylistByIdMock.calledOnce).to.be.equals(false);
    });

    it('should return status code 400 when sending a empty body', async () => {
      const playlist = {
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
      const updatePlaylistByIdMock = sandbox.stub().returns({});
      const getPlaylistByIdMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.updatePlaylistById = updatePlaylistByIdMock;
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new UpdatePlaylistByIdHandler({ playlistRepository });
      const payload = {
        body: '',
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      expect(result.statusCode).to.be.equal(400);
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(false);
      expect(updatePlaylistByIdMock.calledOnce).to.be.equals(false);
    });

    it('should return status code 400 when sending name field is missing', async () => {
      const playlist = {
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
      const updatePlaylistByIdMock = sandbox.stub().returns({});
      const getPlaylistByIdMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.updatePlaylistById = updatePlaylistByIdMock;
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new UpdatePlaylistByIdHandler({ playlistRepository });
      const body = {
        invalid_field: true,
      };
      const payload = {
        body: JSON.stringify(body),
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(400);
      expect(message).to.be.equal('"name" is required');
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(false);
      expect(updatePlaylistByIdMock.calledOnce).to.be.equals(false);
    });

    it('should return status code 400 when sending an empty songs list', async () => {
      const playlist = {
        name: 'cool playlist',
        description: 'cool playlist description',
        songs: [
        ],
      };
      const updatePlaylistByIdMock = sandbox.stub().returns({});
      const getPlaylistByIdMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.updatePlaylistById = updatePlaylistByIdMock;
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new UpdatePlaylistByIdHandler({ playlistRepository });
      const body = playlist;
      const payload = {
        body: JSON.stringify(body),
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(400);
      expect(message).to.be.equal('"songs" must contain at least 1 items');
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(false);
      expect(updatePlaylistByIdMock.calledOnce).to.be.equals(false);
    });

    it('should return status code 400 when sending a songs without name', async () => {
      const playlist = {
        name: 'cool playlist',
        description: 'cool playlist description',
        songs: [
          {
            artist: 'Darude',
            genre: 'EDM',
            url: 'https://www.youtube.com/watch?v=y6120QOlsfU',
          },
        ],
      };
      const updatePlaylistByIdMock = sandbox.stub().returns({});
      const getPlaylistByIdMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.updatePlaylistById = updatePlaylistByIdMock;
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new UpdatePlaylistByIdHandler({ playlistRepository });
      const body = playlist;
      const payload = {
        body: JSON.stringify(body),
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(400);
      expect(message).to.be.equal('"songs[0].name" is required');
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(false);
      expect(updatePlaylistByIdMock.calledOnce).to.be.equals(false);
    });

    it('should return status code 404 when playlist not found', async () => {
      const playlist = {
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
      const updatePlaylistByIdMock = sandbox.stub().returns({});
      const getPlaylistByIdMock = sandbox.stub().returns(null);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.updatePlaylistById = updatePlaylistByIdMock;
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new UpdatePlaylistByIdHandler({ playlistRepository });
      const body = playlist;
      const payload = {
        body: JSON.stringify(body),
        pathParameters: <APIGatewayProxyEventPathParameters>{
          id: 'not_found_id',
        },
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(404);
      expect(message).to.be.equal('Playlist not found');
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(true);
      expect(updatePlaylistByIdMock.calledOnce).to.be.equals(false);
    });

    it('should return status code 500 when repository fails to get a playlist', async () => {
      const playlist = {
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
      const updatePlaylistByIdMock = sandbox.stub().returns({});
      const getPlaylistByIdMock = sandbox.stub().throws(new Error('Unexpected error'));
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.updatePlaylistById = updatePlaylistByIdMock;
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new UpdatePlaylistByIdHandler({ playlistRepository });
      const body = playlist;
      const payload = {
        body: JSON.stringify(body),
        pathParameters: <APIGatewayProxyEventPathParameters>{
          id: 'valid_id',
        },
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(500);
      expect(message).to.be.equal('Unexpected error');
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(true);
      expect(updatePlaylistByIdMock.calledOnce).to.be.equals(false);
    });

    it('should return status code 500 when repository fails to update a playlist', async () => {
      const playlist = {
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
      const updatePlaylistByIdMock = sandbox.stub().throws(new Error('Unexpected error'));
      const getPlaylistByIdMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.updatePlaylistById = updatePlaylistByIdMock;
      playlistRepository.getPlaylistById = getPlaylistByIdMock;

      sut = new UpdatePlaylistByIdHandler({ playlistRepository });
      const body = playlist;
      const payload = {
        body: JSON.stringify(body),
        pathParameters: <APIGatewayProxyEventPathParameters>{
          id: 'valid_id',
        },
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(500);
      expect(message).to.be.equal('Unexpected error');
      expect(getPlaylistByIdMock.calledOnce).to.be.equals(true);
      expect(updatePlaylistByIdMock.calledOnce).to.be.equals(true);
    });
  });
});
