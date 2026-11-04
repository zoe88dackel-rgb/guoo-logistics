// Each invitation mode owns its background and text layout independently.
// Original branding, body text, and signatures are retained in each background.
window.INVITATION_TEMPLATES = {
  guoo: {
    label: '国欧物流',
    src: 'https://raw.githubusercontent.com/Lilrain-hub/Rain-web-publish/ac87a79d7f01337b5592b34bae8d0eaf8f093606/docs/assets/guoo-blank-v3.png',
    previewSrc: './assets/guoo-preview-v3.webp',
    width: 3505, height: 7792,
    erase: { x: 1258, y: 4355, width: 1975, height: 205 },
    name: { x: 1296, baseline: 4492, maxWidth: 1764, fontSize: 121, minFontSize: 67 },
    color: '#101820', accent: '#1b2f8c', maxLength: 24,
    logo: {erase:{x:2090,y:126,width:970,height:370},draw:{x:2150,y:175,width:850,height:270}},
  },
  guomao: {
    label: '国贸集团',
    src: 'https://raw.githubusercontent.com/Lilrain-hub/Rain-web-publish/ac87a79d7f01337b5592b34bae8d0eaf8f093606/docs/assets/guomao-blank-v3.png',
    previewSrc: './assets/guomao-preview-v3.webp',
    width: 3505, height: 7792,
    erase: { x: 755, y: 4285, width: 2475, height: 205 },
    name: { x: 783, baseline: 4415, maxWidth: 2277, fontSize: 121, minFontSize: 67 },
    color: '#101820', accent: '#1b2f8c', maxLength: 24,
    logo: {erase:{x:2090,y:126,width:970,height:370},draw:{x:2150,y:175,width:850,height:270}},
  },
};
