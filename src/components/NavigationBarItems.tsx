/**
 * src/components/NavigationBarItems.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 09.06.2023
 *
 */

import * as React from "react";
import {
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Portal,
  Box,
  Stack,
  Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  FaAward,
  FaBoxes,
  FaChevronDown,
  FaChevronUp,
  FaFile,
  FaTools,
  FaUser,
} from "react-icons/fa";
import BrandAppImage from "@/components/BrandAppImage";
import { createRef } from "react";
import AppImageWrapper from "@/components/AppImageWrapper";
import { Image } from "@chakra-ui/image";

export default function NavigationBarItems() {
  const items: {
    name: string;
    href?: string;
    type: "link" | "menu";
    menuItems?: {
      name: string;
      href: string;
      icon: React.ReactNode;
    }[];
    onClick?: () => void;
  }[] = [
    {
      name: "Home",
      href: "/",
      type: "link",
    },
    {
      name: "About",
      type: "menu",
      menuItems: [
        {
          name: "Person",
          href: "/about/person",
          icon: (
            <>
              <FaUser />
            </>
          ),
        },
        {
          name: "Awards",
          href: "/about/awards",
          icon: (
            <>
              <FaAward />
            </>
          ),
        },
        {
          name: "Skills",
          href: "/about/skills",
          icon: (
            <>
              <FaTools />
            </>
          ),
        },
        {
          name: "Blog",
          href: "/about/blog",
          icon: (
            <>
              <FaFile />
            </>
          ),
        },
      ],
    },
    {
      name: "Projects",
      type: "menu",
      menuItems: [
        {
          name: "CodeUp",
          href: "/projects/codeup",
          icon: <Image src={"https://codeup.space/codeup.svg"} w={14} />,
        },
        {
          name: "InCode",
          href: "/projects/incode",
          icon: (
            <Image
              src={"https://avatars.githubusercontent.com/u/83610050?s=200&v=4"}
              w={14}
            />
          ),
        },
        {
          name: "SenOS",
          href: "/projects/senos",
          icon: (
            <Image
              src={"https://avatars.githubusercontent.com/u/69637254?s=200&v=4"}
              w={14}
            />
          ),
        },
        {
          name: "Decryptor",
          href: "/projects/decryptor",
          icon: <Image src={"/static/images/decryptor.jpg"} w={14} />,
        },
        {
          name: "All",
          href: "/projects",
          icon: <FaBoxes />,
        },
      ],
    },
    {
      name: "Contact",
      href: "/contact",
      type: "link",
    },
  ];

  return (
    <>
      {items.map((item, index) => {
        if (item.type === "link") {
          return (
            <Link
              key={index}
              href={item.href}
              as={NextLink as any}
              fontSize={"2xl"}
              fontWeight={"500"}
            >
              {item.name}
            </Link>
          );
        }
        if (item.type === "menu") {
          const ref = createRef() as any;
          return (
            <Popover placement="bottom" initialFocusRef={ref} key={index}>
              {({ isOpen, onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button
                      variant={"ghost"}
                      fontSize={"2xl"}
                      fontWeight={"500"}
                      size={"lg"}
                      leftIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    >
                      {item.name}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    bg={"black"}
                    w={["90vmin", "fit-content"]}
                    minWidth={"40vmin"}
                    h={"fit-content"}
                    overflow={"auto"}
                    maxH={"40vh"}
                  >
                    <PopoverBody>
                      <Stack>
                        {item.menuItems?.map((menuItem, index) => {
                          return (
                            <Link
                              key={index}
                              href={menuItem.href}
                              as={NextLink as any}
                              fontSize={"3xl"}
                              fontWeight={"500"}
                              p={6}
                              rounded={"md"}
                              _hover={{
                                backgroundColor: "gray.700",
                              }}
                            >
                              <Flex
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                w={"100%"}
                              >
                                <AppImageWrapper>
                                  {menuItem.icon}
                                </AppImageWrapper>
                                {menuItem.name}
                              </Flex>
                            </Link>
                          );
                        })}
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </>
              )}
            </Popover>
          );
        }
      })}
    </>
  );
}
