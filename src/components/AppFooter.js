import React from 'react';

const styles = {
  footer: {
    backgroundColor: '#222',
    color: '#eee',
    padding: '15px 50px'
  },
  copyright: {
    lineHeight: 2
  },
  socialIcons: {
    listStyle: 'none',
    textAlign: 'right',
    margin: 0,
    padding: 0
  },
  iconLink: {
    color: '#eee',
    marginRight: '10px'
  }
};

const AppFooter = () => {
  return (
    <footer className="pure-g" style={styles.footer}>
      <div className="pure-u-1-2" style={styles.copyright}>
        &copy; 2017&nbsp;
        <a target="_blank" href="https://github.com/vmlf01/" className="white-link">vmlf01</a>.
        All Rights Reserved.
      </div>

      <div className="pure-u-1-2">
        <ul style={styles.socialIcons}>
          <li>
            <a href="https://github.com/vmlf01/chuck-a-minute/" target="_blank" style={styles.iconLink}>
              <i className="fa fa-github fa-2x"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default AppFooter;
