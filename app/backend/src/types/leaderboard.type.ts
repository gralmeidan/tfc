export type UntreatedLeaderBoard = {
  totalGames: number;
  totalVictories: number;
  totalLosses: number;
  totalDraws: number;
  goalsFavor: number;
  goalsOwn: number;
  teamHome: {
    name: string;
  };
  teamAway: {
    name: string;
  };
};

type LeaderBoard = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

export default LeaderBoard;
