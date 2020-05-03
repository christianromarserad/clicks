/*global chrome*/
import React, { useState, useEffect } from 'react';
import { Text, Flex } from '../StyledComponents'
import { withTheme } from 'styled-components';

function ClickCount({ theme }) {
    const [count, setCount] = useState(null);

    useEffect(() => {
        chrome.storage.local.get(['clickCount'], function (result) {
            if (result.clickCount === undefined) {
                setCount(0);
            }
            else {
                setCount(result.clickCount);
            }
        });

        window.addEventListener('focus', () => {
            chrome.storage.local.get(['clickCount'], function (result) {
                if (result.clickCount === undefined) {
                    setCount(0);
                }
                else {
                    setCount(result.clickCount);
                }
            });
        });
    }, [])

    return (
        <Flex p="2rem" vertical vcenter bg={theme.primaryColor}>
            <Text color="white" bold fs="5rem">{count}</Text>
            <Text color="white">Total Clicks</Text>
            <Text color="white" bold fs="2em" mt="1rem">Novice</Text>
        </Flex>
    );
}

export default withTheme(ClickCount);