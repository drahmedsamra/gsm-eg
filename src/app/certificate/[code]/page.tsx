import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const { data } = await supabase
    .from("certificates")
    .select("*")
    .eq("code", code)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        paddingTop: "120px",
        paddingBottom: "40px",
        overflowX: "auto",
      }}
    >
      <div
        style={{
          width: "1484px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <img
          src="/certificates/gsm-template.png"
          alt="Certificate"
          style={{
            width: "1484px",
            height: "1060px",
            display: "block",
          }}
        />

        {/* Student Name */}
        <div
          style={{
            position: "absolute",
            top: "400px",
            left: "742px",
            transform: "translate(-50%, -50%)",
            width: "700px",
            textAlign: "center",
            fontSize: "64px",
            fontWeight: "700",
            color: "#07195c",
            lineHeight: "1",
          }}
        >
          {data.student_name}
        </div>

        {/* Course Name */}
        <div
          style={{
            position: "absolute",
            top: "555px",
            left: "742px",
            transform: "translate(-50%, -50%)",
            width: "800px",
            textAlign: "center",
            fontSize: "42px",
            fontWeight: "700",
            color: "#a00000",
            lineHeight: "1",
          }}
        >
          {data.course_name}
        </div>

        {/* Hours */}
        <div
          style={{
            position: "absolute",
            top: "720px",
            left: "515px",
            transform: "translate(-50%, -50%)",
            fontSize: "26px",
            fontWeight: "700",
            color: "#07195c",
          }}
        >
          {data.hours}
        </div>

        {/* Start Date */}
        <div
          style={{
            position: "absolute",
            top: "720px",
            left: "760px",
            transform: "translate(-50%, -50%)",
            fontSize: "26px",
            fontWeight: "700",
            color: "#07195c",
          }}
        >
          {data.start_date}
        </div>

        {/* End Date */}
        <div
          style={{
            position: "absolute",
            top: "720px",
            left: "970px",
            transform: "translate(-50%, -50%)",
            fontSize: "26px",
            fontWeight: "700",
            color: "#07195c",
          }}
        >
          {data.end_date}
        </div>

        {/* Grade */}
        <div
          style={{
            position: "absolute",
            top: "720px",
            left: "1220px",
            transform: "translate(-50%, -50%)",
            fontSize: "26px",
            fontWeight: "700",
            color: "#07195c",
          }}
        >
          {data.grade}
        </div>

        {/* Certificate Code */}
        <div
          style={{
            position: "absolute",
            top: "950px",
            left: "390px",
            transform: "translate(-50%, -50%)",
            fontSize: "34px",
            fontWeight: "700",
            color: "#b00000",
          }}
        >
          {data.code}
        </div>
      </div>
    </div>
  );
}