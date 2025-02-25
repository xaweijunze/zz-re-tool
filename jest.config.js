// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // 确保使用 jsdom 环境
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // 添加 setup 文件
};
