const { default: Web3 } = require('web3');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')
  .use(require('chai-as-promised'))
  .should()

  contract('Token',(account) => {
  
    describe('Token deployment',async () => {
        it('contract has a name', async () => {
            let token = await Token.new();
            const name = await token.name();
            assert.equal(name,'DApp Token') 
        })

    })
})

function tokens(n) {
 return web3.utils.toWei(n,'ether');
}

contract('EthSwap',(account) => {
    let token,ethSwap;
    before(async () => {
        token = await Token.new();
        ethSwap = await EthSwap.new(token.address);
        await token.transfer(ethSwap.address, tokens('1000000'))

    })


    describe('EthSwap deployment',async () => {
        it('contract has a name', async () => {   
            const name = await ethSwap.name();
            assert.equal(name,'EthSwap Instant Exchange') 
        })
        it('contract has tokens', async () => {
            let balance = await token.balanceOf(ethSwap.address);
            assert.equal(balance.toString(), tokens('1000000'))
        })

    })
})