import fetch from "node-fetch";
const fetchWithRetry = async (url, maxRetryTimes = 3) => {
  // console.log("url", url, maxRetryTimes);
  let retryTimes = 0;
  return new Promise((resolve, reject) => {
    const handleFetch = async () => {
      try {
        const response = await fetch(url);
        if(response.status === 200) {
          resolve(response);
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        retryTimes++;
        if(retryTimes >= maxRetryTimes) {
          reject(error);
        } else {
          handleFetch();
        }
      }
    }
    handleFetch();
  });
}
export default fetchWithRetry;