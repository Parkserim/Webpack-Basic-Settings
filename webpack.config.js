const path = require('path'); // path 패키지(모듈) 가져옴
const { VueLoaderPlugin } = require('vue-loader');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    // 확장자 생략
    extensions: ['.vue', '.js'],
    // 경로 별칭
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },

  // node.js의 내보내기 방식
  // webpack의 옵션
  entry: './src/main.js', // 진입점
  output: {
    // 결과 출력
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // .vue로 끝나는 파일들만 찾음

        // npm i -D vue-loader@next
        // 이를 컴파일 할, npm i -D @vue/compiler-sfc
        use: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    // vue-loader가 가진 기능을 webpack에 플러그인으로 등록시켜 주는 과정
    new VueLoaderPlugin(),

    // npm i -D html-webpack-plugin
    new HtmlPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
  ],
};
