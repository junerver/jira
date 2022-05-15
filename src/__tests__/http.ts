import { setupServer } from 'msw/node'
import { rest } from "msw";
import { http } from "../utils/http";

const apiUrl = process.env.REACT_APP_API_URL
const server = setupServer()

//jest测试库中的函数，beforeAll和afterAll是在所有测试用例之前和之后执行
beforeAll(() => server.listen())
//每个测试用例执行完毕后，都会执行重置mock路由
afterEach(() => server.resetHandlers())
//所有测试用例执行完毕后，会执行这个函数关闭mock
afterAll(() => server.close())

test('http方法发送异步请求', async () => {
    const endpoint = 'test-endpoint'
    const mockResult = { mockValue: 'mock-value' }
    server.use(
        rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) => {
            return res(ctx.json(mockResult))
        })
    )
    //调用http方法，发送异步请求
    const result = await http(endpoint)
    //断言
    expect(result).toEqual(mockResult)

})

test('http请求时会携带token', async () => {
    const token = 'FakeToken'
    const endpoint = 'test-endpoint'
    const mockResult = { mockValue: 'mock-value' }
    let request: any
    server.use(
        rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) => {
            //从请求中拿到request
            request = req
            return res(ctx.json(mockResult))
        })
    )
    //调用http方法，发送异步请求
    await http(endpoint, { token })
    //断言
    expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)

})