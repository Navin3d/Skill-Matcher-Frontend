import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { PasswordField, TextField, PageTitle } from "../../common";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signIn } from "../../../store/auth/auth.actions";

export default function SignInForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignIn = (data) => {
    console.log("sign in data: ", data);
    dispatch(signIn({ router, ...data }));
  };

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
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
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted" fontSize={{ base: "14px", md: "20px" }}>
                Don&apos;t have an account?
              </Text>
              <Button
                variant="link"
                fontSize={{ base: "14px", md: "20px" }}
                colorScheme="blue"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "4",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={useBreakpointValue({
            base: "#fff",
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
          <form onSubmit={handleSubmit(handleSignIn)}>
            <Stack spacing="6">
              <Stack spacing="5">
                <TextField {...{ register }} id="email" type="email" label="Email" />
                <PasswordField {...{ register }} />
              </Stack>
              <Stack spacing="6">
                <Button colorScheme="blue" type="submit">
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
