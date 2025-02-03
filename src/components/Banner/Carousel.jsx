// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../assets/linkedinbot.jfif";
import img2 from "../../assets/banner.jpg";
import img3 from "../../assets/ban.jfif";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slider from "./Slider";

export default function Carousel() {
  return (
    <div className="container mx-auto mb-5">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slider
            image={img1}
            text="Get Your Web Development Project Done in minites"
          ></Slider>
        </SwiperSlide>
        <SwiperSlide>
          <Slider image={img2} text="Get Your Graphics Design Done in minites"></Slider>
        </SwiperSlide>
        <SwiperSlide>
          <Slider image={img3} text="Get Your Digital Marketing Done in minites" ></Slider>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
