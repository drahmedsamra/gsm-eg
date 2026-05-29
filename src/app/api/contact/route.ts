import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, phone, course, message, locale } = body;

    const courseName =
      course || (locale === "ar" ? "غير محدد" : "Not selected");

    await resend.emails.send({
      from: "GSM Academy <onboarding@resend.dev>",
      to: ["drahmedsamra@gmail.com","nabilamostafa12@gmail.com"],

      subject:
        locale === "ar"
          ? `طلب جديد من الموقع - ${name}`
          : `New inquiry from website - ${name}`,

      html: `
        <div style="font-family: Arial; direction: rtl; padding: 20px;">
          <h2>طلب جديد من موقع GSM Academy</h2>

          <p><strong>الاسم:</strong> ${name}</p>

          <p><strong>رقم الهاتف:</strong> ${phone}</p>

          <p><strong>الكورس:</strong> ${courseName}</p>

          <p><strong>الرسالة:</strong></p>

          <p>${message || "لا توجد رسالة"}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}