import React from 'react';
import { FileText, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PaperCard = ({ paper, isExpanded, onToggle }) => {
  const defaultSem = 'N/A';
  const defaultBranch = 'N/A';

  const title = paper.title || 'N/A';
  const semester = paper.sem || defaultSem;
  const branch = paper.branch || defaultBranch;
  const fileUrl = paper.fileurl || paper.fileUrl;

  return (
    <motion.div
      layout
      className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/40 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
              <FileText className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-white font-bold text-lg group-hover:text-indigo-100 transition-colors duration-300 line-clamp-2">
              {title}
            </h3>
          </div>
          <motion.button
            whileTap={{ rotate: 90 }}
            onClick={onToggle}
            className="text-indigo-400 hover:text-indigo-200 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-purple-400 bg-purple-500/20">
            Sem {semester}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-orange-400 bg-orange-500/20">
            {String(branch ?? 'N/A').toUpperCase()}
          </span>
        </div>

        {/* Expandable Section */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 overflow-hidden"
            >
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
                  <div>
                    <span className="font-semibold text-slate-400">Semester:</span> {semester}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400">Branch:</span> {branch}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-slate-400">Title:</span> {title}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            {fileUrl ? (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open(fileUrl, '_blank')}
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Download</span>
              </motion.button>
            ) : (
              <button
                disabled
                className="flex items-center space-x-2 bg-slate-600/20 text-slate-500 px-4 py-2 rounded-xl cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Not Available</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
