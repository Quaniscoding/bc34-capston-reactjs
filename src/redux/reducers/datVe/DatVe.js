import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
import { ThongTinDatVe } from '../../../_core/models/ThongTinDatVe';

const initialState = {
    thongTinDatVe: new ThongTinDatVe()
}

const DatVe = createSlice({
    name: "DatVe",
    initialState,
    reducers: {
        getDanhSachVeDat: (state, { type, payload }) => {
            state.thongTinDatVe = payload;
        }
    }
});

export const { getDanhSachVeDat } = DatVe.actions

export default DatVe.reducer
export const datVeXemPhim = (thongTinDatVe = new ThongTinDatVe()) => {
    return async dispatch => {
        try {
            const res = await http.post("/QuanLyDatVe/DatVe", thongTinDatVe);
            alert("Bạn đã đặt vé thành công !");
        } catch (err) {
            console.log(err.response.data);
        }
    }
}
