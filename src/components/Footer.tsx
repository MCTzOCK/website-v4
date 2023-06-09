/**
 * src/components/Footer.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import * as React from "react";
import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import BrandAppImage from "@/components/BrandAppImage";
import NextLink from "next/link";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <Box bg={"black"} p={16}>
        <Flex w={"100%"} justifyContent={"center"} alignItems={"flex-start"}>
          <Stack gap={6}>
            <Flex alignItems={"center"} gap={4}>
              <BrandAppImage />
              <Box>
                <Heading>Ben Siebert</Heading>
              </Box>
            </Flex>
            <ButtonGroup justifyContent={"center"}>
              <Link href={"https://instagram.com/ben.sbrt"} target={"_blank"}>
                <IconButton aria-label={"Instagram"} icon={<FaInstagram />} />
              </Link>
              <Link href={"https://github.com/mctzock"} target={"_blank"}>
                <IconButton aria-label={"GitHub"} icon={<FaGithub />} />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/ben-siebert-111595278/"}
                target={"_blank"}
              >
                <IconButton aria-label={"LinkedIn"} icon={<FaLinkedinIn />} />
              </Link>
              <Link href={"mailto:hello@ben-siebert.de"}>
                <IconButton aria-label={"E-Mail"} icon={<FaEnvelope />} />
              </Link>
            </ButtonGroup>
            <Flex alignItems={"center"} justifyContent={"center"} gap={4}>
              <Link as={NextLink as any} href={"/legal/imprint"}>
                Imprint
              </Link>
              <Link as={NextLink as any} href={"/legal/privacy-policy"}>
                Privacy Policy
              </Link>
            </Flex>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
