import { Button, Form, Modal } from "react-bootstrap";
import { Trip as TripModel } from "../models/trip";
import { useForm } from "react-hook-form";
import { TripInput } from "../network/trips_api";
import * as TripsApi from "../network/trips_api";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";
import TextInputField from "./form/TextInputField";

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
      image: tripToEdit?.image || "",
      title: tripToEdit?.title || "",
      body: tripToEdit?.body || "",
      route: tripToEdit?.route || "",
      location: tripToEdit?.location || "",
      author: tripToEdit?.author || "",
    },
  });

  async function onSubmit(input: TripInput) {
    try {
      if (tripToEdit) {
        if (typeof input.image != "string") {
          const res = await TripsApi.createTrip(input);
          await TripsApi.deleteTrip(tripToEdit._id);
          onTripSubmited(res);
        } else {
          const res = await TripsApi.updateTrip(tripToEdit._id, input);
          onTripSubmited(res);
        }
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
          <TextInputField
            name="image"
            label="Choose a Picture"
            type="file"
            accept="image/*"
            register={register}
            error={errors.image}
          />
          <TextInputField
            name="title"
            label="Destination name:"
            type="text"
            placeholder="Destination name"
            autoFocus
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />
          <TextInputField
            name="body"
            label="What do I like About it:"
            as="textarea"
            rows={5}
            placeholder="Your experience"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.body}
          />
          <TextInputField
            name="location"
            label="Address link"
            type="text"
            placeholder="Link from google maps"
            register={register}
            error={errors.location}
          />
          <TextInputField
            name="route"
            label="How to get there:"
            type="text"
            placeholder="what's the easiest way to get there?"
            register={register}
            error={errors.route}
          />
          <Form.Group className="mb-3" controlId={"author-input"}>
            <Form.Check
              label="Submit anonymously"
              type="checkbox"
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
          variant="light"
          className={styleUtils.redButton}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditTripDialog;
