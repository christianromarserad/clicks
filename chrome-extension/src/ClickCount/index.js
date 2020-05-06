/*global chrome*/
import React, { useState, useEffect } from 'react';
import { Text, Flex } from '../StyledComponents'
import { withTheme } from 'styled-components';
import axios from 'axios';
import moment from 'moment';

function ClickCount({ theme }) {
    const [totalCount, setTotalCount] = useState(0);
    const [totalCountToday, setTotalCountToday] = useState(0);

    // Get the total clicks from the local storage
    const setCountFromLocal = () => {
        console.log('get count from local');
        chrome.storage.local.get(['user'], function (result) {
            let user = result.user;
            if (!user) {
                setTotalCount(0);
            }
            else {
                setTotalCount(user.totalCount);
                let dailyClick = user.dailyClicks.find((dailyClick) => (dailyClick.date === moment().format('MMMM D YYYY')));
                (dailyClick) ? setTotalCountToday(dailyClick.count) : setTotalCountToday(0);
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
            let user = result.data
            setTotalCount(user.totalCount);
            let dailyClick = user.dailyClicks.find((dailyClick) => (dailyClick.date === moment().format('MMMM D YYYY')));
            (dailyClick) ? setTotalCountToday(dailyClick.count) : setTotalCountToday(0);
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
        <Flex p="1rem">
            <Flex bg="white" vertical vcenter flexGrow="1" mr="0.5rem" p="1rem">
                <Text bold fs="1.3rem">{totalCount}</Text>
                <Text fs="0.6rem">Total Clicks</Text>
            </Flex>
            <Flex bg="white" vertical vcenter flexGrow="1" ml="0.5rem" p="1rem">
                <Text bold fs="1.3rem">{totalCountToday}</Text>
                <Text fs="0.6rem">Today's Total Clicks</Text>
            </Flex>
        </Flex>
    );
}

export default withTheme(ClickCount);