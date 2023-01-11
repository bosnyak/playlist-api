import { expect } from 'chai';
import {
  createPlaylistHandler,
} from '../../../handlers';

describe('Handlers', () => {
  context('handlers function', () => {
    it('should instantiate all handlers successfully', async () => {
      expect(createPlaylistHandler).to.be.a('function');
    });
  });
});
