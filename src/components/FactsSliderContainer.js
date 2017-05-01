import React from 'react';

import FactsSlider from './FactsSlider';

class FactsSliderContainer extends React.Component {
  render() {
    const facts = [
      {
        id: '1',
        text: 'When Chuck Norris was born he drove his mom home from the hospital.',
        votes: 123,
        onClick: () => { console.log('click'); }
      },
      {
        id: '2',
        text: 'There once was a street called Chuck Norris, but the name was changed for public safety because nobody crosses Chuck Norris and lives.',
        votes: 123,
        onClick: () => { console.log('click'); }
      },
      {
        id: '3',
        text: 'When Chuck Norris was in middle school, his English teacher assigned an essay: "What is courage?" He received an A+ for turning in a blank page with only his name at the top.',
        votes: 123,
        onClick: () => {}
      }
    ];
    return (
      <FactsSlider facts={facts} />
    );
  }
}

export default FactsSliderContainer;
