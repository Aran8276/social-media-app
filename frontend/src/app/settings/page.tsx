"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <>
      <h2 className="text-2xl font-semibold">Setelan</h2>

      <div className="grid grid-cols-3 gap-y-5">
        <Card className="w-fit col-span-2 row-span-2">
          <CardHeader className="font-semibold text-xl">
            Setelan Profil
          </CardHeader>
          <CardContent className="flex flex-col space-y-6">
            <div className="flex items-center space-x-6">
              <div className="">
                <Image
                  src="https://avatar.iran.liara.run/public/7"
                  alt=""
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">Aran Aran</h2>
                <p className="text-gray-400 text-sm">@aran8276</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button>Upload Gambar Profil</Button>
              <Button variant="outline">Hapus</Button>
            </div>
            <p className="text-sm w-[500px]">
              *Ukuran gambar minimal harus sebesar 320px dan ukuran file kurang
              dari 500kb. Ekstensi file yang diperbolehkan: .png dan .jpg
            </p>
            <div className="flex space-x-6">
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label className="font-semibold" htmlFor="username">
                  Username
                </Label>
                <Input
                  defaultValue="aran8276"
                  type="text"
                  id="username"
                  className="transition-all"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2">
                <Label className="font-semibold" htmlFor="email">
                  Email
                </Label>
                <Input
                  defaultValue="aran8276@gmail.com"
                  type="text"
                  id="email"
                  className="transition-all"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="font-semibold text-xl">
            Ubah Password
          </CardHeader>
          <CardContent className="flex flex-col space-y-6">
            <p className="text-sm">
              Anda dapat mengubah password akun anda disini.
            </p>
            <Button>Ganti Password</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="font-semibold text-xl">Tutup Akun</CardHeader>
          <CardContent className="flex flex-col space-y-6">
            <p className="text-sm">Anda dapat menghapus akun anda disini.</p>
            <Button variant="destructive">Hapus Akun</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
