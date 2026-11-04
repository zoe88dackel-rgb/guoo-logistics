# 满洲里试运营仪式 · 邀请函生成器

来自公开仓库 [Lilrain-hub/Rain-web-publish](https://github.com/Lilrain-hub/Rain-web-publish) 的现有邀请函工具。保留原版页面设计、国欧物流/国贸集团切换、收件人姓名填写、实时预览和 PNG 导出。

**本目录只做 Bug 修复，不新增编辑功能。**

修复内容：
- 修复跨域读取原图时可能导致 Canvas 污染、生成 PNG 失败的问题。
- 高清底图无法加载或浏览器内存不足时，自动退回到本地轻量预览图导出，避免完全无法保存。
- 回退导出时明确显示「标准清晰度」，避免误标为高清。

**资源说明：** 高清底图每张约 3.3 MB，目前通过固定到原仓库提交的公开 RAW URL 引用；较小的预览图已复制在本目录 assets 内。如果原仓库删除高清原图、网络受限或禁用跨域访问，将使用标准清晰度回退方案。若需完全独立高清运行，可把源仓库 docs/assets/ 内的 guoo-blank-v3.png 和 guomao-blank-v3.png 下载到本目录 assets，再修改 templates-v3.js 对应两条 src 为本地路径。

静态网页直接托管 invitation/ 目录即可。