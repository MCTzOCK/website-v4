/**
 * src/pages/admin/login.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import * as React from "react";
import { useRouter } from "next/router";
import useAuthState from "@/lib/useAuthState";
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
} from "@chakra-ui/react";
import { FaLock, FaUser } from "react-icons/fa";
import Cookies from "js-cookie";

export default function Login() {
  const authState = useAuthState();
  const router = useRouter();

  React.useEffect(() => {
    console.log(authState);
    if (authState && authState.loaded && authState.loggedIn) {
      router.push("/admin");
    }
  }, [authState, router]);
  return (
    <>
      <Flex
        w={"100%"}
        minH={"100vh"}
        h={"fit-content"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box rounded={"xl"} bgColor={"black"} p={18} minW={"40%"}>
          <Heading>Admin-Login</Heading>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const username = (
                e.currentTarget.elements.namedItem(
                  "username"
                ) as HTMLInputElement
              ).value;
              const password = (
                e.currentTarget.elements.namedItem(
                  "password"
                ) as HTMLInputElement
              ).value;

              const res = await fetch("/api/account/login", {
                method: "POST",
                body: JSON.stringify({
                  username,
                  password,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (res.status === 200) {
                Cookies.set("token", (await res.json()).token);
                router.push("/admin");
              } else {
                alert("Login failed!");
              }
            }}
          >
            <Stack mt={6} gap={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <FaUser />
                  </InputLeftElement>
                  <Input
                    type={"text"}
                    name={"username"}
                    placeholder={"Username"}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <FaLock />
                  </InputLeftElement>
                  <Input
                    type={"password"}
                    name={"password"}
                    placeholder={"Password"}
                  />
                </InputGroup>
              </FormControl>
              <ButtonGroup>
                <Button colorScheme={"primary"} type={"submit"}>
                  Login
                </Button>
              </ButtonGroup>
            </Stack>
          </form>
        </Box>
      </Flex>
    </>
  );
}
