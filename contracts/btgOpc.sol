// SPDX-License-Identifier: MIT
pragma solidity^0.8.1;


import "./price.sol";
import "../node_modules/@chainlink/contracts/src/v0.8/KeeperCompatible.sol";


interface btgDOL {
    function balanceOf(address _address) external view returns(uint256);
    function transferFrom(address _from, address _to, uint _amout) external returns(bool);
}


contract btgOpc is KeeperCompatibleInterface {

    PriceConsumerV3 public priceEth;
    
    uint ethPrice;
    uint contador = 0;
    uint cont = 0;
    address addr = 0x0172ae13E3583BF565957095D27caede3Abb172e;
    opcDol public opc;
    mapping(address => bool) canBuy;
    

    struct buyRequest {
        address buyer;
        uint value;
    }

    struct opcDol {
            uint id;
            uint strike; // eth em dolar
            uint dataVencimento;
            uint valorCobertura;// numero de eths
            uint emissionPrice;// acho que nao precisa
            string description;
            bool valid;
            address emissor;
            address buyer;
            address [] bbs;
            uint [] val;
    }
    opcDol [] public opcoes;

    constructor (address _chainlinkPriceAddr) {
        priceEth = PriceConsumerV3(_chainlinkPriceAddr);
    }
    
    function createOption (uint _strike, uint _date, uint _prizePrice, string memory _description, uint _value) public payable {
        
        require(msg.sender.balance >= _value, "You should have on wallet at least the same ammout of eth on wallet as you want to cover on your option");
        require(msg.value == _value, "You need to lock your ethers in the period the option is being valid");
        
        ethPrice = uint(priceEth.getLatestPrice());

        opc = opcDol ({
            id: cont,
            strike: _strike,
            dataVencimento: _date,
            valorCobertura: _value,
            emissionPrice: _prizePrice,
            description: _description,
            valid: true,
            emissor: msg.sender,
            buyer: msg.sender,
            bbs: new address [](0),
            val: new uint [](0)
        });
        cont = cont + 1;
        
        opcoes.push(opc);

    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        bool done;
        done = opc.valid;
        upkeepNeeded = done;        
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        ethPrice = uint(priceEth.getLatestPrice());
        for(uint i = 0; i > opcoes.length; i++){
            if(opcoes[i].dataVencimento>0){
                opcoes[i].dataVencimento = opcoes[i].dataVencimento - 1;
            }
        }
        // We don't use the performData in this example. The performData is generated by the Keeper's call to your checkUpkeep function
    }

    function creatBuyRequest(uint _value, uint _index) public {
        require(btgDOL(addr).balanceOf(msg.sender) > _value, "you dont have enought tokens");

        opcoes[_index].bbs.push(msg.sender);
        opcoes[_index].val.push(_value);

    }

    function aproveRequest(uint _index, uint _index2) public {
        require(msg.sender == opcoes[_index].buyer, "You should be the option owner to call this function");
        address add = opcoes[_index].bbs[_index2];
        canBuy[add] = true;
    }
    
    function buyOpc(uint _index, uint _price) public payable {
        require(btgDOL(addr).balanceOf(msg.sender) >= _price, "You dont't have enought tokens to buy this option");
        require(canBuy[msg.sender], "Your buy request was not approved");
        btgDOL(addr).transferFrom(msg.sender, opcoes[_index].emissor, _price); //tem vulnerabilidade o preco pode ser qualquer um...
        opcoes[_index].buyer = msg.sender;
    }

    function executeOpc(uint _index) public payable returns(string memory _status){
        require(msg.sender == opcoes[_index].buyer, "Only the owner of the option can execute it");
        require(btgDOL(addr).balanceOf(opcoes[_index].buyer) >= opcoes[_index].strike * opcoes[_index].valorCobertura, "You don't have enought tokens to make the transaction"); // se a btgUsd criar uma funcao de convesao automatica essa condicao pode ser ignorada
        
        if(ethPrice > opcoes[_index].strike && opcoes[_index].dataVencimento <= 0){
            btgDOL(addr).transferFrom(opcoes[_index].buyer, opcoes[_index].emissor, opcoes[_index].strike * opcoes[_index].valorCobertura);
            opcoes[_index].valid = false;
            payable(msg.sender).transfer(address(this).balance); //nao eh o balance todo, eh o valordecobetura
            _status = "The option has been executed check your balance";
            return _status;
        }else {
            _status = "There's no sense in executing the option since it will return a loss or the option still valid";
            return _status;
        }
    }

    function getOptions() public view returns(opcDol [] memory){
        return opcoes;
    }

}

