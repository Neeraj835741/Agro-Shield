import { useState, useEffect } from "react";
import { MessageCircle, ThumbsUp, User, Send } from "lucide-react";
import { createCommunityPost, getCommunityPosts } from "../services/communityService";

function Community() {
  // State for loaded posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states matching the backend requirements
  const [message, setMessage] = useState("");
  const [crop, setCrop] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("en-IN");

  // 1. Fetch posts from Firebase when the page opens
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getCommunityPosts();
      setPosts(data || []);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 2. Handle sending the post to Firebase
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert("Please enter a message!");

    try {
      await createCommunityPost({
        message,
        crop,
        location,
        language
      });

      // Clear the form
      setMessage("");
      setCrop("");
      setLocation("");

      // Reload the posts to show the new one instantly
      fetchPosts();

    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to submit post. Please try again.");
    }
  };

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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind? Ask the community..."
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", minHeight: "100px", resize: "vertical", boxSizing: "border-box", marginBottom: "12px", fontFamily: "inherit" }}
        />
        
        {/* Additional Metadata Fields */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
          <input 
            type="text" 
            placeholder="Crop (e.g., Wheat)" 
            value={crop} 
            onChange={(e) => setCrop(e.target.value)}
            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db" }}
          />
          <input 
            type="text" 
            placeholder="Location (e.g., Jaipur)" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db" }}
          />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", backgroundColor: "white" }}
          >
            <option value="en-IN">English (India)</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </div>

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
        {loading ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>No posts yet. Be the first to ask a question!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
              
              {/* Author Header */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ backgroundColor: "#dcfce7", padding: "10px", borderRadius: "50%", color: "#166534" }}>
                    <User size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "16px", color: "#1f2937" }}>{post.author || "Farmer"}</h3>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>{post.time || "Recently"}</span>
                  </div>
                </div>
                
                {/* Badges for Crop and Location */}
                <div style={{ display: "flex", gap: "8px" }}>
                  {post.crop && (
                    <span style={{ backgroundColor: "#fef3c7", color: "#b45309", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                      🌱 {post.crop}
                    </span>
                  )}
                  {post.location && (
                    <span style={{ backgroundColor: "#e0f2fe", color: "#0369a1", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>
                      📍 {post.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <p style={{ color: "#374151", lineHeight: "1.5", marginBottom: "16px" }}>
                {post.message || post.content}
              </p>

              {/* Interaction Buttons */}
              <div style={{ display: "flex", gap: "20px", borderTop: "1px solid #f3f4f6", paddingTop: "12px" }}>
                <button style={{ background: "none", border: "none", color: "#6b7280", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", padding: 0 }}>
                  <ThumbsUp size={18} />
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>{post.likes || 0} Likes</span>
                </button>
                <button style={{ background: "none", border: "none", color: "#6b7280", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", padding: 0 }}>
                  <MessageCircle size={18} />
                  <span style={{ fontSize: "14px", fontWeight: "500" }}>{post.replies || 0} Replies</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Community;