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
import { Box, Flex, useMediaQuery, Link } from "@chakra-ui/react";
import NavigationBarBrandName from "@/components/NavigationBarBrandName";
import { default as NextLink } from "next/link";
import NavigationBarItems from "@/components/NavigationBarItems";

export default function NavigationBar() {
  const isMobile = useMediaQuery("(max-width: 768px)")[0];

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
              paddingInline={32}
            >
              <Link>
                <NextLink href={"/"}>
                  <NavigationBarBrandName />
                </NextLink>
              </Link>
              <NavigationBarItems />
            </Flex>
          </>
        )}
      </Box>
    </>
  );
}
