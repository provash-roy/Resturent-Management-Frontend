import img1 from "../../../assets/home/slide1.jpg";
import img2 from "../../../assets/home/slide2.jpg";
import img3 from "../../../assets/home/slide3.jpg";
import img4 from "../../../assets/home/slide4.jpg";
import img5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

const Catagory = () => {
  return (
    <section>
      <SectionTitle
        heading={"Order Online"}
        subHeading={"From 10 AM to 10 PM"}
      ></SectionTitle>
      <div className="carousel carousel-end rounded-box">
        <div className="carousel-item">
          <img src={img1} alt="" />
        </div>
        <div className="carousel-item">
          <img src={img2} alt="" />
        </div>
        <div className="carousel-item">
          <img src={img3} alt="" />
        </div>
        <div className="carousel-item">
          <img src={img4} alt="" />
        </div>
        <div className="carousel-item">
          <img src={img5} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Catagory;
