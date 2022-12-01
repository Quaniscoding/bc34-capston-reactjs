import './App.css';
import 'antd/dist/antd.css';
import './assets/css/main.css'
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import LayoutAdmin from './template/admins/LayoutAdmin';
import Layout from './template/users/Layout';
import TrangChu from './pages/TrangChu/TrangChu';
import NotFound from './pages/NotFound';
import LogIn from './template/users/LogIn';
import SignUp from './template/users/SignUp';
import TrangDatVe from '../src/components/datVe/TrangDatVe';
import Films from './template/admins/Films';
import TrangThemPhim from './template/admins/TrangThemPhim';
import TrangCapNhatPhim from './template/admins/TrangCapNhatPhim';
import ChiTietPhim from './components/chiTietPhim/ChiTietphim';
import InfoUser from './template/users/quanLyUser/InfoUser';
import ShowTime from './template/admins/ShowTime';
import DanhSachUser from './template/users/quanLyUser/DanhSachUser';
import ThemUser from './template/users/quanLyUser/ThemUser';
import EditUser from './template/users/quanLyUser/EditUser';
function App() {
  return (
    <div className="App" >
      <HistoryRouter history={history} >
        <Routes>
          {/* user */}
          <Route path='/' element={<Layout />}>
            <Route index path='trangchu' element={<TrangChu />} loader="auto" />
            <Route path='*' element={<NotFound />} />
            <Route path='login' element={<LogIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='infousers' element={<InfoUser />} />
            <Route path='chitietphim/:maPhim' element={<ChiTietPhim />} loader="auto" />
            <Route path='datve/:maLichChieu' element={<TrangDatVe />} />
          </Route>
          {/* admin */}
          <Route path='/admin' element={<LayoutAdmin />}>
            <Route index path='films' element={<Films />} />
            <Route path='films/themphim' element={<TrangThemPhim />} />
            <Route path='films/capnhatphim/:maPhim' element={<TrangCapNhatPhim />} />
            <Route path='films/showtimes/:maPhim' element={<ShowTime />} />
            <Route path='danhSachUser' element={<DanhSachUser />} />
            <Route path='danhSachUser/themUser' element={<ThemUser />} />
            <Route path='danhSachUser/editUser/:soDT' element={<EditUser />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
