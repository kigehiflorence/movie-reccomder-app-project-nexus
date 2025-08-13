import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
// Hardcoded country data
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

const Country = () => {
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

export default Country;
