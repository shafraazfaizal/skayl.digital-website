import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/case-study/Layout";
import { BrowserFrame } from "@/components/case-study/Frames";
import MediaSlot from "@/components/case-study/MediaSlot";
import { jma, jmaAssets, type JmaAssets } from "@/content/jma-case-study";

// 09 — The admin system, treated as a product in its own right.
export default function AdminSystemSection({ assets }: { assets: JmaAssets }) {
  const { admin } = jma;
  return (
    <section className="py-24 md:py-40">
      <Container>
        <div className="flex flex-col gap-6">
          <Eyebrow>{admin.eyebrow}</Eyebrow>
          <h2 data-cs="lines" className="display max-w-4xl text-4xl leading-[1] md:text-6xl lg:text-7xl">
            {admin.headline}
          </h2>
        </div>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-[0.75fr_1.25fr] md:gap-16">
          <div className="flex flex-col gap-10">
            <div data-cs="fade" className="flex items-end gap-5">
              <span className="display text-[9rem] leading-[0.8] text-orange md:text-[12rem]">
                {admin.count}
              </span>
              <span className="pb-3 text-[11px] uppercase tracking-[0.28em] text-muted">
                {admin.countLabel}
              </span>
            </div>
            <ol data-cs="stagger" className="grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
              {admin.modules.map((m, i) => (
                <li
                  key={m}
                  className="flex items-baseline gap-4 border-b border-line py-3.5 text-[17px]"
                >
                  <span className="font-display text-xs tabular-nums text-orange">{String(i + 1).padStart(2, "0")}</span>
                  {m}
                </li>
              ))}
            </ol>
            <div data-cs="stagger" className="flex flex-col gap-4 text-[15px] leading-relaxed text-muted">
              <p>{admin.body}</p>
              <p>{admin.operations}</p>
            </div>
          </div>

          <div className="md:sticky md:top-24 md:self-start">
            <div data-cs="clip">
              <BrowserFrame url={`${jma.websiteLabel}/admin`}>
                <div className="relative aspect-[16/11]">
                  <MediaSlot
                    src={assets.admin}
                    alt="The JMA UK admin dashboard"
                    label="Admin dashboard"
                    file={jmaAssets.admin}
                    tone="light"
                    position="0% 0%"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="absolute inset-0"
                  />
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}