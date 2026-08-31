import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  GitCommit,
  Copy,
  Check,
  FileText,
  Tag,
  Share2,
  RefreshCw,
  Zap,
  Code2,
  ListChecks,
} from 'lucide-react';
import {
  RepositoryState,
  ConventionalCommitType,
  GeneratedCommitSuggestion,
  GeneratedChangelog,
  GeneratedReleaseNotes,
} from '../types';

interface AICommitGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: RepositoryState;
  onApplyCommit?: (commitMessage: string) => void;
}

export const AICommitGeneratorModal: React.FC<AICommitGeneratorModalProps> = ({
  isOpen,
  onClose,
  state,
  onApplyCommit,
}) => {
  const [activeTab, setActiveTab] = useState<'commit' | 'changelog' | 'release'>('commit');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state
  const [selectedType, setSelectedType] = useState<ConventionalCommitType>('feat');
  const [customScope, setCustomScope] = useState<string>('auth');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Suggestions state
  const [suggestions, setSuggestions] = useState<GeneratedCommitSuggestion[]>([
    {
      id: 'c-1',
      type: 'feat',
      scope: 'auth',
      subject: 'add SSO login support & PKCE token rotation',
      body: 'Implement PKCE flow for OAuth2 refresh tokens and sanitize session payload.',
      formattedCommit: 'feat(auth): add SSO login support & PKCE token rotation',
      reasoning: 'Changes in authService.ts add new OAuth2 authentication capabilities.',
    },
    {
      id: 'c-2',
      type: 'fix',
      scope: 'api',
      subject: 'handle expired refresh tokens gracefully',
      body: 'Add explicit exception handling to prevent session termination crash.',
      formattedCommit: 'fix(api): handle expired refresh tokens gracefully',
      reasoning: 'Resolves unhandled rejection when refresh token expires during sync.',
    },
    {
      id: 'c-3',
      type: 'refactor',
      scope: 'ui',
      subject: 'simplify navbar rendering & improve text contrast',
      body: 'Consolidate top-bar status badges and optimize mobile header layout.',
      formattedCommit: 'refactor(ui): simplify navbar rendering & improve text contrast',
      reasoning: 'De-clutters header navigation and improves accessibility score.',
    },
  ]);

  const [changelog, setChangelog] = useState<GeneratedChangelog>({
    version: 'v1.4.0',
    date: new Date().toISOString().split('T')[0],
    features: [
      'feat(auth): implement SSO login support & PKCE token rotation (#214)',
      'feat(ci): add CI/CD pipeline health companion drawer (#198)',
      'feat(pr): add Pull Request Intelligence and reviewer comments feed (#205)',
    ],
    fixes: [
      'fix(api): handle expired refresh tokens without session termination (#212)',
      'fix(ui): eliminate header badge crowding and improve visual contrast (#220)',
    ],
    refactors: [
      'refactor(ui): simplify navbar rendering and optimize component state (#218)',
    ],
    breakingChanges: [],
    formattedMarkdown: `## 📦 Release v1.4.0 (${new Date().toISOString().split('T')[0]})

### 🚀 Features
- **auth**: implement SSO login support & PKCE token rotation (#214)
- **ci**: add CI/CD pipeline health companion drawer (#198)
- **pr**: add Pull Request Intelligence and reviewer comments feed (#205)

### 🐛 Bug Fixes
- **api**: handle expired refresh tokens without session termination (#212)
- **ui**: eliminate header badge crowding and improve visual contrast (#220)

### 🛠️ Refactoring
- **ui**: simplify navbar rendering and optimize component state (#218)`,
  });

  const [releaseNotes, setReleaseNotes] = useState<GeneratedReleaseNotes>({
    title: 'GitPet v1.4.0: Pull Request Intelligence & Simplified UI',
    version: 'v1.4.0',
    summary:
      'GitPet now understands pull requests, review comments, and pipeline health with a streamlined high-contrast interface.',
    highlights: [
      '🔀 **Pull Request Intelligence**: Track review approvals, requested changes, and inline comments.',
      '⚡ **CI/CD Health Companion**: Monitor build step pipelines, flaky tests, and CVE security scans.',
      '✨ **UI Usability Overhaul**: Simplified top bar navigation, unified DevOps Hub, and organized scenario presets.',
      '📝 **AI Commit Generator**: Auto-generate Conventional Commits, Changelogs, and Release Notes.',
    ],
    contributors: ['@lucas-whitaker', '@sarah-chen', '@marcus-vance'],
    formattedMarkdown: `# 🚀 GitPet v1.4.0 - Pull Request Intelligence & Simplified UI

We are excited to announce **GitPet v1.4.0**! This release extends your ambient repository companion beyond standard Git drift into full CI/CD pipeline health and PR intelligence.

### 🌟 Key Highlights
- 🔀 **Pull Request Intelligence**: Track review approvals, requested changes, and inline comments directly on your mascot stage.
- ⚡ **CI/CD Health Companion**: Monitor build step pipelines, flaky test specs, and CVE security scans in real-time.
- ✨ **UI Usability Overhaul**: Replaced cluttered top bar badges with a clean dark-glass navbar and unified DevOps Hub drawer launchers.
- 📝 **AI Commit Generator**: Automatically synthesize working tree changes into Conventional Commits, Changelogs, and GitHub Release Notes.

### 🤝 Contributors
Thank you to @lucas-whitaker, @sarah-chen, and @marcus-vance for their code contributions!`,
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const scopeName = customScope.trim() || 'core';
      const newSuggestion: GeneratedCommitSuggestion = {
        id: `c-${Date.now()}`,
        type: selectedType,
        scope: scopeName,
        subject: `${selectedType === 'feat' ? 'add' : selectedType === 'fix' ? 'resolve' : 'optimize'} ${scopeName} implementation`,
        body: `Analyzed ${state.workingTree.length || 2} modified files in working directory.`,
        formattedCommit: `${selectedType}(${scopeName}): ${selectedType === 'feat' ? 'add' : selectedType === 'fix' ? 'resolve' : 'optimize'} ${scopeName} implementation`,
        reasoning: `Extracted from staged changes in ${state.currentBranch.name}.`,
      };
      setSuggestions([newSuggestion, ...suggestions.slice(0, 2)]);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] z-10"
          >
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/30 flex items-center justify-center text-purple-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <span>AI Commit & Release Generator</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded border border-purple-400/30 uppercase">
                      Conventional Commits
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Analyze working tree diffs to generate standardized commits, changelogs, and release notes
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Segment Tabs */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50 px-5 pt-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('commit')}
                className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'commit'
                    ? 'border-purple-600 text-purple-700 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>Conventional Commits</span>
              </button>

              <button
                onClick={() => setActiveTab('changelog')}
                className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'changelog'
                    ? 'border-purple-600 text-purple-700 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <ListChecks className="w-3.5 h-3.5" />
                <span>Auto Changelog</span>
              </button>

              <button
                onClick={() => setActiveTab('release')}
                className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'release'
                    ? 'border-purple-600 text-purple-700 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Release Notes</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-5">
              {activeTab === 'commit' && (
                <div className="space-y-5">
                  {/* Scope & Type Controls */}
                  <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Commit Generator Controls
                      </span>
                      <button
                        onClick={handleRegenerate}
                        disabled={isGenerating}
                        className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                        <span>{isGenerating ? 'Analyzing Diffs...' : 'Generate Suggestions'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Commit Type
                        </label>
                        <select
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value as ConventionalCommitType)}
                          className="w-full font-mono text-xs rounded-lg border border-slate-300 bg-white p-2 text-slate-800 font-semibold"
                        >
                          <option value="feat">feat (New feature support)</option>
                          <option value="fix">fix (Bug resolution)</option>
                          <option value="refactor">refactor (Code restructuring)</option>
                          <option value="perf">perf (Performance boost)</option>
                          <option value="docs">docs (Documentation)</option>
                          <option value="test">test (Unit test specs)</option>
                          <option value="chore">chore (Maintenance & dependencies)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Component Scope
                        </label>
                        <input
                          type="text"
                          value={customScope}
                          onChange={(e) => setCustomScope(e.target.value)}
                          placeholder="e.g. auth, api, ui, cart"
                          className="w-full font-mono text-xs rounded-lg border border-slate-300 bg-white p-2 text-slate-800 font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Suggestions List */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-purple-600" />
                      <span>Generated Conventional Commit Options</span>
                    </h3>

                    {suggestions.map((sug) => (
                      <div
                        key={sug.id}
                        className="p-4 bg-white border border-slate-200 rounded-xl space-y-2.5 shadow-2xs hover:border-purple-300 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {sug.formattedCommit}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleCopy(sug.formattedCommit, sug.id)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              {copiedId === sug.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-slate-500" />
                              )}
                              <span>{copiedId === sug.id ? 'Copied' : 'Copy'}</span>
                            </button>

                            {onApplyCommit && (
                              <button
                                onClick={() => {
                                  onApplyCommit(sug.formattedCommit);
                                  onClose();
                                }}
                                className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Zap className="w-3.5 h-3.5" />
                                <span>Apply Commit</span>
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 font-medium">{sug.body}</p>
                        <div className="text-[11px] text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg font-mono">
                          🔍 Reasoning: {sug.reasoning}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'changelog' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span>Automated Repository Changelog ({changelog.version})</span>
                    </h3>

                    <button
                      onClick={() => handleCopy(changelog.formattedMarkdown, 'changelog-markdown')}
                      className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedId === 'changelog-markdown' ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy Changelog Markdown</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs rounded-xl space-y-2 leading-relaxed">
                    <pre className="whitespace-pre-wrap">{changelog.formattedMarkdown}</pre>
                  </div>
                </div>
              )}

              {activeTab === 'release' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-purple-600" />
                      <span>Synthesized Release Notes ({releaseNotes.version})</span>
                    </h3>

                    <button
                      onClick={() => handleCopy(releaseNotes.formattedMarkdown, 'release-markdown')}
                      className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedId === 'release-markdown' ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy Release Notes</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs rounded-xl space-y-2 leading-relaxed">
                    <pre className="whitespace-pre-wrap">{releaseNotes.formattedMarkdown}</pre>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                Standardized via Conventional Commits v1.0.0
              </span>

              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
