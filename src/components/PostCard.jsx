import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {

  
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-full bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:bg-gray-50 transition">
        <div className="w-full mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="h-48 w-full object-cover rounded-xl"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
