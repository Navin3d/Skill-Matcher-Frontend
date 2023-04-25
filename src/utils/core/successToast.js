const successToast = ({ title }) => {
  return {
    title,
    position: "top",
    status: "success",
    isClosable: true,
  };
};

export default successToast;
