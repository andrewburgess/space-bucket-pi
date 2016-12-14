import _                    from 'lodash';
import { connect }          from 'react-redux';
import React, { PropTypes } from 'react';

import Chart        from './Chart';
import CurrentValue from './CurrentValue';
import MinMax       from './MinMax';
import Panel        from './Panel';
import PanelHeader  from './PanelHeader';

const bindState = state => {
    return {
        current: state.environment.temperature,
        records: _.map(state.history.records, record => { return { temperature: record.temperature, date: new Date(record.createdAt) }; })
    };
};

const Temperature = (props) => {
    return (
        <Panel>
            <PanelHeader>Temperature</PanelHeader>
            <CurrentValue>{ props.current }&deg;C</CurrentValue>
            <MinMax max={ `${_.max(_.map(props.records, 'temperature'))}°C` } min={ `${_.min(_.map(props.records, 'temperature'))}°C` } />
            <Chart data={ props.records }
                   valueFormat={ value => `${value}°C` }
                   x="date"
                   y="temperature" />
        </Panel>
    );
};

Temperature.propTypes = {
    current: PropTypes.number,
    records: PropTypes.array
};

export default connect(bindState)(Temperature);
