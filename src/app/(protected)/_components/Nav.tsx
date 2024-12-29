"use client";
import {
  Menu,
  Home,
  StickyNote,
  CheckSquare,
  Table,
  Archive,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { DropdownMenuDemo } from "~/components/user";
import NavItem from "./NavItem";
import NavItemDesktop from "./NavItemDesktop";

const Nav = () => {
  const menuItems = [
    { icon: Home, label: "Home", href: "/home" },
    { icon: StickyNote, label: "Notes", href: "/notes" },
    { icon: CheckSquare, label: "Tasks", href: "/tasks" },
    { icon: Table, label: "Tables", href: "/tables" },
    { icon: Archive, label: "Archive", href: "/archive" },
    { icon: Trash2, label: "Deleted", href: "/deleted" },
  ];

  return (
    <nav className="fixed top-0 flex w-full items-center justify-between bg-black/50 px-4 py-2 shadow-md backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div id="mobile-menu" className="md:hidden">
          <Drawer>
            <DrawerTrigger className="rounded border border-custom-yellow-500 hover:border-white hover:text-custom-yellow-500">
              <Menu className="h-6 w-6" />
            </DrawerTrigger>
            <DrawerContent className="border-custom-dark-700 bg-custom-dark-800 md:hidden">
              <DrawerHeader className="border-b border-custom-dark-700">
                <DrawerTitle className="text-custom-yellow-500">
                  Menu
                </DrawerTitle>
                <DrawerDescription className="text-custom-neutral-400">
                  Navigate through your workspace
                </DrawerDescription>
              </DrawerHeader>
              <ScrollArea className="h-[calc(100vh-300px)] px-4">
                <ul className="space-y-2 py-4">
                  {menuItems.map((item) => (
                    <NavItem key={item.href} item={item} />
                  ))}
                </ul>
              </ScrollArea>
              <DrawerFooter className="border-t border-custom-dark-700">
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="border-custom-dark-700 hover:bg-custom-dark-900 hover:text-custom-yellow-500"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Close Menu
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div>
          <Link href="/home">
            <Image
              src="/images/logo-long.png"
              width={130}
              height={50}
              alt="Notstar"
              className="w-24"
              priority
            />
          </Link>
        </div>
        <div className="hidden gap-2 md:flex">
          {menuItems.map((item) => (
            <NavItemDesktop key={item.href} item={item} />
          ))}
        </div>
      </div>
      <div>
        <DropdownMenuDemo />
      </div>
    </nav>
  );
};

export default Nav;
