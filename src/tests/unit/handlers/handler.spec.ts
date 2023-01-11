import { expect } from 'chai';
import {
  createPlaylistHandler,
  deletePlaylistByIdHandler,
  getAllPlaylistsHandler,
  getPlaylistByIdHandler,
} from '../../../handlers';

describe('Handlers', () => {
  context('handlers function', () => {
    it('should instantiate all handlers successfully', async () => {
      expect(createPlaylistHandler).to.be.a('function');
      expect(deletePlaylistByIdHandler).to.be.a('function');
      expect(getAllPlaylistsHandler).to.be.a('function');
      expect(getPlaylistByIdHandler).to.be.a('function');
    });
  });
});
