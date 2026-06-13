import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// In Node.js versions prior to native support for import.meta.dirname,
// derive __dirname from import.meta.url.
// (Node 20.11+ supports import.meta.dirname and import.meta.filename.)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
   mode: 'development',
   entry: './src/index.js',
   output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
   },
   devtool: 'eval-source-map',
   devServer: {
      watchFiles: ['./src/template.html'],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/template.html',
      }),
   ],
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
         },

         {
            test: /\.html$/i,
            use: ['html-loader'],
         },

         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },
      ],
   },
};
