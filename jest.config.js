module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    testEnvironment: "node",
    transform: {
        "^.+\\.(js|ts)x?$": "<rootDir>/node_modules/babel-jest"
    }
};
