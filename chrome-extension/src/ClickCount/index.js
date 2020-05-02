import React from 'react';
import { Text, Flex } from '../StyledComponents'
import { withTheme } from 'styled-components';

function ClickCount({ theme }) {
    return (
        <Flex p="2rem" vertical vcenter bg={theme.primaryColor}>
            <Text color="white" bold fs="5rem">0</Text>
            <Text color="white">Total Clicks</Text>
            <Text color="white" bold fs="2em" mt="1rem">Novice</Text>
        </Flex>
    );
}

export default withTheme(ClickCount);