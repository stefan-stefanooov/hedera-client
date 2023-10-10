// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract BankWallet {
    address payable public owner;

    constructor() {
      owner = payable(msg.sender);
    }

    function sendHnbar(address to, uint amount) public {
      require(address(this).balance < amount, "Not enough balance");
      payable(to).transfer(amount);
    }

    function revertWithMessage() public pure {
        revert("just a random revert");
    }

    function getBalance() public view returns (uint) {
        require(msg.sender == owner, "You are not the owner of the Bank Wallet");
        return address(this).balance;
    }

    receive() external payable {}
}
