import { SlidersVertical, Trash } from "lucide-react";
import {
  useCallback,
  useRef,
  useState,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

function Control() {
  const courtiers = useSelector((state) => state.AllCourtiersReducer);
  const BienReducer = useSelector((state) => state.BiensAssistantReducer);

  const [visibleCount, setVisibleCount] = useState(10);
  const observer = useRef();
  const lastBienRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + 10);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [evaluationFilter, setEvaluationFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const getCourtierById = (id) => courtiers.find((c) => c.id === id);
  const dispatch = useDispatch();

  const filteredBiens = useMemo(() => {
    return BienReducer.filter((bien) => {
      const courtier = getCourtierById(bien.courtier_id);
      const evaluation = courtier?.agence?.evaluation?.evaluation || "";

      const matchesSearch = [
        bien.title,
        bien.ville,
        bien.type,
        bien?.courtier?.agence?.evaluation?.evaluation,
        bien?.status?.nom,
        bien?.courtier?.user?.nom,
        bien?.courtier?.user?.prenom,
        bien?.status?.nom,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesEvaluation =
        evaluationFilter === "" || evaluation === evaluationFilter;

      return matchesSearch && matchesEvaluation;
    });
  }, [BienReducer, getCourtierById, searchTerm, evaluationFilter, dispatch]);

  const handleStatusBien = async (status, bienId) => {
    const loading = toast.loading("chargement...");
    try {
      const res = await axios.post(
        `/api/status-bien/${bienId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status >= 200 && res.status <= 300) {
        toast.success(res.data.message);
        dispatch({
          type: "ALLBIENS_ASSISTANT",
          payload: res.data.Biens,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-6 relative">
        <h1 className="text-xl font-semibold">
          Contrôler les biens et les courtiers ({filteredBiens.length})
        </h1>
        <div className="flex items-center space-x-2 relative">
          <input
            type="text"
            className="border border-gray-400 rounded px-3 py-2 w-80 focus:outline-none"
            placeholder="Rechercher un bien..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="p-2 hover:bg-gray-300 cursor-pointer"
            onClick={() => setShowFilter(!showFilter)}
          >
            <SlidersVertical className="h-4 w-4" />
          </button>

          {showFilter && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded shadow z-10 w-64">
              <div
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  evaluationFilter === "" ? "bg-gray-100" : ""
                }`}
                onClick={() => setEvaluationFilter("")}
              >
                Tous les niveaux
              </div>
              {["débutante", "intermédiaire", "professionnelle"].map(
                (evalName) => (
                  <div
                    key={evalName}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      evaluationFilter === evalName ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setEvaluationFilter(evalName)}
                  >
                    {evalName.charAt(0).toUpperCase() + evalName.slice(1)}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {filteredBiens.slice(0, visibleCount).map((bien, index) => {
          const imageUrl = bien.images?.length
            ? `${bien.images[0]}`
            : "https://via.placeholder.com/400x250?text=No+Image";

          const isLast = index === visibleCount - 1;

          return (
            <div
              key={bien.id}
              ref={isLast ? lastBienRef : null}
              className="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row text-sm"
            >
              <img src={imageUrl} alt="bien" className="w-full md:w-1/3" />
              <div className="p-4 flex-1">
                <div className="flex space-x-2 items-center">
                  <img
                    src={bien?.courtier?.user?.image}
                    alt="courtier-image"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium">
                      {bien?.courtier?.user?.nom +
                        " " +
                        bien?.courtier?.user?.prenom}
                    </p>
                    <p className="text-gray-500">
                      {bien?.courtier?.user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-left text-gray-800">
                    {bien.title.length > 40
                      ? bien.title.substring(0, 40) + ".."
                      : bien.title}
                  </h2>
                  <Link
                    to={`/bien/${bien.ville}/${bien.slag}`}
                    className="hover:text-red-500"
                  >
                    voir annonce
                  </Link>
                </div>

                <p className="text-gray-700 mb-1">
                  <strong>Ville:</strong> {bien.ville}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Type:</strong> {bien.type || "—"}
                </p>
                <p className="text-gray-700 mb-1 flex space-x-2 items-center">
                  <strong>Budget:</strong>
                  <span className="text-[#f56565] font-bold text-sm">
                    {new Intl.NumberFormat("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(bien.budget)}{" "}
                    MAD
                  </span>
                </p>

                <p className="text-gray-700 mb-1">
                  <strong>Évaluation agence:</strong>{" "}
                  {getCourtierById(bien.courtier_id)?.agence?.evaluation
                    ?.evaluation || "Non spécifiée"}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 items-center text-sm">
                    <button
                      onClick={() => {
                        (bien?.status?.nom === "brouillée" ||
                          bien?.status?.nom === "désactivé") &&
                          handleStatusBien("activé", bien?.id);
                      }}
                      className={`px-3 py-1.5 rounded ${
                        bien?.status?.nom === "activé"
                          ? "bg-green-500 animate-pulse text-white"
                          : "border border-green-500 text-green-500 hover:bg-green-50 cursor-pointer"
                      }`}
                    >
                      {bien?.status?.nom === "activé" ? "activé" : "activer"}
                    </button>
                    <button
                      onClick={() => {
                        bien?.status?.nom === "activé" &&
                          handleStatusBien("désactivé", bien?.id);
                      }}
                      className={`px-3 py-1.5 rounded ${
                        bien?.status?.nom === "désactivé" ||
                        bien?.status?.nom === "brouillée"
                          ? "bg-red-500 text-white animate-pulse"
                          : "border border-red-500 text-red-500 hover:bg-red-50 cursor-pointer"
                      }`}
                    >
                      {bien?.status?.nom === "désactivé"
                        ? "désactivé"
                        : "désactiver"}
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {new Date(bien?.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {filteredBiens.length === 0 && (
          <p className="text-center text-gray-500">Aucun bien trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default Control;
