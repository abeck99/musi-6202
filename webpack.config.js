const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs')
const exec = require('child_process').exec;
const GoogleFontsPlugin = require('google-fonts-plugin')
const MathJax = require('mathjax-full/components/webpack.common.js');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pathBase = path.resolve(__dirname);
const pathSrc = path.join(pathBase, 'src');
const pathLib = path.join(pathBase, 'lib');
const pathDist = path.join(pathBase, 'dist');

// TODO: Add eval-source-map to dev/live version
// TODO: Add "mode: 'development'" for dev/live version
// TODO: Remove minification for live version
// TODO: Look into collapse_vars settings - is there an issue with font awesome and collapse vars?

const getEntries = function(filepath) {
  return fs.readdirSync(filepath)
    .filter(file => file.match(/^(class.*\.js|supp.*\.js|index\.js)$/))
    .map(file => {
      return {
        name: path.parse(file).name,
        path: file
      }
    })
}

async function getConfig() {

  // Configurable options for the build
  const userConfig = {

    /* Languages to be supported by syntax highlighting in Reveal 
     (the more fonts, the heavier the bundle will be) */
    HIGHLIGHT_LANGUAGES: ['xml', 'javascript', 'python', 'bash'],

    /* Fonts and formats to be included in build. Could be several from ['ttf', 'eot', 'woff', 'woff2']*/
    GOOGLE_FONTS: [	{"family": "Source Sans Pro"},
            		    {"family": "Passion One"}],
    GOOGLE_FONTS_FORMATS: ['ttf'],
    
    /* FONT AWESOME. CSS or SVG backend. If CSS chosen, then either link to the CDN
    or link to local .css file (automatically downloaded)*/
    FONTAWESOME_BACKEND: process.env.FONT_AWESOME, // 'css' or 'svg'
    FONTAWESOME_CDN: "https://use.fontawesome.com/releases/v5.2.0/css/all.css",
    FONTAWESOME_USE_LOCAL: true
  
  }
  
  // Check if all the font formats already present in dist folder.
  const FONTS_DONWLOAD = userConfig.GOOGLE_FONTS_FORMATS.map(format => fs.existsSync(`./dist/lib/css/${format}.css`))
    .reduce((acc, bool) => acc && bool, true) ? false : true

  console.log('Google fonts download:', FONTS_DONWLOAD)
  console.log('FontAwesome framework:', userConfig.FONTAWESOME_BACKEND)

  const presentations = getEntries(pathSrc)

  var entryPoints = {}

  const presentationsHtml = presentations.reduce((entries, entry) => {
    const name = entry.name;
    const filepath = path.join(pathSrc, entry.path)
    entryPoints[name] = filepath
    const baseName = path.parse(entry.path).name
    console.log("HTML FOR ", `./${baseName}.html`, " entry is at ", filepath)

    entries.push(new HtmlWebpackPlugin({
      title: name,
      chunks: [name],
      template: path.join(pathLib, 'template', 'Html.js'),
      filename: `./${baseName}.html`,
    }))
    entries.push(new HtmlWebpackPlugin({
      title: `${baseName}-pdf`,
      chunks: [name],
      template: path.join(pathLib, 'template', 'Html.js'),
      filename: `./${baseName}-pdf.html`,
    }))
    return entries
  }, [])

  return {
    entry: entryPoints, //path.join(pathSrc, 'index'),
    mode: 'production',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'lib/js/[name].js'
    },

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              // // see https://github.com/FortAwesome/Font-Awesome/
              // // and https://github.com/fabiosantoscode/terser/issues/50
              collapse_vars: true,
            },
            output: null,
          },
          sourceMap: false
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.csv$/,
          loader: 'csv-loader',
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true
          }
        },
        {
          test: /\.(png|jpe?g|gif|mp3)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(mp4)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.md$/,
          loader: 'html-loader!highlight-loader!markdown-loader'
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              // options: {
              //   modules: true,
              //   sourceMap: true,
              //   importLoader: 2
              // }
            },
            'sass-loader',
          ],
        },
        { test: /(eot|woff|woff2|ttf|otf|svg)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // publicPath: './../../',
              publicPath: '../webfonts/',
              outputPath: 'lib/webfonts/',
              emitFile: true
            }  
          }
        ]
      },
      ]
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      alias: {
        nodePath: path.join(__dirname, 'node_modules'),
        stylesPath: path.join(pathLib, 'css'),
        lib: pathLib,
        'reveal-plugins': path.join(pathLib, 'reveal-plugins'),
      }
    },

    // devtool: "eval-source-map",

    devServer: {
      contentBase: path.join(__dirname, "dist/"),
      port: 9000
    },

    plugins: [
      ...presentationsHtml,
     
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index'],
        title: '',
        template: path.join(pathLib, 'template', 'Html.js') // Load a custom template
      }),

      new webpack.ProvidePlugin({
        Reveal: 'reveal.js',
      }),

      /* Copy some needed files in hierarchy */
      new CopyWebpackPlugin({
        patterns: [
          // speaker note base window
          { from: 'node_modules/reveal.js/plugin/notes/notes.html', to: 'lib/js/reveal.js-dependencies/notes.html' },
          // Mathjax fonts
          { from: 'node_modules/mathjax-full/es5/output', to: 'lib/mathjax' },
          // Mathjax tex component
          { from: path.join(pathLib, 'reveal-plugins', 'tex-components', '*.min.js'), to: 'lib/mathjax/tex-components/[name].js' },
          // any files in content
          // { context: 'src/content',
          //   from: '**/*',
          //   to: 'content/'
          // }
        ]
      }),

      new CopyWebpackPlugin({
        patterns: [
          // Style from reveal.js-menu, css (not compatible with svg inline)
          { from: 'node_modules/reveal.js-menu/menu.css', to: 'lib/css/menu.css' },
        ]
      }),

      new webpack.DefinePlugin({
        HIGHLIGHT_LANGUAGES: JSON.stringify(Object.assign({}, userConfig.HIGHLIGHT_LANGUAGES)),
        FA_CSS_LOCAL: userConfig.FONTAWESOME_BACKEND == 'css' && userConfig.FONTAWESOME_USE_LOCAL && !isEnv('production-web-css'),
      }),

      /* Include only Highlights.js languages that are specified in configEnv.HIGHLIGHT_LANGUAGES */
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(`^./(${userConfig.HIGHLIGHT_LANGUAGES.join('|')})$`),
      ),

      new MiniCssExtractPlugin({
        filename: 'lib/css/[name].css',
        // chunkFilename: "lib/css/[name].css"
      }),

      /* !!!! FONTS AWESOME !!!!
       If (FONTAWESOME_BACKEND=='css' && FONTAWESOME_USE_LOCAL==false) just link
       to the FA CDN */
      (isEnv('production-web-css') || (userConfig.FONTAWESOME_BACKEND=='css' && !userConfig.FONTAWESOME_USE_LOCAL))
        && new HtmlWebpackTagsPlugin({
            assets: [userConfig.FONTAWESOME_CDN],
            append: true 
        }),

      /* If font formats missing, then download them */
      (FONTS_DONWLOAD) 
        && new GoogleFontsPlugin({
          "fonts": userConfig.GOOGLE_FONTS,
          "formats": userConfig.GOOGLE_FONTS_FORMATS,
          "filename": `lib/css/[name].css`,
        }),
      
      /* Include fonts */
      new HtmlWebpackTagsPlugin({
          tags: userConfig.GOOGLE_FONTS_FORMATS.map(format => `lib/css/${format}.css`),
          append: true 
    	}),

    ].filter((plugin) => plugin !== false) // filter out skipped conditions
  };

}

const isEnv = (name) => process.env.NODE_ENV === name

module.exports = getConfig();
