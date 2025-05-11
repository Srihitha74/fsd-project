import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SideNavBar from "./components/sideNavBar";
import UpNavBar from "./components/upNavBar";
import AuthPage from "./components/AuthPage";
import Artists from "./components/TopArtists";
import ArtistSongs from "./components/ArtistSongs"; // ✅ Correct import
import NewReleases from "./components/NewReleases";
import Radio from "./components/Radio";
import PocketNovel from "./components/PocketNovel";
import NovelStories from "./components/NovelStories";
import StoryDetail from "./components/StoryDetail";
import "./App.css";

// --- User Profile Component ---
const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { message, user } = location.state || {};

  if (!user) {
    return (
      <div className="p-4">
        <p>No user data available. Please log in.</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4">
      <img
        src="https://static.thenounproject.com/png/363633-200.png"
        alt="Profile"
        className="h-9 w-9 rounded-full"
        style={{ height: "2.25rem", width: "2.25rem", borderRadius: "50%" }}
      />
      <div>
        <h2>{message}</h2>
        <div className="profile-details">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

const NotFound = () => <h2>Welcome to Dhwani</h2>;

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setCurrentSong(null);
    setIsPlaying(false);
  };

  return (
    <Router>
      <AppContent
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageSelect}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onPlaySong={handlePlaySong}
        onClosePlayer={handleClosePlayer}
      />
    </Router>
  );
}

function AppContent({
  selectedLanguage,
  onLanguageChange,
  currentSong,
  isPlaying,
  setIsPlaying,
  onPlaySong,
  onClosePlayer,
}) {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const navigate = useNavigate();

  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");

      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("userId", data.userId);
          navigate("/profile", {
            state: { message: "Login Successful!", user: data.user },
          });
        } else {
          setError(data.error || "Login failed");
        }
      } catch (err) {
        setError("Error: Could not connect to server");
      }
    };

    return (
      <form onSubmit={handleLogin} className="space-y-4 p-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-style"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-style"
          />
        </div>
        <button type="submit" className="btn-primary">Log In</button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    );
  };

  const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUpSubmit = async (e) => {
      e.preventDefault();
      setError("");
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          navigate("/profile", {
            state: { message: "Account Created Successfully!", user: data.user },
          });
        } else {
          setError(data.error || "Signup failed");
        }
      } catch (error) {
        setError("Error: Could not connect to server");
      }
    };

    return (
      <form onSubmit={handleSignUpSubmit} className="space-y-4 p-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-style"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-style"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-style"
          />
        </div>
        <button type="submit" className="btn-primary">Sign Up</button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    );
  };

  return (
    <>
      {!isAuthPage && <UpNavBar onLanguageChange={onLanguageChange} />}
      {!isAuthPage && <SideNavBar />}
      <div className={`main-content ${!isAuthPage && !currentSong ? "with-sidebar" : ""}`}>
        <Routes>
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<h1>Welcome to Dhwani</h1>} />
          <Route path="/top-artists" element={<Artists />} />
          <Route
            path="/new-releases"
            element={
              <NewReleases
                selectedLanguage={selectedLanguage}
                onPlay={onPlaySong}
                playingSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            }
          />
          <Route path="/artist/:artistName" element={
            <ArtistSongs
              onPlaySong={onPlaySong}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentSong={currentSong}
            />
          } />
          <Route path="/radio" element={<Radio />} />
          <Route path="/pocket-novel" element={<PocketNovel />} />
          <Route path="/pocket-novel/:categoryName" element={<NovelStories />} />
          <Route path="/pocket-novel/:categoryName/:storyId" element={<StoryDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {currentSong && (
          <div className="basic-player">
            <h3>Now Playing: {currentSong.name}</h3>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={onClosePlayer}>Close Player</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
