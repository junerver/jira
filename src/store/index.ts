import { configureStore } from "@reduxjs/toolkit"
import projectList from "screens/project-list/project-list.slice"
import auth from "./auth.slice"
import { useDispatch } from "react-redux"

const rootReducer = { projectList, auth }
const store = configureStore({ reducer: rootReducer })
export default store

//获取对应的Dispatch、 State类型
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
//简化dispatch调用
export const useAppDispatch = () => useDispatch<AppDispatch>()
