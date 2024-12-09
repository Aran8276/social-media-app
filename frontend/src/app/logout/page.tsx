"use client";

import { jwtToken, removeJwtToken } from "@/components/GlobalVariables";

export default function Page() {
  if (jwtToken) {
    removeJwtToken();
  }

  window.location.replace("/login");
}
