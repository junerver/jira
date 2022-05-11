import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

//状态类型
interface State {
    projectModalOpen: boolean;
}
//初始状态
const initialState: State = {
    projectModalOpen: false
}
//模板代码，创建slice
export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
        //直接使用函数，与reducer类似的是参数也是 state、action，
        //但是action的type基本不用了，因为每个action都变成了独立的函数，
        //这一点类似mobx，而且我们不需要在考虑不可变性的问题，
        //redux-toolkit会自动帮我们处理
        openProjectModal(state) {
            state.projectModalOpen = true;
        },
        closeProjectModal(state) {
            state.projectModalOpen = false;
        }
    }
})

//默认暴露reducer
export default projectListSlice.reducer;
//暴露action
export const { openProjectModal, closeProjectModal } = projectListSlice.actions;
//暴露对应的selector
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen;
