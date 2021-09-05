const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')
  .use(require('chai-as-promised'))
  .should()

  contract('Token',(accounts) => {
  
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

contract('EthSwap',([deployer,inverstor]) => {
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
    describe('buyTokens()',async () => {
        
        before(async () => {
            let result;
            result =  await ethSwap.buyTokens({from: inverstor, value: web3.utils.toWei('1','ether')});
    
        })

        it('Allows user to instantly purchase tokens from ethSwap for a fixed price',async () => {
          let inverstorBalance = await token.balanceOf(inverstor)
          assert.equal(inverstorBalance.toString(), tokens('100'))
        })
    })
})