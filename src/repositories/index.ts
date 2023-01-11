import dynamoDbClient from '../clients/dynamodb';
import config from '../config';
import PlaylistRepository from './playlist';

const repositories = {
  playlistRepository: new PlaylistRepository({ dynamoDbClient, config }),
};

export default repositories;
