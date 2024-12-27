import NewVerification from "../_components/new-verification";
import { redirect } from "next/navigation";

type searchParams = Promise<{ token: string }>;

const page = async ({ searchParams }: { searchParams: searchParams }) => {
  const { token } = await searchParams;
  if (!token) return redirect("/");
  return <NewVerification token={token} />;
};

export default page;
