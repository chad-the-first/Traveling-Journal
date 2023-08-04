import styles from "../styles/Trip.module.css";
import { Card, Row, Col } from "react-bootstrap";
import { Trip as TripModel } from "../models/trip";

interface props {
  trip: TripModel;
}

const Trips = ({ trip }: props) => {
  const { title, body, author, meta, createdAt, updatedAt } = trip;

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      <Col>
        <Card className={styles.tripCard}>
          <Card.Img variant="top" src="https://placehold.co/400x200" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text className={styles.cardText}>{body}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">by: {author}</small>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default Trips;
