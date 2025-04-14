import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CertificateModal = ({ isOpen, onClose, certificate_url, title }) => {
  const previewUrl = useMemo(() => {
    if (!certificate_url) return null;

    // Handle Google Drive URLs
    if (certificate_url.includes('drive.google.com')) {
      const fileId = certificate_url.match(/\/d\/(.*?)\/|id=(.*?)(&|$)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    return certificate_url;
  }, [certificate_url]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-4xl w-full mx-4 bg-[#0B021A] border border-[#aed2ff]/20 rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-[#aed2ff]/20">
            <h3 className="text-xl font-semibold text-[#aed2ff]">{title}</h3>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4">
            {previewUrl ? (
              <div className="relative min-h-[200px] flex items-center justify-center">
                {previewUrl.includes('drive.google.com/file') ? (
                  <iframe
                    src={previewUrl}
                    className="w-full h-[70vh] rounded"
                    allow="autoplay"
                    title={`${title} Document`}
                  />
                ) : (
                  <>
                    <img
                      src={previewUrl}
                      alt={`${title} Certificate`}
                      className="w-full h-auto rounded max-h-[70vh] object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-center py-8 text-gray-400">
                      Failed to load certificate
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                Certificate not available
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificateModal;
