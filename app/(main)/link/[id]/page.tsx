import { redirect } from "next/navigation";

export default async function ShortRedirect({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/id/${id}`);

  const data = await res.json();

  if (data.statusCode == 200) {
    return redirect(data.data.target);
  }

  return redirect("/");
}
