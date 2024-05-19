
**Objective:**

Build a simple backend service using TypeScript that interacts with a blockchain smart contract and provides API endpoints to interact with this contract. The service will simulate a basic on-chain leaderboard for a game.

**Assignment Tasks:**

1. **Backend Service Setup**
- Create a Node.js application using TypeScript and Express.js.
- Set up the project structure and include necessary dependencies.
2. **Smart Contract Interaction**
- Use Web3.js or Ethers.js to interact with a deployed smart contract on the Rinkeby testnet. You can use a provided example contract or deploy your own:

```solidity
solidityCopy code
// Example Solidity Smart Contract
pragma solidity ^0.8.0;

contract Leaderboard {
struct Player {
address playerAddress;
uint score;
}

Player[] public players;

function addPlayer(address _playerAddress, uint _score) public {
players.push(Player(_playerAddress, _score));
}

function getPlayers() public view returns (Player[] memory) {
return players;
}
}

```

- Implement functions to read from and write to the smart contract:
- **`getPlayers`**: Fetch the list of players and their scores from the contract.
- **`addPlayer`**: Add a new player and their score to the contract.
3. **API Endpoints**
- Implement the following API endpoints:
- **`GET /players`**: Fetch the list of players and their scores from the smart contract.
- **`POST /players`**: Add a new player and their score to the smart contract. The request body should include the player's address and score.
4. **Documentation and Testing**
- Write basic tests for the implemented functions using a testing framework like Jest.
- Document the API endpoints and provide setup instructions in a **`README.md`** file.

**Detailed Requirements:**

1. **Backend Service Setup**
- Set up a Node.js application using TypeScript.
- Use Express.js to handle routing.
- Include TypeScript configuration (**`tsconfig.json`**) and necessary npm scripts for building and runn