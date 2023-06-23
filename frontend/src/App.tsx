import { useEffect, useState } from 'react';
import io from "socket.io-client"
import Inputs from "./helpers/Inputs"
import { Message } from "./interface/IbodyMessage"
const socket = io("/")

const App = () => {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const reciveMessage = (message: Message) => {
    setMessages((state) => ([...state, message]))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
      date: new Date().toLocaleTimeString([], { timeStyle: 'short' })
    } as Message
    setMessages([...messages, newMessage])
    socket.emit("message", message);
    setMessage("")
  }

  useEffect(() => {
    socket.on("message", reciveMessage);
    return () => {
      socket.off("message", reciveMessage)
    }
  }, [])


  return (
    <div
      className="h-screen bg-[url('./background.jpg')] text-white flex items-center justify-center flex-col"
    >
      <form
        onSubmit={(e) => { handleSubmit(e) }}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <div
          className="flex flex-col items-center justify-center h-screen pt-5 pb-5  "
        >
          <ul
            className="flex flex-col items-center justify-center w-screen h-screen pl-36 pr-36"
          >
            {
              messages.map((message, index) => {
                return (
                  <li
                    key={index}
                    className={`border-2 border-black  my-2 p-2 table text-xl rounded-xl
                ${message.from === "Me" ? "bg-green-700 ml-auto" : "bg-gray-800  mr-auto "}`
                    }
                  >
                    {message.body}
                    <br />
                    <p
                      className="text-xs text-gray-400"
                    >
                      {message.date}
                    </p>

                  </li>
                )
              }
              )
            }
          </ul>
        </div>

        <div
          className="flex flex-row items-center justify-center bg-gray-800 w-screen h-20 py-5 absolute bottom-0"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => { setMessage(e.target.value) }}
            placeholder=" Enter your message..."
            className="border-2 border-black py-2 w-6/12 rounded-xl bg-slate-700"
          />4
        </div>
        <button type="submit" className="hidden">Submit</button>
      </form>
    </div>
  )
}

export default App