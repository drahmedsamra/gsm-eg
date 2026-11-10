import { redirect } from "next/navigation";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  redirect(`/verify?code=${encodeURIComponent(code)}`);
}
