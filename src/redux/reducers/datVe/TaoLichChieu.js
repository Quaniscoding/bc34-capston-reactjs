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
export const taoLichChieu = (thongTinLichChieu) => {
    return async dispatch => {
        try {
            const res = await http.post("/QuanLyDatVe/taoLichChieu", thongTinLichChieu)
            alert(res.data.content)
        } catch (err) {
            console.log(err);
        }
    }
}
