import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  GitMerge,
  UserCheck,
  UserPlus,
  RefreshCw,
  FileText,
  AlertTriangle,
  Send,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { RepositoryState, PullRequestInfo } from '../types';

interface PRIntelligenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  state: RepositoryState;
  onExecutePRAction?: (actionType: 'nudge' | 'rebase' | 'changelog' | 'resolve_conflicts') => void;
}

export const PRIntelligenceDrawer: React.FC<PRIntelligenceDrawerProps> = ({
  isOpen,
  onClose,
  state,
  onExecutePRAction,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'comments' | 'actions'>('overview');
  const [nudgeSent, setNudgeSent] = useState<boolean>(false);
  const [changelogGenerated, setChangelogGenerated] = useState<string | null>(null);

  const pr: PullRequestInfo = state.activePullRequest || {
    number: 214,
    title: 'feat(auth): implement OAuth2 PKCE & token rotation',
    author: 'Lucas Whitaker',
    branch: 'feature/auth-v2',
    baseBranch: 'main',
    status: 'open',
    reviewStatus: 'changes_requested',
    mergeability: 'clean',
    approvalsCount: 1,
    requestedChangesCount: 1,
    requestedReviewers: ['@sarah-chen', '@marcus-vance'],
    commentsCount: 2,
    waitingDays: 3,
    url: 'https://github.com/acme-corp/ecommerce-store/pull/214',
    createdAt: '3 days ago',
    updatedAt: '1 day ago',
    comments: [
      {
        id: 'c-101',
        author: 'Sarah Chen',
        filePath: 'src/auth/authService.ts',
        line: 42,
        commentText: 'Please sanitize token payload before storing in session storage to prevent XSS vulnerability.',
        timestamp: '1 day ago',
        resolved: false,
      },
      {
        id: 'c-102',
        author: 'Sarah Chen',
        filePath: 'src/auth/authService.ts',
        line: 58,
        commentText: 'Add explicit exception handling for expired refresh tokens.',
        timestamp: '1 day ago',
        resolved: false,
      },
    ],
  };

  const getReviewStatusBadge = () => {
    switch (pr.reviewStatus) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Approved ({pr.approvalsCount})
          </span>
        );
      case 'changes_requested':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            Changes Requested ({pr.requestedChangesCount})
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Pending Review ({pr.waitingDays} days)
          </span>
        );
    }
  };

  const handleNudgeReviewers = () => {
    setNudgeSent(true);
    if (onExecutePRAction) onExecutePRAction('nudge');
    setTimeout(() => setNudgeSent(false), 3000);
  };

  const handleGenerateChangelog = () => {
    const markdown = `## 📝 PR #${pr.number} Changelog & Summary

### 🚀 Highlights
- Implemented **OAuth2 PKCE flow** and automated token refresh rotation.
- Added session token sanitization and secure local storage handoff.

### 🧪 Verification
- All 18 unit specs in \`authService.spec.ts\` passed.
- E2E auth flow verified against Staging endpoint.`;

    setChangelogGenerated(markdown);
    if (onExecutePRAction) onExecutePRAction('changelog');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-lg bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col text-slate-900 dark:text-slate-100"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/30 flex items-center justify-center text-purple-300">
                    <GitPullRequest className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold flex items-center gap-2">
                      <span>Pull Request #{pr.number}</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded border border-purple-400/20 uppercase">
                        {pr.status}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 truncate max-w-xs">{pr.title}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Segment Tabs */}
              <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 px-4 pt-2 gap-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'overview'
                      ? 'border-purple-600 text-purple-700 dark:text-purple-300 font-bold'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Overview & Reviewers
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('comments')}
                  className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'comments'
                      ? 'border-purple-600 text-purple-700 dark:text-purple-300 font-bold'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <span>Comments</span>
                  {pr.commentsCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
                      {pr.commentsCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('actions')}
                  className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'actions'
                      ? 'border-purple-600 text-purple-700 dark:text-purple-300 font-bold'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Suggested Actions</span>
                </button>
              </div>

              {/* Drawer Body Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {activeTab === 'overview' && (
                  <div className="space-y-5">
                    {/* Review Status Alert Banner */}
                    <div className="p-4 rounded-xl border bg-slate-50/80 dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Review Status</span>
                        {getReviewStatusBadge()}
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed pt-1">
                        {pr.reviewStatus === 'changes_requested' && (
                          <span>
                            <strong>Sarah Chen</strong> reviewed 1 day ago and requested changes on <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">src/auth/authService.ts</code>.
                          </span>
                        )}
                        {pr.reviewStatus === 'pending' && (
                          <span>
                            Waiting <strong>{pr.waitingDays} days</strong> for initial review from requested reviewers.
                          </span>
                        )}
                        {pr.reviewStatus === 'approved' && (
                          <span>
                            All required checks passed! <strong>{pr.approvalsCount} reviewers</strong> approved this pull request.
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Branch & Mergeability Details */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                        <span className="text-[11px] text-slate-400 font-medium">Branches</span>
                        <div className="font-mono text-slate-800 dark:text-slate-200 font-semibold truncate">
                          {pr.branch} → {pr.baseBranch}
                        </div>
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                        <span className="text-[11px] text-slate-400 font-medium">Mergeability</span>
                        <div className="font-semibold capitalize flex items-center gap-1.5">
                          {pr.mergeability === 'clean' ? (
                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Clean Merge
                            </span>
                          ) : (
                            <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> Conflicts Detected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Requested Reviewers List */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span>Reviewers & Approvals</span>
                      </h3>

                      <div className="space-y-1.5">
                        {pr.requestedReviewers.map((reviewer) => (
                          <div
                            key={reviewer}
                            className="p-2.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 rounded-xl text-xs flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold flex items-center justify-center text-xs">
                                {reviewer.charAt(1).toUpperCase()}
                              </div>
                              <span className="font-semibold text-slate-800 dark:text-slate-200">{reviewer}</span>
                            </div>

                            <span className="text-[11px] text-amber-700 dark:text-amber-300 font-medium bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                              Review Requested
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>Inline PR Review Comments ({pr.comments.length})</span>
                    </h3>

                    {pr.comments.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                        No inline review comments posted yet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {pr.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="p-3.5 bg-white dark:bg-slate-800/90 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs space-y-2 shadow-2xs"
                          >
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                                <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold flex items-center justify-center text-[10px]">
                                  {comment.author.charAt(0)}
                                </span>
                                <span>{comment.author}</span>
                              </span>
                              <span className="text-slate-400 font-mono">{comment.timestamp}</span>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 text-slate-200 font-mono text-[11px] px-2.5 py-1.5 rounded flex items-center justify-between">
                              <span className="text-purple-300">{comment.filePath}:{comment.line}</span>
                              <span className="text-slate-400">L{comment.line}</span>
                            </div>

                            <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{comment.commentText}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'actions' && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>Suggested AI & Git Actions</span>
                    </h3>

                    <div className="space-y-2.5">
                      {/* Action 1: Nudge Reviewers */}
                      <button
                        type="button"
                        onClick={handleNudgeReviewers}
                        className="w-full p-3 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 text-left">
                          <Send className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                          <div>
                            <span className="block font-bold">Request Review / Nudge Reviewers</span>
                            <span className="text-[11px] text-purple-700 dark:text-purple-300 font-normal">
                              Send friendly reminder ping to {pr.requestedReviewers.join(', ')}
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 rounded-lg text-[11px] font-bold shadow-2xs border border-purple-200 dark:border-purple-700">
                          {nudgeSent ? 'Sent! ✨' : 'Nudge'}
                        </span>
                      </button>

                      {/* Action 2: Rebase Branch */}
                      <button
                        type="button"
                        onClick={() => onExecutePRAction && onExecutePRAction('rebase')}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 text-left">
                          <RefreshCw className="w-4 h-4 text-slate-600 dark:text-slate-400 shrink-0" />
                          <div>
                            <span className="block font-bold">Rebase PR Branch</span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                              Rebase {pr.branch} onto upstream {pr.baseBranch} cleanly
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] font-bold shadow-2xs border border-slate-200 dark:border-slate-600">
                          Rebase
                        </span>
                      </button>

                      {/* Action 3: Generate Changelog */}
                      <button
                        type="button"
                        onClick={handleGenerateChangelog}
                        className="w-full p-3 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 text-left">
                          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          <div>
                            <span className="block font-bold">Generate PR Changelog & Summary</span>
                            <span className="text-[11px] text-blue-700 dark:text-blue-300 font-normal">
                              Synthesize commit history into release notes
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 rounded-lg text-[11px] font-bold shadow-2xs border border-blue-200 dark:border-blue-700">
                          Generate
                        </span>
                      </button>

                      {/* Action 4: Resolve Merge Conflicts */}
                      <button
                        type="button"
                        onClick={() => onExecutePRAction && onExecutePRAction('resolve_conflicts')}
                        className={`w-full p-3 border rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          pr.mergeability === 'conflicted'
                            ? 'bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                            : 'bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 text-left">
                          <AlertTriangle className={`w-4 h-4 shrink-0 ${pr.mergeability === 'conflicted' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`} />
                          <div>
                            <span className="block font-bold">Resolve Merge Conflicts</span>
                            <span className="text-[11px] font-normal opacity-85">
                              {pr.mergeability === 'conflicted'
                                ? 'Conflicts detected with target base branch — step-by-step resolution'
                                : 'Check and inspect potential conflict markers with upstream'}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-2xs border ${
                          pr.mergeability === 'conflicted'
                            ? 'bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                        }`}>
                          {pr.mergeability === 'conflicted' ? 'Fix Conflicts' : 'Inspect'}
                        </span>
                      </button>
                    </div>

                    {changelogGenerated && (
                      <div className="p-3 bg-slate-900 border border-slate-800 text-slate-200 font-mono text-[11px] rounded-xl space-y-2">
                        <span className="text-emerald-400 font-bold">Generated PR Summary:</span>
                        <pre className="whitespace-pre-wrap leading-relaxed">{changelogGenerated}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between text-xs">
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-700 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300 font-semibold flex items-center gap-1"
                >
                  <span>View PR on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
