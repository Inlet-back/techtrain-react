import { useState } from "react";
import { threadSchema } from "@lib/thread";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Button from "./components/Button";

function CreateThreadPage() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmitThread = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = threadSchema.safeParse({ title });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    const response = await fetch(
      "https://railway.bulletinboard.techtrain.dev/threads",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      }
    );

    if (response.ok) {
      navigate("/");
    } else {
      setError("Failed to create thread");
    }
  };

  return (
    <div>
      <Header />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", marginTop: "100px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "white", marginBottom: "24px" }}>スレッドを新規作成</h2>
        <form onSubmit={onSubmitThread} style={{ width: "100%", maxWidth: "600px", padding: "16px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
              タイトル
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="スレッドタイトル"
              style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px" }}
              required
            />
            {error && <p style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>{error}</p>}
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