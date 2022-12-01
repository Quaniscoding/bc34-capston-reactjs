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
        alert("Đăng nhập thành công !")
    } catch (err) {
        return new Promise((resolve, reject) =>
            resolve({ isError: true, message: err.response.data.message }));
    }
}
export const callSignUp = (userSignUp) => async () => {
    try {
        const apiSignUp = await http.post("/QuanLyNguoiDung/DangKy", userSignUp);
        history.push("/login")
        alert("Đăng ký thành công !")

    } catch (err) {
        alert("Không đăng ký được !");
    }
}
export const callUploadPhim = (formData) => async () => {
    try {
        const apiUpload = await http.post("/QuanLyPhim/ThemPhimUploadHinh", formData);
        history.push("/admin/films");
        alert("Thêm phim thành công !")
    } catch (err) {
        alert(err.response.data.content);
    }
}

export const callUpdatePhim = (formData) => async () => {
    try {
        const apiUpdate = await http.post("/QuanLyPhim/CapNhatPhimUpload", formData);
        history.push("/admin/films")
        alert("Cập nhật phim thành công !")
    } catch (err) {
        alert(err.response.data.content);
    }
}
export const callDeletePhim = (maPhim) => async () => {
    try {
        const apiUpdate = await http.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
        history.push("/admin/films");
        alert("Xóa phim thành công !")
    } catch (err) {
        alert(err.response.data.content);
    }
}
export const callDeleteUser = (taiKhoan) => async () => {
    try {
        const apiUpdate = await http.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
        history.push("/admin/danhSachUser");
        alert("Xóa người dùng thành công !")
    } catch (err) {
        alert(err.response.data.content);
    }
}
export const callUploadUser = (data) => async () => {
    try {
        const apiUpload = await http.post("/QuanLyNguoiDung/ThemNguoiDung", data);
        history.push("/admin/danhSachUser");
        alert("Thêm người dùng thành công !")
    } catch (err) {
        alert(err.response.data.content);
    }
}
export const callUpdateThongTinUser = (data) => async () => {
    try {
        const apiUpdate = await http.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
        history.push("/infousers");
        alert("Update thông tin user thành công !")
    } catch (err) {
        alert(err.response.data.content);
    }
}
export const callUpdateThongTinUserAdmin = (data) => async () => {
    try {
        const apiUpdate = await http.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
        history.push("/admin/danhSachUser");
        alert("Update thông tin user thành công !")
    } catch (err) {
        alert(err.response.data.content);
    }
}