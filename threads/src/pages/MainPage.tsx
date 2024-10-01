import { useEffect, useState } from "react";

function MainPage() {
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
    <div>
      <h1>Thread List</h1>
      <div>
        {threads.map((thread) => (
          <div key={thread.id}>
            <h2>{thread.title}</h2>
            <p>{thread.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
