import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import React, {
    Component,
    PropTypes
}                             from 'react';
import styled                 from 'styled-components';

import { getHistory } from '../ducks/history';
import Humidity       from './Humidity';
import Light          from './Light';
import Pressure       from './Pressure';
import Temperature    from './Temperature';

const bindState = state => {
    return {
        latest: state.app.latest
    };
};

const bindActions = (dispatch) => {
    return bindActionCreators({
        getHistory
    }, dispatch);
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
`;

const ImageContainer = styled.div`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.05);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex: 0 1 auto;
    height: 100%;
    justify-content: center;
    text-align: center;
    width: 30%;

    & > img {
        max-height: 80%;
        object-fit: contain;
        max-width: 100%;
    }
`;

const DataContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    padding: 8px;
    width: 70%;
`;

class Environment extends Component {
    componentDidMount() {
        this.props.getHistory();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.latest !== nextProps.latest) {
            this.props.getHistory();
        }
    }

    render() {
        return (
            <Container>
                <ImageContainer>
                    <img src={ `/latest.jpg?ts=${this.props.latest}` } />
                </ImageContainer>
                <DataContainer>
                    <Temperature />
                    <Humidity />
                    <Pressure />
                    <Light />
                </DataContainer>
            </Container>
        );
    }
}

Environment.propTypes = {
    latest: PropTypes.number,

    getHistory: PropTypes.func
};

export default connect(bindState, bindActions)(Environment);
