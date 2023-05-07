const address = '0x02003b3FB788673CA47501b19935462f222304AB'

const { abi } = require('../build/contracts/deployedCTokens.json')

const deployedCTokensContract = (web3) => {
    return new web3.eth.Contract(abi, address);
}

export default deployedCTokensContract;