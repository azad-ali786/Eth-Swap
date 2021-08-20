const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");


module.exports = async function(deployer) {
  //deploy token to blockchain
  await deployer.deploy(Token);
  const token = await Token.deployed();
  // deploy ethswap to blockchain
  await deployer.deploy(EthSwap,token.address);
  const ethSwap = await EthSwap.deployed();
 
  //Transfer all token to ethswapr
  await token.transfer(ethSwap.address, '1000000000000000000000000')
};
