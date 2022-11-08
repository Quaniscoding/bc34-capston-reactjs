import { createSlice } from '@reduxjs/toolkit';
import { removeLocal, saveStringLocal } from '../../utils/config';
import { history } from '../../utils/history';
import { USER_LOGIN } from '../../utils/constant';
import { http } from '../../utils/baseUrl';
const initialState = {
    infoUser: {}
}

const userReducer = createSlice({
    name: "userreducer",
    initialState,
    reducers: {
        getProfile: (state, { type, payload }) => {
            state.infoUser = payload;
        }
    }
});

export const { getProfile } = userReducer.actions

export default userReducer.reducer
export const callLogin = (userLogin) => async () => {
    try {
        const apiLogin = await http.post("/QuanLyNguoiDung/DangNhap", userLogin)

        saveStringLocal(USER_LOGIN, apiLogin.data.content.accessToken
        )
        history.push("/trangchu")
    } catch (err) {
        return new Promise((resolve, reject) =>
            resolve({ isError: true, message: err.response.data.message }));
    }
}
export const callSignUp = (userSignUp) => async () => {
    try {
        const apiSignUp = await http.post("/QuanLyNguoiDung/DangKy", userSignUp);
        history.push("/login")
    } catch (err) {
        alert("Không đăng ký được !");
    }
}