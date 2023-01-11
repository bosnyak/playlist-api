import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { playlistSchema } from '../validation';
import { badRequestResponse, successResponse, unexpectedErrorResponse } from '../helpers/responses';
import { DefaultHandlerDependencies, CreatePlaylistPayload } from '../types';

export default class CreatePlaylistHandler {
  playlistRepository;

  constructor({ playlistRepository }: DefaultHandlerDependencies) {
    this.playlistRepository = playlistRepository;
  }

  async handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      if (!event.body) {
        return badRequestResponse('Body should not be empty');
      }
      const payload: CreatePlaylistPayload = JSON.parse(event.body);
      const { error } = playlistSchema.validate(payload);

      if (error) {
        return badRequestResponse(error.message);
      }

      const playlist = await this.playlistRepository.createPlaylist(payload);

      return successResponse({
        body: { playlist },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Failed to create playlist (${err.message})`);
      }
      return unexpectedErrorResponse();
    }
  }
}
