import { RepositoryState, ScenarioPreset, PracticeStats, HealthLevel, SymptomType } from '../types';

export const INITIAL_PRACTICE_STATS: PracticeStats = {
  cleanCommitStreak: 5,
  verifiedSyncs: 18,
  stewardshipScore: 92,
  badges: [
    {
      id: 'clean_streak',
      name: 'Clean Commit Streak',
      icon: 'Flame',
      description: 'Maintained 5 consecutive verified clean repository reviews',
      unlockedAt: '2026-08-20',
      progress: 100,
    },
    {
      id: 'branch_steward',
      name: 'Branch Stewardship',
      icon: 'ShieldCheck',
      description: 'Merged and tidied branches with explicit context and no dangling work',
      unlockedAt: '2026-08-18',
      progress: 100,
    },
    {
      id: 'verified_sync',
      name: 'Sync Master',
      icon: 'RefreshCw',
      description: 'Synchronized remote branches cleanly with zero unhandled divergence',
      progress: 75,
    },
  ],
};

// Scenario 1: MVP Deterministic Scenario (Remote updates with local work)
export const MVP_SCENARIO: ScenarioPreset = {
  id: 'mvp_sync_divergence',
  title: 'MVP: Remote Updates & Local Edits',
  badge: 'Hackathon MVP',
  description: 'The remote branch gained 3 commits. You have 2 local uncommitted files.',
  petExpression: 'Carrying an overfilled backpack & pulling toward remote leash',
  samplePrompt: 'Status report! What needs attention?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'feature/cart',
      upstream: 'origin/feature/cart',
      aheadCount: 0,
      behindCount: 3,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'feat(cart): implement quantity stepper counter',
      lastCommitHash: '8a1f49c',
      lastActivity: '2 hours ago',
    },
    allBranches: ['main', 'feature/cart', 'fix/checkout-tax', 'refactor/auth-v2'],
    workingTree: [
      {
        path: 'src/components/cart/CartDrawer.tsx',
        status: 'modified',
        additions: 18,
        deletions: 4,
        diffSnippet: `@@ -42,7 +42,9 @@ export const CartDrawer = () => {
-  const [isOpen, setIsOpen] = useState(false);
+  const [isOpen, setIsOpen] = useState(false);
+  const [promoCode, setPromoCode] = useState('');
+  const [discountApplied, setDiscountApplied] = useState(false);`,
      },
      {
        path: 'src/services/pricingService.ts',
        status: 'modified',
        additions: 12,
        deletions: 1,
        diffSnippet: `@@ -15,3 +15,7 @@ export function calculateSubtotal(items: CartItem[]) {
   return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
 }
+export function applyPromoDiscount(subtotal: number, promo: string) {
+  if (promo === 'SAVE20') return subtotal * 0.8;
+  return subtotal;
+}`,
      },
    ],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [
      {
        hash: 'c90e14a872bfb192837482',
        shortHash: 'c90e14a',
        message: 'fix(cart): reconcile tax calculation with state rules',
        author: 'Sarah Chen <sarah@acme.dev>',
        timestamp: '1 hour ago',
        isRemote: true,
      },
      {
        hash: 'b412d098e7216a73849182',
        shortHash: 'b412d09',
        message: 'feat(cart): add optimistic inventory lock during checkout',
        author: 'Marcus Vance <marcus@acme.dev>',
        timestamp: '2 hours ago',
        isRemote: true,
      },
      {
        hash: 'a718c3298a09f871625391',
        shortHash: 'a718c32',
        message: 'refactor(cart): extract currency formatter utility',
        author: 'Sarah Chen <sarah@acme.dev>',
        timestamp: '3 hours ago',
        isRemote: true,
      },
    ],
    commitHistory: [
      {
        hash: '8a1f49c123498172938471',
        shortHash: '8a1f49c',
        message: 'feat(cart): implement quantity stepper counter',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '2 hours ago',
      },
      {
        hash: '5d820ea981273918273918',
        shortHash: '5d820ea',
        message: 'chore: setup cart drawer layout structure',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: 'Yesterday',
      },
      {
        hash: '1e4a779182739182739182',
        shortHash: '1e4a779',
        message: 'merge: main into feature/cart',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '2 days ago',
      },
    ],
    healthPercentage: 68,
    healthLevel: 'Attention',
    primarySymptom: 'behind_remote',
    symptomTitle: 'Behind Remote with Local Edits',
    symptomDescription: 'feature/cart is 3 commits behind origin/feature/cart with 2 uncommitted modified files.',
    operatorMeaning: 'Stash or protect local changes before synchronizing to prevent merge contamination.',
  },
};

// Scenario 2: Merge Conflict (Tangled yarn)
export const CONFLICT_SCENARIO: ScenarioPreset = {
  id: 'merge_conflict',
  title: 'Merge Conflict in Progress',
  badge: 'Blocked',
  description: 'Git rebase paused due to conflicting changes in 2 files.',
  petExpression: 'Tangled in red & gray yarn with distressed eyes',
  samplePrompt: 'Help! How do I resolve this merge conflict safely?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'feature/cart (rebasing on main)',
      upstream: 'origin/main',
      aheadCount: 2,
      behindCount: 1,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'fix(checkout): adjust billing address validator',
      lastCommitHash: '4f29a01',
      lastActivity: '10 mins ago',
    },
    allBranches: ['main', 'feature/cart', 'fix/checkout-tax'],
    workingTree: [
      {
        path: 'src/services/paymentService.ts',
        status: 'conflicted',
        additions: 15,
        deletions: 12,
        diffSnippet: `<<<<<<< HEAD (origin/main)
export const STRIPE_CONFIG = { apiVersion: '2025-01-15', timeout: 8000 };
=======
export const STRIPE_CONFIG = { apiVersion: '2025-02-01', retryMax: 3 };
>>>>>>> 4f29a01 (fix(checkout))`,
      },
      {
        path: 'src/components/checkout/PaymentForm.tsx',
        status: 'conflicted',
        additions: 8,
        deletions: 6,
        diffSnippet: `<<<<<<< HEAD
const handlePayment = async (token: string, currency: string) => {
=======
const handlePayment = async (token: string, currency: CurrencyCode) => {
>>>>>>> 4f29a01`,
      },
    ],
    stashes: [
      {
        id: 'stash-0',
        index: 0,
        message: 'WIP on cart: temporary styling mock',
        timestamp: '1 hour ago',
        fileCount: 1,
        files: ['src/components/cart/CartDrawer.css'],
      },
    ],
    localCommitsAhead: [
      {
        hash: '4f29a01872918237198273',
        shortHash: '4f29a01',
        message: 'fix(checkout): adjust billing address validator',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '10 mins ago',
        isLocal: true,
      },
    ],
    remoteCommitsBehind: [
      {
        hash: '7b91d4e182938172918273',
        shortHash: '7b91d4e',
        message: 'feat(payments): upgrade stripe client sdk',
        author: 'Elena Gomez <elena@acme.dev>',
        timestamp: '30 mins ago',
        isRemote: true,
      },
    ],
    commitHistory: [
      {
        hash: '7b91d4e182938172918273',
        shortHash: '7b91d4e',
        message: 'feat(payments): upgrade stripe client sdk',
        author: 'Elena Gomez <elena@acme.dev>',
        timestamp: '30 mins ago',
      },
      {
        hash: '1e4a779182739182739182',
        shortHash: '1e4a779',
        message: 'chore: base commit',
        author: 'Team Acme',
        timestamp: '3 days ago',
      },
    ],
    healthPercentage: 35,
    healthLevel: 'Blocked',
    primarySymptom: 'merge_conflict',
    symptomTitle: 'Rebase Blocked: Conflicting Files',
    symptomDescription: '2 files contain unmerged git conflict markers (paymentService.ts, PaymentForm.tsx).',
    operatorMeaning: 'Inspect conflicting hunks, choose intentional logic or abort rebase to preserve sanity.',
  },
};

// Scenario 3: Detached HEAD (Looking lost)
export const DETACHED_HEAD_SCENARIO: ScenarioPreset = {
  id: 'detached_head',
  title: 'Detached HEAD State',
  badge: 'Caution',
  description: 'Checked out direct commit hash e4f9b12 without a branch reference.',
  petExpression: 'Looking around confused with a wandering compass and question mark',
  samplePrompt: 'Why is HEAD detached and how do I save my new commit?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'HEAD detached at e4f9b12',
      upstream: null,
      aheadCount: 1,
      behindCount: 0,
      isDetached: true,
      isStale: false,
      lastCommitMessage: 'experiment: try web worker for cart calculations',
      lastCommitHash: 'e4f9b12',
      lastActivity: 'Just now',
    },
    allBranches: ['main', 'feature/cart', 'fix/checkout-tax'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [
      {
        hash: 'e4f9b12398471928371928',
        shortHash: 'e4f9b12',
        message: 'experiment: try web worker for cart calculations',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '5 mins ago',
        isLocal: true,
      },
    ],
    remoteCommitsBehind: [],
    commitHistory: [
      {
        hash: 'e4f9b12398471928371928',
        shortHash: 'e4f9b12',
        message: 'experiment: try web worker for cart calculations',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '5 mins ago',
      },
      {
        hash: '8a1f49c123498172938471',
        shortHash: '8a1f49c',
        message: 'feat(cart): implement quantity stepper counter',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: 'Yesterday',
      },
    ],
    healthPercentage: 50,
    healthLevel: 'Attention',
    primarySymptom: 'detached_head',
    symptomTitle: 'Detached HEAD: Floating Commit',
    symptomDescription: 'Commit e4f9b12 is not attached to any named branch and could be garbage collected.',
    operatorMeaning: 'Create a named branch pointing to this commit before switching branches.',
  },
};

// Scenario 4: Stale Branch (Sleepy and dusty)
export const STALE_BRANCH_SCENARIO: ScenarioPreset = {
  id: 'stale_branch',
  title: 'Stale Merged Branch',
  badge: 'Cleanup',
  description: 'Branch feature/oauth-login was merged into main 42 days ago.',
  petExpression: 'Cozy nightcap, dusty cobweb, soft snoozing Zzz particles',
  samplePrompt: 'Is this branch safe to delete or archive?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'feature/oauth-login',
      upstream: 'origin/feature/oauth-login (merged)',
      aheadCount: 0,
      behindCount: 0,
      isDetached: false,
      isStale: true,
      staleDays: 42,
      lastCommitMessage: 'Merge pull request #104 from acme/feature/oauth-login',
      lastCommitHash: '9d201ff',
      lastActivity: '42 days ago',
    },
    allBranches: ['main', 'feature/cart', 'feature/oauth-login'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [
      {
        hash: '9d201ff123984719283719',
        shortHash: '9d201ff',
        message: 'Merge pull request #104 from acme/feature/oauth-login into main',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '42 days ago',
      },
    ],
    healthPercentage: 74,
    healthLevel: 'Attention',
    primarySymptom: 'stale_branch',
    symptomTitle: 'Stale Merged Branch (42 days)',
    symptomDescription: 'All commits exist in main. Local branch has no active work.',
    operatorMeaning: 'Switch back to main and safely remove local reference to maintain repository hygiene.',
  },
};

// Scenario 5: Unpushed Work (Overstuffed Backpack)
export const UNPUSHED_WORK_SCENARIO: ScenarioPreset = {
  id: 'unpushed_work',
  title: 'Unpushed Local Commits',
  badge: 'Sync Needed',
  description: 'You have 3 local commits ahead of origin/feature/cart that teammates cannot see.',
  petExpression: 'Carrying a heavy backpack packed with commit blocks and gold stars',
  samplePrompt: 'What commits are unpushed?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'feature/cart',
      upstream: 'origin/feature/cart',
      aheadCount: 3,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'test(cart): add integration test for zero-quantity items',
      lastCommitHash: '3c81a20',
      lastActivity: '15 mins ago',
    },
    allBranches: ['main', 'feature/cart'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [
      {
        hash: '3c81a20918237192837192',
        shortHash: '3c81a20',
        message: 'test(cart): add integration test for zero-quantity items',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '15 mins ago',
        isLocal: true,
      },
      {
        hash: '2b71901928371928371928',
        shortHash: '2b71901',
        message: 'feat(cart): display estimated shipping cost in summary',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '45 mins ago',
        isLocal: true,
      },
      {
        hash: '1a61801928371928371928',
        shortHash: '1a61801',
        message: 'style(cart): polish item badge shadows & transitions',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '2 hours ago',
        isLocal: true,
      },
    ],
    remoteCommitsBehind: [],
    commitHistory: [
      {
        hash: '3c81a20918237192837192',
        shortHash: '3c81a20',
        message: 'test(cart): add integration test for zero-quantity items',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '15 mins ago',
      },
    ],
    healthPercentage: 85,
    healthLevel: 'Attention',
    primarySymptom: 'unpushed_work',
    symptomTitle: '3 Commits Ahead of Remote',
    symptomDescription: '3 commits ready for remote backup & team visibility.',
    operatorMeaning: 'Review unpushed commits and push upstream to share with teammates.',
  },
};

// Scenario 6: Clean & Healthy
export const CLEAN_HEALTHY_SCENARIO: ScenarioPreset = {
  id: 'clean_healthy',
  title: 'Clean & Synchronized',
  badge: 'Healthy 100%',
  description: 'Branch is fully synchronized with origin/main with a pristine working tree.',
  petExpression: 'Playful bouncy tail, sparkling green aura, happy smiling posture',
  samplePrompt: 'Status check! Are we good to ship?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'main',
      upstream: 'origin/main',
      aheadCount: 0,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'release(v2.4.0): production deployment bundle',
      lastCommitHash: '6f01ba3',
      lastActivity: '10 mins ago',
    },
    allBranches: ['main', 'feature/cart', 'fix/checkout-tax'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [
      {
        hash: '6f01ba3192837192837192',
        shortHash: '6f01ba3',
        message: 'release(v2.4.0): production deployment bundle',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '10 mins ago',
      },
      {
        hash: '4e921a9182739182739182',
        shortHash: '4e921a9',
        message: 'Merge pull request #108 from acme/feature/cart',
        author: 'Sarah Chen <sarah@acme.dev>',
        timestamp: '1 hour ago',
      },
    ],
    healthPercentage: 100,
    healthLevel: 'Healthy',
    primarySymptom: 'clean_sync',
    symptomTitle: 'Synchronized & Pristine',
    symptomDescription: 'Working directory clean, 0 commits ahead/behind origin/main.',
    operatorMeaning: 'Repository in ideal state. Ready for code reviews, testing, or release.',
  },
};

// Scenario 7: Unsafe 0% Health Destructive Hazard (1.1 Roadmap Specification)
export const UNSAFE_LOSS_RISK_SCENARIO: ScenarioPreset = {
  id: 'unsafe_loss_risk',
  title: 'Unsafe: Destructive Loss Hazard',
  badge: 'Unsafe 0%',
  description: 'Remote branch was force-pushed while you have 3 uncommitted files with payment logic. Blind pull or hard reset will permanently destroy uncommitted work.',
  petExpression: 'Frozen still in grayscale with alert crimson aura and warning barrier',
  samplePrompt: 'EMERGENCY: What is the risk of pulling right now and how do I preserve my work safely?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'feature/checkout-refactor',
      upstream: 'origin/feature/checkout-refactor (force-pushed)',
      aheadCount: 2,
      behindCount: 4,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'feat(checkout): add idempotent transaction lock token',
      lastCommitHash: 'f82c19a',
      lastActivity: '3 mins ago',
    },
    allBranches: ['main', 'feature/checkout-refactor', 'feature/cart', 'fix/checkout-tax'],
    workingTree: [
      {
        path: 'src/services/paymentGateway.ts',
        status: 'modified',
        additions: 34,
        deletions: 8,
        diffSnippet: `@@ -88,6 +88,14 @@ export async function processSecureTransaction(payload: PaymentPayload) {
+  // CRITICAL: Uncommitted zero-loss idempotency token
+  const idempotencyKey = crypto.randomUUID();
+  const signedPayload = await signTransactionWithHmac(payload, idempotencyKey);
+  const auditLog = await recordPreflightTransaction(idempotencyKey);`,
      },
      {
        path: 'src/components/checkout/StripeProvider.tsx',
        status: 'modified',
        additions: 22,
        deletions: 5,
        diffSnippet: `@@ -112,4 +112,9 @@ export const StripeProvider: React.FC = ({ children }) => {
+  const [recoveryLock, setRecoveryLock] = useState<boolean>(true);
+  const [sessionToken, setSessionToken] = useState<string | null>(null);`,
      },
      {
        path: 'src/utils/securityAudit.ts',
        status: 'untracked',
        additions: 45,
        deletions: 0,
        diffSnippet: `+export function auditSensitiveHandoff(sessionId: string) {
+  console.info('[AUDIT] Preserving in-flight payment session', sessionId);
+  return { verified: true, timestamp: Date.now() };
+}`,
      },
    ],
    stashes: [],
    localCommitsAhead: [
      {
        hash: 'f82c19a918237192837192',
        shortHash: 'f82c19a',
        message: 'feat(checkout): add idempotent transaction lock token',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '3 mins ago',
        isLocal: true,
      },
      {
        hash: 'e71b08a918237192837192',
        shortHash: 'e71b08a',
        message: 'refactor(checkout): streamline payment payload sanitization',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '25 mins ago',
        isLocal: true,
      },
    ],
    remoteCommitsBehind: [
      {
        hash: 'd60a97c918237192837192',
        shortHash: 'd60a97c',
        message: 'FORCE-PUSH: upstream rebased on main by release-bot (rewrote 4 commits)',
        author: 'Release Bot <bot@acme.dev>',
        timestamp: '1 min ago',
        isRemote: true,
      },
      {
        hash: 'c59b86c918237192837192',
        shortHash: 'c59b86c',
        message: 'fix(core): hotfix critical security patch for token validation',
        author: 'Security Lead <sec@acme.dev>',
        timestamp: '10 mins ago',
        isRemote: true,
      },
    ],
    commitHistory: [
      {
        hash: 'f82c19a918237192837192',
        shortHash: 'f82c19a',
        message: 'feat(checkout): add idempotent transaction lock token',
        author: 'Lucas Whitaker <lucas@acme.dev>',
        timestamp: '3 mins ago',
      },
    ],
    healthPercentage: 0,
    healthLevel: 'Unsafe',
    primarySymptom: 'destructive_hazard',
    symptomTitle: 'Destructive Work-Loss Hazard',
    symptomDescription: 'Remote origin was force-pushed with 4 dropped commits while you have 3 uncommitted files in working tree. An automated pull, merge, or hard reset will destroy in-flight work.',
    operatorMeaning: 'Halt all automatic writes. Preserve active edits with git stash and create a backup branch before safely fetching upstream.',
    destructiveRiskWarning: 'IMMEDIATE DATA LOSS HAZARD: 3 modified & untracked files (paymentGateway.ts, StripeProvider.tsx, securityAudit.ts) will be irreversibly overwritten if pull or reset runs without preservation.',
    lossRiskSummary: 'Upstream force-push divergence with 3 uncommitted local payment files.',
  },
};

export const FAILED_BUILD_SCENARIO: ScenarioPreset = {
  id: 'cicd_failed_build',
  title: 'CI/CD: Build Failure',
  badge: 'CI Pipeline',
  description: 'The automated CI build failed due to TypeScript compilation & test errors in job #1042.',
  petExpression: 'Sick bot with fever thermometer, dizzy eyes, and toxic build error aura',
  samplePrompt: 'Why did the build fail in CI?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'feature/payment-v2',
      upstream: 'origin/feature/payment-v2',
      aheadCount: 1,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'feat(pay): add Stripe SDK v3 handler',
      lastCommitHash: 'e92a411',
      lastActivity: '10 minutes ago',
    },
    allBranches: ['main', 'feature/payment-v2'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [],
    healthPercentage: 35,
    healthLevel: 'Blocked',
    primarySymptom: 'failed_build',
    symptomTitle: 'CI Build Failed (Job #1042)',
    symptomDescription: 'Compilation error: Type "string" is not assignable to type "PaymentAmount" in src/services/pay.ts.',
    operatorMeaning: 'Inspect pipeline compilation logs and fix type errors before requesting review.',
    pipelineState: {
      pipelineId: 'job-1042',
      buildStatus: 'failed',
      testHealth: 'failing',
      passRate: 42,
      flakyTests: [],
      vulnerabilities: [],
      deployTarget: 'staging',
      deployStatus: 'failed',
      lastRunTime: '4 minutes ago',
      pipelineSteps: [
        { name: 'Lint & Format', status: 'success', duration: '12s' },
        { name: 'TypeScript Compilation', status: 'failed', duration: '18s', logSummary: 'TS2322: Type "string" is not assignable to type "number" in src/services/pay.ts:42' },
        { name: 'Unit Tests', status: 'failed', duration: '5s', logSummary: '1/12 suites passed' },
        { name: 'Security Audit', status: 'pending', duration: '0s' },
        { name: 'Deploy Staging', status: 'pending', duration: '0s' },
      ],
    },
  },
};

export const FLAKY_TESTS_SCENARIO: ScenarioPreset = {
  id: 'cicd_flaky_tests',
  title: 'CI/CD: Flaky Test Suite',
  badge: 'Test Health',
  description: 'Integration test suite passed on 2nd retry, but 3 flaky tests were flagged in auth.spec.ts.',
  petExpression: 'Nervous trembling companion with sweat drops and anxious wide eyes',
  samplePrompt: 'Which tests are flaky and causing build instability?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'refactor/auth-tokens',
      upstream: 'origin/refactor/auth-tokens',
      aheadCount: 0,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'refactor(auth): introduce JWT refresh rotation',
      lastCommitHash: 'd71a829',
      lastActivity: '30 minutes ago',
    },
    allBranches: ['main', 'refactor/auth-tokens'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [],
    healthPercentage: 68,
    healthLevel: 'Attention',
    primarySymptom: 'flaky_tests',
    symptomTitle: 'Flaky Tests Detected in Pipeline',
    symptomDescription: '3 integration tests passed only after auto-retry due to race conditions in session storage.',
    operatorMeaning: 'Quarantine intermittent test cases to restore deterministic CI confidence.',
    pipelineState: {
      pipelineId: 'job-1043',
      buildStatus: 'passed',
      testHealth: 'flaky',
      passRate: 88,
      flakyTests: [
        { id: 'flaky-1', name: 'should refresh token concurrently', suite: 'auth.spec.ts', failureRate: 35, lastFailedCommit: 'd71a829' },
        { id: 'flaky-2', name: 'should release lock on timeout', suite: 'redisLock.spec.ts', failureRate: 20, lastFailedCommit: 'c41a290' },
      ],
      vulnerabilities: [],
      deployTarget: 'staging',
      deployStatus: 'success',
      lastRunTime: '12 minutes ago',
      pipelineSteps: [
        { name: 'Lint & Format', status: 'success', duration: '10s' },
        { name: 'TypeScript Compilation', status: 'success', duration: '14s' },
        { name: 'Unit & E2E Tests', status: 'warning', duration: '1m 45s', logSummary: 'Passed on Retry #2: 3 flaky tests detected' },
        { name: 'Security Audit', status: 'success', duration: '22s' },
        { name: 'Deploy Staging', status: 'success', duration: '40s' },
      ],
    },
  },
};

export const VULNERABILITY_SCENARIO: ScenarioPreset = {
  id: 'cicd_vulnerability',
  title: 'CI/CD: Security Vulnerability',
  badge: 'Security Scan',
  description: 'Snyk & GitHub Dependabot flagged a High-Severity CVE vulnerability in an imported dependency.',
  petExpression: 'Shielded bot wearing a heavy metallic security chestplate & energy barrier',
  samplePrompt: 'What security vulnerabilities were found and how do I patch them?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'main',
      upstream: 'origin/main',
      aheadCount: 0,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'chore: bump dependencies for Q3 audit',
      lastCommitHash: 'a10b9c8',
      lastActivity: '1 hour ago',
    },
    allBranches: ['main'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [],
    healthPercentage: 55,
    healthLevel: 'Attention',
    primarySymptom: 'vulnerability_risk',
    symptomTitle: 'High-Severity Vulnerability (CVE-2026-8819)',
    symptomDescription: 'Arbitrary Code Execution in tar package v6.1.0 detected by static analysis scanner.',
    operatorMeaning: 'Run npm audit fix or update package.json to tar ^6.2.1 immediately.',
    pipelineState: {
      pipelineId: 'job-1044',
      buildStatus: 'passed',
      testHealth: 'healthy',
      passRate: 100,
      flakyTests: [],
      vulnerabilities: [
        {
          id: 'vuln-101',
          cveId: 'CVE-2026-8819',
          package: 'tar@6.1.0',
          severity: 'high',
          title: 'Arbitrary Path Traversal & Unsafe Extraction',
          remediation: 'Upgrade to tar >= 6.2.1',
        },
        {
          id: 'vuln-102',
          cveId: 'CVE-2026-4102',
          package: 'axios@0.21.1',
          severity: 'medium',
          title: 'SSRF in Redirect Handling',
          remediation: 'Upgrade to axios >= 1.7.4',
        },
      ],
      deployTarget: 'production',
      deployStatus: 'idle',
      lastRunTime: '25 minutes ago',
      pipelineSteps: [
        { name: 'Lint & Format', status: 'success', duration: '8s' },
        { name: 'TypeScript Compilation', status: 'success', duration: '12s' },
        { name: 'Unit Tests', status: 'success', duration: '45s' },
        { name: 'Security Audit', status: 'warning', duration: '15s', logSummary: '2 Vulnerabilities (1 High, 1 Medium)' },
        { name: 'Deploy Production', status: 'pending', duration: '0s' },
      ],
    },
  },
};

export const DEPLOYMENT_SUCCESS_SCENARIO: ScenarioPreset = {
  id: 'cicd_deploy_success',
  title: 'CI/CD: Deployment Success',
  badge: 'Production CD',
  description: 'Continuous Deployment pipeline successfully deployed commit #9f81a2c to prod-us-east-1.',
  petExpression: 'Celebratory bot wearing party hat, dancing with festive confetti & fireworks sparkles',
  samplePrompt: 'Is the deployment live and healthy in production?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'main',
      upstream: 'origin/main',
      aheadCount: 0,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'release: v2.4.0 checkout promotion system',
      lastCommitHash: '9f81a2c',
      lastActivity: '2 minutes ago',
    },
    allBranches: ['main', 'release/v2.4.0'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [],
    healthPercentage: 100,
    healthLevel: 'Healthy',
    primarySymptom: 'deploy_success',
    symptomTitle: 'Production Deployment Success! 🎉',
    symptomDescription: 'All 48 microservices updated cleanly on Kubernetes prod-us-east-1 cluster with 0 errors.',
    operatorMeaning: 'Release successfully live. Companion celebrating flawless pipeline run!',
    pipelineState: {
      pipelineId: 'job-1045',
      buildStatus: 'passed',
      testHealth: 'healthy',
      passRate: 100,
      flakyTests: [],
      vulnerabilities: [],
      deployTarget: 'production',
      deployStatus: 'success',
      lastRunTime: 'Just now',
      pipelineSteps: [
        { name: 'Lint & Format', status: 'success', duration: '9s' },
        { name: 'TypeScript Compilation', status: 'success', duration: '14s' },
        { name: 'Unit & Integration Tests', status: 'success', duration: '52s' },
        { name: 'Security & Compliance Audit', status: 'success', duration: '18s' },
        { name: 'Production Canary Rolling Deploy', status: 'success', duration: '1m 20s' },
      ],
    },
  },
};

export const PR_CHANGES_REQUESTED_SCENARIO: ScenarioPreset = {
  id: 'pr_changes_requested',
  title: 'PR #214: Changes Requested',
  badge: 'PR Intelligence',
  description: 'Your PR #214 has been waiting for review for 3 days. Sarah commented on src/auth.ts and requested changes.',
  petExpression: 'Bot inspecting review clipboard with red change requested indicator & comment bubble',
  samplePrompt: 'What feedback did Sarah leave on PR #214?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'feature/auth-v2',
      upstream: 'origin/feature/auth-v2',
      aheadCount: 2,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'feat(auth): add OAuth2 refresh token rotation',
      lastCommitHash: 'f40a1b2',
      lastActivity: '3 days ago',
    },
    allBranches: ['main', 'feature/auth-v2'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [],
    healthPercentage: 62,
    healthLevel: 'Attention',
    primarySymptom: 'pr_changes_requested',
    symptomTitle: 'PR #214: Changes Requested (Waiting 3 Days)',
    symptomDescription: 'Sarah Chen requested changes on src/auth.ts: "Sanitize token payload before storing in local session."',
    operatorMeaning: 'Address review comments in src/auth.ts and push an updated commit to resolve PR blocks.',
    activePullRequest: {
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
      commentsCount: 3,
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
    },
  },
};

export const PR_PENDING_REVIEW_SCENARIO: ScenarioPreset = {
  id: 'pr_pending_review',
  title: 'PR #305: Pending Review (4 Days)',
  badge: 'PR Stale',
  description: 'PR #305 has been waiting 4 days for review from @marcus-vance and @alex-lead.',
  petExpression: 'Waiting bot tapping foot with hourglass timer bubble',
  samplePrompt: 'Can you draft a friendly review reminder message for PR #305?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'feat/cart-discounts',
      upstream: 'origin/feat/cart-discounts',
      aheadCount: 1,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'feat(cart): add percentage promo rule engine',
      lastCommitHash: 'e10c921',
      lastActivity: '4 days ago',
    },
    allBranches: ['main', 'feat/cart-discounts'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [],
    healthPercentage: 70,
    healthLevel: 'Attention',
    primarySymptom: 'pr_pending_review',
    symptomTitle: 'PR #305 Pending Review (Waiting 4 Days)',
    symptomDescription: 'Requested reviewers (@marcus-vance, @alex-lead) have not yet reviewed the submission.',
    operatorMeaning: 'Send a gentle ping or request review reminder to unblock your PR.',
    activePullRequest: {
      number: 305,
      title: 'feat(cart): promo code engine & volume discount rules',
      author: 'Lucas Whitaker',
      branch: 'feat/cart-discounts',
      baseBranch: 'main',
      status: 'open',
      reviewStatus: 'pending',
      mergeability: 'clean',
      approvalsCount: 0,
      requestedChangesCount: 0,
      requestedReviewers: ['@marcus-vance', '@alex-lead'],
      commentsCount: 0,
      waitingDays: 4,
      url: 'https://github.com/acme-corp/ecommerce-store/pull/305',
      createdAt: '4 days ago',
      updatedAt: '4 days ago',
      comments: [],
    },
  },
};

export const PR_CONFLICTED_SCENARIO: ScenarioPreset = {
  id: 'pr_conflicted',
  title: 'PR #189: Merge Conflicts',
  badge: 'PR Conflict',
  description: 'PR #189 cannot be merged automatically due to conflicts with upstream main branch.',
  petExpression: 'Bot surrounded by merge conflict warning markers',
  samplePrompt: 'How do I resolve the merge conflicts on PR #189?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'refactor/checkout-v2',
      upstream: 'origin/refactor/checkout-v2',
      aheadCount: 3,
      behindCount: 5,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'refactor(checkout): streamline payment payload',
      lastCommitHash: 'b30d922',
      lastActivity: '2 days ago',
    },
    allBranches: ['main', 'refactor/checkout-v2'],
    workingTree: [
      {
        path: 'src/services/paymentService.ts',
        status: 'conflicted',
        additions: 12,
        deletions: 8,
        diffSnippet: `<<<<<<< HEAD
export function processStripePayment(amount: number) {
=======
export function processStripePayment(amount: number, currency: string) {
>>>>>>> main`,
      },
    ],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [],
    healthPercentage: 40,
    healthLevel: 'Blocked',
    primarySymptom: 'pr_conflicted',
    symptomTitle: 'PR #189: Merge Conflict with main',
    symptomDescription: 'Conflicting changes in paymentService.ts block automatic merge into main.',
    operatorMeaning: 'Rebase refactor/checkout-v2 onto origin/main and resolve conflict markers.',
    activePullRequest: {
      number: 189,
      title: 'refactor(checkout): multi-currency payment processor',
      author: 'Lucas Whitaker',
      branch: 'refactor/checkout-v2',
      baseBranch: 'main',
      status: 'open',
      reviewStatus: 'commented',
      mergeability: 'conflicted',
      approvalsCount: 1,
      requestedChangesCount: 0,
      requestedReviewers: ['@sarah-chen'],
      commentsCount: 2,
      waitingDays: 2,
      url: 'https://github.com/acme-corp/ecommerce-store/pull/189',
      createdAt: '2 days ago',
      updatedAt: '5 hours ago',
      comments: [
        {
          id: 'c-201',
          author: 'Marcus Vance',
          filePath: 'src/services/paymentService.ts',
          line: 14,
          commentText: 'Main was updated with multi-currency support. Please rebase and resolve conflicts.',
          timestamp: '5 hours ago',
          resolved: false,
        },
      ],
    },
  },
};

export const PR_APPROVED_READY_SCENARIO: ScenarioPreset = {
  id: 'pr_approved_ready',
  title: 'PR #242: Approved & Ready',
  badge: 'PR Ready 🎉',
  description: 'PR #242 has 3 approvals, clean CI pipeline checks, and is ready for squash merge into main.',
  petExpression: 'Bot holding golden approval stamp & celebrating with green ready badge',
  samplePrompt: 'Is PR #242 ready to merge?',
  state: {
    repoName: 'acme-corp/ecommerce-store',
    currentBranch: {
      name: 'feat/cart-stepper',
      upstream: 'origin/feat/cart-stepper',
      aheadCount: 2,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'feat(cart): add smooth quantity stepper animation',
      lastCommitHash: 'a90e112',
      lastActivity: '1 hour ago',
    },
    allBranches: ['main', 'feat/cart-stepper'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [],
    healthPercentage: 100,
    healthLevel: 'Healthy',
    primarySymptom: 'pr_approved_ready',
    symptomTitle: 'PR #242: Approved & Ready to Merge! 🎉',
    symptomDescription: '3 approvals from @sarah-chen, @marcus-vance & @alex-lead. All CI checks passed.',
    operatorMeaning: 'Perform squash and merge to main when ready to release.',
    activePullRequest: {
      number: 242,
      title: 'feat(cart): smooth quantity stepper counter & micro-animations',
      author: 'Lucas Whitaker',
      branch: 'feat/cart-stepper',
      baseBranch: 'main',
      status: 'open',
      reviewStatus: 'approved',
      mergeability: 'clean',
      approvalsCount: 3,
      requestedChangesCount: 0,
      requestedReviewers: [],
      commentsCount: 4,
      waitingDays: 1,
      url: 'https://github.com/acme-corp/ecommerce-store/pull/242',
      createdAt: '1 day ago',
      updatedAt: '1 hour ago',
      comments: [
        {
          id: 'c-301',
          author: 'Sarah Chen',
          filePath: 'src/components/cart/CartDrawer.tsx',
          line: 12,
          commentText: 'LGTM! Great UX work on the quantity stepper.',
          timestamp: '2 hours ago',
          resolved: true,
        },
      ],
    },
  },
};

export const LOST_MAP_SCENARIO: ScenarioPreset = {
  id: 'lost_map',
  title: 'Lost Map: Terraform State Issue',
  badge: 'State Problem',
  description: 'GitPet cannot verify infrastructure consistency because the state backend is unavailable.',
  petExpression: 'Holding upside-down map and walking in circles',
  samplePrompt: 'Why is Terraform backend inaccessible and how do I fix the state lock?',
  state: {
    repoName: 'acme-corp/infrastructure-live',
    currentBranch: {
      name: 'infra/terraform-s3',
      upstream: 'origin/infra/terraform-s3',
      aheadCount: 0,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'infra: update s3 backend configuration',
      lastCommitHash: 'tf99201',
      lastActivity: '1 hour ago',
    },
    allBranches: ['main', 'infra/terraform-s3'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [],
    healthPercentage: 35,
    healthLevel: 'Blocked',
    primarySymptom: 'lost_map',
    symptomTitle: 'State Problem Detected',
    symptomDescription: 'Missing tfstate / Remote state inaccessible / State lock stuck on s3://acme-tf-state/prod.tfstate.',
    operatorMeaning: 'GitPet cannot verify infrastructure consistency because the state backend is unavailable.',
  },
};

export const SMOKE_CLOUD_SCENARIO: ScenarioPreset = {
  id: 'smoke_cloud',
  title: 'Smoke Cloud: Deployment Failure',
  badge: 'Deploy Failed',
  description: 'Checkout deployment failed. Three pods are unable to start because environment variable DATABASE_URL is missing.',
  petExpression: 'Running through smoke with soot marks on face',
  samplePrompt: 'Inspect the ArgoCD / Helm rollout failure logs and missing environment variables.',
  state: {
    repoName: 'acme-corp/checkout-service',
    currentBranch: {
      name: 'deploy/prod-v2.4',
      upstream: 'origin/deploy/prod-v2.4',
      aheadCount: 0,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'release: bump checkout helm chart to v2.4.0',
      lastCommitHash: 'd883011',
      lastActivity: '30 mins ago',
    },
    allBranches: ['main', 'deploy/prod-v2.4'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [],
    healthPercentage: 20,
    healthLevel: 'Blocked',
    primarySymptom: 'smoke_cloud',
    symptomTitle: 'Deployment Failure (Kubernetes Rollout Stuck)',
    symptomDescription: 'Checkout deployment failed. Three pods are unable to start because environment variable DATABASE_URL is missing.',
    operatorMeaning: 'Failed ArgoCD sync / Helm deployment failed / Kubernetes rollout stuck.',
    pipelineState: {
      pipelineId: 'argocd-sync-9902',
      buildStatus: 'failed',
      testHealth: 'failing',
      passRate: 0,
      flakyTests: [],
      vulnerabilities: [],
      deployTarget: 'production',
      deployStatus: 'failed',
      lastRunTime: '10 mins ago',
      pipelineSteps: [
        { name: 'Helm Template Lint', status: 'success', duration: '12s' },
        { name: 'ArgoCD Sync Trigger', status: 'success', duration: '5s' },
        { name: 'K8s Pod Rollout', status: 'failed', duration: '3m 20s', logSummary: 'CrashLoopBackOff: DATABASE_URL environment variable missing in pod spec.' },
      ],
    },
  },
};

export const SHIELD_CRACKED_SCENARIO: ScenarioPreset = {
  id: 'shield_cracked',
  title: 'Shield Cracked: Security Deviation',
  badge: 'Security Risk',
  description: 'Infrastructure violates security policy. A newly provisioned storage account allows anonymous access.',
  petExpression: 'Cracked shield in a defensive posture',
  samplePrompt: 'How do I resolve the anonymous S3 bucket policy violation and secure the storage account?',
  state: {
    repoName: 'acme-corp/cloud-security-policies',
    currentBranch: {
      name: 'main',
      upstream: 'origin/main',
      aheadCount: 0,
      behindCount: 0,
      isDetached: false,
      isStale: false,
      lastCommitMessage: 'feat(storage): provision public assets bucket',
      lastCommitHash: 'sec1049',
      lastActivity: '45 mins ago',
    },
    allBranches: ['main'],
    workingTree: [],
    stashes: [],
    localCommitsAhead: [],
    remoteCommitsBehind: [],
    commitHistory: [],
    healthPercentage: 15,
    healthLevel: 'Unsafe',
    primarySymptom: 'shield_cracked',
    symptomTitle: 'Security Deviation Detected',
    symptomDescription: 'Infrastructure violates security policy. A newly provisioned storage account allows anonymous access.',
    operatorMeaning: 'Public S3 bucket / Exposed port / New critical CVE / Policy violation / Terraform security scan failed.',
  },
};

export const ALL_SCENARIOS: ScenarioPreset[] = [
  MVP_SCENARIO,
  LOST_MAP_SCENARIO,
  SMOKE_CLOUD_SCENARIO,
  SHIELD_CRACKED_SCENARIO,
  PR_CHANGES_REQUESTED_SCENARIO,
  PR_PENDING_REVIEW_SCENARIO,
  PR_CONFLICTED_SCENARIO,
  PR_APPROVED_READY_SCENARIO,
  FAILED_BUILD_SCENARIO,
  FLAKY_TESTS_SCENARIO,
  VULNERABILITY_SCENARIO,
  DEPLOYMENT_SUCCESS_SCENARIO,
  UNSAFE_LOSS_RISK_SCENARIO,
  CONFLICT_SCENARIO,
  UNPUSHED_WORK_SCENARIO,
  DETACHED_HEAD_SCENARIO,
  STALE_BRANCH_SCENARIO,
  CLEAN_HEALTHY_SCENARIO,
];

// Helper to compute dynamic state, multi-factor risk breakdown, and health
export function computeRepositoryHealth(state: RepositoryState): {
  healthPercentage: number;
  healthLevel: HealthLevel;
  primarySymptom: SymptomType;
  symptomTitle: string;
  symptomDescription: string;
  operatorMeaning: string;
  riskBreakdown?: import('../types').RiskScoreBreakdown;
} {
  // 1. Calculate Factor Deductions (Base Score = 100)
  const factors: import('../types').RiskFactorItem[] = [];

  // Factor 1: Branch Divergence
  let divergenceDeduction = 0;
  let divergenceStatus: 'good' | 'warning' | 'critical' = 'good';
  let divergenceDetails = 'Branch is synchronized with upstream tracking branch.';
  let divergenceRec = 'Keep pulling and pushing frequently.';

  const isDestructive =
    state.healthLevel === 'Unsafe' ||
    state.primarySymptom === 'destructive_hazard' ||
    (state.destructiveRiskWarning && state.destructiveRiskWarning.length > 0) ||
    (state.currentBranch?.name?.includes('checkout-refactor') && (state.workingTree?.length || 0) > 0 && (state.currentBranch?.behindCount || 0) >= 4);

  const hasConflict = state.workingTree?.some((f) => f.status === 'conflicted') || state.primarySymptom === 'merge_conflict' || state.primarySymptom === 'pr_conflicted' || state.activePullRequest?.mergeability === 'conflicted';

  if (isDestructive) {
    divergenceDeduction = 35;
    divergenceStatus = 'critical';
    divergenceDetails = `Upstream force-push with ${state.workingTree?.length || 0} dirty files. Immediate work-loss hazard!`;
    divergenceRec = 'Stash in-flight work immediately before any upstream pull.';
  } else if (hasConflict) {
    divergenceDeduction = 25;
    divergenceStatus = 'critical';
    divergenceDetails = 'Merge conflict markers detected in active working tree.';
    divergenceRec = 'Resolve file conflict markers and run git rebase --continue.';
  } else if (state.currentBranch?.isDetached) {
    divergenceDeduction = 18;
    divergenceStatus = 'warning';
    divergenceDetails = 'HEAD detached from named branch; floating commit anchor required.';
    divergenceRec = 'Run git switch -c <branch-name> to anchor commit.';
  } else if ((state.currentBranch?.behindCount || 0) > 0 && (state.workingTree?.length || 0) > 0) {
    divergenceDeduction = Math.min(22, 10 + (state.currentBranch?.behindCount || 0) * 3);
    divergenceStatus = 'warning';
    divergenceDetails = `${state.currentBranch?.behindCount || 0} commits behind upstream with ${state.workingTree?.length || 0} uncommitted files.`;
    divergenceRec = 'Stash local modifications before pulling upstream.';
  } else if ((state.currentBranch?.behindCount || 0) > 0) {
    divergenceDeduction = Math.min(15, (state.currentBranch?.behindCount || 0) * 3);
    divergenceStatus = 'warning';
    divergenceDetails = `${state.currentBranch?.behindCount || 0} commits behind upstream.`;
    divergenceRec = 'Run git pull --ff-only to catch up.';
  } else if ((state.currentBranch?.aheadCount || 0) > 0) {
    divergenceDeduction = Math.min(10, (state.currentBranch?.aheadCount || 0) * 2);
    divergenceStatus = 'warning';
    divergenceDetails = `${state.currentBranch?.aheadCount || 0} unpushed local commits.`;
    divergenceRec = 'Push commits to origin when ready for backup or review.';
  } else if (state.currentBranch?.isStale) {
    divergenceDeduction = 8;
    divergenceStatus = 'warning';
    divergenceDetails = `Branch inactive for ${state.currentBranch?.staleDays || 30} days since merge.`;
    divergenceRec = 'Prune merged branch with git branch -d.';
  }

  factors.push({
    id: 'branch_divergence',
    name: 'Branch Divergence',
    impact: -divergenceDeduction,
    status: divergenceStatus,
    details: divergenceDetails,
    recommendation: divergenceRec,
    metricLabel: divergenceDeduction > 0 ? `-${divergenceDeduction} pts` : '0 pts (Clean)',
  });

  // Factor 2: Failed Tests & Pipeline Health
  let testDeduction = 0;
  let testStatus: 'good' | 'warning' | 'critical' = 'good';
  let testDetails = 'All CI/CD test suites and build checks passed cleanly.';
  let testRec = 'Maintain high unit and integration test coverage.';

  if (state.primarySymptom === 'failed_build' || state.pipelineState?.buildStatus === 'failed') {
    testDeduction = 25;
    testStatus = 'critical';
    testDetails = 'CI Pipeline build failed due to compilation or syntax errors.';
    testRec = 'Inspect failed build logs and fix broken test assertions.';
  } else if (state.primarySymptom === 'flaky_tests' || state.pipelineState?.testHealth === 'flaky') {
    testDeduction = 14;
    testStatus = 'warning';
    testDetails = `${state.pipelineState?.flakyTests?.length || 2} flaky test specs flagged with intermittent failures.`;
    testRec = 'Quarantine or refactor asynchronous test suites.';
  } else if (state.primarySymptom === 'smoke_cloud' || state.pipelineState?.deployStatus === 'failed') {
    testDeduction = 28;
    testStatus = 'critical';
    testDetails = 'Deployment rollout failed: missing secrets or crash-looping pods.';
    testRec = 'Check deployment manifests and inject missing environment variables.';
  }

  factors.push({
    id: 'failed_tests',
    name: 'Failed & Flaky Tests',
    impact: -testDeduction,
    status: testStatus,
    details: testDetails,
    recommendation: testRec,
    metricLabel: testDeduction > 0 ? `-${testDeduction} pts` : '0 pts (Passing)',
  });

  // Factor 3: Secrets & Security Deviations
  let secretDeduction = 0;
  let secretStatus: 'good' | 'warning' | 'critical' = 'good';
  let secretDetails = 'No plaintext secrets, API keys, or security policy violations detected.';
  let secretRec = 'Use environment secret stores or vault management.';

  if (state.primarySymptom === 'shield_cracked') {
    secretDeduction = 30;
    secretStatus = 'critical';
    secretDetails = 'Infrastructure security policy violation: Public S3 bucket / anonymous access enabled.';
    secretRec = 'Enforce AWS002/003 block public access policy in Terraform.';
  } else if (state.secretsDetectedCount && state.secretsDetectedCount > 0) {
    secretDeduction = Math.min(30, state.secretsDetectedCount * 15);
    secretStatus = 'critical';
    secretDetails = `${state.secretsDetectedCount} exposed credentials/API keys in working tree.`;
    secretRec = 'Revoke exposed token and remove from git history.';
  }

  factors.push({
    id: 'secrets_detected',
    name: 'Secrets & Security Policies',
    impact: -secretDeduction,
    status: secretStatus,
    details: secretDetails,
    recommendation: secretRec,
    metricLabel: secretDeduction > 0 ? `-${secretDeduction} pts` : '0 pts (Secure)',
  });

  // Factor 4: Open Vulnerabilities
  let vulnDeduction = 0;
  let vulnStatus: 'good' | 'warning' | 'critical' = 'good';
  let vulnDetails = 'Zero open critical or high vulnerability CVEs detected.';
  let vulnRec = 'Keep dependencies updated with regular security audits.';

  const vulns = state.pipelineState?.vulnerabilities || [];
  if (state.primarySymptom === 'vulnerability_risk' || vulns.length > 0) {
    vulnDeduction = vulns.some((v) => v.severity === 'critical' || v.severity === 'high') ? 22 : 12;
    vulnStatus = vulnDeduction >= 20 ? 'critical' : 'warning';
    vulnDetails = `${vulns.length || 1} dependency vulnerabilities flagged in package lock.`;
    vulnRec = 'Run npm audit fix or bump patched package versions.';
  }

  factors.push({
    id: 'vulnerabilities',
    name: 'Open Vulnerabilities',
    impact: -vulnDeduction,
    status: vulnStatus,
    details: vulnDetails,
    recommendation: vulnRec,
    metricLabel: vulnDeduction > 0 ? `-${vulnDeduction} pts` : '0 pts (0 CVEs)',
  });

  // Factor 5: Code Smells & Technical Debt
  let smellDeduction = 0;
  let smellStatus: 'good' | 'warning' | 'critical' = 'good';
  let smellDetails = 'Code style, linting, and complexity metrics are within normal thresholds.';
  let smellRec = 'Run linter and keep modules modular.';

  const modifiedCount = state.workingTree?.length || 0;
  if (state.codeSmellsCount && state.codeSmellsCount > 0) {
    smellDeduction = Math.min(15, state.codeSmellsCount * 4);
    smellStatus = smellDeduction > 8 ? 'warning' : 'good';
    smellDetails = `${state.codeSmellsCount} code smell / TODO / lint warnings identified.`;
    smellRec = 'Refactor complex functions and resolve lint warnings.';
  } else if (modifiedCount > 8) {
    smellDeduction = 6;
    smellStatus = 'warning';
    smellDetails = `${modifiedCount} uncommitted files in working tree — high context switching risk.`;
    smellRec = 'Stage and commit in smaller, focused atomic commits.';
  }

  factors.push({
    id: 'code_smells',
    name: 'Code Smells & Debt',
    impact: -smellDeduction,
    status: smellStatus,
    details: smellDetails,
    recommendation: smellRec,
    metricLabel: smellDeduction > 0 ? `-${smellDeduction} pts` : '0 pts (Clean)',
  });

  // Factor 6: Unreviewed Commits & PR Review Lag
  let reviewDeduction = 0;
  let reviewStatus: 'good' | 'warning' | 'critical' = 'good';
  let reviewDetails = 'All active branch changes have peer reviews and approvals.';
  let reviewRec = 'Conduct thorough peer code reviews prior to merging.';

  if (state.primarySymptom === 'pr_changes_requested' || state.activePullRequest?.reviewStatus === 'changes_requested') {
    reviewDeduction = 15;
    reviewStatus = 'warning';
    reviewDetails = `PR #${state.activePullRequest?.number || 214} has requested changes from reviewers.`;
    reviewRec = 'Address review comments in files and request re-review.';
  } else if (state.primarySymptom === 'pr_pending_review' || (state.activePullRequest && state.activePullRequest.waitingDays >= 3)) {
    reviewDeduction = 10;
    reviewStatus = 'warning';
    reviewDetails = `PR #${state.activePullRequest?.number || 305} waiting ${state.activePullRequest?.waitingDays || 3} days for review.`;
    reviewRec = 'Send friendly review reminder to unblock PR.';
  } else if (state.unreviewedCommitsCount && state.unreviewedCommitsCount > 0) {
    reviewDeduction = Math.min(15, state.unreviewedCommitsCount * 4);
    reviewStatus = 'warning';
    reviewDetails = `${state.unreviewedCommitsCount} unreviewed commits on protected branch.`;
    reviewRec = 'Ensure pull requests require at least 1 peer approval.';
  }

  factors.push({
    id: 'unreviewed_commits',
    name: 'Unreviewed Commits & PR Lag',
    impact: -reviewDeduction,
    status: reviewStatus,
    details: reviewDetails,
    recommendation: reviewRec,
    metricLabel: reviewDeduction > 0 ? `-${reviewDeduction} pts` : '0 pts (Reviewed)',
  });

  // Factor 7: Large PR Size
  let prSizeDeduction = 0;
  let prSizeStatus: 'good' | 'warning' | 'critical' = 'good';
  let prSizeDetails = 'PR size is small and easy to review (< 300 lines changed).';
  let prSizeRec = 'Break massive changes into smaller, incremental PRs.';

  const totalTreeLines = (state.workingTree || []).reduce((acc, f) => acc + (f.additions || 0) + (f.deletions || 0), 0);
  if (state.activePullRequest && (state.activePullRequest.commentsCount > 5 || totalTreeLines > 400)) {
    prSizeDeduction = 8;
    prSizeStatus = 'warning';
    prSizeDetails = `PR exceeds recommended change volume (> 400 lines or > 15 files).`;
    prSizeRec = 'Split into smaller stacked PRs to speed up reviews.';
  }

  factors.push({
    id: 'large_pr_size',
    name: 'Large PR Size',
    impact: -prSizeDeduction,
    status: prSizeStatus,
    details: prSizeDetails,
    recommendation: prSizeRec,
    metricLabel: prSizeDeduction > 0 ? `-${prSizeDeduction} pts` : '0 pts (Optimal Size)',
  });

  // 2. Compute Final Aggregated Health Score
  const totalDeductions = divergenceDeduction + testDeduction + secretDeduction + vulnDeduction + smellDeduction + reviewDeduction + prSizeDeduction;
  let calculatedScore = Math.max(0, Math.min(100, 100 - totalDeductions));

  // Determine Health Level & Risk Category
  let healthLevel: HealthLevel = 'Healthy';
  let riskCategory: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Critical Risk' = 'Low Risk';

  if (isDestructive || calculatedScore === 0) {
    calculatedScore = 0;
    healthLevel = 'Unsafe';
    riskCategory = 'Critical Risk';
  } else if (hasConflict || testDeduction >= 25 || secretDeduction >= 30 || calculatedScore < 45) {
    healthLevel = 'Blocked';
    riskCategory = 'High Risk';
  } else if (calculatedScore < 80) {
    healthLevel = 'Attention';
    riskCategory = 'Moderate Risk';
  } else {
    healthLevel = 'Healthy';
    riskCategory = 'Low Risk';
  }

  // Preserve explicit preset symptoms if defined
  let primarySymptom: SymptomType = state.primarySymptom || 'clean_sync';
  let symptomTitle = state.symptomTitle;
  let symptomDescription = state.symptomDescription;
  let operatorMeaning = state.operatorMeaning;

  if (!symptomTitle) {
    if (isDestructive) {
      primarySymptom = 'destructive_hazard';
      symptomTitle = 'Destructive Work-Loss Hazard';
      symptomDescription = 'Work-loss risk due to upstream force-push.';
      operatorMeaning = 'Preserve changes with git stash before syncing.';
    } else if (hasConflict) {
      primarySymptom = 'merge_conflict';
      symptomTitle = 'Merge Conflict Detected';
      symptomDescription = 'Conflicting file markers block merge/rebase.';
      operatorMeaning = 'Resolve conflict markers and continue rebase.';
    } else if (calculatedScore < 80) {
      symptomTitle = 'Repository Attention Needed';
      symptomDescription = `${riskCategory} calculated from 7 repo health factors.`;
      operatorMeaning = 'Inspect risk breakdown and apply recommended remediations.';
    } else {
      primarySymptom = 'clean_sync';
      symptomTitle = 'Synchronized & Pristine';
      symptomDescription = 'Working directory clean and up to date.';
      operatorMeaning = 'Repository in optimal state.';
    }
  }

  const riskBreakdown: import('../types').RiskScoreBreakdown = {
    overallScore: calculatedScore,
    healthLevel,
    riskCategory,
    summary: `${riskCategory} (Score: ${calculatedScore}/100) derived from 7 data-driven repository and DevOps risk factors.`,
    factors,
  };

  return {
    healthPercentage: calculatedScore,
    healthLevel,
    primarySymptom,
    symptomTitle,
    symptomDescription,
    operatorMeaning,
    riskBreakdown,
  };
}

