/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "7d91658f2299859205cef9397ea23130"
  },
  {
    "url": "article/linux/without-password-use-ssh/index.html",
    "revision": "e29ac13f41927a671372c043eb0490f8"
  },
  {
    "url": "assets/css/0.styles.8dd9c689.css",
    "revision": "1e30e4a6ecc0503c97e45c228845803e"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.edf2b7a8.js",
    "revision": "373e99522d1a41ed44a319bdf58708e3"
  },
  {
    "url": "assets/js/11.e6ab4a2d.js",
    "revision": "a4d7a2e0415442a36a50fe9b9aaa3e5f"
  },
  {
    "url": "assets/js/12.e0ab2f16.js",
    "revision": "9fdf9cc800f29d05ab4ed1a4454fca38"
  },
  {
    "url": "assets/js/13.e1e04f72.js",
    "revision": "7e686ba62917c7e3e6fba37e936ecf79"
  },
  {
    "url": "assets/js/14.0b50b80b.js",
    "revision": "1d6cfb91bbb4d7062beb86bd51f313e0"
  },
  {
    "url": "assets/js/15.a261a641.js",
    "revision": "28a8b0a74f9ace66ae39540c7b362582"
  },
  {
    "url": "assets/js/16.20360c4b.js",
    "revision": "366c65a9fc86fb80a4fc4877e59fe2a0"
  },
  {
    "url": "assets/js/17.6f72ee5c.js",
    "revision": "3ac9340d6a5e08d76514190c11660da0"
  },
  {
    "url": "assets/js/18.f0dcbae8.js",
    "revision": "bd460a5135a020b9a2866d077f30d90d"
  },
  {
    "url": "assets/js/19.b36ac32f.js",
    "revision": "3a762564d6a7509e8799ec02e97b7433"
  },
  {
    "url": "assets/js/2.e27e5834.js",
    "revision": "87d62fb5e0ac810fa0f7c9784431e393"
  },
  {
    "url": "assets/js/20.f2aee41a.js",
    "revision": "eda3923bbb9f60cc6cb42205b86313c3"
  },
  {
    "url": "assets/js/21.0f784c79.js",
    "revision": "aab3679b5a9cb68d69408a53b58f272d"
  },
  {
    "url": "assets/js/22.79033d84.js",
    "revision": "8b2d0f4ea87fb34b26d961c8715275ca"
  },
  {
    "url": "assets/js/23.7c846e2d.js",
    "revision": "f9d2332bd17c184ada433e43ef3cd5c3"
  },
  {
    "url": "assets/js/24.8cecff1e.js",
    "revision": "7e0d377cf85d7cac3de3b6d5f1522b8c"
  },
  {
    "url": "assets/js/25.fc98342d.js",
    "revision": "4ebe1562be4cc8d81bcbb1b84892b0e1"
  },
  {
    "url": "assets/js/3.fc511bd9.js",
    "revision": "830ea4ca109336e8aec3e1e9cf746845"
  },
  {
    "url": "assets/js/4.ac61af6e.js",
    "revision": "effe68f3e8a05c3f4661f1415a21a247"
  },
  {
    "url": "assets/js/5.7ffeb89c.js",
    "revision": "ff42b231ab82473cff40b2e475eec386"
  },
  {
    "url": "assets/js/6.ff79c631.js",
    "revision": "324941022aa31205a17b758836cf237e"
  },
  {
    "url": "assets/js/7.c3881901.js",
    "revision": "a6b2547a93862c489aeff324ccdf11e7"
  },
  {
    "url": "assets/js/8.06c63c4c.js",
    "revision": "14876a2c6a456268fddf02475a5ca26d"
  },
  {
    "url": "assets/js/9.32cc05de.js",
    "revision": "d70a35374f6e7f0f1c7fd2b20ddb0269"
  },
  {
    "url": "assets/js/app.b66b0f88.js",
    "revision": "80bbd902ffdb41759805b1f7464da1f6"
  },
  {
    "url": "author.png",
    "revision": "e81e11c58976ee5c892e867cd4f4c0f8"
  },
  {
    "url": "code-review/Introduction.html",
    "revision": "2cd883260bd79169fb72f3f3f10acaea"
  },
  {
    "url": "code-review/Tools.html",
    "revision": "77ea6f1eddda71d9685c6756c2d4d604"
  },
  {
    "url": "devops/gitlab-ci/gitlab-ci-0.html",
    "revision": "1e971d09b11e2f5a2bba60c708b5a7b8"
  },
  {
    "url": "devops/gitlab-ci/gitlab-ci-1.html",
    "revision": "ea7cf3d85615df89210317e0cbae766d"
  },
  {
    "url": "devops/gitlab-ci/gitlab-ci-2.html",
    "revision": "c90690e55d855d8538520b2ce4fc97fa"
  },
  {
    "url": "devops/gitlab-ci/gitlab-ci-3.html",
    "revision": "0fcfb4519dd4f054e7ac0e3f9577ec82"
  },
  {
    "url": "favicon.png",
    "revision": "72d27c8e9f15250705aed26c2ca78ebe"
  },
  {
    "url": "index.html",
    "revision": "eea23616dec7f6b6d6c603a171c26331"
  },
  {
    "url": "kubernetes/sync-scripts.html",
    "revision": "9e645d657f934616e94612eec01ad9b1"
  },
  {
    "url": "LaTeX.html",
    "revision": "488b152371ab66849667d73857138c9d"
  },
  {
    "url": "linux/introduction.html",
    "revision": "300557c0963417e6183c4c687ea97baf"
  },
  {
    "url": "linux/shell.html",
    "revision": "7cd26c98a359d264386b14136f99bdbc"
  },
  {
    "url": "logo.png",
    "revision": "73fe00acd6c4fc83600e8d82ec4130a0"
  },
  {
    "url": "logo1.png",
    "revision": "a601863e4a3614066921887d9e58c955"
  },
  {
    "url": "lombok/lombok-1.html",
    "revision": "59dc15191799745309cfa061bbe5d4ea"
  },
  {
    "url": "lombok/lombok-2.html",
    "revision": "c1e79a4dcfd7755eea9e18bbc895abcd"
  },
  {
    "url": "spring/spring-family-bucket-1.html",
    "revision": "b2f0a0295a7880d3316e33c584aed570"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
