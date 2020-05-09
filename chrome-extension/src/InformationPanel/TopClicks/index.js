/*global chrome*/
import React, { useState, useEffect } from 'react';
import { Flex, InlineBlock, Text } from '../../StyledComponents';
import axios from '../../Configurations/clickServerAxios';
import styled from 'styled-components';
import EditNameModalName from './EditNameModal';

const SvgButton = styled(InlineBlock)`
    height: 0.8rem;
    width: 0.8rem;
    margin-left: 10px;
    cursor: pointer;
    fill: #989898;
    :hover {
        fill: black;
    }
`

function TopClicks() {
    const [topUsers, setTopUsers] = useState([]);
    const [rank, setRank] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const getTopUsers = () => {
        axios.get('user/topusers/10').then((results) => {
            setTopUsers(results.data);
        });
    }

    const getRank = () => {
        chrome.identity.getAuthToken({ interactive: false }, function (token) {
            if (token) {
                axios.get('user/rank', {
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

    useEffect(() => {
        if (!isEditModalOpen) {
            getRank();
            getTopUsers();
        }
    }, [isEditModalOpen]);

    return (
        <>
            <Flex>
                <Flex vertical w="100%" p="1rem">
                    {
                        rank ?
                            <Flex m="20px 0px 20px 0px" h="1.1rem">
                                <EditNameModalName
                                    isModalOpen={isEditModalOpen}
                                    closeModal={setIsEditModalOpen.bind(this, false)}
                                    userName={rank.name} />
                                <Flex flexGrow="1" vcenter>
                                    <Text fs="1.1rem">{rank.name}</Text>
                                    <SvgButton onClick={() => { setIsEditModalOpen(true) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" /></svg>
                                    </SvgButton>
                                </Flex>
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
        </>
    );
}

export default TopClicks;