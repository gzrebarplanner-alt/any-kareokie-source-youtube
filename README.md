# YouTube 匯入來源（Any KAREOKIE 擴充）

讓 Any KAREOKIE 可以搜尋 YouTube，並下載影片的音訊與畫面來匯入歌曲。
這是**另外散布、使用者自己決定安裝**的擴充，不是 Any KAREOKIE 本身的一部分；使用前請先看 [TERMS.md](TERMS.md)。

- 第一次使用時從 GitHub 的 [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp) 下載 `yt-dlp.exe`，放在 Any KAREOKIE 給這個擴充的資料夾；之後每 3 天讓它自己更新一次
- 介面規格：Any KAREOKIE 的 `docs/sources.md`（protocol 1）
- 這個擴充沒有 Any KAREOKIE 的官方簽章，安裝時 App 會標示「未簽章」

## 打包

```bash
node pack.mjs
```

產生 `dist/any-kareokie-source-youtube-<版本>.zip`，在 Any KAREOKIE 的「設定 → 匯入來源 → 安裝來源…」選這個檔。

原始碼與下載：<https://github.com/gzrebarplanner-alt/any-kareokie-source-youtube>（Releases 放打包好的 zip）。
