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
    ["@semantic-release/exec", { prepareCmd: "npm run build --if-present" }],
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
        // failComment: false,
      },
    ],
    "@semantic-release/git",
  ],
};

module.exports = config;
