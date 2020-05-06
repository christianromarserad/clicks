import React, { useState } from 'react';
import ClickCount from './ClickCount';
import InformationPanel from './InformationPanel';
import GoogleSignIn from './GoogleSignin';


function App() {
	return (
		<>
			<GoogleSignIn />
			<ClickCount />
			<InformationPanel />
		</ >
	);
}

export default App;
