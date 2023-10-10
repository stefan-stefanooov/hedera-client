// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import { BankWallet } from "./BankWallet.sol";

contract Bank {
    address payable public owner;
    address payable public bankWalletAddress;
    BankWallet bankWalletContract;
    mapping(address => uint) public balances;

    constructor(address bankWalletContractAddress) {
      bankWalletAddress = payable(bankWalletContractAddress);
      bankWalletContract = BankWallet(payable(bankWalletAddress));
    }

    function withdrawFull() public {
        uint balanceForSender = balances[msg.sender];
        require(balanceForSender > 0, "You haven't sent any hbars to this contract");
        balances[msg.sender] = 0;
        bankWalletContract.sendHnbar(msg.sender, balanceForSender);

        payable(msg.sender).transfer(balanceForSender);
    }

    function fund() public payable {
      require(msg.value > 0, "You cannot fund with 0 (zero) amount");
      balances[msg.sender] = balances[msg.sender] + msg.value;
      bankWalletAddress.transfer(msg.value);
    }

    function getBalance() public pure returns (uint) {
      revert("Not implemented yet");
    }
}
