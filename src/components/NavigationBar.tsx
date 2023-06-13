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
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  useMediaQuery,
  Link,
  Stack,
  useDisclosure,
  Button,
  IconButton,
} from "@chakra-ui/react";
import NavigationBarBrandName from "@/components/NavigationBarBrandName";
import NextLink from "next/link";
import NavigationBarItems from "@/components/NavigationBarItems";
import BrandAppImage from "@/components/BrandAppImage";
import { FaBars } from "react-icons/fa";
import { MEDIA_MOBILE_QUERY } from "../constants";

export default function NavigationBar() {
  const isMobile = useMediaQuery(MEDIA_MOBILE_QUERY)[0];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement={"right"}
        size={"full"}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bg={"black"}>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Flex
              direction={isMobile ? "column" : "row"}
              alignItems={"center"}
              gap={8}
              justifyContent={"space-between"}
            >
              <NavigationBarItems />
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme="primary"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Box
        bgColor={"black"}
        w={"100%"}
        h={"fit-content"}
        p={4}
        boxShadow={"xl"}
      >
        {isMobile ? (
          <>
            <Flex
              w={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Link as={NextLink as any} href={"/"}>
                <BrandAppImage />
              </Link>
              <IconButton
                aria-label={"Open Menu"}
                icon={<FaBars />}
                onClick={onOpen}
              />
            </Flex>
          </>
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
                <NavigationBarItems />
              </Flex>
            </Flex>
          </>
        )}
      </Box>
    </>
  );
}
