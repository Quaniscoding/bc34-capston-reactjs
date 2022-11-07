import './App.css';
import 'antd/dist/antd.css';
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import LayoutAdmin from './templates/admins/LayoutAdmin';
import Layout from './templates/users/Layout';
import TrangChu from './pages/TrangChu/TrangChu';
import TimKiem from './pages/TimKiem/TimKiem';
import NotFound from './pages/NotFound';


function App() {
  return (
    <div className="App">
      <HistoryRouter history={history} >
        <Routes>
          {/* user */}
          <Route path='/' element={<Layout />}>
            <Route index path='/' element={<TrangChu />} />
            <Route path='/timkiem' element={<TimKiem />} />

            <Route path='*' element={<NotFound />} />
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
