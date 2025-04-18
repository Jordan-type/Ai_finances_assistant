"use client";

import React from "react";

const CustomModal = ({ isOpen, onClose, children }: CustomFixedModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      {/* Click outside to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal Drawer Content */}
      <div
        className="relative z-50 w-full max-w-md h-full overflow-y-auto bg-white dark:bg-zinc-900 shadow-xl transform transition-transform animate-slide-in-right"
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
