const address = '0xaCd73E091D2D375A7C5492a20F6A4C9B3A7BFFe6'

const { abi } = require('../build/contracts/btgOpc.json')

const btgOpcContract = (web3) => {
    return new web3.eth.Contract(abi, address);
}

export default btgOpcContract;