/**
 * src/components/NavigationBarBrandName.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 09.06.2023
 *
 */
import { Image } from "@chakra-ui/image";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import BrandAppImage from "@/components/BrandAppImage";

export default function NavigationBarBrandName() {
  return (
    <>
      <Flex alignItems={"center"} gap={4}>
        <BrandAppImage />
        <Stack>
          <Heading>Ben Siebert</Heading>
          <Text fontSize={"xl"} color={"gray.200"}>
            Professional software development
          </Text>
        </Stack>
      </Flex>
    </>
  );
}
