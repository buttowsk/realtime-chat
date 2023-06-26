import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import * as uuid from "uuid";


interface Message {
  id: string;
  name: string;
  text: string;
}

interface Payload {
  name: string;
  text: string;
}

const socket = io("http://localhost:3001");

export const Card = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const receivedMessage = (message: Payload) => {
      const newMessage: Message = {
        id: uuid.v4(),
        name: message.name,
        text: message.text,
      };
      setMessages([...messages, newMessage]);
    };

    socket.on("msgToClient", (message: Payload) => {
      receivedMessage(message);
    });
  }, [messages, name, text]);

  const sendMessage = () => {
    console.log(name, text);
    const message: Payload = {
      name,
      text,
    };
    socket.emit("msgToServer", message);
    setText("");
  };


  return (
    <div
      className="container max-w-md flex items-center justify-end flex-col gap-1 mx-auto p-4 border-solid border-2 border-sky-500 rounded-md h-96 max-h-96 bg-sky-100"
    >
      <input
        className="w-full p-2 rounded-md border-solid border-emerald-200 border"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="container p-2 flex-1 bg-amber-50 rounded-md">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col gap-1">
            <span className="font-bold">{message.name}</span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="container flex items-center justify-between gap-4">
        <input
          className="flex-1 p-1 rounded-md border-solid border-emerald-200 border"
          type="text"
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-blue-300 rounded-md py-1 px-6"
                onClick={() => sendMessage()}>Send
        </button>
      </div>
    </div>
  );
};


