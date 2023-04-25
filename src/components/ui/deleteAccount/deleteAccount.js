import React from "react";
import ModalPopup from "../../common/modalPopup";
import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { deleteAccount } from "../../../store/account/account.actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logOut } from "../../../store/auth/auth.actions";

const DeleteAccount = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = () => {
    dispatch(deleteAccount());
    router.push("/signin");
  };

  return (
    <ModalPopup isOpen={isOpen} onClose={onClose}>
      <Text marginTop={"20px"} marginBottom={"10px"} fontSize={{ base: "large", md: "xl" }}>
        Are you sure you want to delete this account ?
      </Text>
      <Divider marginBottom={"13px"} />
      <Box float={"right"}>
        <Button onClick={handleDelete} variant={"solid"}>
          Confirm
        </Button>
      </Box>
    </ModalPopup>
  );
};

export default DeleteAccount;
