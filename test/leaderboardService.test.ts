import request from 'supertest';
import server from '../src/server'; // Adjust the path as necessary
import { callAddPlayer, callGetPlayers } from '../src/leaderboardService';

jest.mock('../src/leaderboardService');

const mockCallGetPlayers = callGetPlayers as jest.Mock;
const mockCallAddPlayer = callAddPlayer as jest.Mock;

describe('Leaderboard API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /players', () => {
    it('should return a list of players', async () => {
      const players = [{ address: '0x123', score: 100 }];
      mockCallGetPlayers.mockResolvedValue(players);

      const response = await request(server).get('/players');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(players);
    });

    it('should throw on an invalid contract address', async () => {
        mockCallGetPlayers.mockRejectedValue({...new Error(), reason:'invalid address'});
  
        const response = await request(server).get('/players');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid contract address' });
      });

    it('should handle errors', async () => {
      mockCallGetPlayers.mockRejectedValue(new Error('Something went wrong'));

      const response = await request(server).get('/players');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Something went wrong' });
    });
  });

  describe('POST /players', () => {
    it('should add a new player', async () => {
      const newPlayer = { address: '0x456', score: 200 };
      mockCallAddPlayer.mockResolvedValue(newPlayer);

      const response = await request(server).post('/players').send(newPlayer);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(newPlayer);
    });

    it('should handle validation errors', async () => {
      const invalidPlayer = { address: '0x789' }; // Missing score

      const response = await request(server).post('/players').send(invalidPlayer);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('instance requires property "score"');
    });

    it('should handle service errors', async () => {
      const newPlayer = { address: '0x456', score: 200 };
      mockCallAddPlayer.mockRejectedValue(new Error('Failed to add player'));

      const response = await request(server).post('/players').send(newPlayer);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to add player' });
    });
  });
});