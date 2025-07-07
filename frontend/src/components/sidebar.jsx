import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { FaUserPen } from "react-icons/fa6";
import { FaFilePen } from "react-icons/fa6";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
{/* <IoIosArrowForward /> */}

const Aside = styled.aside`
    width: ${(props) => (props.isOpen ? "275px" : "100px")};
    height: 100vh;
    background: #111;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 50px;
    transition: width .3s;
`;

const AsideToggle = styled.div`
    width: 100%;
    height: ${(props) => (props.isOpen ? "100px" : "50px")};
    display: flex;
    justify-content: end;
    align-items: center;
    padding: ${(props) => (props.isOpen ? "0 25px" : "0 10px")};
    color: #fff;
    font-size: ${(props) => (props.isOpen ? "30px" : "25px")};
    cursor: pointer;
    transition: 0.3s;

`
const AsideInner = styled.ul`
    width: 100%;
    height: 80%;
`
const AsideMenu = styled.li`
    width: 100%;
    height: 75px;
    color: #fff;
    display: flex;
    justify-content: ${(props) => (props.isOpen ? "start" : "center")};
    align-items: center;
    padding: ${(props) => (props.isOpen ? "0 50px" : "0px")};
    font-size: ${(props) => (props.isOpen ? "20px" : "25px")};
    position: relative;
    
    & > a {
        display: flex;
        gap: ${(props) => (props.isOpen ? "15px" : "0px")};
    }
    
    & p {
        display: ${(props) => (props.isOpen ? "block" : "none")};
    }

    &::after {
        content: '';
        width: 3px;
        height: 100%;
        position: absolute;
        background: #fff;
        border-radius: 2px;
        left: 0;
        visibility: hidden;
        opacity: 0;
        transition: opacity .3s;
    }
    
    &:hover::after {
        visibility: visible;
        opacity: 1;
        transition: opacity .3s;
    }
`

const SideBar = () => {
    // 열려있기에 상태 true로 저장
    const [isOpen,setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen((prev) => !prev)

    return (
        <>
            <Aside isOpen={isOpen}>
                <AsideToggle onClick={toggleSidebar}>
                    {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
                </AsideToggle>
                <AsideInner>
                    <AsideMenu isOpen={isOpen}>
                        <Link to='/'><BiSolidDashboard /> <p>대시보드</p></Link>
                    </AsideMenu>
                    <AsideMenu isOpen={isOpen}>
                        <Link to='/userList'><FaUserPen /><p>회원 관리</p></Link>
                    </AsideMenu>
                    <AsideMenu isOpen={isOpen}>
                        <Link to='/postList'><FaFilePen /><p>게시글 관리</p></Link>
                    </AsideMenu>
                    <AsideMenu isOpen={isOpen}>
                        <Link to={process.env.REACT_APP_MAIN_PAGE_URL}><IoHome/> <p>메인페이지</p></Link>
                    </AsideMenu>
                </AsideInner>
            </Aside>
        </>
    )
}

export default SideBar;