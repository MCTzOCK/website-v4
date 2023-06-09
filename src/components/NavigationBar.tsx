/**
 * src/components/NavigationBar.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 09.06.2023
 *
 */
import * as React from "react";
import { Box, Flex, useMediaQuery, Link, Stack } from "@chakra-ui/react";
import NavigationBarBrandName from "@/components/NavigationBarBrandName";
import NextLink from "next/link";
import NavigationBarItems from "@/components/NavigationBarItems";

export default function NavigationBar() {
  const isMobile = useMediaQuery("(max-width: 1080px)")[0];

  return (
    <>
      <Box
        bgColor={"black"}
        w={"100%"}
        h={"fit-content"}
        p={4}
        boxShadow={"xl"}
      >
        {isMobile ? (
          <></>
        ) : (
          <>
            <Flex
              w={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
              paddingInline={[0, 0, 8, 64]}
            >
              <Link as={NextLink as any} href={"/"}>
                <NavigationBarBrandName />
              </Link>
              <Flex
                direction={isMobile ? "column" : "row"}
                alignItems={"center"}
                gap={8}
                justifyContent={"space-between"}
              >
                <NavigationBarItems mobile={isMobile} />
              </Flex>
            </Flex>
          </>
        )}
      </Box>
    </>
  );
}
