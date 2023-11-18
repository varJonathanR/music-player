const music = document.querySelector("#audio");
const seekBar = document.querySelector(".seek-bar");
const profileImg = document.querySelector(".profile");
const musicName = document.querySelector(".music-name");
const artist = document.querySelector(".artist");
const currentTime = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");
const btnPlay = document.querySelector(".btn-play");
const btnBackward = document.querySelector(".btn-backward");
const btnForward = document.querySelector(".btn-forward");

let currentTrack = 0;

// Play button icon change

btnPlay.addEventListener("click", () => {
    if (btnPlay.className.includes("pause")) {
        music.pause()
    }   else {
        music.play()
    };
    btnPlay.classList.toggle("pause");
});

// Time formater

const formatTime = time => {
    let min = Math.floor(time / 60);
    if (min < 10) min = `0${min}`;

    let sec = Math.floor(time % 60);
    if (sec < 10) sec = `0${sec}`

    return `${min}:${sec}`
};

// Music setup

const setMusic = i => {
    seekBar.value = 0;
    let song = data[i];
    currentTrack = i;
    music.src = song.path;

    musicName.innerHTML = song.name;
    artist.innerHTML = song.artist;
    profileImg.style.backgroundImage = `url("${song.profile}")`;
    currentTime.innerHTML = "00:00";

    music.addEventListener("loadedmetadata", () => {
        seekBar.max = music.duration;
        durationTime.innerHTML = formatTime(music.duration);
    });
};

setMusic(0);

// seek bar progress

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) btnForward.click();
}, 500);

seekBar.addEventListener("change", () => {
    music.currentTime = seekBar.value;
});

// Play music when backward or forward

const playMusic = () => {
    music.play();
    btnPlay.classList.remove("pause");
};

// Backward and Forward btn

btnBackward.addEventListener("click", () => {
    if (currentTrack <= 0) currentTrack = data.length - 1;
    else currentTrack--;
    setMusic(currentTrack);
    playMusic();
});

btnForward.addEventListener("click", () => {
    if (currentTrack >= data.length - 1) currentTrack = 0;
    else currentTrack++;
    setMusic(currentTrack);
    playMusic();
});


// Retur or Add 10s with click

/* 
btnBackward.addEventListener("click", () => {
    seekBar.value = music.currentTime - 10;
    music.currentTime = seekBar.value;
}); 

btnForward.addEventListener("click", () => {
    seekBar.value = music.currentTime + 10;
    music.currentTime = seekBar.value;
}); 
*/