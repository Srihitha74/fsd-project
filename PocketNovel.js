import { Link } from 'react-router-dom';
import "./PocketNovel.css";

const categories = [
  { 
    id: 1,
    name: "Christmas Children Stories", 
    key: "christmas",
    poster: "/images/chriss.jpg"
  },
  { 
    id: 2,
    name: "Fairy Tales", 
    key: "fairy-tales",
    poster: "/images/fairytale.png"
  },
  { 
    id: 3,
    name: "Romance", 
    key: "romance",
    poster: "/images/romantic.jpeg"
  },
  { 
    id: 4,
    name: "Fantasy", 
    key: "fantasy",
    poster: "/images/fantasyy.jpg"
  },
];

const PocketNovel = () => {
  return (
    <div className="pocket-novel-container">
      <h1 className="pocket-novel-title">📚 Pocket Novels</h1>
      <div className="pocket-novel-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="pocket-novel-card-wrapper">
            <Link
              to={`/pocket-novel/${cat.key}`}
              className="pocket-novel-card"
            >
              <div className="pocket-novel-image-container">
                <img 
                  src={cat.poster} 
                  alt={cat.name}
                  className="pocket-novel-poster"
                />
              </div>
              <div className="pocket-novel-card-text">{cat.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PocketNovel;