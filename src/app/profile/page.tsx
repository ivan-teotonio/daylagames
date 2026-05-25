import { Container } from "@/components/container";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";

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

                    <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2">
                        <button className="bg-gray-700 px-4 py-3 rounded-lg text-white">
                            Configurações
                        </button>
                        <button className="bg-gray-700 px-4 py-3 rounded-lg">
                            <FaShareAlt size={24} color="#fff" />
                        </button>
                    </div>
                </section>                
            </Container>
        </main>
    )
}