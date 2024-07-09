"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import getLinkRedirect from "@/actions/getLinkRedirect";

export default function ShortRedirect({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    getLinkRedirect(id).then((data) => {
      if (data) {
        window.location.href = data;
        return;
      }
      router.replace("/?error=404");
    });
  }, [id, router]);

  return null;
}
