import { Link } from "react-router-dom";
const Carousel = () => {
  return (
    <div>
      <section className="row">
        <div className="col-md-12">
          <div className="carousel slide" id="mycarousel" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="images/slide1.jpg" alt="" className="d-block w-100" />
              </div>
              <div className="carousel-item">
                <img src="images/slide2.jpg" alt="" className="d-block w-100" />
              </div>
              <div className="carousel-item">
                <img src="images/slide3.jpg" alt="" className="d-block w-100" />
              </div>
              <div className="carousel-item">
                <img src="images/slide4.jpg" alt="" className="d-block w-100" />
              </div>
            </div>

            <Link to="#mycarousel" className="carousel-control-prev" data-bs-slide="prev">
              <span className="carousel-control-prev-icon bg-dark"></span>
            </Link>

            <Link to="#mycarousel" className="carousel-control-next" data-bs-slide="next">
              <span className="carousel-control-next-icon bg-dark"></span>
            </Link>


          </div>
        </div>
      </section>
    </div>
  );
}

export default Carousel;