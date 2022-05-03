// 推荐使用 build API，而不是 buildSync，否则会丧失 Golang 多线程能力作用
const { build, buildSync, serve } = require("esbuild");

// 打包
// async function runBuild() {
//   // 异步方法，返回一个 Promise
//   const result = await build({
//     // ----  如下是一些常见的配置  --- 
//     // 当前项目根目录
//     absWorkingDir: process.cwd(),
//     // 入口文件列表，为一个数组
//     entryPoints: ["./src/index.jsx"],
//     // 打包产物目录
//     outdir: "dist/api",
//     // 是否需要打包，一般设为 true
//     bundle: true,
//     // 模块格式，包括`esm`、`commonjs`和`iife`
//     format: "esm",
//     // 需要排除打包的依赖列表
//     external: [],
//     // 是否开启自动拆包
//     splitting: true,
//     // 是否生成 SourceMap 文件
//     sourcemap: true,
//     // 是否生成打包的元信息文件
//     metafile: true,
//     // 是否进行代码压缩
//     minify: false,
//     // 是否开启 watch 模式，在 watch 模式下代码变动则会触发重新打包
//     watch: false,
//     // 是否将产物写入磁盘
//     write: true,
//     // Esbuild 内置了一系列的 loader，包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
//     // 针对一些特殊的文件，调用不同的 loader 进行加载
//     loader: {
//       '.png': 'base64',
//     }
//   });
//   console.log(result);
// }

// 打包并启动一个 HTTP dev server，并于每次重新访问项目时，进行增量构建
// http dev server 一般是用于开发环境，生产环境我们一般用 ngnix/node 做 HTTP 静态服务器，托管静态文件
function runBuild() {
  serve(
    {
      port: 8099,
      // 静态资源目录
      servedir: './dist'
    },
    {
      absWorkingDir: process.cwd(),
      entryPoints: ["./src/index.jsx"],
      outdir: "dist/api",
      bundle: true,
      format: "esm",
      splitting: true,
      sourcemap: true,
      ignoreAnnotations: true,
      metafile: true,
    }
  ).then((server) => {
    console.log("HTTP Server starts at port", server.port);
  });
}

runBuild();