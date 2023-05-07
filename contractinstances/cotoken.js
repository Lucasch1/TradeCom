const address = '0x63bD92803f836a309239342445Fc34848a7fF57C'

const { abi } = require('../build/contracts/cotoken.json')

const cotokenContract = (web3) => {
    return new web3.eth.Contract(abi, address);
}

export default cotokenContract;