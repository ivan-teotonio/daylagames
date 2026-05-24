
interface LabelProps {
    name: string;
}

export function Label({ name }: LabelProps) {
    return (
        <div className="text-black flex-grow sm:flex-grow-0 py-1 px-3 bg-slate-50 rounded-lg text-center hover:font-bold transition-all duration-300">
            {name}
        </div>
    )
}