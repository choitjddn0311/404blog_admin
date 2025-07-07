import GlobalStyle from "./style/globalStyle";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SideBar from "./components/sidebar";
import MainDashboard from "./page/mainDashboard";
import UserManagement from "./page/userManagement";
import PostManagement from "./page/postManageMent";
import DetailPost from "./page/detailPost";

function App() {
  return (
    <>
    <GlobalStyle/>
      <BrowserRouter>
        <SideBar/>
        <Routes>
          <Route path="/" element={<MainDashboard/>}></Route>
          <Route path="/userList" element={<UserManagement/>} ></Route>
          <Route path="/postList" element={<PostManagement/>} ></Route>
          <Route path="/postList/:id" element={<DetailPost/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
