import styles from "../styles/Trip.module.css";
import stylesUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Trip as TripModel } from "../models/trip";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { User } from "../models/user";

interface props {
  trip: TripModel;
  className?: string;
  editTripClicked: (trip: TripModel) => void;
  loggedIn: User | null;
}

const Trips = ({ trip, className, editTripClicked, loggedIn }: props) => {
  const { image, title, body, author, meta, createdAt, updatedAt } = trip;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      as={Link}
      className={`${styles.tripCard} ${className}`}
      to={"/" + trip._id}
    >
      <Card.Img
        className={styles.cardImage}
        variant="top"
        src={image ? image : "https://placehold.co/400x200"}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={stylesUtils.flexCenter}>
          {title}
          {loggedIn && (
            <FiEdit
              className={`ms-auto ${styles.whiteIcon}`}
              onClick={(e) => {
                editTripClicked(trip);
                e.preventDefault();
              }}
            />
          )}
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
