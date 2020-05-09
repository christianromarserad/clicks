import React from 'react';
import styled from 'styled-components';
import { Flex, Text, InlineBlock, PrimaryButton, SecondaryButton } from '../../StyledComponents';
import { motion } from 'framer-motion';
import BaseModal from '../../BaseModal';

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
                  <PrimaryButton onClick={() => { signin(false); }}>No</PrimaryButton>
                  <SecondaryButton onClick={() => { signin(true); }}>Yes</SecondaryButton>
               </Flex>
            </Flex>
         </motion.div>
      </BaseModal>
   );
}

export default ConfirmationModal;