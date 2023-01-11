import * as DynamoDB from 'aws-sdk/clients/dynamodb';

export interface SongData {
  name: string;
  artist: string;
  genre: string;
  url: string;
}

export interface CreatePlaylistPayload {
  name: string;
  description: string;
  songs: [SongData];
}

export interface UpdatePlaylistPayload {
  id: string;
  name: string;
  description: string;
  songs: [SongData];
  createdAt: string;
}

export interface PlaylistData {
  id: string;
  name: string;
  description: string;
  songs: [SongData];
  createdAt: string;
  updatedAt: string;
}

export interface Config {
  playlistTableName: string
}

export interface PlaylistRepositoryDependencies {
  dynamoDbClient: DynamoDB.DocumentClient;
  config: Config;
}

export interface IPlaylistRepository {
  createPlaylist(payload: CreatePlaylistPayload): Promise<PlaylistData>
  getPlaylistById(id: string): Promise<PlaylistData>
  getAllPlaylists(): Promise<PlaylistData[]>
  deletePlaylistById(id: string): Promise<void>
  updatePlaylistById(payload: UpdatePlaylistPayload): Promise<PlaylistData>
}
