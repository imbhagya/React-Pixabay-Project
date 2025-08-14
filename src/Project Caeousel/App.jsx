import React, {useState} from "react";
import './App.css'

const App = () => {
  const images = [
    'https://cdn.pixabay.com/photo/2023/06/04/00/34/flowers-8038712_1280.jpg',
    'https://cdn.pixabay.com/photo/2025/01/10/17/24/birds-9324370_1280.jpg',
    'https://media.istockphoto.com/id/155419717/photo/peacock-feather.jpg?s=2048x2048&w=is&k=20&c=urBINkOHhD9B8ONQ9BY1vWelSmIbJR0ohAC3Xsw0BtE=']


  const[activeIndex,setActiveIndex] = useState(0)

  function handlePrev(){
    setActiveIndex((activeIndex-1+images.length)%images.length)
  }

  function handleNext(){
    setActiveIndex((activeIndex+1)%images.length)
  }


    return (
    <>
      {/* Blurred background */}
      <div
        className="background"
        style={{ backgroundImage: `url(${images[activeIndex]})` }}
      ></div>

      {/* Carousel */}
      <div className="carousel-container">
        <h1>Carousel</h1>
        <div style={{ position: "relative" }}>
          <img
            src={images[activeIndex]}
            alt="carousel"
            className="carousel-image"
          />
          <span className="arrow left" onClick={handlePrev}>&lt;</span>
          <span className="arrow right" onClick={handleNext}>&gt;</span>
        </div>
      </div>
    </>
  );
};

export default App;




