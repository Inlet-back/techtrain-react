import { useCallback, useEffect, useState } from "react";
import "../index.css";
import Header from "./components/Header";
import { useLocation, useParams } from "react-router-dom";
import { ThreadWithPost } from "types/thread";
import Button from "./components/Button";
import { z } from "zod";
import { PostSchema } from "@lib/post";
import { SubmitHandler, useForm } from "react-hook-form";

interface ThreadName {
  threadName: string;
}
type PostData = z.infer<typeof PostSchema>;
function ThreadPage() {
  const location = useLocation();
  const { threadName } = location.state as ThreadName;

  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<ThreadWithPost | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
  } = useForm<PostData>();

  const fetchPosts= useCallback(
    async () => {
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

    setThread((prev) => {
      if (  offset === 0) {
        return {
          ...prev!,
          posts: data.posts,
        };
      } else {
        return {
          ...prev!,
          posts: [...(prev?.posts || []), ...data.posts],
        };
      }
    });
   
  },[id,offset]
  );

  const onSubmitPost: SubmitHandler<PostData> = useCallback( 
    async (data : PostData) => {

    const response = await fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${id}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      console.error("サーバーエラー");
      return;
    }
  
    fetchPosts();
  },[id,fetchPosts]
  );

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
          {thread && thread.posts.map((post,index) => (
            <div key={post.id+index} style={{ padding: "16px", border: "2px solid black", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "background-color 0.3s" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "600" }}>{post.post}</h2>
            </div>
          ))}
           {hasMore && (
            <button onClick={() => setOffset((prevOffset) => prevOffset + 10)} style={{ marginTop: "16px", padding: "12px 24px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", fontSize: "16px" }}>
              もっと見る
            </button>
          )}
        </div>
        <div style={{ flex: 1 ,paddingTop: "200px", maxWidth: "1200px", margin: "0 auto", padding: "16px", display: "flex", gap: "16px", top: "120px"}}>
          <form onSubmit={handleSubmit(onSubmitPost)} style={{paddingTop:"50px",position: "fixed" }} >
            <input
              type="text"
              {...register("post", { required: "Post is required" })}
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