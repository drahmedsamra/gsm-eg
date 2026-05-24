"use server";

export type ContactState = {
  ok: boolean;
  message?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const course = String(formData.get("course") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const locale = String(formData.get("locale") ?? "ar");

  if (!name || name.length < 2) {
    return {
      ok: false,
      message:
        locale === "en"
          ? "Please enter your full name."
          : "يرجى إدخال الاسم الكامل.",
    };
  }

  if (!phone || phone.length < 8) {
    return {
      ok: false,
      message:
        locale === "en"
          ? "Please enter a valid phone number."
          : "يرجى إدخال رقم هاتف صحيح.",
    };
  }

  try {
    await fetch("https://formspree.io/f/mdajdqnr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        course,
        message,
      }),
    });

    return {
      ok: true,
      message:
        locale === "en"
          ? "Request received! We'll contact you soon."
          : "تم استلام طلبك بنجاح! سنتواصل معك قريباً.",
    };
  } catch {
    return {
      ok: false,
      message:
        locale === "en"
          ? "Something went wrong."
          : "حدث خطأ أثناء الإرسال.",
    };
  }
}