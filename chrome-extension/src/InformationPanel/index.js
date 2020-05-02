import React, { useState } from 'react';
import { Flex, InlineBlock, Text } from '../StyledComponents';
import styled, { withTheme } from 'styled-components';
import TopClicks from './TopClicks';
import ClickHistory from './ClickHistory';


const Button = styled(Text)`
   cursor: pointer;
   color: white;
   text-align: center;
   padding: 1rem;
   width: 7rem;
   font-weight: bold;
`
const SelectedButton = styled(Button)`
   cursor: pointer;
	border-bottom: 5px solid ${props => props.theme.secondaryColor};
`

function InformationPanel({ theme }) {
   const [page, setPage] = useState('top-clicks');

   return (
      <Flex vertical vcenter mt="20px">
         <InlineBlock w="1200px" h="450px" br="2px" bs="2px 2px 30px -15px grey" bg="white">
            <Flex hleft mb="1rem" bs="1px 1px 11px -9px" bg={theme.primaryColor}>
               {
                  page === 'top-clicks' ?
                     <SelectedButton
                        onClick={() => setPage('top-clicks')}>
                        Top Clicks
                     </SelectedButton> :
                     <Button
                        onClick={() => setPage('top-clicks')}>
                        Top Clicks
                     </Button>
               }

               {
                  page === 'click-history' ?
                     <SelectedButton
                        onClick={() => setPage('click-history')}>
                        Graph
                     </SelectedButton> :
                     <Button
                        onClick={() => setPage('click-history')}>
                        Graph
                     </Button>
               }

            </Flex>

            {
               page === 'top-clicks' ?
                  <TopClicks /> : <ClickHistory />
            }
         </InlineBlock>
      </Flex>
   );
}

export default withTheme(InformationPanel);