import React from 'react';

import NewFactForm from './NewFactForm';

class NewFactFormContainer extends React.Component {
    handleSubmit(newFact) {
        console.log('submit')
    }

    render() {
        return (
            <NewFactForm onSubmit={this.handleSubmit} />
        );
    }
}

export default NewFactFormContainer;
