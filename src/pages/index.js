import { Layout } from "../components/layout";
import { Card } from "../components/common";
import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { SearchCandidateForm } from "../components/ui";

export default function Home() {
  return (
    <Layout>
      <VStack align="stretch" spacing={8}>
        <Heading size="xl">Search candidate</Heading>
        <SearchCandidateForm />
      </VStack>
    </Layout>
  );
}
