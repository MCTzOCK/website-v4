/**
 * src/pages/_app.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 09.06.2023
 *
 */

import * as React from "react";
import { ChakraProvider } from "@chakra-ui/provider";
import { AppProps } from "next/app";
import { theme } from "@/lib/theme";

export default function App(props: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <props.Component {...props.pageProps} />
      </ChakraProvider>
    </>
  );
}
