import logo from "./assets/logo-edson.svg"
import Cards from "./components/cards"
import NewNote from "./components/new-note"
export function App() {



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
        <NewNote />
          <Cards note={{
            date: new Date(),
            content: "Primeira nota..."
          }}/>
          <Cards note= {{
            date: new Date(),
            content:"Segunda nota..."}}
          />
          <Cards note={{
              date: new Date(),
             content: "Terceira nota..."
            }}
            />
          <Cards note= {{
              date: new Date(),
             content:"Quarta nota..."}}
             />
          <Cards note= {{
            date: new Date(),
            content: "Quinta nota..."}}/>
        </div>
        <h1></h1>


    </main>
  )
}
