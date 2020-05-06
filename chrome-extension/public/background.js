// A function for getting the standard date format for my application
function getCurrentDate() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currentDate = new Date();
    let month = months[currentDate.getMonth()];
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();

    return `${month} ${day} ${year}`;
}

// An event that sets the initial local value after installing the extension
chrome.runtime.onInstalled.addListener(function () {
    let initialUserInfo = {
        totalCount: 0,
        dailyClicks: [{
            date: getCurrentDate(),
            count: 0
        }],
    }
    chrome.storage.local.set({ user: initialUserInfo }, function () {
        console.log(initialUserInfo);
    });
});


// An event that removes the saved access token during sign in event
chrome.identity.onSignInChanged.addListener(() => {
    chrome.identity.getAuthToken({ interactive: false }, function (token) {
        if (token) {
            console.log('fired, ', token);
            chrome.identity.removeCachedAuthToken({ token });
        }
    });
});

// Background script handles messages sent from related extensions (contentscripts, and new tab extension) Message types: click, signin
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.event === 'click') {
            chrome.identity.getAuthToken({ interactive: false }, function (token) {
                if (token) {
                    fetch('http://localhost:5000/user/incrementcount', {
                        method: 'PUT',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
                else {
                    chrome.storage.local.get(['user'], function (result) {
                        let user = result.user;
                        if (!user) {
                            user = {
                                totalCount: 1,
                                dailyClicks: [{
                                    date: getCurrentDate(),
                                    count: 1
                                }],
                            };
                        }
                        else {
                            user.totalCount++;
                            let index = user.dailyClicks.findIndex((dailyClick) => (dailyClick.date === getCurrentDate()));
                            if (index === -1) {
                                user.dailyClicks.push({
                                    date: getCurrentDate(),
                                    count: 1
                                });
                            }
                            else {
                                user.dailyClicks[index].count++;
                            }
                        }

                        chrome.storage.local.set({ user: user }, function () {
                            console.log(user);
                        });
                    });
                }
            });
        }
        else if (request.event === 'signin') {
            chrome.identity.getAuthToken({ interactive: true }, (token) => {
                if (token) {
                    // Redirect the new tab page
                    chrome.tabs.update({ url: 'chrome://newtab' });
                    console.log(request.localData);

                    // Check if user wants to overwrite the server data with the local data
                    if (request.localData) {
                        fetch('http:localhost:5000/user/overwriteclickdata', {
                            method: 'PUT',
                            headers: {
                                "Authorization": `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                totalCount: request.localData.totalCount,
                                dailyClicks: request.localData.dailyClicks
                            })
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }
            });
        }
        else if (request.event === 'logout') {
            chrome.tabs.update({ url: 'https://accounts.google.com/logout' });
        }
    }
);