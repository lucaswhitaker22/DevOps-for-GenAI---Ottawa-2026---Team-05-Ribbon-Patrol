import React, { useState } from 'react';
import {
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
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  FolderGit2,
  Filter,
  Check,
  Search,
  Plus,
  Minus,
  Play,
} from 'lucide-react';
import { RepositoryState, FileChange, DagCommitNode, ActivePageId } from '../../types';
import { GitDagVisualizer } from '../GitDagVisualizer';
import { DiffViewer } from '../DiffViewer';

interface RepositoryPageProps {
  state: RepositoryState;
  auditHistory: {
    id: string;
    command: string;
    timestamp: string;
    description: string;
  }[];
  onRollbackLastAction?: () => void;
  onOpenCommitGenerator?: () => void;
  onNavigate: (page: ActivePageId) => void;
}

export const RepositoryPage: React.FC<RepositoryPageProps> = ({
  state,
  auditHistory,
  onRollbackLastAction,
  onOpenCommitGenerator,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'dag_graph' | 'working_tree' | 'stashes' | 'audit'>('dag_graph');
  const [expandedFile, setExpandedFile] = useState<string | null>(
    state.workingTree.length > 0 ? state.workingTree[0].path : null
  );
  const [selectedCommitId, setSelectedCommitId] = useState<string | null>(null);
  const [fileFilter, setFileFilter] = useState('');
  const [stagedFiles, setStagedFiles] = useState<Set<string>>(new Set());
  const [stashRestoredMsg, setStashRestoredMsg] = useState<string | null>(null);

  const filteredWorkingTree = state.workingTree.filter((f) =>
    f.path.toLowerCase().includes(fileFilter.toLowerCase())
  );

  const selectedFileObj =
    state.workingTree.find((f) => f.path === expandedFile) || filteredWorkingTree[0] || state.workingTree[0];

  const handleToggleStageFile = (path: string) => {
    setStagedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const handleToggleStageAll = () => {
    if (stagedFiles.size === state.workingTree.length) {
      setStagedFiles(new Set());
    } else {
      setStagedFiles(new Set(state.workingTree.map((f) => f.path)));
    }
  };

  const handleRestoreStash = (stashId: string, index: number) => {
    setStashRestoredMsg(`stash@{${index}} restored to working tree`);
    setTimeout(() => setStashRestoredMsg(null), 3500);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <button
              onClick={() => onNavigate('companion')}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Return to Companion"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-500">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Repository Details & DAG Graph
                </h1>
                {state.isLiveMode ? (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Workspace
                  </span>
                ) : (
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-purple-100 text-purple-800 border border-purple-300">
                    Interactive Sandbox
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {state.repoName} • Active Branch <span className="font-bold text-slate-800">{state.currentBranch.name}</span>
                {state.scannedAt ? ` • Synced at ${new Date(state.scannedAt).toLocaleTimeString()}` : ''}
              </p>
            </div>
          </div>

          {/* Quick Stats & AI Action */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono">
              <span className="text-indigo-600 font-bold flex items-center gap-1">
                <ArrowUp className="w-3.5 h-3.5" /> {state.currentBranch.aheadCount} ahead
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-amber-600 font-bold flex items-center gap-1">
                <ArrowDown className="w-3.5 h-3.5" /> {state.currentBranch.behindCount} behind
              </span>
            </div>

            {onOpenCommitGenerator && (
              <button
                onClick={onOpenCommitGenerator}
                className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                <span>AI Conventional Commit</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-t border-slate-100 mt-5 pt-4 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('dag_graph')}
            className={`py-2 px-4 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'dag_graph'
                ? 'bg-indigo-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Interactive DAG Graph</span>
          </button>

          <button
            onClick={() => setActiveTab('working_tree')}
            className={`py-2 px-4 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'working_tree'
                ? 'bg-indigo-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Working Tree & Diffs</span>
            {state.workingTree.length > 0 && (
              <span className={`text-[10px] px-2 py-0.2 rounded-full font-mono font-bold ${
                activeTab === 'working_tree' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {state.workingTree.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('stashes')}
            className={`py-2 px-4 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'stashes'
                ? 'bg-indigo-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Archive className="w-4 h-4" />
            <span>Stash Stack</span>
            {state.stashes.length > 0 && (
              <span className={`text-[10px] px-2 py-0.2 rounded-full font-mono font-bold ${
                activeTab === 'stashes' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {state.stashes.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-2 px-4 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-indigo-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Audit Trail & Rollback</span>
            {auditHistory.length > 0 && (
              <span className={`text-[10px] px-2 py-0.2 rounded-full font-mono font-bold ${
                activeTab === 'audit' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {auditHistory.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'dag_graph' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-indigo-600" />
                  Full Commit Lineage & DAG Topology
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visual ancestor graph comparing local branch commits against upstream origin. Click any commit to inspect commit metadata.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1.5 font-mono text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-200/60 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  Local Branch ({state.currentBranch.aheadCount} ahead)
                </span>
                <span className="flex items-center gap-1.5 font-mono text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Upstream Origin ({state.currentBranch.behindCount} behind)
                </span>
              </div>
            </div>

            <div className="pt-5">
              <GitDagVisualizer
                state={state}
                selectedCommitId={selectedCommitId}
                onSelectCommit={(commit: DagCommitNode) => setSelectedCommitId(commit.hash)}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'working_tree' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* File Change List */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-600" />
                Working Tree Files ({state.workingTree.length})
              </h2>
              {state.workingTree.length > 0 && (
                <button
                  onClick={handleToggleStageAll}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                  {stagedFiles.size === state.workingTree.length ? 'Unstage All' : 'Stage All'}
                </button>
              )}
            </div>

            {/* File Search Filter */}
            {state.workingTree.length > 3 && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter files..."
                  value={fileFilter}
                  onChange={(e) => setFileFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            )}

            {state.workingTree.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Working tree clean</p>
                <p className="text-[11px] text-slate-400 mt-1">No uncommitted changes detected</p>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
                {filteredWorkingTree.map((file) => {
                  const isSelected = expandedFile === file.path;
                  const isStaged = stagedFiles.has(file.path);

                  return (
                    <div
                      key={file.path}
                      onClick={() => setExpandedFile(file.path)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 font-semibold shadow-2xs'
                          : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200/80 text-slate-700'
                      }`}
                    >
                      <div className="min-w-0 pr-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStageFile(file.path);
                          }}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                            isStaged
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-white border-slate-300 text-transparent hover:border-slate-400'
                          }`}
                          title={isStaged ? 'Unstage file' : 'Stage file'}
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <div className="truncate">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 rounded ${
                                file.status === 'conflicted'
                                  ? 'bg-rose-100 text-rose-800'
                                  : file.status === 'modified'
                                  ? 'bg-amber-100 text-amber-800'
                                  : file.status === 'staged' || isStaged
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {isStaged ? 'staged' : file.status}
                            </span>
                            <span className="font-mono text-xs truncate">{file.path}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-mono shrink-0">
                        {file.additions > 0 && <span className="text-emerald-600">+{file.additions}</span>}
                        {file.deletions > 0 && <span className="text-rose-600">-{file.deletions}</span>}
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Diff Viewer Pane */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs">
            {selectedFileObj ? (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileCode className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-900 truncate">
                      {selectedFileObj.path}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        selectedFileObj.status === 'conflicted'
                          ? 'bg-rose-100 text-rose-800'
                          : selectedFileObj.status === 'modified'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {selectedFileObj.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-emerald-600 font-semibold">+{selectedFileObj.additions}</span>
                    <span className="text-rose-600 font-semibold">-{selectedFileObj.deletions}</span>
                  </div>
                </div>

                <DiffViewer
                  diff={selectedFileObj.diffSnippet || `// Diff for ${selectedFileObj.path}\n+ // Working tree changes`}
                  filePath={selectedFileObj.path}
                  fileStatus={selectedFileObj.status}
                  additions={selectedFileObj.additions}
                  deletions={selectedFileObj.deletions}
                />
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400">
                <FileCode className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <p className="text-xs font-medium text-slate-600">Select a file to inspect full diff</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'stashes' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Archive className="w-4 h-4 text-indigo-600" />
                Git Stash Stack ({state.stashes.length})
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Preserved snapshot backups created by GitPet safety actions and emergency pre-sync hooks.
              </p>
            </div>
            {stashRestoredMsg && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-in fade-in">
                ✅ {stashRestoredMsg}
              </span>
            )}
          </div>

          {state.stashes.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Archive className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">No saved stashes</p>
              <p className="text-[11px] text-slate-400 mt-1">Stashes created before sync operations will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.stashes.map((stash) => (
                <div
                  key={stash.id}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/70 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200/60">
                      stash@&#123;{stash.index}&#125;
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{stash.timestamp}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">{stash.message}</p>
                  <div className="text-[11px] text-slate-500 font-mono">
                    <span className="font-semibold text-slate-700">{stash.fileCount} files preserved:</span>
                    <ul className="mt-1 list-disc list-inside space-y-0.5 text-slate-600">
                      {stash.files.slice(0, 4).map((f) => (
                        <li key={f} className="truncate">{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-end">
                    <button
                      onClick={() => handleRestoreStash(stash.id, stash.index)}
                      className="px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore to Working Tree</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-600" />
                Immutable Safety Audit Log
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every command executed through GitPet is recorded with verified timestamp and rollback triggers.
              </p>
            </div>
            {onRollbackLastAction && auditHistory.length > 0 && (
              <button
                onClick={onRollbackLastAction}
                className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rollback Last Action</span>
              </button>
            )}
          </div>

          {auditHistory.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <History className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">No actions executed in this session</p>
              <p className="text-[11px] text-slate-400 mt-1">Actions executed from recommendations or fixes will be logged here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {auditHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-slate-900">{item.description}</span>
                    </div>
                    <code className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200/50 block">
                      {item.command}
                    </code>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono shrink-0">{item.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
