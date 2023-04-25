import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  useToast,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import {
  PasswordField,
  TextField,
  SelectField,
  PageTitle,
  CaptchaField,
} from "../../common";
import { useRouter } from "next/router";
import { rolesConstants } from "../../../utils/constants";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../../../store/auth/auth.actions";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [captchaConfirmed, setCaptchaConfirmed] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleConfirmCaptcha = (bool) => {
    setCaptchaConfirmed(bool);
  };

  const handleSignUp = (data) => {
    if (!captchaConfirmed) {
      toast({
        title: "You are robot ?",
        position: "top",
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast({
        position: "top",
        title: "Password are not equal!",
        status: "error",
        isClosable: true,
      });
      return;
    }
    delete data.confirmPassword;
    dispatch(signUp({ router, ...data }));
  };

  return (
    <Container
      maxW="lg"
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          Skill matcher
          <PageTitle title="Skill Matcher" />
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={useBreakpointValue({
                base: "md",
                md: "lg",
              })}
            >
              Create an account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted" fontSize={{ base: "14px", md: "20px" }}>
                Already have account ?
              </Text>
              <Button
                variant="link"
                fontSize={{ base: "14px", md: "20px" }}
                colorScheme="blue"
                onClick={() => router.push("/signin")}
              >
                Log in
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={useBreakpointValue({
            base: "transparent",
            sm: useColorModeValue("#fff", "#1a202c"),
          })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("lg", "lg"),
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <form onSubmit={handleSubmit(handleSignUp)}>
            <Stack spacing="6">
              <Stack spacing="5">
                <TextField
                  {...{ register }}
                  id="name"
                  type="text"
                  label="Username"
                  validOpt={{
                    required: "Name is required field",
                  }}
                  error={errors.userName?.message}
                />
                <TextField
                  {...{ register }}
                  id="email"
                  type="email"
                  label="Email"
                  validOpt={{
                    required: "Email is required field",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/g,
                      message: "Email entered incorrectly",
                    },
                  }}
                  error={errors.email?.message}
                />
                <PasswordField
                  {...{ register }}
                  validOpt={{ required: "Password is required" }}
                  error={errors.password?.message}
                />
                <PasswordField
                  {...{ register }}
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm password"
                  validOpt={{
                    required: "Confirm password is required",
                  }}
                  error={errors.confirmPassword?.message}
                />
                <SelectField
                  {...{ register }}
                  label="Role"
                  id="role"
                  options={rolesConstants}
                  placeholder="Choose a role"
                  validOpt={{ required: "Role is required" }}
                  error={errors.role?.message}
                />
                <CaptchaField
                  isChecked={captchaConfirmed}
                  handleIsChecked={handleConfirmCaptcha}
                />
              </Stack>
              <Stack spacing="6">
                <Button colorScheme="blue" type="submit">
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
