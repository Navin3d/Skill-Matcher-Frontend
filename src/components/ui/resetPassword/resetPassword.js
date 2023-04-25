import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { resetPassword } from "../../../store/account/account.actions";
import ModalPopup from "../../common/modalPopup";

const ResetPassword = ({ isOpen, onClose }) => {
  const formSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required("Old password is mandatory")
      .min(5, "Password must be at least 5 char long"),
    newPassword: Yup.string()
      .notOneOf([Yup.ref("oldPassword")], "New password must not be the same as the old one!")
      .required("New password is mandatory")
      .min(5, "Password must be at least 5 char long"),
    confirmPassword: Yup.string()
      .required("Confirm password is mandatory")
      .oneOf([Yup.ref("newPassword")], "Passwords does not match"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const [show, setShow] = useState(false);

  const handleResetPassword = (data) => {
    if (data.newPassword === data.confirmPassword) {
      delete data.confirmPassword;
      dispatch(resetPassword({ toast, ...data }));
      onClose(false);
    }
  };
  return (
    <ModalPopup isOpen={isOpen} onClose={onClose}>
      <Text marginBlock={"10px"} fontSize="2xl">
        Change password
      </Text>
      <Divider marginBottom={"10px"} />
      <form onSubmit={handleSubmit(handleResetPassword)}>
        <FormControl marginBottom={"8px"} display={"flex"} flexDirection={"column"} gap={"10px"}>
          <FormLabel>
            Old password
            <InputGroup marginTop={"8px"} size="md">
              <Input
                id="oldPassword"
                {...register("oldPassword")}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter your old password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors && errors.oldPassword?.message && (
              <div style={{ color: "red", maxWidth: "280px", fontSize: 14 }}>
                {errors.oldPassword?.message}
              </div>
            )}
          </FormLabel>

          <FormLabel>
            New password
            <InputGroup marginTop={"8px"} size="md">
              <Input
                id="newPassword"
                {...register("newPassword")}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter your new password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors && errors.newPassword?.message && (
              <div style={{ color: "red", maxWidth: "335px", fontSize: 14 }}>
                {errors.newPassword?.message}
              </div>
            )}
          </FormLabel>

          <FormLabel>
            Confirm new password
            <InputGroup marginTop={"8px"} size="md">
              <Input
                id="confirmPassword"
                {...register("confirmPassword")}
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Confirm your new password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors && errors.confirmPassword?.message && (
              <div style={{ color: "red", maxWidth: "280px", fontSize: 14 }}>
                {errors.confirmPassword?.message}
              </div>
            )}
          </FormLabel>
        </FormControl>
        <Box float={"right"}>
          <Button type="submit" variant={"solid"}>
            Update password
          </Button>
        </Box>
      </form>
    </ModalPopup>
  );
};

export default ResetPassword;
