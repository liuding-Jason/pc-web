
/*
* 文件描述：fis-conf文件作为选货web工程化配置工具fis的配置文件存在
*       不同的配置环境下的使用者，请使用不同的配置。
* Author： 柳丁     Date：2016-08-24
* Copyright ：@商品云智
* 使用说明 ：
*   1、关于开发环境的部署以及发布
*     使用fis3进行开发环境部署，请使用  --fis3 release dev [-d] [pathname]-- 进行项目开发版本的构建，
*     在开发环境中，我们只对css样式文件进行压缩
*
*   2、关于测试环境的部署以及发布 
*     使用fis3进行测试环境部署，请使用  --fis3 release qa [-d] [pathname]-- 进行项目开发版本的构建，
*     在测试环境中，我们对js脚本文件、css样式文件进行压缩，并没有使用MD5进行版本控制
*
*   3、关于线上环境的部署以及发布 
*     使用fis3进行测试环境部署，请使用  --fis3 release production [-d] [pathname]-- 进行项目开发版本的构建，
*     在开发环境中，我们对js脚本文件、css样式文件、html文件进行压缩，并使用MD5进行版本控制，同时使用fis3的
*     各种插件对项目进行资源合并和资源映射控制、es6语法的转移等等功能
*     
* Note：在使用fis进行各种环境不是之前，你需要先安装以下插件，保证fis3能够更好的完成前端工程的部署。
*   1、fis-optimizer-html-minifier   ---html压缩插件
*   2、fis3-hook-module               ---模块开发插件
*   3、fis3-postpackager-loader       ---资源加载插件，分析 __RESOURCE_MAP__ 结构
*   4、fis3-parser-less   fis-parser-less  
*   
*   以上插件均可使用 --npm install [-g] <插件名>--  进行安装
*/

function postprocessor(content, file, settings, key){
  var data = {
      // "NODE_ENV" : file["NODE_ENV"]
  };
  data[key] = file[key];
  var newConten = content.replace(/{{([\w]+)}}/g,function(str,key){
    return data[key] || str;
  });
  return newConten;
}

fis.set('project.files', [
  "methods/**",
  "pages/**",
  "app/**",
  "components/**",
  "common/**",
  "*.html"
]);


fis.match('{methods,pages,app,components,common}/**.js', {
  isMod: true,
  moduleId: '$1'
}).match('::package', {
  /* 加载模块加载器，为打包任务做准备 */
  postpackager: fis.plugin('loader', {
    resourceType: 'amd',
    // 资源映射表内嵌
    useInlineMap: true 
  })
})

/* 开发环境配置 */
fis.media('dev')
  .match('/src/config.basis.js', {
    "NODE_ENV" : "dev",
    postprocessor: function (content, file, settings) {
        return postprocessor(content, file, settings, "NODE_ENV");
    }
  })
 /* .match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
  })*/

  .match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
  })

  .match('*.png', { 
    // 使用png-compressor 插件对png图像文件压缩 
    optimizer: fis.plugin('png-compressor') 
  });
  

/* 测试环境配置 */
fis.media('qa')
  .match('/src/config.basis.js', {
    "NODE_ENV" : "qa",
    postprocessor: function (content, file, settings) {
      return postprocessor(content, file, settings, "NODE_ENV");
    }
  })
  .match('*.js', {
    // 要支持 es6 和 jsx， typescript 也能胜任，最主要是编译速度要快很多。
    parser: fis.plugin('typescript'),
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
    // ,
    // packOrder : 100 
  })
  .match('*.{js,css,png,jpg,html}', {
    useHash: true
  })
  .match('{beijing , anhui , aomen , zhongqing , fujian , gansu , guangdong , guangxi , hainan , guizhou , hebei , heilongjiang , henan , hubei , hunan , jiangsu , jiangxi , jilin , liaoning , namenggu , ningxia , qinghai , shandong , shanghai , shanxi , shanxi1 , sichuan , tianjin , xianggang , xinjiang , xicang ,yunnan , zhejiang, login}.js'
    , {
    useHash : false
  })
  .match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
  })
  .match('*.png', { 
    // 使用png-compressor 插件对png图像文件压缩 
    optimizer: fis.plugin('png-compressor') 
  })
  .match('*.min.{js,less}', { 
    packOrder : 100,
    parser : false,     //不编译
    optimizer : false  //不压缩
  })
  .match('/www/img/auto.png', {
    "useHash": false
  })
  .match('/index.html', {
    "useHash": false
  })
  .match('*', {
      // 生产的文件 发布到指定目录
      deploy: fis.plugin('local-deliver', {
          // to: '../../qa.new.report.kuandd.com'
          to : "./output"
      })
  });

/* 模拟线上环境配置 */
fis.media('mock')
  .match('/src/config.basis.js', {
    "NODE_ENV" : "mock",
    postprocessor: function (content, file, settings) {
      return postprocessor(content, file, settings, "NODE_ENV");
    }
  })
  .match('*.{js,css,png,jpg,html}', {
    useHash: true
  })
  .match('{beijing , anhui , aomen , zhongqing , fujian , gansu , guangdong , guangxi , hainan , guizhou , hebei , heilongjiang , henan , hubei , hunan , jiangsu , jiangxi , jilin , liaoning , namenggu , ningxia , qinghai , shandong , shanghai , shanxi , shanxi1 , sichuan , tianjin , xianggang , xinjiang , xicang ,yunnan , zhejiang, login}.js'
    , {
    useHash : false
  })
  .match('/www/img/auto.png', {
    "useHash": false
   })
  .match('*.html', {
    //invoke fis-optimizer-html-minifier
    optimizer: fis.plugin('html-minifier')
  })
  .match('*.js', {
    parser: fis.plugin('typescript'),
    optimizer: fis.plugin('uglify-js')
  })

  .match('*.css', {
    optimizer: fis.plugin('clean-css')
  })
  .match('*.png', { 
    optimizer: fis.plugin('png-compressor') 
  })
  .match('*.min.{js,less}', { 
    packOrder : 100,
    parser : false,
    optimizer : false
  }) 
  .match('/index.html', {
    "useHash": false
  }) ;


/* 线上环境配置 */
fis.media('production')
  .match('/src/config.basis.js', {
    "NODE_ENV" : "production",
    postprocessor: function (content, file, settings) {
      return postprocessor(content, file, settings, "NODE_ENV");
    }
  })
  .match('*.{js,css,png,jpg,html}', {
    useHash: true
  })
  .match('{beijing , anhui , aomen , zhongqing , fujian , gansu , guangdong , guangxi , hainan , guizhou , hebei , heilongjiang , henan , hubei , hunan , jiangsu , jiangxi , jilin , liaoning , namenggu , ningxia , qinghai , shandong , shanghai , shanxi , shanxi1 , sichuan , tianjin , xianggang , xinjiang , xicang ,yunnan , zhejiang, login}.js'
    , {
    useHash : false
  })
  .match('/www/img/auto.png', {
    "useHash": false
  })
  .match('*.html', {
    //invoke fis-optimizer-html-minifier
    optimizer: fis.plugin('html-minifier')
  })
  .match('*.js', {
    // 要支持 es6 和 jsx， typescript 也能胜任，最主要是编译速度要快很多。
    parser: fis.plugin('typescript'),
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js')
    // ,
    // packOrder : 100 
  })
  /*.match('{ajax,resize}.js' , {
    // typescript 就是编译速度会很快，但是对一些 es7 的语法不支持，如果你觉得不爽，可以用 babel 来解决。用以下内容换掉 typescript 的parser配置就好了。
    parser: fis.plugin('babel-5.x', {
       sourceMaps: true,
       optional: ["es7.decorators", "es7.classProperties"]
    }),
    rExt: '.js' 
  })*/
  .match('*.css', {
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css')
  })
  .match('*.png', { 
    // 使用png-compressor 插件对png图像文件压缩 
    optimizer: fis.plugin('png-compressor') 
  })
  .match('*.min.{js,less}', { 
    packOrder : 100,
    parser : false,     //不编译
    optimizer : false  //不压缩
  });

/* 设置发布时，忽略哪些文件 */
fis.set('project.ignore', [
  '*.sh',
  '*.dist',
  '*.md',
  'fis-conf.js',
  'version.txt',
  'package.json'
]) ;
