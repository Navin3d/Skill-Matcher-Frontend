import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";

export default function ModalPopup({ children, onClose, isOpen }) {
  return (
    <>
      <Modal
        size={{ base: "sm", md: "lg", lg: "xl" }}
        isOpen={isOpen}
        onClose={() => onClose(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody paddingBottom={"20px"}>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
