# 邀请函在线生成器

本目录基于公开仓库 [Lilrain-hub/Rain-web-publish](https://github.com/Lilrain-hub/Rain-web-publish) 的 `docs/` 邀请函页面进行修改。移植后的项目独立放在 `invitation/`，不覆盖仓库已有网站。

## 功能
- 国欧物流 / 国贸集团邀请函切换
- 输入受邀人或公司名称，实时预览
- 自定义右上角 GUOO Logo（PNG、JPG、WebP，最多 6 MB），一键恢复原版
- 电脑浏览器直接下载 PNG；iPhone / 微信内置浏览器可长按保存
- 高清导出失败时，自动改用本地轻量图片生成，避免导出彻底失败
- 所有输入和上传 Logo 在浏览器本地处理

## 重要：原图依赖
原仓库的两张 3505×7792 高清邀请函底图各约 3.3 MB。受连接器对大体积二进制文件的读取限制，它们暂时无法被完整复制到此仓库。因此该版本的高清导出通过 GitHub Raw URL 读取原仓库**固定提交**中的高清图片；轻量预览图片已完整复制到 `assets/`。

如果原仓库图片无法访问，仍可用本地 WebP 底图保存兼容画质 PNG。此版本不是完全离线高清版。

为了让本项目完全独立，可手动从原项目 `docs/assets/` 下载：
- `guoo-blank-v3.png`
- `guomao-blank-v3.png`

将两张图片存入这里的 `assets/`，并将 `templates-v3.js` 中两个 `src` 路径替换成相对路径，即可彻底移除对原仓库的依赖。

## 部署
项目无需构建，入口 `invitation/index.html`。仓库如通过 GitHub Pages 发布 `main` 根目录，站点位于：

https://zoe88dackel-rgb.github.io/guoo-logistics/invitation/

若未启用 Pages，需要在仓库 Settings → Pages 中启用。若启用了 Cloudflare Pages，也可把构建输出目录指向 `invitation`，不需要构建命令。

## 版权说明
本项目保留原版活动邀请函素材和视觉设计，设计素材及商标权利归各自权利人。原项目来源如上。
