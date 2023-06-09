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
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { Box } from "@chakra-ui/react";

export default function App(props: AppProps) {
  const [navbarHeight, setNavbarHeight] = React.useState(0);

  React.useEffect(() => {
    if (document && document.getElementById("navbar")) {
      setNavbarHeight(document.getElementById("navbar").clientHeight);
    }
  }, []);

  return (
    <>
      <ChakraProvider theme={theme}>
        <Box id={"navbar"}>
          <NavigationBar />
        </Box>
        <Box h={"fit-content"} minH={"calc(100vh - " + navbarHeight + "px)"}>
          <props.Component {...props.pageProps} />
        </Box>
        <Footer />
      </ChakraProvider>
    </>
  );
}
