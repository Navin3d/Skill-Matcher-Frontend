/* eslint-disable react/no-unescaped-entities */
import { Divider, FormLabel, Switch, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../../../store/account/account.actions";
import { getAccountData } from "../../../store/account/account.selectors";
import ModalPopup from "../../common/modalPopup";

const InactivateProfile = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const accountData = useSelector(getAccountData());

  const handleSwitch = (e) => {
    const switchValue = { ...accountData, isInActive: e.target.checked };
    dispatch(updateAccount({ toast, ...switchValue }));
  };

  return (
    <ModalPopup isOpen={isOpen} onClose={onClose}>
      <FormLabel
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
        gap={"13px"}
        htmlFor="inactivate"
        mb={"10px"}
        mt={"30px"}
      >
        <Text fontSize={"22px"}>Activate/Inactivate Profile</Text>
        <Switch
          defaultChecked={accountData.isInActive}
          onChange={handleSwitch}
          size={"lg"}
          id="inactivate"
        />
      </FormLabel>
      <Divider marginBottom={"13px"} />
      <Text color={"gray.500"} fontSize={"sm"}>
        Checking this option will inactivate your profile so that it won't appear to the recuiters.
        You may choose to later uncheck it to re-activate your profile.
      </Text>
    </ModalPopup>
  );
};

export default InactivateProfile;
