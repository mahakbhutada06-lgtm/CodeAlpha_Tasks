const songs = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "songs/song1.mp3"
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "songs/song2.mp3"
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    src: "songs/song3.mp3"
  }
];

let index = 0;
let audio = document.getElementById("audio");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let progress = document.getElementById("progress");
let volume = document.getElementById("volume");

function loadSong(i) {
  let song = songs[i];
  audio.src = song.src;
  title.innerText = song.title;
  artist.innerText = song.artist;
}

function playPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(index);
  audio.play();
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  audio.play();
}

// Progress bar update
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;

  document.getElementById("current").innerText =
    formatTime(audio.currentTime);
  document.getElementById("duration").innerText =
    formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Autoplay next
audio.addEventListener("ended", nextSong);

// Format time
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Playlist
let playlist = document.getElementById("playlist");
songs.forEach((song, i) => {
  let li = document.createElement("li");
  li.innerText = song.title;
  li.onclick = () => {
    index = i;
    loadSong(index);
    audio.play();
  };
  playlist.appendChild(li);
});

// Load first song
loadSong(index);