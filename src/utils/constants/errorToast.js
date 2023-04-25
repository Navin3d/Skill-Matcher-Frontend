const errorToast = ({ title }) => {
  return {
    title,
    position: "top",
    status: "error",
    isClosable: true,
  };
};

export default errorToast;
