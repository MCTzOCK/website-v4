/**
 * src/pages/contact.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 11.06.2023
 *
 */

import * as React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { FaEnvelope, FaPen } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Contact() {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <Flex
        w={"100%"}
        minH={"100vh"}
        h={"fit-content"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          w={["100%", "25%"]}
          p={8}
          h={"fit-content"}
          bg={"black"}
          rounded={"lg"}
          boxShadow={"xl"}
        >
          <Heading size={"xl"}>Contact</Heading>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setDisabled(true);

              const data = new FormData(e.target as HTMLFormElement);

              const email = data.get("email");
              const subject = data.get("subject");
              const message = data.get("message");

              const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify({
                  email,
                  subject,
                  message,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (res.status === 200) {
                alert("Your message has been sent!");
                router.push("/");
              } else {
                alert("An error occured!");
                setDisabled(false);
              }
            }}
          >
            <Stack gap={4} mt={4}>
              <FormControl isRequired>
                <FormLabel>E-Mail</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <FaEnvelope />
                  </InputLeftElement>
                  <Input name={"email"} type={"email"} placeholder={"E-Mail"} />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Subject</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <FaPen />
                  </InputLeftElement>
                  <Input
                    name={"subject"}
                    type={"text"}
                    placeholder={"Subject"}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea placeholder={"Message"} name={"message"} />
              </FormControl>
              <ButtonGroup>
                <Button
                  colorScheme={"primary"}
                  type={"submit"}
                  isLoading={disabled}
                  isDisabled={disabled}
                >
                  Submit
                </Button>
              </ButtonGroup>
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
}
