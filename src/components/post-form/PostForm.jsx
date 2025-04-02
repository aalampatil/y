import React, { useEffect, useCallback } from "react";
import { Input, Button } from "../index";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import service from "../../appwrite/config";

function PostForm({ post }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // console.log("u2", userData);

      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        ?.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div className="space-y-4">
        <Input
          label="Title"
          placeholder="Enter title"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Generated slug"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          {...register("slug", { required: true })}
        />
        <Input
          label="Content"
          placeholder="Write something..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          {...register("content", { required: true })}
        />
        <Input
          label="Image"
          type="file"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          {...register("image", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-red-500" : "bg-blue-600"}
          className="w-full text-center py-3 text-white font-semibold rounded-lg hover:opacity-90 transition"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
