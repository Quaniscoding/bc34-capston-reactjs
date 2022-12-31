import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { removeLocal } from '../../utils/config';
import { USER_LOGIN } from '../../utils/constant';
const initialState = {
    danhSachThongTinLichChieuPhim: []
}

const thongTinLichChieuPhim = createSlice({
    name: "thongTinLichChieuPhim",
    initialState,
    reducers: {
        getdanhSachThongTinLichChieuPhim: (state, { type, payload }) => {
            {
                state.danhSachThongTinLichChieuPhim = payload
            }
        }
    }
});

export const { getdanhSachThongTinLichChieuPhim } = thongTinLichChieuPhim.actions

export default thongTinLichChieuPhim.reducer
export const callgetdanhSachThongTinLichChieuPhim = async (ditpatch) => {
    try {
        const apiGetdanhSachThongTinLichChieuPhim = await axios({
            method: "GET",
            url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09",
            headers: {
                "TokenCybersoft": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I"
            }
        })
        ditpatch(getdanhSachThongTinLichChieuPhim(apiGetdanhSachThongTinLichChieuPhim.data.content))
    } catch (err) {
        console.log(err);
    }
}