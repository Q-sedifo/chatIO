"use client"
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<IModalProps> = ({ children, onClose }) => {
  // Remove scroll during modal is open
  useEffect(() => {
    const body = document.body

    body.style.overflowY = "hidden"

    return () => {
      body.style.overflowY = "auto"
    }
  }, [])

  const handleCloseModal = () => {
    onClose()
  }

  if (typeof window === "undefined") return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleCloseModal}
      >
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: 0.5 }}
        />
        <div
          className="relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById("modal") as Element
  )
}