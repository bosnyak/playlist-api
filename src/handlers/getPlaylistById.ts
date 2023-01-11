import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import {
  successResponse, badRequestResponse, notFoundResponse, unexpectedErrorResponse,
} from '../helpers/responses';
import { DefaultHandlerDependencies } from '../types';

export default class GetPlaylistByIdHandler {
  playlistRepository;

  constructor({ playlistRepository }: DefaultHandlerDependencies) {
    this.playlistRepository = playlistRepository;
  }

  async handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const id = event.pathParameters?.id;
      if (!id) {
        return badRequestResponse('Invalid playlist id');
      }

      const playlist = await this.playlistRepository.getPlaylistById(id);

      if (!playlist) {
        return notFoundResponse('Playlist not found');
      }

      return successResponse({
        body: { playlist },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Failed to get playlist (${err.message})`);
      }
      return unexpectedErrorResponse();
    }
  }
}
