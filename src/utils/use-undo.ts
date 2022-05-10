import { useCallback, useReducer, useState } from "react"

const UNDO = "UNDO"
const REDO = "REDO"
const SET = "SET"
const RESET = "RESET"

type State<T> = {
    past: T[],
    present: T,
    future: T[]
}
type Action<T> = {
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET,
    payload?: T
}

const undoReducer = <T>(preState: State<T>, action: Action<T>) => {
    const { past, present, future } = preState
    const { type, payload } = action
    switch (type) {
        case UNDO: {
            if (past.length === 0) return preState
            // 取出过去操作中的最后一个操作作为新的present
            const newPresent = past[past.length - 1]
            // 将最后一个操作从past中移除
            const newPast = past.slice(0, past.length - 1)
            return {
                // 将新的present和新的past设置到state中
                past: newPast,
                present: newPresent,
                //将旧的present放入到future数组的头部
                future: [present, ...future]
            }
        }
        case REDO: {
            if (future.length === 0) return preState
            // 取出第一个future
            const newPresent = future[0]
            // 将第一个future从future中删除 slice 函数可以用于剪裁\复制数组
            const newFuture = future.slice(1)
            return {
                past: [...past, present],
                present: newPresent,
                future: newFuture
            }
        }
        case SET: {
            if (present === payload) return preState
            return {
                past: [...past, present],
                present: payload,
                future: []
            }
        }
        case RESET: {
            return {
                past: [],
                present: payload,
                future: []
            }
        }
        default: return preState
    }
}

export const useUndo = <T>(initialPresent: T) => {
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initialPresent,
        future: []
    } as State<T>)

    //是否可以撤销
    const canUndo = state.past.length !== 0
    //是否可以重做
    const canRedo = state.future.length !== 0

    //撤销操作
    const undo = useCallback(() => dispatch({ type: UNDO }), [])

    //重做操作
    const redo = useCallback(() => dispatch({ type: REDO }), [])

    //传入新值，更新present，将过去的操作放入到past数组的末尾
    const set = useCallback((newPresent: T) => dispatch({ type: SET, payload: newPresent }), [])

    //使用新传入的值替换present，并将撤销和重做清空
    const reset = useCallback((newPresent: T) => dispatch({ type: RESET, payload: newPresent }), [])

    return [
        state,
        { set, reset, undo, redo, canUndo, canRedo },
    ]
}