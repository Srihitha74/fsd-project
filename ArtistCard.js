import { Link } from 'react-router-dom';

const ArtistCard = ({ artist, index }) => {
  const artistSlug = artist.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

  return (
    <div key={index} className="artist-wrapper">
      <Link to={`/${artistSlug}`}>
        <div className="artist-card">
          <img src={artist.img} alt={artist.name} className="artist-image" />
          <p className="artist-name">{artist.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default ArtistCard;
