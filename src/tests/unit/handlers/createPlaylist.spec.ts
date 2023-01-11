import { expect } from 'chai';
import * as sinon from 'sinon';
import { APIGatewayProxyEvent } from 'aws-lambda';
import CreatePlaylistHandler from '../../../handlers/createPlaylist';
import { IPlaylistRepository } from '../../../types';

describe('Create Playlist handler', () => {
  let sut: CreatePlaylistHandler;
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  context('handler function', () => {
    it('should create a playlist successfully and return status 200', async () => {
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
      const createPlaylistMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.createPlaylist = createPlaylistMock;

      sut = new CreatePlaylistHandler({ playlistRepository });
      const body = playlist;
      const payload = {
        body: JSON.stringify(body),
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { playlist: { name } } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(200);
      expect(name).to.be.equal('cool playlist');
      expect(createPlaylistMock.calledOnce).to.be.equals(true);
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
      const createPlaylistMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.createPlaylist = createPlaylistMock;

      sut = new CreatePlaylistHandler({ playlistRepository });
      const payload = {
        body: '',
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      expect(result.statusCode).to.be.equal(400);
      expect(createPlaylistMock.calledOnce).to.be.equals(false);
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
      const createPlaylistMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.createPlaylist = createPlaylistMock;

      sut = new CreatePlaylistHandler({ playlistRepository });
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
      expect(createPlaylistMock.calledOnce).to.be.equals(false);
    });

    it('should return status code 400 when sending an empty songs list', async () => {
      const playlist = {
        name: 'cool playlist',
        description: 'cool playlist description',
        songs: [
        ],
      };
      const createPlaylistMock = sandbox.stub().returns({});
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.createPlaylist = createPlaylistMock;

      sut = new CreatePlaylistHandler({ playlistRepository });
      const body = playlist;
      const payload = {
        body: JSON.stringify(body),
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(400);
      expect(message).to.be.equal('"songs" must contain at least 1 items');
      expect(createPlaylistMock.calledOnce).to.be.equals(false);
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
      const createPlaylistMock = sandbox.stub().returns(playlist);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.createPlaylist = createPlaylistMock;

      sut = new CreatePlaylistHandler({ playlistRepository });
      const body = playlist;
      const payload = {
        body: JSON.stringify(body),
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(400);
      expect(message).to.be.equal('"songs[0].name" is required');
      expect(createPlaylistMock.calledOnce).to.be.equals(false);
    });

    it('should return status code 500 when repository fails to create a playlist', async () => {
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
      const createPlaylistMock = sandbox.stub().throws(new Error('Unexpected error'));
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.createPlaylist = createPlaylistMock;

      sut = new CreatePlaylistHandler({ playlistRepository });
      const body = playlist;
      const payload = {
        body: JSON.stringify(body),
      } as APIGatewayProxyEvent;
      const result = await sut.handler(payload);
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(500);
      expect(message).to.be.equal('Unexpected error');
      expect(createPlaylistMock.calledOnce).to.be.equals(true);
    });
  });
});
