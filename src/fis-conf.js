/*
* Author： qiaomu@ifmuse.com
* Date: 2016/06/01
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

fis.match('{methods,pages,app,components,common}/**.js', {
  isMod: true
}).match('**/*.less', {
  rExt: '.css',
  parser: fis.plugin('less-2.x', {
  })
});

/* 加载模块加载器，为打包任务做准备 */
fis.match('::package', {
  postpackager: fis.plugin('loader', {
    resourceType: 'amd',
    // 资源映射表内嵌
    useInlineMap: true 
  })
});

/* 开发环境配置 */
fis.media('dev')
  // .match('*', {
  //   // 发布到指定目录
  //   deploy: fis.plugin('local-deliver', {
  //       to: '../output'
  //   })
  // });


/* 测试环境配置 */
fis.media('qa')
  .match('*', {
      useHash: true
  })
  .match('*.js', {
    parser: fis.plugin('typescript'),
    optimizer: fis.plugin('uglify-js')
  })
  .match('*.less', {
    optimizer: fis.plugin('clean-css')
  })
  .match('*.min.{js,less,css}', { 
    packOrder : 100,
    parser : false,    //不编译
    optimizer : false  //不压缩
  })
  .match('*', {
    // 发布到指定目录
    deploy: fis.plugin('local-deliver', {
      to: '../output'
    })
  });
  
