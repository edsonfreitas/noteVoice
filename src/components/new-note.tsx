import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'


interface newNoteCreatedPros{
  onNoteCreated:(content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;
export default function NewNote({onNoteCreated}: newNoteCreatedPros) {


  const [ shouldShowOnboarding, setShoudShowOnboarding ] = useState(true);
  const [content, setContent] = useState('');
  const [isRecording, useIsRecording] = useState(false)

  function handleStartEditor(){
    setShoudShowOnboarding(false);
  };


  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>){
    setContent(event.target.value)

    if(event.target.value === ''){
      setShoudShowOnboarding(true)
    }
  };

  function handleSaveNote(event: FormEvent){
    event.preventDefault();
    if(content === ''){
      return
    }
      onNoteCreated(content);
      setContent('');
      setShoudShowOnboarding(true);
    toast.success("Nota criada com  sucesso!", {duration:2000});
  };

  function handleStartRecording(){
    const isSpeechRecoginitionAPIAvailable = "SpeechRecognition" in  window || "webkitSpeechRecognition" in   window;
    if(!isSpeechRecoginitionAPIAvailable){
      alert("Infelizmente seu navegador não suporta a API de gravação")
      return
    }

    useIsRecording(true);
    setShoudShowOnboarding(false);
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

   speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      },'')

        setContent(transcription);

      }
      // Finaliza o reconhecimento da fala
      speechRecognition.onerror = (error) =>{
        console.log(error);
      }
      speechRecognition.start();
    console.log("start recording");
  };


  function handleStopRecording(){
    useIsRecording(false)

    if(speechRecognition !==  null){
      speechRecognition.stop();
  };
}

  return (

      <Dialog.Root>
      <Dialog.Trigger
       className="rounded-md flex flex-col bg-slate-700 text-left p-5 gap-3  overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
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

        </Dialog.Trigger>
        <Dialog.Portal>
              <Dialog.Overlay
                className='inset-0 fixed bg-black/50'>
                <Dialog.Content
                  className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>
                    <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                      <X className='size-5'/>
                    </Dialog.Close>
                    {/*Div Content*/}
                  <form
                    className='flex-1 flex flex-col'>
                      <div
                        className='flex flex-1 flex-col gap-3 p-5'>
                          <span
                            className='text-sm-medium text-slate-300'>
                              Adicionar nota
                          </span>
                              {/*Inicio do Onboarding*/}
                            {shouldShowOnboarding ? (
                              <p className='text-sm-medium text-slate-300'>
                                Comece  <button
                                type='button'
                                onClick={handleStartRecording}
                                className='font-medium text-lime-400 hover:underline'>gravando</button> uma nota em áudio ou se preferir
                                   <button
                                   type='button'
                                   onClick ={handleStartEditor} className='font-medium text-lime-400 hover:underline'>
                                  utilize apenas texto.
                                </button>
                              </p>
                            ) : (
                              <textarea
                                autoFocus
                                className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                                onChange={handleContentChange}
                                value={content}>

                              </textarea>
                            )}
                            {/*Inicio do Onboarding*/}
                      </div>
                      {/*Div Content*/}

                      {/*Inicio if*/}
                      {isRecording ? (
                        <button
                        type='button'
                        onClick={handleStopRecording}
                        className='w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100
                        '
                        >
                          <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                          Gravando! (clique p/ interromper)
                        </button>
                      ) :(
                        <button
                        type='button'
                        onClick={handleSaveNote}
                        className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'>
                          Salvar nota

                        </button>
                      )}{/*Fim if*/}

                      </form>
                </Dialog.Content>
              </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
  )
}
