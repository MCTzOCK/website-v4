/**
 * src/pages/about/person.tsx
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
  chakra,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Person() {
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        h={"fit-content"}
        minH={"100vh"}
      >
        <Flex direction={["column", "row"]} w={["100%", "60%"]} gap={32}>
          <Image
            src={"/static/images/ben4.png"}
            alt={"Ben"}
            objectFit={"contain"}
          />
          <Box w={"100%"}>
            <Heading textAlign={"center"}>Ben Siebert</Heading>
            <Text fontSize={"xl"} mt={8}>
              Hey, I am Ben. I am a 16 year old developer and student from
              Germany. I love to code and to learn new tech-related stuff. I
              have started coding back in 2015 when I was 8 years old. Since
              then I have extended my skill set to a lot of different languages
              and frameworks. The most fun I have is when I am working with
              NextJS, ChakraUI and MongoDB. I am also a big fan of TypeScript
              and I am using it in all of my projects. Another thing I love is
              to contribute to open source projects. In fact I believe in open
              source so much that almost all of my projects are open source. The
              most proud I am of the projects I have created for the competition
              &quot;Jugend forscht&quot;. I have competed every year since 2020
              and have won several awards.
            </Text>
            <ButtonGroup mt={8}>
              <Link as={NextLink as any} href={"/about/skills"}>
                <Button size={"lg"} colorScheme={"primary"}>
                  Skills
                </Button>
              </Link>
              <Link as={NextLink as any} href={"/about/awards"}>
                <Button size={"lg"} colorScheme={"primary"}>
                  Awards
                </Button>
              </Link>
              <Link as={NextLink as any} href={"/contact"}>
                <Button size={"lg"}>Contact</Button>
              </Link>
            </ButtonGroup>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
