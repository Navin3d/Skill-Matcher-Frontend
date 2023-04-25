import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getErrors } from "../store/errors/errors.selectors";
import { clearErrors } from "../store/errors/errors.actions";
import { errorToast } from "../utils/constants";
import { useToast } from "@chakra-ui/react";

function ErrorHandler({ children }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const errors = useSelector(getErrors());

  useEffect(() => {
    if (errors) {
      errors.forEach((error) => {
        toast(errorToast({ title: error }));
      });
      dispatch(clearErrors());
    }
  }, [errors]);

  return children;
}

export default ErrorHandler;
