import React from 'react';

const styles = {
  header: {
    textAlign: 'center',
  },
  logo: {
    width: '220px',
    height: '80px',
    background: 'url(images/logo.png) no-repeat 0 50%'
  }
}

const AppHeader = () => (
  <header className="pure-menu pure-menu-horizontal" style={styles.header}>
    <a className="pure-menu-heading" href="/" style={styles.logo}></a>
    <div className="pure-menu-heading">
      <h4>Facts on the minute, every minute!</h4>
    </div>
  </header>
);

export default AppHeader;
