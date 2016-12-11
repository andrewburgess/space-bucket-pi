import { connect } from 'react-redux';
import React       from 'react';

const bindState = state => {
    return state.environment;
}

const Panel = (props) => {
    return (
        <h1>{props.temperature}</h1>
    );
}

export default connect(bindState)(Panel);
