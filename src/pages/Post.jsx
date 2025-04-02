import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            navigate("/");
          }
        })
        .catch(() => navigate("/"))
        .finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);


  

  const deletePost = () => {
    if (!post) return;
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return (
    <div className="py-8">
      <Container>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : post ? (
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
            <div className="relative w-full flex justify-center mb-6">
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full max-h-[400px] object-cover rounded-xl"
              />
              {isAuthor && (
                <div className="absolute right-4 top-4 flex space-x-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500">Edit</Button>
                  </Link>
                  <Button bgColor="bg-red-500" onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}
            </div>

         
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            </div>
            <div className="text-gray-700 text-lg leading-relaxed">{post.content}</div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Post not found.</p>
        )}
      </Container>
    </div>
  );
}
