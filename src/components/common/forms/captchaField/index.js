import { useState, useEffect } from "react";
import { HStack, Checkbox, useDisclosure } from "@chakra-ui/react";
import CaptchaModal from "./captchaModal";
import captchaData from "./captchaData";
import { useForm } from "react-hook-form";
import _ from "lodash";

const CaptchaField = ({ isChecked, handleIsChecked }) => {
  const { register, getValues, setValue } = useForm();
  const [selectedData, setSelectedData] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = () => {
    if (isChecked) return;
    setSelectedData(_.shuffle(captchaData).pop());
    onOpen();
  };

  const handleConfirm = () => {
    const enteredValue = getValues("entered_value");
    if (enteredValue === selectedData?.value) {
      onClose();
      handleIsChecked(true);
    } else {
      setSelectedData(_.shuffle(captchaData).pop());
      setValue("entered_value", "");
    }
  };

  function getRandomNoRepeatingInt(max) {}

  return (
    <>
      <CaptchaModal
        {...{ isOpen, onClose, selectedData, register, handleConfirm }}
      />
      <HStack>
        <Checkbox isChecked={isChecked} onChange={handleChange}>
          I&apos;m not a robot
        </Checkbox>
      </HStack>
    </>
  );
};

export default CaptchaField;
