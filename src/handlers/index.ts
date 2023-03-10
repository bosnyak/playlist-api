import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import repositories from '../repositories';
import CreatePlaylistHandler from './createPlaylist';
import GetPlaylistByIdHandler from './getPlaylistById';
import GetAllPlaylistsHandler from './getAllPlaylists';
import DeletePlaylistByIdHandler from './deletePlaylistById';
import UpdatePlaylistByIdHandler from './updatePlaylistById';

const createPlaylistHandlerWrapper = new CreatePlaylistHandler({
  playlistRepository: repositories.playlistRepository,
});

const getPlaylistByIdHandlerWrapper = new GetPlaylistByIdHandler({
  playlistRepository: repositories.playlistRepository,
});

const getAllPlaylistsHandlerWrapper = new GetAllPlaylistsHandler({
  playlistRepository: repositories.playlistRepository,
});

const deletePlaylistByIdHandlerWrapper = new DeletePlaylistByIdHandler({
  playlistRepository: repositories.playlistRepository,
});

const updatePlaylistByIdHandlerWrapper = new UpdatePlaylistByIdHandler({
  playlistRepository: repositories.playlistRepository,
});

export const createPlaylistHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => createPlaylistHandlerWrapper.handler(event);

export const getPlaylistByIdHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => getPlaylistByIdHandlerWrapper.handler(event);

export const getAllPlaylistsHandler:
  APIGatewayProxyHandler = async () => getAllPlaylistsHandlerWrapper.handler();

export const deletePlaylistByIdHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => deletePlaylistByIdHandlerWrapper.handler(event);

export const updatePlaylistByIdHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
) => updatePlaylistByIdHandlerWrapper.handler(event);
