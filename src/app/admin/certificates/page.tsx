"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CertificatesAdminPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    code: "",
    student_name: "",
    course_name: "",
    hours: "",
    start_date: "",
    end_date: "",
    grade: "VERY GOOD",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("FULL FORM =", form);
    console.log("START DATE =", form.start_date);
    console.log("END DATE =", form.end_date);

    setLoading(true);

    const payload = {
      code: form.code,
      student_name: form.student_name,
      course_name: form.course_name,
      hours: Number(form.hours),
      start_date: form.start_date,
      end_date: form.end_date,
      grade: form.grade,
    };

    console.log("PAYLOAD =", payload);

    const { data, error } = await supabase
      .from("certificates")
      .insert([payload])
      .select();

    setLoading(false);

    if (error) {
      console.error("SUPABASE ERROR =", error);
      alert(error.message);
      return;
    }

    console.log("SUCCESS =", data);

    alert("Certificate Added");

    setForm({
      code: "",
      student_name: "",
      course_name: "",
      hours: "",
      start_date: "",
      end_date: "",
      grade: "VERY GOOD",
    });
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        Add Certificate
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-3"
          placeholder="Certificate Code"
          value={form.code}
          onChange={(e) =>
            setForm({ ...form, code: e.target.value })
          }
        />

        <input
          className="w-full border p-3"
          placeholder="Student Name"
          value={form.student_name}
          onChange={(e) =>
            setForm({
              ...form,
              student_name: e.target.value,
            })
          }
        />

        <input
          className="w-full border p-3"
          placeholder="Course Name"
          value={form.course_name}
          onChange={(e) =>
            setForm({
              ...form,
              course_name: e.target.value,
            })
          }
        />

        <input
          className="w-full border p-3"
          type="number"
          placeholder="Hours"
          value={form.hours}
          onChange={(e) =>
            setForm({
              ...form,
              hours: e.target.value,
            })
          }
        />

        <input
          className="w-full border p-3"
          type="text"
          placeholder="2026-06-01"
          value={form.start_date}
          onChange={(e) =>
            setForm({
              ...form,
              start_date: e.target.value,
            })
          }
        />

        <input
          className="w-full border p-3"
          type="text"
          placeholder="2026-06-23"
          value={form.end_date}
          onChange={(e) =>
            setForm({
              ...form,
              end_date: e.target.value,
            })
          }
        />

        <input
          className="w-full border p-3"
          placeholder="Grade"
          value={form.grade}
          onChange={(e) =>
            setForm({
              ...form,
              grade: e.target.value,
            })
          }
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}