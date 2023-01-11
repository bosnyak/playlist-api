import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import {
  badRequestResponse, notFoundResponse, successResponse, unexpectedErrorResponse,
} from '../helpers/responses';
import { DefaultHandlerDependencies } from '../types';

export default class DeletePlaylistByIdHandler {
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

      await this.playlistRepository.deletePlaylistById(id);

      return successResponse({
        body: { message: 'Playlist deleted' },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Failed to delete playlist (${err.message})`);
      }
      return unexpectedErrorResponse();
    }
  }
}
