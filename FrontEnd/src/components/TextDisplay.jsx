import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TextDisplay = ({ commentaire = "", maxLength = 100 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const isLong = commentaire.length > maxLength;
  const displayedText =
    expanded || !isLong ? commentaire : commentaire.slice(0, maxLength) + "...";

  return (
    <div className="relative min-w-[200px]">
      <AnimatePresence>
        <motion.div
          key={expanded ? "expanded" : "collapsed"}
          initial={{ opacity: 0, y: -10, position: expanded ? "absolute" : "relative" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`text-gray-800 text-sm ${
            expanded
              ? "absolute bg-white p-2 shadow-lg z-10 w-full top-0 left-0 max-h-[150px] overflow-scroll custom-scrollbar"
              : ""
          }`}
        >
          {displayedText}
          {isLong && (
            <button
              onClick={toggleExpanded}
              className="text-red-500 text-xs mt-1 focus:outline-none cursor-pointer block"
            >
              {expanded ? "Voir moins" : "Voir plus"}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextDisplay;
