import React, { useState } from 'react';
import { Flex, InlineBlock, Text } from '../StyledComponents';
import styled, { withTheme } from 'styled-components';
import TopClicks from './TopClicks';
import ClickHistory from './ClickHistory';
import { motion, useAnimation } from 'framer-motion';

const NavBar = styled(Flex)`
   background-color: white;
   border-bottom: 3px solid #D3D3D3;
   position: relative;
`

const NavButton = styled(Text)`
   color: #989898;
   cursor: pointer;
   text-align: center;
   padding: 1rem;
   width: 7rem;
   font-weight: bold;
`
const SelectedNavButton = styled(NavButton)`
   color: black;
`

const NavOverlay = styled(motion.div)`
   box-sizing: content-box;
   cursor: pointer;
   width: 7rem;
   height: 100%;
   position: absolute;
   border-bottom: 3px solid ${props => props.theme.secondaryColor};
`

function InformationPanel({ theme }) {
   const navOverlay = useAnimation();
   const [page, setPage] = useState('top-clicks');

   const navButtonHandler = (pageName) => {
      setPage(pageName);

      if (pageName === 'click-history') {
         navOverlay.start({
            x: '7rem',
            transition: {
               duration: 0.3,
               ease: "easeOut"
            }
         })
      }
      else {
         navOverlay.start({
            x: '0rem',
            transition: {
               duration: 0.3,
               ease: "easeOut"
            }
         })
      }
   }

   return (
      <Flex vertical vcenter>
         <InlineBlock p="1rem" w="100%">
            <NavBar hleft bg="white">
               <NavOverlay animate={navOverlay} />
               {
                  page === 'top-clicks' ?
                     <SelectedNavButton
                        onClick={() => navButtonHandler('top-clicks')}>
                        Top Clicks
                     </SelectedNavButton> :
                     <NavButton
                        onClick={() => navButtonHandler('top-clicks')}>
                        Top Clicks
                     </NavButton>
               }

               {
                  page === 'click-history' ?
                     <SelectedNavButton
                        onClick={() => navButtonHandler('click-history')}>
                        Graph
                     </SelectedNavButton> :
                     <NavButton
                        onClick={() => navButtonHandler('click-history')}>
                        Graph
                     </NavButton>
               }

            </NavBar>

            {
               page === 'top-clicks' ?
                  <TopClicks /> : <ClickHistory />
            }
         </InlineBlock>
      </Flex>
   );
}

export default withTheme(InformationPanel);