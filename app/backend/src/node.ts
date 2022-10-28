import LeaderBoardService from './services/leaderBoard.service';
import mockLeaderBoard from './tests/mocks/leaderBoard.mock';

(async () => {
  const service = new LeaderBoardService();
  const response = await service.getAll(mockLeaderBoard.fromDb);
  console.log(response);
})();
