import { Flex } from "@chakra-ui/react";
import {
  Card,
  SelectField,
  FileField,
  TextField,
  TextareaField,
  PhoneField,
  CheckboxField,
  CitiesField,
} from "../../common";
import {
  workPreferenceConstants,
  countriesConstants,
} from "../../../utils/constants";

const AdditionalInfo = ({
  register,
  getValues,
  watch,
  resumeName,
  handleDownloadResume,
  setValue,
  isEditMode,
  errors,
  resumeState,
}) => {
  return (
    <Card title="Additional Info" spacing={8}>
      <TextField
        {...{ register, isEditMode, errors }}
        label="Skills"
        id="skills"
        name="skills"
        type="text"
        placeholder="Enter the skills for which you deliver trainings (comma separated)"
        validOpt={{
          required: `Skills is required`,
          pattern: {
            value: /^[A-Za-z0-9,\. ]{3,50}$/,
            message: "Input is invalid",
          },
        }}
      />
      <TextField
        label="Clients"
        {...{ register, isEditMode, errors }}
        id="clients"
        type="text"
        name="clients"
        placeholder={
          "Enter some clients for whom you delivered trainings (comma separated)"
        }
        validOpt={{
          required: `Clients is required`,
          pattern: {
            value:  /^[A-Za-z0-9,\. ]{3,50}$/,
            message: "Input is invalid",
          },
        }}
      />
      <FileField
        {...{ register, getValues, watch, isEditMode, errors }}
        id="resume"
        label="Resume"
        getValues={getValues}
        validOpt={{
          ...(localStorage.getItem("resumeName")
            ? {}
            : {
                required: `Resume is required`,
                validate: {
                  pattern: {
                    message: "Input is invalid",
                  }
                },
              }),
        }}
        handleDownload={handleDownloadResume}
        fileName={resumeName}
        resumeState={resumeState}
      />
    </Card>
  );
};

export default AdditionalInfo;
