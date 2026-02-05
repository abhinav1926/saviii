const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const proposalView = document.getElementById('proposal-view');
const giftView = document.getElementById('gift-view');
const noMessage = document.getElementById('no-message');
const giftContentDisplay = document.getElementById('gift-content-display');
const heroGif = document.querySelector('.hero-gif');

const giftContents = {
    1: document.getElementById('gift-1-content'), // Song
    2: document.getElementById('gift-2-content'), // Flowers
    3: document.getElementById('gift-3-content')  // Message
};

const noTexts = [
    "Really? 😢",
    "Think again! 🤔",
    "Are you sure? 🥺",
    "Don't do this! 💔",
    "Last chance! ⚡",
    "Please? 🧸",
    "I'll be sad... 😿"
];

const sadGifs = [
    "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif",

];

let clickCount = 0;

// Move "No" button logic
function moveNoButton() {
    // We want the user to be able to click it, so we don't move on hover immediately
}

function handleNoClick() {
    clickCount++;

    // Change GIF to something sad
    const randomGifIndex = Math.floor(Math.random() * sadGifs.length);
    heroGif.src = sadGifs[randomGifIndex];

    if (clickCount === 1) {
        // 1st click: redirect to new position
        teleportButton();
        noBtn.innerText = "Really? 😢";
    } else if (clickCount === 2) {
        // 2nd click: give another text like "Emotional" AND redirect
        noBtn.innerText = "Think again! 🤔";
        teleportButton();
    } else if (clickCount >= 7) {
        // 7th click: Trigger Rejection Screen
        proposalView.classList.add('hidden');
        document.getElementById('reject-view').classList.remove('hidden');
        document.getElementById('reject-view').classList.add('active'); // Ensure flex is applied if needed, though CSS handles it
    } else {
        // Next clicks: redirect to another new location
        const randomIndex = Math.floor(Math.random() * noTexts.length);
        noBtn.innerText = noTexts[randomIndex];
        teleportButton();
    }

    // Increase Yes button size to encourage saying Yes
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.2}px`;
}

function teleportButton() {
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate max boundaries within the viewport
    const maxX = window.innerWidth - btnRect.width - 20;
    const maxY = window.innerHeight - btnRect.height - 20;

    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function handleYesClick() {
    // Confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
    });

    // Switch Views
    proposalView.classList.remove('active');
    proposalView.classList.add('hidden');
    giftView.classList.remove('hidden');
    giftView.classList.add('active');
}

function openGift(id) {
    // Hide all specific contents first
    Object.values(giftContents).forEach(el => el.classList.add('hidden'));

    // Show overlay
    giftContentDisplay.classList.remove('hidden');

    // Show specific content
    const content = giftContents[id];
    if (content) {
        content.classList.remove('hidden');

        // If it's the song (Gift 1), try playing it
        if (id === 1) {
            const audio = document.getElementById('love-song');
            audio.play().catch(e => console.log("Auto-play prevented:", e));
        }
    }
}

function closeGift() {
    giftContentDisplay.classList.add('hidden');

    // Stop audio if playing
    const audio = document.getElementById('love-song');
    audio.pause();
    audio.currentTime = 0;
}
