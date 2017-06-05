#!/bin/bash

# 需要依赖的模块
array=(
  "fis-parser-es6-babel"
  "fis3-hook-module"
  "fis3-postpackager-loader"
  "fis-parser-less-2.x"
  "fis-optimizer-uglify-js"
  "fis-optimizer-clean-css"
  "fis-optimizer-html-minifier"
)

# 循环遍历安装
for data in ${array[@]}
do
  echo "npm install -g " ${data}
  npm install -g ${data}
  printf "\n\n"
done  