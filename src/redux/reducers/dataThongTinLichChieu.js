import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { http } from '../../utils/baseUrl';

const initialState = {
    data: []
}

const dataThongTinLichChieu = createSlice({
    name: "dataThongTinLichChieu",
    initialState,
    reducers: {
        getData: (state, { type, payload }) => {
            {
                state.data = payload
            }
        }
    }
});

export const { getData } = dataThongTinLichChieu.actions

export default dataThongTinLichChieu.reducer
export const callGetData = (maPhim) => async (dispatch) => {
    try {
        const getDataRap = await http.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
        dispatch(getData(getDataRap.data.content))
    } catch (error) {
        console.log("error", error);
    }
}