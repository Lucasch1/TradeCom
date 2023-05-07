const PriceConsumerV3 = artifacts.require("PriceConsumerV3");

module.exports = function (deployer) {
    deployer.deploy(PriceConsumerV3);
};