/**
 * src/components/BrandAppImage.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 09.06.2023
 *
 */

import * as React from "react";
import { Image } from "@chakra-ui/image";
import AppImage from "@/components/AppImage";

export default function BrandAppImage(props: {
  w?: string | number;
  h?: string | number;
}) {
  return (
    <>
      <AppImage
        src={"https://avatars.githubusercontent.com/u/53553315?v=4"}
        alt={"Logo"}
      />
    </>
  );
}
