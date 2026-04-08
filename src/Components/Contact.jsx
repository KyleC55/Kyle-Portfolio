import { useState } from "react";

import { PROFILE } from "@/constants/site";
import { ui } from "@/theme/ui";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `From: ${email}\n\n${message}`,
    )}`;
    window.location.href = mailto;
  };

  return (
    <section className={ui.sectionScreen}>
      <div className={ui.pageContainer}>
        <h1 className={ui.neonHeadingContact}>Contact Me</h1>
        <p className={ui.introReadable}>
          Use the floating bar at the bottom of the page for quick links, or send a message with the form below.
        </p>

        <form onSubmit={handleSubmit} className={ui.formPanel}>
          <div className="grid gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Your Email Address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className={ui.contactField}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Subject</span>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder="Internship opportunity / Collaboration"
                className={ui.contactField}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder="Write your message here..."
                className={`${ui.contactField} resize-y min-h-[140px]`}
              />
            </label>

            <button
              type="submit"
              className="w-full md:w-fit px-6 py-3 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
