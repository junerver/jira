import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
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

export const LongButton = styled(Button)`
    width: 100%;
`

export const CenterLinkButton = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonNoPadding = styled(Button)`
    padding: 0;
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
        <ErrorBox error={error} />
    </FullPage>
)

//类型守卫
const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return <Typography.Text type="danger">{error.message}</Typography.Text>
    }
    return null
}

export const ScreenContainer = styled.div`
    padding: 3.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`