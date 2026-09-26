"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme="light"
      offset={80}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#111827",
          "--normal-border": "#e0e7ff",
          "--border-radius": "1rem",
          "--width": "400px",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "cn-toast !gap-3.5 !px-5 !py-4 !shadow-xl !shadow-indigo-200/60 !border-indigo-100",
          title: "!text-[15px] !font-semibold !text-gray-900",
          description: "!text-[13px] !leading-relaxed !text-gray-500",
          icon: "!m-0 !h-9 !w-9 !rounded-xl !bg-indigo-50 !text-indigo-600 !flex !items-center !justify-center",
          closeButton:
            "!bg-white !border-gray-200 !text-gray-500 hover:!bg-gray-50",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
