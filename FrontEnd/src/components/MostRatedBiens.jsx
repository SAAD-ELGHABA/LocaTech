import axios from "axios";
import React, { useEffect, useState } from "react";
import BienContainer from "./BienContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { LoaderCircle, Star } from "lucide-react";

function MostRatedBiens() {
  const [mostRated, setMostRated] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const getCommentaires = async () => {
      setIsloading(true);
      const limit = 10;
      try {
        const res = await axios.get(`/api/get-rates-biens/${limit}`);
        if (res.status >= 200 && res.status <= 300) {
          setMostRated(res?.data?.mostRated);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };
    getCommentaires();
  }, []);

  return (
    <div className="w-[85%] lg:w-[95%] mx-auto my-8">
      {isLoading ? (
        <div className="w-full mx-auto grid gap-2">
          <div className="bg-gray-300 h-14 rounded w-2/6"></div>
          <div className="text-center animate-pulse h-70 grid  grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="bg-gray-300 h-68 rounded"></div>
            <div className="bg-gray-300 h-68 rounded hidden lg:flex"></div>
            <div className="bg-gray-300 h-68 rounded hidden lg:flex"></div>
            <div className="bg-gray-300 h-68 rounded hidden lg:flex"></div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-start text-xl font-bold mb-6 flex items-center space-x-2">
            <span>Nos annonces les mieux notés</span>
            <Star className="h-6 w-6 fill-black" />
          </h1>
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={20}
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="mb-12 mx-auto"
          >
            {mostRated?.length > 0 ? (
              mostRated?.map((b) => (
                <SwiperSlide key={b.id}>
                  <BienContainer bien={b} rating={b?.avg_rating} />
                </SwiperSlide>
              ))
            ) : (
              <div className="text-center animate-pulse h-70 grid  grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-gray-400 h-68 rounded"></div>
                <div className="bg-gray-400 h-68 rounded hidden lg:flex"></div>
                <div className="bg-gray-400 h-68 rounded hidden lg:flex"></div>
              </div>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default MostRatedBiens;
