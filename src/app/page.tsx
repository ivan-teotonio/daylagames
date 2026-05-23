import { Container } from "@/components/container";
import Image from "next/image";
import { GameProps } from "@/utils/types/game";
import Link from "next/link";
import { BsArrowRightSquare } from 'react-icons/bs';

async function getDalyGames() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`,{next: {revalidate: 320}});
    return res.json();
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {

  const dailyGames: GameProps = await getDalyGames();

  console.log(dailyGames);

  return (
   <main className="w-full">
     <Container>
        <h1 className='text-center font-bold text-xl mt-8 mb-5'>Separamos um jogo exclusivo para você</h1>
        <Link href={`/game/${dailyGames.id}`}>
         <section className='w-full bg-black rounded-lg'>
          <div className='w-full max-h-96 h-96 relative rounded-lg'>
            <div className="absolute z-20 bottom-0 p-3 flex justify-center items-center gap-2">
              <p className='font-bold text-xl text-white'>{dailyGames.title}</p>
              <BsArrowRightSquare size={24} color="#fff" />
            </div>
            <Image
             src={dailyGames.image_url}
             alt={dailyGames.title} 
             priority quality={100} 
             fill={true}
             className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-400"
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw" 
            />
          </div>
         </section>
        </Link>
     </Container>
   </main>
  );
}
