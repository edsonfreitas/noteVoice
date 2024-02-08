import * as Dialog from '@radix-ui/react-dialog'
interface NoteCardProps{
  note: {
    date: Date,
    content: string
}
}


export default function cards({note}:NoteCardProps) {
  return (
          <Dialog.Root>
        <Dialog.Trigger
        className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
            <span
            className="text-sm-medium text-slate-300"
            >
              há ${note.date.toISOString()} dias
            </span>
          <p className="text-sm leading-6 text-slate-400"
          >
            {note.content}
          </p>

          <div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"

          />


        </Dialog.Trigger>
        <Dialog.Content>
          Primero modal com Radix :-0
        </Dialog.Content>
        </Dialog.Root>
  )
}
