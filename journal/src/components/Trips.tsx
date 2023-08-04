import styles from "../styles/Trip.module.css";
import { Card } from "react-bootstrap";
import { Trip as TripModel } from "../models/trip";
import { formatDate } from "../utils/formatDate";

interface props {
  trip: TripModel;
  className?: string;
}

const Trips = ({ trip, className }: props) => {
  const { title, body, author, meta, createdAt, updatedAt } = trip;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.tripCard} ${className}`}>
      <Card.Img variant="top" src="https://placehold.co/400x200" />
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{body}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted float-start">by: {author} </small>
        <small className="text-muted float-end">{createdUpdatedText}</small>
      </Card.Footer>
    </Card>
  );
};

export default Trips;
