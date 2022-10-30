import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  verbose: true,
  globalSetup: "./src/tests/setup.ts",
};

export default config;
