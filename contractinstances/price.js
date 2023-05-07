const address = '0xB78b1104d13B0BeD5FAa80BE4FAAd01e2454CCd1'

const { abi } = require('../build/contracts/PriceConsumerV3.json')

const priceConsumerV3Contract = (web3) => {
    return new web3.eth.Contract(abi, address);
}

export default priceConsumerV3Contract;