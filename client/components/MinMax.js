import React, { PropTypes } from 'react';
import styled               from 'styled-components';

import { Colors } from '../styles';

const Container = styled.div`
    display: flex;
    flex: none;
    flex-direction: row;
    justify-content: space-between;
    min-width: 200px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column
`;

const Header = styled.h3`
    color: ${Colors.PRIMARY_LIGHT};
    font-size: 12px;
    font-weight: 300;
    text-align: center;
    text-transform: uppercase;
`;

const Value = styled.h4`
    font-size: 16px;
    font-weight: 900;
    text-align: center;
`;

const Max = styled(Value)`
    color: ${Colors.ACCENT};
`;

const Min = styled(Value)`
    color: ${Colors.BLUE};
`;

const MinMax = (props) => {
    return (
        <Container>
            <Section>
                <Header>
                    Min
                </Header>
                <Min>
                    { props.min }
                </Min>
            </Section>
            <Section>
                <Header>
                    Max
                </Header>
                <Max>
                    { props.max }
                </Max>
            </Section>
        </Container>
    );
};

MinMax.propTypes = {
    min: PropTypes.string,
    max: PropTypes.string
};

export default MinMax;
