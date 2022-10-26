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

export const newMatchSchema = Joi.object({
  homeTeam: id.required(),
  homeTeamGoals: goals.required(),
  awayTeam: id.required(),
  awayTeamGoals: goals.required(),
}).required();
