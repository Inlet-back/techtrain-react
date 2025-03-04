import { useCallback, } from "react";
import { threadSchema } from "@lib/thread";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Button from "./components/Button";
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";

type PostThread = z.infer<typeof threadSchema>;

function CreateThreadPage() {


  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostThread>();
  

  const onSubmitThread:SubmitHandler<PostThread> = useCallback(
    async (data :PostThread) => {
    console.log(data);
    const response = await fetch(
      "https://railway.bulletinboard.techtrain.dev/threads",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( data ),
      }
    );
    if (!response.ok) {
      console.error("サーバーエラー");
      return;
    }
    navigate("/");
    },[navigate]
    
  )

    

  return (
    <div>
      <Header />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", marginTop: "100px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "white", marginBottom: "24px" }}>スレッドを新規作成</h2>
        <form onSubmit={handleSubmit(onSubmitThread)} style={{ width: "100%", maxWidth: "600px", padding: "16px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",position: "fixed"  }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
              タイトル
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="スレッドタイトル"
              style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px" }}
              required
            />
           {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              type="button"
              onClick={() => navigate("/")}
              style={{ backgroundColor: "gray", color: "white" }}
            >
              一覧に戻る
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: "blue", color: "white" }}
            >
              作成
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateThreadPage;