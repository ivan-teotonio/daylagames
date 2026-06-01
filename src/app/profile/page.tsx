import { Container } from "@/components/container";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";
import FavoriteCard from "./components/favorite";
import { Metadata } from "next";
import FavoriteCardTest from "./components/FaviriteTest";

export const metadata: Metadata = {
    title: "Perfil - DalyGames",
    description: "Veja seus jogos favoritos, configurações e compartilhe seu perfil com amigos.",
}

export default function Profile() {
    return (
        <main className="w-full text-black">
            <Container>
                <section className="mt-6 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row"
                >
                <div className="w-full flex items-center gap-4 text-lg flex-col sm:flex-row justify-centersm:justify-normal">
                    <Image 
                        src="/user.png"
                        alt="Profile Image"
                        className="rounded-full w-56 h-56 object-cover"
                        width={200}
                        height={200}
                         quality={100}
                    />
                    <h1 className="font-bold text-2xl">Sujeito Programador</h1>
                    </div>

                    {/* <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2"> */}
                    <div className="gap-3 flex items-center justify-center mt-2 self-center sm:self-start">
                        <button className="bg-gray-700 px-4 py-3 rounded-lg text-white">
                            Configurações
                        </button>
                        <button className="bg-gray-700 px-4 py-3 rounded-lg">
                            <FaShareAlt size={24} color="#fff" />
                        </button>
                    </div>
                </section>   

                <section className="flex flex-wrap gap-5 flex-col md:flex-row">
                   <div className="flex-grow flex-wrap">
                     <FavoriteCard id={1} />
                    </div>
                    <div className="flex-grow flex-wrap">
                     <FavoriteCard id={2} />
                    </div>
                    <div className="flex-grow flex-wrap">
                     <FavoriteCard id={3}   />
                   </div>
                </section>

                <FavoriteCardTest id={1} />

            </Container>
        </main>
    )
}