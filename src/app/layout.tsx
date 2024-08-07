//'use client'
import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { AppGlobal } from '@/components'

export const metadata: Metadata = {
  title: "首页",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <AppGlobal/>
    <AntdRegistry>{children}</AntdRegistry>
    </body>
    </html>
  );
}
