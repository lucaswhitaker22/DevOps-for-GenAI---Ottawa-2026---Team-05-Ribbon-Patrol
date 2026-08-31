import React, { useState } from 'react';
import {
  ArrowLeft,
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
import { RepositoryState, PullRequestInfo, ActivePageId } from '../../types';

interface PRIntelligencePageProps {
  state: RepositoryState;
  onNavigate: (page: ActivePageId) => void;
  onExecutePRAction?: (actionType: 'nudge' | 'rebase' | 'changelog' | 'resolve_conflicts') => void;
}

export const PRIntelligencePage: React.FC<PRIntelligencePageProps> = ({
  state,
  onNavigate,
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
        commentText: 'Please verify the token expiry threshold when rotating refresh tokens.',
        timestamp: '1 day ago',
        resolved: false,
      },
      {
        id: 'c-102',
        author: 'Marcus Vance',
        filePath: 'src/auth/tokenStorage.ts',
        line: 88,
        commentText: 'Nice defensive error handling here!',
        timestamp: '2 days ago',
        resolved: true,
      },
    ],
  };

  const getReviewStatusBadge = () => {
    switch (pr.reviewStatus) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" /> Approved & Ready
          </span>
        );
      case 'changes_requested':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-4 h-4" /> Changes Requested
          </span>
        );
      case 'commented':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <MessageSquare className="w-4 h-4" /> Comments Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Clock className="w-4 h-4" /> Pending Review
          </span>
        );
    }
  };

  const handleSendNudge = () => {
    setNudgeSent(true);
    if (onExecutePRAction) {
      onExecutePRAction('nudge');
    }
    setTimeout(() => setNudgeSent(false), 5000);
  };

  const handleGenerateChangelog = () => {
    const log = `### 🚀 PR #${pr.number} Summary\n- **Feature**: ${pr.title}\n- **Branch**: \`${pr.branch}\` → \`${pr.baseBranch}\`\n- **Security**: OAuth2 token rotation & PKCE flow validation\n- **Approvals**: ${pr.approvalsCount} approved`;
    setChangelogGenerated(log);
    if (onExecutePRAction) {
      onExecutePRAction('changelog');
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <button
              onClick={() => onNavigate('companion')}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              title="Return to Companion"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-3 rounded-2xl bg-purple-600 text-white shadow-sm ring-1 ring-purple-500">
              <GitPullRequest className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  PR #{pr.number}: {pr.title}
                </h1>
                {getReviewStatusBadge()}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Authored by <span className="font-semibold text-slate-800">{pr.author}</span> •{' '}
                <span className="font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                  {pr.branch}
                </span>{' '}
                into{' '}
                <span className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                  {pr.baseBranch}
                </span>{' '}
                • Created {pr.createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <span>GitHub PR</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-t border-slate-100 mt-5 pt-4 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-3.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <GitPullRequest className="w-4 h-4" />
            <span>PR Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`py-2 px-3.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'comments'
                ? 'bg-purple-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Reviewer Comments</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
              activeTab === 'comments' ? 'bg-purple-700 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {pr.comments.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('actions')}
            className={`py-2 px-3.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'actions'
                ? 'bg-purple-600 text-white shadow-xs font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI PR Copilot Actions</span>
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Status & Reviewers Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-purple-600" />
              Review Status & Approvals
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                <span className="text-xs font-semibold text-emerald-800">Approvals</span>
                <p className="text-2xl font-black text-emerald-700 font-mono mt-1">{pr.approvalsCount}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/80">
                <span className="text-xs font-semibold text-rose-800">Changes Requested</span>
                <p className="text-2xl font-black text-rose-700 font-mono mt-1">{pr.requestedChangesCount}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-700">Requested Reviewers</span>
              <div className="flex items-center gap-2 flex-wrap">
                {pr.requestedReviewers.map((rev) => (
                  <span
                    key={rev}
                    className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {rev}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mergeability & Staleness Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GitMerge className="w-4 h-4 text-purple-600" />
              Mergeability & Freshness
            </h2>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Merge Conflict Status</span>
                <span className={`font-bold font-mono ${pr.mergeability === 'clean' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {pr.mergeability === 'clean' ? 'No Merge Conflicts' : 'Conflicts Detected'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Review Waiting Duration</span>
                <span className="font-bold text-slate-900">{pr.waitingDays} days in review</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Total Unresolved Discussions</span>
                <span className="font-bold text-purple-700">
                  {pr.comments.filter((c) => !c.resolved).length} unresolved
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments Tab */}
      {activeTab === 'comments' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            Review Comments & Inline Threads
          </h2>

          <div className="space-y-3">
            {pr.comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{comment.author}</span>
                    <span className="font-mono text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {comment.filePath} : line {comment.line}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    comment.resolved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {comment.resolved ? 'Resolved' : 'Pending Action'}
                  </span>
                </div>
                <p className="text-xs text-slate-700">{comment.commentText}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions Tab */}
      {activeTab === 'actions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Send className="w-4 h-4 text-purple-600" />
              Nudge Reviewers
            </h2>
            <p className="text-xs text-slate-500">
              PR has been waiting for {pr.waitingDays} days. Send a polite automated reminder notification to assigned reviewers.
            </p>
            <button
              onClick={handleSendNudge}
              disabled={nudgeSent}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                nudgeSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
              }`}
            >
              {nudgeSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Reviewers Nudged Successfully</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Reviewer Nudge</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              Generate PR Changelog & Summary
            </h2>
            <p className="text-xs text-slate-500">
              Summarize all commits and scope changes into a markdown changelog snippet for the release notes.
            </p>
            <button
              onClick={handleGenerateChangelog}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Generate AI Summary</span>
            </button>

            {changelogGenerated && (
              <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-mono whitespace-pre-wrap mt-3 overflow-x-auto">
                {changelogGenerated}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
