export default function NewNote() {
  return (
      <div
       className="rounded-md bg-slate-700 p-5 space-y-3  overflow-hidden relative hover:ring-2">
          <span
          className="text-sm-medium text-slate-200"
          >
            Adicionar nota
          </span>
          <p className="text-sm leading-6 text-slate-400"
          >
          Grave uma nota em áudio que será convertida para texto automaticamente
          </p>

          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"
        />

        </div>
  )
}
