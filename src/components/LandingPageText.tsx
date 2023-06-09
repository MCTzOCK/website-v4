/**
 * src/components/LandingPageText.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import * as React from "react";
import {
  Button,
  ButtonGroup,
  chakra,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function LandingPageText() {
  return (
    <>
      <Flex
        flex={"100%"}
        justifyContent={"center"}
        w={"100%"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Stack w={"70%"} gap={4} pb={8}>
          <Text fontSize={"xl"}>Hey, I am</Text>
          <Heading size={"2xl"}>Ben Siebert</Heading>
          <Text fontSize={"xl"}>
            <chakra.span>a&nbsp;</chakra.span>
            <chakra.span fontSize={"2xl"} color={"primary.400"}>
              fullstack Developer
            </chakra.span>
            <chakra.span>&nbsp;and&nbsp;</chakra.span>
            <chakra.span fontSize={"2xl"} color={"primary.400"}>
              student
            </chakra.span>
            <chakra.span>&nbsp;from&nbsp;</chakra.span>
            <chakra.span fontSize={"2xl"} color={"primary.400"}>
              Germany
            </chakra.span>
            .
          </Text>
          <Text fontSize={"xl"}>
            <chakra.span>I specialize in&nbsp;</chakra.span>
            <chakra.span fontSize={"2xl"} color={"primary.400"}>
              UI/UX Design
            </chakra.span>
            <chakra.span>&nbsp;and&nbsp;</chakra.span>
            <chakra.span fontSize={"2xl"} color={"primary.400"}>
              NodeJS backend development
            </chakra.span>
            .
          </Text>
          <Text fontSize={"xl"}>
            <chakra.span>In the past I have won&nbsp;</chakra.span>
            <chakra.span fontSize={"2xl"} color={"primary.400"}>
              many
            </chakra.span>
            <chakra.span>&nbsp;awards at the competition&nbsp;</chakra.span>
            <chakra.span fontSize={"2xl"} color={"primary.400"}>
              Jugend forscht
            </chakra.span>
            .
          </Text>
          <ButtonGroup>
            <Link as={NextLink as any} href={"/projects"}>
              <Button size={"lg"} colorScheme={"primary"}>
                Projects
              </Button>
            </Link>
            <Link as={NextLink as any} href={"/contact"}>
              <Button size={"lg"}>Contact</Button>
            </Link>
          </ButtonGroup>
        </Stack>
      </Flex>
    </>
  );
}
