import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../utils/baseUrl';

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
        const apiGetPhim = await http.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP09")
        dispatch(getDanhSachPhim(apiGetPhim.data.content));
    } catch (err) {
        console.log(err);
    }
}

