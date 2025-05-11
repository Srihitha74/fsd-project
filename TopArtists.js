import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopArtists.css";

const artistsData = [
  {
    name: "Arijit Singh",
    img: "/images/arjit_img.png",
  },
  {
    name: "Shreya Ghoshal",
    img: "/images/Shreya_img.jpg",
  },
  {
    name: "Armaan Malik",
    img: "/images/arman_img.jpg",
  },
  
  { name: "SP Balasubramaniam", img: "/images/spb_img.jpg" },
  { name: "Sid Sriram", img: "/images/sid_img.jpg" },
  { name: "Anirudh Ravichander", img: "/images/anirudh_img.jpg" },
  { name: "Taylor Swift", img: "/images/taylor_img1.png" },
  { name: "Harry Styles", img: "/images/harrystyles_img.jpg" },
  { name: "Shawn Mendes", img: "/images/shawn_img.jpg" },
  { name: "Justin Bieber", img:"/images/justin_img.jpeg"},
  { name: "Ramya Behara", img:"/images/ramya_img.jpg"},
  { name: "Mohana Bhogaraju", img:"/images/mohana_img.jpg"},
];

const TopArtists = () => {
  const navigate = useNavigate();

  const handleArtistClick = (artistName) => {
    navigate(`/artist/${artistName}`);
  };

  return (
    <div className="top-artists-page">
      <h2 className="top-artists-title">🎤 Featured Artists</h2>
      <div className="top-artists-grid">
        {artistsData.map((artist, index) => (
          <div
            className="artist-card"
            key={index}
            onClick={() => handleArtistClick(artist.name)}
          >
            <img src={artist.img} alt={artist.name} className="artist-image" />
            <p className="artist-name">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
