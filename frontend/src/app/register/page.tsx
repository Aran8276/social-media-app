"use client";

import { RegisterForm } from "@/components/register-form";
import React from "react";

export default function page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <RegisterForm />
    </div>
  );
}