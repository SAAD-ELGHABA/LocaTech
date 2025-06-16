import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import "../index.css";
import { Link } from "react-router-dom";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [articlesMediaImages, setArticlesMediaImages] = useState([]);
  const [countLoading, setCountLoaing] = useState(0);
  const fetchBlogArticles = async () => {
    try {
      const res = await axios.get(
        "https://a3bf-41-141-112-151.ngrok-free.app/wp-json/wp/v2/posts?_embed",
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setArticles(res?.data);
      console.log("Articles:", res?.data);
    } catch (error) {
      console.error("Fetch Articles Error:", error);
    } finally {
      setCountLoaing((prev) => prev + 1);
    }
  };

  const fetchBlogArticlesMediaImages = async () => {
    try {
      const res = await axios.get(
        "https://a3bf-41-141-112-151.ngrok-free.app/wp-json/wp/v2/media",
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        }
      );
      setArticlesMediaImages(res?.data);
      console.log("Media Images:", res?.data);
    } catch (error) {
      console.error("Fetch Media Error:", error);
    } finally {
      setCountLoaing((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchBlogArticles();
    fetchBlogArticlesMediaImages();
  }, []);

  return countLoading >= 2 ? (
    <div className="min-h-screen bg-white pt-36 px-4 sm:px-12">
      <h1 className="text-2xl lg:text-4xl font-bold lg:text-center mb-10 ">
        Blog Immobilier de <span className="text-black-600">LocaTech</span>
      </h1>
      <p className="lg:text-center text-lg text-black-500 mb-12 max-w-3xl mx-auto">
        Bienvenue sur notre espace de partage ! Chez <strong>LocaTech</strong>,
        nous croyons en une information accessible et utile pour tous les
        acteurs de l'immobilier. Retrouvez ici nos articles sur le marché, nos
        conseils d'experts et notre vision de l'avenir du logement au Maroc.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-24 w-[95%] mx-auto">
        {articles?.map((article) => (
          <motion.div
            key={article.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              className="rounded-2xl shadow-md p-6 hover:shadow-lg border border-gray-100 bg-white flex flex-col cursor-pointer"
              to={`/blog-article-details/${article?.slug}`}
            >
              <h2
                className="text-xl font-semibold mb-3"
                dangerouslySetInnerHTML={{ __html: article?.title?.rendered }}
              />

              {article._embedded &&
              article._embedded["wp:featuredmedia"] &&
              article._embedded["wp:featuredmedia"][0] ? (
                <img
                  src={article._embedded["wp:featuredmedia"][0].source_url}
                  alt={
                    article._embedded["wp:featuredmedia"][0].alt_text ||
                    "Article Image"
                  }
                  width={300}
                  className="rounded-lg object-cover mb-4 h-48 w-full"
                />
              ) : (
                <img
                  src="https://a3bf-41-141-112-151.ngrok-free.app/wp-content/uploads/2025/06/LocaTech-icon.png"
                  alt=""
                  width={300}
                  className="rounded-lg object-cover mb-4 h-48 w-full"
                />
              )}

              <div
                className="text-gray-700 flex-grow line-clamp-4"
                dangerouslySetInnerHTML={{ __html: article?.excerpt?.rendered }}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col gap-6 bg-white pt-36 px-4 sm:px-12 animate-pulse">
      <div className="w-[90%] lg:w-[50%] flex flex-col justify-start lg:justify-center mx-auto rounded h-70 lg:h-70 gap-6">
        <div className="h-10 lg:h-20 w-[80%] bg-gray-300 rounded "></div>
        <div className="h-50 lg:h-70 w-full bg-gray-300 rounded "></div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-24 w-[95%] mx-auto">
        <div className=" bg-gray-300 rounded-2xl h-70 lg:h-70"></div>
        <div className=" bg-gray-300 rounded-2xl h-70 lg:h-70"></div>
        <div className=" bg-gray-300 rounded-2xl h-70 lg:h-70"></div>
      </div>
    </div>
  );
};

export default Blog;
