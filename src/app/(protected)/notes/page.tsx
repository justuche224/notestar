import React from "react";
import LogoutButton from "~/components/logout-button";
import { currentUser } from "~/server/auth/current-user";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <div>{JSON.stringify(user)}</div>
      <LogoutButton />
    </div>
  );
};

export default page;
