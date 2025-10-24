"use client";

import React, { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    document.body.className = theme === "dark" ? "dark" : "";
  }, []);

  return null;
}
