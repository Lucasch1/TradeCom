const _chainlinkPriceAddr = '0xB78b1104d13B0BeD5FAa80BE4FAAd01e2454CCd1';
//const _optionslistAddr = '0xEAb312aeBc2E569Fd0Bf556d60cb32E25DCa9746';

const btgOpc = artifacts.require("btgOpc");

module.exports = function (deployer) {
    deployer.deploy(btgOpc, _chainlinkPriceAddr);
};
