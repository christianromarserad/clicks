import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '../Configurations/theme';
import { Flex } from './index';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    font-family: ${(props) => props.theme.fontFamily};
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
      <Flex mr="auto" ml="auto" vertical>
        {children}
      </Flex>
    </ThemeProvider>
  );
}

export default StyledComponentLayout;