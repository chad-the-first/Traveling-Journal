import { Button, Form, Modal } from "react-bootstrap";
import { Trip as TripModel } from "../models/trip";
import { useForm } from "react-hook-form";
import { TripInput } from "../network/trips_api";
import * as TripsApi from "../network/trips_api";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";

interface props {
  tripToEdit?: TripModel;
  onDismiss: () => void;
  onTripSubmited: (trip: TripModel) => void;
  onDeleteTripClicked: (trip: TripModel) => void;
}

const AddEditTripDialog = ({
  tripToEdit,
  onDismiss,
  onTripSubmited,
  onDeleteTripClicked,
}: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TripInput>({
    defaultValues: {
      title: tripToEdit?.title || "",
      body: tripToEdit?.body || "",
      author: tripToEdit?.author || "",
    },
  });

  async function onSubmit(input: TripInput) {
    try {
      if (tripToEdit) {
        const res = await TripsApi.updateTrip(tripToEdit._id, input);
        onTripSubmited(res);
      } else {
        const res = await TripsApi.createTrip(input);
        onTripSubmited(res);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {tripToEdit ? "Edit your destination" : "Add a destination"}
        </Modal.Title>
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
      <Modal.Footer className={styleUtils.flexCenter}>
        {tripToEdit && (
          <MdDelete
            size={30}
            className={`text-muted ${styleUtils.deleteButton}`}
            onClick={(e) => {
              onDeleteTripClicked(tripToEdit);
              // e.stopPropagation();
            }}
          />
        )}
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

export default AddEditTripDialog;
