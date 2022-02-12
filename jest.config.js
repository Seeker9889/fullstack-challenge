// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  //setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  //moduleDirectories: ['node_modules', '<rootDir>/', '<rootDir>/pages/api']
}

module.exports = createJestConfig(customJestConfig)