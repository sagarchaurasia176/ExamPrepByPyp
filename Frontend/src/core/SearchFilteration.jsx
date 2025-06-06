import React, { useState, useEffect } from 'react';
import { GraduationCap, Building2, Search, FileText, Download, Eye, Star, Calendar, BookOpen, ChevronDown, ChevronUp, Filter, Grid, List, ExternalLink, Clock, User } from 'lucide-react';
import { BranchAndSemDropdown, useFilterationsForPaper } from '../hooks/FilterPaperAndDropdownConfig';
import { PaperCard } from './PaperCard';

export const SemesterBranchSelector = () => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showPapers, setShowPapers] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [expandedPaper, setExpandedPaper] = useState(null);

  // Get available filters
  const { semesters, branches, loading: filtersLoading, error: filtersError } = BranchAndSemDropdown();
  // Get papers when filters are selected
  const { papers, loading: papersLoading, error: papersError } = useFilterationsForPaper(selectedSemester, selectedBranch);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Show papers section when papers are loaded and available
    if (papers && papers.length > 0 && !papersLoading) {
      setShowPapers(true);
    }
  }, [papers, papersLoading]);

  const handleSearch = () => {
    if (papers && papers.length > 0) {
      console.log('Found papers:', papers);
      setShowPapers(true);
    }
  };


  return (
    <div className={`w-full max-w-7xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="relative group py-12 bg-slate-950 backdrop-blur-md overflow-hidden ">
        {/* Error messages */}
        {filtersError && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 max-w-5xl mx-auto">
            Error loading filters: {filtersError}
          </div>
        )}
        
        {papersError && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6 max-w-5xl mx-auto">
            Error loading papers: {papersError}
          </div>
        )}

        {/* Selector Section */}
        <div className={`relative bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-3xl container max-w-5xl mx-auto border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 ${showPapers ? 'mb-12' : ''}`}>
          <div className="relative p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Semester Selector */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6 group/header">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl group-hover/header:scale-110 transition-transform duration-300 group-hover/header:rotate-3">
                    <GraduationCap className="w-6 h-6 text-blue-400 group-hover/header:text-blue-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl font-inter group-hover/header:text-blue-100 transition-colors duration-300">
                      Select Semester
                    </h3>
                    <p className="text-slate-400 text-sm font-medium">
                      {filtersLoading ? 'Loading semesters...' : 'Choose your current semester'}
                    </p>
                  </div>
                </div>
                
                <div className="relative group/select">
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    disabled={filtersLoading}
                    className="w-full  bg-slate-800/60 border border-slate-700/60 rounded-2xl px-6 py-5 text-black text-base font-semibold font-inter focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 transition-all duration-300 cursor-pointer"
                  >
                    <option value="" disabled className="text-slate-800 bg-slate-800">
                      {filtersLoading ? 'Loading...' : 'Choose your semester'}
                    </option>
                    {semesters && semesters.map((semester) => (
                      <option className='text-white bg-slate-800' key={semester.value} value={semester.value}>
                        {semester.label}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSemester && (
                  <div className="flex items-center space-x-3 text-emerald-400 text-sm mt-4 font-semibold animate-pulse">
                    ✓ Semester {selectedSemester} selected
                  </div>
                )}
              </div>

              {/* Branch Selector */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6 group/header">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl group-hover/header:scale-110 transition-transform duration-300 group-hover/header:rotate-3">
                    <Building2 className="w-6 h-6 text-purple-400 group-hover/header:text-purple-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl font-inter group-hover/header:text-purple-100 transition-colors duration-300">
                      Select Branch
                    </h3>
                    <p className="text-slate-400 text-sm font-medium">
                      {filtersLoading ? 'Loading branches...' : 'Choose your engineering branch'}
                    </p>
                  </div>
                </div>
                
                <div className="relative group/select">
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    disabled={filtersLoading}
                    className="w-full appearance-none bg-slate-800/60 backdrop-blur-md border border-slate-700/60 rounded-2xl px-6 py-5 text-black text-base font-semibold font-inter focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/60 transition-all duration-300 cursor-pointer"
                  >
                    <option value="" disabled className="text-slate-400 bg-slate-800">
                      {filtersLoading ? 'Loading...' : 'Choose your branch'}
                    </option>
                    {branches && branches.map((branch) => (
                      <option className='text-white bg-slate-800' key={branch.value} value={branch.value}>
                        {branch.label}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedBranch && (
                  <div className="flex items-center space-x-3 text-emerald-400 text-sm mt-4 font-semibold animate-pulse">
                    ✓ {branches && branches.find(b => b.value === selectedBranch)?.label} selected
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            {selectedSemester && selectedBranch && (
              <div className="mt-12 text-center">
                <button 
                  onClick={handleSearch}
                  disabled={papersLoading}
                  className={`group relative inline-flex items-center space-x-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold px-10 py-5 rounded-2xl transition-all duration-300 font-inter overflow-hidden ${
                    papersLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-110 hover:-translate-y-1 shadow-2xl hover:shadow-3xl'
                  }`}
                >
                  {papersLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-lg font-semibold">Loading Papers...</span>
                    </div>
                  ) : (
                    <>
                      <Search className="w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                      <span className="relative z-10 text-lg text-white font-semibold">
                        {papers && papers.length > 0 ? `View ${papers.length} Papers` : 'Find Papers Now'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Papers Display Section */}
        {showPapers && papers && papers.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Available Papers
                </h2>
                <p className="text-slate-400">
                  Found {papers.length} papers for Semester {selectedSemester} - {branches && branches.find(b => b.value === selectedBranch)?.label}
                </p>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-md rounded-xl p-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Papers Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {papers.map((paper, index) => (
                <div
                  key={paper.id || paper._id || index}
                  className="animate-slide-up opacity-0"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <PaperCard
                    paper={paper}
                    isExpanded={expandedPaper === (paper.id || paper._id || index)}
                    onToggle={() => {
                      const paperId = paper.id || paper._id || index;
                      setExpandedPaper(expandedPaper === paperId ? null : paperId);
                    }}
                  />

                  
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {showPapers && papers && papers.length === 0 && (
          <div className="max-w-6xl mx-auto px-4 text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-slate-800/60 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No papers found</h3>
            <p className="text-slate-400">No papers available for the selected semester and branch combination.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};