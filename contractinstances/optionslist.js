const address = '0xEAb312aeBc2E569Fd0Bf556d60cb32E25DCa9746'

const { abi } = require('../build/contracts/OptionsList.json')

const optionsListContract = (web3) => {
    return new web3.eth.Contract(abi, address);
}

export default optionsListContract;