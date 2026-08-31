import React, { useState } from 'react';
import {
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  GitMerge,
  Send,
  Check,
  RotateCcw,
} from 'lucide-react';
import { RepositoryState, ActivePageId, PullRequestInfo } from '../../types';

interface PRIntelligencePageProps {
  state: RepositoryState;
  onNavigate: (page: ActivePageId) => void;
  onExecutePRAction?: (actionType: 'rebase' | 'changelog' | 'nudge' | 'resolve_conflicts') => void;
}

export const PRIntelligencePage: React.FC<PRIntelligencePageProps> = ({
  state,
  onNavigate,
  onExecutePRAction,
}) => {
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<{ id: string; author: string; text: string; timestamp: string }[]>([]);
  const [merged, setMerged] = useState(false);

  const pr: PullRequestInfo = state.activePullRequest || {
    number: 214,
    title: 'feat(cart): implement multi-currency checkout & tax rate service',
    author: 'lucaswhitaker22',
    baseBranch: 'main',
    branch: 'feature/cart',
    status: 'open',
    reviewStatus: 'changes_requested',
    mergeability: 'clean',
    waitingDays: 3,
    approvalsCount: 1,
    requestedChangesCount: 1,
    requestedReviewers: ['sarah-reviewer', 'marcus-lead'],
    commentsCount: 2,
    url: 'https://github.com/farisnour/gitpet-acme-corp/pull/214',
    createdAt: '3 days ago',
    updatedAt: '1 hour ago',
    comments: [
      {
        id: 'c1',
        author: 'sarah-reviewer',
        filePath: 'src/services/currency.ts',
        line: 42,
        commentText: 'Please ensure we wrap rate lookup in a timeout to avoid hanging UI on slow networks.',
        resolved: false,
        timestamp: '1 day ago',
      },
      {
        id: 'c2',
        author: 'marcus-lead',
        filePath: 'src/utils/tax.ts',
        line: 88,
        commentText: 'Consider caching VAT rates for 15 minutes in memory.',
        resolved: false,
        timestamp: '4 hours ago',
      },
    ],
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplies((prev) => [
      ...prev,
      {
        id: `rep_${Date.now()}`,
        author: 'You (Author)',
        text: replyText.trim(),
        timestamp: 'Just now',
      },
    ]);
    setReplyText('');
  };

  const handleDraftAIReply = (commentText: string) => {
    setReplyText(
      `Thanks for the feedback! I've wrapped this in an AbortController with a 5000ms timeout and updated unit tests.`
    );
  };

  const handleSquashAndMerge = () => {
    setMerged(true);
    if (onExecutePRAction) {
      onExecutePRAction('rebase');
    }
    setTimeout(() => setMerged(false), 5000);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
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
            <div className="p-3 rounded-2xl bg-purple-600 text-white shadow-sm ring-1 ring-purple-500">
              <GitPullRequest className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  PR #{pr.number}: {pr.title}
                </h1>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold capitalize ${
                    pr.reviewStatus === 'approved'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : pr.reviewStatus === 'changes_requested'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {pr.reviewStatus.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Opened by <span className="font-bold text-slate-800">{pr.author}</span> • {pr.branch} → {pr.baseBranch} • In review for {pr.waitingDays} days
              </p>
            </div>
          </div>

          {/* Quick Actions & Merge */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {onExecutePRAction && (
              <button
                onClick={() => onExecutePRAction('changelog')}
                className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 shadow-2xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Generate PR Changelog</span>
              </button>
            )}

            <button
              onClick={handleSquashAndMerge}
              disabled={merged}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all cursor-pointer"
            >
              <GitMerge className="w-3.5 h-3.5 text-emerald-400" />
              <span>{merged ? 'Merged into main 🎉' : 'Squash & Merge'}</span>
            </button>
          </div>
        </div>

        {/* Review Approval Progress Meter */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Approvals</span>
            <span className="text-sm font-bold text-slate-900 mt-1 block">
              {pr.approvalsCount} approved ({pr.requestedChangesCount} changes requested)
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Review Turnaround</span>
            <span className="text-sm font-bold text-amber-600 mt-1 block">
              {pr.waitingDays} days waiting
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Merge Conflict State</span>
            <span className="text-sm font-bold text-emerald-600 mt-1 block capitalize">
              {pr.mergeability} status
            </span>
          </div>
        </div>
      </div>

      {/* Review Comments & Inline Response Deck */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              Inline Review Comments & Threads ({pr.comments.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Reviewer feedback requiring resolution before merge gate approval.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {pr.comments.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-900">@{c.author}</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    on {c.filePath}:{c.line}
                  </span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${c.resolved ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {c.resolved ? 'Resolved' : 'Open'}
                </span>
              </div>

              <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 leading-relaxed font-mono">
                {c.commentText}
              </p>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleDraftAIReply(c.commentText)}
                  className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>Draft AI Resolution Response</span>
                </button>
              </div>
            </div>
          ))}

          {/* User Replies */}
          {replies.map((r) => (
            <div
              key={r.id}
              className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs space-y-1 ml-6 animate-in fade-in"
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-purple-900 font-bold">
                <span>{r.author}</span>
                <span className="text-slate-400 font-normal">{r.timestamp}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">{r.text}</p>
            </div>
          ))}

          {/* Reply Box */}
          <form onSubmit={handleSendReply} className="pt-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Post a reply or resolution comment to reviewers..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!replyText.trim()}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Reply</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
