/** @type {import('jest').Config} */
const path = require('path');

const config = {
  verbose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      tsconfig: { jsx: "react-jsx" }
    }],
  },
  moduleNameMapper: {
    "^@/(.*)$": path.resolve(__dirname, "$1"),
  },
};
module.exports = config;
