/*global chrome*/
import React, { useState, useEffect } from 'react';
import { Flex, InlineBlock, Text } from '../../StyledComponents';
import axios from 'axios';


function TopClicks() {
    const [topUsers, setTopUsers] = useState([]);
    const [rank, setRank] = useState(null);

    const getTopUsers = () => {
        axios.get('http:localhost:5000/user/topusers/10').then((results) => {
            setTopUsers(results.data);
        });
    }

    const getRank = () => {
        chrome.identity.getAuthToken({ interactive: false }, function (token) {
            if (token) {
                axios.get('http:localhost:5000/user/rank', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then((results) => {
                    setRank(results.data);
                });
            }
        });
    }

    useEffect(() => {
        getTopUsers();
        getRank();

        window.addEventListener('focus', () => {
            getTopUsers();
            getRank();
        })
    }, []);

    return (
        <Flex>
            <Flex vertical w="100%" p="1rem">
                {
                    rank ?
                        <Flex m="20px 0px 20px 0px" h="1.1rem">
                            <Flex flexGrow="1"><Text fs="1.1rem">{rank.name}</Text></Flex>
                            <Flex><Text fs="1.1rem">Rank: {rank.rank}</Text></Flex>
                        </Flex> :
                        <Flex m="20px 0px 20px 0px" h="1.1rem">
                            <Text fs="1.1rem">Sign in to see your rank</Text>
                        </Flex>
                }

                {
                    topUsers.length === 0 ?
                        <Text>No Top Users</Text> :
                        topUsers.map((user, index) => (
                            <Flex
                                bg="white"
                                mt="8px"
                                p="8px">
                                <Flex><Text bold w="2rem">{index + 1}</Text></Flex>
                                <Flex><Text w="10rem">{user.name}</Text></Flex>
                                <Flex flexGrow="1" hcenter><Text>{user.totalCount}</Text></Flex>
                            </Flex>
                        ))
                }
            </Flex>
        </Flex>
    );
}

export default TopClicks;