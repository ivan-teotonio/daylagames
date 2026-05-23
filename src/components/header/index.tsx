import logImg from 'public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

import { LiaGamepadSolid } from 'react-icons/lia'

export function Header() {
    return (
        <header className="w-full h-28 bg-slate-100 text-black px-2">
            <div className="max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
               <nav className="flex justify-center items-center gap-4">
                 <Link href="/">
                   <Image src='/logo.svg' 
                    className="w-full"
                    width={200}
                    height={50} 
                    quality={100}
                    alt="Logo do site"
                    priority
                    />
                 </Link>
                 
                 <Link href="/games">
                    Games
                 </Link>

                 <Link href="/profile">
                   Perfil
                 </Link>
               </nav>

                <div className="hidden sm:flex justify-around items-center">
                    <Link href="/profile">
                      <LiaGamepadSolid size={34} color="#475569" />
                    </Link>
                </div>

            </div>
        </header>
    )
}