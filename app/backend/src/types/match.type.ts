import Team from './team.type';

export default interface Match {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface FullMatch extends Match {
  teamHome?: Team;
  teamAway?: Team;
}

export interface NewMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}
