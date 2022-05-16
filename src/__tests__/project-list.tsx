import { setupServer } from "msw/node";
import { rest } from "msw";
import fakeData from "./db.json";
import { render, screen, waitFor } from "@testing-library/react";
import ProjectListScreen from "screens/project-list";
import { AppProviders } from "context";
import { ReactNode } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
//mock api
const server = setupServer(
  rest.get(`${apiUrl}/me`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: "John Doe",
        token: "123",
      })
    );
  }),
  rest.get(`${apiUrl}/users`, (req, res, ctx) => {
    return res(ctx.json(fakeData.users));
  }),
  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    const { name = "", personId = undefined } = Object.fromEntries(
      req.url.searchParams
    );
    const result = fakeData.projects.filter((project) => {
      return (
        project.name.includes(name) &&
        (personId ? project.personId === +personId : true)
      );
    });
    return res(ctx.json(result));
  })
);

//jest测试库中的函数，beforeAll和afterAll是在所有测试用例之前和之后执行
beforeAll(() => server.listen());
//每个测试用例执行完毕后，都会执行重置mock路由
afterEach(() => server.resetHandlers());
//所有测试用例执行完毕后，会执行这个函数关闭mock
afterAll(() => server.close());

const waitTable = () =>
  waitFor(() => expect(screen.getByText("骑手管理")).toBeInTheDocument());

test("项目列表展示正常", async () => {
  renderScreen(<ProjectListScreen />, {
    route: "/projects",
  });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
});

test("搜索项目", async () => {
  renderScreen(<ProjectListScreen />, {
    route: "/projects?name=骑手",
  });
  await waitTable();
  //表头+单条项目数据
  expect(screen.getAllByRole("row").length).toBe(2);
  expect(screen.getByText("骑手管理")).toBeInTheDocument();
});

const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test Page", route);
  return render(<AppProviders>{ui}</AppProviders>);
};
