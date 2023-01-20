const NPM_PREPARE_SCRIPT = process.env.NPM_PREPARE_SCRIPT;
const NPM_INSTALL =
  (process.env.NPM_PREPARE_SCRIPT !== undefined &&
    process.env.NPM_INSTALL !== "false") ||
  process.env.NPM_INSTALL === "true";

const config = {
  branches: [
    { name: "main" },
    { name: "next" },
    { name: "+([0-9])?(.{+([0-9]),x}).x" },
    { name: "dev", prerelease: true },
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogTitle: "# Changelog",
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd: [
          NPM_INSTALL && `npm ci`,
          NPM_PREPARE_SCRIPT !== undefined && `npm run ${NPM_PREPARE_SCRIPT}`, //  --if-present,
        ]
          .map((entry) => entry || "true")
          .join(" && "),
      },
    ],
    [
      "@semantic-release/npm",
      {
        tarballDir: "dist",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: "dist/*.tgz",
        failComment: false,
        addReleases: "bottom",
      },
    ],
    [
      "@semantic-release/git",
      {
        message: "chore(release): ${nextRelease.version}",
      },
    ],
  ],
};

module.exports = config;
