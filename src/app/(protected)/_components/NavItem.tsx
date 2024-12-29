"use client";
import type { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

interface item {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: string;
}

const NavItem = ({ item }: { item: item }) => {
  const currentPart = usePathname();
  return (
    <li>
      <Link
        href={item.href}
        className={
          currentPart === item.href
            ? "flex items-center gap-3 rounded-lg bg-custom-dark-900 px-4 py-3 text-custom-yellow-500 transition-colors duration-200"
            : "flex items-center gap-3 rounded-lg px-4 py-3 text-custom-neutral-300 transition-colors duration-200 hover:bg-custom-dark-900 hover:text-custom-yellow-500"
        }
      >
        <item.icon className="h-5 w-5" />
        <span className="font-medium">{item.label}</span>
      </Link>
    </li>
  );
};

export default NavItem;
