const _CtokensAddr = '0x02003b3FB788673CA47501b19935462f222304AB';
const cotoken = artifacts.require("cotoken");

module.exports = function (deployer) {
    deployer.deploy(cotoken, "Nome", "NAM", "Minerio", "Kg", 100, 1000, _CtokensAddr);
};
