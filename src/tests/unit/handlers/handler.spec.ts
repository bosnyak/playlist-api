import { expect } from 'chai';
import {
  createPlaylistHandler,
  getAllPlaylistsHandler,
} from '../../../handlers';

describe('Handlers', () => {
  context('handlers function', () => {
    it('should instantiate all handlers successfully', async () => {
      expect(createPlaylistHandler).to.be.a('function');
      expect(getAllPlaylistsHandler).to.be.a('function');
    });
  });
});
