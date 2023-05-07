const address = '0x6BE7ca855C149E049E02054E7521A3924b2df698'

const { abi } = require('../build/contracts/btgOpc.json')

const btgOpcContract = (web3) => {
    return new web3.eth.Contract(abi, address);
}

export default btgOpcContract;