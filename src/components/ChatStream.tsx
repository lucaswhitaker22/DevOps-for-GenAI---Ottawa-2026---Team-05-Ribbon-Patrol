import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  RotateCcw,
  Loader2,
  ChevronRight,
  Zap,
  Cpu,
  Brain,
  Shield,
  GraduationCap,
  Dog,
  ArrowUpRight,
  FolderGit2,
  GitPullRequest,
  AlertTriangle,
} from 'lucide-react';
import { ChatMessage, RecommendedAction, RepositoryState, ChatRole, ModelTier, ActivePageId } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ChatStreamProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string, role?: ChatRole, tier?: ModelTier) => void;
  onPreviewAction: (action: RecommendedAction) => void;
  onExecuteAction: (action: RecommendedAction) => void;
  state: RepositoryState;
  executingActionId: string | null;
  selectedRole: ChatRole;
  setSelectedRole: (role: ChatRole) => void;
  selectedTier: ModelTier;
  setSelectedTier: (tier: ModelTier) => void;
  onNavigate?: (page: ActivePageId) => void;
}

export const ChatStream: React.FC<ChatStreamProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onPreviewAction,
  onExecuteAction,
  state,
  executingActionId,
  selectedRole,
  setSelectedRole,
  selectedTier,
  setSelectedTier,
  onNavigate,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, executingActionId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText.trim(), selectedRole, selectedTier);
    setInputText('');
  };

  const handleCopy = (cmd: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(cmd).catch(() => {});
      }
    } catch (_) {}
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const quickPromptCategories = [
    { label: 'Status report & diagnostics', icon: '📊', prompt: 'Status report! What needs attention?' },
    { label: 'Work-loss risk assessment', icon: '🚨', prompt: 'EMERGENCY: What is the work-loss risk and how do I preserve my work?' },
    { label: 'Explain branch divergence', icon: '🌲', prompt: 'Explain the branch divergence between my local branch and upstream origin.' },
    { label: 'Review PR & reviewer feedback', icon: '🔀', prompt: `Summarize review feedback and blockers on PR #${state.activePullRequest?.number || 214}.` },
    { label: 'CI/CD test failure diagnosis', icon: '⚡', prompt: 'Diagnose the latest CI/CD pipeline and test suite findings.' },
  ];

  const ROLES: { id: ChatRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'byte_mascot', label: 'Byte Mascot', icon: <Dog className="w-3.5 h-3.5" />, desc: 'Friendly, ambient companion' },
    { id: 'senior_architect', label: 'Architect', icon: <Cpu className="w-3.5 h-3.5" />, desc: 'Deep DAG & topological analysis' },
    { id: 'safety_auditor', label: 'Auditor', icon: <Shield className="w-3.5 h-3.5" />, desc: 'Zero data-loss compliance' },
    { id: 'git_tutor', label: 'Tutor', icon: <GraduationCap className="w-3.5 h-3.5" />, desc: 'Mental models & pedagogy' },
  ];

  const TIERS: { id: ModelTier; label: string; model: string; icon: React.ReactNode }[] = [
    { id: 'fast', label: 'Fast', model: 'gemini-2.5-flash', icon: <Zap className="w-3 h-3 text-amber-500" /> },
    { id: 'general', label: 'General', model: 'gemini-2.5-flash', icon: <Sparkles className="w-3 h-3 text-blue-500" /> },
    { id: 'deep', label: 'Deep Reasoning', model: 'gemini-2.5-pro', icon: <Brain className="w-3 h-3 text-purple-500" /> },
  ];

  return (
    <div
      id="gitpet-chat-container"
      className="flex flex-col h-full bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden"
    >
      {/* Chat Header & Role / Model Selector */}
      <div className="px-4 sm:px-5 py-3 border-b border-slate-100 bg-slate-50/70 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              <Bot className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span>Multi-Turn Gemini Companion</span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Online
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">Contextual repository analysis & verified reversible Git actions</p>
            </div>
          </div>
        </div>

        {/* Roles & Model Tiers Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs">
          {/* Persona Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Role:</span>
            <div className="flex items-center gap-1 bg-slate-200/60 p-0.5 rounded-xl">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedRole === role.id
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title={role.desc}
                >
                  {role.icon}
                  <span className="hidden sm:inline">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Model Speed / Depth Tier */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Model:</span>
            <div className="flex items-center gap-1 bg-slate-200/60 p-0.5 rounded-xl">
              {TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedTier === tier.id
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title={`Powered by ${tier.model}`}
                >
                  {tier.icon}
                  <span>{tier.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[640px] min-h-[420px]">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`flex items-start gap-3 max-w-[95%] sm:max-w-[90%] ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-pink-50 text-pink-700 border border-pink-200 ring-1 ring-pink-400/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : '🐕'}
              </div>

              {/* Message Bubble Content */}
              <div className="space-y-3 w-full">
                <div
                  className={`p-4 rounded-3xl text-xs leading-relaxed text-left ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-slate-100 rounded-tr-xs shadow-xs'
                      : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-200/50 text-[10px] text-slate-400">
                    <span className="font-bold text-slate-700">
                      {msg.sender === 'user'
                        ? 'You'
                        : msg.role === 'senior_architect'
                        ? 'Senior Git Architect'
                        : msg.role === 'safety_auditor'
                        ? 'Safety Auditor'
                        : msg.role === 'git_tutor'
                        ? 'Git Tutor'
                        : 'Byte Companion'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {msg.modelUsed && (
                        <span className="px-1.5 py-0.5 bg-white text-slate-600 rounded-md border border-slate-200 font-mono text-[9px] font-semibold">
                          {msg.modelUsed}
                        </span>
                      )}
                      <span className="font-mono text-[10px]">{msg.timestamp}</span>
                    </div>
                  </div>

                  <MarkdownRenderer content={msg.text} isUser={msg.sender === 'user'} />

                  {/* Evidence Signals Callout */}
                  {msg.evidenceSummary && msg.evidenceSummary.evidencePoints?.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200/60 bg-white/80 p-3 rounded-2xl border">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                        <span>Repository Evidence Signals</span>
                        <span className="font-mono font-bold text-indigo-600">
                          {msg.evidenceSummary.healthLevel}
                        </span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-slate-600">
                        {msg.evidenceSummary.evidencePoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Deep-link jump buttons */}
                      {onNavigate && (
                        <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-100 flex-wrap">
                          <button
                            type="button"
                            onClick={() => onNavigate('repository')}
                            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                          >
                            <FolderGit2 className="w-3 h-3" />
                            <span>Inspect DAG & Diffs</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>

                          <button
                            type="button"
                            onClick={() => onNavigate('pr')}
                            className="text-[10px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
                          >
                            <GitPullRequest className="w-3 h-3" />
                            <span>PR Intelligence</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Recommended Safe Action Card */}
                {msg.recommendedAction && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-3xl bg-white border shadow-sm text-left space-y-3 ${
                      state.healthLevel === 'Unsafe' || msg.recommendedAction.riskLevel === 'Hazard'
                        ? 'border-rose-300 ring-2 ring-rose-500/10'
                        : 'border-slate-200/90'
                    }`}
                  >
                    {/* Action Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-2 rounded-xl ${
                            state.healthLevel === 'Unsafe' || msg.recommendedAction.riskLevel === 'Hazard'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-indigo-50 text-indigo-700'
                          }`}
                        >
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div
                            className={`text-[10px] font-bold uppercase tracking-wider ${
                              state.healthLevel === 'Unsafe' || msg.recommendedAction.riskLevel === 'Hazard'
                                ? 'text-rose-700'
                                : 'text-indigo-600'
                            }`}
                          >
                            {state.healthLevel === 'Unsafe'
                              ? 'Emergency Work-Loss Prevention'
                              : 'Recommended Safe Action'}
                          </div>
                          <h4 className="text-xs font-bold text-slate-900">{msg.recommendedAction.title}</h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {msg.recommendedAction.confidence} ({msg.recommendedAction.confidenceScore}%)
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            msg.recommendedAction.riskLevel === 'Hazard'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300 font-extrabold'
                              : msg.recommendedAction.riskLevel === 'Safe'
                              ? 'bg-slate-100 text-slate-700 border border-slate-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {msg.recommendedAction.riskLevel}
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 leading-normal">{msg.recommendedAction.summary}</p>

                    {/* Command Box */}
                    <div className="relative group">
                      <div className="p-3 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] flex items-center justify-between gap-2 overflow-x-auto shadow-inner">
                        <span>{msg.recommendedAction.command}</span>
                        <button
                          onClick={() => handleCopy(msg.recommendedAction!.command)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0 cursor-pointer"
                          title="Copy command"
                        >
                          {copiedCmd === msg.recommendedAction.command ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Expected Impact & Reversal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px] bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                      <div>
                        <span className="font-semibold text-slate-700">Expected Result:</span>
                        <p className="text-slate-600 mt-0.5">{msg.recommendedAction.expectedResult}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-amber-800 flex items-center gap-1">
                          <RotateCcw className="w-3 h-3 text-amber-600" /> Safe Reversal:
                        </span>
                        <p className="text-amber-900/90 font-mono text-[10px] mt-0.5 break-all">
                          {msg.recommendedAction.reversalStep}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        id={`preview-action-btn-${msg.id}`}
                        onClick={() => onPreviewAction(msg.recommendedAction!)}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Preview Diff & Scope</span>
                      </button>

                      {msg.executed ? (
                        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Action Verified & Executed</span>
                        </div>
                      ) : (
                        <button
                          id={`confirm-tidy-action-btn-${msg.id}`}
                          onClick={() => onExecuteAction(msg.recommendedAction!)}
                          disabled={executingActionId === msg.recommendedAction.id}
                          className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer ${
                            state.healthLevel === 'Unsafe' || msg.recommendedAction.riskLevel === 'Hazard'
                              ? 'bg-rose-600 hover:bg-rose-700'
                              : 'bg-indigo-600 hover:bg-indigo-700'
                          }`}
                        >
                          {executingActionId === msg.recommendedAction.id ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Preserving & Executing...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>
                                {state.healthLevel === 'Unsafe'
                                  ? 'Confirm Safe Preservation'
                                  : 'Run Safe Action'}
                              </span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Execution Success Card */}
                {msg.executionResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">{msg.executionResult.message}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono font-bold text-xs">
                      <span>{msg.executionResult.previousHealth}%</span>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-md">
                        {msg.executionResult.newHealth}% HP
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 pl-2">
            <div className="w-7 h-7 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-xs shadow-2xs">
              🐕
            </div>
            <div className="flex items-center gap-2 bg-slate-100/90 border border-slate-200/70 px-3.5 py-2.5 rounded-2xl">
              <span className="w-2 h-2 rounded-full bg-pink-600 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-pink-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-pink-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-slate-600 ml-1 font-medium">
                Consulting {selectedTier === 'deep' ? 'Gemini 2.5 Pro' : 'Gemini 2.5 Flash'}...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Categorized Quick Prompts Bar */}
      <div className="px-4 py-2.5 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <Sparkles className="w-3.5 h-3.5 text-pink-600 shrink-0" />
        {quickPromptCategories.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(item.prompt, selectedRole, selectedTier)}
            disabled={isLoading}
            className="text-[11px] font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-300 bg-white hover:bg-indigo-50/50 px-3 py-1.5 rounded-full border border-slate-200/90 transition-all whitespace-nowrap shrink-0 shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-slate-100 bg-white flex items-center gap-2.5">
        <input
          id="gitpet-chat-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask ${selectedRole === 'senior_architect' ? 'Architect' : selectedRole === 'safety_auditor' ? 'Safety Auditor' : selectedRole === 'git_tutor' ? 'Git Tutor' : 'Byte'} about repos, stashes, or safe commands...`}
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all placeholder:text-slate-400"
        />
        <button
          id="gitpet-chat-send-btn"
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-3 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-40 disabled:hover:bg-pink-600 transition-all shadow-xs cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
