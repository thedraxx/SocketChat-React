import { useState } from 'react'
import { Message } from '../interface/IbodyMessage'

const Inputs = () => {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<Message[]>([])

    const reciveMessage = (message: Message) => {
        setMessages((state) => ([...state, message]))
    }

    return {
        message,
        setMessage,
        messages,
        setMessages,
        reciveMessage,
    }
}

export default Inputs