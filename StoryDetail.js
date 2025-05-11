import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import "./StoryDetail.css"; 
import { storiesData } from './NovelStories';

const StoryDetails = () => {
  const { categoryName } = useParams();
  const audioLinks = storiesData[categoryName]?.audioLinks || [];

  // State to track the currently playing audio
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && currentAudio) {
      audioRef.current.load();
    }
  }, [currentAudio]);

  const handleAudioChange = (selectedAudio) => {
    setCurrentAudio(selectedAudio);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      audioRef.current.volume = e.target.value;
    }
  };

  const handleProgressChange = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
    }
  };

  return (
    <div className="audio-stories-container">
      <button onClick={() => window.history.back()} className="back-button">
        Back to Categories
      </button>

      <h1 className="audio-stories-title">
        {categoryName
          ? `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Audio Stories`
          : 'Audio Stories'}
      </h1>

      {audioLinks.length > 0 ? (
        <div className="audio-list">
          {audioLinks.map((audio, index) => (
            <div key={`${audio.title}-${index}`} className="audio-item">
              <h2 className="audio-title">{audio.title}</h2>
              <span className="audio-duration">{audio.duration}</span>

              {/* Custom Audio Player Controls */}
              <div className="audio-player-container">
                <button onClick={() => handleAudioChange(audio)} className="audio-player-btn">
                  {currentAudio?.url === audio.url && audioRef.current?.paused ? 'Play' : 'Pause'}
                </button>

                <label className="audio-player-label">Volume</label>
                <input
                  type="range"
                  className="audio-player-volume"
                  min="0"
                  max="1"
                  step="0.01"
                  onInput={handleVolumeChange}
                />

                <label className="audio-player-label">Progress</label>
                <input
                  type="range"
                  className="audio-player-progress"
                  min="0"
                  max={audioRef.current?.duration || 100}
                  step="0.01"
                  onInput={handleProgressChange}
                />
              </div>

              {/* HTML Audio Player */}
              {currentAudio?.url === audio.url && (
                <audio ref={audioRef} className="audio-player" controls>
                  <source src={audio.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-audios">
          No audio stories available for {categoryName || 'this category'}
        </p>
      )}
    </div>
  );
};

export default StoryDetails;
