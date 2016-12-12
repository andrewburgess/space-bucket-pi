import _                    from 'lodash';
import { connect }          from 'react-redux';
import React, { PropTypes } from 'react';
import styled               from 'styled-components';

const bindState = state => state.environment;

const Container = styled.div`
    align-items: stretch;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Header = styled.div`
    font-size: 18px;
    text-align: center;
    text-transform: uppercase;
`;

const Panel = styled.div`
    align-items: center;
    background-color: #FFFFFF;
    border: 1px solid rgba(30, 30, 32, 0.1);
    border-radius: 2px;
    box-shadow: 4px 4px 8px rgba(30, 30, 32, 0.2);
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    height: 400px;
    justify-content: center;
    margin: 32px;
    width: 100%;
`;

const Value = styled.h1`
    font-size: 64px;
    font-weight: 900;
    margin: 16px 0;
`;

const Environment = (props) => {
    return (
        <Container>
            <Panel>
                <Header>Temperature</Header>
                <Value>{ _.round(props.temperature * (9/5) + 32, 1) } &deg;F</Value>
            </Panel>
            <Panel>
                <Header>Humidity</Header>
                <Value>{ _.round(props.humidity, 1) } %</Value>
            </Panel>
            <Panel>
                <Header>Pressure</Header>
                <Value>{ _.round(props.pressure, 1) } hPa</Value>
            </Panel>
            <Panel>
                <Header>Light</Header>
                <Value>{ props.light }</Value>
            </Panel>
        </Container>
    );
};

Environment.propTypes = {
    humidity: PropTypes.number,
    light: PropTypes.number,
    pressure: PropTypes.number,
    temperature: PropTypes.number
};

export default connect(bindState)(Environment);
