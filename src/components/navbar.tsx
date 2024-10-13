"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  logout,
  TUser,
  useCurrentUser,
} from "../redux/featuresApi/auth/authSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const links = [
  {
    title: "Home",
    href: "/",
    secure: false,
  },
  
  {
    title: "News feed",
    href: "/newFeed",
    secure: false,
  },
  {
    title: "Profile Page",
    href: "/profile",
    secure: true,
  },
  {
    title: "Admin Dashboard",
    href: "/admin/users",
    secure: true,
  },
  {
    title: "About",
    href: "/about",
    secure: false,
  },
  {
    title: "Contact",
    href: "/contact",
    secure: false,
  },
  

];

export const Navbar = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(useCurrentUser) as TUser;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out Successfully");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return nothing or a loading spinner if needed, until the component is mounted
    return null;
  }

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {/* <Logo /> */}
            <p className="font-bold text-inherit text-violet-700">
              ExploreNest
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {links.map((item, index) => {
            // Hide secure links if the user is not logged in
            if (item.secure && !user) return null;

            // Hide the Dashboard link if the user role is not admin
            if (item.title === "Admin Dashboard" && user?.role !== "admin")
              return null;

            return (
              <NavbarItem key={index}>
                <Link color="foreground" href={item.href}>
                  {item.title}
                </Link>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}

        {!user ? (
          <NavbarItem className="hidden md:flex">
            <Button className="text-sm font-normal text-default-600 bg-default-100">
              <Link href="/login">Login</Link>
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden md:flex">
            <Button
              onClick={handleLogout}
              className="text-sm font-normal text-default-600 bg-default-100"
            >
              logout
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}

        <div className="mx-4 mt-2 flex flex-col gap-2">
          {links.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === links.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
