import React from 'react';
import Slider from 'react-slick';

import FactsSlide from './FactsSlide';

const defaultSettings = {
  arrows: false,
  autoplay: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  centerMode: true,
  draggable: false,
  pauseOnHover: false
};

const FactsSlider = (props) => {
  if (props.facts.length === 0) {
    return null;
  }

  const slides = props.facts.map((fact, index) => (
    <div key={fact._id}>
      <FactsSlide {...fact} index={index} onVote={() => props.onVote(fact)}/>
    </div>
  ));

  const settings = {
    ...defaultSettings,
    slickGoTo: props.currentSlide
  };

  return (
    <Slider {...settings}>
      {slides}
    </Slider>
  );
}

export default FactsSlider;
