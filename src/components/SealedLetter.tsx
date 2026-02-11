import { motion } from "framer-motion";

interface SealedLetterProps {
  onOpen: () => void;
}

const SealedLetter = ({ onOpen }: SealedLetterProps) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-6 cursor-pointer select-none"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.8 }}
      onClick={onOpen}
    >
      <motion.div
        className="relative w-72 h-48 rounded-lg shadow-2xl overflow-hidden"
        style={{ background: "hsl(var(--valentine-parchment))" }}
        whileHover={{ scale: 1.05, rotateZ: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Envelope flap */}
        <div
          className="absolute top-0 left-0 w-full h-0 border-l-[144px] border-r-[144px] border-t-[80px] border-l-transparent border-r-transparent"
          style={{ borderTopColor: "hsl(var(--valentine-crimson) / 0.15)" }}
        />
        {/* Wax seal */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-serif shadow-lg z-10"
          style={{
            background: "hsl(var(--valentine-wax))",
            color: "hsl(var(--valentine-gold))",
          }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          ⚡
        </motion.div>
        {/* Decorative lines */}
        <div className="absolute bottom-6 left-8 right-8 space-y-2">
          <div className="h-0.5 rounded" style={{ background: "hsl(var(--valentine-ink) / 0.1)" }} />
          <div className="h-0.5 w-3/4 rounded" style={{ background: "hsl(var(--valentine-ink) / 0.08)" }} />
        </div>
      </motion.div>

      <motion.p
        className="text-sm font-serif italic"
        style={{ color: "hsl(var(--valentine-ink) / 0.6)" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Tap to break the seal...
      </motion.p>
    </motion.div>
  );
};

export default SealedLetter;
