import React from "react";
import styled from "styled-components";

const Body = styled.div`
    padding: 10px;
    width: calc(100% - 250px);
    height: 100vh;
    background: #eee;
    overflow-y: scroll;
`;

const UpdateLog = () => {
    return(
        <>
            <Body>
                <h1>유저 로그</h1>
            </Body>
        </>
    )
}

export default UpdateLog;