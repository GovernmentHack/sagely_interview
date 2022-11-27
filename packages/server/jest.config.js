module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        diagnostics: false,
      }
    ],
  },
  testMatch: ["**/*.test.(ts|tsx)"],
  testEnvironment: "node",
  reporters: ["default", "jest-junit"],
  roots: ["./src/"]
}
