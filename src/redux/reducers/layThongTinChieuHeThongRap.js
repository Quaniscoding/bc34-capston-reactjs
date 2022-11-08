import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { removeLocal } from '../../utils/config';
import { USER_LOGIN } from '../../utils/constant';

const initialState = {
    danhSachThongTinChieuHeThongRap: []
}

const thongTinChieuHeThongRap = createSlice({
    name: "thongTinChieuHeThongRap",
    initialState,
    reducers: {
        getDanhSachThongTinChieuHeThongRap: (state, { type, payload }) => {
            {
                state.danhSachThongTinChieuHeThongRap = payload
            }
        }
    }
});

export const { getDanhSachThongTinChieuHeThongRap } = thongTinChieuHeThongRap.actions

export default thongTinChieuHeThongRap.reducer
export const callGetDanhSachThongTinChieuHeThongRap = async (ditpatch) => {
    try {
        const apiGetDanhSachThongTinChieuHeThongRap = await axios({
            method: "GET",
            url: "",
            headers: {
                "TokenCybersoft": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I"
            }
        })
        ditpatch(getDanhSachThongTinChieuHeThongRap(apiGetDanhSachThongTinChieuHeThongRap.data.content))
    } catch (err) {
        removeLocal(USER_LOGIN)
    }
}