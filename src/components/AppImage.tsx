/**
 * src/components/AppImage.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import * as React from "react";
import { Image } from "@chakra-ui/image";

export default function AppImage(props: {
  w?: string | number;
  h?: string | number;
  src: string;
  alt: string;
}) {
  return (
    <>
      <Image
        src={props.src}
        alt={props.alt}
        w={props.w ? props.w : 16}
        h={props.h ? props.h : 16}
        rounded={"xl"}
        boxShadow={"xl"}
      />
    </>
  );
}
