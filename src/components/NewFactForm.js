import React from 'react';

const styles = {
    header: {
        color: '#fff',
        margin: 0
    },
    label: {
        color: '#eee'
    },
    textarea: {
        width: '100%'
    }
};

const NewFactForm = (props) => {
    return (
        <form className="pure-form pure-form-stacked" onSubmit={props.onSubmit}>
            <fieldset>
                <legend>
                    <h2 style={styles.header}>Submit a new fact</h2>
                </legend>

                <textarea id="fact" rows="4" placeholder="Please enter fact text" style={styles.textarea} />

                <button type="submit" className="pure-button pure-button-primary">Submit</button>
            </fieldset>
        </form>
    );
}

export default NewFactForm;
