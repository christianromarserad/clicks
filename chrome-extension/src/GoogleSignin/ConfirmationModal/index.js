import React from 'react';
import styled from 'styled-components';
import { Flex, Text, InlineBlock } from '../../StyledComponents';
import { motion } from 'framer-motion';
import BaseModal from '../../BaseModal';


const Button = styled(InlineBlock)`
   cursor: pointer;
   padding: 0.6rem 1rem 0.6rem 1rem;
   margin: 5px;
   font-weight: bold;
   border-radius: 2px;
`

const YesButton = styled(Button)`
   background-color: #4285F4;
   color: white;
`

const NoButton = styled(Button)`
   background-color: gray;
   color: white;
`

function ConfirmationModal({ signin, isModalOpen, closeModal }) {
   return (
      <BaseModal isModalOpen={isModalOpen} closeModal={closeModal}>
         <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeInOut" }}>
            <Flex w="22rem" h="10rem" bg="white" m="2rem" p="1rem" vertical>
               <Flex flexGrow="1">
                  <Text fs="1.1rem">
                     Do you want to overwrite the server with your local data?
                  </Text>
               </Flex>
               <Flex hend>
                  <NoButton onClick={() => { signin(false); }}>No</NoButton>
                  <YesButton onClick={() => { signin(true); }}>Yes</YesButton>
               </Flex>
            </Flex>
         </motion.div>
      </BaseModal>
   );
}

export default ConfirmationModal;