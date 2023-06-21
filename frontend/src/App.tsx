import { useEffect, useState } from "react"
import io from "socket.io-client"
const socket = io("/")

interface Message {
  body: string;
  from: string;
}

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
      from: "Me"
    } as any
    setMessages([...messages, newMessage])
    socket.emit("message", message);
  }

  useEffect(() => {
    socket.on("message", reciveMessage);
    return () => {
      socket.off("message", reciveMessage)
    }
  }, [])


  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e)
        }
        }
      >
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          placeholder="Enter your message..."
        />
        <button type="submit">Send</button>
      </form>

      <ul>
        {
          messages.map((message, index) => {
            return (
              <li key={index}>
                {message.body} :
                {message.from}
              </li>
            )
          }
          )
        }
      </ul>

    </div>
  )
}

export default App