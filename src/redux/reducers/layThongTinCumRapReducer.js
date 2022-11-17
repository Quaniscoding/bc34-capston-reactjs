import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../utils/baseUrl';

const initialState = {
  danhSachThongTinCumRap: []

}

const layThongTinCumRapReducer = createSlice({
  name: "layThongTinCumRapReducer",
  initialState,
  reducers: {
    getDanhSachThongTinCumRap: (state, { type, payload }) => {
      {
        state.danhSachThongTinCumRap = payload
      }
    }
  }
});

export const { getDanhSachThongTinCumRap } = layThongTinCumRapReducer.actions

export default layThongTinCumRapReducer.reducer
export const getThongTinCumRap = (maHeThongRap) => async (dispatch) => {
  try {
    const apiThongTinCumRap = await http.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong`, maHeThongRap);
    dispatch(apiThongTinCumRap.data.content)
  } catch (error) {
    console.log(error);
  }
}