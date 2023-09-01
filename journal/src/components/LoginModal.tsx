import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignupCredentials } from "../network/trips_api";
import * as TripsApi from "../network/trips_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import stylesUtils from "../styles/utils.module.css";

interface props {
  onDismiss: () => void;
  onLogin: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLogin }: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupCredentials>();

  async function onSubmit(credentials: SignupCredentials) {
    try {
      const User = await TripsApi.logIn(credentials);
      onLogin(User);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            autofocus
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="light"
            className={`${stylesUtils.width100} ${stylesUtils.redButton}`}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
