import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getPosts().then((response) => {
      if (response) {
        setPosts(response.documents);
      }
      setLoading(false);
    });
  }, []);

  return (
    <Container>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Posts</h1>
      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts found.</p>
      )}
    </Container>
  );
}

export default AllPost;
