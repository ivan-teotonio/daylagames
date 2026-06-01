"use client"
import { useState, useEffect } from "react"; // 1. Importamos o useEffect
import { FiEdit, FiX } from "react-icons/fi";
import Image from "next/image";

export default function FavoriteCard({ id }: { id: number }) {
    const [input, setInput] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [game, setGame] = useState<any>(null);

    const storageKey = `@gameprofile-${id}`;

    // 2. BUSCAR O JOGO SALVO: Assim que o componente carrega na tela
    useEffect(() => {
        const savedGame = localStorage.getItem(storageKey);
        if (savedGame) {
            setGame(JSON.parse(savedGame)); // Transforma o texto salvo de volta em Objeto
        }
    },  [storageKey]); // Colocamos o storageKey como dependência para garantir que cada card busque seu próprio jogo

    async function handleButton() {
        setShowInput(!showInput);

        if (input !== "") {
            try {
                const response = await fetch(`https://sujeitoprogramador.com/next-api/?api=game&title=${input}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    setGame(data[0]); 
                    
                    // 3. SALVAR NO NAVEGADOR: Guarda o jogo em formato de texto
                    localStorage.setItem(storageKey, JSON.stringify(data[0]));
                } else {
                    alert("Jogo não encontrado!");
                    setGame(null);
                    localStorage.removeItem("@gameprofile"); // Limpa se não achar
                }
            } catch (error) {
                // 4. ALERTA APENAS SE DER ERRO: Mantemos este por segurança
                alert("Erro ao buscar o jogo no servidor. Tente novamente mais tarde.");
                console.log("Erro ao buscar o jogo:", error);
                setGame(null);
            }
        }

        setInput("");
    }

    return (
        <div className="w-full bg-gray-900 p-4 h-44 rounded-lg flex justify-between flex-col relative overflow-hidden group">
           
           <div className="z-20 w-full flex justify-between items-center">
               { showInput ? (
                   <div className="flex items-center justify-center gap-3 w-full">
                        <input 
                         type="text" 
                         className="bg-white rounded-md outline-none w-full h-8 text-black px-2"
                         value={input}
                         onChange={(e) => setInput(e.target.value)}
                         placeholder="Digite o nome do jogo..."
                        />
                        <button onClick={handleButton} className="z-20 cursor-pointer bg-gray-800 p-1.5 rounded-full hover:scale-110 transition-all">
                            <FiX size={20} color="#fff" />
                        </button>
                   </div>
               ): (
                  <button onClick={handleButton} className="z-20 cursor-pointer ms-auto bg-gray-800/80 p-2 rounded-full hover:scale-110 duration-200 transition-all">
                    <FiEdit size={18} color="#fff" />
                  </button>
               )}
           </div>

           {game && (
              <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  <Image 
                      src={game.image_url} 
                      alt={game.title}
                      fill={true}
                      className="object-cover opacity-35 group-hover:opacity-50 transition-all duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
              </div>
           )}

           <div className="z-20 mt-auto">
               {game ? (
                 <div>
                   <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-0.5">Jogo Favorito</span>
                   <p className="text-white font-bold text-xl truncate drop-shadow-md">{game.title}</p>
                 </div>
               ) : (
                    !showInput && <p className="font-bold text-white text-lg">Adicionar Jogo</p>
               )}
           </div>

        </div>
    )
}