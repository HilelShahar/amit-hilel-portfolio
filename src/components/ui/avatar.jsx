// src/components/ui/avatar.jsx
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const AvatarBase = React.forwardRef(function Avatar(
  { className, ...props },
  ref
) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
});
AvatarBase.displayName = AvatarPrimitive.Root.displayName;
const Avatar = React.memo(AvatarBase);

const AvatarImageBase = React.forwardRef(function AvatarImage(
  { className, ...props },
  ref
) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  );
});
AvatarImageBase.displayName = AvatarPrimitive.Image.displayName;
const AvatarImage = React.memo(AvatarImageBase);

const AvatarFallbackBase = React.forwardRef(function AvatarFallback(
  { className, ...props },
  ref
) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  );
});
AvatarFallbackBase.displayName = AvatarPrimitive.Fallback.displayName;
const AvatarFallback = React.memo(AvatarFallbackBase);

export { Avatar, AvatarImage, AvatarFallback };
