//redux toolkit
import { configureStore } from '@reduxjs/toolkit'
import danhSachPhimReducer from './reducers/danhSachPhimReducer'
import bannerReducer from './reducers/bannerReducer'
import thongTinChieuHeThongRap from './reducers/layThongTinChieuHeThongRap'
import thongTinHeThongRap from './reducers/thongTinHeThongRapReducer'
import thongTinLichChieuPhim from './reducers/thongTinLichChieuPhim'
import danhSachPhimSearch from './reducers/danhSachPhimSearch'
import danhSachPhimUpdate from './reducers/danhSachPhimUpdate'
export const store = configureStore({
  reducer: {
    danhSachPhimReducer,
    bannerReducer,
    thongTinChieuHeThongRap,
    thongTinHeThongRap,
    thongTinLichChieuPhim,
    danhSachPhimSearch,
    danhSachPhimUpdate
  },
})