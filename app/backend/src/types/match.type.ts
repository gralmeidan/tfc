import Team from './team.type';

type Match = {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: Team;
  teamAway?: Team;
};

export type NewMatch = Omit<Match, 'id' | 'inProgress' | 'teamHome' | 'teamAway'>;

export default Match;
