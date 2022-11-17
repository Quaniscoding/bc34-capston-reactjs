import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { removeLocal } from '../../utils/config';
import { USER_LOGIN } from '../../utils/constant';

const initialState = {
    danhSachThongTinHeThongRap: []
}

const thongTinHeThongRap = createSlice({
    name: "thongTinHeThongRap",
    initialState,
    reducers: {
        getDanhSachThongTinHeThongRap: (state, { type, payload }) => {
            {
                state.danhSachThongTinHeThongRap = payload
            }
        }
    }
});

export const { getDanhSachThongTinHeThongRap } = thongTinHeThongRap.actions

export default thongTinHeThongRap.reducer
export const callgetDanhSachThongTinHeThongRap = async (ditpatch) => {
    try {
        const apiGetDanhSachThongTinHeThongRap = await axios({
            method: "GET",
            url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
            headers: {
                "TokenCybersoft": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I"
            }
        })
        ditpatch(getDanhSachThongTinHeThongRap(apiGetDanhSachThongTinHeThongRap.data.content))
    } catch (err) {
        console.log(err);
    }
}