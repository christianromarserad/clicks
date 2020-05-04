/*global chrome*/
import React, { useState, useEffect } from 'react';
import { Text, Flex } from '../StyledComponents'
import { withTheme } from 'styled-components';
import axios from 'axios';

function ClickCount({ theme }) {
    const [count, setCount] = useState(null);

    // Get the total clicks from the local storage
    const setCountFromLocal = () => {
        console.log('get count from local');
        chrome.storage.local.get(['user'], function (result) {
            let user = result.user;
            if (!user) {
                setCount(0);
            }
            else {
                setCount(user.totalCount);
            }
        });
    }

    // Get the total clicks from the server storage
    const setCountFromServer = (token) => {
        axios.get('http:localhost:5000/user', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((result) => {
            setCount(result.data.totalCount);
        });
    }

    useEffect(() => {
        // ComponentDidMount: loads click count from server or local
        chrome.identity.getAuthToken({ interactive: false }, function (token) {
            (token) ? setCountFromServer(token) : setCountFromLocal();
        });

        // ComponentDidMount: add event listener for window focus and then load click count from server or local
        window.addEventListener('focus', () => {
            console.log('fired focus');
            chrome.identity.getAuthToken({ interactive: false }, function (token) {
                console.log(token);
                (token) ? setCountFromServer(token) : setCountFromLocal();
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