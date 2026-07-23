import { useState } from "react";

function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      farmer: "Ravi Kumar",
      crop: "Rice",
      question: "My rice leaves are turning yellow. What should I check first?",
      replies: 3,
    },
    {
      id: 2,
      farmer: "Sunita Patil",
      crop: "Tomato",
      question: "Has anyone faced whitefly problems in tomato this season?",
      replies: 5,
    },
  ]);

  const [crop, setCrop] = useState("");
  const [question, setQuestion] = useState("");

  function addPost(event) {
    event.preventDefault();

    if (!crop || !question.trim()) {
      return;
    }

    const newPost = {
      id: Date.now(),
      farmer: "You",
      crop,
      question,
      replies: 0,
    };

    setPosts([newPost, ...posts]);
    setCrop("");
    setQuestion("");
  }

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto" }}>
      <h1>Farmer Community</h1>
      <p>Ask questions, share experiences, and learn from other farmers.</p>

      <form
        onSubmit={addPost}
        style={{
          marginTop: "24px",
          padding: "22px",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          display: "grid",
          gap: "14px",
        }}
      >
        <h2 style={{ margin: 0, color: "#166534" }}>Ask the community</h2>

        <select
          value={crop}
          onChange={(event) => setCrop(event.target.value)}
          style={{ padding: "12px" }}
        >
          <option value="">Select crop</option>
          <option>Rice</option>
          <option>Wheat</option>
          <option>Cotton</option>
          <option>Tomato</option>
          <option>Potato</option>
        </select>

        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Write your crop-related question..."
          rows="4"
          style={{ padding: "12px", resize: "vertical" }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#166534",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Post Question
        </button>
      </form>

      <div style={{ display: "grid", gap: "16px", marginTop: "28px" }}>
        {posts.map((post) => (
          <article
            key={post.id}
            style={{
              padding: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              backgroundColor: "white",
            }}
          >
            <p style={{ color: "#166534", fontWeight: "bold", marginTop: 0 }}>
              {post.farmer} • {post.crop}
            </p>

            <p style={{ fontSize: "17px" }}>{post.question}</p>

            <button
              onClick={() => alert("Replies section will be connected later.")}
              style={{
                color: "#166534",
                backgroundColor: "#dcfce7",
                border: "none",
                borderRadius: "8px",
                padding: "9px 12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              💬 {post.replies} Replies
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Community;