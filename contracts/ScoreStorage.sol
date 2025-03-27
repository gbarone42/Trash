// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract ScoreStorage {
    struct Match {
        string team;
        string score;
    }

    mapping(string => Match) public matches;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function setMatchResult(string memory matchId, string memory team, string memory score) public onlyOwner {
        matches[matchId] = Match(team, score);
    }

    function getMatchResult(string memory matchId) public view returns (string memory, string memory) {
        Match memory m = matches[matchId];
        return (m.team, m.score);
    }
}
