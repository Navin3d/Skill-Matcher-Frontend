import { VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { localStorageService } from "../../../services";
import {
  updateAccount,
  updateAccountPhoto,
  updateIsEditMode,
} from "../../../store/account/account.actions";
import {
  getAccountData,
  getAccountIsEditMode,
} from "../../../store/account/account.selectors";
import AboutMeCard from "./aboutMeCard";
import AdditionalInfo from "./additionalInfo";
import CandidateSubmitBtn from "./candidateSubmitBtn";
import CertificationsCard from "./certificationsCard";
import CommunityPresence from "./communityPresenceCard";
import ContentCreation from "./contentCreation";
import EducationCard from "./educationCard";
import Info from "./info";

const CandidateForm = () => {
  const dispatch = useDispatch();
  const accountData = useSelector(getAccountData());
  const isEditMode = useSelector(getAccountIsEditMode());
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      education: [],
      certifications: [],
      contentCreation: [],
    },
  });
  const {
    fields: educationFields,
    append: educationAppend,
    remove: educationRemove,
  } = useFieldArray({
    name: "education",
    control,
  });
  const {
    fields: certificateFields,
    append: certificateAppend,
    remove: certificateRemove,
  } = useFieldArray({
    name: "certifications",
    control,
  });
  const {
    fields: contentCreationFields,
    append: contentCreationAppend,
    remove: contentCreationRemove,
  } = useFieldArray({
    name: "contentCreation",
    control,
  });
  const [photoState, setPhotoState] = useState("");
  const [resumeState, setResumeState] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [compressedFile, setCompressedFile] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const photo = getValues("photo");
    if (photo && isFile(photo)) {
      if (photo[0].size > 500000) {
        toast({
          title: "Please upload a file smaller than 5 MB",
          position: "top",
          status: "error",
          isClosable: true,
        });
        return;
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(photo[0]);
      fileReader.onload = () => setPhotoState(fileReader.result);
    }
  }, [watch("photo")]);

  useEffect(() => {
    const resume = getValues("resume");
    if (resume && isFile(resume)) {
      if (resume[0].size > 500000) {
        toast({
          title: "Please upload a file smaller than 5 MB",
          position: "top",
          status: "error",
          isClosable: true,
        });
        return;
      }
      setResumeName(resume[0].name);
      localStorage.setItem("resumeName", resume[0].name);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(resume[0]);
      fileReader.onload = () => setResumeState(fileReader.result);
    }
  }, [watch("resume")]);

  useEffect(() => {
    console.log(accountData);
    if (accountData) {
      Object.keys(accountData)?.map((key) => {
        if (key === "experience") {
          accountData[key] &&
            setValue(key, Number(new Date().getFullYear()) - accountData[key]);
        } else if (key === "mobile") {
          setValue("phoneNumber", accountData[key]?.phoneNumber);
          setValue("country_code", accountData[key]?.country_code);
        } else if (key === "openToTravel") {
          setValue(key, accountData[key] === null ? null : accountData[key]?"YES":"NO");
          // console.log(accountData[key]);
        } else if (
          key !== "contentCreation" &&
          key !== "education" &&
          key !== "certifications"
        ) {
          setValue(key, accountData[key]);
        }
      });
      setPhotoState(accountData?.photo);
      setResumeState(accountData?.resume);
      setResumeName(accountData?.resumeFileName);
      localStorage.setItem("resumeName", accountData?.resumeFileName);
    }
  }, [accountData]);

  const handleCandidate = (data) => {
    const userId = localStorageService.getUserId();
    const newData = {
      ...data,
      id: userId,
      mobile: {
        phoneNumber: data?.phoneNumber,
        country_code: data?.country_code,
      },
      resume: resumeState,
      skills: Array?.isArray(data?.skills)
        ? data?.skills?.map((item) => item?.trim())
        : data?.skills
            .split(",")
            .map((item, index) =>
              index > 0 ? " " + item?.trim() : item?.trim()
            ),
      clients: Array.isArray(data?.clients)
        ? data?.clients
        : data?.clients?.split(","),
      resumeFileName: resumeName,
      experience: Number(new Date().getFullYear()) - Number(data?.experience),
      education: data?.education
        ?.map((item) => item?.study)
        .filter((item) => item !== ""),
      certifications: data?.certifications
        ?.map((item) => item?.certificate)
        .filter((item) => item !== ""),
      contentCreation: data?.contentCreation
        ?.map((item) => item?.link)
        .filter((item) => item !== ""),
      openToTravel: data?.openToTravel === "YES",
    };
    console.log(data);
    delete newData?.phoneNumber;
    delete newData?.country_code;
    console.log("newdata: ", newData);
    if (newData?.photo) {
      dispatch(updateAccountPhoto({ photo: newData?.photo, id: userId }));
    }
    // dispatch(updateAccount({ toast, ...newData }))
    dispatch(updateAccount({ toast, ...newData })).then((res) =>
      window.location.reload()
    );
    dispatch(updateIsEditMode(true));
  };

  function isFile(fileList) {
    return (
      fileList &&
      typeof fileList === "object" &&
      fileList[0]?.type &&
      Object.keys(fileList).length
    );
  }

  // const handleCompressedUpload = (image) => {
  //   new Compressor(image, {
  //     quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
  //     success: (res) => {
  //       // compressedResult has the compressed file.
  //       // Use the compressed file to upload the images to your server.
  //       setCompressedFile(res);
  //     },
  //   });
  // };

  const handleDownloadResume = (imgData) => {
    if (resumeState) {
      fetch(resumeState).then((res) => {
        res.blob().then((blob) => {
          const fileUrl = window.URL.createObjectURL(blob);
          let alink = document.createElement("a");
          alink.href = fileUrl;
          alink.download = resumeName || accountData?.resumeFileName;
          alink.click();
        });
      });
    } else if (imgData) {
      fetch(imgData).then((res) => {
        res.blob().then((blob) => {
          const fileUrl = window.URL.createObjectURL(blob);
          let alink = document.createElement("a");
          alink.href = fileUrl;
          alink.download = resumeName || accountData?.resumeFileName;
          alink.click();
        });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCandidate)}>
      <VStack align="stretch" spacing={4}>
        <Info
          {...{
            register,
            getValues,
            watch,
            setValue,
            isEditMode,
            errors,
            reset,
          }}
        />
        <AdditionalInfo
          {...{
            register,
            resumeName,
            handleDownloadResume,
            getValues,
            setValue,
            watch,
            isEditMode,
            errors,
            resumeState,
          }}
        />
        <EducationCard
          {...{
            register,
            educationFields,
            educationAppend,
            educationRemove,
            isEditMode,
            errors,
          }}
        />
        <CertificationsCard
          {...{
            register,
            certificateFields,
            certificateAppend,
            certificateRemove,
            isEditMode,
            errors,
          }}
        />
        {/* <CommunityPresence {...{ register, setValue, getValues, isEditMode, errors }} /> */}
        <ContentCreation
          {...{
            register,
            contentCreationFields,
            contentCreationAppend,
            contentCreationRemove,
            isEditMode,
            errors,
          }}
        />
        <AboutMeCard {...{ register, isEditMode, isEditMode, errors }} />
        <CandidateSubmitBtn {...{ isEditMode }} />
      </VStack>
    </form>
  );
};
export default CandidateForm;
