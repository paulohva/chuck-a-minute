import React from 'react';
import axios from 'axios';

import NewFactForm from './NewFactForm';

const styles = {
    success: {
        backgroundColor: '#222',
        color: 'green',
        textAlign: 'center',
        padding: 5
    }
};

class NewFactFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fact: '',
            isSaved: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({ fact: evt.target.value, isSaved: false });
    }

    handleSubmit() {
        const newFact = { text: this.state.fact };
        axios.post('/api/facts', newFact)
            .then(() => {
                this.setState({ fact: '', isSaved: true });
                setTimeout(() => this.setState({ isSaved: false }), 1000);
            });
    }

    render() {
        return (
            <div>
                <NewFactForm
                    text={this.state.fact}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
                {this.state.isSaved ? <div style={styles.success}>Fact saved!</div> : null}
            </div>
        );
    }
}

export default NewFactFormContainer;
