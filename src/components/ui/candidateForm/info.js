import { Box, Button, Flex, Tooltip, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIsEditMode } from "../../../store/account/account.actions";
import { getAccountData } from "../../../store/account/account.selectors";
import { countriesConstants } from "../../../utils/constants";
import { Card, CheckboxField, PhoneField, PhotoField, SelectField, TextField } from "../../common";
import CitiesAutocomplete from "../../common/forms/citiesAutocomplete";
import EmailField from "../../common/forms/emailField";
import LinkedInField from "../../common/forms/linkeInField";

const style = {
  display: "inline-block",
  backgroundColor: "#E1E7EF",
  width: "30px",
  borderRadius: "5px",
  textAlign: "center",
};

const Info = ({ register, getValues, watch, setValue, isEditMode, errors, reset }) => {
  const accountData = useSelector(getAccountData());
  const dispatch = useDispatch();
  useEffect(() => {}, [watch("photo")]);
  const toast = useToast();

  // console.log(getValues());

  return (
    <Card
      editBtn={
        <Button
          onClick={() => {
            reset((formValues) => ({
              ...formValues,
              education: [],
              certifications: [],
              contentCreation: [],
            }));
            dispatch(updateIsEditMode(false));
            toast({
              position: "top",
              title: "Edit mode is on",
              description: "Now you can update the form.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}
          w={120}
        >
          Edit
        </Button>
      }
      title="Info"
    >
      <Flex gap={"40px"} alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"}>
        <PhotoField
          {...{ register, isEditMode }}
          uploadedFile={getValues("photo")}
          defaultValue={accountData?.photo}
        />
        <Box display={"flex"} flexDirection="column" gap={5} flexGrow={1}>
          <TextField
            {...{ register, isEditMode, errors }}
            name="fullName"
            id="fullName"
            type="text"
            label="Full Name"
            placeholder={"Enter your full name"}
            validOpt={{
              required: `Name is required`,
              pattern: {
                value: /^[A-Za-z\s]*$/,
                message: "Input is invalid",
              },
              maxLength: { value: 100, message: "Name is too long" },
            }}
            maxLength="100"
          />
          <TextField
            {...{ register, isEditMode, errors }}
            name="experience"
            id="experience"
            type="number"
            label="Experience"
            placeholder={"Enter experience in years"}
            validOpt={{
              required: `Experience is required`,
              min: { value: 1, message: "Number is Invalid" },
              max: { value: 70, message: "Number is Invalid" },
            }}
          />
          <TextField
            component={
              <span style={{ display: "inline-block", marginLeft: "8px" }}>
                <Tooltip
                  hasArrow
                  label="Enter a range of your expected commercials. Examples - 1. Rs 10k-20k / day,  2. Let's discuss based on requirements"
                  bg="gray.300"
                  color="black"
                >
                  <span style={style}>?</span>
                </Tooltip>
              </span>
            }
            label="Expected commercials"
            name="expectedCommercials"
            id="expectedCommercials"
            {...{ register, isEditMode, errors }}
            validOpt={{
              required: `Expected commercials is required`,
              pattern: {
                value: /^[A-Za-z\s]*$/,
                message: "Input is invalid",
              },
              maxLength: { value: 100, message: "Text is too long" },
            }}
          />
          <CitiesAutocomplete
            id="city"
            label="City"
            validOpt={{
              required: `City is required`,
              // pattern: {
              //   value: /^[a-zA-Z]$/,
              //   message: "City is invalid",
              // },
            }}
            {...{ isEditMode, errors, register, setValue, getValues }}
            maxLength="60"
          />
          {/* <CitiesField {...{ register, getValues, setValue, watch, isEditMode }} id="city" /> */}
          <PhoneField
            {...{ register, isEditMode, setValue, getValues, errors }}
            validOpt={{
              required: `Phone number is required`,
              pattern: {
                value: /^[0-9]{6,9}$/,
                message: "Input is invalid",
              },
            }}
            label="Phone number"
            id="phoneNumber"
          />
        </Box>
        <Box display={"flex"} flexDirection="column" gap={5} flexGrow={1}>
          <SelectField
            {...{ register, isEditMode, errors }}
            id="country"
            label="Country"
            options={countriesConstants}
            validOpt={{ required: `Country is required` }}
            placeholder="Country"
          />
          <SelectField
            label="Trainer type"
            options={[
              { value: "FULL_TIME", label: "Full time" },
              { value: "PART_TIME", label: "Part time" },
            ]}
            placeholder="Choose a type"
            {...{ register, isEditMode, errors }}
            id="candidateType"
            validOpt={{ required: `Trainer type is required` }}
          />
          <EmailField
            {...{ register, isEditMode, errors }}
            name="email"
            id="email"
            type="text"
            placeholder={"Enter your email"}
            label="Email"
            validOpt={{
              required: `Email is required`,
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Input is invalid",
              },
            }}
          />
          <LinkedInField
            accountData={accountData}
            label="LinkedIn"
            id="linkedIn"
            name="linkedIn"
            placeholder={"Enter your linkedin page url "}
            validOpt={{
              pattern: {
                value:
                  /^(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
                message: "Link is invalid",
              },
            }}
            {...{ register, isEditMode, errors, getValues }}
          />
          <SelectField
            label="Open to travvel"
            options={[
              { value: "NO", label: "NO" },
              { value: "YES", label: "YES" },
            ]}
            placeholder="Choose an option"
            {...{ register, isEditMode, errors, getValues }}
            id="openToTravel"
            validOpt={{ required: `Open to travvel is required` }}
          />
          {/* <CheckboxField
            {...{ register, isEditMode, getValues }}
            id="openToTravel"
            label="Open to travvel"
          /> */}
        </Box>
      </Flex>
    </Card>
  );
};

export default Info;
