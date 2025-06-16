import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import BienContainer from "../components/BienContainer";
import FilterBar from "../components/FilterBar";
import SortSelect from "../components/SortSelect";
import { LoaderCircle } from "lucide-react";

const Louer = () => {
  const location = useLocation();
  const Biens = useSelector((state) => state.BienReducer);
  const [sortOption, setSortOption] = useState("date");
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const biensLouer = Biens.filter(
    (b) => b.typeAffaire?.toLowerCase() === "louer"
  );

  const sortedBiens = [...biensLouer].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "date":
      default:
        return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        if (!isLoadingMore && visibleCount < sortedBiens.length) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 10);
            setIsLoadingMore(false);
          }, 1000);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMore, visibleCount, sortedBiens.length]);

  const visibleBiens = sortedBiens.slice(0, visibleCount);

  return (
    <div className="mt-15 lg:mt-25 pt-12 bg-gray-50 min-h-screen">
      <FilterBar />
      <div className="mb-8 mx-8 lg:mx-32 flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0">
        <h1 className="text-xl font-semibold">
          Nombres des biens pour location : {sortedBiens?.length}
        </h1>
        <SortSelect sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      {visibleBiens.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-5/6 mx-auto">
            {visibleBiens.map((bien) => (
              <BienContainer key={bien.id} bien={bien} />
            ))}
          </div>
          {isLoadingMore && (
            <div className="flex justify-center mb-12">
              <LoaderCircle className="h-10 w-10 text-red-500 animate-spin" />
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          Aucun bien trouvé pour les critères sélectionnés.
        </p>
      )}
    </div>
  );
};

export default Louer;
