//redux toolkit
import { configureStore } from '@reduxjs/toolkit'
import danhSachPhimReducer from './reducers/danhSachPhimReducer'
import bannerReducer from './reducers/bannerReducer'
import thongTinChieuHeThongRap from './reducers/layThongTinChieuHeThongRap'
import thongTinHeThongRap from './reducers/thongTinHeThongRapReducer'
import thongTinLichChieuPhim from './reducers/thongTinLichChieuPhim'
export const store = configureStore({
  reducer: {
    danhSachPhimReducer,
    bannerReducer,
    thongTinChieuHeThongRap,
    thongTinHeThongRap,
    thongTinLichChieuPhim,
  },
})