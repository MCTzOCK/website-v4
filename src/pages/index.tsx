/**
 * src/pages/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 09.06.2023
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
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import LandingPageText from "@/components/LandingPageText";

export default function Index() {
  const isMobile = useMediaQuery("(max-width: 1080px)")[0];
  return (
    <>
      {!isMobile ? (
        <Flex
          direction={["column", "row"]}
          pt={8}
          h={"fit-content"}
          w={"100%"}
          alignItems={"flex-end"}
        >
          <Image
            src={"/static/images/ben.png"}
            transform={"translate(0, 15%)"}
            zIndex={-1}
            alt={"Ben"}
            height={"50vh"}
          />
          <LandingPageText />
          <Flex flex={"80%"} justifyContent={"flex-end"}>
            <Image
              src={"/static/images/ben2.png"}
              alt={"Ben 2"}
              height={"50vh"}
              transform={"translate(25%, 2.5%)"}
              justifySelf={"flex-end"}
              zIndex={-1}
            />
          </Flex>
        </Flex>
      ) : (
        <>
          <Flex
            direction={["column", "row"]}
            pt={8}
            pb={8}
            minH={"100vh"}
            w={"100%"}
            alignItems={"center"}
          >
            <Image
              src={"/static/images/ben2.png"}
              alt={"Ben 2"}
              width={"100%"}
              pb={8}
            />
            <LandingPageText />
          </Flex>
        </>
      )}
      <Box
        minH={"30vh"}
        zIndex={2}
        backgroundImage={"url('/static/images/waves.svg')"}
        backgroundSize={"cover"}
      ></Box>
      <Heading textAlign={"center"} size={"2xl"}>
        Latest News
      </Heading>
    </>
  );
}
