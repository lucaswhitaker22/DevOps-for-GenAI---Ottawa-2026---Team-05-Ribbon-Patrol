export type HealthLevel = 'Healthy' | 'Attention' | 'Blocked' | 'Unsafe';

export type SymptomType =
  | 'behind_remote'
  | 'unpushed_work'
  | 'merge_conflict'
  | 'stale_branch'
  | 'detached_head'
  | 'clean_sync'
  | 'destructive_hazard'
  | 'failed_build'
  | 'flaky_tests'
  | 'vulnerability_risk'
  | 'deploy_success'
  | 'pr_changes_requested'
  | 'pr_pending_review'
  | 'pr_conflicted'
  | 'pr_approved_ready'
  | 'lost_map'
  | 'smoke_cloud'
  | 'shield_cracked';

export type PipelineBuildStatus = 'passed' | 'failed' | 'running' | 'queued';
export type TestSuiteHealth = 'healthy' | 'flaky' | 'failing';
export type VulnerabilitySeverity = 'none' | 'low' | 'medium' | 'high' | 'critical';

export type PullRequestReviewStatus = 'approved' | 'changes_requested' | 'commented' | 'pending';
export type PullRequestMergeability = 'clean' | 'conflicted' | 'blocked' | 'unknown';

export interface PRCommentItem {
  id: string;
  author: string;
  avatarUrl?: string;
  filePath: string;
  line: number;
  commentText: string;
  timestamp: string;
  resolved: boolean;
}

export interface PullRequestInfo {
  number: number;
  title: string;
  author: string;
  branch: string;
  baseBranch: string;
  status: 'open' | 'merged' | 'closed' | 'draft';
  reviewStatus: PullRequestReviewStatus;
  mergeability: PullRequestMergeability;
  approvalsCount: number;
  requestedChangesCount: number;
  requestedReviewers: string[];
  commentsCount: number;
  comments: PRCommentItem[];
  waitingDays: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface PipelineStep {
  name: string;
  status: 'success' | 'failed' | 'running' | 'pending' | 'warning';
  duration: string;
  logSummary?: string;
}

export interface FlakyTestItem {
  id: string;
  name: string;
  suite: string;
  failureRate: number; // e.g. 30%
  lastFailedCommit: string;
}

export interface SecurityVulnerability {
  id: string;
  cveId: string;
  package: string;
  severity: VulnerabilitySeverity;
  title: string;
  remediation: string;
}

export interface CICDPipelineState {
  pipelineId: string;
  buildStatus: PipelineBuildStatus;
  testHealth: TestSuiteHealth;
  passRate: number; // 0 - 100%
  flakyTests: FlakyTestItem[];
  vulnerabilities: SecurityVulnerability[];
  deployTarget: 'staging' | 'production' | 'none';
  deployStatus: 'success' | 'deploying' | 'failed' | 'idle';
  lastRunTime: string;
  coveragePercentage?: number; // 0 - 100%
  pipelineSteps: PipelineStep[];
}

export interface FileChange {
  path: string;
  status: 'modified' | 'staged' | 'untracked' | 'conflicted';
  additions: number;
  deletions: number;
  diffSnippet: string;
}

export interface CommitInfo {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  timestamp: string;
  isRemote?: boolean;
  isLocal?: boolean;
  parents?: string[];
  branchRef?: string;
  isHead?: boolean;
}

export type DagNodeRole =
  | 'head'
  | 'upstream_head'
  | 'local_ahead'
  | 'remote_behind'
  | 'merge_base'
  | 'fork_point'
  | 'detached'
  | 'conflicted'
  | 'hazard'
  | 'sync_clean'
  | 'collapsed_run';

export interface DagCommitNode {
  id: string;
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  timestamp: string;
  laneIndex: number;
  laneName: string;
  role: DagNodeRole;
  isHead: boolean;
  isUpstreamHead: boolean;
  isLocalAhead: boolean;
  isRemoteBehind: boolean;
  isMergeBase: boolean;
  isForkPoint: boolean;
  isDetached: boolean;
  isConflicted?: boolean;
  isHazard?: boolean;
  parents: string[];
  children: string[];
  x: number;
  y: number;
  isCollapsedGroup?: boolean;
  collapsedCount?: number;
  collapsedCommitIds?: string[];
  tags?: string[];
}

export interface DagEdge {
  id: string;
  fromId: string;
  toId: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  isDivergent: boolean;
  isMerge: boolean;
  isDirect: boolean;
  isHazard?: boolean;
  isConflicted?: boolean;
}

export interface DagLane {
  index: number;
  name: string;
  shortName: string;
  color: string;
  isCurrent: boolean;
  isUpstream: boolean;
  x: number;
}

export interface DagGraph {
  nodes: DagCommitNode[];
  edges: DagEdge[];
  lanes: DagLane[];
  width: number;
  height: number;
  headNodeId?: string;
  upstreamNodeId?: string;
  mergeBaseNodeId?: string;
  hasIncompleteHistory?: boolean;
  incompleteHistoryReason?: string;
  collapsedGroupCount: number;
}

export interface StashItem {
  id: string;
  index: number;
  message: string;
  timestamp: string;
  fileCount: number;
  files: string[];
}

export interface BranchState {
  name: string;
  upstream: string | null;
  aheadCount: number;
  behindCount: number;
  isDetached: boolean;
  isStale: boolean;
  staleDays?: number;
  lastCommitMessage: string;
  lastCommitHash: string;
  lastActivity: string;
}

export interface RiskFactorItem {
  id:
    | 'branch_divergence'
    | 'failed_tests'
    | 'secrets_detected'
    | 'code_smells'
    | 'vulnerabilities'
    | 'unreviewed_commits'
    | 'large_pr_size';
  name: string;
  impact: number; // e.g. -12 or 0
  status: 'good' | 'warning' | 'critical';
  details: string;
  recommendation: string;
  metricLabel?: string;
}

export interface RiskScoreBreakdown {
  overallScore: number; // 0 - 100
  healthLevel: HealthLevel;
  riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Critical Risk';
  summary: string;
  factors: RiskFactorItem[];
}

export type ReleasePillarId =
  | 'tests_passing'
  | 'coverage'
  | 'vulnerabilities'
  | 'pr_approvals'
  | 'branch_freshness';

export interface ReleaseReadinessMetric {
  id: ReleasePillarId;
  name: string;
  score: number; // 0 - 100
  weight: number; // e.g. 0.25
  status: 'passed' | 'warning' | 'failed';
  value: string;
  target?: string;
  details: string;
  recommendation: string;
  icon: string;
}

export interface ReleaseSignOffItem {
  id: string;
  label: string;
  passed: boolean;
  required: boolean;
  details: string;
}

export interface ReleaseReadinessReport {
  overallScore: number; // 0 - 100%
  status: 'green' | 'amber' | 'red';
  statusLabel: 'Ready to Ship' | 'Caution / Review' | 'Blocked';
  headline: string; // e.g. "Release readiness: 87%. One high-severity vulnerability prevents green status."
  blockers: string[];
  warnings: string[];
  metrics: {
    testsPassing: ReleaseReadinessMetric;
    coverage: ReleaseReadinessMetric;
    vulnerabilities: ReleaseReadinessMetric;
    prApprovals: ReleaseReadinessMetric;
    branchFreshness: ReleaseReadinessMetric;
  };
  executiveSummary: string;
  canShip: boolean;
  signOffChecklist: ReleaseSignOffItem[];
  generatedAt: string;
}

export interface RepositoryState {
  repoName: string;
  currentBranch: BranchState;
  allBranches: string[];
  workingTree: FileChange[];
  stashes: StashItem[];
  localCommitsAhead: CommitInfo[];
  remoteCommitsBehind: CommitInfo[];
  commitHistory: CommitInfo[];
  healthPercentage: number;
  healthLevel: HealthLevel;
  primarySymptom: SymptomType;
  symptomTitle: string;
  symptomDescription: string;
  operatorMeaning: string;
  destructiveRiskWarning?: string;
  lossRiskSummary?: string;
  isLiveMode?: boolean;
  upstreamUnavailable?: boolean;
  repositoryUnavailable?: boolean;
  scannedAt?: string;
  pipelineState?: CICDPipelineState;
  activePullRequest?: PullRequestInfo;
  riskBreakdown?: RiskScoreBreakdown;
  releaseReadiness?: ReleaseReadinessReport;
  secretsDetectedCount?: number;
  codeSmellsCount?: number;
  unreviewedCommitsCount?: number;
}

export interface RecommendedAction {
  id: string;
  title: string;
  summary: string;
  command: string;
  confidence: 'High' | 'Medium' | 'Low';
  confidenceScore: number;
  riskLevel: 'Safe' | 'Caution' | 'Protected' | 'Hazard';
  expectedResult: string;
  reversalStep: string;
  evidence: string[];
  affectedFiles: string[];
  destructiveLossWarning?: string;
  steps: {
    label: string;
    command: string;
    details: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: string;
  text: string;
  role?: ChatRole;
  modelUsed?: string;
  evidenceSummary?: {
    symptom: string;
    healthLevel: HealthLevel;
    evidencePoints: string[];
  };
  recommendedAction?: RecommendedAction;
  executed?: boolean;
  executionResult?: {
    success: boolean;
    message: string;
    previousHealth: number;
    newHealth: number;
  };
}

export type ChatRole =
  | 'byte_mascot'
  | 'senior_architect'
  | 'safety_auditor'
  | 'git_tutor';

export type ModelTier = 'fast' | 'general' | 'deep';

export type AssetStatus = 'preview' | 'approved';

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
  aspectRatio: string;
  mode: 'create' | 'edit';
  originalImage?: string;
  sourceAssetId?: string;
  status?: AssetStatus;
  targetHealthState?: HealthLevel;
  requestId?: string;
  approvedAt?: string;
}

export interface PetAsset {
  id: string;
  prompt: string;
  imageUrl: string;
  aspectRatio: string;
  status: AssetStatus;
  targetHealthState?: HealthLevel;
  sourceAssetId?: string;
  createdAt: string;
  approvedAt?: string;
  requestId?: string;
}


export type LiveVoiceState =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'listening'
  | 'speaking'
  | 'error';

export interface LiveTranscriptItem {
  id: string;
  sender: 'user' | 'byte';
  text: string;
  timestamp: string;
}

export interface ChatHistoryEntry {
  role: 'user' | 'model';
  parts: { text: string }[];
}


export interface PracticeStats {
  cleanCommitStreak: number;
  verifiedSyncs: number;
  stewardshipScore: number;
  badges: {
    id: string;
    name: string;
    icon: string;
    description: string;
    unlockedAt?: string;
    progress: number; // 0 to 100
  }[];
}

export interface ScenarioPreset {
  id: string;
  title: string;
  badge: string;
  description: string;
  petExpression: string;
  state: RepositoryState;
  samplePrompt: string;
}

export interface LiveWorkspaceStatusResponse {
  requestId: string;
  success: boolean;
  live: true;
  timestamp: string;
  repositoryUnavailable?: boolean;
  upstreamUnavailable?: boolean;
  isDetached?: boolean;
  message?: string;
  state?: RepositoryState;
  rawSummary?: {
    branch: string;
    upstream: string | null;
    aheadCount: number;
    behindCount: number;
    dirtyFileCount: number;
    totalDirtyFiles: number;
    isDetached: boolean;
  };
}

export interface LiveScanState {
  loading: boolean;
  lastRefreshed?: string;
  error?: string | null;
  unavailable?: boolean;
}

export type ConventionalCommitType =
  | 'feat'
  | 'fix'
  | 'refactor'
  | 'docs'
  | 'style'
  | 'test'
  | 'chore'
  | 'perf'
  | 'ci';

export interface GeneratedCommitSuggestion {
  id: string;
  type: ConventionalCommitType;
  scope: string;
  subject: string;
  body?: string;
  breakingChange?: string;
  formattedCommit: string;
  reasoning: string;
}

export interface GeneratedChangelog {
  version: string;
  date: string;
  features: string[];
  fixes: string[];
  refactors: string[];
  breakingChanges: string[];
  formattedMarkdown: string;
}

export interface GeneratedReleaseNotes {
  title: string;
  version: string;
  summary: string;
  highlights: string[];
  contributors: string[];
  formattedMarkdown: string;
}

export type ActivePageId = 'companion' | 'repository' | 'cicd' | 'pr' | 'release' | 'risk';

