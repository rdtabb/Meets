import React, { Component, ErrorInfo, ReactNode } from 'react'

import { error } from '../../assets'

interface Props {
    children?: ReactNode
}

interface State {
    hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <section className="error">
                    <img src={error} alt="Something went wrong!" />
                    <h1 className="error__heading">Sorry, something went wrong</h1>
                </section>
            )
        }

        return this.props.children
    }
}
