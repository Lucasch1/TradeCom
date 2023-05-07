import Menu from "@/components/menu";
import Head from "next/head";
import { useState } from 'react';
import web3 from "../../contractinstances/web3";
import btgOpcContract from "../../contractinstances/btgopc";

const Events = ({ eventos }) => {
    
    const[index1, setIndex1] = useState('')
    const[valor,setValor] = useState('')
    const[index2, setIndex2] = useState('')
    const[index3, setIndex3] = useState('')
    const[index4, setIndex4] = useState('')
    const[index5, setIndex5] = useState('')
    const[valor2, setValor2] = useState('')
    
    
    const items = eventos.map((item, index) => {
        return (
            <div
                key={index}
                className="p-3 bg-sky-800 rounded-lg flex flex-col items-center"
            >
                <h1>Opcao eth</h1>
                <p>Id: {item[0]}</p>
                <p>Strike: {item[1]}</p>
                <p>Dias até o vencimento: {item[2]}</p>
                <p>Valor de cobertura: {item[3]}</p>
                <p>Prize: {item[4]}</p>
                <p>Description: {item[5]}</p>
                <p>Emissor: {item[7]}</p>
                <p>Owner: {item[8]}</p>
                <p>Requests: {item[9][0]}</p>
                <p>Requests(val): {item[10][0]}</p>
            </div>
        );
    });

  //const toggleMenu = () => {
  //  var menu = document.getElementById("filter-menu");
  //  if (menu.style.display === "block") {
  //    menu.style.display = "none";
  //  } else {
  //    menu.style.display = "block";
  //  }
  //};


    const [selected, setSelected] = useState(null);

    const handleClick = (index) => {
        setSelected(index);
    };

    const handleClose = (event) => {
        setSelected(null);
        console.log('gg');
        event.stopPropagation();
    };  

    const createRequestHandller = async () => {
        const address = await web3.eth.getAccounts()
        const instance = btgOpcContract(web3);
        await instance.methods.creatBuyRequest(valor, index1).send({from: address[0]});
    }
    
    const approveRequestHandller = async () => {
        const address = await web3.eth.getAccounts()
        const instance = btgOpcContract(web3);
        await instance.methods.aproveRequest(index2, index3).send({from: address[0]});
    }
    
    const executeHandller = async () => {
        const address = await web3.eth.getAccounts()
        const instance = btgOpcContract(web3);
        await instance.methods.executeOpc(index4).send({from: address[0]});
    }

    const buyHandller = async () => {
        const address = await web3.eth.getAccounts()
        const instance = btgOpcContract(web3);
        await instance.methods.buyOpc(index5, valor2).send({from: address[0], value: valor2});
    }
    



    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="PartyChain" content="width=device-width, initial-scale=1" />
                <title>PartyChain | Events</title>
            </Head>
            <Menu />
            <section className="h-screen py-20 bg-white">
                <div className="w-full max-w-screen-2xl h-20 mx-auto px-20 flex items-center justify-between text-amber">
                    <div className="m-2 p-2 w-20 rounded-full bg-amber text-white flex justify-center">
                        Filter
                    </div>
                    <div className="flex justify-center">
                        <input className="px-4 h-10 rounded-l-full bg-amber/25 focus:border-amber focus:border-2 focus:outline-none"></input>
                        <button className="bg-amber/50 text-white p-2 h-10 rounded-r-full hover:bg-amber active:bg-amber/75">
                            Search
                        </button>
                    </div>
                </div>

                <div className="py-10 text-white">
                    <div className="flex justify-center py-6 text-main text-3xl font-bold">Commodities Market</div>
                        <div>
                            <div className="w-full mx-auto px-20 max-w-screen-2xl grid grid-cols-3 gap-5">
                            {items.map((_, index) => (
                                <div
                                    key={index}
                                    className={`p-3 h-20 bg-fuchsia-900/75 rounded-lg flex flex-row items-center ${
                                        selected === index ? 'fixed w-full left-0 h-96 z-10 bg-main flex justify-center' : ''
                                    }`}
                                    onClick={() => handleClick(index)}
                                >
                        {selected === index && (
                            <>
                                <div className="h-96 w-96 mr-6 bg-black/25 ">
                                    <div>{items[index]}</div>
                                    
                                </div>
                                <div className="h-96 mx-6 py-6 flex flex-col justify-between">
                                    <button onClick={handleClose} className="bg-black/25 p-3 rounded-full">Close</button>
                                    <div>
                                        <input onChange={(e) => setValor(e.target.value)} placeholder="value(BTGDOL)" className="p-2 h-10 rounded-l-full text-black"></input>
                                        <input onChange={(e) => setIndex1(e.target.value)} placeholder="index" className="p-2 h-10 rounded-l-full text-black"></input>
                                        
                                        <button onClick={createRequestHandller} className="bg-black/25 p-3 rounded-r-full ">Create buy Request</button>
                                    </div>
                                    <div>
                                        <input onChange={(e) => setIndex2(e.target.value)} placeholder="Id" className="p-2 h-10 rounded-l-full text-black"></input>
                                        <input onChange={(e) => setIndex3(e.target.value)} placeholder="Index2" className="p-2 h-10 rounded-l-full text-black"></input>
                                        
                                        <button onClick={approveRequestHandller} className="bg-black/25 p-3 rounded-r-full">Approve buy Request (only owner)</button>
                                    </div>
                                    <div>
                                        <input onChange={(e) => setIndex4(e.target.value)} placeholder="index" className="p-2 h-10 rounded-l-full text-black"></input>
                                        
                                        <button onClick={executeHandller} className="bg-black/25 p-3 rounded-r-full">execute</button>
                                    </div>
                                    <div>
                                        <input onChange={(e) => setIndex5(e.target.value)} placeholder="index" className="p-2 h-10 rounded-l-full text-black"></input>
                                        <input onChange={(e) => setValor2(e.target.value)} placeholder="value" className="p-2 h-10 rounded-l-full text-black"></input>
                                        <button onClick={buyHandller} className="bg-black/25 p-3 rounded-r-full">buy</button>
                                    </div>
                                    
                                    
                                    
                                </div>
                                
                            </>
                        )}
                        </div>
                    ))}
                    
                    
                </div>
            </div>
        </div>
        </section>
        <section className="text-black">
            {items}
        </section>
    </>
  );
};

export const getServerSideProps = async () => {
    const instance = btgOpcContract(web3);
    const eventos = await instance.methods.getOptions().call();

    return { props: { eventos } };
};

export default Events;