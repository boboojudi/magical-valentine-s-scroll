import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SadScreenProps {
  photoUrl?: string | null;
  onTryAgain: () => void;
}

const GESTURES = [
  { emoji: "👆", label: "Swipe up to reconsider!", direction: "up" as const },
  { emoji: "🔄", label: "Spin to change your mind!", direction: "spin" as const },
  { emoji: "👏", label: "Tap 5 times to reconsider!", direction: "tap" as const },
];

const SadScreen = ({ photoUrl, onTryAgain }: SadScreenProps) => {
  const [gestureIndex] = useState(() => Math.floor(Math.random() * GESTURES.length));
  const [tapCount, setTapCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const gesture = GESTURES[gestureIndex];

  const handleGesture = () => {
    if (gesture.direction === "tap") {
      const next = tapCount + 1;
      setTapCount(next);
      if (next >= 5) setCompleted(true);
    } else {
      setCompleted(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-6 px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="text-6xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        😢
      </motion.div>

      <h2
        className="text-2xl font-serif font-bold"
        style={{ color: "hsl(var(--valentine-ink))" }}
      >
        "After all this time?"... "Always."
      </h2>

      {photoUrl && (
        <motion.img
          src={photoUrl}
          alt="Sad moment"
          className="w-48 h-48 object-cover rounded-2xl shadow-lg opacity-80"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        />
      )}

      {!completed ? (
        <motion.div
          className="mt-4 p-6 rounded-xl cursor-pointer select-none"
          style={{ background: "hsl(var(--valentine-parchment))" }}
          onClick={handleGesture}
          whileTap={{ scale: 0.9 }}
          drag={gesture.direction === "up" ? "y" : false}
          dragConstraints={{ top: -100, bottom: 0 }}
          onDragEnd={(_, info) => {
            if (gesture.direction === "up" && info.offset.y < -80) {
              setCompleted(true);
            }
          }}
          animate={gesture.direction === "spin" ? { rotate: [0, 360] } : undefined}
          transition={gesture.direction === "spin" ? { duration: 2, repeat: Infinity, ease: "linear" } : undefined}
        >
          <p className="text-3xl mb-2">{gesture.emoji}</p>
          <p className="font-serif" style={{ color: "hsl(var(--valentine-ink))" }}>
            {gesture.label}
            {gesture.direction === "tap" && ` (${tapCount}/5)`}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="space-y-4"
        >
          <p className="font-serif text-lg" style={{ color: "hsl(var(--valentine-crimson))" }}>
            Perhaps reconsider? 🪄
          </p>
          <Button
            onClick={onTryAgain}
            className="font-serif rounded-full px-8"
            style={{
              background: "hsl(var(--valentine-crimson))",
              color: "hsl(var(--valentine-gold))",
            }}
          >
            Try Again ✨
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SadScreen;
