const OptionsList = artifacts.require("OptionsList");

module.exports = function (deployer) {
    deployer.deploy(OptionsList);
};