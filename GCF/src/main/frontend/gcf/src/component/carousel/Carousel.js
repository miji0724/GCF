import React, { useEffect, useState } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 4000); 

        return () => clearInterval(intervalId);
    }, [images.length]); 

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="carousel">
            <button onClick={prevSlide} className="prev-button">
                ‹ 
            </button>
            <a href="#"><img src={images[currentIndex]} alt="carousel" className="carousel-image" /></a>
            <button onClick={nextSlide} className="next-button">
                ›
            </button>
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