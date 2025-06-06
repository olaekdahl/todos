const config = {
    transform : {},
    setupFiles: [`./jest-shim.js`],
    testPathIgnorePatterns: ['/node_modules/', '/react-todo/'],
}

module.exports = config;