import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ArtistSongs.css";

// Mock data (replace with your actual data)
const artistSongsMap = {
  "Arijit Singh": [
    
      { title: "Kesariya", 
        url: "https://pagalfree.com/musics/128-Kesariya%20-%20Brahmastra%20128%20Kbps.mp3",
       img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202207/Kesariya-Brahmastra-Ranbir-Kap_1200x768.jpeg?VersionId=7XIxpyAi34HEBZv2KZlNcFe7cgbelr3e&size=690:388"
    },
      { title: "Aashiqui aa gayi", url: "https://raag.fm/files/mp3/128/Hindi/13032/Channa%20Mereya%20-%20(Raag.Fm).mp3",
        img: "https://english.cdn.zeenews.com/sites/default/files/2021/12/01/991968-prabhas-pooja-hegde.jpg"
       },
      { title: "Tum Hi Ho", url: "https://pagalfree.com/musics/128-Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps.mp3" ,
        img: "https://lh4.googleusercontent.com/proxy/nIFZl-km7NtGQuzx7FkACLGVCVJ_135vP_LIltgHErLd03zWCyx8Tn7bL1tuVh9rzsqQCyJxGRcT7qopzx8Ueic00n4aikQrcDt9r2SByOOwaTe2zFdCTDm-qYbum0CA"
      },
      { title: "Pasoori Nu", url: "https://pagalfree.com/musics/128-Pasoori%20Nu%20-%20Satyaprem%20Ki%20Katha%20128%20Kbps.mp3",
        img: "https://th-i.thgim.com/public/entertainment/movies/jfajvn/article67010849.ece/alternates/FREE_1200/Kartik%20Aryan%20and%20Kiara%20Advani%20in%20Pasoori%20Nu.jpg"
       },
      { title: "Anuvanuvu", url: "https://pagalfree.com/musics/128-Pasoori%20Nu%20-%20Satyaprem%20Ki%20Katha%20128%20Kbps.mp3",
        img: "https://images.hindustantimes.com/telugu/img/2024/05/20/960x540/om_bheem_bush_1716199591821_1716199596310.jpeg"
       },
      { title: "Phir Bhi Tumko Chahunga", url: "https://pagalfree.com/musics/128-Pasoori%20Nu%20-%20Satyaprem%20Ki%20Katha%20128%20Kbps.mp3",
        img: "https://www.radioandmusic.com/sites/www.radioandmusic.com/files/images/entertainment/2017/04/17/HG_Still.jpg"
       },
      { title: "Channa Mereya", url: "https://pagalourld.in/player/628",
        img: "https://img.mensxp.com/media/content/2017/Mar/header-1490511964.jpg"
       },
      { title: "Ae Dil Hain Mushkil", url: "https://raag.fm/files/mp3/128/Hindi/13032/Channa%20Mereya%20-%20(Raag.Fm).mp3",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Pezxu0m5AoaFt0DULRKSQs_r_W2ovat8Bw&s"
       },
      { title: "Zaalima", url: "https://raag.fm/files/mp3/128/Hindi/13032/Channa%20Mereya%20-%20(Raag.Fm).mp3",
        img: "https://www.india.com/wp-content/uploads/2017/01/ZZaalima.jpg"
       },
  ],
  "Shreya Ghoshal": [
    
      { title: "Teri Ore", url: "https://raag.fm/files/mp3/128/Hindi/1048963/Teri%20Ore%20-%20(Raag.Fm).mp3",
        img: "https://static.toiimg.com/thumb/msid-94134055,width-400,resizemode-4/94134055.jpg"
       },
      { title: "Chali Chaliga", url: "https://pagalfree.com/musics/128-Sunn%20Raha%20Hai%20(Female)%20-%20Aashiqui%202%20128%20Kbps.mp3",
        img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjdygV7hf8vU3l-DWjAm67KkiALQFGM5knMJfsd2R-FdaWwFtK_gzxaqglkRZFKa8RT-bxaPteyYUfcpYYPZvGB47FnTYPUWOoxzLbw8D06fW3cpu5MB3jMlDSxF_d7fZZ4CT-mJuiP8WM0/s1600/Prabhas-Kajal-Agarwal-Tapsee-starring-Mr.perfect-Gallery-5.jpg"
       },
      { title: "Sun Raha Hai", url: "https://pagalfree.com/musics/128-Sunn%20Raha%20Hai%20(Female)%20-%20Aashiqui%202%20128%20Kbps.mp3",
        img: "https://www.lyricsstop.com/wp-content/uploads/2020/06/Sun-Raha-Hai-Na-Tu-Lyrics-1.jpg"
       },
      { title: "Tu Chale", url: "https://pagalfree.com/musics/128-Sunn%20Raha%20Hai%20(Female)%20-%20Aashiqui%202%20128%20Kbps.mp3",
        img: "https://i.ytimg.com/vi/H_vtV6Wmwg0/maxresdefault.jpg"
       },
      { title: "Saathiya", url: "https://pagalfree.com/musics/128-Sunn%20Raha%20Hai%20(Female)%20-%20Aashiqui%202%20128%20Kbps.mp3",
        img: "https://msworldsite.com/wp-content/uploads/2015/10/Saathiya-Pagle-Se-Dil-Ne-Ye-Kya-Kiya-Guitar-Tabs-Lead-Singham.jpg"
       },
      { title: "Bahara", url: "https://pagalfree.com/musics/128-Sunn%20Raha%20Hai%20(Female)%20-%20Aashiqui%202%20128%20Kbps.mp3" ,
        img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiuMP-VZIVoUnunR_GW439US0cto2IQMfb_Y-5bxV2CwIGv2aY95ykg7hZDMdl_d_7t8qRnD4fvvKeqW2cp52hUNOoqWbgGjMOU0mXmfPzf9F1o_h2Jdug-3l8zcCSI1yLIomHFQcO57w/s1600/wp-12mrperfect800.jpg"
      },
      { title: "Dil Dooba", url: "https://pagalfree.com/musics/128-Sunn%20Raha%20Hai%20(Female)%20-%20Aashiqui%202%20128%20Kbps.mp3",
        img: "https://i.ytimg.com/vi/uerieDtKnFg/maxresdefault.jpg"
       },
      { title: "Pillagaali", url: "https://pagalfree.com/musics/128-Sunn%20Raha%20Hai%20(Female)%20-%20Aashiqui%202%20128%20Kbps.mp3",
        img: "https://i.ytimg.com/vi/RwzZlob-P20/maxresdefault.jpg"
       },
      { title: "Munbe Vaa", url: "https://pagalfree.com/musics/128-Sunn%20Raha%20Hai%20(Female)%20-%20Aashiqui%202%20128%20Kbps.mp3",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDzidb68rXKg5k6P7TRDVuztOpJXhe2AC-KA&s"
       },
  ],
  "Armaan Malik": [
    {
      title: "Butta Bomma",
      url: "",
      img: "https://i.imgur.com/WlYyV9v.jpg",
    },
    {
      title: "Bol Do Na Zara",
      url: "https://pagalfree.com/musics/128-Bol%20Do%20Na%20Zara%20-%20Azhar%20128%20Kbps.mp3",
      img: "https://i.imgur.com/WlYyV9v.jpg",
    },
  ],
};

const ArtistSongs = () => {
  const { artistName } = useParams();
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Get songs for the current artist
  const songs = artistSongsMap[artistName] || [];

  // Effect to handle audio events and cleanup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const updateDuration = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handleError = () => {
      setIsPlaying(false);
      console.error("Error playing audio");
    };

    // Add event listeners
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Cleanup function
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentSong]);

  // Handle play/pause
  const handlePlayPause = (song) => {
    if (!song.url) return; // Don't play if no URL
    
    if (currentSong?.title === song.title) {
      // Toggle play/pause for current song
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      // Play new song
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  // Skip forward 10 seconds
  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        audioRef.current.duration
      );
    }
  };

  // Go back 10 seconds
  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };

// Format time from seconds to MM:SS
const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
  return (
    <div className="artist-songs-page">
      <h2>{artistName}'s Songs</h2>
      
      <div className="songs-list">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <div 
              key={`${song.title}-${index}`} 
              className={`song-card ${currentSong?.title === song.title ? 'active' : ''}`}
            >
              {/* Song Image and Info */}
              <div className="song-main">
                <img 
                  src={song.img} 
                  alt={song.title} 
                  className="song-poster" 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50'; // Fallback if image fails
                  }}
                />
                <div className="song-info">
                  <h3 className="song-title">{song.title}</h3>
                  {/* Progress bar - only shows for currently playing song */}
                  {currentSong?.title === song.title && (
                    <div className="progress-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Song Controls */}
              <div className="song-controls">
                {/* Time display - only shows for currently playing song */}
                <div className="time-display">
                  {currentSong?.title === song.title && (
                    <>
                      <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                      <span>/</span>
                      <span>{formatTime(duration)}</span>
                    </>
                  )}
                </div>
                
                {/* Control buttons */}
                <div className="custom-controls">
                  <button 
                    onClick={() => handleBackward()} 
                    className="control-btn"
                    disabled={currentSong?.title !== song.title || !song.url}
                    aria-label="Backward 10 seconds"
                  >
                    <i className="backward-icon">⏪</i>
                  </button>
                  
                  <button 
                    onClick={() => handlePlayPause(song)} 
                    className="control-btn play-pause-btn"
                    disabled={!song.url}
                    aria-label={currentSong?.title === song.title && isPlaying ? 'Pause' : 'Play'}
                  >
                    <i className="play-pause-icon">
                      {currentSong?.title === song.title && isPlaying ? '⏸' : '⏵'}
                    </i>
                  </button>
                  
                  <button 
                    onClick={() => handleForward()} 
                    className="control-btn"
                    disabled={currentSong?.title !== song.title || !song.url}
                    aria-label="Forward 10 seconds"
                  >
                    <i className="forward-icon">⏩</i>
                  </button>
                </div>
              </div>

              {/* Hidden audio element for the currently playing song */}
              {currentSong?.title === song.title && (
                <audio
                  ref={audioRef}
                  src={song.url}
                  autoPlay={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              )}
            </div>
          ))
        ) : (
          <div className="no-songs">No songs available for this artist</div>
        )}
      </div>
    </div>
  );
};

export default ArtistSongs;