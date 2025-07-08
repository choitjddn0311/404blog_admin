import GlobalStyle from "./style/globalStyle";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SideBar from "./components/sidebar";
import MainDashboard from "./page/mainDashboard";
import UserManagement from "./page/userManagement";
import PostManagement from "./page/postManageMent";
import DetailPost from "./page/detailPost";
import UpdateLog from "./page/updateLog"
import { useState } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
    <GlobalStyle/>
      <BrowserRouter>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <Routes>
          <Route path="/" element={<MainDashboard isOpen={isOpen}/>}></Route>
          <Route path="/userList" element={<UserManagement isOpen={isOpen}/>} ></Route>
          <Route path="/postList" element={<PostManagement isOpen={isOpen}/>} ></Route>
          <Route path="/postList/:id" element={<DetailPost/>}></Route>
          <Route path="/UpdateLog" element={<UpdateLog/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
