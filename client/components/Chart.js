import moment               from 'moment';
import React, { PropTypes } from 'react';
import styled               from 'styled-components';
import {
    VictoryAxis,
    VictoryChart,
    VictoryLine
}                           from 'victory';

const Container = styled.div`
    align-items: stretch;
    display: flex;
    flex: 1 1 auto;
    height: 100%;
    width: 100%;

    & > svg {
        display: block;
        height: 100%;
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        width: 100%;
    }
`;

const Chart = (props) => {
    return (
        <Container>
            <VictoryChart height={ 250 }>
                <VictoryAxis label="" tickCount={ 3 } tickFormat={ (value) => moment(value).format('MM/DD H:mm') } />
                <VictoryAxis dependentAxis label={ props.label } tickCount={ 4 } tickFormat={ props.valueFormat } />
                <VictoryLine data={ props.data } x={ props.x } y={ props.y } />
            </VictoryChart>
        </Container>
    );
};

Chart.propTypes = {
    data: PropTypes.array,
    label: PropTypes.string,
    valueFormat: PropTypes.func,
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default Chart;
