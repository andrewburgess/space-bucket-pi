import { connect }          from 'react-redux';
import React, { PropTypes } from 'react';

import CurrentValue from './CurrentValue';
import Panel        from './Panel';
import PanelHeader  from './PanelHeader';

const bindState = state => {
    return {
        current: state.environment.temperature
    };
};

const Temperature = (props) => {
    return (
        <Panel>
            <PanelHeader>Temperature</PanelHeader>
            <CurrentValue>{ props.current }&deg;C</CurrentValue>
        </Panel>
    );
};

Temperature.propTypes = {
    current: PropTypes.number
};

export default connect(bindState)(Temperature);
