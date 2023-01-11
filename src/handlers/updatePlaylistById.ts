import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { playlistSchema } from '../validation';
import {
  badRequestResponse, notFoundResponse, successResponse, unexpectedErrorResponse,
} from '../helpers/responses';
import { DefaultHandlerDependencies, CreatePlaylistPayload } from '../types';

export default class UpdatePlaylistHandler {
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

      const id = event.pathParameters?.id;
      if (!id) {
        return badRequestResponse('Invalid playlist id');
      }

      const playlistFound = await this.playlistRepository.getPlaylistById(id);

      if (!playlistFound) {
        return notFoundResponse('Playlist not found');
      }

      const playlist = await this.playlistRepository.updatePlaylistById({
        ...payload,
        id,
        createdAt: playlistFound.createdAt,
      });

      return successResponse({
        body: { playlist },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Failed to update playlist (${err.message})`);
      }
      return unexpectedErrorResponse();
    }
  }
}
