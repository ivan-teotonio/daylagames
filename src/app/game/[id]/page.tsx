import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";

type Props = {
    params: Promise<{ id: string }>
}


async function getData(id: string) {
//  https://sujeitoprogramador.com/next/?api=game&id=1
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`);
    return res.json();
  } catch (err) {
    throw new Error("Failed to fech data")
  }
}

export default async function Game({ params }: Props) 
{
    const { id } = await params;
    const data: GameProps = await getData(id);
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

                <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
           </Container>       
            
        </main>
    )
}