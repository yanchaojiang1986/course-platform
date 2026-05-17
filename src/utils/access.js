export const PLAN_RANK = {
  free: 1,
  vip: 2,
  svip: 3,
}

export function normalizePlan(plan) {
  return PLAN_RANK[plan] ? plan : 'free'
}

export function hasPlanAccess(userPlan, requiredPlan = 'free') {
  const up = PLAN_RANK[normalizePlan(userPlan)] || PLAN_RANK.free
  const rp = PLAN_RANK[normalizePlan(requiredPlan)] || PLAN_RANK.free
  return up >= rp
}
