import React from 'react';

import FactsSliderContainer from './FactsSliderContainer';
import NewFactFormContainer from './NewFactFormContainer';

const styles = {
  formSection: {
    backgroundColor: '#726571',
    padding: '40px 0'
  },
  formContent: {
    maxWidth: '500px',
    margin: 'auto',
  }
}

const AppHome = () => {
  return (
    <div>

      <FactsSliderContainer />

      <section style={styles.formSection}>
        <div style={styles.formContent}>
          <NewFactFormContainer />
        </div>
      </section>
    </div>
  );
};

export default AppHome;
