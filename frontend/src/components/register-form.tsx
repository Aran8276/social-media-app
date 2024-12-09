"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function RegisterForm() {
  const [isPwHidden, setIsPwHidden] = useState(true);
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Daftar</CardTitle>
        <CardDescription>Masukan email dan password akun anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Nama</Label>
            <div className="flex space-x-3">
              <Input
                name="first_name"
                type="text"
                placeholder="Nama Depan"
                required
              />
              <Input
                name="last_name"
                type="text"
                placeholder="Nama Belakang"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Nama Pengguna</Label>
            <div className="flex space-x-3">
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Nama Depan"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@aran8276.site"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="flex relative">
              <Input
                className="transition-all"
                name="password"
                id="password"
                type={isPwHidden ? "password" : "text"}
                required
              />
              <div className="absolute flex items-center pr-2 inset-y-0 right-0">
                {isPwHidden ? (
                  <Eye
                    onClick={() => setIsPwHidden(false)}
                    className="size-5 text-gray-500 cursor-pointer"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setIsPwHidden(true)}
                    className="size-5 text-gray-500 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Masuk
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <Link href="/login" className="underline">
            Masuk
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
