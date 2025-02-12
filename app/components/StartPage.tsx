"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const TARGET_ICON = "icons/adiyogi-icon.png";

interface StartPageProps {
  onStart: () => void;
}

export default function StartPage({ onStart }: StartPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid text-center max-w-md mx-auto px-2 gap-6"
    >
      <h1 className="text-4xl font-bold">Spot Adiyogi</h1>
      <p className="">
        Tap the Adiyogi symbol as fast as you can!
        <br /> Be quick and calm to score high!
      </p>
      <div className="grid place-content-center gap-2">
        <ArrowDown className="w-12 h-12 mx-auto text-yellow-400 animate-bounce" />
        <img
          src={`/${TARGET_ICON}`}
          alt="Target Icon"
          className="w-32 h-32 border-2 border-yellow-400 rounded-lg"
        />
      </div>
      <Button
        onClick={onStart}
        className="bg-yellow-400 text-black hover:bg-yellow-500"
      >
        Start Game
      </Button>
    </motion.div>
  );
}
