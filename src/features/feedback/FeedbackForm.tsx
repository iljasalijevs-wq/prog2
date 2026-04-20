import { useState } from 'react';
import { sendFeedback } from './api';
import type { FeedbackPayload } from './types';

const initialForm: FeedbackPayload = {
  name: '',
  email: '',
  message: '',
};

export function FeedbackForm() {
  const [form, setForm] = useState<FeedbackPayload>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function updateField<Key extends keyof FeedbackPayload>(key: Key, value: FeedbackPayload[Key]) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      const response = await sendFeedback(form);
      setSuccessMessage(`Thanks, ${response.name}! Your message was sent with id ${response.id}.`);
      setForm(initialForm);
    } catch {
      setErrorMessage('Feedback could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="mb-6 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">POST request demo</p>
        <h2 className="text-2xl font-bold text-white md:text-3xl">Send trip feedback</h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          This form demonstrates an Axios POST request using JSONPlaceholder, while the rest of the app loads live data with GET requests.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Name</span>
          <input
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300"
            placeholder="Alex"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-200">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300"
            placeholder="alex@example.com"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-200">Message</span>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-300"
            placeholder="Tell us what country surprised you the most."
          />
        </label>

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-200"
          >
            {isSubmitting ? 'Sending...' : 'Submit feedback'}
          </button>

          {successMessage && <p className="text-sm text-emerald-300">{successMessage}</p>}
          {errorMessage && <p className="text-sm text-rose-300">{errorMessage}</p>}
        </div>
      </form>
    </section>
  );
}
