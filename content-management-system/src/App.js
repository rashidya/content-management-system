import DiaryHome from './pages/HomePage/HomePage';
import SignInPage from './pages/LogInPage/LogInPage';
import { Route, Routes } from "react-router-dom";
import AdminDashBoard from './pages/AdminPage/AdminPage';


function App() {
  return (

    <Routes>
      <Route exact path='/' element={<DiaryHome/>} />
      <Route path='logIn' element={<SignInPage/>} />
      <Route exact path='/adminDashboard' element={<AdminDashBoard/>} />
    </Routes>


  );
}

export default App;