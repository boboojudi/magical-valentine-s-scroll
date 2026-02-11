import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface OpenLetterProps {
  onYes: () => void;
  onNo: () => void;
}

const OpenLetter = ({ onYes, onNo }: OpenLetterProps) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-8 px-4"
      initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ type: "spring", duration: 0.8 }}
    >
      <motion.div
        className="max-w-md w-full rounded-xl p-8 shadow-2xl border"
        style={{
          background: "hsl(var(--valentine-parchment))",
          borderColor: "hsl(var(--valentine-gold) / 0.3)",
        }}
      >
        <div className="text-center space-y-6">
          <motion.div
            className="text-4xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            💌
          </motion.div>

          <h2
            className="text-2xl font-serif font-bold"
            style={{ color: "hsl(var(--valentine-crimson))" }}
          >
            Dearest One,
          </h2>

          <p
            className="font-serif text-lg leading-relaxed"
            style={{ color: "hsl(var(--valentine-ink))" }}
          >
            By the magic of Dumbledore's beard and the enchantment of a thousand
            love potions... Will you be my Valentine? ⚡🪄
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={onYes}
                className="px-8 py-3 text-lg font-serif rounded-full shadow-lg"
                style={{
                  background: "hsl(var(--valentine-crimson))",
                  color: "hsl(var(--valentine-gold))",
                }}
              >
                Yes! ✨
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={onNo}
                variant="outline"
                className="px-8 py-3 text-lg font-serif rounded-full"
                style={{
                  borderColor: "hsl(var(--valentine-ink) / 0.3)",
                  color: "hsl(var(--valentine-ink))",
                }}
              >
                No 😢
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OpenLetter;
