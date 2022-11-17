//rxslice

import { createSlice } from '@reduxjs/toolkit';
import { http } from '../../utils/baseUrl';
const initialState = {
    danhSachUser: [],
}

const danhSachUser = createSlice({
    name: "danhSachUser",
    initialState,
    reducers: {
        getDanhSachUser: (state, { type, payload }) => {
            state.danhSachUser = payload;
        }
    }
});
export const { getDanhSachUser } = danhSachUser.actions

export default danhSachUser.reducer

export const callGetDanhSachUser = (keyWord) => {
    return async (dispatch) => {
        try {
            if (keyWord != "") {
                const apiGetUser = await http.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=GP04&tuKhoa=${keyWord}`)
                dispatch(getDanhSachUser(apiGetUser.data.content));
            }
            else {
                const apiGetUser = await http.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=GP04`)
                dispatch(getDanhSachUser(apiGetUser.data.content));
            }

        }
        catch (error) {
            console.log(error)
        }

    }

}