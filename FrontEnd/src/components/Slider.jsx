import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const MySlider = ({ items, slidesPerView }) => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={true}
      spaceBetween={20}
      slidesPerView={slidesPerView}
      className="custom-swiper"
    >
      {items?.length > 0 ? (
        items.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center h-64">
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                className="max-h-full max-w-full object-contain rounded shadow"
              />
            </div>
          </SwiperSlide>
        ))
      ) : (
        <div className="flex justify-center items-center h-40">
          <p>aucune images pour cette bien</p>
        </div>
      )}
    </Swiper>
  );
};

export default MySlider;
