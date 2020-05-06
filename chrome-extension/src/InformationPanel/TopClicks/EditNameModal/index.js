/*global chrome*/
import React, { useState, useEffect } from 'react';
import BaseModal from '../../../BaseModal';
import { Flex, InlineBlock } from '../../../StyledComponents';
import axios from 'axios'
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Button = styled(InlineBlock)`
   cursor: pointer;
   padding: 0.6rem 1rem 0.6rem 1rem;
   margin: 5px;
   font-weight: bold;
   border-radius: 2px;
`

const UpdateButton = styled(Button)`
   background-color: #4285F4;
   color: white;
`

const CancelButton = styled(Button)`
   background-color: gray;
   color: white;
`

const Input = styled.input`
	outline: none;
	display: block;
	width: 100%;
	padding: 7px;
	border: none;
	border-bottom: 1px solid #ddd;
	background: transparent;
	margin-bottom: 10px;
	font: 16px Arial, Helvetica, sans-serif;
	height: 45px;
`

function EditNameModal({ isModalOpen, closeModal }) {
   const [name, setName] = useState("");

   useEffect(() => {
      if (isModalOpen) {
         chrome.identity.getAuthToken({ interactive: false }, function (token) {
            if (token) {
               axios.get('http://localhost:5000/user', {
                  headers: {
                     "Authorization": `Bearer ${token}`
                  }
               }).then((result) => {
                  setName(result.data.name);
               });
            }
         });
      }
   }, [isModalOpen]);

   const updateName = () => {
      chrome.identity.getAuthToken({ interactive: false }, function (token) {
         if (token) {
            axios.put('http://localhost:5000/user/updatename', { name }, {
               headers: {
                  "Authorization": `Bearer ${token}`
               }
            }).then((result) => {
               closeModal();
            });
         }
      });
   }

   return (
      <BaseModal isModalOpen={isModalOpen} closeModal={closeModal}>
         <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeInOut" }}>
            <Flex w="22rem" h="10rem" bg="white" m="2rem" p="1rem" vertical>
               <Input
                  value={name}
                  onChange={(event) => { setName(event.target.value); }}
                  placeholder="name" />
               <Flex flexGrow="1" />
               <Flex hend>
                  <CancelButton onClick={closeModal}>Cancel</CancelButton>
                  <UpdateButton onClick={updateName}>Update</UpdateButton>
               </Flex>
            </Flex>
         </motion.div>
      </BaseModal >
   );
}

export default EditNameModal;