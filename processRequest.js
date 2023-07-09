import fetch from "node-fetch";
// 在请求很多的情况下有序返回结果
const processRequest = (urls, max) => {
  // console.log("urls", urls);
  const res = [];
  const len = urls.length;
  // 并发请求的最大数量
  const maxRequest = max || 5;
  // 创建一个队列，用来存储所有的请求
  const queue = urls.slice();
  async function handleRequest() {
    if(queue.length === 0) {
      console.log("最终结果", res);
      return;
    }
    // 取出下一个请求
    const url = queue.shift();
    try {
      // 发起请求
      const response = await fetch(url);
      res.push(response.url);
      // 递归调用
      handleRequest();
    } catch (error) {
      console.error(`请求出错：${url}, ${error}`);
      handleRequest();
    }
  }
  // 控制并发数
  for(let i = 0; i < maxRequest; i++) {
    handleRequest();
  }
}
export default processRequest;
// 测试用例
// import processRequest from "./processRequest.js";
// const urls = [
//   "https://jsonplaceholder.typicode.com/posts/1",
//   "https://jsonplaceholder.typicode.com/posts/2",
//   "https://jsonplaceholder.typicode.com/posts/3",
// ]
// processRequest(urls, 2);