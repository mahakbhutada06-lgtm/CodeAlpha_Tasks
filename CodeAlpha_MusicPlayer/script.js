const songs = [
  { title: "Shape of You", artist: "Ed Sheeran", src: "songs/song1.mp3" },
  { title: "Blinding Lights", artist: "The Weeknd", src: "songs/song2.mp3" },
  { title: "Levitating", artist: "Dua Lipa", src: "songs/song3.mp3" }
];

let index = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playBtn = document.getElementById("playBtn");

// Load Song
function loadSong(i) {
  const song = songs[i];
  audio.src = song.src;
  title.innerText = song.title;
  artist.innerText = song.artist;
}

// Play / Pause
function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

// Next
function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.innerText = "⏸";
}

// Previous
function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.innerText = "⏸";
}

// Update Progress
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }

  document.getElementById("current").innerText =
    formatTime(audio.currentTime);
  document.getElementById("duration").innerText =
    formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Autoplay next
audio.addEventListener("ended", nextSong);

// Time format
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Playlist
const playlist = document.getElementById("playlist");

songs.forEach((song, i) => {
  let li = document.createElement("li");
  li.innerText = `${song.title} - ${song.artist}`;
  li.onclick = () => {
    index = i;
    loadSong(index);
    audio.play();
    playBtn.innerText = "⏸";
  };
  playlist.appendChild(li);
});

// Initial load
loadSong(index);