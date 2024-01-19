import '../styles/Carousel.css';

const Carousel = ({image}) => {
    return ( 
        <div className="carousel_container">
            <div className="projects_wrap">
                <div style={{ background: `url(${ image })`, backgroundSize: "cover", backgroundPosition: "center center", height: "100%", width: "100%", borderRadius: "5px" }}
                >
                </div>
            </div>
        </div>
     );
}
 
export default Carousel;