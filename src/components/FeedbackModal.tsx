import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const FeedbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // New Form states
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const resetForm = () => {
    setName("");
    setDesignation("");
    setEmail("");
    setFeedback("");
  };

  const resetAndClose = () => {
    setIsOpen(false);

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setSuccess(false);
      resetForm();
      closeTimerRef.current = null;
    }, 300);
  };

  const handleSubmit = async () => {
    // Basic validation: all fields mandatory
    if (!name.trim() || !email.trim() || !feedback.trim() || !designation.trim() || loading) return;

    setLoading(true);

    const { error } = await supabase
      .from("feedback tbale")
      .insert([{
        name: name.trim(),
        email: email.trim(),
        designation: designation.trim(),
        feedback: feedback.trim()
      }]);

    if (!error) {
      setSuccess(true);

      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }

      closeTimerRef.current = window.setTimeout(() => {
        resetAndClose();
      }, 2000);
    }

    setLoading(false);
  };

  const handleClose = () => {
    if (loading) return;
    resetAndClose();
  };

  const submitAnother = () => {
    setSuccess(false);
    resetForm();
  };

  const isFormValid = name.trim() && email.trim() && feedback.trim() && designation.trim();

  const modal = (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="feedback-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close feedback modal"
            className="absolute inset-0 z-0 bg-background/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-lg p-[1.5px] overflow-hidden rounded-[24px]"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute -inset-[2px] z-0 animate-glow-spin animate-glow-pulse rounded-[26px]"
              style={{
                background:
                  "conic-gradient(from 0deg, hsl(var(--glow-1)), hsl(var(--glow-2)), hsl(var(--glow-3)), hsl(var(--glow-4)), hsl(var(--glow-1)))",
                filter: "blur(4px)",
              }}
            />

            <div
              className="absolute -inset-[8px] z-0 animate-glow-spin opacity-40 rounded-[30px]"
              style={{
                background:
                  "conic-gradient(from 180deg, hsl(var(--glow-1)), hsl(var(--glow-2)), hsl(var(--glow-3)), hsl(var(--glow-4)), hsl(var(--glow-1)))",
                filter: "blur(25px)",
                animationDirection: "reverse",
                animationDuration: "6s",
              }}
            />

            <div className="relative z-10 glass-card rounded-[22.5px] p-8 max-h-[85vh] overflow-y-auto w-full">
              <AnimatePresence mode="wait" initial={false}>
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 flex flex-col items-center"
                  >
                    <p className="text-foreground text-xl font-semibold tracking-tight">
                      Feedback received.
                    </p>
                    <p className="text-muted-foreground text-sm mt-2 mb-8">
                      Thank you for helping us build.
                    </p>

                    <button
                      type="button"
                      onClick={submitAnother}
                      className="px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      Submit Another Response
                    </button>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-4 text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h2 className="text-foreground text-xl font-semibold tracking-tight text-balance mb-6">
                      Feedback
                    </h2>

                    <div className="flex flex-col gap-4 mb-6">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/50 pb-2 focus:outline-none focus:ring-0 text-foreground text-base placeholder:text-foreground/40"
                      />
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="Designation"
                        className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/50 pb-2 focus:outline-none focus:ring-0 text-foreground text-base placeholder:text-foreground/40"
                      />
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Feedback"
                        rows={3}
                        className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/50 pb-2 focus:outline-none focus:ring-0 text-foreground text-base leading-relaxed placeholder:text-foreground/40 resize-none"
                      />
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email id"
                        className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground/50 pb-2 focus:outline-none focus:ring-0 text-foreground text-base placeholder:text-foreground/40"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading || !isFormValid}
                        className="px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
                      >
                        {loading ? (
                          <motion.div
                            className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="px-8 py-3.5 rounded-full bg-foreground text-background text-sm font-bold hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Feedback
        </motion.button>
      )}

      {typeof document !== "undefined" ? createPortal(modal, document.body) : null}
    </>
  );
};

export default FeedbackModal;
