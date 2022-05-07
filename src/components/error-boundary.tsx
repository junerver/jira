import React, { Component, PropsWithChildren } from 'react'


type FallbackRender = (props: { error: Error | null }) => React.ReactNode

export default class ErrorBoundary extends Component<PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {

    state = { error: null };

    static getDerivedStateFromError(error: Error) {
        return { error }
    }

    render() {
        const { error } = this.state
        const { children, fallbackRender } = this.props
        if (error) {
            return fallbackRender({ error })
        } else {
            return children
        }
    }
}
