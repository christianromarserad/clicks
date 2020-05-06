/*global chrome*/
import React, { useEffect, useState } from 'react';
import { Flex, InlineBlock, Text } from '../StyledComponents';
import axios from 'axios';
import styled from 'styled-components';
import ConfirmationModal from './ConfirmationModal';

const Image = styled.img`
   height: 2rem;
   width: 2rem;
   margin-right: 15px;
   border-radius: 50%;
`

const Button = styled(Text)`
   cursor: pointer;
   padding: 0.5rem;
   font-weight: bold;
   color: white;
   background-color: #4285F4;
   border-radius: 2px;
   margin: 2px;
`

const Link = styled(Text)`
   margin-right: 15px;
   cursor: pointer;
   :hover {
      text-decoration: underline;
   }
`

function GoogleSignIn() {
   const [isAuthneticated, setIsAuthenticated] = useState(false);
   const [image, setImage] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

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

   const redirectToGmail = () => {
      window.location.href = 'https://mail.google.com/';
   }

   // Sets the user information(username, and picture) if authenticated
   const setUserInfo = () => {
      chrome.identity.getAuthToken({ interactive: false }, function (token) {
         if (token) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`).then((result) => {
               setImage(result.data.picture);
            });
         }
      });
   }

   // Signs in the user to Google
   const signin = (overwriteServer) => {
      if (overwriteServer) {
         chrome.storage.local.get(['user'], function (result) {
            let user = result.user;
            chrome.runtime.sendMessage({
               event: "signin",
               localData: user
            });
         });
      }
      else {
         chrome.runtime.sendMessage({ event: "signin" });
      }
   }

   // Logs out the user from Google
   const logout = () => {
      chrome.runtime.sendMessage({ event: "logout" });
   }

   return (
      <>
         <ConfirmationModal
            isModalOpen={isModalOpen}
            closeModal={setIsModalOpen.bind(this, false)}
            signin={signin} />

         <Flex p="1rem" hend>
            {
               isAuthneticated ?
                  <Flex vcenter>
                     <Link onClick={redirectToGmail}>Gmail</Link>
                     <Image src={image} />
                     <Button onClick={logout}>Logout</Button>
                  </Flex> :
                  <Button onClick={() => { isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true) }}>Sign in</Button>
            }
         </Flex>
      </>
   );
}

export default GoogleSignIn;