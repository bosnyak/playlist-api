import * as DynamoDB from 'aws-sdk/clients/dynamodb';


export interface Config {
  playlistTableName: string
}

export interface PlaylistRepositoryDependencies {
  dynamoDbClient: DynamoDB.DocumentClient;
  config: Config;
}

export interface IPlaylistRepository {
}
