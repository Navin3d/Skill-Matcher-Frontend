import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { localStorageService } from "../../services";

export default function DrawerExample({ btnRef, isOpen, onClose, handleLogOut }) {
  const accountRole = localStorageService.getAccountRole();
  return (
    <>
      <Drawer
        size={"xs"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent maxW={250}>
          <DrawerCloseButton />
          {/* <DrawerHeader>Create your account</DrawerHeader> */}

          <DrawerBody>
            <Flex gap={5} alignItems={"flex-start"} flexDirection={"column"}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "30px", marginTop: "25px" }}
              >
                <Link color={"red"} href="#">
                  <span>
                    <Heading color={useColorModeValue("#333", "#fff")} size="md">
                      Home
                    </Heading>
                  </span>
                </Link>
                <Link color={"red"} href="#">
                  <span>
                    <Heading color={useColorModeValue("#333", "#fff")} size="md">
                      Pricing
                    </Heading>
                  </span>
                </Link>
                <Link color={"red"} href="#">
                  <span>
                    <Heading color={useColorModeValue("#333", "#fff")} size="md">
                      Contact Us
                    </Heading>
                  </span>
                </Link>
                {accountRole !== null && (
                  <Link onClick={handleLogOut} className="logOut" color={"red"} href="#">
                    <span>
                      <Heading color={useColorModeValue("#333", "#fff")} size="md">
                        Log out
                      </Heading>
                    </span>
                  </Link>
                )}
              </div>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
