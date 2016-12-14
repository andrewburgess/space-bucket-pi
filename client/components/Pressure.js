import { connect }          from 'react-redux';
import React, { PropTypes } from 'react';

import CurrentValue from './CurrentValue';
import Panel        from './Panel';
import PanelHeader  from './PanelHeader';

const bindState = state => {
    return {
        current: state.environment.pressure
    };
};

const Pressure = (props) => {
    return (
        <Panel>
            <PanelHeader>Pressure</PanelHeader>
            <CurrentValue>{ props.current }hPa</CurrentValue>
        </Panel>
    );
};

Pressure.propTypes = {
    current: PropTypes.number
};

export default connect(bindState)(Pressure);
