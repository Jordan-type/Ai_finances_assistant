export type RepoType =
  | "nodejs-api"
  | "nextjs"
  | "smart-contracts"
  | "python-api"
  | "monorepo";

export const repoTypeConfig: Record<RepoType,{ includePaths: string[]; ignorePaths: string[] }> = {
  "nodejs-api": {
    includePaths: ["src/**/*.ts", "src/**/*.js", "routes/**/*.js", "controllers/**/*.js"],
    ignorePaths: ["**/node_modules/**", "**/dist/**", "**/test/**"],
  },
  "nextjs": {
    includePaths: ["pages/**/*", "components/**/*", "src/**/*", "app/**/*"],
    ignorePaths: ["**/public/**", "**/styles/**", "**/*.md", "**/node_modules/**"],
  },
  "smart-contracts": {
    includePaths: ["contracts/**/*.sol", "scripts/**/*.js", "deploy/**/*.ts"],
    ignorePaths: ["**/node_modules/**", "**/cache/**", "**/artifacts/**"],
  },
  "python-api": {
    includePaths: ["app/**/*", "api/**/*", "main.py"],
    ignorePaths: ["**/__pycache__/**", "**/venv/**", "**/tests/**"],
  },
  "monorepo": {
    includePaths: ["apps/*/src/**/*", "packages/*/src/**/*"],
    ignorePaths: ["**/node_modules/**", "**/dist/**", "**/*.lock", "**/*.json"],
  },
};