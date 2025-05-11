import React, { useState, useRef, useEffect } from "react";
import "./NewReleases.css";

const newReleasesData = [
  {
    id: 1,
    poster: "/images/runitup1.jpg",
    name: "Run It up",
    artist: "Hanumankind",
    audioSrc: "/audio/runitup.mp3",
    language: "English",
  },
  {
    id: 2,
    poster: "/images/jaanetu.jpg",
    name: "Jaane Tu",
    artist: "Arijit Singh, A R Rahman",
    audioSrc: "/audio/jaanetu.mp3",
    language: "Hindi",
  },
  {
    id: 3,
    poster: "/images/uyiamma1.jpg",
    name: "Uyi Amma",
    artist: "Amit Trivedi, Amitabh Bhattacharya, and Madhubanti Bagchi",
    audioSrc: "/audio/uyiamma.mp3",
    language: "Hindi",
  },
  {
    id: 4,
    poster: "/images/anxiety.jpg",
    name: "ANXIETY",
    artist: "Doechi, Sleepy Hallow",
    audioSrc: "/audio/anxiety.mp3",
    language: "English",
  },
  {
    id: 5,
    poster: "/images/premavelluva.jpg",
    name: "Prema Velluva",
    artist: "Krishna Kanth, Mickey J. Meyer, Sid Sriram and Nutana Mohan",
    audioSrc: "/audio/premavelluva.mp3",
    language: "Telugu",
  },
  {
    id: 6,
    poster: "/images/y&h.jpg",
    name: "Younger & hotter than me",
    artist: "Selena Gomez",
    audioSrc: "/audio/y&h.mp3",
    language: "English",
  },
  {
    id: 7,
    poster: "/images/jeevinchaali.jpg",
    name: "Jeevinchaali",
    artist: "A R Rahman, Sireesha Bhagavatula",
    audioSrc: "/audio/jeevinchaali.mp3",
    language: "Telugu",
  },
  {
    id: 8,
    poster: "/images/laddu2.jpg",
    name: "Laddu gaani pelli",
    artist: "Bheems Ceciroleo, Mangli",
    audioSrc: "/audio/laddu.mp3",
    language: "Telugu",
  },
  {
    id: 9,
    poster: "/images/Loveyapa.jpg",
    name: "Loveyapa Ho Gaya",
    artist: "Nakash Aziz, Madhubanti Bagchi, White Noise Collectives",
    audioSrc: "/audio/loveyapaa.mp3",
    language: "Hindi",
  },
  {
    id: 10,
    poster: "/images/kiss.jpg",
    name: "Kiss",
    artist: "Sanare, Suresh Bobbili, Javed Ali, Amala Chebolu",
    audioSrc: "/audio/Kiss.mp3",
    language: "Telugu",
  },
  {
    id: 11,
    poster: "/images/smt_beautiful.jpg",
    name: "Something Beautiful",
    artist: "Miley Cyrus",
    audioSrc: "/audio/smt_beautiful.mp3",
    language: "English",
  },
];

const NewReleases = ({ selectedLanguage }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isNowPlayingVisible, setIsNowPlayingVisible] = useState(false);

  const audioRef = useRef(new Audio());
  const halfCdRef = useRef(null);

  const filteredSongs = selectedLanguage === 'All'
    ? newReleasesData
    : newReleasesData.filter(song => song.language === selectedLanguage);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);

      const progressBar = document.querySelector(".progress-bar");
      if (progressBar) {
        const progress = (audio.currentTime / (audio.duration || 1)) * 100;
        progressBar.style.background = `linear-gradient(to right, #76c7c0 ${progress}%, #ccc ${progress}%)`;
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (halfCdRef.current) {
      halfCdRef.current.classList.toggle("rotating", isPlaying);
    }
  }, [isPlaying]);

  const handlePlay = (song) => {
    const audio = audioRef.current;
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Playback error:", error);
        });
      }
    } else {
      audio.src = song.audioSrc;
      audio.play().then(() => {
        setCurrentSong(song);
        setIsPlaying(true);
        setIsNowPlayingVisible(true);
      }).catch(error => {
        console.error("Playback error:", error);
      });
    }
    if (song) {
      setIsNowPlayingVisible(true);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current && duration) {
      const seekTo = (e.target.value / 100) * duration;
      audioRef.current.currentTime = seekTo;
      setCurrentTime(seekTo);
    }
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handlePrev = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
    }
  };

  const handleClose = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentSong(null);
    setIsPlaying(false);
    setIsNowPlayingVisible(false);
  };

  return (
    <div className={`new-releases-page ${currentSong ? "playing" : ""}`}>
      <h2 className="section-title">New Releases</h2>
      <div className="releases-grid">
        {filteredSongs.map((song) => (
          <div className="release-card" key={song.id}>
            <img src={song.poster} alt={song.name} className="song-poster" />
            <button className="play-btn" onClick={() => handlePlay(song)}>
              {currentSong?.id === song.id && isPlaying ? "⏸" : "▶"}
            </button>
            <div className="song-info">
              <p className="song-name">{song.name}</p>
              <p className="song-artist">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>

      {isNowPlayingVisible && currentSong && (
        <div className="now-playing-overlay">
          <div className="now-playing-container">
            <button className="close-overlay-btn" onClick={handleClose}>x</button>
            <div className="left-panel">
              <div className="cd-wrapper" ref={halfCdRef}>
                <img src="/images/cd.jpeg" alt="CD" className="cd-image" />
                <img src={currentSong.poster} alt="Album Art" className="cd-album-art" />
              </div>
              <div className="poster-box">
                <img src={currentSong.poster} alt={currentSong.name} className="poster-image" />
              </div>
            </div>
            <div className="right-panel">
              <div className="song-info-header">
                <div className="now-playing-name">{currentSong.name}</div>
                <div className="now-playing-artist">{currentSong.artist}</div>
              </div>
              <div className="player-controls">
                <button className="control-btn" onClick={handlePrev}>⏪</button>
                <button className="control-btn play-pause-btn" onClick={() => handlePlay(currentSong)}>
                  {isPlaying ? "⏸" : "▶"}
                </button>
                <button className="control-btn" onClick={handleNext}>⏩</button>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-time">
                  <span className="current-time">{formatTime(currentTime)}</span>
                  <span className="duration">{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  className="progress-bar"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeek}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewReleases;