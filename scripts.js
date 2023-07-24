// Array to store tweets and user information
const tweets = [];

// Function to add a new tweet to the page
function addTweet(username, tweetText, avatarLink) {
    const tweetList = document.getElementById('tweetSection');
    const newTweet = document.createElement('div');
    newTweet.className = 'tweet';
    newTweet.innerHTML = `
        <img src="${avatarLink}" alt="User Avatar">
        <div class="tweet-content">
            <span class="tweet-username">${username}</span>
            <p class="tweet-text">${tweetText}</p>
        </div>
    `;
    tweetList.appendChild(newTweet);

    // Save tweet to the JSON file
    tweets.push({ username, tweetText, avatarLink });
    saveTweetsToJSON();
}

// Function to handle the tweet submission
function handleTweetSubmit() {
    const tweetInput = document.getElementById('tweetInput');
    const usernameInput = document.getElementById('usernameInput');
    const avatarInput = document.getElementById('avatarInput');

    const tweetText = tweetInput.value.trim();
    const username = usernameInput.value.trim() || '@YourUsername'; // Default username if not provided
    const avatarLink = avatarInput.value.trim() || 'https://images-ext-2.discordapp.net/external/gMVWDYZ4xPvjz-W9BuPw4WldI90K4L9qycodZSRN2MM/https/pbs.twimg.com/profile_images/1683352940466061313/ROqzFNVh_400x400.jpg?width=500&height=500'; // Default avatar if not provided

    if (tweetText !== '') {
        addTweet(username, tweetText, avatarLink);
        tweets.push({ username, tweetText, avatarLink });
        tweetInput.value = '';
        usernameInput.value = '';
        avatarInput.value = '';
    }
}
function saveTweetsToJSON() {
    try {
        const jsonData = JSON.stringify(tweets, null, 2);
        fs.writeFileSync("tweets.json", jsonData);
        console.log("Tweets saved to tweets.json successfully.");
    } catch (error) {
        console.error("Error saving tweets:", error);
    }
}

// Event listener for the tweet submit button
const submitTweetButton = document.getElementById('submitTweetButton');
submitTweetButton.addEventListener('click', handleTweetSubmit);

// Update character counter while composing the tweet
const tweetInput = document.getElementById('tweetInput');
const charCounter = document.getElementById('charCounter');

tweetInput.addEventListener('input', function () {
    const remainingChars = 75 - this.value.length;
    charCounter.textContent = `${remainingChars} characters remaining`;
});

// Update tweets on initial load
function updateTweets() {
    const tweetList = document.getElementById('tweetSection');
    tweetList.innerHTML = '';

    for (const tweet of tweets) {
        addTweet(tweet.username, tweet.tweetText, tweet.avatarLink);
    }
}

// Call updateTweets() initially to display any existing tweets
updateTweets();

// ... Existing JavaScript code ...

// Function to toggle between dark and light mode
function toggleTheme() {
    const body = document.body;
    const header = document.querySelector('header');
    const tweetFormContainer = document.querySelector('.tweet-form-container');
    const tweetFeedContainer = document.querySelector('.tweet-feed-container');
    const tweets = document.querySelectorAll('.tweet');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        header.classList.remove('dark-mode');
        tweetFormContainer.classList.remove('dark-mode');
        tweetFeedContainer.classList.remove('dark-mode');
    } else {
        body.classList.add('dark-mode');
        header.classList.add('dark-mode');
        tweetFormContainer.classList.add('dark-mode');
        tweetFeedContainer.classList.add('dark-mode');
    }

    // Add new tweets in dark mode
    const tweetInput = document.getElementById('tweetInput');
    const usernameInput = document.getElementById('usernameInput');
    const avatarInput = document.getElementById('avatarInput');

    const tweetText = tweetInput.value.trim();
    const username = usernameInput.value.trim() || '@YourUsername';
    const avatarLink = avatarInput.value.trim() || 'https://images-ext-2.discordapp.net/external/gMVWDYZ4xPvjz-W9BuPw4WldI90K4L9qycodZSRN2MM/https/pbs.twimg.com/profile_images/1683352940466061313/ROqzFNVh_400x400.jpg?width=500&height=500';

    if (tweetText !== '') {
        addTweet(username, tweetText, avatarLink);
        tweets.forEach(tweet => tweet.classList.add('dark-mode')); // Add dark-mode class to new tweets
        tweets.push({ username, tweetText, avatarLink });
        tweetInput.value = '';
        usernameInput.value = '';
        avatarInput.value = '';
    }
}




