import Head from 'next/head';
import Menu from '../components/menu'
import Image from 'next/image'
import treepixel from '../../public/treepixel.gif';
import Link from 'next/link';
import Footer from '../components/footer';





export default function Home() {

  

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="TradeCom" content="width=device-width, initial-scale=1" />
        <title>TradeCom | Home</title>
      </Head>
      <Menu/>
      <section className='h-screen w-full bg-white'>
        <div className=' px-40 w-auto h-screen flex flex-row items-center justify-between text-black'>
            <div className='w-1/3 flex flex-col '> 
                <div>
                    <h1 className='m-5 text-5xl font-bold'>The future is all about web3</h1>
                    <p className='m-5 text-xl'>Revolutionary DApp based on commodity tokenization, use of BTG-Dol stablecoin, and integration of the traditional financial market with blockchain.</p>
                </div>
                <div>
                    <Link href="/market">
                        <button  className='m-5 p-5 rounded-full bg-main/50 hover:bg-main/75 active:bg-main/50'>
                         Commodities 
                        </button>
                    </Link>
                    <Link href="/negociations">
                        <button className='m-5 p-5 rounded-full bg-main/50 hover:bg-main/75 active:bg-main/50'>
                            Finace Options
                        </button>
                    </Link> 
                </div>

            </div>
            <div className='w-1/3 h-1/3'>
                <Image src={treepixel} alt="pixeltree"/>
                
            </div>
        </div>
        
      </section>
      <Footer/>
    </>
   
  )
}