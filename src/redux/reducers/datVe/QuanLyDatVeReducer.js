const initialState = {
    danhSachGheDangDat: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case "DAT_VE":
            let danhSachGheCapNhat = [...state.danhSachGheDangDat]
            let index = danhSachGheCapNhat.findIndex(gheDangDat => gheDangDat.maGhe === action.gheDuocChon.maGhe)
            if (index != -1) {
                danhSachGheCapNhat.splice(index, 1)
            }
            else {
                danhSachGheCapNhat.push(action.gheDuocChon)
            }
            return { ...state, danhSachGheDangDat: danhSachGheCapNhat }
        default:
            return { ...state }
    }
}
