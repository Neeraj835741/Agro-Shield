import { useState } from "react";
import { MessageCircle, ThumbsUp, User, Send } from "lucide-react";

function Community() {
  const [newPost, setNewPost] = useState("");
  
  // Dummy data to make the UI look alive for the hackathon demo
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Rajesh Kumar",
      time: "2 hours ago",
      content: "Has anyone tried the new organic pesticide for tomato blight? I am seeing spots on my lower leaves and want to act fast.",
      likes: 12,
      replies: 4,
    },
    {
      id: 2,
      author: "Amit Singh",
      time: "5 hours ago",
      content: "Just harvested my wheat crop! The AgroShield calendar reminders really helped me time the irrigation perfectly this season.",
      likes: 34,
      replies: 2,
    },
    {
      id: 3,
      author: "Priya Sharma",
      time: "1 day ago",
      content: "Warning for farmers in the Pune district: Heavy unseasonal rain expected this weekend. Make sure to cover your harvested crops!",
      likes: 89,
      replies: 15,
    }
  ]);

  function handlePostSubmit(e) {
    e.preventDefault();
    if (!newPost.trim()) return;

    // Add the new post to the top of the feed temporarily
    const post = {
      id: Date.now(),
      author: "You (Demo User)",
      time: "Just now",
      content: newPost,
      likes: 0,
      replies: 0,
    };

    setPosts([post, ...posts]);
    setNewPost("");
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ color: "#14532d", margin: "0 0 8px 0" }}>Farmer Community</h1>
        <p style={{ color: "#4b5563", margin: 0 }}>Ask questions, share advice, and connect with local farmers.</p>
      </div>

      {/* CREATE POST BOX */}
      <form 
        onSubmit={handlePostSubmit}
        style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", marginBottom: "30px" }}
      >
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind? Ask the community..."
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", minHeight: "100px", resize: "vertical", boxSizing: "border-box", marginBottom: "12px", fontFamily: "inherit" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button 
            type="submit"
            style={{ backgroundColor: "#166534", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          >
            <Send size={18} />
            Post Question
          </button>
        </div>
      </form>

      {/* COMMUNITY FEED */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {posts.map((post) => (
          <div key={post.id} style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            
            {/* Author Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ backgroundColor: "#dcfce7", padding: "10px", borderRadius: "50%", color: "#166534" }}>
                <User size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "16px", color: "#1f2937" }}>{post.author}</h3>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>{post.time}</span>
              </div>
            </div>

            {/* Post Content */}
            <p style={{ color: "#374151", lineHeight: "1.5", marginBottom: "16px" }}>
              {post.content}
            </p>

            {/* Interaction Buttons */}
            <div style={{ display: "flex", gap: "20px", borderTop: "1px solid #f3f4f6", paddingTop: "12px" }}>
              <button style={{ background: "none", border: "none", color: "#6b7280", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", padding: 0 }}>
                <ThumbsUp size={18} />
                <span style={{ fontSize: "14px", fontWeight: "500" }}>{post.likes} Likes</span>
              </button>
              <button style={{ background: "none", border: "none", color: "#6b7280", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", padding: 0 }}>
                <MessageCircle size={18} />
                <span style={{ fontSize: "14px", fontWeight: "500" }}>{post.replies} Replies</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;