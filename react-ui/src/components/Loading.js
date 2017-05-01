import React from 'react';

const styles = {
    loading: {
        height: '500px',
        backgroundColor: '#abc',
        textAlign: 'center',
        padding: '200px',
        boxSizing: 'border-box'
    }
};

const Loading = () => (
    <div style={styles.loading}>
        ... Loading ...
    </div>
);

export default Loading;
