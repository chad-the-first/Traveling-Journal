import stylesUtils from "../styles/utils.module.css";
import { formatDate } from "../utils/formatDate";
import { Trip as TripModel } from "../models/trip";
import { Card } from "react-bootstrap";
import styles from "../styles/TripsPage.module.css";

interface props {
  tripOnShow: TripModel;
}

const TripOnShow = ({ tripOnShow }: props) => {
  const {
    image,
    title,
    body,
    location,
    route,
    author,
    meta,
    createdAt,
    updatedAt,
  } = tripOnShow;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }
  return (
    <Card>
      <Card.Img
        variant="top"
        src={image ? image : "https://placehold.co/400x200"}
      />
      <Card.Body className={styles.cardBody}>
        <Card.Title className={stylesUtils.flexCenter}>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{body}</Card.Text>
        {location && (
          <Card.Link href={location} target="_blank">
            Location on maps
          </Card.Link>
        )}
        <Card.Text>{route}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted float-start">by: {author} </small>
        <small className="text-muted float-end">{createdUpdatedText}</small>
      </Card.Footer>
    </Card>
  );
};

export default TripOnShow;
