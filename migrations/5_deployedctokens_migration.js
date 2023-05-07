const deployedCTokens = artifacts.require("deployedCTokens");

module.exports = function (deployer) {
    deployer.deploy(deployedCTokens);
};