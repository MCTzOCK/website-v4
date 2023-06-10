/**
 * src/lib/useAuthState.ts
 *
 * Author: Ben Siebert <hello@ben-siebert.de>
 * Copyright: Copyright (c) 2018-2023 Ben Siebert. All rights reserved.
 * License: Project License
 * Created At: 10.06.2023
 *
 */

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function useAuthState(): {
  loggedIn: boolean;
  loaded: boolean;
} {
  const [state, setState] = useState({
    loggedIn: false,
    loaded: false,
  });

  useEffect(() => {
    if (Cookies.get("token") != undefined) {
      fetch("/api/account/verify").then((res) => {
        setState({
          loaded: true,
          loggedIn: res.status === 200,
        });
      });
    } else {
      setState({
        loaded: true,
        loggedIn: false,
      });
    }
  }, []);

  return state;
}
