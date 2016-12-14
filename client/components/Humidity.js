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
        current: state.environment.humidity,
        records: _.map(state.history.records, record => { return { humidity: record.humidity, date: new Date(record.createdAt) }; })
    };
};

const Humidity = (props) => {
    return (
        <Panel>
            <PanelHeader>Humidity</PanelHeader>
            <CurrentValue>{ props.current }%</CurrentValue>
            <MinMax max={ `${_.max(_.map(props.records, 'humidity'))}%` } min={ `${_.min(_.map(props.records, 'humidity'))}%` } />
            <Chart data={ props.records }
                   valueFormat={ value => `${_.round(value, 1)}%` }
                   x="date"
                   y="humidity" />
        </Panel>
    );
};

Humidity.propTypes = {
    current: PropTypes.number,
    records: PropTypes.array
};

export default connect(bindState)(Humidity);
