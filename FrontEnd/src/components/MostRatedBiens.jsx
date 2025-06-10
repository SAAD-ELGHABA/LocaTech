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
          console.log(res);
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
    <div className="w-5/6 mx-auto my-8">
      {isLoading ? (
        <div className="text-center h-30 flex items-center justify-center">
          <div className="flex items-center justify-center h-full">
            <LoaderCircle className="animate-spin h-12 w-12 text-red-500" />
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
            slidesPerView={3}
            freeMode={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12  mx-auto"
          >
            {mostRated?.length > 0 ? (
              mostRated?.map((b) => (
                <SwiperSlide key={b.id}>
                  <BienContainer bien={b} rating={b?.avg_rating} />
                </SwiperSlide>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <LoaderCircle className="animate-spin h-12 w-12 text-red-500" />
              </div>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default MostRatedBiens;
