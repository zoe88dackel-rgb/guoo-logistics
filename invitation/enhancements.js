'use strict';

// Enhancements layered on the upstream invitation renderer.
// Original canvas text/layout functions remain in app-v3.js.
(() => {
  let selectedLogo = null;
  let logoURL = null;
  let uploadRevision = 0;
  const upload = document.getElementById('logo-upload');
  const clearButton = document.getElementById('clear-logo');
  const fileName = document.getElementById('logo-file-name');

  function drawCustomLogo(context, image, config) {
    if (!image || !config.logo) return;
    const scale = context.canvas.width / config.width;
    const rect = config.logo.erase;
    const x = Math.floor(rect.x * scale);
    const y = Math.floor(rect.y * scale);
    // Restore the smooth sky behind the original GUOO logo before placing
    // the user-supplied logo. Everything else in the source artwork is kept.
    eraseText(context, {
      x: x,
      y: y,
      width: Math.ceil((rect.x + rect.width) * scale) - x,
      height: Math.ceil((rect.y + rect.height) * scale) - y
    });
    const area = config.logo.draw;
    const factor = Math.min(area.width / image.naturalWidth, area.height / image.naturalHeight);
    const width = image.naturalWidth * factor;
    const height = image.naturalHeight * factor;
    context.save();
    context.scale(scale, scale);
    context.drawImage(image, area.x + (area.width - width) / 2,
      area.y + (area.height - height) / 2, width, height);
    context.restore();
  }

  const renderOriginal = render;
  render = function (name) {
    renderOriginal(name);
    if (selectedLogo) drawCustomLogo(ctx, selectedLogo, template);
  };

  // An explicit CORS mode is mandatory when reading pixels from externally
  // hosted high-resolution assets (otherwise the canvas becomes tainted).
  loadTemplateImage = async function (config, forPreview = false) {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = forPreview && config.previewSrc ? config.previewSrc : config.src;
    await image.decode();
    return image;
  };

  // The 3505 x 7792 master PNGs are hosted in the original project,
  // while the small previews live locally. Retry locally if HD load or
  // conversion fails so mobile users can still save the invitation.
  exportInvitation = async function (name, config) {
    const sources = [config.src, config.previewSrc].filter(Boolean);
    let lastError;
    for (let attempt = 0; attempt < sources.length; attempt++) {
      let image;
      let output;
      try {
        image = await loadTemplateImage({ ...config, src: sources[attempt], previewSrc: null });
        const dims = attempt === 0 ? exportDimensions(config) : previewDimensions(config);
        output = prepareTemplate(image, config, dims);
        const context = output.getContext('2d');
        drawName(context, name, config, output.width / config.width);
        if (selectedLogo) drawCustomLogo(context, selectedLogo, config);
        return await makeBlob(output);
      } catch (error) {
        lastError = error;
        console.warn('Invitation export retry', attempt + 1, error);
      } finally {
        if (image) image.src = '';
        if (output) { output.width = 1; output.height = 1; }
      }
    }
    throw lastError || new Error('无法生成图片');
  };

  upload.addEventListener('change', async function () {
    const revision = ++uploadRevision;
    const file = upload.files && upload.files[0];
    if (!file) return;
    if (!/^image\/(png|jpeg|webp)$/.test(file.type) || file.size > 6 * 1024 * 1024) {
      upload.value = '';
      status.textContent = 'Logo 格式需为 PNG、JPG 或 WebP，文件不超过 6 MB。';
      return;
    }
    const url = URL.createObjectURL(file);
    const image = new Image();
    try {
      image.src = url;
      await image.decode();
      if (revision !== uploadRevision) {
        URL.revokeObjectURL(url);
        return;
      }
      if (!image.naturalWidth || !image.naturalHeight) throw new Error('Logo 图片尺寸无效');
      if (logoURL) URL.revokeObjectURL(logoURL);
      logoURL = url;
      selectedLogo = image;
      fileName.textContent = file.name;
      clearButton.hidden = false;
      update();
      status.textContent = 'Logo 已替换，可在右侧检查效果。';
    } catch (error) {
      URL.revokeObjectURL(url);
      if (revision === uploadRevision) {
        upload.value = '';
        status.textContent = 'Logo 无法读取，请更换图片重试。';
      }
    }
  });

  clearButton.addEventListener('click', function () {
    ++uploadRevision;
    if (logoURL) URL.revokeObjectURL(logoURL);
    selectedLogo = null;
    logoURL = null;
    upload.value = '';
    fileName.textContent = '默认保留原版 Logo';
    clearButton.hidden = true;
    update();
    status.textContent = '已恢复原版 Logo。';
  });

  // Keep the uploader stable while image export is in progress.
  form.addEventListener('submit', function () {
    if (saving) {
      upload.disabled = true;
      clearButton.disabled = true;
      const waitUntilFree = () => {
        if (!saving) {
          upload.disabled = false;
          clearButton.disabled = false;
          return;
        }
        requestAnimationFrame(waitUntilFree);
      };
      requestAnimationFrame(waitUntilFree);
    }
  });
})();
