import { useState, useEffect, useCallback } from "react";
import { RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import SealedLetter from "@/components/SealedLetter";
import OpenLetter from "@/components/OpenLetter";
import CelebrationScreen from "@/components/CelebrationScreen";
import SadScreen from "@/components/SadScreen";
import SettingsPanel from "@/components/SettingsPanel";
import { supabase } from "@/integrations/supabase/client";

type AppState = "sealed" | "open" | "yes" | "no";

const Index = () => {
  const [state, setState] = useState<AppState>("sealed");
  const [happyUrl, setHappyUrl] = useState<string | null>(null);
  const [sadUrl, setSadUrl] = useState<string | null>(null);
  const [photoKey, setPhotoKey] = useState(0);

  const loadPhotos = useCallback(async () => {
    const bucket = supabase.storage.from("valentine-photos");

    // List files to find the actual filenames
    const { data: files } = await bucket.list();
    if (!files) return;

    const happyFile = files.find((f) => f.name.startsWith("happy."));
    const sadFile = files.find((f) => f.name.startsWith("sad."));

    if (happyFile) {
      const { data } = bucket.getPublicUrl(happyFile.name);
      setHappyUrl(data.publicUrl + "?t=" + Date.now());
    }
    if (sadFile) {
      const { data } = bucket.getPublicUrl(sadFile.name);
      setSadUrl(data.publicUrl + "?t=" + Date.now());
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos, photoKey]);

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "hsl(var(--valentine-parchment))" }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-pulse">⚡</div>
        <div className="absolute top-20 right-20 text-4xl animate-bounce">🪄</div>
        <div className="absolute bottom-20 left-1/4 text-5xl animate-pulse">✨</div>
        <div className="absolute bottom-10 right-1/3 text-3xl animate-bounce">🦉</div>
      </div>

      {/* Reset button */}
      {state !== "sealed" && (
        <motion.button
          className="fixed top-4 right-4 z-50 p-2 rounded-full opacity-30 hover:opacity-100 transition-opacity"
          style={{ color: "hsl(var(--valentine-ink))" }}
          onClick={() => setState("sealed")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          whileHover={{ opacity: 1, rotate: -180 }}
          title="Reset"
        >
          <RotateCcw size={20} />
        </motion.button>
      )}

      {/* Settings */}
      <SettingsPanel onPhotoUploaded={() => setPhotoKey((k) => k + 1)} />

      {/* Main content */}
      <main className="relative z-10">
        {state === "sealed" && <SealedLetter onOpen={() => setState("open")} />}
        {state === "open" && (
          <OpenLetter onYes={() => setState("yes")} onNo={() => setState("no")} />
        )}
        {state === "yes" && <CelebrationScreen photoUrl={happyUrl} />}
        {state === "no" && (
          <SadScreen photoUrl={sadUrl} onTryAgain={() => setState("open")} />
        )}
      </main>
    </div>
  );
};

export default Index;
