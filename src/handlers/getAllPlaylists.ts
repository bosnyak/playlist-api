import { APIGatewayProxyResult } from 'aws-lambda';
import { successResponse, unexpectedErrorResponse } from '../helpers/responses';
import { DefaultHandlerDependencies } from '../types';

export default class GetPlaylistByIdHandler {
  playlistRepository;

  constructor({ playlistRepository }: DefaultHandlerDependencies) {
    this.playlistRepository = playlistRepository;
  }

  async handler(): Promise<APIGatewayProxyResult> {
    try {
      const playlists = await this.playlistRepository.getAllPlaylists();

      return successResponse({
        body: { playlists },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Failed to get all playlists (${err.message})`);
      }
      return unexpectedErrorResponse();
    }
  }
}
