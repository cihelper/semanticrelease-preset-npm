const NPM_PREPARE_SCRIPT = process.env.NPM_PREPARE_SCRIPT;

const config = {
  branches: [
    { name: "main" },
    { name: "next" },
    { name: "+([0-9])?(.{+([0-9]),x}).x" },
    // { name: "dev", prerelease: true },
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
        prepareCmd:
          NPM_PREPARE_SCRIPT !== undefined
            ? `npm ci && npm run ${NPM_PREPARE_SCRIPT} --if-present`
            : "true",
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
      },
    ],
    "@semantic-release/git",
  ],
};

module.exports = config;
