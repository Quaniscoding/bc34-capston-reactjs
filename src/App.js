import './App.css';
import 'antd/dist/antd.css';
import './assets/css/main.css'
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import LayoutAdmin from './template/admins/LayoutAdmin';
import Layout from './template/users/Layout';
import TrangChu from './pages/TrangChu/TrangChu';
import TimKiem from './pages/TimKiem/TimKiem';
import NotFound from './pages/NotFound';
import LogIn from './template/users/LogIn';
import SignUp from './template/users/SignUp';
function App() {
  return (
    <div className="App">
      <HistoryRouter history={history} >
        <Routes>
          {/* user */}
          <Route path='/' element={<Layout />}>
            <Route path='/trangchu' element={<TrangChu />} />
            <Route path='/timkiem' element={<TimKiem />} />
            <Route path='*' element={<NotFound />} />
            <Route index path='login' element={<LogIn />} />
            <Route path='signup' element={<SignUp />} />
          </Route>
          {/* admin */}
          <Route path='/admin' element={<LayoutAdmin />}>

          </Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
