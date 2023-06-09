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

export default function NavigationBarBrandName() {
  return (
    <>
      <Flex alignItems={"center"} gap={4}>
        <Image
          src={"https://avatars.githubusercontent.com/u/53553315?v=4"}
          alt={"Logo"}
          w={16}
          h={16}
          rounded={"xl"}
          boxShadow={"xl"}
        />
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
