import { Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { AiOutlineCamera } from "react-icons/ai";
import { useEffect, useState } from "react";

const PhotoField = ({ register, uploadedFile, defaultValue, isEditMode }) => {
  const [isMobile] = useMediaQuery("(max-width: 770px)");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (isFileList(uploadedFile)) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedFile[0]);
      fileReader.onload = () => setImageUrl(() => fileReader.result);
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (defaultValue) {
      setImageUrl(defaultValue);
    }
  }, [defaultValue]);

  function isFileList(fileList) {
    return (
      fileList && typeof fileList === "object" && fileList[0]?.type && Object.keys(fileList).length
    );
  }

  const getLabel = () => {
    if (imageUrl) {
      return (
        <Image
          w={{ base: "150px", md: "254px" }}
          h={{ base: "150px", md: "254px" }}
          borderRadius="100%"
          src={imageUrl}
        />
      );
    } else {
      return <AiOutlineCamera size="70px" />;
    }
  };
  return (
    <>
      <label
        htmlFor="photo"
        style={{
          display: "block",
          cursor: "pointer",
          width: "fit-content",
          borderRadius: "100%",
        }}
      >
        <Flex
          w={{ base: "150px", md: "254px" }}
          h={{ base: "150px", md: "254px" }}
          borderRadius="100%"
          border="1px solid #2d3748"
          justifyContent="center"
          alignItems="center"
        >
          {getLabel()}
        </Flex>
      </label>
      <input
        disabled={isEditMode}
        type="file"
        {...register("photo")}
        id="photo"
        style={{ display: "none" }}
      />
    </>
  );
};

export default PhotoField;
