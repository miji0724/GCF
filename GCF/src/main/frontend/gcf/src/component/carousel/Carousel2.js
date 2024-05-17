import React, { useEffect, useState } from 'react';
import './Carousel2.css';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 4000); 

        return () => clearInterval(intervalId);
    }, [images.length]); 


    return (
        <div className="carousel">
            <a href="#"><img src={images[currentIndex]} alt="carousel" className="carousel-image" /></a>
            <div className="page-indicators">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`page-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
        
    );
}

export default Carousel;