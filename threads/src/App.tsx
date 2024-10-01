import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [threads, setThreads] = useState([]);
  const fetchThreads = async () => {
    const response = await fetch(
      "https://railway.bulletinboard.techtrain.dev/threads"
    );
    const data = await response.json();
    setThreads(data);
    console.log(data);
  };

  useEffect(() => {
    fetchThreads();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Thread List</h1>
      <div className="space-y-4">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className="p-4 border rounded shadow hover:bg-gray-100"
          >
            <h2 className="text-xl font-semibold">{thread.title}</h2>
            <p className="text-gray-700">{thread.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
