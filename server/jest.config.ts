import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  verbose: true,
  globalSetup: "./src/tests/setup.ts",
  globalTeardown: "./src/tests/teardown.ts",
};

export default config;
