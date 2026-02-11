import { useState, useRef } from "react";
import { Settings, Upload, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SettingsPanelProps {
  onPhotoUploaded: () => void;
}

const SettingsPanel = ({ onPhotoUploaded }: SettingsPanelProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [uploadingHappy, setUploadingHappy] = useState(false);
  const [uploadingSad, setUploadingSad] = useState(false);
  const happyRef = useRef<HTMLInputElement>(null);
  const sadRef = useRef<HTMLInputElement>(null);

  const uploadPhoto = async (file: File, type: "happy" | "sad") => {
    const setter = type === "happy" ? setUploadingHappy : setUploadingSad;
    setter(true);
    try {
      const path = `${type}.${file.name.split(".").pop()}`;
      const { error } = await supabase.storage
        .from("valentine-photos")
        .upload(path, file, { upsert: true });
      if (error) throw error;
      toast.success(`${type === "happy" ? "Happy" : "Sad"} photo uploaded!`);
      onPhotoUploaded();
    } catch (e: any) {
      toast.error(e.message || "Upload failed");
    } finally {
      setter(false);
    }
  };

  const sendEmail = async () => {
    if (!email) return toast.error("Enter an email address");
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-valentine-email", {
        body: { to: email },
      });
      if (error) throw error;
      toast.success("Owl dispatched! 🦉");
      setEmail("");
    } catch (e: any) {
      toast.error(e.message || "Failed to send");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <motion.button
        className="fixed top-4 left-4 z-50 p-2 rounded-full opacity-30 hover:opacity-100 transition-opacity"
        style={{ color: "hsl(var(--valentine-ink))" }}
        onClick={() => setOpen(!open)}
        whileHover={{ rotate: 90 }}
      >
        <Settings size={20} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <motion.div
              className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl space-y-6 border"
              style={{
                background: "hsl(var(--valentine-parchment))",
                borderColor: "hsl(var(--valentine-gold) / 0.3)",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                className="absolute top-3 right-3 opacity-50 hover:opacity-100"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>

              <h3 className="font-serif text-lg font-bold" style={{ color: "hsl(var(--valentine-crimson))" }}>
                ⚙️ Owl Post Settings
              </h3>

              {/* Photo uploads */}
              <div className="space-y-3">
                <p className="text-sm font-serif" style={{ color: "hsl(var(--valentine-ink) / 0.7)" }}>
                  Upload custom photos
                </p>
                <input ref={happyRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => e.target.files?.[0] && uploadPhoto(e.target.files[0], "happy")} />
                <input ref={sadRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => e.target.files?.[0] && uploadPhoto(e.target.files[0], "sad")} />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 font-serif text-xs"
                    onClick={() => happyRef.current?.click()}
                    disabled={uploadingHappy}
                  >
                    <Upload size={14} />
                    {uploadingHappy ? "Uploading..." : "Happy Photo 😊"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 font-serif text-xs"
                    onClick={() => sadRef.current?.click()}
                    disabled={uploadingSad}
                  >
                    <Upload size={14} />
                    {uploadingSad ? "Uploading..." : "Sad Photo 😢"}
                  </Button>
                </div>
              </div>

              {/* Email sending */}
              <div className="space-y-3">
                <p className="text-sm font-serif" style={{ color: "hsl(var(--valentine-ink) / 0.7)" }}>
                  Send valentine via owl post
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="wizard@hogwarts.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-sm font-serif"
                  />
                  <Button
                    size="sm"
                    onClick={sendEmail}
                    disabled={sending}
                    style={{
                      background: "hsl(var(--valentine-crimson))",
                      color: "hsl(var(--valentine-gold))",
                    }}
                  >
                    <Send size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsPanel;
