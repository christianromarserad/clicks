function getCurrentDate() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currentDate = new Date();
    let month = months[currentDate.getMonth()];
    let day = currentDate.getDate();
    let year = currentDate.getFullYear();

    return `${month} ${day} ${year}`;
}

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
    }
);