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
        current: state.environment.pressure,
        records: _.map(state.history.records, record => { return { pressure: record.pressure, date: new Date(record.createdAt) }; })
    };
};

const Pressure = (props) => {
    return (
        <Panel>
            <PanelHeader>Pressure</PanelHeader>
            <CurrentValue>{ props.current } hPa</CurrentValue>
            <MinMax max={ `${_.max(_.map(props.records, 'pressure'))} hPa` } min={ `${_.min(_.map(props.records, 'pressure'))} hPa` } />
            <Chart data={ props.records }
                   valueFormat={ value => `${value} hPa` }
                   x="date"
                   y="pressure" />
        </Panel>
    );
};

Pressure.propTypes = {
    current: PropTypes.number,
    records: PropTypes.array
};

export default connect(bindState)(Pressure);
