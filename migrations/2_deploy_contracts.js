const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");


module.exports = function(deployer) {
  //deploy token to blockchain
  deployer.deploy(Token);
  // deploy ethswap to blockchain
  deployer.deploy(EthSwap);
};
