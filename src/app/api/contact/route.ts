import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();

    const { name, phone, course, message, locale } = body;

    const courseName =
      course || (locale === "ar" ? "غير محدد" : "Not selected");

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [
        "drahmedsamra@gmail.com",
        "nabilamostafa112@gmail.com",
      ],

      subject:
        locale === "ar"
          ? `طلب جديد من الموقع - ${name}`
          : `New inquiry from website - ${name}`,

      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2>طلب جديد من موقع GSM Academy</h2>

          <p><strong>الاسم:</strong> ${name}</p>

          <p><strong>رقم الهاتف:</strong> ${phone}</p>

          <p><strong>الكورس:</strong> ${courseName}</p>

          <p><strong>الرسالة:</strong></p>

          <p>${message || "لا توجد رسالة"}</p>
        </div>
      `,
    });

    console.log("EMAIL RESULT:", result);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}