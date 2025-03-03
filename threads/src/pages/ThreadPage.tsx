import { useEffect, useState } from "react";
import "../index.css";
import Header from "./components/Header";
import { useLocation, useParams } from "react-router-dom";
import { ThreadWithPost } from "types/thread";
import Button from "./components/Button";

interface ThreadName {
  threadName: string;
}

function ThreadPage() {
  const location = useLocation();
  const { threadName } = location.state as ThreadName;

  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<ThreadWithPost | null>(null);
  const [post, setPost] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPosts = async () => {
    const response = await fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${id}/posts?offset=${offset}`
    );
    if (!response.ok) {
      console.log("サーバーエラー");
      return;
    }
    const data :ThreadWithPost = await response.json();
    if (data.posts.length < 10) {
      setHasMore(false);
    }

    setThread((prev) => ({
      ...prev!,
      posts: [...(prev?.posts || []), ...data.posts],
    }));
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
  }, [id,offset]);

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "120px", maxWidth: "1200px", margin: "0 auto", padding: "16px", display: "flex", gap: "16px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "30px", fontWeight: "bold", marginBottom: "8px" }}>
            {threadName}
          </label>
          {thread && thread.posts.map((post) => (
            <div key={post.id} style={{ padding: "16px", border: "2px solid black", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "background-color 0.3s" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "600" }}>{post.post}</h2>
            </div>
          ))}
           {hasMore && (
            <button onClick={() => setOffset((prevOffset) => prevOffset + 10)} style={{ marginTop: "16px", padding: "12px 24px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", fontSize: "16px" }}>
              もっと見る
            </button>
          )}
        </div>
        <div style={{ flex: 1 ,paddingTop: "200px", maxWidth: "1200px", margin: "0 auto", padding: "16px", display: "flex", gap: "16px"}}>
          <form onSubmit={onSubmitPost}>
            <input
              type="text"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="投稿しよう"
              style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px" }}
              required
            />
            <Button
              type="submit"
              style={{ backgroundColor: "blue", color: "white", marginTop: "8px", padding: "12px 24px", border: "none", borderRadius: "4px", fontSize: "16px" }}
            >
              作成
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ThreadPage;