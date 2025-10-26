// src/components/ui/menubar.jsx
"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// Simple pass-throughs (Radix handles internals efficiently)
export function MenubarMenu(props) {
  return <MenubarPrimitive.Menu {...props} />;
}
export function MenubarGroup(props) {
  return <MenubarPrimitive.Group {...props} />;
}
export function MenubarPortal(props) {
  return <MenubarPrimitive.Portal {...props} />;
}
export function MenubarRadioGroup(props) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}
export function MenubarSub(props) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

const MenubarBase = React.forwardRef(function Menubar({ className, ...props }, ref) {
  return (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
        className
      )}
      {...props}
    />
  );
});
MenubarBase.displayName = MenubarPrimitive.Root.displayName;
export const Menubar = React.memo(MenubarBase);

const MenubarTriggerBase = React.forwardRef(function MenubarTrigger(
  { className, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
});
MenubarTriggerBase.displayName = MenubarPrimitive.Trigger.displayName;
export const MenubarTrigger = React.memo(MenubarTriggerBase);

const MenubarSubTriggerBase = React.forwardRef(function MenubarSubTrigger(
  { className, inset, children, ...props },
  ref
) {
  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" aria-hidden="true" />
    </MenubarPrimitive.SubTrigger>
  );
});
MenubarSubTriggerBase.displayName = MenubarPrimitive.SubTrigger.displayName;
export const MenubarSubTrigger = React.memo(MenubarSubTriggerBase);

const MenubarSubContentBase = React.forwardRef(function MenubarSubContent(
  { className, ...props },
  ref
) {
  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  );
});
MenubarSubContentBase.displayName = MenubarPrimitive.SubContent.displayName;
export const MenubarSubContent = React.memo(MenubarSubContentBase);

const MenubarContentBase = React.forwardRef(function MenubarContent(
  { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
});
MenubarContentBase.displayName = MenubarPrimitive.Content.displayName;
export const MenubarContent = React.memo(MenubarContentBase);

const MenubarItemBase = React.forwardRef(function MenubarItem(
  { className, inset, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
});
MenubarItemBase.displayName = MenubarPrimitive.Item.displayName;
export const MenubarItem = React.memo(MenubarItemBase);

const MenubarCheckboxItemBase = React.forwardRef(function MenubarCheckboxItem(
  { className, children, checked, ...props },
  ref
) {
  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check className="h-4 w-4" aria-hidden="true" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
});
MenubarCheckboxItemBase.displayName = MenubarPrimitive.CheckboxItem.displayName;
export const MenubarCheckboxItem = React.memo(MenubarCheckboxItemBase);

const MenubarRadioItemBase = React.forwardRef(function MenubarRadioItem(
  { className, children, ...props },
  ref
) {
  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Circle className="h-4 w-4 fill-current" aria-hidden="true" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
});
MenubarRadioItemBase.displayName = MenubarPrimitive.RadioItem.displayName;
export const MenubarRadioItem = React.memo(MenubarRadioItemBase);

const MenubarLabelBase = React.forwardRef(function MenubarLabel(
  { className, inset, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Label
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
      {...props}
    />
  );
});
MenubarLabelBase.displayName = MenubarPrimitive.Label.displayName;
export const MenubarLabel = React.memo(MenubarLabelBase);

const MenubarSeparatorBase = React.forwardRef(function MenubarSeparator(
  { className, ...props },
  ref
) {
  return (
    <MenubarPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...props}
    />
  );
});
MenubarSeparatorBase.displayName = MenubarPrimitive.Separator.displayName;
export const MenubarSeparator = React.memo(MenubarSeparatorBase);

function MenubarShortcutBase({ className, ...props }) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
}
MenubarShortcutBase.displayName = "MenubarShortcut";
export const MenubarShortcut = React.memo(MenubarShortcutBase);
