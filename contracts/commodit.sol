// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./BTGDOL.sol";

contract PartyChain {
    
    ///Istancia do contrato Eventoken
    EvenToken public evenToken;

    ///Define a estrutura do contrato dos eventos
    struct Party {
        uint256 _id;
        string name;
        address owner;
        string description;
        string location;
        uint256 date;
        uint256 price;
        address payable[] attendees;
        uint attendessCount;
    }

    ///Cria um uint para ser o id dos eventos
    uint id = 0;
    ///Cria um mapping para adicionar o id dos eventos de um determinado endereco
    //mapping(address => Party[]) myParties;
    mapping(address => uint []) myParties;
    
    ///Cria uma lista que guarda todos os eventos criados
    Party[] public parties;


    ///Como argumento para fazer o deploy so e necessario o endereco do contrato do token
    constructor(address _evenTokenAddr) {
        evenToken = EvenToken(_evenTokenAddr);
    }

    ///Essa funcao serve para criar um novo evento. Pede como parametro um nome, uma descricao, um local, uma data e um preco para o evento
    ///@notice funcao exige gas fee (transact)
    function createEvent (string memory _name, string memory _description, string memory _location, uint256 _date, uint256 _price) public {
        Party memory newParty = Party({
            _id: id,
            name: _name,
            owner: msg.sender,
            description: _description,
            location: _location,
            date: _date,
            price: _price,
            attendees: new address payable [](0),
            attendessCount: 0
        });

        id = id + 1;
        parties.push(newParty);
        myParties[msg.sender].push(newParty._id);
    }

    ///Retorna todos os eventos criados com o contrato
    function getParties() public view returns (Party[] memory) {
        return parties;
    }

    
    ///Permite que usuarios participem do evento apos pagar determinado valor. Como parametro e preciso passar o id da festa
    ///@notice e uma funcao que exige gas fee (transact)
    function attendParty(uint256 _partyId) public {
        Party storage party = parties[_partyId];
        require(party.owner != msg.sender, "You cannot attend your own party");
        require(evenToken.balanceOf(msg.sender) >= party.price, "You do not have enough Even Tokens to attend this party");
        evenToken.transferFrom(msg.sender, party.owner, party.price);
        party.attendees.push(payable(msg.sender));
        party.attendessCount = party.attendessCount + 1;
    }

    ///Possibilita aos usuarios verificarem se eles estao em determinada festa. Como parametro exige o id da festa que vc quer validar sua presenca
    function amIntheParty (uint256 _partyId) public view returns(bool) {
        for (uint i = 0; i < parties[_partyId].attendees.length; i++) {
            if (parties[_partyId].attendees[i] == address(msg.sender)) {
                return true;
            }
        }
        return false;
    }
    
    
    ///Possibilita que os criadores de eventos verifiquem todos os eventos que eles criaram
    function getMyParties() public view returns(Party[] memory, uint []memory) {
        Party [] memory _myParties = new Party[](myParties[msg.sender].length);
        for (uint i = 0; i < myParties[msg.sender].length; i++){
            _myParties[i] = parties[myParties[msg.sender][i]];
        }
        return (_myParties, myParties[msg.sender]);
    }

    ///Adiciona a funcionalidade de dar ingressos de forma gratuita aos seu eventos. Como parametro exige o id da festa e o endereco do convidado.
    ///Somente o criador do evento pode chamar essa funcao
    ///@notice e uma funcao que exige gas fee (transact)
    function freePass(uint _partyId, address guest) public {
        require(msg.sender == parties[_partyId].owner, "You are not the owner of this party. To give Free pass you should be the owner");
        parties[_partyId].attendees.push(payable(guest));
        parties[_partyId].attendessCount = parties[_partyId].attendessCount + 1;
    }

    
    ///Da a possibilidade de alterar o local do evento. Como parametro exige o id do evento e o novo local.
    ///Somente o criador do evento pode chamar essa funcao
    ///@notice e uma funcao que exige gas fee (transact)
    function editPartyLocation (uint _partyId, string memory _location) public {
        require(msg.sender == parties[_partyId].owner, "You are not the owner of this party. To edit the party you should be the owner");
        parties[_partyId].location = _location;
    }

    ///Da a possibilidade de alterar a data do evento. Como parametro exige o id do evento e a nova data.
    ///Somente o criador do evento pode chamar essa funcao
    ///@notice e uma funcao que exige gas fee (transact)
    function editPartyDate (uint _partyId, uint _date) public {
        require(msg.sender == parties[_partyId].owner, "You are not the owner of this party. To edit the party you should be the owner");
        parties[_partyId].date = _date;
    }

    ///Da a possibilidade de alterar o preco do evento. Como parametro exige o id do evento e o novo preco.
    ///Somente o criador do evento pode chamar essa funcao
    ///@notice e uma funcao que exige gas fee (transact)
    function editPartyPrice (uint _partyId, uint _price) public {
        require(msg.sender == parties[_partyId].owner, "You are not the owner of this party. To edit the party you should be the owner");
        parties[_partyId].price = _price;
    }

    ///Da a possibilidade de alterar a descricao do evento. Como parametro exige o id do evento e a nova descricao.
    ///Somente o criador do evento pode chamar essa funcao
    ///@notice e uma funcao que exige gas fee (transact)
    function editPartyDescription (uint _partyId, string memory _description) public {
        require(msg.sender == parties[_partyId].owner, "You are not the owner of this party. To edit the party you should be the owner");
        parties[_partyId].description = _description;
    }
    

    // E se ao inves de utilizar uma lista de struct para o myParties eu fezer uma liste de uints onde cada uint eh igual ao id da partie

}