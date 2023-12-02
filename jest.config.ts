import type { Config } from "jest";
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.svg$": "<rootDir>/__mocks__/svg-mock.ts",
    "\\.(mp3|webm)$": "<rootDir>/__mocks__/file-mock.ts",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/file-mock.ts",
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "mp3"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: { "^.+\\.[tj]sx?$": "ts-jest" },
  transformIgnorePatterns: [
    //You can remove react-dnd when this issue is fixed: https://github.com/react-dnd/react-dnd/issues/3443
    "<rootDir>/node_modules/(?!react-dnd|dnd-core|@react-dnd)",
  ],
  roots: ["<rootDir>", "<rootDir>/src"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules"],
  // See https://jestjs.io/blog/2022/08/25/jest-29
  snapshotFormat: {
    printBasicPrototype: true,
  },
  resetMocks: true,
};

export default config;
