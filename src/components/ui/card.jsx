// src/components/ui/card.jsx
import * as React from "react";
import { cn } from "@/lib/utils";

const CardBase = React.forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
      {...props}
    />
  );
});
CardBase.displayName = "Card";
export const Card = React.memo(CardBase);

const CardHeaderBase = React.forwardRef(function CardHeader(
  { className, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  );
});
CardHeaderBase.displayName = "CardHeader";
export const CardHeader = React.memo(CardHeaderBase);

const CardTitleBase = React.forwardRef(function CardTitle(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
});
CardTitleBase.displayName = "CardTitle";
export const CardTitle = React.memo(CardTitleBase);

const CardDescriptionBase = React.forwardRef(function CardDescription(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
CardDescriptionBase.displayName = "CardDescription";
export const CardDescription = React.memo(CardDescriptionBase);

const CardContentBase = React.forwardRef(function CardContent(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
});
CardContentBase.displayName = "CardContent";
export const CardContent = React.memo(CardContentBase);

const CardFooterBase = React.forwardRef(function CardFooter(
  { className, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  );
});
CardFooterBase.displayName = "CardFooter";
export const CardFooter = React.memo(CardFooterBase);
