export const pricingCatalog = {
  version: "2026-09-18",
  plans: {
    free: {
      name: "Basic",
      monthlyPrice: 0,
      commitmentMonthlyPrice: 0,
      monthlyCredits: "500",
      workspaces: "1",
      deployedWorkflows: "2",
      tables: "3",
      rowsPerTable: "1,000",
      runHistory: "1 day",
      premiumWorkflowNodes: "No",
      exclusiveAiModels: "No",
      codeNode: "Yes",
      analytics: "Yes",
    },
    pro: {
      name: "Pro",
      monthlyPrice: 19,
      commitmentMonthlyPrice: 14.99,
      commitmentValue: 179.88,
      monthlyCredits: "10,000",
      workspaces: "3",
      deployedWorkflows: "Unlimited",
      tables: "25",
      rowsPerTable: "5,000",
      runHistory: "30 days",
      premiumWorkflowNodes: "Yes",
      exclusiveAiModels: "No",
      codeNode: "Yes",
      analytics: "Yes",
    },
    business: {
      name: "Business",
      monthlyPrice: 197,
      commitmentMonthlyPrice: 149.99,
      commitmentValue: 1799.88,
      monthlyCredits: "140,000",
      workspaces: "Unlimited",
      deployedWorkflows: "Unlimited",
      tables: "Unlimited",
      rowsPerTable: "50,000",
      runHistory: "90 days",
      premiumWorkflowNodes: "Yes",
      exclusiveAiModels: "Yes",
      codeNode: "Yes",
      analytics: "Yes",
    },
    enterprise: {
      name: "Enterprise",
      monthlyPrice: null,
      commitmentMonthlyPrice: null,
      monthlyCredits: "Custom",
      workspaces: "Unlimited",
      deployedWorkflows: "Unlimited",
      tables: "Unlimited",
      rowsPerTable: "10,000",
      runHistory: "90 days",
      premiumWorkflowNodes: "Yes",
      exclusiveAiModels: "Yes",
      codeNode: "Yes",
      analytics: "Yes",
    },
  },
} as const;

// Rounded savings compared with twelve payments at the regular monthly rate.
export function annualSavingsPercent(monthly: number, annualMonthly: number) {
  return monthly > 0 ? Math.round((1 - annualMonthly / monthly) * 100) : 0;
}
export const maxAnnualSavingsPercent = Math.max(
  ...Object.values(pricingCatalog.plans).map((plan) =>
    annualSavingsPercent(
      plan.monthlyPrice ?? 0,
      plan.commitmentMonthlyPrice ?? 0,
    ),
  ),
);
