import React from 'react';

const styles = {
  slideContainer: {
    height: '500px',
    overflow: 'hidden'
  },
  slideContents: {
    width: '90%',
    height: '100%',
    margin: 'auto',
    display: 'flex'
  },
  slideTextContainer: {
    display: 'flex',
    flex: '2',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'space-around'
  },
  slideImageContainer: {
    display: 'flex',
    flex: '1'
  },
  text: {
    fontSize: '2.2em',
    color: 'white',
    margin: 0,
    padding: 0
  },
  votes: {
    fontSize: '1.4em',
    color: '#333',
    margin: '20px 0 0',
    padding: 0
  },
  voteButton: {
    width: '150px'
  },
  image: {
    objectFit: 'contain'
  }
};

const backgroundColors = ['#2dcc70', '#3498DB', '#E67E22', '#9B59B6'];
const numberOfImages = 6;
const randomBase = Math.ceil(Math.random() * 11);
const getFactImage = (index) => {
  const randomIndex = ((index + randomBase) % numberOfImages) + 1;
  return `images/slider/chuck-norris-${randomIndex}.png`;
};

const getBackgroundColor = (index) => backgroundColors[index % backgroundColors.length];

const FactsSlide = (props) => {
  return (
    <div style={{...styles.slideContainer, backgroundColor: getBackgroundColor(+props.index)}}>
      <div style={styles.slideContents}>
        <div style={styles.slideTextContainer}>
          <h2 style={styles.text}>
            {props.text}
          </h2>
          <h3 style={styles.votes}>{props.votes ? props.votes + ' votes' : 'no votes yet :('}</h3>
          <button className="pure-button button-large pure-button-primary" style={styles.voteButton} onClick={props.onVote}>
            <i className="fa fa-thumbs-o-up"></i> Thumbs Up!
          </button>
        </div>
        <div style={styles.slideImageContainer}>
          <img style={styles.image} src={getFactImage(props.index)} alt="" />
        </div>
      </div>
    </div>
  );
}

export default FactsSlide;
