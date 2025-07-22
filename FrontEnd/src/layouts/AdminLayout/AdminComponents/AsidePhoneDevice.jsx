import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.1 },
  }),
  exit: { x: -50, opacity: 0, transition: { duration: 0.2 } },
};

const subVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -10 },
};

export default function AsidePhoneDevice({ recentCourtiers = [], links = [] }) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="lg:hidden fixed top-30 left-3 z-49 rounded-md p-2">
      <button
        onClick={() => setOpen(!open)}
        className="bg-[#161a1d] text-white p-1 rounded"
      >
        {open ? (
          <PanelRightOpen className="w-6 h-6" />
        ) : (
          <PanelRightClose className="w-6 h-6" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-4 relative space-y-2"
          >
            {links.map((link, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                custom={i}
                className="relative"
              >
                {link.isDropdown ? (
                  <div
                    className="flex items-center gap-2 bg-[#161a1d] text-white shadow p-2 rounded-md hover:bg-gray-200 hover:text-[#161a1d] cursor-pointer"
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === link.key ? null : link.key
                      )
                    }
                  >
                    {link.icon}
                    <span className="text-sm">{link.label}</span>
                  </div>
                ) : (
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 bg-[#161a1d] text-white shadow p-2 rounded-md hover:bg-gray-200 hover:text-[#161a1d] cursor-pointer"
                  >
                    {link.icon}
                    <span className="text-sm">{link.label}</span>
                  </Link>
                )}

                <AnimatePresence>
                  {link.isDropdown && openDropdown === link.key && (
                    <motion.div
                      className="absolute left-full top-0 ml-2 bg-[#161a1d] text-white rounded shadow p-2 space-y-2 z-50 w-52"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={subVariants}
                    >
                      {link.subLinks.map((sub, idx) => (
                        <motion.div
                          key={idx}
                          variants={itemVariants}
                          custom={idx}
                        >
                          <Link
                            to={sub.to}
                            className="flex justify-between items-center text-sm p-2 hover:bg-gray-100 rounded"
                          >
                            <span>{sub.label}</span>
                            {sub.badge ? (
                              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                {sub.badge}
                              </span>
                            ) : null}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
