import { connect }          from 'react-redux';
import React, { PropTypes } from 'react';

import CurrentValue from './CurrentValue';
import Panel        from './Panel';
import PanelHeader  from './PanelHeader';

const bindState = state => {
    return {
        current: state.environment.humidity
    };
};

const Humidity = (props) => {
    return (
        <Panel>
            <PanelHeader>Humidity</PanelHeader>
            <CurrentValue>{ props.current }%</CurrentValue>
        </Panel>
    );
};

Humidity.propTypes = {
    current: PropTypes.number
};

export default connect(bindState)(Humidity);
