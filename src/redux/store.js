//redux toolkit
import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit'
import danhSachPhimReducer from './reducers/danhSachPhimReducer'
import bannerReducer from './reducers/bannerReducer'
import thongTinChieuHeThongRap from './reducers/layThongTinChieuHeThongRap'
import thongTinHeThongRap from './reducers/thongTinHeThongRapReducer'
import thongTinLichChieuPhim from './reducers/thongTinLichChieuPhim'
import danhSachPhimSearch from './reducers/danhSachPhimSearch'
import danhSachPhimUpdate from './reducers/danhSachPhimUpdate'
import QuanLyDatVeReducer from './reducers/datVe/QuanLyDatVeReducer'
import DatVe from './reducers/datVe/DatVe'
import TaoLichChieu from './reducers/datVe/TaoLichChieu'
import danhSachUser from './reducers/danhSachUser'
import dataThongTinLichChieu from './reducers/dataThongTinLichChieu'
export const store = configureStore({
  reducer: {
    danhSachPhimReducer,
    bannerReducer,
    thongTinChieuHeThongRap,
    thongTinHeThongRap,
    thongTinLichChieuPhim,
    danhSachPhimSearch,
    danhSachPhimUpdate,
    QuanLyDatVeReducer,
    DatVe,
    TaoLichChieu,
    danhSachUser,
    dataThongTinLichChieu
  },
})