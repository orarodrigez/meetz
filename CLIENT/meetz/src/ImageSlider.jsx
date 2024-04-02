
import { useState , useEffect,useRef} from 'react'

export default function ImageSlider ({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
const windowWidth = useRef(window.innerWidth);
const widthP=windowWidth.current>800?windowWidth.current/2:windowWidth.current
const windowHeight = useRef(window.innerHeight);
const Height =windowHeight.current>800?windowHeight.current/3:windowHeight.current
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-slider" >
      <button className="arrow left-arrow"  onClick={goToPrevious}>&lt;</button>
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`} style={{ maxHeight: Height}}/>
      <button className="arrow right-arrow" onClick={goToNext}>&gt;</button>
    </div>
  );
}


