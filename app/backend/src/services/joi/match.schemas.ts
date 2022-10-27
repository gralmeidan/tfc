import * as Joi from 'joi';

const id = Joi.number().min(1);
const goals = Joi.number().min(0);

export const querySchema = Joi.object({
  id: id.optional(),
  homeTeam: id.optional(),
  homeTeamGoals: goals.optional(),
  awayTeam: id.optional(),
  awayTeamGoals: goals.optional(),
  inProgress: Joi.boolean().optional(),
});

const awayTeam = id.disallow(Joi.ref('homeTeam')).messages({
  'any.invalid':
    'It is not possible to create a match with two equal teams',
});

export const newMatchSchema = Joi.object({
  homeTeam: id.required(),
  homeTeamGoals: goals.required(),
  awayTeam: awayTeam.required(),
  awayTeamGoals: goals.required(),
}).required();

export const updateSchema = Joi.object({
  homeTeam: id.optional(),
  homeTeamGoals: goals.optional(),
  awayTeam: awayTeam.optional(),
  awayTeamGoals: goals.optional(),
  inProgress: Joi.boolean().optional(),
}).min(1);
