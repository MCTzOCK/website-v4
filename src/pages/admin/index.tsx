/**
 * src/pages/admin/index.tsx
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import * as React from "react";
import { Blog } from "@/types/Blog";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useAuthState from "@/lib/useAuthState";

export default function Index() {
  const [blogError, setBlogError] = React.useState<boolean>(false);
  const [blogLoading, setBlogLoading] = React.useState<boolean>(true);
  const [blogs, setBlogs] = React.useState<Blog[]>([]);

  const authState = useAuthState();
  const router = useRouter();

  React.useEffect(() => {
    if (authState && authState.loaded) {
      if (!authState.loggedIn) {
        router.push("/admin/login");
      }
    }
  }, [authState]);

  React.useEffect(() => {
    fetch("/api/blog", {
      method: "GET",
    }).then(async (res) => {
      const data = await res.json();

      if (res.status !== 200) {
        setBlogError(true);
      }

      setBlogs(data.blogs);
      setBlogLoading(false);
    });
  }, []);
  return <></>;
}
