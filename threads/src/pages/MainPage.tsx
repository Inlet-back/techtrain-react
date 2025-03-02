import { useEffect, useState } from "react";
import "../index.css";
import { Thread } from "types/thread";
import Header from "./components/Header";

function MainPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
 

  const fetchThreads = async () => {
    const response = await fetch(
      "https://railway.bulletinboard.techtrain.dev/threads"
    );
    const data = await response.json();
    setThreads(data);
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "120px", maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
      
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <label style={{ display: "block", fontSize: "30px", fontWeight: "bold", marginBottom: "8px" }}>
            新着スレッド
          </label>
          {threads.map((thread) => (
            <div key={thread.id} style={{ padding: "16px", border: "2px solid black", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "background-color 0.3s" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "600" }}>{thread.title}</h2>
              <p style={{ color: "red" }}>{thread.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;