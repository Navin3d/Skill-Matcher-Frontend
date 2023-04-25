import { useRef, useState } from "react";
import {
  Input,
  FormLabel,
  FormControl,
  HStack,
  Flex,
  Button,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { first } from "lodash";

const FileField = ({
  id,
  register,
  validOpt,
  label,
  handleDownload,
  fileName,
  isEditMode,
  errors,
  getValues,
}) => {
  const labelRef = useRef();
  const [file, setFile] = useState(null);
  const [resumeState, setResumeState] = useState("");

  function isFile(fileList) {
    return (
      fileList &&
      typeof fileList === "object" &&
      fileList[0]?.type &&
      Object.keys(fileList).length
    );
  }

  const fileChanger = (event) => {
    let file = event.target.files[0];
    // let reader = new FileReader();

    // console.log(file);
    // reader.onload = function(e) {
    // setFile(e.target.result);
    // };
    // reader.readAsDataURL(event.target.files[0]);

    // const resume = getValues("resume");
    // console.log(resume);
    // if (resume && isFile(resume)) {
    //   localStorage.setItem("resumeName", resume[0].name);
    //   const fileReader = new FileReader();
    //   fileReader.readAsDataURL(resume[0]);
    //   fileReader.onload = () => setResumeState(fileReader.result);
    // }

    const fileExtension = file.name.split(".").at(-1);
    const allowedFileTypes = ["jpg", "png"];
    if (!allowedFileTypes.includes(fileExtension)) {
      window.alert(
        `File does not support. Files type must be ${allowedFileTypes.join(
          ", "
        )}`
      );
      return false;
    }
    if (file.size > 500000) {
      window.alert("Please upload a file smaller than 10 MB");
      return false;
    } else {
      setFile(file.name);
    }
  };


  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Flex flexWrap={"wrap"} gap={2} alignItems={"center"}>
        <FormLabel w="100%">
          <Flex gap={5}>
            <Flex
              ref={labelRef}
              h="40px"
              alignItems="center"
              px="16px"
              w="100%"
              {...(isEditMode
                ? { border: "0px" }
                : { border: "1px solid #e2e8f0" })}
              // border={useColorModeValue("1px solid #e2e8f0", "1px solid #2d3748")}
              borderRadius="0.375em"
            >
              <Text fontWeight="400" color={"grey"}>
                {fileName ? fileName : "No file chosen"}
              </Text>
            </Flex>
          </Flex>
        </FormLabel>
        <div style={{ width: "100%" }}>
          <Input
            // defaultValue={file}
            disabled={isEditMode}
            {...register(id, { ...validOpt })}
            type="file"
            display="none"
            // onChange={fileChanger}
          />
          {errors && errors[id]?.message && (
            <div style={{ color: "red" }}>{errors[id]?.message}</div>
          )}
        </div>
        {!isEditMode && (
          <Button
            type="button"
            mr="10px"
            onClick={() => labelRef.current?.click()}
          >
            Upload resume
          </Button>
        )}
        <Link onClick={handleDownload}>Download</Link>
      </Flex>
    </FormControl>
  );
};

export default FileField;
