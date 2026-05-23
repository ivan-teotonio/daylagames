'use client'

import { useState } from "react"; // Removeu o FormEvent daqui
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';


export function Input() {
    const [input, setInput] = useState("");
    const router = useRouter();

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(input === "") return;

        router.push(`/game/search/${input}`);

    }


    

    return (
        <form onSubmit={handleSearch} 
        className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2">
            <input type="text" className="w-11/12 bg-transparent outline-none"
            placeholder="Procurando algum jogo?..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
                <FiSearch size={24} color="#ea580c" />
            </button>
        </form>
    )
}