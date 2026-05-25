"use client"
import { useState } from "react"; 
import { FiEdit, FiX } from "react-icons/fi";


export default function FavoriteCard() {
    const [input, setInput] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [gameName, setGameName] = useState('');

    function handleButton() {
        setShowInput(!showInput);
        if(input !== "" ){
          setGameName(input);
        }
        //voltar o input para vazio quando fechar 
        setInput("");
    }

    return (
      
        <div className="w-full bg-gray-900 p-4 h-44 rounded-lg flex justify-between flex-col">
           { showInput ? (
               <div className="flex items-center justify-center ga-3">
                <input type="text" className="bg-white rounded-md outline-none w-full h-8 text-black px-2"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleButton}>
                    <FiX size={24} color="#fff" />
                </button>
               </div>
           ): (
              <button onClick={handleButton} className="self-start hover:scale-110 duration-200 transition-all">
                <FiEdit size={24} color="#fff" />
            </button>
           )}

           {gameName && (
             <div>
               <span className="text-white">Jogo Favorito:</span>
               <p className="text-white font-bold">{gameName}</p>
             </div>
           )}

            {!gameName && (
                <p className="font-bold text-white">Adicionar Jogo</p>
            )}
        </div>

    )
}