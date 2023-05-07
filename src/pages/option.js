import Menu from "../components/menu"
import React, { useState } from "react";
import web3 from '../../contractinstances/web3';
//import cotoken from '../../contracts/cotoken';
import Footer from '../components/footer';
import Head from "next/head";
import btgOpcContract from '../../contractinstances/btgopc';



export default function party () {
    //const [name, setName] = useState('');
    //const [location, setLocation] = useState('');
    //const [date, setDate] = useState('');
    //const [price, setPrice] = useState('');
    //const [description, setDescription] = useState(''); 

    const [strike, setStike] = useState('');
    const [date, setDate] = useState('');
    const [prize, setPrize] = useState('');
    const [description, setDescription] = useState('');
    const [val, setValue] = useState('');
    
    
    
    const createEventHandller = async () => {
        
        const instance = btgOpcContract(web3);
        const address = await web3.eth.getAccounts()
        
        await instance.methods.createOption(strike, date, prize, description, val).send({
            from: address[0],
            value: val
        });
        //uint _strike, uint _date, uint _prizePrice, string memory _description, uint _value
    }


    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="TradeCom" content="width=device-width, initial-scale=1" />
                <title>TradeCom | Options</title>
            </Head>
            <Menu/>
            <section className="w-full h-screen bg-white flex justify-center items-center text-amber">
                <div className="w-1/2 h-2/3 bg-main/50 flex flex-col items-center rounded-xl shadow-2xl">
                    <h1 className="m-3">OPTIONS</h1>
                    <fieldset id="form" className="flex  flex-col w-5/6">
                        <div className="flex flex-col m-2">
                            <label htmlFor="name">Stike</label>
                            <input onChange={(e) => setStike(e.target.value)} placeholder="ex: gold, rice, wheat..." id="name" className="placeholder:italic placeholder:text-amber/50 my-2 rounded bg-main/25 border py-1 pl-4 border-amber"/>
                        </div>
                        <div className="flex flex-col m-2">
                            <label htmlFor="location">Date</label>
                            <input onChange={(e) => setDate(e.target.value)} placeholder="ex: ore, agrigultural, energy..." id="location" className="placeholder:italic placeholder:text-amber/50 my-2 rounded bg-main/25 border py-1 pl-4 border-amber"/>
                        </div>
                        <div className="flex flex-col m-2">
                            <label htmlFor="date">Prize</label>
                            <input onChange={(e) => setPrize(e.target.value)} placeholder="ex: kilogram, killowatts, ounce..." id="date" className="placeholder:italic placeholder:text-amber/50 my-2 rounded bg-main/25 border py-1 pl-4 border-amber"/>
                        </div>
                        <div className="flex flex-row flex-wrap justify-between m-2">
                            <div className="flex flex-col w-3/6">
                                <label htmlFor="price">Value</label>
                                <input onChange={(e) => setValue(e.target.value)} placeholder="n*unity" id="price" className="placeholder:italic placeholder:text-amber/50 my-2 rounded bg-main/25 border py-1 pl-4 border-amber"/>
                            </div>
                        </div>
                        
                        <div className="flex flex-col m-2">
                            <label htmlFor="description">Desciption</label>
                            <input onChange={(e) => setDescription(e.target.value)} placeholder="Company Name" id="price" className="placeholder:italic placeholder:text-amber/50 my-2 rounded bg-main/25 border py-1 pl-4 border-amber"/>
                        </div>
                        <div className="flex flex-col items-center m-2">
                            <button onClick={createEventHandller} className="bg-main/50 text-dblue w-1/3 rounded hover:bg-main/75 active:bg-main/50">Create</button>
                        </div>
                        
                    
                    </fieldset>
                </div>

            </section>
            <Footer/>
        </>
    )
}