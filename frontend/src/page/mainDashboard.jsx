import React from "react";
import styled from "styled-components";

const Body = styled.div`
    width: ${(props) => (props.isOpen ? "calc(100% - 250px)" : "calc(100% - 100px)")};
    height: 100vh;
    background: #eee;
    padding: 10px;
`;

const MainDashBoard = ({isOpen}) => {
    return (
        <>
            <Body isOpen={isOpen}>
                <h1>대시보드</h1>
            </Body>
        </>
    )
}

export default MainDashBoard;