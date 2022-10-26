import * as Joi from 'joi';

const id = Joi.number().min(1).optional();
export const goals = Joi.number().min(0).optional();

export const querySchema = Joi.object({
  id,
  homeTeam: id,
  homeTeamGoals: goals,
  awayTeam: id,
  awayTeamGoals: goals,
  inProgress: Joi.boolean().optional(),
});
