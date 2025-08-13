import React, { useState } from 'react'
import axios from 'axios'
import { Container, Form, Button, Row, Col, Card, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavBar from './Components/Navbar'
import './App.css';

function App() {
    const [movieName, setMovieName] = useState('')
    const [recommendations, setRecommendations] = useState([])

    const fetchRecommendations = async () => {
        try {
            const encodedMovieName = encodeURIComponent(movieName)
            const response = await axios.get(`http://127.0.0.1:3050/api/movies/${encodedMovieName}`)
            setRecommendations(response.data)
        } catch (error) {
            console.error('Error fetching recommendations', error)
        }
    }

    return (
        <>
            <NavBar/>
            <Container className="d-flex flex-column align-items-center main-container">
                <h1 className="my-4 app-title">Movie Recommender</h1>
                <p className="my-2 app-subtitle">
                    (<span className="highlight-red"><strong>MERN Stack, Django</strong></span> based Movie recommendation app)
                </p>
                <p className="app-description">
                    Type Movie name to get recommendations. e.g: 
                    <span className="highlight-blue"> Avatar</span>, 
                    <span className="highlight-blue"> Aliens vs Predator: Requiem</span>, 
                    <span className="highlight-blue"> Spider-Man</span>,
                    <span className="highlight-blue"> The Avengers</span> etc.
                </p>
                <Form className="w-50">
                    <Form.Group controlId="movieName">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Enter movie name"
                                value={movieName}
                                onChange={(e) => setMovieName(e.target.value)}
                                className="input-field"
                            />
                            <Button
                                variant="primary"
                                onClick={fetchRecommendations}
                                className="submit-btn"
                            >
                                Get Recommendations
                            </Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
                <Container className="mt-4">
                    <Row>
                        {recommendations.map((movie) => (
                            <Col md={4} key={movie._id} className="mb-4">
                                <Card className="movie-card">
                                    <Card.Body>
                                        <Card.Title className="movie-title">{movie.title}</Card.Title>
                                        {movie.tagline ? (
                                            <Card.Subtitle className="mb-2 text-muted movie-tagline">Tagline: {movie.tagline}</Card.Subtitle>
                                        ) : (
                                            <Card.Subtitle className="mb-2 no-tagline">No Tagline available</Card.Subtitle>
                                        )}
                                        <Card.Text className="movie-text">
                                            <strong>Release Date:</strong> {movie.release_date.slice(0, 10)}
                                        </Card.Text>
                                        <Card.Text className="movie-text">
                                            <strong>Duration:</strong> {movie.runtime} Minutes
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <h5 className="note">Note: Poster not available due to TMDB access issues.</h5>
                <Link to='/overview'>
                    <Button variant="link" className="overview-btn">
                        Know more about the project
                    </Button>
                </Link>
            </Container>
        </>
    )
}

export default App
