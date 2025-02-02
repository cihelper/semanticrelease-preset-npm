module.exports = {
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
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING-CHANGE"],
        },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        parserOpts: {
          noteKeywords: [
            "BREAKING CHANGE",
            "BREAKING-CHANGE",
            "NOTABLE CHANGE",
            "NOTABLE-CHANGE",
          ],
        },
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogTitle: "# Changelog",
      },
    ],
    [
      "@semantic-release/npm",
      {
        tarballDir: "artifacts",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: "artifacts/*.tgz",
        failComment: false,
        successComment: false,
        addReleases: "bottom",
      },
    ],
    [
      "semantic-release-major-tag",
      {
        customTags: ["v${major}", "v${major}.${minor}"],
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
