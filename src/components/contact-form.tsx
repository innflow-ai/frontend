"use client";

import { ArrowRight } from "@phosphor-icons/react";
import type { FormEvent } from "react";
import styles from "@/app/contact/contact.module.css";
import { siteConfig } from "@/config/site";

export type ContactFormValues = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export function buildContactMailto(values: ContactFormValues) {
  const subject = `innflow inquiry: ${values.topic}`;
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Topic: ${values.topic}`,
    "",
    values.message,
  ].join("\n");

  return `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: ContactFormValues = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      topic: String(data.get("topic") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    window.location.assign(buildContactMailto(values));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeading}>
        <span>Send a message</span>
        <h2>What can we help with?</h2>
        <p>
          Share the context your team is working through. We’ll route your note
          to the right person.
        </p>
      </div>

      <div className={styles.fieldGrid}>
        <label className={styles.field}>
          <span>Name</span>
          <input
            autoComplete="name"
            name="name"
            placeholder="Your name"
            required
            type="text"
          />
        </label>

        <label className={styles.field}>
          <span>Email</span>
          <input
            autoComplete="email"
            inputMode="email"
            name="email"
            placeholder="you@company.com"
            required
            type="email"
          />
        </label>
      </div>

      <label className={styles.field}>
        <span>What is your message about?</span>
        <select defaultValue="" name="topic" required>
          <option disabled value="">
            Choose a topic
          </option>
          <option>Sales and demos</option>
          <option>Product support</option>
          <option>Partnerships</option>
          <option>Press and media</option>
          <option>Careers</option>
          <option>Something else</option>
        </select>
      </label>

      <label className={styles.field}>
        <span>Message</span>
        <textarea
          maxLength={3000}
          minLength={20}
          name="message"
          placeholder="Tell us what you’re working on and how we can help."
          required
          rows={7}
        />
      </label>

      <div className={styles.formFooter}>
        <p>
          Your message opens in your default email app so you can review it
          before sending.
        </p>
        <button type="submit">
          Send message <ArrowRight aria-hidden="true" size={17} />
        </button>
      </div>
    </form>
  );
}
