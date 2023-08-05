import styles from "../styles/Trip.module.css";
import { Card } from "react-bootstrap";
import { Trip as TripModel } from "../models/trip";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface props {
  trip: TripModel;
  onTripClicked: (trip: TripModel) => void;
  className?: string;
  onDeleteTripClicked: (trip: TripModel) => void;
}

const Trips = ({
  onTripClicked,
  trip,
  className,
  onDeleteTripClicked,
}: props) => {
  const { title, body, author, meta, createdAt, updatedAt } = trip;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      className={`${styles.tripCard} ${className}`}
      onClick={() => onTripClicked(trip)}
    >
      <Card.Img variant="top" src="https://placehold.co/400x200" />
      <Card.Body className={styles.cardBody}>
        <Card.Title>
          {title}
          <MdDelete
            className="text-muted float-end"
            onClick={(e) => {
              onDeleteTripClicked(trip);
              e.stopPropagation();
            }}
          />
        </Card.Title>
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
