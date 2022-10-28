const mockLeaderBoard = {
  response: [
    {
      totalGames: 3,
      goalsFavor: 9,
      goalsOwn: 3,
      totalVictories: 3,
      totalLosses: 0,
      totalDraws: 0,
      name: 'Santos',
      goalsBalance: 6,
      totalPoints: 9,
      efficiency: '100.00',
    },
    {
      totalGames: 3,
      goalsFavor: 10,
      goalsOwn: 5,
      totalVictories: 2,
      totalLosses: 0,
      totalDraws: 1,
      name: 'Palmeiras',
      goalsBalance: 5,
      totalPoints: 7,
      efficiency: '77.78',
    },
    {
      totalGames: 2,
      goalsFavor: 6,
      goalsOwn: 1,
      totalVictories: 2,
      totalLosses: 0,
      totalDraws: 0,
      name: 'Corinthians',
      goalsBalance: 5,
      totalPoints: 6,
      efficiency: '100.00',
    },
    {
      totalGames: 2,
      goalsFavor: 4,
      goalsOwn: 1,
      totalVictories: 2,
      totalLosses: 0,
      totalDraws: 0,
      name: 'Grêmio',
      goalsBalance: 3,
      totalPoints: 6,
      efficiency: '100.00',
    },
    {
      totalGames: 2,
      goalsFavor: 2,
      goalsOwn: 0,
      totalVictories: 2,
      totalLosses: 0,
      totalDraws: 0,
      name: 'Real Brasília',
      goalsBalance: 2,
      totalPoints: 6,
      efficiency: '100.00',
    },
    {
      totalGames: 2,
      goalsFavor: 4,
      goalsOwn: 1,
      totalVictories: 1,
      totalLosses: 0,
      totalDraws: 1,
      name: 'São Paulo',
      goalsBalance: 3,
      totalPoints: 4,
      efficiency: '66.67',
    },
    {
      totalGames: 3,
      goalsFavor: 4,
      goalsOwn: 6,
      totalVictories: 1,
      totalLosses: 1,
      totalDraws: 1,
      name: 'Internacional',
      goalsBalance: -2,
      totalPoints: 4,
      efficiency: '44.44',
    },
    {
      totalGames: 3,
      goalsFavor: 2,
      goalsOwn: 4,
      totalVictories: 1,
      totalLosses: 1,
      totalDraws: 1,
      name: 'Botafogo',
      goalsBalance: -2,
      totalPoints: 4,
      efficiency: '44.44',
    },
    {
      totalGames: 2,
      goalsFavor: 3,
      goalsOwn: 2,
      totalVictories: 1,
      totalLosses: 1,
      totalDraws: 0,
      name: 'Ferroviária',
      goalsBalance: 1,
      totalPoints: 3,
      efficiency: '50.00',
    },
    {
      totalGames: 2,
      goalsFavor: 2,
      goalsOwn: 2,
      totalVictories: 0,
      totalLosses: 0,
      totalDraws: 2,
      name: 'Napoli-SC',
      goalsBalance: 0,
      totalPoints: 2,
      efficiency: '33.33',
    },
    {
      totalGames: 2,
      goalsFavor: 2,
      goalsOwn: 3,
      totalVictories: 0,
      totalLosses: 1,
      totalDraws: 1,
      name: 'Cruzeiro',
      goalsBalance: -1,
      totalPoints: 1,
      efficiency: '16.67',
    },
    {
      totalGames: 2,
      goalsFavor: 1,
      goalsOwn: 2,
      totalVictories: 0,
      totalLosses: 1,
      totalDraws: 1,
      name: 'Flamengo',
      goalsBalance: -1,
      totalPoints: 1,
      efficiency: '16.67',
    },
    {
      totalGames: 3,
      goalsFavor: 3,
      goalsOwn: 6,
      totalVictories: 0,
      totalLosses: 2,
      totalDraws: 1,
      name: 'Minas Brasília',
      goalsBalance: -3,
      totalPoints: 1,
      efficiency: '11.11',
    },
    {
      totalGames: 3,
      goalsFavor: 3,
      goalsOwn: 7,
      totalVictories: 0,
      totalLosses: 2,
      totalDraws: 1,
      name: 'Avaí/Kindermann',
      goalsBalance: -4,
      totalPoints: 1,
      efficiency: '11.11',
    },
    {
      totalGames: 3,
      goalsFavor: 2,
      goalsOwn: 5,
      totalVictories: 0,
      totalLosses: 3,
      totalDraws: 0,
      name: 'São José-SP',
      goalsBalance: -3,
      totalPoints: 0,
      efficiency: '0.00',
    },
    {
      totalGames: 3,
      goalsFavor: 0,
      goalsOwn: 4,
      totalVictories: 0,
      totalLosses: 3,
      totalDraws: 0,
      name: 'Bahia',
      goalsBalance: -4,
      totalPoints: 0,
      efficiency: '0.00',
    },
  ],
  fromDb: [
    {
      totalGames: 2,
      goalsFavor: 4,
      goalsOwn: 1,
      totalVictories: 1,
      totalLosses: 0,
      totalDraws: 1,
      teamHome: { name: 'São Paulo' },
    },
    {
      totalGames: 3,
      goalsFavor: 4,
      goalsOwn: 6,
      totalVictories: 1,
      totalLosses: 1,
      totalDraws: 1,
      teamHome: { name: 'Internacional' },
    },
    {
      totalGames: 2,
      goalsFavor: 6,
      goalsOwn: 1,
      totalVictories: 2,
      totalLosses: 0,
      totalDraws: 0,
      teamAway: { name: 'Corinthians' },
    },
    {
      totalGames: 3,
      goalsFavor: 2,
      goalsOwn: 4,
      totalVictories: 1,
      totalLosses: 1,
      totalDraws: 1,
      teamHome: { name: 'Botafogo' },
    },
    {
      totalGames: 2,
      goalsFavor: 1,
      goalsOwn: 2,
      totalVictories: 0,
      totalLosses: 1,
      totalDraws: 1,
      teamAway: { name: 'Flamengo' },
    },
    {
      totalGames: 2,
      goalsFavor: 2,
      goalsOwn: 3,
      totalVictories: 0,
      totalLosses: 1,
      totalDraws: 1,
      teamHome: { name: 'Cruzeiro' },
    },
    {
      totalGames: 3,
      goalsFavor: 10,
      goalsOwn: 5,
      totalVictories: 2,
      totalLosses: 0,
      totalDraws: 1,
      teamAway: { name: 'Palmeiras' },
    },
    {
      totalGames: 3,
      goalsFavor: 2,
      goalsOwn: 5,
      totalVictories: 0,
      totalLosses: 3,
      totalDraws: 0,
      teamHome: { name: 'São José-SP' },
    },
    {
      totalGames: 3,
      goalsFavor: 3,
      goalsOwn: 7,
      totalVictories: 0,
      totalLosses: 2,
      totalDraws: 1,
      teamAway: { name: 'Avaí/Kindermann' },
    },
    {
      totalGames: 3,
      goalsFavor: 0,
      goalsOwn: 4,
      totalVictories: 0,
      totalLosses: 3,
      totalDraws: 0,
      teamHome: { name: 'Bahia' },
    },
    {
      totalGames: 2,
      goalsFavor: 2,
      goalsOwn: 0,
      totalVictories: 2,
      totalLosses: 0,
      totalDraws: 0,
      teamAway: { name: 'Real Brasília' },
    },
    {
      totalGames: 2,
      goalsFavor: 3,
      goalsOwn: 2,
      totalVictories: 1,
      totalLosses: 1,
      totalDraws: 0,
      teamHome: { name: 'Ferroviária' },
    },
    {
      totalGames: 2,
      goalsFavor: 4,
      goalsOwn: 1,
      totalVictories: 2,
      totalLosses: 0,
      totalDraws: 0,
      teamAway: { name: 'Grêmio' },
    },
    {
      totalGames: 3,
      goalsFavor: 9,
      goalsOwn: 3,
      totalVictories: 3,
      totalLosses: 0,
      totalDraws: 0,
      teamHome: { name: 'Santos' },
    },
    {
      totalGames: 3,
      goalsFavor: 3,
      goalsOwn: 6,
      totalVictories: 0,
      totalLosses: 2,
      totalDraws: 1,
      teamAway: { name: 'Minas Brasília' },
    },
    {
      totalGames: 2,
      goalsFavor: 2,
      goalsOwn: 2,
      totalVictories: 0,
      totalLosses: 0,
      totalDraws: 2,
      teamHome: { name: 'Napoli-SC' },
    },
  ],
};

export default mockLeaderBoard;