import { Button, Form, Modal } from "react-bootstrap";
import { Trip } from "../models/trip";
import { useForm } from "react-hook-form";
import { TripInput } from "../network/trips_api";
import * as TripsApi from "../network/trips_api";

interface props {
  onDismiss: () => void;
  onTripSubmited: (trip: Trip) => void;
}

const AddTripDialog = ({ onDismiss, onTripSubmited }: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TripInput>();

  async function onSubmit(input: TripInput) {
    try {
      const res = await TripsApi.createTrip(input);
      onTripSubmited(res);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add a destination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addTripForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Destination name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Destination name"
              autoFocus
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Your experience there</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Your experience"
              isInvalid={!!errors.body}
              rows={5}
              {...register("body", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.body?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Author"
              {...register("author")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="addTripForm"
          variant="primary"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTripDialog;
