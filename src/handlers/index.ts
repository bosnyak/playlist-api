import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import repositories from '../repositories';
import CreatePlaylistHandler from './createPlaylist';
const createPlaylistHandlerWrapper = new CreatePlaylistHandler({
  playlistRepository: repositories.playlistRepository,
});

export const createPlaylistHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => createPlaylistHandlerWrapper.handler(event);
