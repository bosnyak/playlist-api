import { v4 as uuidv4 } from 'uuid';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import {
  PlaylistRepositoryDependencies,
  IPlaylistRepository,
} from '../types';

export default class PlaylistRepository implements IPlaylistRepository {
  private dynamoDbClient;

  private config;

  constructor({ dynamoDbClient, config }: PlaylistRepositoryDependencies) {
    this.dynamoDbClient = dynamoDbClient;
    this.config = config;
  }

}
