import { connect }          from 'react-redux';
import React, { PropTypes } from 'react';

import CurrentValue from './CurrentValue';
import Panel        from './Panel';
import PanelHeader  from './PanelHeader';

const bindState = state => {
    return {
        current: state.environment.light
    };
};

const Light = (props) => {
    return (
        <Panel>
            <PanelHeader>Light</PanelHeader>
            <CurrentValue>{ props.current < 150 ? 'ON' : 'OFF' }</CurrentValue>
        </Panel>
    );
};

Light.propTypes = {
    current: PropTypes.number
};

export default connect(bindState)(Light);
