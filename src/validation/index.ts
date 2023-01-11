import * as Joi from 'joi';

export const songsSchema = Joi.object({
  name: Joi.string().required(),
  artist: Joi.string().optional(),
  genre: Joi.string().optional(),
  url: Joi.string().uri().optional(),
});

export const playlistSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  songs: Joi.array().items(songsSchema).min(1).required(),
});
