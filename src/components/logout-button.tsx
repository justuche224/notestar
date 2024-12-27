"use client";
import React from "react";
import { Button } from "./ui/button";
import { logout } from "~/server/actions/logout";

const LogoutButton = () => {
  return <Button onClick={async () => await logout()}>Logout</Button>;
};

export default LogoutButton;
