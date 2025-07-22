import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import "../assets/style.css";
function BlogDetails() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [articleImage, setArticleImage] = useState(null);
  const fetchArticleDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_WP_URL}/wp-json/wp/v2/posts?slug=${slug}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      setArticle(res?.data[0]);
      if (res?.data[0].featured_media) {
        const imgRes = await axios.get(
          `${import.meta.env.VITE_API_WP_URL}/wp-json/wp/v2/media/${
            res?.data[0].featured_media
          }`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        setArticleImage(imgRes?.data?.source_url);
      }
      console.log(article, articleImage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticleDetails();
  }, []);
  return article && articleImage ? (
    <div className="min-h-screen py-30">
      <div className="w-[85%] lg:max-w-[70%] mx-auto flex flex-col gap-6">
        <h2
          className=" mb-3 text-3xl font-bold"
          dangerouslySetInnerHTML={{ __html: article?.title?.rendered }}
        />
        {articleImage ? (
          <img
            src={articleImage}
            alt={articleImage || "Article Image"}
            className="rounded-lg object-cover  w-full max-h-[30%]"
          />
        ) : (
          <img
            src="https://a3bf-41-141-112-151.ngrok-free.app/wp-content/uploads/2025/06/LocaTech-icon.png"
            alt=""
            width={300}
            className="rounded-lg object-cover  w-full max-h-[10%]"
          />
        )}
        <div className="text-xl font-light text-gray-700">
          Écrit par
          <Link to={`/`} className="ms-1">
            <span className="hover:underline">LocaTech</span>
          </Link>
        </div>
        <div className="wp-content">
          <div
            dangerouslySetInnerHTML={{ __html: article?.content?.rendered }}
          />
        </div>

        <div className="w-full flex items-center justify-end mt-10 text-sm text-gray-500">
          <div>{new Date(article?.date).toDateString()}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="animate-pulse flex gap-4 flex-col w-[85%] lg:max-w-[70%] mx-auto py-30 min-h-screen">
      <div className="w-4/5 bg-gray-300 rounded h-10 lg:h-20"></div>
      <div className="w-full bg-gray-300 rounded h-60 lg:h-90"></div>
      <div className="h-30 lg:h-60 w-[70%] bg-gray-300 rounded"></div>
      <div className="h-30 lg:h-60 w-[100%] bg-gray-300 rounded"></div>
      <div className="h-30 lg:h-60 w-[70%] bg-gray-300 rounded"></div>
      <div className="h-5 lg:h-10 w-full bg-gray-300 rounded"></div>
    </div>
  );
}

export default BlogDetails;
