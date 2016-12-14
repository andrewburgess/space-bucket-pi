import React  from 'react';
import styled from 'styled-components';

import { Colors } from '../styles';

const Container = styled.div`
    background-color: ${Colors.PRIMARY_DARK};
    background: linear-gradient(${Colors.PRIMARY_LIGHT}, ${Colors.PRIMARY});
    box-shadow: 0px 0px 20px 2px ${Colors.BLACK};
    color: ${Colors.ACCENT};
    font-family: 'Bungee', sans-serif;
    font-size: 32px;
    font-weight: 700;
    padding: 24px 16px 16px;
    text-shadow: 2px 2px 1px ${Colors.PRIMARY_DARK};
    z-index: 10
`;

const Header = () => {
    return (
        <Container>
            SPACE BUCKET
        </Container>
    );
};

export default Header;
