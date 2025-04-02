import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return (
    <div className="py-8">
      <Container className="max-w-2xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading post...</p>
        ) : post ? (
          <PostForm post={post} />
        ) : (
          <p className="text-center text-red-500">Post not found.</p>
        )}
      </Container>
    </div>
  );
}

export default EditPost;
