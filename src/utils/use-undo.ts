import { useCallback, useState } from "react"

export const useUndo = <T>(initialPresent: T) => {
    //聚合的状态有利于提高性能，而且使用useCallback时将无需依赖额外的数据
    //聚合状态
    const [state, setState] = useState<{
        past: T[],
        present: T,
        future: T[]
    }>({
        //保存过去的操作
        past: [],
        //当前操作
        present: initialPresent,
        //保存未来操作
        future: []
    })

    //是否可以撤销
    const canUndo = state.past.length !== 0
    //是否可以重做
    const canRedo = state.future.length !== 0

    //撤销操作
    const undo = useCallback(() => {
        setState(preState => {
            const { past, present, future } = preState
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
        })
    }, [])

    //重做操作
    const redo = useCallback(() => {
        setState(preState => {
            const { past, present, future } = preState
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
        })
    }, [])

    //传入新值，更新present，将过去的操作放入到past数组的末尾
    const set = useCallback((newPresent: T) => {
        setState(preState => {
            const { past, present, future } = preState
            if (present === newPresent) return preState
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        })
    }, [])

    //使用新传入的值替换present，并将撤销和重做清空
    const reset = useCallback((newPresent: T) => {
        setState({
            past: [],
            present: newPresent,
            future: []
        })
    }, [])

    return [
        state,
        { set, reset, undo, redo, canUndo, canRedo },
    ]
}