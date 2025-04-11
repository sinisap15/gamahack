module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["test"],
  testPathIgnorePatterns: ["./build", "./node_modules", "./setup"],
  // the following line is needed in order to grab modules from the
  // src folder without the need to write them relatively
  moduleDirectories: ["node_modules"],
  testMatch: ["**/test/**/*.test.ts"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./coverage",
        outputName: "junit.xml",
      },
    ],
  ],
  coveragePathIgnorePatterns: ["/build/", "/node_modules/", "/setup/", "/test/"],
  clearMocks: true,
  globalSetup: "./test/support/globalSetup.ts",
  globalTeardown: "./test/support/globalTeardown.ts",
};
