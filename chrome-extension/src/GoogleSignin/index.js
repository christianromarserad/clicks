/*global chrome*/
import React, { useEffect, useState } from 'react';
import { Flex, InlineBlock, Text } from '../StyledComponents';
import axios from 'axios';

function GoogleSignIn() {
   const [isAuthneticated, setIsAuthenticated] = useState(false);
   const [userName, setUserName] = useState(null);
   const [image, setImage] = useState(null);

   useEffect(() => {
      // ComponentDidMount: determines if the user is authenticated
      setAuthenticationStatus();

      //ComponentDidMount: Add event when window is focused, it determines if the user is authenticated
      window.addEventListener('focus', () => {
         setAuthenticationStatus();
      });
   }, []);


   useEffect(() => {
      // If detected that user is authenticated, it will set his/her user information (username, and picture)
      if (isAuthneticated) {
         setUserInfo();
      }
   }, [isAuthneticated]);

   // Sets the authentication status (authenticated or not)
   const setAuthenticationStatus = () => {
      chrome.identity.getAuthToken({ interactive: false }, function (token) {
         (token) ? setIsAuthenticated(true) : setIsAuthenticated(false);
      });
   }

   // Sets the user information(username, and picture) if authenticated
   const setUserInfo = () => {
      chrome.identity.getAuthToken({ interactive: false }, function (token) {
         if (token) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`).then((result) => {
               setUserName(result.data.given_name);
               setImage(result.data.picture);
            });
         }
      });
   }

   // Signs in the user to Google
   const signin = () => {
      chrome.runtime.sendMessage({ event: "signin" });
   }

   // Logs out the user from Google
   const logout = () => {
      chrome.runtime.sendMessage({ event: "logout" });
   }

   return (
      <Flex bg="red" p="1rem">
         {
            isAuthneticated ?
               <InlineBlock>
                  <Text>{userName}</Text>
                  <img src={image} />
                  <button onClick={logout}>Logout</button>
               </InlineBlock> :
               <button onClick={signin}>Sign in</button>
         }
      </Flex>
   );
}

export default GoogleSignIn;