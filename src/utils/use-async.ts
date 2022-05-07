import { useState } from "react";

interface State<D> {
    error: Error | null;
    data: D | null;
    //自定义的字面量类型 [请求未发生] [请求中] [成功] [失败]
    stat: 'idel' | 'loading' | 'success' | 'error';
}

const defaultInitialState: State<null> = {
    error: null,
    data: null,
    stat: 'idel'
}
const defaultInitConfig = {
    throwOnError: false,
}
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultInitConfig) => {
    const config = { ...defaultInitConfig, ...initialConfig };
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    });
    const setData = (data: D) => setState({
        data,
        error: null,
        stat: 'success'
    })

    const setError = (error: Error) => setState({
        data: null,
        error,
        stat: 'error'
    })

    //run函数用于出发异步请求
    const run = (promise: Promise<D>) => {
        if (!promise || !promise.then) {
            throw new Error('传入的不是一个promise');
        }
        //先设置状态为loading
        setState({ ...state, stat: 'loading' });
        //如果直接catch(setError)，会导致try-catch这种写法无法接收到异常信息，
        //因为在这里异常被消费了，但是then().catch() 这种写法是可以正常运行的
        return promise.then(setData).catch(error => {
            setError(error);
            if (config.throwOnError) return Promise.reject(error);
            return error;
        });
    }

    return {
        isIdle: state.stat === 'idel',
        isLoading: state.stat === 'loading',
        isSuccess: state.stat === 'success',
        isError: state.stat === 'error',
        run,
        setData,
        setError,
        ...state
    };
}