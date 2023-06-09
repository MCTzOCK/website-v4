/**
 * src/components/AppImageWrapper.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import * as React from "react";
import AppImage from "@/components/AppImage";
import { Image } from "@chakra-ui/image";
import { Box, Flex } from "@chakra-ui/react";

export default function AppImageWrapper(props: {
  w?: string | number;
  h?: string | number;
  children: React.ReactNode;
}) {
  return (
    <>
      <Flex
        w={props.w ? props.w : 16}
        h={props.h ? props.h : 16}
        rounded={"xl"}
        boxShadow={"xl"}
        alignItems={"center"}
        justifyContent={"center"}
        backgroundColor={"primary.700"}
      >
        {props.children}
      </Flex>
    </>
  );
}
