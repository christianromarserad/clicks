import React, { useState } from 'react';
import { Button, Flex, InlineBlock } from '../StyledComponents';
import styled, { withTheme } from 'styled-components';
import TopClicks from './TopClicks';
import ClickHistory from './ClickHistory';

const SelectedButton = styled(Button)`
	border-bottom: 5px solid ${props => props.theme.secondaryColor};
`

function InformationPanel({ theme }) {
   const [page, setPage] = useState('top-clicks');

   return (
      <Flex vertical vcenter mt="20px">
         <InlineBlock w="1200px" h="450px" br="2px" bs="2px 2px 30px -15px grey" bg="white">
            <Flex hleft mb="1rem" bs="1px 1px 11px -9px" bg={theme.primaryColor}>
               <SelectedButton
                  color="white"
                  bold p="1rem"
                  w="7rem"
                  textCenter
                  onClick={() => setPage('top-clicks')}>
                  Top Clicks
						</SelectedButton>
               <Button
                  color="white"
                  bold
                  p="1rem"
                  w="7rem"
                  textCenter
                  onClick={() => setPage('click-history')}>
                  Graph
						</Button>
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