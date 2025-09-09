//import img2 from "../../../assets/home/provash.png";
//import img1 from "../../../assets/home/09.png";
//import img2 from "../../../assets/home/08.jpg";
import img1 from "../../../assets/home/resturant.png";
import img2 from "../../../assets/home/02.png";
import img3 from "../../../assets/home/03.png";
import img4 from "../../../assets/home/04.png";

const Banner = () => {
  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative  w-full ">
        <img
          className="w-full  h-[80vh] object-cover rounded-lg"
          src={img1}
          alt=""
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide6" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          className="w-full  h-[80vh] object-cover rounded-lg"
          src={img2}
          alt=""
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          className="w-full  h-[80vh] object-cover rounded-lg"
          src={img3}
          alt=""
        />{" "}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img
          className="w-full  h-[80vh] object-cover rounded-lg"
          src={img4}
          alt=""
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
