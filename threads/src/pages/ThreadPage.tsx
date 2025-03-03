import { useEffect, useState } from "react";
import "../index.css";
import Header from "./components/Header";
import { useLocation, useParams } from "react-router-dom";
import { ThreadWithPost } from "types/thread";


interface ThreadName {
  threadName: string;
}
function ThreadPage() {
  const location = useLocation();
  const { threadName } = location.state as ThreadName;

  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<ThreadWithPost>();
  const [post, setPost] = useState<string>("");
 

  const fetchPosts = async () => {
    const response = await fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${id}/posts`
    );
    if (!response.ok) {
      console.log("サーバーエラー");
      return;
    }
    const data = await response.json();
    setThread(data);
    console.log(data);
  };

  const onSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${id}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: post }),
      }
    );
    if (!response.ok) {
      console.error("サーバーエラー");
      return;
    }
    setPost("");
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, [id]);

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "120px", maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
      
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <label style={{ display: "block", fontSize: "30px", fontWeight: "bold", marginBottom: "8px" }}>
            {threadName}
          </label>
       

          { thread &&thread.posts.map((post) => (
            <div key={post.id} style={{ padding: "16px", border: "2px solid black", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "background-color 0.3s" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "600" }}>{post.post}</h2>
            </div>
          ))}
        </div>
        <form onSubmit={onSubmitPost}>
          <input type="text"  value={post}
              onChange={(e) => setPost(e.target.value)}placeholder="投稿しよう" />
          <button type="submit">投稿</button>
        </form>
      </div>
    </div>
  );
}

export default ThreadPage;