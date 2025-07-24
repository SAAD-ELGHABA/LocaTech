import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, Search, TimerReset, Trash, X } from "lucide-react";
import TextDisplay from "../../../components/TextDisplay";
import logoUser from "../../../assets/logo-user.png";
import { Link } from "react-router-dom";
import { toast } from "sonner";
function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchComments = async (pageNum = 1, reset = false) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/comments?page=${pageNum}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { data, current_page, last_page } = response?.data?.comments || {};

      setComments((prev) => (reset ? data : [...prev, ...data]));
      setPage(current_page);
      setLastPage(last_page);
    } catch (error) {
      console.log("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const loadMore = () => {
    if (page < lastPage) {
      fetchComments(page + 1);
    }
  };

  const filteredComments = comments?.filter(
    (c) =>
      c?.user?.nom?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      c?.user?.prenom?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      c?.user?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      c?.bien?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  const toggleAction = async (commentId, action) => {
    try {
      const response = await axios.post(
        `/api/comments/${commentId}/${action}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(response?.data?.message || "Action réussie");

      fetchComments(1, true);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de l'action.");
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
        <h1 className="text-xl font-bold">Commentaires</h1>

        <div className="flex items-center border border-gray-400 rounded px-4 py-2 text-sm w-full lg:w-1/3">
          <input
            type="text"
            className="flex-1 h-full focus:outline-none"
            placeholder="Chercher des commentaires..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex justify-end w-6 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div>

      {loading && comments.length === 0 ? (
        <div className="animate-pulse w-full flex flex-col space-y-4">
          <div className="h-12 w-1/2 bg-gray-300"></div>
          <div className="h-20 bg-gray-300 w-full"></div>
          <div className="h-20 bg-gray-300 w-full"></div>
          <div className="h-20 bg-gray-300 w-full"></div>
          <div className="h-20 bg-gray-300 w-full"></div>
          <div className="h-20 bg-gray-300 w-full"></div>
          <div className="h-20 bg-gray-300 w-full"></div>
        </div>
      ) : (
        <div className="space-y-4 overflow-auto ">
          <table className="lg:min-w-full min-w-[1000px] bg-white rounded shadow-sm text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Utilisateur</th>
                <th className="px-4 py-2 text-left">Etoiles</th>
                <th className="px-4 py-2 text-left">Commentaire</th>
                <th className="px-4 py-2 text-left">Bien</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.map((comment, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-4 py-4 ">
                    <div className="flex items-center space-x-4">
                      <div>
                        <img
                          src={comment?.user?.image || logoUser}
                          alt=""
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                      <div className="text-sm">
                        <h3>
                          {comment?.user?.nom || comment?.user?.prenom
                            ? `${comment?.user?.nom || ""} ${
                                comment?.user?.prenom || ""
                              }`.trim()
                            : "Utilisateur Anonyme"}
                        </h3>
                        <h5 className="text-gray-500 text-xs">
                          {comment?.user?.email || "Email non fourni"}
                        </h5>
                        <h6 className="text-gray-500 text-xs">
                          ({comment?.user?.role})
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      {[...Array(comment?.rating || 0)].map((_, index) => (
                        <span key={index} className="text-black">
                          ★
                        </span>
                      ))}
                      {[...Array(5 - (comment?.rating || 0))].map(
                        (_, index) => (
                          <span key={index} className="text-gray-300">
                            ★
                          </span>
                        )
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 ">
                    <TextDisplay
                      commentaire={comment?.comment}
                      maxLength={30}
                    />
                  </td>
                  <td className="px-4 py-2 ">
                    <Link
                      to={`/bien/${comment?.bien?.ville}/${comment?.bien?.slag}`}
                      className="text-red-500 hover:underline"
                    >
                      {comment?.bien ? comment?.bien?.title : "N/A"}
                    </Link>
                  </td>
                  <td className="px-4 py-2 ">
                    {new Date(comment?.created_at).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="grid grid-cols-3 gap-2 px-4 py-2">
                    <button
                      className={`  ${
                        comment?.status === "active"
                          ? "cursor-not-allowed text-gray-300"
                          : "cursor-pointer text-green-500"
                      }`}
                      onClick={() => toggleAction(comment?.id, "active")}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      className={` ${
                        comment?.status === "inactive"
                          ? "cursor-not-allowed text-gray-300"
                          : "cursor-pointer text-yellow-500"
                      }`}
                      onClick={() => toggleAction(comment?.id, "inactive")}
                    >
                      <TimerReset className="h-4 w-4" />
                    </button>
                    <button
                      className="text-red-500 cursor-pointer "
                      onClick={() => toggleAction(comment?.id, "supprimer")}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {page < lastPage && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                disabled={loading}
              >
                {loading ? "Chargement..." : "Charger plus"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Comments;
