import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { Label } from "./components/label";
import { GameCard } from "@/components/gameCard";

type Props = {
    params: Promise<{ id: string }>
}


async function getData(id: string) {
//  https://sujeitoprogramador.com/next/?api=game&id=1
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,{ next: { revalidate: 60 } });
    return res.json();
  } catch (err) {
    throw new Error("Failed to fech data")
  }
}

async function getGameSorted() {
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`,{ cache: "no-store" });
        return res.json();
    } catch (err) {
        throw new Error("Failed to fetch data")
    }
}

export default async function Game({ params }: Props) 
{
    const { id } = await params;
    const data: GameProps = await getData(id);
    const sortedGame: GameProps= await getGameSorted();
    if(!data) redirect("/")
        
    return (
        <main className="w-full text-black">
           <div className="bg-black h-80 w-full relative sm:h-96">
             <Image 
              className="object-cover w-full h-80 sm:h-96 opacity-80"
              src={data.image_url}
              alt="Imagem detalhe do jogo"
              priority={true}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
              quality={100}
             />
           </div>

           <Container>
              <h1 className="my-4 font-bold text-xl">{data.title}</h1>
                <p>{data.description}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
                <div className="flex gap-2 flex-wrap">
                  {data.platforms.map((item) => (
                     <Label name={item} key={item} />
                  ))}
                </div>

                <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
                <div className="flex gap-2 flex-wrap">
                  {data.categories.map((item) => (
                     <Label name={item} key={item} />
                  ))}
                </div>

                <p className="mt-7 mb-2 text-black"><strong>Data de lançamento:</strong> {data.data_release}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Jogos reconmendado:</h2>
                <div className="flex">
                  <div className="flex-grow">
                    <div>
                        <GameCard data={sortedGame} />
                    </div>
                  </div>
                </div>

           </Container>       
            
        </main>
    )
}