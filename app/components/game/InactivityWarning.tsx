import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface InactivityWarningProps {
  onContinue: () => void;
}

export function InactivityWarning({ onContinue }: InactivityWarningProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
    >
      <div className="bg-slate-800 p-6 rounded-lg max-w-sm w-full text-center">
        <h3 className="text-xl font-bold mb-4">Are you still there?</h3>
        <p className="mb-6">The game will end in 10 seconds due to inactivity.</p>
        <Button onClick={onContinue} className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
          Continue Playing
        </Button>
      </div>
    </motion.div>
  );
}