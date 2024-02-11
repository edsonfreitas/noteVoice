import { ChangeEvent, useState  } from "react"
import logo from "./assets/logo-edson.svg"
import Cards from "./components/cards"
import NewNote from "./components/new-note"

interface  Note{
    id: string,
    date: Date,
    content: string
}
export function App() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>(()=>{
    const notesOnStorage = localStorage.getItem("notes")
    if(notesOnStorage){
      return JSON.parse(notesOnStorage);
    }
      return[];
  })

  function onNoteCreated(content: string){
    const newNote ={
      id : crypto.randomUUID(),
      date: new Date(),
      content,
    }
    const  notesArray =[...notes , newNote];
    setNotes(notesArray);

    localStorage.setItem( 'notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value


    setSearch(query);
  }

  const filteredNotes = search != "" ? notes.filter((note)=>{
     return note.content.toLowerCase().includes(search.toLowerCase())
   }) : notes;


  return (
    <main className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo}  alt="Logo Edson"/>

      <form className="w-full">
        <input
        type="text"
        placeholder="Busque as suas notas..."
        className="w-full bg-transparent text-3xl font-semibold tracking-tighter placeholder:text-slate-500 outline-none"
        onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-details" />

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]"
        >
        <NewNote onNoteCreated={onNoteCreated} />

          {filteredNotes.map(note =>{
            return <Cards key={note.id} note={note} />
          })}

        </div>



    </main>
  )
}
