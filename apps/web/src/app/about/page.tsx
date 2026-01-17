import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function About() {
    return (
        <main className="min-h-screen bg-bg-canvas p-8 md:p-24 max-w-4xl mx-auto">
            <div className="mb-12 flex justify-between items-center">
                <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-human text-sm">
                    &larr; Back to Home
                </Link>
                <Logo showText={false} />
            </div>

            <article className="prose prose-lg prose-slate max-w-none">
                <h1 className="font-heading text-4xl mb-2 text-text-primary">The Manifesto</h1>
                <div className="w-12 h-1 bg-primary mb-12"></div>

                <p className="font-human text-2xl leading-relaxed text-text-primary mb-12 italic">
                    "Culture does not die in battles; it dies in silence."
                </p>

                <div className="font-body text-lg text-text-secondary space-y-8">
                    <p>
                        From the valleys of Kashmir to the hills of Uttarakhand and the peaks of Himachal, our history is stored in the fragile memory of elders. Every time an elder passes away without sharing their story, a library burns down.
                    </p>

                    <p>
                        <strong className="text-text-primary">Open Mool is the firebreak.</strong>
                    </p>

                    <p>
                        We are an open collective of engineers, historians, and locals building the sovereign digital infrastructure to capture, code, and immortalize Himalayan heritage. While we plant our first seeds in Uttarakhand, our canopy covers the entire mountain belt.
                    </p>

                    <p>
                        We don't just store the past; we make it readable for the future.
                    </p>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col gap-6">
                    <h2 className="font-heading text-2xl text-text-primary">Join the Archive</h2>
                    <p className="font-body text-text-secondary">
                        We are looking for Guardians (Contributors) and Archivists (Developers).
                    </p>
                    <a href="mailto:hello@openmool.org" className="inline-block text-primary hover:text-accent-secondary font-medium transition-colors">
                        Contact the Founders &rarr;
                    </a>
                </div>

            </article>

        </main>
    );
}
