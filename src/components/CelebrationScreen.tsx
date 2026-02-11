import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface CelebrationScreenProps {
  photoUrl?: string | null;
}

const CelebrationScreen = ({ photoUrl }: CelebrationScreenProps) => {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#b8860b", "#8b0000", "#ffd700"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#b8860b", "#8b0000", "#ffd700"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center gap-8 px-4 text-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
    >
      <motion.div
        className="text-6xl"
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        🎉
      </motion.div>

      <h1
        className="text-4xl font-serif font-bold"
        style={{ color: "hsl(var(--valentine-crimson))" }}
      >
        Mischief Managed! 💕
      </h1>

      <p
        className="text-xl font-serif max-w-md"
        style={{ color: "hsl(var(--valentine-ink))" }}
      >
        "I solemnly swear that we are up to no good... together, forever." ⚡
      </p>

      {photoUrl && (
        <motion.img
          src={photoUrl}
          alt="Happy moment"
          className="w-64 h-64 object-cover rounded-2xl shadow-2xl border-4"
          style={{ borderColor: "hsl(var(--valentine-gold))" }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
      )}
    </motion.div>
  );
};

export default CelebrationScreen;
