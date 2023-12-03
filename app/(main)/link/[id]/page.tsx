"use server";
import { redirect } from "next/navigation";

async function fetchData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/id/${id}`);

  return res.json();
}

export default async function ShortRedirect({ params }) {
  const res = await fetchData(params.id);

  console.log(res);

  if (res.statusCode == 200) {
    return redirect(res.data.target, "push");
  }

  return redirect("/");
}
