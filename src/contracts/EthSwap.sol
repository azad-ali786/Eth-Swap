pragma solidity >0.5.2;

import "./Token.sol";

contract EthSwap {
   string public name = "EthSwap Instant Exchange";
   Token public token;
   uint public rate = 100;
   constructor( Token _token) public {
    token = _token;
   }
  
    function buyTokens() public payable{
       // Redemption rate 
       //Amount of Etherreum * Redemption rate ; Redemption rate = # of tokens for 1 ether
       uint tokenAmount = msg.value * rate;
       token.transfer(msg.sender,tokenAmount);
    }
   
}