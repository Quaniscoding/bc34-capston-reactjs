import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../utils/baseUrl';
import { removeLocal } from '../../utils/config';
import { USER_LOGIN } from '../../utils/constant';

const initialState = {
    danhSachPhim: []
}

const danhSachPhimReducer = createSlice({
    name: "danhSachPhimReducer",
    initialState,
    reducers: {
        getDanhSachPhim: (state, { type, payload }) => {
            state.danhSachPhim = payload;
        }
    }
});

export const { getDanhSachPhim } = danhSachPhimReducer.actions

export default danhSachPhimReducer.reducer

export const callGetDanhSachPhim = async (dispatch) => {
    try {
        const apiGetPhim = await http.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP04")
        dispatch(getDanhSachPhim(apiGetPhim.data.content));
    } catch (err) {
        removeLocal(USER_LOGIN);
    }
}