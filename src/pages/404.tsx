/**
 * src/pages/404.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import * as React from "react";
import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <>
      <Flex
        w={"100%"}
        h={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack gap={4}>
          <Image
            src={"/static/images/ben.png"}
            zIndex={-1}
            alt={"Ben"}
            height={"50vh"}
          />
          <Heading color={"primary.400"} textAlign={"center"}>
            404 - Not Found
          </Heading>
          <Text fontSize={"xl"} textAlign={"center"}>
            Your request was lost to space
          </Text>
        </Stack>
      </Flex>
    </>
  );
}
