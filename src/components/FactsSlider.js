import React from 'react';
import Slider from 'react-slick';

import FactsSlide from './FactsSlide';

const settings = {
  arrows: false,
  autoplay: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  autoplaySpeed: 9000,
  centerMode: true,
  draggable: false,
  pauseOnHover: false
};

const FactsSlider = (props) => {
  const slides = props.facts.map((fact, index) => <div key={fact.id}><FactsSlide {...fact} index={index} /></div>);
  return (
    <Slider {...settings}>
      {slides}
    </Slider>
  );
}

export default FactsSlider;
