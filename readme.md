文件说明
theme.json --- 深浅色主题说明
sitemap.json --- 管理后台页面收录开关来配置其小程序页面是否允许微信索引

project.config.json --- 在工具上做的任何配置都会写入到这个文件，当重新安装工具或者换电脑工作时，只要载入同一个项目的代码包，开发者工具就自动会帮你恢复到当时你开发项目时的个性化配置，其中会包括编辑器的颜色、代码上传时自动压缩等等一系列选项。

project.config.json condition //编译模式，增加编译模式时，会添加到下面的对应数组

project.private.config.json --- 自定义编译时自动生成

wxs// 小程序wxml模板不支持复杂的运算，复杂的parseInt()、str.split()、num.toFixed()等在{{}}里是无效的