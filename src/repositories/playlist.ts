import { v4 as uuidv4 } from 'uuid';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import {
  PlaylistData,
  PlaylistRepositoryDependencies,
  IPlaylistRepository,
  CreatePlaylistPayload,
  UpdatePlaylistPayload,
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

  async getPlaylistById(id: string) {
    try {
      const doc = await this.dynamoDbClient.get({
        TableName: this.config.playlistTableName,
        Key: { id },
      }).promise();

      return doc.Item as PlaylistData;
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Failed to get playlist data from database (${err.message})`);
      }
      throw err;
    }
  }

  async getAllPlaylists() {
    try {
      const playlists: PlaylistData[] = [];
      let docs;

      const params: DocumentClient.ScanInput = {
        TableName: this.config.playlistTableName,
      };
      do {
        // eslint-disable-next-line no-await-in-loop
        docs = await this.dynamoDbClient.scan(params).promise();
        if (!docs.Items) {
          return [];
        }
        docs.Items.forEach((item) => playlists.push(item as PlaylistData));
        params.ExclusiveStartKey = docs.LastEvaluatedKey;
      } while (typeof docs.LastEvaluatedKey !== 'undefined');

      return playlists;
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Failed to get all playlists data from database (${err.message})`);
      }
      throw err;
    }
  }

  async deletePlaylistById(id: string) {
    try {
      await this.dynamoDbClient.delete({
        TableName: this.config.playlistTableName,
        Key: { id },
      }).promise();
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Failed to delete playlist data from database (${err.message})`);
      }
      throw err;
    }
  }

  async updatePlaylistById(payload: UpdatePlaylistPayload) {
    try {
      const playlist: PlaylistData = {
        ...payload,
        updatedAt: new Date().toISOString(),
      };
      await this.dynamoDbClient.put({
        TableName: this.config.playlistTableName,
        Item: playlist,
      }).promise();

      return playlist;
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Failed to update playlist data into database (${err.message})`);
      }
      throw err;
    }
  }
}
