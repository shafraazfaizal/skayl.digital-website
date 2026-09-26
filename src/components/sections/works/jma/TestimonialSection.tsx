"use client";

import { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { DarkPanel, Eyebrow } from "@/components/case-study/Layout";
import { jma, jmaAssets, type JmaAssets } from "@/content/jma-case-study";

// 13b — Video testimonial from the client. Plays with sound only when the
// visitor presses play; captions on by default. Hidden on the live site until
// the video file exists, so an empty placeholder can never ship.
export default function TestimonialSection({ assets }: { assets: JmaAssets }) {
    const { testimonial } = jma;
    const video = assets.testimonialVideo;
    const dev = process.env.NODE_ENV !== "production";
    const ref = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);

    if (!video && !dev) return null;

    const play = () => {
        const v = ref.current;
        if (!v) return;
        v.muted = false;
        v.play().catch(() => { });
        setPlaying(true);
    };

    return (
        <DarkPanel glow="#0D5C6B">
            <Container className="py-20 md:py-32">
                <div className="flex flex-col items-center gap-6 text-center">
                    <Eyebrow light>{testimonial.eyebrow}</Eyebrow>
                    {testimonial.quote && (
                        <blockquote
                            data-cs="lines"
                            className="display max-w-4xl text-balance text-3xl leading-[1.08] md:text-5xl"
                        >
                            “{testimonial.quote}”
                        </blockquote>
                    )}
                </div>

                <figure className="mx-auto mt-12 max-w-5xl md:mt-16">
                    <div
                        data-cs="clip"
                        className="relative aspect-video overflow-hidden rounded-[22px] bg-[#161010] ring-1 ring-white/10 md:rounded-[28px]"
                    >
                        {video ? (
                            <>
                                <video
                                    ref={ref}
                                    src={video}
                                    poster={assets.testimonialPoster ?? undefined}
                                    controls={playing}
                                    playsInline
                                    preload="metadata"
                                    onEnded={() => setPlaying(false)}
                                    onPause={(e) => e.currentTarget.ended && setPlaying(false)}
                                    className="h-full w-full object-cover"
                                >
                                    {assets.testimonialCaptions && (
                                        <track
                                            kind="captions"
                                            src={assets.testimonialCaptions}
                                            srcLang="en"
                                            label="English"
                                            default
                                        />
                                    )}
                                </video>
                                {!playing && (
                                    <button
                                        type="button"
                                        onClick={play}
                                        aria-label={`Play video testimonial from the ${testimonial.credit}, ${testimonial.organisation}`}
                                        className="group absolute inset-0 flex items-center justify-center bg-ink/25 transition-colors duration-500 hover:bg-ink/10"
                                    >
                                        <PlayButton />
                                    </button>
                                )}
                            </>
                        ) : (
                            // Development-only placeholder
                            <div
                                className="absolute inset-0 flex items-center justify-center"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(70% 80% at 50% 40%, rgba(13,92,107,0.45), rgba(15,5,5,0) 75%)",
                                }}
                            >
                                <PlayButton />
                                <span className="absolute left-5 top-5 rounded-full bg-orange px-2.5 py-1 text-[10px] text-cream md:left-6 md:top-6">
                                    Add public{jmaAssets.testimonialVideo}
                                </span>
                            </div>
                        )}
                    </div>

                    <figcaption data-cs="fade" className="mt-6 flex flex-col items-center gap-1 text-center">
                        <span className="font-display text-xl text-cream md:text-2xl">{testimonial.credit}</span>
                        <span className="text-[11px] uppercase tracking-[0.25em] text-cream/55">
                            {testimonial.organisation}
                        </span>
                    </figcaption>
                </figure>
            </Container>
        </DarkPanel>
    );
}

function PlayButton() {
    return (
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-ink shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-skayl-out group-hover:scale-110 md:h-24 md:w-24">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-1">
                <path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5Z" />
            </svg>
        </span>
    );
}