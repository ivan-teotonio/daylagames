import Link from "next/link";
import { BiRightArrowCircle } from "react-icons/bi";
import Image from "next/image";

import { GameProps } from "@/utils/types/game";

interface GameCardProps {
   data: GameProps;
}

export function GameCard({ data }: GameCardProps ) {
    return (
     <Link href={`/game/${data.id}`}>
          <section className="w-full bg-slate-50 rounded-lg mb-5">
            <div className="relative w-full h-56 hover:scale-105 transition-all duration-300">
            <Image
            className="object-cover rounded-lg"
             src={data.image_url}
             alt={data.title} 
             quality={100}
             fill={true}
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
            />
            </div>

            <div className="flex justify-between items-center mt-4 p-2">
                <p className="text-sm font-bold px-2 text-black text-ellipsis truncate whitespace-nowrap overflow-clip">{data.title}</p>
                <BiRightArrowCircle size={24} color="#000" />
            </div>

        </section>
     </Link>
    )
}