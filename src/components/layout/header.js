import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { localStorageService } from "../../services";
import { logOut } from "../../store/auth/auth.actions";
import Drawer from "../common//drawer";
import DeleteAccount from "../ui/deleteAccount/deleteAccount";
import InactivateProfile from "../ui/inactivateProfile/inactivateProfile";
import ResetPassword from "../ui/resetPassword/resetPassword";
import { updateIsEditMode } from "../../store/account/account.actions";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(
    typeof window !== "undefined" ? window.pageYOffset : null
  );
  const router = useRouter();
  const accountRole = localStorageService.getAccountRole();
  const btnRef = React.useRef();
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);
  const [isInactivateProf, setIsInactivateProf] = useState(false);

  const handleScroll = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogOut = () => {
    dispatch(updateIsEditMode(true));
    dispatch(logOut());
    router.push("/signin");
  };

  return (
    <Box
      pos="fixed"
      w="100%"
      bg={useColorModeValue("#343A40", "gray.900")}
      boxShadow={scrollY > 40 ? "xl" : null}
      px={8}
      py={4}
      top={0}
      zIndex={100}
    >
      <Flex
        id="headerFlex"
        h={8}
        alignItems={"center"}
        justifyContent={{
          base: accountRole === null ? "flex-start" : "space-between",
          md: "space-between",
        }}
        gap={{ base: "40px", md: "0px" }}
      >
        <Button ref={btnRef} onClick={onOpen} size={"sm"} id="hamburger">
          <HamburgerIcon fontSize={22} />
        </Button>

        {/* Reset Password Modal */}
        {isResetPassword && (
          <ResetPassword
            isOpen={isResetPassword}
            onClose={setIsResetPassword}
          />
        )}

        {/* Delete Account Modal */}
        {isDeleteAccount && (
          <DeleteAccount
            isOpen={isDeleteAccount}
            onClose={setIsDeleteAccount}
          />
        )}

        {/* Inactivate Account Modal */}
        {isInactivateProf && (
          <InactivateProfile
            isOpen={isInactivateProf}
            onClose={setIsInactivateProf}
          />
        )}

        <Flex gap={7}>
          <Link _hover={{ textDecoration: "none" }} href="/">
            <span>
              <Heading color="#fff" size="md">
                Trainer Finder
              </Heading>
            </span>
          </Link>
          <Flex id="navbar" gap={5} alignItems={"center"}>
            <Link color={"red"} href="#">
              <span>
                <Heading color="#fff" size="sm">
                  Home
                </Heading>
              </span>
            </Link>
            <Link color={"red"} href="#">
              <span>
                <Heading color="#fff" size="sm">
                  Pricing
                </Heading>
              </span>
            </Link>
            <Link color={"red"} href="#">
              <span>
                <Heading color="#fff" size="sm">
                  Contact Us
                </Heading>
              </span>
            </Link>
          </Flex>
        </Flex>

        {accountRole !== null && (
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={3}>
              {/* <Button onClick={toggleColorMode} py={5}>
                {colorMode === "light" ? <MoonIcon fontSize={18} /> : <SunIcon fontSize={18} />}
              </Button> */}

              <Button
                _hover={{ color: "#111", backgroundColor: "#fff" }}
                variant="outline"
                colorScheme={"green"}
                fontSize={18}
                py={5}
                onClick={handleLogOut}
                id="mainLogout"
              >
                Log out
              </Button>

              <Flex id="myAccountDesktop" alignItems={"center"}>
                <Menu>
                  <MenuButton as={Button} colorScheme="green">
                    My Account
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="My Account">
                      {accountRole === "Recruiter" && (
                        <MenuItem>My Invoices</MenuItem>
                      )}
                      {accountRole === "Candidate" && (
                        <MenuItem onClick={() => setIsInactivateProf(true)}>
                          Inactivate Profile
                        </MenuItem>
                      )}
                      <MenuItem onClick={() => setIsResetPassword(true)}>
                        Reset Password
                      </MenuItem>
                      <MenuItem onClick={() => setIsDeleteAccount(true)}>
                        Delete Account
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </Flex>
            </Stack>
          </Flex>
        )}
      </Flex>

      {accountRole !== null && (
        <Stack id="myAccountMobile" mt={3} direction={"row"}>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton as={Button} colorScheme="green">
                My Account
              </MenuButton>
              <MenuList>
                <MenuGroup title="My Account">
                  {accountRole === "Recruiter" && (
                    <MenuItem>My Invoices</MenuItem>
                  )}
                  {accountRole === "Candidate" && (
                    <MenuItem>Inactivate Profile</MenuItem>
                  )}
                  <MenuItem onClick={() => setIsResetPassword(true)}>
                    Reset Password
                  </MenuItem>
                  <MenuItem onClick={() => setIsDeleteAccount(true)}>
                    Delete Account
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Stack>
      )}

      <Drawer
        handleLogOut={handleLogOut}
        btnRef={btnRef}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}
