import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    thongTinLichChieu: {}
}

const TaoLichChieu = createSlice({
    name: "TaoLichChieu",
    initialState,
    reducers: {
        thongTinLichChieu: (state, { type, payload }) => {
            state.thongTinLichChieu = payload;
        }
    }
});

export const { thongTinLichChieu } = TaoLichChieu.actions

export default TaoLichChieu.reducer
export const taoLichChieu = (thongTinLichChieu) => async () => {
    try {
        const res = await http.post("/QuanLyDatVe/taoLichChieu", thongTinLichChieu)
        alert("Tạo lịch chiếu thành công !");
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}
