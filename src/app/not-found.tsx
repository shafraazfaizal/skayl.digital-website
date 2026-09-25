import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <Container>
        <div className="flex flex-col items-start gap-6">
          <span className="font-display text-8xl tracking-tightest text-orange md:text-9xl">
            404
          </span>
          <h1 className="display-h2 text-4xl md:text-5xl">
            You’ve gone somewhere we haven’t built yet.
          </h1>
          <p className="max-w-md text-muted">
            The page you’re looking for doesn’t exist or has moved. Let’s get
            you back on track.
          </p>
          <Link
            href="/"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-transform hover:scale-[1.03]"
          >
            Back to home →
          </Link>
        </div>
      </Container>
    </section>
  );
}
