
const address = '0x4793b2FD9039A24c08Ea6851a7bCF3859Af5ed69'
//0x061Db515C5d3108e558C642Bb22D63ca6Ec73445
const { abi } = require('../build/contracts/btgOpc.json')

const btgOpcContract = (web3) => {
    return new web3.eth.Contract(abi, address);
}

export default btgOpcContract;