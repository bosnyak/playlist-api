import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import repositories from '../repositories';
import CreatePlaylistHandler from './createPlaylist';
import GetAllPlaylistsHandler from './getAllPlaylists';
const createPlaylistHandlerWrapper = new CreatePlaylistHandler({
  playlistRepository: repositories.playlistRepository,
});

const getAllPlaylistsHandlerWrapper = new GetAllPlaylistsHandler({
  playlistRepository: repositories.playlistRepository,
});
export const createPlaylistHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => createPlaylistHandlerWrapper.handler(event);

export const getAllPlaylistsHandler:
  APIGatewayProxyHandler = async () => getAllPlaylistsHandlerWrapper.handler();
