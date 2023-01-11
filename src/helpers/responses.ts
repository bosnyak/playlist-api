import { ResponseData } from '../types';

export const successResponse = (params: ResponseData) => ({
  statusCode: params.statusCode || 200,
  body: JSON.stringify(
    params.body,
  ),
});

export const badRequestResponse = (message: string) => ({
  statusCode: 400,
  body: JSON.stringify(
    { message },
  ),
});

export const notFoundResponse = (message: string) => ({
  statusCode: 404,
  body: JSON.stringify(
    { message },
  ),
});

export const unexpectedErrorResponse = () => ({
  statusCode: 500,
  body: JSON.stringify(
    { message: 'Unexpected error' },
  ),
});
