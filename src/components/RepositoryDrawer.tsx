import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  GitBranch,
  GitCommit,
  FileCode,
  Archive,
  History,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowDown,
  ArrowUp,
  Layers,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { RepositoryState, FileChange, DagCommitNode } from '../types';
import { GitDagVisualizer } from './GitDagVisualizer';
import { DiffViewer } from './DiffViewer';

interface RepositoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  state: RepositoryState;
  onSelectFile?: (file: FileChange) => void;
  auditHistory: {
    id: string;
    command: string;
    timestamp: string;
    description: string;
  }[];
  onRollbackLastAction?: () => void;
  onOpenCommitGenerator?: () => void;
}

export const RepositoryDrawer: React.FC<RepositoryDrawerProps> = ({
  isOpen,
  onClose,
  state,
  auditHistory,
  onRollbackLastAction,
  onOpenCommitGenerator,
}) => {
  const [activeTab, setActiveTab] = useState<'working_tree' | 'divergence' | 'stashes' | 'audit'>(
    'working_tree'
  );
  const [expandedFile, setExpandedFile] = useState<string | null>(
    state.workingTree.length > 0 ? state.workingTree[0].path : null
  );
  const [selectedCommitId, setSelectedCommitId] = useState<string | null>(null);

  // Clear node selection whenever drawer closes or activeTab changes
  useEffect(() => {
    if (!isOpen) {
      setSelectedCommitId(null);
    }
  }, [isOpen]);

  const handleClose = () => {
    setSelectedCommitId(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={handleClose} />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        >
          <div className="w-screen max-w-md sm:max-w-lg bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col text-slate-900 dark:text-slate-100">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/90 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white shadow-2xs">
                  <Layers className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Repository Details & Graph</h3>
                    {state.isLiveMode && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    {state.repoName} {state.scannedAt ? `• ${new Date(state.scannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <button
                onClick={() => setActiveTab('working_tree')}
                className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'working_tree'
                    ? 'border-[#BD006E] text-[#BD006E] dark:text-pink-400 font-bold'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Working Tree</span>
                {state.workingTree.length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                    {state.workingTree.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('divergence')}
                className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'divergence'
                    ? 'border-[#BD006E] text-[#BD006E] dark:text-pink-400 font-bold'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Divergence</span>
              </button>

              <button
                onClick={() => setActiveTab('stashes')}
                className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'stashes'
                    ? 'border-[#BD006E] text-[#BD006E] dark:text-pink-400 font-bold'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Archive className="w-3.5 h-3.5" />
                <span>Stashes</span>
                {state.stashes.length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                    {state.stashes.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeTab === 'audit'
                    ? 'border-[#BD006E] text-[#BD006E] dark:text-pink-400 font-bold'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Audit Log</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-left">
              {/* TAB 1: WORKING TREE */}
              {activeTab === 'working_tree' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Uncommitted changes ({state.workingTree.length} files)</span>
                    {onOpenCommitGenerator && (
                      <button
                        onClick={onOpenCommitGenerator}
                        className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>⚡</span>
                        <span>AI Conventional Commit</span>
                      </button>
                    )}
                  </div>

                  {state.workingTree.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50/70 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Working tree clean</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        No untracked or modified files present in workspace.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {state.workingTree.map((file) => (
                        <div
                          key={file.path}
                          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 overflow-hidden shadow-2xs"
                        >
                          <button
                            onClick={() =>
                              setExpandedFile(expandedFile === file.path ? null : file.path)
                            }
                            className="w-full px-3.5 py-2.5 bg-slate-50/70 dark:bg-slate-800/60 hover:bg-slate-100/70 dark:hover:bg-slate-700 flex items-center justify-between text-xs transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2 font-mono text-slate-800 dark:text-slate-200">
                              {expandedFile === file.path ? (
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                              )}
                              <span className="font-semibold">{file.path}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase font-mono ${
                                  file.status === 'conflicted'
                                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                                }`}
                              >
                                {file.status}
                              </span>
                              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                                +{file.additions}
                              </span>
                              <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 font-mono">
                                -{file.deletions}
                              </span>
                            </div>
                          </button>

                          {expandedFile === file.path && (
                            <div className="border-t border-slate-200 dark:border-slate-700">
                              <DiffViewer
                                diff={file.diffSnippet}
                                filePath={file.path}
                                hideHeader={true}
                                maxInitialLines={35}
                                className="rounded-none border-0"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: DIVERGENCE GRAPH & TOPOLOGY */}
              {activeTab === 'divergence' && (
                <div className="space-y-4">
                  {/* Branch Metrics Header Card */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Branch Tracking Topology</span>
                      <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400">
                        {state.currentBranch.name} ↔ {state.currentBranch.upstream || (state.upstreamUnavailable ? 'upstream unavailable' : 'no-upstream')}
                      </span>
                    </div>

                    {state.upstreamUnavailable && (
                      <div className="mb-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>No upstream tracking branch configured for {state.currentBranch.name}. Run <code className="font-mono bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded text-[10px]">git push -u origin {state.currentBranch.name}</code> to attach upstream.</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2">
                        <ArrowUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {state.currentBranch.aheadCount} Ahead
                          </span>
                          <p className="text-[10px] text-slate-400">Unpushed local commits</p>
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 flex items-center gap-2">
                        <ArrowDown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {state.currentBranch.behindCount} Behind
                          </span>
                          <p className="text-[10px] text-slate-400">Remote commits on origin</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive SVG Commit DAG Visualizer */}
                  <GitDagVisualizer
                    state={state}
                    selectedCommitId={selectedCommitId}
                    onSelectCommit={(node) => setSelectedCommitId(node.id)}
                    onClearSelection={() => setSelectedCommitId(null)}
                  />

                  {/* Collapsible Text Commits Fallback (for accessibility and deep inspection) */}
                  {(state.remoteCommitsBehind.length > 0 || state.localCommitsAhead.length > 0) && (
                    <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 p-2.5 text-xs">
                      <summary className="font-semibold text-slate-600 dark:text-slate-300 cursor-pointer flex items-center justify-between hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                        <span>Text Commit Stream Fallback ({state.remoteCommitsBehind.length + state.localCommitsAhead.length} changes)</span>
                        <ChevronRight className="w-3.5 h-3.5 group-open:rotate-90 transition-transform" />
                      </summary>

                      <div className="pt-3 space-y-3">
                        {/* Remote Commits Behind */}
                        {state.remoteCommitsBehind.length > 0 && (
                          <div>
                            <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <ArrowDown className="w-3 h-3 text-amber-500" />
                              <span>Incoming Remote Commits ({state.remoteCommitsBehind.length})</span>
                            </h4>
                            <div className="space-y-1.5 border-l-2 border-amber-300 dark:border-amber-700 ml-2 pl-2.5">
                              {state.remoteCommitsBehind.map((c) => (
                                <div key={c.hash} className="p-2 rounded-lg bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/60 text-[11px]">
                                  <div className="flex items-center justify-between">
                                    <span className="font-mono font-bold text-amber-900 dark:text-amber-300">{c.shortHash}</span>
                                    <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                                  </div>
                                  <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{c.message}</p>
                                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{c.author}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Local Commits Ahead */}
                        {state.localCommitsAhead.length > 0 && (
                          <div>
                            <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <ArrowUp className="w-3 h-3 text-blue-500" />
                              <span>Local Commits Ahead ({state.localCommitsAhead.length})</span>
                            </h4>
                            <div className="space-y-1.5 border-l-2 border-blue-300 dark:border-blue-700 ml-2 pl-2.5">
                              {state.localCommitsAhead.map((c) => (
                                <div key={c.hash} className="p-2 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/60 text-[11px]">
                                  <div className="flex items-center justify-between">
                                    <span className="font-mono font-bold text-blue-900 dark:text-blue-300">{c.shortHash}</span>
                                    <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                                  </div>
                                  <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{c.message}</p>
                                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{c.author}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </details>
                  )}
                </div>
              )}

              {/* TAB 3: STASHES */}
              {activeTab === 'stashes' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Local Stash Stack ({state.stashes.length} items)</span>
                  </div>

                  {state.stashes.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50/70 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                      <Archive className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">No stashed changes</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Git stashes are created automatically during safe pull actions.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {state.stashes.map((s) => (
                        <div key={s.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">stash@&#123;{s.index}&#125;</span>
                            <span className="text-[10px] text-slate-400">{s.timestamp}</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{s.message}</p>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            Preserves {s.fileCount} file(s): {s.files.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: AUDIT LOG */}
              {activeTab === 'audit' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Safe Actions Executed ({auditHistory.length})</span>
                    {auditHistory.length > 0 && onRollbackLastAction && (
                      <button
                        onClick={onRollbackLastAction}
                        className="text-[11px] font-bold text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200 flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> Rollback Last Action
                      </button>
                    )}
                  </div>

                  {auditHistory.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50/70 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                      <History className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">No actions executed yet</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Approved safe Git commands will be audited here with instant rollback.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {auditHistory.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[10px]">
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Approved & Executed
                            </span>
                            <span>{item.timestamp}</span>
                          </div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{item.description}</div>
                          <div className="font-mono text-[10px] bg-slate-900 border border-slate-800 text-slate-200 p-1.5 rounded overflow-x-auto">
                            {item.command}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/90 text-right">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
