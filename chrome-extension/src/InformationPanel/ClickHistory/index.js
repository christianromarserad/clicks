/*global chrome*/
import React, { useState, useEffect } from 'react';
import { Flex, Text } from '../../StyledComponents';
import { ResponsiveLine } from '@nivo/line';
import axios from '../../Configurations/clickServerAxios';
import moment from 'moment';
import { withTheme } from 'styled-components';

function ClickHistory({ theme }) {
    const [clickData, setClickData] = useState([]);

    // This will generate the graph data structure that will be used for the graph
    const structureGraphData = (dailyClicks) => {
        // Setting up the data for the graph
        let clickData = {
            id: "click count",
            color: "hsl(166, 70%, 50%)",
            data: []
        };

        let daysInCurrentMonth = moment().daysInMonth();

        // Setting up the data points for the graph (x axis: date, y axis: click count)
        for (let day = 1; day <= daysInCurrentMonth; day++) {
            // Finding the user's dailyClick record in loop's current day iteration
            let dailyClickIndex = dailyClicks.findIndex((dailyClick) => {
                let dailyClickDay = moment(dailyClick.date, 'MMMM D YYYY').format('D');
                return dailyClickDay == day;
            });

            if (dailyClickIndex === -1) {
                // If no dailyClick record exist, then set the day count to 0
                clickData.data.push({
                    x: day,
                    y: (day <= moment().format('D')) ? 0 : null
                })
            }
            else {
                clickData.data.push({
                    x: moment(dailyClicks[dailyClickIndex].date, 'MMMM D YYYY').format('D'),
                    y: dailyClicks[dailyClickIndex].count
                })
            }
        }

        return [clickData];
    }

    // This will get the user's dailyClicks record from the local or server storage and then set the data graph
    const setGraphData = () => {
        chrome.identity.getAuthToken({ interactive: false }, function (token) {
            if (token) {
                axios.get('user', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }).then((result) => {
                    setClickData(structureGraphData(result.data.dailyClicks));
                });
            }
            else {
                chrome.storage.local.get(['user'], function (result) {
                    let user = result.user;
                    if (user) {

                        //Deleting previous month dailyClicks to save storage space
                        let currentMonthDailyClicks = user.dailyClicks.filter((dailyClick) => {
                            if (moment(dailyClick.date, 'MMMM D YYYY').format('MMMM') === moment().format('MMMM')) {
                                return dailyClick;
                            }
                        });

                        user.dailyClicks = currentMonthDailyClicks;

                        chrome.storage.local.set({ user: user }, function () {
                            setClickData(structureGraphData(user.dailyClicks));
                        });
                    }
                });
            }
        });
    }


    useEffect(() => {
        // ComponentDidMount: load graph data from the server or local storage
        setGraphData();

        // ComponentDidMount: add event listener for window focus and then load graph data from the server or local storage
        window.addEventListener('focus', () => {
            setGraphData();
        });
    }, []);

    return (
        <>
            <Text fs="1.1rem" m="20px 0px 0px 50px">{moment().format('MMMM')}</Text>
            <Flex vertical w="100%" h="450px" hcenter>
                <ResponsiveLine
                    data={clickData}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'day',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'click count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={theme.secondaryColor}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </Flex>
        </>
    );
}

export default withTheme(ClickHistory);