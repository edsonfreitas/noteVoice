import { useState  } from "react"
import logo from "./assets/logo-edson.svg"
import Cards from "./components/cards"
import NewNote from "./components/new-note"

interface  Note{
    id: string,
    date: Date,
    content: string
}
export function App() {
  const [notes, setNotes] = useState<Note[]>([])

  function onNoteCreated(content: string){
    const newNote ={
      id : crypto.randomUUID(),
      date: new Date(),
      content,
    }

    setNotes([newNote, ...notes])
  }

  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo}  alt="Logo Edson"/>

      <form className="w-full">
        <input
        type="text"
        placeholder="Busque as suas notas..."
        className="w-full bg-transparent text-3xl font-semibold tracking-tighter placeholder:text-slate-500 outline-none"
        />
      </form>

      <div className="h-px bg-details" />

      <div
        className="grid grid-cols-3 gap-6 auto-rows-[250px]"
        >
        <NewNote onNoteCreated={onNoteCreated} />

          {notes.map(note =>{
            return <Cards key={note.id} note={note} />
          })}

        </div>
        <h1></h1>


    </main>
  )
}
