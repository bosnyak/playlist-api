import { v4 as uuidv4 } from 'uuid';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import {
  PlaylistData,
  PlaylistRepositoryDependencies,
  IPlaylistRepository,
  CreatePlaylistPayload,
} from '../types';

export default class PlaylistRepository implements IPlaylistRepository {
  private dynamoDbClient;

  private config;

  constructor({ dynamoDbClient, config }: PlaylistRepositoryDependencies) {
    this.dynamoDbClient = dynamoDbClient;
    this.config = config;
  }

  async createPlaylist(payload: CreatePlaylistPayload) {
    try {
      const playlist: PlaylistData = {
        ...payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await this.dynamoDbClient.put({
        TableName: this.config.playlistTableName,
        Item: playlist,
      }).promise();

      return playlist;
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Failed to store playlist data into database (${err.message})`);
      }
      throw err;
    }
  }

}
