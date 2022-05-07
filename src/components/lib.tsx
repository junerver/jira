import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
    gap?: number | boolean,
    between?: boolean,
    marginBottom?: number,
}>`
    display: flex;
    flex-direction: row;
    //垂直居中
    align-items: center;
    //设置子元素布局
    justify-content: ${({ between }) => between ? 'space-between' : undefined};
    margin-bottom: ${({ marginBottom }) => marginBottom ? marginBottom + 'rem' : undefined};
    //设置直接子元素的属性
    > * {
        margin-top: 0!important;
        margin-bottom: 0!important;
        margin-right: ${({ gap }) => typeof gap === 'number' ? gap + 'rem' : gap ? '2rem' : undefined};
    }
`

const FullPage = styled.div`
height: 100vh;
display: flex;
//水平居中
justify-content: center;
//垂直居中
align-items: center;
`

export const FullPageLoading = () => (
    <FullPage>
        <Spin size="large" />
    </FullPage>)

export const FullPageError = ({ error }: { error: Error | null }) => (
    <FullPage>
        <DevTools />
        <Typography.Text type="danger">{error?.message}</Typography.Text>
    </FullPage>
)