import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StyledComponentLayout from './StyledComponents/StyledComponentLayout'

ReactDOM.render(
  <React.StrictMode>
    <StyledComponentLayout>
      <App />
    </StyledComponentLayout>
  </React.StrictMode>,
  document.getElementById('root')
);
