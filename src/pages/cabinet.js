import { Layout } from "../components/layout";
import { CandidateForm } from "../components/ui";
import ModalPopup from "../components/common/modalPopup";
import { Box, Button, Divider, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export default function Cabinet() {
  return (
    <Layout>
      <CandidateForm />
    </Layout>
  );
}
