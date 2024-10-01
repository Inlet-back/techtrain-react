import { useState } from "react";
import { threadSchema } from "@lib/thread";
import { useNavigate } from "react-router-dom";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Thread</h1>
      <form onSubmit={onSubmitThread} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateThreadPage;
