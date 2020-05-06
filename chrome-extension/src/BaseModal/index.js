import React from 'react';
import styled from 'styled-components';
import { Flex } from '../StyledComponents';

const ModalLayer = styled(Flex)`
   left: 0;
   top: 0;
   position: fixed;
   background-color: rgb(0,0,0,0.2);
   width: 100vw;
   height: 100vh;
   z-index: 1;
   overflow: hidden;
`

function BaseModal({ isModalOpen, closeModal, children }) {

   const clickLayerHandler = (event) => {
      if (event.target.id !== 'modal-layer') {
         return;
      }
      closeModal();
   }

   return (
      isModalOpen &&
      <ModalLayer id="modal-layer" hcenter onClick={clickLayerHandler}>
         {children}
      </ModalLayer>
   )
}

export default BaseModal;