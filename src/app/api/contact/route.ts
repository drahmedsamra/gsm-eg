

import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();

    const {
      name,
      phone,
      course,
      branch,
      message,
      locale,
    } = body;

    const courseName =
      course ||
      (locale === "ar"
        ? "غير محدد"
        : "Not selected");

    const branchName =
      branch ||
      (locale === "ar"
        ? "غير محدد"
        : "Not selected");

    const result = await resend.emails.send({
      from: "GSM Academy <send@gsm-eg.com>",

      to: [
        "drahmedsamra@gmail.com",
        "nabilamostafa112@gmail.com",
      ],

      subject:
        locale === "ar"
          ? `طلب جديد من الموقع - ${name}`
          : `New inquiry from website - ${name}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            direction: rtl;
            padding: 24px;
            background: #f8fafc;
          "
        >
          <div
            style="
              max-width: 600px;
              margin: auto;
              background: white;
              border-radius: 20px;
              padding: 32px;
              border: 1px solid #e5e7eb;
            "
          >
            <h2
              style="
                margin-top: 0;
                color: #0f172a;
                font-size: 28px;
              "
            >
              حجز جديد gsm-eg.com
            </h2>

            <p style="font-size: 18px;">
              <strong>الاسم:</strong>
              ${name}
            </p>

            <p style="font-size: 18px;">
              <strong>رقم الهاتف:</strong>
              ${phone}
            </p>

            <p style="font-size: 18px;">
              <strong>الكورس:</strong>
              ${courseName}
            </p>

            <p style="font-size: 18px;">
              <strong>الفرع:</strong>
              ${branchName}
            </p>

            <div style="margin-top: 24px;">
              <p
                style="
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 10px;
                "
              >
                الرسالة:
              </p>

              <div
                style="
                  background: #f1f5f9;
                  padding: 16px;
                  border-radius: 14px;
                  line-height: 1.8;
                  color: #334155;
                "
              >
                ${
                  message?.trim()
                    ? message
                    : "لا توجد رسالة"
                }
              </div>
            </div>
          </div>
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