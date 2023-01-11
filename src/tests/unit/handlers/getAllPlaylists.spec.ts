import { expect } from 'chai';
import * as sinon from 'sinon';
import GetAllPlaylistsHandler from '../../../handlers/getAllPlaylists';
import { IPlaylistRepository } from '../../../types';

describe('Get All Playlists', () => {
  let sut: GetAllPlaylistsHandler;
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  context('handler function', () => {
    it('should get all playlists successfully and return status 200', async () => {
      const playlists = [{
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
      },
      {
        name: 'another cool playlist',
        description: 'another cool playlist description',
        songs: [
          {
            name: 'Never Gonna Give You Up',
            artist: 'Rick Astley',
            genre: 'Pop',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          },
        ],
      },
      ];
      const getAllPlaylistsMock = sandbox.stub().returns(playlists);
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.getAllPlaylists = getAllPlaylistsMock;

      sut = new GetAllPlaylistsHandler({ playlistRepository });
      const result = await sut.handler();
      const { playlists: playlistsResponse } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(200);
      expect(playlists).to.be.deep.equal(playlistsResponse);
      expect(getAllPlaylistsMock.calledOnce).to.be.equals(true);
    });

    it('should return status code 500 when repository fails to get all playlist', async () => {
      const getAllPlaylistsMock = sandbox.stub().throws(new Error('Unexpected error'));
      const playlistRepository = <IPlaylistRepository>{};
      playlistRepository.getAllPlaylists = getAllPlaylistsMock;

      sut = new GetAllPlaylistsHandler({ playlistRepository });
      const result = await sut.handler();
      const { message } = JSON.parse(result.body);
      expect(result.statusCode).to.be.equal(500);
      expect(message).to.be.equal('Unexpected error');
      expect(getAllPlaylistsMock.calledOnce).to.be.equals(true);
    });
  });
});
