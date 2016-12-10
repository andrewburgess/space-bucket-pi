import React  from 'react';
import styled from 'styled-components';

import { Colors } from './styles';
import Header from './components/Header';

const Container = styled.div`
    align-items: stretch;
    background-color: ${Colors.BLACK};
    display: flex;
    flex-direction: row;
    font-family: 'Archivo Narrow', sans-serif;
    height: 100%;
    justify-content: center;
    width: 100%;
`;

const Column = styled.div`
    background-color: ${Colors.WHITE};
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1600px;
    min-height: 100%;
    width: 90%;
`;

const Application = () => {
    return (
        <Container>
            <Column>
                <Header />
            </Column>
        </Container>
    );
};

export default Application;
