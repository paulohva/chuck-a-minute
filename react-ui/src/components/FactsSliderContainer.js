import React from 'react';
import axios from 'axios';

import FactsSlider from './FactsSlider';
import Loading from './Loading';

class FactsSliderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      facts: [],
      isLoading: true,
      isActive: true
    };
    this.handleVote = this.handleVote.bind(this);
  }

  componentWillMount() {
    return this._loadFacts(true);
  }

  componentWillUnmount() {
    this.setState({ isActive: false });
  }

  _loadFacts(scheduleUpdate) {
    return axios.get('/api/facts')
      .then(response => {
        const currentSlide = response.data.length ? (this.state.currentSlide + 1) % response.data.length : 0;
        this.setState({ facts: response.data, currentSlide: currentSlide, isLoading: false });
        if (scheduleUpdate && this.state.isActive) {
          setTimeout(() => this._loadFacts(true), 5000);
        }
      });
  }

  _updateVoteCount() {
    axios.get('/api/facts')
      .then(response => {
        this.setState({ facts: response.data, isLoading: false });
      });
  }

  handleVote(fact) {
    if (!this.state.isVoting) {
      // update local vote count immediately
      const updatedFacts = this.state.facts.map(f => {
        if (f._id !== fact._id) {
          return f;
        }

        return {
          ...f,
          votes: (f.votes || 0) + 1
        };
      });
      this.setState({ facts: updatedFacts, isVoting: true });

      // save vote to server
      return axios.post(`/api/facts/vote/${fact._id}`)
        .then(() => {
          this.setState({ isVoting: false });
        })
        .catch(() => {
          this.setState({ isVoting: false });
        });
    }
  }

  render() {
    const { currentSlide, facts, isLoading } = this.state;
    return isLoading ?
      <Loading /> :
      <FactsSlider facts={facts} currentSlide={currentSlide} onVote={this.handleVote} />;
  }
}

export default FactsSliderContainer;
