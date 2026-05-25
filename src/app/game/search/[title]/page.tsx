import { GameProps } from "@/utils/types/game";
import { Container } from "@/components/container";
import { Input } from '@/components/input';
import { GameCard } from "@/components/gameCard";
import { Metadata } from "next";

interface PropsParams{
  params: {
    id: string;
  }
}

//metadada perssonalizada para cada jogo encontrado 
export async function generateMetadata({ params }: PropsParams):Promise<Metadata> {
  try {
    const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,{ next: { revalidate: 60 } })
    .then((res) => res.json())
    .catch(() => {
      return {
        title: "DalyGames - Descubra jogos incriíveis para para se divertir."
      }
    })

    return {
      title: response.title,
      description: `${response.description.slice(0,100)}...`,
      openGraph: {
        title: response.title,
        //se comparilhar a página aparece a imagem
        images: [response.image_url]
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true
        }
      }
    }

  } catch (err) {
    return {
      title: "DalyGames - Descubra jogos incriíveis para para se divertir."
    }
  }
}

async function getData(title: string) {
  console.log(`Searching for game: ${title}`);
    try {
    //tira % e deixa o texto normal
      const decodeTitle = decodeURI(title);
      const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`,{next: {revalidate: 320}});
      const data = res.json();
      return data;
    } catch (err) {
        return null;
    }
}

   export default async function Search({
      params,
    }: {
      params: Promise<{ title: string }>
    }) {

     const { title } = await params;

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