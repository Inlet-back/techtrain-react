import { useEffect, useState } from "react";
import "../index.css";
import { Thread } from "types/thread";
import Header from "./components/Header";
import { Link} from "react-router-dom";

function MainPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
 

  const fetchThreads = async () => {
    const response = await fetch(
      `https://railway.bulletinboard.techtrain.dev/threads?offset=${offset}`
    );
     if (!response.ok) {
      console.error("サーバーエラー");
      return;
    }
    const data = await response.json();
   if(data.length < 10) {
      setHasMore(false);
    }
      setThreads((prev) => [...prev, ...data]);

  };

  useEffect(() => {
    fetchThreads();
  }, [offset]);

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "120px", maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
      
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <label style={{ display: "block", fontSize: "30px", fontWeight: "bold", marginBottom: "8px" }}>
            新着スレッド
          </label>
          {threads && threads.map((thread,index) => (
            <div 
            key={`${thread.id}-${index}`} 
            style={{ padding: "16px", border: "2px solid black", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "background-color 0.3s" }}
            >
              <Link to={`/threads/${thread.id}`} style={{ textDecoration: "none", color: "black" }} state={{ threadName: thread.title }}>
              <h2 style={{ fontSize: "20px", fontWeight: "600" }}>{thread.title}</h2>
              <p style={{ color: "red" }}>{thread.content}</p>
              </Link>
            </div>
            
          ))}
            {hasMore && (
            <button onClick={() => setOffset((prevOffset) => prevOffset + 10)} style={{ marginTop: "16px", padding: "12px 24px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", fontSize: "16px" }}>
              もっと見る
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;