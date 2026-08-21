"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ExecuteIcon } from "@/components/svg";

export interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

export const ContactForm = ({ onSuccess, className = "" }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to dispatch transmission.");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
        if (onSuccess) onSuccess();
      }, 2500);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Transmission execution failed.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 font-mono">
        <div className="h-3 w-3 rounded-full bg-secondary animate-ping" />
        <p className="text-secondary font-semibold text-base">
          &gt; Transmission Dispatched Successfully.
        </p>
        <p className="text-outline text-xs">
          Communication stream registered with server.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 font-mono text-xs sm:text-sm ${className}`}
    >
      {/* Error Output if any */}
      {errorMessage && (
        <div className="p-3 bg-error/10 border border-error/40 text-error rounded-md text-xs space-y-1">
          <p className="font-semibold flex items-center gap-1.5">
            <span>⚠</span> ERROR_STREAM:
          </p>
          <p className="opacity-90">{errorMessage}</p>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="block text-outline">
            Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="> guest_user"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full bg-[#131920]/90 border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-md px-3.5 py-2.5 text-on-surface placeholder:text-outline-variant/60 outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="block text-outline">
            Email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="> user@domain.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-[#131920]/90 border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-md px-3.5 py-2.5 text-on-surface placeholder:text-outline-variant/60 outline-none transition-all"
          />
        </div>
      </div>

      {/* Row 2: Subject */}
      <div className="space-y-1.5">
        <label htmlFor="contact-subject" className="block text-outline">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="> Connection Request"
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="w-full bg-[#131920]/90 border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-md px-3.5 py-2.5 text-on-surface placeholder:text-outline-variant/60 outline-none transition-all"
        />
      </div>

      {/* Row 3: Message Payload */}
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block text-outline">
          Message Payload *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          placeholder="> Enter secure payload..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full bg-[#131920]/90 border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary rounded-md px-3.5 py-2.5 text-on-surface placeholder:text-outline-variant/60 outline-none resize-none transition-all"
        />
      </div>

      {/* Action Button */}
      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          rightIcon={<ExecuteIcon className="w-3.5 h-3.5" />}
          className="px-6 tracking-wider font-bold"
        >
          ./execute
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
