import React, { useState } from "react";
import { Star, MessageSquare, ExternalLink, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "../ui/SocialIcons";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Modal from "../ui/Modal";
import { VERIFIED_REVIEWS } from "../../data/testimonials";
import { SITE_CONFIG } from "../../data/siteContent";

export default function ReviewsSection({ backendReviews = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  // Combine local verified reviews with any backend reviews (if available)
  const allReviews = backendReviews.length > 0 ? backendReviews : VERIFIED_REVIEWS;

  const categories = ["All", "Consultations", "Numerology & Courses", "Social Community"];

  const filteredReviews =
    activeCategory === "All"
      ? allReviews
      : allReviews.filter((r) => r.category === activeCategory);

  return (
    <section id="reviews" className="py-20 sm:py-28 relative overflow-hidden bg-midnight-950/60 border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="gold" size="sm" icon={ShieldCheck}>
            Authentic Client Experiences
          </Badge>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-ivory-light mt-4 mb-3">
            Voices of Clarity & Real Experiences
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-gold-300">
            Transcribed word-for-word from verified student and consultation feedback.
          </p>
          <p className="text-xs text-ivory-muted mt-2">
            We preserve our clients' original words without alteration, exaggeration, or fabricated claims.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                activeCategory === cat
                  ? "bg-gold-500 text-midnight-950 font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  : "bg-midnight-900 border border-white/10 text-ivory-muted hover:text-ivory-light hover:border-gold-500/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredReviews.map((review) => (
            <div
              key={review.id || review._id}
              className="card-celestial p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-gold-500/40 transition-all duration-300 group"
            >
              <div className="space-y-3">
                {/* Header row: stars / platform badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold-400">
                    {Array.from({ length: review.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gold-300">
                    {review.platform}
                  </span>
                </div>

                {/* Verbatim quote */}
                <blockquote className="text-xs sm:text-sm text-ivory-soft italic leading-relaxed pt-1">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                {review.authorReply && (
                  <div className="text-[11px] text-gold-400/90 pl-3 border-l border-gold-500/40 italic">
                    Reply: &ldquo;{review.authorReply}&rdquo;
                  </div>
                )}
              </div>

              {/* Reviewer signature and transparent verification button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-cinzel text-xs font-bold text-ivory-light">
                    {review.reviewerName}
                  </p>
                  <p className="text-[10px] text-ivory-muted">
                    {review.category}
                  </p>
                </div>

                {review.screenshot && (
                  <button
                    onClick={() => setSelectedScreenshot(review)}
                    className="p-1.5 rounded-lg bg-midnight-900 border border-white/10 hover:border-gold-500/40 text-ivory-muted hover:text-gold-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 flex items-center gap-1 text-[10px]"
                    title="View original feedback clip"
                    aria-label={`View original feedback for ${review.reviewerName}`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-gold-400" />
                    <span className="hidden sm:inline">Proof</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Social Platforms & Direct Profile Links */}
        <div className="card-celestial p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto text-center space-y-6 border-gold-500/30">
          <div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-ivory-light mb-1">
              Explore More Content & Community Discussions
            </h3>
            <p className="text-xs sm:text-sm text-ivory-muted">
              Connect directly on Smitaa's official social channels to view educational reels, discussions, and student community updates:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              href={SITE_CONFIG.socialLinks.instagram}
              external
              variant="secondary"
              size="md"
              icon={InstagramIcon}
              ariaLabel="Visit Smitaa's Instagram profile"
            >
              Instagram @smitaa.divinevision
            </Button>

            <Button
              href={SITE_CONFIG.socialLinks.youtube}
              external
              variant="secondary"
              size="md"
              icon={YoutubeIcon}
              ariaLabel="Visit Numeros Miita on YouTube"
            >
              YouTube @numerosmiita
            </Button>

            <Button
              href={SITE_CONFIG.socialLinks.facebook}
              external
              variant="secondary"
              size="md"
              icon={FacebookIcon}
              ariaLabel="Visit Smitaa on Facebook"
            >
              Facebook Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for viewing authentic screenshot */}
      <Modal
        isOpen={!!selectedScreenshot}
        onClose={() => setSelectedScreenshot(null)}
        title={selectedScreenshot ? `Feedback Proof: ${selectedScreenshot.reviewerName}` : "Feedback Proof"}
        maxWidth="max-w-md"
      >
        {selectedScreenshot && (
          <div className="space-y-4 text-center">
            <div className="rounded-xl overflow-hidden border border-gold-500/30 bg-midnight-950 p-2">
              <img
                src={selectedScreenshot.screenshot}
                alt={`Screenshot feedback from ${selectedScreenshot.reviewerName}`}
                className="w-full max-h-[70vh] object-contain rounded-lg mx-auto"
              />
            </div>
            <div className="text-left text-xs text-ivory-muted p-2">
              <p className="font-semibold text-gold-300 mb-0.5">Verified Source:</p>
              <p>{selectedScreenshot.platform} &bull; {selectedScreenshot.highlight}</p>
              <p className="mt-1 text-[11px] text-ivory-muted/70 italic">
                Personal contact details have been thoughtfully protected in accordance with privacy ethics.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
