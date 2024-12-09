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
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { baseUrl, requestHeader, setJwtToken } from "./GlobalVariables";
import { LoginResponse } from "./types/Responses";
import LoadingSpinner from "./LoadingSpinner";

export function LoginForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const postLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/login`,
        {
          email: email,
          password: password,
        },
        requestHeader
      );

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        return error.response?.data;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const password = e.currentTarget.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    const creds = {
      email: email.value,
      password: password.value,
    };

    console.log(creds);

    const res: LoginResponse = await postLogin(creds.email, creds.password);
    if (!res.success) {
      if (res.message) {
        setError(res.message);
      }
      return;
    }

    setJwtToken(res.access_token);
    window.location.replace("/");
  };

  const [isPwHidden, setIsPwHidden] = useState(true);
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Masuk</CardTitle>
        <CardDescription>Masukan email dan password akun anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e)} className="grid gap-4">
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
          {error && <span className="text-red-500 text-sm">{error}</span>}
          {isLoading ? (
            <Button disabled className="w-full">
              <LoadingSpinner />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          )}
        </form>
        <div className="mt-4 text-center text-sm">
          Tidak punya akun?{" "}
          <Link href="/register" className="underline">
            Daftar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
