import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image'
import github from '../../public/github.png';


export default function Footer(){

    
    return (
      <>
        <Head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
        <div className="w-full h-32 bottom-0 bg-main/75">
          <header className="w-full max-w-screen-2xl h-32 mx-auto px-20 flex items-center text-white">
            <div className="mr-20 text-3xl font-bold">
              <Link href="/">Inteli | Hackathon</Link>
            </div>
            <div className="w-full flex items-center justify-between">
                <div>
                   <h1>Membros:</h1> 
                   <ul>
                    <li>
                        <Link href="https://www.linkedin.com/in/artur-carafizi-hashimoto-b69819261/">
                            Lucas Carafizi Hashimoto
                        </Link>
                    </li> 
                    <li>
                        <Link href="https://www.linkedin.com/in/artur-carafizi-hashimoto-b69819261/">
                            Artur Carafizi Hashimoto
                        </Link>
                    </li> 
                    <li>
                        <Link href="https://www.linkedin.com/in/artur-carafizi-hashimoto-b69819261/">
                            Nityananda Vianna Saraswati
                        </Link>
                    </li>
                   </ul>
                </div>
                <div className="w-28 ">
                    <Link href="https://github.com/Lucasch1/COMARKET.git">
                        <Image src={github} alt="github"/>
                    </Link>
                </div>
                 
              
            </div>
          </header>
        </div>
      </>
    );
    
}
