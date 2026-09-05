"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { type FormEvent, useId } from "react";
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
  const messageHintId = useId();
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const values: ContactFormValues = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      topic: String(data.get("topic") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const nameField = form.elements.namedItem("name") as HTMLInputElement;
    const messageField = form.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement;
    nameField.setCustomValidity(values.name ? "" : "Please enter your name.");
    messageField.setCustomValidity(
      values.message.length >= 20
        ? ""
        : "Please include at least 20 characters of message text.",
    );
    if (!form.reportValidity()) return;

    window.location.assign(buildContactMailto(values));
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onInput={(event) => {
        const field = event.target;
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement
        )
          field.setCustomValidity("");
      }}
    >
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

      <div className={styles.field}>
        <label htmlFor={`${messageHintId}-field`}>Message</label>
        <textarea
          id={`${messageHintId}-field`}
          aria-describedby={messageHintId}
          maxLength={3000}
          minLength={20}
          name="message"
          placeholder="Tell us what you’re working on and how we can help."
          required
          rows={7}
        />
        <small id={messageHintId}>
          20–3,000 characters. Please don’t include passwords or sensitive
          resident information.
        </small>
      </div>

      <div className={styles.formFooter}>
        <p>
          Your message opens in your default email app so you can review it
          before sending.
        </p>
        <button type="submit">
          Review in email <ArrowRight aria-hidden="true" size={17} />
        </button>
      </div>
    </form>
  );
}
