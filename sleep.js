const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
module.exports = sleep;

// 测试用例
// const sleep = require('./src/sleep.js');
// async function main() {
//   console.log("sleeping for 1000ms...")
//   await sleep(1000);
//   console.log("done sleeping!");
//   await sleep(1000);
//   console.log("done sleeping again!");
// }
// main();