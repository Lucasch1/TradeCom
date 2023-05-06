// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract deployedCTokens {
    address[] public deployedTokens;
    function addNewToken(address _tkAddr) public{
        deployedTokens.push(_tkAddr);
    }

    function getDeployedTokens() public view returns(address [] memory) {
        return deployedTokens;
    }
    
}

contract cotoken is ERC20, ERC20Burnable, Ownable {
    
    
    
    deployedCTokens public Ctokens;

    uint public valorDeUmToken;
    ///Cria variavel para armazenar o enderco atual do contrato cotoken
    address public cotokenAddr;
    


    struct token {
        string name;
        string symbol;
        string tipo;
        string unidadeDeMedida;
        uint256 supply;
        uint256 valor;
        address addr;
    }

    token public tk;

    ///Constroi o token com as funcionalidades padrao do openzeppelin
    constructor(string memory _nome, string memory _symbol, string memory _tipo, string memory _unidadeDeMedida, uint256 _supply, uint256 _valor, address _CtokensAddr) ERC20(_nome, _symbol) {
        _mint(msg.sender, _supply * 10 ** decimals());
        valorDeUmToken = _valor;
        Ctokens = deployedCTokens(_CtokensAddr);
        Ctokens.addNewToken(address(this));

        tk = token({
            name: _nome,
            symbol: _symbol,
            tipo: _tipo,
            unidadeDeMedida: _unidadeDeMedida,
            supply: _supply,
            valor: _valor,
            addr: address(this)
        });

    }

    ///Funcao para mintar novos tokens
    ///@notice funcao exige gas fees (transact)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

}