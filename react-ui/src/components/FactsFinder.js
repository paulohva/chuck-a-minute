import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
/**/
import { toggleCheck, incNumber, decNumber } from '../actions';


      /*<section id="search">
        <div className="container">
          <div className="center gap">
            <h3>Facts Finder</h3>
            <p className="lead">Looking for something specific?</p>
            <form className="form-inline" action="index.html" method="post" id="form-login">
              <input type="text" className="" placeholder="Search text..." />
              <button type="submit" className="btn btn-primary">Find</button>
            </form>
          </div>
        </div>
      </section>*/




class Home extends React.Component {
  render() {
    const props = this.props;
    const {checked, value} = props;
    return (
      <div>
        {/**/}
        <h1>Hello <a href={'https://github.com/electrode-io'}>{'Electrode'}</a></h1>
        <div>
          <h2>Managing States with Redux</h2>
          <label>
            <input onChange={props.onChangeCheck} type={'checkbox'} checked={checked}/>
            Checkbox
          </label>
          <div>
            <button type={'button'} onClick={props.onDecrease}>-</button>
            &nbsp;{value}&nbsp;
            <button type={'button'} onClick={props.onIncrease}>+</button>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    checked: state.checkBox.checked, value: state.number.value
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCheck: () => {
      dispatch(toggleCheck());
    },
    onIncrease: () => {
      dispatch(incNumber());
    },
    onDecrease: () => {
      dispatch(decNumber());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
