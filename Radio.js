import React, { useState, useRef, useEffect } from "react";
import "./Radio.css";

const radioStations = {
    international: {
        name: "International – Radio Paradise",
        url: "https://stream.radioparadise.com/mp3-192",
    },
    indian: {
        name: "Indian – Radio City Telugu",
        url: "http://51.222.87.239:7200/1",
    },
    retro: {
        name: "Retro Classics – 80s Hits",
        url: "http://stream.laut.fm/retro",
    },
};


const Radio = () => {
    const [currentStation, setCurrentStation] = useState("international");
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Handle play/pause logic
    const handlePlay = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play().catch((err) => console.error("Playback error:", err));
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Handle station change
    const handleStationChange = (stationKey) => {
        setCurrentStation(stationKey);
        setIsPlaying(false);
        
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = radioStations[stationKey].url;
            audioRef.current.load();
        }
    };

    // Error handling for audio loading
    useEffect(() => {
        const audioElement = audioRef.current;

        if (!audioElement) return;

        audioElement.onerror = () => {
            console.error("Audio loading error");
            alert("⚠️ Failed to load the radio station. Please check your internet or try another station.");
        };
    }, []);

    // Auto-play when switching stations
    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch((err) => console.error("Auto-play error:", err));
        }
    }, [currentStation, isPlaying]);

    return (
        <div className={`radio-wrapper ${isPlaying ? "playing" : ""}`}>
            <div className="overlay">
                <h2>🎙️ {radioStations[currentStation].name}</h2>

                <div className="station-buttons">
                    {Object.keys(radioStations).map((key) => (
                        <button
                            key={key}
                            className={`station-btn ${currentStation === key ? "active" : ""}`}
                            onClick={() => handleStationChange(key)}
                        >
                            {radioStations[key].name.split("–")[0].trim()}
                        </button>
                    ))}
                </div>

                <button className="play-button" onClick={handlePlay}>
                    {isPlaying ? <span className="pause-icon">❚❚</span> : <span className="play-icon">▶</span>}
                </button>

                <audio ref={audioRef}>
                    <source src={radioStations[currentStation].url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>

                {isPlaying && (
                    <div className="sound-waves">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Radio;
