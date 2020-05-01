import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '../Configurations/theme';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    &, * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  }
`

function StyledComponentLayout({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
}

export default StyledComponentLayout;