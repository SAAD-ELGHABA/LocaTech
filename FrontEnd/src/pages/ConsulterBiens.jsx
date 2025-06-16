import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../components/FilterBar";
import BienContainer from "../components/BienContainer";
import SortSelect from "../components/SortSelect";
import { LoaderCircle } from "lucide-react";

function ConsulterBiens() {
  const [sortOption, setSortOption] = useState("date");
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const Biens = useSelector((state) => state.BienReducer);
  const filtredBiensReducer = useSelector((state) => state.filtredBiensReducer);
  const biensToRender =
    filtredBiensReducer.length > 0 ? filtredBiensReducer : Biens;

  const sortedBiensToRender = [...biensToRender].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "price-asc":
        return a.budget - b.budget;
      case "price-desc":
        return b.budget - a.budget;
      case "date":
      default:
        return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  const recentBienIds = sortedBiensToRender.slice(0, 10).map((b) => b.id);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        if (!isLoadingMore && visibleCount < sortedBiensToRender.length) {
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
  }, [isLoadingMore, visibleCount, sortedBiensToRender.length]);

  const visibleBiens = sortedBiensToRender.slice(0, visibleCount);
  
  return (
    <div className="my-20 lg:my-32">
      <FilterBar />
      <div className="mb-8 mx-10 lg:mx-32 flex justify-between items-center">
        <h1 className="text-lg">
          Biens : <span className="font-semibold">{biensToRender.length}</span>
        </h1>
        <SortSelect sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      {visibleBiens.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-5/6 mx-auto">
            {visibleBiens.map((bien) => (
              <BienContainer
                key={bien.id}
                bien={bien}
                isRecent={recentBienIds.includes(bien.id)}
              />
            ))}
          </div>
          {isLoadingMore && (
            <div className="flex justify-center mb-12">
              <LoaderCircle className="h-10 w-10 text-red-500 animate-spin" />
            </div>
          )}
        </>
      ) : (
        <div className="h-96 flex flex-col space-y-2 items-center justify-center w-[100%] mx-auto">
          <LoaderCircle className="h-10 w-10 text-red-500 animate-spin" />
        </div>
      )}
    </div>
  );
}

export default ConsulterBiens;
