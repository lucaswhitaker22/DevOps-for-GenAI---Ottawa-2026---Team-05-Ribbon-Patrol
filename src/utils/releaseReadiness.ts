import { RepositoryState, ReleaseReadinessReport, ReleaseReadinessMetric, ReleaseSignOffItem } from '../types';

/**
 * Release Readiness Advisor Engine
 * Calculates the 5 core DevOps pillars:
 * 1. Tests Passing
 * 2. Coverage %
 * 3. Vulnerability Count
 * 4. PR Approvals
 * 5. Branch Freshness
 * 
 * Generates an executive release readiness score and diagnostic headline:
 * e.g. "Release readiness: 87%. One high-severity vulnerability prevents green status."
 */
export function calculateReleaseReadiness(state: RepositoryState): ReleaseReadinessReport {
  const branch = state.currentBranch || { name: 'main', behindCount: 0, aheadCount: 0, isStale: false, staleDays: 0 };
  const pipeline = state.pipelineState;
  const pr = state.activePullRequest;
  const symptom = state.primarySymptom;

  // ----------------------------------------------------
  // PILLAR 1: Tests Passing (Weight: 25%)
  // ----------------------------------------------------
  let testsScore = 100;
  let testsStatus: 'passed' | 'warning' | 'failed' = 'passed';
  let testsValue = '100% (24/24 passing)';
  let testsDetails = 'All unit, integration, and regression suites passed on latest commit.';
  let testsRec = 'Continuous test verification is active.';

  if (symptom === 'failed_build' || pipeline?.buildStatus === 'failed') {
    testsScore = 20;
    testsStatus = 'failed';
    testsValue = 'Build Failing (0/24 passing)';
    testsDetails = 'Pipeline failed during compilation / unit test suite execution.';
    testsRec = 'Fix broken unit test assertions and resolve compile errors before ship.';
  } else if (symptom === 'flaky_tests' || pipeline?.testHealth === 'flaky') {
    const passRate = pipeline?.passRate || 92;
    testsScore = 70;
    testsStatus = 'warning';
    testsValue = `${passRate}% (2 flaky tests detected)`;
    testsDetails = 'Intermittent test failures detected in authentication and cart tests.';
    testsRec = 'Quarantine or fix flaky async race conditions to stabilize pass rate.';
  } else if (pipeline?.passRate && pipeline.passRate < 100) {
    testsScore = Math.max(30, pipeline.passRate);
    testsStatus = pipeline.passRate >= 90 ? 'warning' : 'failed';
    testsValue = `${pipeline.passRate}% passing`;
    testsDetails = `${pipeline.passRate}% tests passed in CI workflow.`;
    testsRec = 'Ensure 100% test pass rate for production release.';
  }

  const testsPassingMetric: ReleaseReadinessMetric = {
    id: 'tests_passing',
    name: 'Tests Passing',
    score: testsScore,
    weight: 0.25,
    status: testsStatus,
    value: testsValue,
    target: '100% passing',
    details: testsDetails,
    recommendation: testsRec,
    icon: 'Bug',
  };

  // ----------------------------------------------------
  // PILLAR 2: Coverage % (Weight: 20%)
  // ----------------------------------------------------
  let coveragePct = 88;
  if (pipeline?.coveragePercentage !== undefined) {
    coveragePct = pipeline.coveragePercentage;
  } else if (symptom === 'failed_build') {
    coveragePct = 54;
  } else if (symptom === 'clean_sync' || symptom === 'deploy_success' || symptom === 'pr_approved_ready') {
    coveragePct = 94;
  } else if (symptom === 'vulnerability_risk') {
    coveragePct = 88;
  } else if (symptom === 'flaky_tests') {
    coveragePct = 76;
  } else if (symptom === 'stale_branch') {
    coveragePct = 82;
  }

  let coverageScore = 100;
  let coverageStatus: 'passed' | 'warning' | 'failed' = 'passed';
  if (coveragePct >= 80) {
    coverageScore = Math.min(100, Math.round(80 + ((coveragePct - 80) / 20) * 20));
    coverageStatus = 'passed';
  } else if (coveragePct >= 70) {
    coverageScore = 70;
    coverageStatus = 'warning';
  } else {
    coverageScore = Math.max(20, Math.round((coveragePct / 70) * 60));
    coverageStatus = 'failed';
  }

  const coverageMetric: ReleaseReadinessMetric = {
    id: 'coverage',
    name: 'Coverage %',
    score: coverageScore,
    weight: 0.2,
    status: coverageStatus,
    value: `${coveragePct}%`,
    target: '≥ 80% line coverage',
    details: `${coveragePct}% lines covered across core components and service handlers.`,
    recommendation: coveragePct >= 80 ? 'Test coverage meets production baseline standards.' : 'Add unit test coverage for uncovered branches.',
    icon: 'Layers',
  };

  // ----------------------------------------------------
  // PILLAR 3: Vulnerability Count (Weight: 25%)
  // ----------------------------------------------------
  let vulnsScore = 100;
  let vulnsStatus: 'passed' | 'warning' | 'failed' = 'passed';
  let vulnsValue = '0 CVEs';
  let vulnsDetails = 'Zero known high/critical CVEs in package lock or container base.';
  let vulnsRec = 'Maintain continuous Snyk/Trivy dependency scanning.';

  const cveList = pipeline?.vulnerabilities || [];
  const highOrCrit = cveList.filter((v) => v.severity === 'high' || v.severity === 'critical');
  const medium = cveList.filter((v) => v.severity === 'medium');

  if (symptom === 'vulnerability_risk' || highOrCrit.length > 0) {
    vulnsScore = 48;
    vulnsStatus = 'failed';
    const count = highOrCrit.length || 1;
    vulnsValue = count === 1 ? '1 High-Severity CVE' : `${count} High-Severity CVEs`;
    vulnsDetails = highOrCrit[0]?.title || 'High-severity JWT secret disclosure vulnerability in auth package.';
    vulnsRec = 'Upgrade vulnerable package or apply security remediation patch.';
  } else if (symptom === 'shield_cracked') {
    vulnsScore = 40;
    vulnsStatus = 'failed';
    vulnsValue = '1 Critical Policy Finding';
    vulnsDetails = 'Security baseline violation: anonymous public read access in storage.tf.';
    vulnsRec = 'Enforce private storage account access policy.';
  } else if (medium.length > 0) {
    vulnsScore = 75;
    vulnsStatus = 'warning';
    vulnsValue = `${medium.length} Medium CVEs`;
    vulnsDetails = 'Moderate risk dependency advisories detected with available upgrade paths.';
    vulnsRec = 'Schedule dependency upgrades during next sprint maintenance.';
  }

  const vulnerabilitiesMetric: ReleaseReadinessMetric = {
    id: 'vulnerabilities',
    name: 'Vulnerability Count',
    score: vulnsScore,
    weight: 0.25,
    status: vulnsStatus,
    value: vulnsValue,
    target: '0 High/Critical CVEs',
    details: vulnsDetails,
    recommendation: vulnsRec,
    icon: 'ShieldAlert',
  };

  // ----------------------------------------------------
  // PILLAR 4: PR Approvals (Weight: 15%)
  // ----------------------------------------------------
  let prScore = 100;
  let prStatus: 'passed' | 'warning' | 'failed' = 'passed';
  let prValue = '2 of 2 Approved';
  let prDetails = 'All required peer review approvals granted with zero open change requests.';
  let prRec = 'PR review requirements fully satisfied.';

  if (symptom === 'pr_changes_requested' || pr?.reviewStatus === 'changes_requested') {
    prScore = 40;
    prStatus = 'failed';
    prValue = 'Changes Requested (1 block)';
    prDetails = 'Reviewer Sarah Chen requested fixes on token payload sanitization.';
    prRec = 'Address review comments, push fixes, and request re-review.';
  } else if (symptom === 'pr_pending_review' || pr?.reviewStatus === 'pending') {
    prScore = 70;
    prStatus = 'warning';
    prValue = `1 of 2 Approved (Waiting ${pr?.waitingDays || 3}d)`;
    prDetails = 'Awaiting secondary reviewer sign-off from team lead.';
    prRec = 'Ping requested reviewers or share release changelog.';
  } else if (symptom === 'pr_conflicted' || pr?.mergeability === 'conflicted') {
    prScore = 30;
    prStatus = 'failed';
    prValue = 'Conflicted Merge Base';
    prDetails = 'Branch has merge conflicts with target base main branch.';
    prRec = 'Rebase onto main and resolve file conflicts.';
  } else if (symptom === 'pr_approved_ready' || pr?.reviewStatus === 'approved') {
    prScore = 100;
    prStatus = 'passed';
    prValue = `${pr?.approvalsCount || 2} of 2 Approved`;
    prDetails = 'Two required peer reviewers approved changes with clean mergeability.';
    prRec = 'PR is ready for merge & release deployment.';
  }

  const prApprovalsMetric: ReleaseReadinessMetric = {
    id: 'pr_approvals',
    name: 'PR Approvals',
    score: prScore,
    weight: 0.15,
    status: prStatus,
    value: prValue,
    target: '≥ 2 Peer Approvals',
    details: prDetails,
    recommendation: prRec,
    icon: 'GitPullRequest',
  };

  // ----------------------------------------------------
  // PILLAR 5: Branch Freshness (Weight: 15%)
  // ----------------------------------------------------
  let branchScore = 100;
  let branchStatus: 'passed' | 'warning' | 'failed' = 'passed';
  let branchValue = '0 commits behind';
  let branchDetails = 'Current branch is fully synchronized with upstream origin/main.';
  let branchRec = 'Branch is fresh and ready for release.';

  const behind = branch.behindCount || 0;
  if (symptom === 'stale_branch' || branch.isStale) {
    branchScore = 40;
    branchStatus = 'failed';
    branchValue = `Stale Branch (${branch.staleDays || 21}d old)`;
    branchDetails = 'Branch has not been updated in over 14 days and has drifted from origin.';
    branchRec = 'Rebase active changes onto current main branch.';
  } else if (symptom === 'behind_remote' || behind > 0) {
    if (behind <= 3) {
      branchScore = 75;
      branchStatus = 'warning';
      branchValue = `${behind} commits behind origin`;
      branchDetails = `Remote origin gained ${behind} incoming commits since last branch point.`;
      branchRec = 'Run fast-forward pull or rebase before tagging release.';
    } else {
      branchScore = 50;
      branchStatus = 'failed';
      branchValue = `${behind} commits behind origin`;
      branchDetails = 'Significant divergence from upstream origin.';
      branchRec = 'Synchronize branch to avoid post-release regressions.';
    }
  } else if (symptom === 'merge_conflict') {
    branchScore = 30;
    branchStatus = 'failed';
    branchValue = 'Divergent Conflict';
    branchDetails = 'Local edits conflict with incoming remote commits.';
    branchRec = 'Resolve file conflicts before triggering deployment.';
  }

  const branchFreshnessMetric: ReleaseReadinessMetric = {
    id: 'branch_freshness',
    name: 'Branch Freshness',
    score: branchScore,
    weight: 0.15,
    status: branchStatus,
    value: branchValue,
    target: 'Synced with origin (0 behind)',
    details: branchDetails,
    recommendation: branchRec,
    icon: 'GitBranch',
  };

  // ----------------------------------------------------
  // OVERALL WEIGHTED CALCULATION
  // ----------------------------------------------------
  const rawScore =
    testsPassingMetric.score * testsPassingMetric.weight +
    coverageMetric.score * coverageMetric.weight +
    vulnerabilitiesMetric.score * vulnerabilitiesMetric.weight +
    prApprovalsMetric.score * prApprovalsMetric.weight +
    branchFreshnessMetric.score * branchFreshnessMetric.weight;

  const overallScore = Math.round(rawScore);

  // Collect Blockers and Warnings
  const blockers: string[] = [];
  const warnings: string[] = [];

  if (vulnerabilitiesMetric.status === 'failed') {
    blockers.push(vulnerabilitiesMetric.value === '1 High-Severity CVE' ? 'One high-severity vulnerability prevents green status.' : `${vulnerabilitiesMetric.value} detected in dependencies.`);
  } else if (vulnerabilitiesMetric.status === 'warning') {
    warnings.push(vulnerabilitiesMetric.details);
  }

  if (testsPassingMetric.status === 'failed') {
    blockers.push('Failing tests block release deployment.');
  } else if (testsPassingMetric.status === 'warning') {
    warnings.push('Flaky test suite creates release uncertainty.');
  }

  if (prApprovalsMetric.status === 'failed') {
    blockers.push('Pending PR changes requested prevent release approval.');
  } else if (prApprovalsMetric.status === 'warning') {
    warnings.push('Awaiting final PR peer review approval.');
  }

  if (branchFreshnessMetric.status === 'failed') {
    blockers.push(branchFreshnessMetric.details);
  } else if (branchFreshnessMetric.status === 'warning') {
    warnings.push(branchFreshnessMetric.details);
  }

  if (coverageMetric.status === 'failed') {
    warnings.push(`Test coverage (${coveragePct}%) is below 80% production threshold.`);
  }

  // Determine Status & Headline
  let status: 'green' | 'amber' | 'red' = 'green';
  let statusLabel: 'Ready to Ship' | 'Caution / Review' | 'Blocked' = 'Ready to Ship';

  if (blockers.length > 0 || overallScore < 70) {
    status = 'red';
    statusLabel = 'Blocked';
  } else if (warnings.length > 0 || overallScore < 85) {
    status = 'amber';
    statusLabel = 'Caution / Review';
  }

  // Construct precise AI Headline
  let headline = `Release readiness: ${overallScore}%.`;
  if (blockers.length > 0) {
    // Primary blocker
    headline = `Release readiness: ${overallScore}%. ${blockers[0]}`;
  } else if (warnings.length > 0) {
    headline = `Release readiness: ${overallScore}%. Minor warnings require review before production sign-off.`;
  } else {
    headline = `Release readiness: ${overallScore}%. All 5 readiness criteria satisfied for green status.`;
  }

  const signOffChecklist: ReleaseSignOffItem[] = [
    {
      id: 'tests_pass_check',
      label: 'All unit & integration test suites green',
      passed: testsPassingMetric.status === 'passed',
      required: true,
      details: testsPassingMetric.value,
    },
    {
      id: 'coverage_check',
      label: 'Code coverage satisfies ≥ 80% baseline',
      passed: coverageMetric.status === 'passed',
      required: false,
      details: coverageMetric.value,
    },
    {
      id: 'cve_check',
      label: 'Zero high/critical security vulnerabilities',
      passed: vulnerabilitiesMetric.status === 'passed',
      required: true,
      details: vulnerabilitiesMetric.value,
    },
    {
      id: 'pr_approval_check',
      label: 'Required peer review approvals recorded',
      passed: prApprovalsMetric.status === 'passed',
      required: true,
      details: prApprovalsMetric.value,
    },
    {
      id: 'branch_sync_check',
      label: 'Branch is fresh and synchronized with upstream',
      passed: branchFreshnessMetric.status === 'passed',
      required: true,
      details: branchFreshnessMetric.value,
    },
  ];

  return {
    overallScore,
    status,
    statusLabel,
    headline,
    blockers,
    warnings,
    metrics: {
      testsPassing: testsPassingMetric,
      coverage: coverageMetric,
      vulnerabilities: vulnerabilitiesMetric,
      prApprovals: prApprovalsMetric,
      branchFreshness: branchFreshnessMetric,
    },
    executiveSummary: `Evaluated 5 release dimensions across CI/CD test results, code coverage metrics, dependency security scans, pull request approval status, and Git branch topology.`,
    canShip: blockers.length === 0 && overallScore >= 80,
    signOffChecklist,
    generatedAt: new Date().toISOString(),
  };
}
