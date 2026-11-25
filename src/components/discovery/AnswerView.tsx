import { formatAnswer, isVisible, type Answers, type ResolvedSection } from "@/lib/discovery/form";
import { cn } from "@/lib/utils";
import { Card } from "./ui";

/** Every section with each question and answer. Used on the admin submission page. */
export default function AnswerView({ form, answers }: { form: ResolvedSection[]; answers: Answers }) {
  return (
    <div className="flex flex-col gap-4">
      {form.map((section, i) => (
        <Card key={section.id} className="px-5 py-6 sm:px-7 md:px-9 md:py-8">
          <h2 className="display flex items-baseline gap-3 text-[22px] leading-tight md:text-[26px]">
            <span className="font-sans text-[12px] tabular-nums text-ink/35">{String(i + 1).padStart(2, "0")}</span>
            {section.title}
          </h2>
          <dl className="mt-5">
            {section.questions
              .filter((q) => isVisible(q, answers))
              .map((q) => {
                const value = formatAnswer(answers[q.id]);
                return (
                  <div key={q.id} className="grid gap-1 border-t border-line py-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8">
                    <dt className="text-[14px] leading-snug text-muted">{q.label}</dt>
                    <dd dir="auto" className={cn("whitespace-pre-line text-[16px] leading-relaxed", value ? "text-ink" : "text-ink/35")}>
                      {value ?? "Not answered"}
                    </dd>
                  </div>
                );
              })}
          </dl>
        </Card>
      ))}
    </div>
  );
}
