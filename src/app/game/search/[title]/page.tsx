import { GameProps } from "@/utils/types/game";
import { Container } from "@/components/container";
import { Input } from '@/components/input';
import { GameCard } from "@/components/gameCard";
import { title } from "process";

async function getData(title: string) {
  console.log(`Searching for game: ${title}`);
    try {
      const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${title}`);
      const data = res.json();
      return data;
    } catch (err) {
        return null;
    }
}

   export default async function Search({
      params,
    }: {
      params: { title: string }
    }) {

     const { title } = params;

    const games: GameProps[] = await getData(title);
    
    return (
        <main className="w-full text-black">
           <Container>
             <Input />

             <h1 className='font-bold text-xl mt-8 mb-5'>Veja o que encontramos na nossa base:</h1>

             {!games && (
                <p>Esse jogo não foi encontrado!...</p>
             )}

             <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
               {games && games.map( (item) => (
                    <GameCard key={item.id} data={item} />
               ))}
             </section>

           </Container>
        </main>
    )
}