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

export const ALL_SCENARIOS: ScenarioPreset[] = [
  MVP_SCENARIO,
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

// Helper to compute dynamic state and health
export function computeRepositoryHealth(state: RepositoryState): {
  healthPercentage: number;
  healthLevel: HealthLevel;
  primarySymptom: SymptomType;
  symptomTitle: string;
  symptomDescription: string;
  operatorMeaning: string;
} {
  // CI/CD OVERRIDES & PRECEDENCE
  if (state.primarySymptom === 'failed_build' || state.pipelineState?.buildStatus === 'failed') {
    return {
      healthPercentage: 35,
      healthLevel: 'Blocked',
      primarySymptom: 'failed_build',
      symptomTitle: state.symptomTitle || 'CI Build Failure',
      symptomDescription: state.symptomDescription || 'Compiler or build script error in CI pipeline.',
      operatorMeaning: state.operatorMeaning || 'Fix compilation errors before re-triggering CI.',
    };
  }

  if (state.primarySymptom === 'flaky_tests' || state.pipelineState?.testHealth === 'flaky') {
    return {
      healthPercentage: 68,
      healthLevel: 'Attention',
      primarySymptom: 'flaky_tests',
      symptomTitle: state.symptomTitle || 'Flaky Tests Detected',
      symptomDescription: state.symptomDescription || 'Intermittent test failures destabilizing pipeline.',
      operatorMeaning: state.operatorMeaning || 'Quarantine or refactor flaky test specs.',
    };
  }

  if (state.primarySymptom === 'vulnerability_risk' || (state.pipelineState?.vulnerabilities && state.pipelineState.vulnerabilities.length > 0)) {
    return {
      healthPercentage: 55,
      healthLevel: 'Attention',
      primarySymptom: 'vulnerability_risk',
      symptomTitle: state.symptomTitle || 'Security Vulnerability Detected',
      symptomDescription: state.symptomDescription || 'High severity CVE flagged in dependency audit.',
      operatorMeaning: state.operatorMeaning || 'Upgrade vulnerable dependencies to patch CVE.',
    };
  }

  if (state.primarySymptom === 'deploy_success' || state.pipelineState?.deployStatus === 'success') {
    return {
      healthPercentage: 100,
      healthLevel: 'Healthy',
      primarySymptom: 'deploy_success',
      symptomTitle: state.symptomTitle || 'Deployment Success',
      symptomDescription: state.symptomDescription || 'Pipeline green and deployed to production.',
      operatorMeaning: state.operatorMeaning || 'Production deployment verified.',
    };
  }

  // PRECEDENCE 1: Immediate work-loss risk (Unsafe state strictly at 0% health)
  const isDestructive =
    state.healthLevel === 'Unsafe' ||
    state.primarySymptom === 'destructive_hazard' ||
    (state.destructiveRiskWarning && state.destructiveRiskWarning.length > 0) ||
    (state.currentBranch.name.includes('checkout-refactor') && state.workingTree.length > 0 && state.currentBranch.behindCount >= 4);

  if (isDestructive) {
    return {
      healthPercentage: 0,
      healthLevel: 'Unsafe',
      primarySymptom: 'destructive_hazard',
      symptomTitle: state.symptomTitle || 'Destructive Work-Loss Hazard',
      symptomDescription:
        state.symptomDescription ||
        `${state.workingTree.length} uncommitted files risk permanent loss due to upstream force-push divergence.`,
      operatorMeaning:
        state.operatorMeaning ||
        'Halt all automatic writes. Preserve work with git stash before any upstream reconciliation.',
    };
  }

  // PRECEDENCE 2: Merge Conflict
  const hasConflict = state.workingTree.some((f) => f.status === 'conflicted');
  if (hasConflict) {
    return {
      healthPercentage: 35,
      healthLevel: 'Blocked',
      primarySymptom: 'merge_conflict',
      symptomTitle: 'Merge Conflict Detected',
      symptomDescription: `${state.workingTree.filter((f) => f.status === 'conflicted').length} conflicting files block the merge.`,
      operatorMeaning: 'Resolve file markers or abort rebase before continuing.',
    };
  }

  // PRECEDENCE 3: Detached HEAD
  if (state.currentBranch.isDetached) {
    return {
      healthPercentage: 50,
      healthLevel: 'Attention',
      primarySymptom: 'detached_head',
      symptomTitle: 'Detached HEAD State',
      symptomDescription: 'HEAD is not attached to a named branch; new commits risk loss if you checkout another ref.',
      operatorMeaning: 'Create or checkout a named branch to anchor your work.',
    };
  }

  // PRECEDENCE 4: Stale branch
  if (state.currentBranch.isStale) {
    return {
      healthPercentage: 74,
      healthLevel: 'Attention',
      primarySymptom: 'stale_branch',
      symptomTitle: `Stale Branch (${state.currentBranch.staleDays || 30} days)`,
      symptomDescription: 'Branch is merged into main and inactive.',
      operatorMeaning: 'Prune merged local branch to keep workspace clean.',
    };
  }

  // PRECEDENCE 5: Behind remote with local edits
  if (state.currentBranch.behindCount > 0 && state.workingTree.length > 0) {
    const health = Math.max(55, 90 - state.currentBranch.behindCount * 6 - state.workingTree.length * 5);
    return {
      healthPercentage: health,
      healthLevel: 'Attention',
      primarySymptom: 'behind_remote',
      symptomTitle: 'Behind Remote with Local Edits',
      symptomDescription: `${state.currentBranch.name} is ${state.currentBranch.behindCount} commits behind upstream with ${state.workingTree.length} uncommitted files.`,
      operatorMeaning: 'Stash local modifications before pulling upstream changes to prevent work contamination.',
    };
  }

  // PRECEDENCE 6: Behind remote with clean tree
  if (state.currentBranch.behindCount > 0) {
    return {
      healthPercentage: Math.max(75, 95 - state.currentBranch.behindCount * 5),
      healthLevel: 'Attention',
      primarySymptom: 'behind_remote',
      symptomTitle: `${state.currentBranch.behindCount} Commits Behind Remote`,
      symptomDescription: `Upstream branch has incoming commits ready to be pulled cleanly.`,
      operatorMeaning: 'Fast-forward pull from upstream to stay synchronized.',
    };
  }

  // PRECEDENCE 7: Ahead count / unpushed work
  if (state.currentBranch.aheadCount > 0) {
    return {
      healthPercentage: 85,
      healthLevel: 'Attention',
      primarySymptom: 'unpushed_work',
      symptomTitle: `${state.currentBranch.aheadCount} Unpushed Local Commits`,
      symptomDescription: `You have commits that haven't been backed up or published to upstream.`,
      operatorMeaning: 'Push commits to origin when ready for review or backup.',
    };
  }

  // PRECEDENCE 8: Active local working tree
  if (state.workingTree.length > 0) {
    return {
      healthPercentage: 92,
      healthLevel: 'Healthy',
      primarySymptom: 'unpushed_work',
      symptomTitle: 'Active Working Directory',
      symptomDescription: `${state.workingTree.length} files modified locally.`,
      operatorMeaning: 'Review diff and commit changes when logical unit is complete.',
    };
  }

  // PRECEDENCE 9: Clean & Pristine 100%
  return {
    healthPercentage: 100,
    healthLevel: 'Healthy',
    primarySymptom: 'clean_sync',
    symptomTitle: 'Synchronized & Pristine',
    symptomDescription: 'Working directory clean and up to date with remote.',
    operatorMeaning: 'Repository in optimal state.',
  };
}
