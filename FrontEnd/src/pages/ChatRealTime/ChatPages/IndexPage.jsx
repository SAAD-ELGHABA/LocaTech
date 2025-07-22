import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "../../../index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BienContainer from "../../../components/BienContainer";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function IndexPage() {
  const Biens = useSelector((state) => state.BienReducer);
  const FavorisReducer = useSelector((state) => state.FavorisReducer);
  const favoriteBiens = Biens.filter((bien) =>
    FavorisReducer.includes(bien.id)
  );
  const currentConversation = useSelector(
    (state) => state.currentConversationReducer
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.userInfo);
  useEffect(() => {
    if (!currentConversation && Object.keys(currentConversation).length === 0) {
      localStorage.removeItem("currentConversationId");
      dispatch({
        type: "SET_CURRENT_CONVERSATION",
        payload: {},
      });
    }
  }, []);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="hidden w-full px-4 lg:flex justify-center items-center min-h-screen  ">
      {user.role === "user" ? (
        FavorisReducer.length > 0 && (
          <div className="w-full  max-w-7xl px-8 lg:px-4 h-100">
            <h1 className="my-4 font-semibold text-xl">
              Discuter pour mes favoris
            </h1>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
              }}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-14 h-75"
            >
              {FavorisReducer.map((bien) => (
                <SwiperSlide key={bien.id} className="flex justify-center">
                  <BienContainer bien={bien} chatMode={true} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex justify-center items-center gap-4 mt-0">
              <div
                className={`custom-prev bg-white text-red-500 rounded-full shadow-md flex items-center justify-center ${
                  isBeginning
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-12 h-12" />
              </div>
              <div className="custom-pagination flex gap-2" />
              <div
                className={`custom-next  bg-white text-red-500 rounded-full shadow-md flex items-center justify-center ${
                  isEnd ? "cursor-not-allowed opacity-40" : "cursor-pointer"
                }`}
              >
                <ChevronRight className="w-12 h-12" />
              </div>
            </div>
          </div>
        )
      ) : user.role === "courtier" ? (
        <div className="flex flex-col items-center">
          <img
            src="/LocaTech-icon-removebg-preview.png"
            alt="icon"
            className="w-20 h-20"
          />
          <span className="text-center hover:underline">
            <Link to="/courtier-index">Aller et déposer une bien</Link>
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default IndexPage;
