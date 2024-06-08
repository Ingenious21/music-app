const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volUpBtn = document.getElementById('vol-up');
const volDownBtn = document.getElementById('vol-down');
const speedSelect = document.getElementById('speed');
const currentSongName = document.getElementById('currentSongName');
const currentTimeElem = document.getElementById('currentTime');
const totalDurationElem = document.getElementById('totalDuration');
const playlist = document.getElementById('playlist');

const songs = [
    {
        name: 'Chris Brown - Bruce Lee',
        url: '/y2mate.com - Chris Brown Bruce Lee Lyric Video.mp3'
    },
    {
        name: 'Chris Brown - Delusional',
        url: 'y2mate.com - Chris Brown Delusional Visualizer.mp3'
    },
    {
        name: 'Chris Brown - Feelings Don\'t lie',
        url: 'y2mate.com - Chris Brown Feelings Dont Lie Visualizer.mp3'
    },
    {
        name: 'Chris Brown - Freak - ft Lil Wayne, Joyner Lucas & Tee Grizzley',
        url: 'y2mate.com - Chris Brown Freak Visualizer ft Lil Wayne Joyner Lucas Tee Grizzley.mp3'
    },
    {
        name: 'Chris Brown - Hmm - ft Davido',
        url: 'y2mate.com - Chris Brown Hmmm Visualizer ft Davido.mp3'
    },
    {
        name: 'Chris Brown - No One Else',
        url: 'y2mate.com - Chris Brown No One Else Visualizer ft Fridayy.mp3'
    },
    {
        name: 'Chris Brown - Press Me',
        url: 'y2mate.com - Chris Brown Press Me Visualizer.mp3'
    },
    {
        name: 'Chris Brown - Stutter',
        url: 'y2mate.com - Chris Brown Stutter Visualizer.mp3'
    },
    {
        name: 'Chris Brown - Angel Numbers/Ten Toes',
        url: 'y2mate.com - Chris Brown Angel Numbers Ten Toes Visualizer.mp3'
    },
    {
        name: 'Chris Brown - Weakest Link',
        url: 'y2mate.com - Weakest Link.mp3'
    },
    {
        name: 'Chris Brown - Closer',
        url: '/workspaces/music-app/y2mate.com - Chris Brown Closer Visualizer_720pFH.mp4'
    }
];

let currentSongIndex = 0;

// Load songs into the playlist
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = song.name;
    li.addEventListener('click', () => loadSong(index));
    playlist.appendChild(li);
});

function loadSong(index) {
    currentSongIndex = index;
    audio.src = songs[index].url;
    currentSongName.textContent = songs[index].name;
    playSong();
}

function playSong() {
    audio.play();
    playBtn.textContent = 'Pause';
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = 'Play';
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

volUpBtn.addEventListener('click', () => {
    if (audio.volume < 1) {
        audio.volume = Math.min(1, audio.volume + 0.1);
    }
});

volDownBtn.addEventListener('click', () => {
    if (audio.volume > 0) {
        audio.volume = Math.max(0, audio.volume - 0.1);
    }
});

speedSelect.addEventListener('change', () => {
    audio.playbackRate = speedSelect.value;
});

audio.addEventListener('loadedmetadata', () => {
    totalDurationElem.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    currentTimeElem.textContent = formatTime(audio.currentTime);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load the first song
loadSong(currentSongIndex);
