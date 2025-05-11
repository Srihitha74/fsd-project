import { useParams } from 'react-router-dom';
import "./NovelStories.css";  // Corrected import

export const storiesData = {
  christmas: {
    audioLinks: [
      {
        title: "The Gift of the Magi",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      },
      {
        title: "The Tell-Tale Heart",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      },
      {
        title: "The Celebrated Jumping Frog",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      },
      {
        title: "The Time Machine (Chapter 1)",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      },
      {
        title: "The Happy Prince",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      },
      {
        title: "The Wonderful Wizard of Oz (Chapter 1)",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      },
      {
        title: "Rikki-Tikki-Tavi",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      },
      {
        title: "Alice’s Adventures in Wonderland (Chapter 1)",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      },
      {
        title: "The Fox and the Grapes",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      },
      {
        title: "The Great Stone Face",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      }
    ]
  },
  "fairy-tales": {
    audioLinks: [
      {
        title: "Cinderella",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      },
      {
        title: "Sleeping Beauty",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      }
    ]
  },
  "sci-fi": {
    audioLinks: [{
        title: "Narnia",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      },
      {
        title: "HArryPotter",
        url: "/audio/HerLover.mp3",
        duration: "15:05"
      }]
  }
};


const AudioStories = () => {
  const { categoryName } = useParams();
  const categoryData = storiesData[categoryName] || { audioLinks: [] };
  const audioLinks = categoryData.audioLinks;

  return (
    <div className="audio-stories-container">
      <h2 className="audio-stories-title">
        {categoryName.replace(/-/g, " ")} Audio Stories
      </h2>
      
      {audioLinks.length > 0 ? (
        <div className="audio-list">
          {audioLinks.map((audio, index) => (
            <div key={index} className="audio-item">
              <div className="audio-header">
                <h3 className="audio-title">{audio.title}</h3>
                {audio.duration && <span className="audio-duration">{audio.duration}</span>}
              </div>
              <audio controls className="audio-player">
                <source src={audio.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-audios">
          No audio stories available for this category.
        </div>
      )}
    </div>
  );
};

export default AudioStories;
