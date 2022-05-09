import { useState } from "react";
import { useMountedRef } from "utils";

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
    //是否需要将异常抛出以方便try-catch
    throwOnError: false,
}

//用于网络请求的异步钩子，会自动在相应环节设置自己的请求状态
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultInitConfig) => {
    const config = { ...defaultInitConfig, ...initialConfig };
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    });

    //设置最终请求结果到data
    const setData = (data: D) => setState({
        data,
        error: null,
        stat: 'success'
    })
    //设置状态为error
    const setError = (error: Error) => setState({
        data: null,
        error,
        stat: 'error'
    })
    //保存的组件是否加载完毕还是已经被卸载
    const mountedRef = useMountedRef();
    const [retry, setRetry] = useState(() => () => { })

    //run函数用于出发异步请求
    const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error('传入的不是一个promise');
        }
        setRetry(() => () => {
            if (runConfig && runConfig.retry) {
                run(runConfig.retry(), runConfig)
            }
        })
        //先设置状态为loading
        setState({ ...state, stat: 'loading' });
        //如果直接catch(setError)，会导致try-catch这种写法无法接收到异常信息，
        //因为在这里异常被消费了，但是then().catch() 这种写法是可以正常运行的
        return promise
            .then((data) => {
                //只有在已经挂载了才会传入数据
                if (mountedRef.current) {
                    setData(data);
                }
                return data
            })
            .catch(error => {
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
        //retry被调用时重新执行一次run，使state刷新
        retry,
        ...state
    };
}