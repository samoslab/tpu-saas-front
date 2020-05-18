// const domain = 'http://api.yqkkn.com/';
const domain =
  process.env.NODE_ENV !== "production" ? "" : "https://api.yqkkn.com/";
const loginUrl = domain + "";
const psdCheck = domain + "redpkt/index/sendpkt";
// 默认配置
global.defConfig = {
  avatar: "http://s.yqkkn.com/samo.png"
};
export default {
  domain,
  loginUrl,
  psdCheck
};
