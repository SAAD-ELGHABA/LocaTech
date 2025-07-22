import { LoaderCircle, SlidersVertical, Trash } from "lucide-react";
import { useCallback, useRef, useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { sendNotification } from "../../../functions/NotificationSender";
import userLogo from '../../../assets/logo-user.png'

function Control() {
  const courtiers = useSelector((state) => state.AllCourtiersReducer);
  const BienReducer = useSelector((state) => state.BiensAssistantReducer);
  const [allBiens, setAllBiens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState([]);
  const fetchAllBien = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/get-biens-assistant`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllBiens(res?.data?.allBiens);
      setStatus(res?.data?.status);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllBien();
  }, []);
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
    return allBiens?.filter((bien) => {
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
  }, [allBiens, getCourtierById, searchTerm, evaluationFilter, dispatch]);

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
        setAllBiens(res?.data?.Biens);
        console.log(res);

        await sendNotification(
          res?.data?.bienUpdated?.courtier?.user?.id,
          res?.data?.bienUpdated?.courtier?.user?.id,
          "Le statut d'un bien immobilier a changé",
          `
          l'assistant a changé votre statut de bien pour qu'il soit :
          ${res?.data?.bienUpdated?.status?.nom}
          `,
          {
            link: `/bien/${res?.data?.bienUpdated?.ville}/${res?.data?.bienUpdated?.slag}`,
          }
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loading);
    }
  };

  return isLoading ? (
    <div className="min-h-screen flex justify-center items-center">
      <LoaderCircle className="text-red-500 h-8 w-8 animate-spin" />
    </div>
  ) : (
    <div className="p-2">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-6 relative">
        <h1 className="text-lg md:text-xl font-bold text-gray-800">
          Contrôler les biens et les courtiers ({filteredBiens.length})
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto relative">
          <input
            type="text"
            className="border border-gray-400 rounded px-3 py-2 w-full sm:w-80 focus:outline-none"
            placeholder="Rechercher un bien..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="p-2 hover:bg-gray-300 bg-gray-100 cursor-pointer rounded flex items-center justify-center space-x-2 lg:space-x-0 w-full lg:w-auto"
            onClick={() => setShowFilter(!showFilter)}
          >
            <SlidersVertical className="h-4 w-4" />
            <span className="lg:hidden text-sm">Filtrer par niveau de l'agence</span>
          </button>

          {showFilter && (
            <div className="absolute top-full lg:top-14 right-0 bg-white border border-gray-200 rounded shadow z-10 lg:w-64 w-full text-sm">
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

      <div className="space-y-4">
        {filteredBiens.slice(0, visibleCount).map((bien, index) => {
          const imageUrl = bien.images?.length
            ? bien.images[0]
            : "https://via.placeholder.com/400x250?text=No+Image";

          const isLast = index === visibleCount - 1;

          return (
            <div
              key={bien.id}
              ref={isLast ? lastBienRef : null}
              className="bg-white shadow rounded-lg overflow-hidden flex flex-col md:flex-row text-sm max-h-full"
            >
              <Link
                to={`/bien/${bien.ville}/${bien.slag}`}
                className="lg:w-1/2"
              >
                <img
                  src={imageUrl}
                  alt="bien"
                  className="w-full h-48 md:h-auto object-cover"
                />
              </Link>
              <div className="p-4 flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={bien?.courtier?.user?.image || userLogo}
                    alt="courtier-image"
                    className="h-8 w-8 rounded-full object-cover"
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

                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <h2 className="text-base font-semibold text-gray-800">
                    {bien.title.length > 40
                      ? bien.title.substring(0, 40) + ".."
                      : bien.title}
                  </h2>
                </div>

                <p className="text-gray-700">
                  <strong>Ville:</strong> {bien.ville}
                </p>
                <p className="text-gray-700">
                  <strong>Type:</strong> {bien.type || "—"}
                </p>
                <p className="text-gray-700 flex space-x-2 items-center">
                  <strong>Budget:</strong>
                  <span className="text-[#f56565] font-bold text-sm">
                    {new Intl.NumberFormat("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(bien.budget)}{" "}
                    MAD
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong>Évaluation agence:</strong>{" "}
                  {getCourtierById(bien.courtier_id)?.agence?.evaluation
                    ?.evaluation || "Non spécifiée"}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-2 text-xs">
                  {status?.length &&
                    status.map((s) => (
                      <button
                        key={s.nom}
                        className={`px-2 py-1 rounded text-white ${
                          bien?.status?.nom === s?.nom
                            ? "cursor-not-allowed"
                            : "cursor-pointer bg-gray-400 hover:bg-gray-500"
                        }`}
                        style={{
                          backgroundColor:
                            bien?.status?.nom === s?.nom
                              ? s?.["coleur-code"]
                              : undefined,
                        }}
                        onClick={() => handleStatusBien(s?.nom, bien?.id)}
                      >
                        {s?.nom}
                      </button>
                    ))}
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  {new Date(bien?.created_at).toLocaleString()}
                </p>
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
