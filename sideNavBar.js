import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; 

const SideNavBar = () => {
  return (
    <nav className="sidebar">
      {/* Browse Section */}
      <div>
        <h3>Browse</h3>
        <ul>
          <li><Link to="/new-releases">New Releases</Link></li>
          <li><Link to="/pocket-novel">Pocket Novels</Link></li>
          <li><Link to="/top-artists">Top Artists</Link></li>
          <li><Link to="/Radio">Radio</Link></li> 
 
        </ul>
      </div>

      {/* Library Section */}
      <div>
        <h3>Library</h3>
        <ul>
          <li>
            <img src="/images/history_logo.png" alt="History" className="menu-icon" />
            <Link to="/history">History</Link>
          </li>
          <li>
            <img src="/images/like_logo.png" alt="Liked Songs" className="menu-icon" />
            <Link to="/liked-songs">Liked Songs</Link>
          </li>
          <li>
            <img src="/images/alb2.jpg" alt="Albums" className="menu-icon" />
            <Link to="/albums">Albums</Link>
          </li>
          <li>
            <img src="/images/artists_logo.jpg" alt="Artists" className="menu-icon" />
            <Link to="/artists">Artists</Link>
          </li>
          <li>
            <img src="/images/podcast2.png" alt="Pocket Novels" className="menu-icon" />
            <Link to="/podcasts">Pocket Novels</Link>
          </li>
          <li>
            <img src="/images/download_img.jpg" alt="Podcasts" className="menu-icon" />
            <Link to="/downloads">Downloads</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default SideNavBar;
