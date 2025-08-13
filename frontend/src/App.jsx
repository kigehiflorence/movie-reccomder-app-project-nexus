import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Card, Spinner, Navbar, Nav, NavDropdown, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Create a context to share the API key and other state
const AppContext = createContext();

// A placeholder movie card component for the static sections
const PlaceholderMovieCard = () => (
  <Col md={3} sm={6} xs={12} className="mb-4">
    <div className="movie-card">
      <img
        src="https://via.placeholder.com/200x300/121212/ffb6c1?text=Poster"
        alt="Movie Poster Placeholder"
        className="poster-image"
      />
      <div className="movie-card-body">
        <h5 className="movie-title">Placeholder Title</h5>
      </div>
    </div>
  </Col>
);

// Genre component, now included in the same file
const Genre = () => {
  const genres = [
    { name: 'Action', description: 'High-energy, big-budget physical stunts and chases, often with a clear hero and villain.' },
    { name: 'Comedy', description: 'Light-hearted plots intended to make the audience laugh through humor and funny situations.' },
    { name: 'Horror', description: 'Designed to scare, startle, and repel the audience. Often involves supernatural elements or monsters.' },
    { name: 'Romance', description: 'Focuses on the passionate and affectionate love story between two main characters.' },
    { name: 'Sci-Fi', description: 'Uses speculative, fictional science and technology to explore worlds beyond our own.' },
    { name: 'Fantasy', description: 'Takes place in a fictional world with magical and mystical elements, often involving quests.' },
    { name: 'Thriller', description: 'Creates suspense, excitement, and anxiety. The central character is often in danger.' },
    { name: 'Drama', description: 'Character-driven stories that focus on realistic portrayals of life and human emotion.' },
  ];

  return (
    <Container className="content-section mt-5">
      <h5 className="section-title">Movie Genres</h5>
      <Row className="g-4">
        {genres.map((genre, index) => (
          <Col md={3} sm={6} xs={12} key={index}>
            <Card className="genre-card">
              <Card.Body>
                <Card.Title className="text-pink">{genre.name}</Card.Title>
                <Card.Text>{genre.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// Country component, now included in the same file
const Country = () => {
  const countries = [
    { name: 'USA', description: 'Hollywood movies, known for blockbusters, special effects, and global reach.' },
    { name: 'India', description: 'Bollywood movies, a vibrant industry famous for musicals, dramas, and high production values.' },
    { name: 'South Korea', description: 'Korean cinema, internationally acclaimed for its unique storytelling, thrillers, and dramas.' },
    { name: 'France', description: 'French cinema, known for its rich history, artistic flair, and diverse range of film styles.' },
    { name: 'UK', description: 'British cinema, recognized for its strong literary adaptations, period dramas, and dark humor.' },
    { name: 'Japan', description: 'Japanese cinema, celebrated for its anime, epic samurai films, and influential horror genre.' },
    { name: 'China', description: 'Chinese cinema, a rapidly growing industry known for its historical epics, martial arts films, and major blockbusters.' },
    { name: 'Italy', description: 'Italian cinema, historically significant for neorealism and spaghetti westerns, with a rich tradition of artistic filmmaking.' },
  ];

  return (
    <Container className="content-section mt-5">
      <h5 className="section-title">Movies by Country</h5>
      <Row className="g-4">
        {countries.map((country, index) => (
          <Col md={3} sm={6} xs={12} key={index}>
            <Card className="country-card">
              <Card.Body>
                <Card.Title className="text-pink">{country.name}</Card.Title>
                <Card.Text>{country.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// NavBar component, also included in the same file
const NavBar = () => {
  const { onPageChange } = useContext(AppContext);
  return (
    <Navbar expand="lg" className="main-navbar" collapseOnSelect>
      <Container>
        <Navbar.Brand onClick={() => onPageChange('home')} style={{ cursor: 'pointer' }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: '30px', marginRight: '10px' }} 
          />
          <span className="navbar-brand-custom">Movie Recommender</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => onPageChange('home')}>
              <i className="fa-solid fa-home"></i>&nbsp; Home
            </Nav.Link>
            <Nav.Link onClick={() => onPageChange('genre')}>Genre</Nav.Link>
            <Nav.Link onClick={() => onPageChange('country')}>Country</Nav.Link>
            <Nav.Link href="#movies">Movies</Nav.Link>
            <Nav.Link href="#tvshows">TV Shows</Nav.Link>
            <Nav.Link href="#topimdb">Top IMDB</Nav.Link>
            <Nav.Link href="#androidapp">Android App</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <NavDropdown title="About Project" id="basic-nav-dropdown">
              <NavDropdown.Item href="/overview">
                <i className="fa-solid fa-clipboard-question"></i>&nbsp; Project Details
              </NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/kigehiflorence/movie-reccomder-app-project-nexus" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github"></i>&nbsp; Project Code
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://github.com/kigehiflorence" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github"></i>&nbsp; Github
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.linkedin.com/in/florence-kigehi-3401a1316/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i>&nbsp; LinkedIn
              </NavDropdown.Item>
            </NavDropdown>

            <Form className="d-flex align-items-center ms-lg-3">
              <FormControl
                type="search"
                placeholder="Enter keywords..."
                className="me-2 search-input"
                aria-label="Search"
              />
            </Form>
            <Button className="btn-signup me-2">Sign Up</Button>
            <Button className="btn-login">Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function App() {
  const [movieName, setMovieName] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [nowPlaying, setNowPlaying] = useState([]);

  // Use your provided API key here.
  const TMDB_API_KEY = "6003abe8fa441cb892274bc33364617c";

  // New useEffect hook to fetch "Now Playing" movies on initial load
  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}`
        );
        setNowPlaying(response.data.results.slice(0, 4)); // Get the first 4 movies
      } catch (error) {
        console.error('Error fetching now playing movies', error);
        setNowPlaying([]);
      } finally {
        setLoading(false);
      }
    };
    
    // Only fetch if we are on the home page and haven't searched yet
    if (currentPage === 'home' && !searchPerformed) {
      fetchNowPlayingMovies();
    }
  }, [currentPage, searchPerformed]); // Dependencies

  const fetchRecommendations = async () => {
    if (!movieName.trim()) return;
    setLoading(true);
    setSearchPerformed(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieName)}`
      );
      setRecommendations(response.data.results);
    } catch (error) {
      console.error('Error fetching recommendations', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      fetchRecommendations();
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'genre':
        return <Genre />;
      case 'country':
        return <Country />;
      case 'home':
      default:
        return (
          <Container className="app-container">
            <Form className="search-container">
              <Form.Control
                type="text"
                placeholder="Search for a movie..."
                className="search-input-main"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </Form>
    
            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" role="status" variant="info">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : searchPerformed && recommendations.length > 0 ? (
              <div className="content-section">
                <h5 className="section-title">Search Results for "{movieName}"</h5>
                <Row>
                  {recommendations.map(movie => (
                    <Col md={3} sm={6} xs={12} key={movie.id} className="mb-4">
                      <div className="movie-card">
                        <img
                          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/200x300/121212/ffb6c1?text=No+Poster+Available'}
                          alt={`${movie.title} poster`}
                          className="poster-image"
                        />
                        <div className="movie-card-body">
                          <h5 className="movie-title">{movie.title}</h5>
                          <div className="details">
                            <p className="card-text"><strong>Release Date:</strong> {movie.release_date}</p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            ) : (
              <>
                <div className="content-section">
                  <h5 className="section-title">NOW PLAYING:</h5>
                  <Row>
                    {nowPlaying.length > 0 ? (
                      nowPlaying.map(movie => (
                        <Col md={3} sm={6} xs={12} key={movie.id} className="mb-4">
                          <div className="movie-card">
                            <img
                              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/200x300/121212/ffb6c1?text=No+Poster+Available'}
                              alt={`${movie.title} poster`}
                              className="poster-image"
                            />
                            <div className="movie-card-body">
                              <h5 className="movie-title">{movie.title}</h5>
                              <div className="details">
                                <p className="card-text"><strong>Release Date:</strong> {movie.release_date}</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))
                    ) : (
                      <PlaceholderMovieCard />
                    )}
                  </Row>
                </div>
                
                <div className="content-section">
                  <h5 className="section-title">LATEST TV SHOWS:</h5>
                  <Row>
                    {[...Array(4)].map((_, i) => <PlaceholderMovieCard key={`latest-tv-${i}`} />)}
                  </Row>
                </div>
    
                <div className="content-section">
                  <h5 className="section-title">COMING SOON:</h5>
                  <Row>
                    {[...Array(4)].map((_, i) => <PlaceholderMovieCard key={`coming-soon-${i}`} />)}
                  </Row>
                </div>
              </>
            )}
          </Container>
        );
    }
  };

  return (
    <AppContext.Provider value={{ onPageChange: setCurrentPage }}>
      <NavBar />
      {renderPage()}
    </AppContext.Provider>
  );
}

export default App;