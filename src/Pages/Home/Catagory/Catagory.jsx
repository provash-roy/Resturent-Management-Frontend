import img1 from "../../../assets/home/slide1.png";
import img2 from "../../../assets/home/slide2.png";
import img3 from "../../../assets/home/slide3.png";
import img4 from "../../../assets/home/slide4.jpg";

import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

const Catagory = () => {
  return (
    <section>
      <SectionTitle
        heading={"Order Online"}
        subHeading={"---From 10 AM to 10 PM---"}
      ></SectionTitle>

      <div className="carousel carousel-end rounded-box w-full">
        <div className="carousel-item w-1/4">
          <img
            className="w-full h-[50vh] object-cover rounded-l-lg border-4 border-white"
            src={img1}
            alt=""
          />
        </div>
        <div className="carousel-item w-1/4">
          <img
            className="w-full h-[50vh] object-cover border-4 border-white"
            src={img2}
            alt=""
          />
        </div>
        <div className="carousel-item w-1/4">
          <img
            className="w-full h-[50vh] object-cover border-4 border-white"
            src={img3}
            alt=""
          />
        </div>
        <div className="carousel-item w-1/4">
          <img
            className="w-full h-[50vh] object-cover rounded-r-lg border-4 border-white"
            src={img4}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Catagory;
