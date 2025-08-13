import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
// Hardcoded genre data
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

const Genre = () => {
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

export default Genre;
