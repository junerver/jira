import { useAsync } from "utils/use-async";
import { act, renderHook } from "@testing-library/react-hooks";

const defaultState: ReturnType<typeof useAsync> = {
  stat: "idle",
  error: null,
  data: null,

  isIdle: true,
  isLoading: false,
  isSuccess: false,
  isError: false,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "loading",
  isIdle: false,
  isLoading: true,
};

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: "success",
  isIdle: false,
  isSuccess: true,
};

test("useAsync 可以异步处理", async () => {
  let resolve: any, reject: any;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  const { result } = renderHook(() => useAsync());
  expect(result.current).toEqual(defaultState);
  let p: Promise<any>;
  //因为useAsync中的run函数会改变state状态（异步过程），为了正确的获取状态，我们需要使用act函数包裹
  act(() => {
    p = result.current.run(promise);
  });
  //此时刚开始执行我们自定义的promise，状态应该是loading
  expect(result.current).toEqual(loadingState);
  const resolvedValue = { mockedValue: "mockedValue" };
  //手动触发传入的promise的resolve函数
  await act(async () => {
    resolve(resolvedValue);
    //此时的p理应是resolve传入的值，promise -> resolve -> 返回data包装的promise = p
    await p;
  });
  //此时promise的resolve函数已经执行完毕，状态应该是success，并且data值为resolve传入的值
  expect(result.current).toEqual({
    ...successState,
    data: resolvedValue,
  });
});
