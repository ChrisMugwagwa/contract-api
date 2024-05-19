// Example Solidity Smart Contract
pragma solidity ^0.8.24;

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
