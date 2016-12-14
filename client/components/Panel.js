import styled from 'styled-components';

const Panel = styled.div`
    align-items: center;
    background-color: #FFFFFF;
    border: 1px solid rgba(30, 30, 32, 0.1);
    border-radius: 2px;
    box-shadow: 4px 4px 8px rgba(30, 30, 32, 0.2);
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    height: calc(50% - 16px);
    margin: 8px;
    padding: 16px 8px;
    width: calc(50% - 16px);
`;

export default Panel;
