import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const initialState = {
    danhSachBanner: []
}

const bannerReducer = createSlice({
    name: "bannerReducer",
    initialState,
    reducers: {
        getDanhSachBanner: (state, { type, payload }) => {
            {
                state.danhSachBanner = payload
            }
        }
    }
});

export const { getDanhSachBanner } = bannerReducer.actions

export default bannerReducer.reducer
export const callGetDanhSachBanner = async (ditpatch) => {
    try {
        const apiGetBanner = await axios({
            method: "GET",
            url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
            headers: {
                "TokenCybersoft": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I"
            }
        })
        ditpatch(getDanhSachBanner(apiGetBanner.data.content))
    } catch (err) {
        console.log(err);
    }
}