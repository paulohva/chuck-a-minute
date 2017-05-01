import React from 'react';
import axios from 'axios';

import FactsSlider from './FactsSlider';
import Loading from './Loading';

class FactsSliderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facts: [],
      isLoading: true
    };
  }
  componentWillMount() {
    return this._loadFacts();
  }

  _loadFacts() {
    return axios.get('/api/facts')
      .then(response => {
        this.setState({ facts: response.data, isLoading: false });
      });
  }

  handleVote(fact) {
    console.log('vote', fact);
  }

  render() {
    const { facts, isLoading } = this.state;
    return isLoading ?
      <Loading /> :
      <FactsSlider facts={facts} onVote={this.handleVote} />;
  }
}

export default FactsSliderContainer;
