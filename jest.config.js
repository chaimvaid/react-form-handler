module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    snapshotSerializers: [
        "enzyme-to-json/serializer"
      ],
    setupFilesAfterEnv: ["./setupTests.js"]
  };