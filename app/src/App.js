import { normalize } from "polished"
import React from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"

import "./socket"
import Theme from "./Theme"

const Reset = createGlobalStyle`
    ${normalize()}

    * {
        box-sizing: border-box;
    }

    html, body {
        background-color: #060606;
        color: #fff;
    }
`

class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={Theme}>
                <>
                    <Reset />
                    <div className={this.props.className}>Hello</div>
                </>
            </ThemeProvider>
        )
    }
}

export default styled(App)``
