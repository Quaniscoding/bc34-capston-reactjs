import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../utils/baseUrl';
import { removeLocal } from '../../utils/config';
import { USER_LOGIN } from '../../utils/constant';

const initialState = {
    thongTinPhim: {}
}
const danhSachPhimUpdate = createSlice({
    name: "danhSachPhimUpdate",
    initialState,
    reducers: {
        getDanhSachPhim: (state, { type, payload }) => {
            state.thongTinPhim = payload;
        }
    }
});

export const { getDanhSachPhim } = danhSachPhimUpdate.actions

export default danhSachPhimUpdate.reducer

export const callGetDanhSachPhim = (maPhim) => {
    return async (dispatch) => {
        try {
            const apiGetPhim = await http.get(`/QuanLyPhim/LayThongTinPhim?maPhim=${maPhim}`)
            dispatch(getDanhSachPhim(apiGetPhim.data.content));
        } catch (err) {
            console.log(err);
        }
    }
}
