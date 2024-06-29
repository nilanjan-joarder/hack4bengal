pragma solidity ^0.6.0;

contract Hotel {
    address payable public owner;
    enum State { Vacant, Occupied }
    State public currentState;

    constructor() public {
        owner = msg.sender;
        currentState = State.Vacant;
    }

    modifier onlyWhileVacant {
        require(currentState == State.Vacant, "Currently occupied");
        _;
    }

    modifier costs(uint _amount) {
        require(msg.value >= _amount, "Not enough Ether provided");
        _;
    }

    receive() external payable onlyWhileVacant costs(2 ether) {
        owner.transfer(msg.value);
        currentState = State.Occupied;
    }
}
