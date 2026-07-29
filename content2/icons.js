function renderIconImage(instructions, cache) {
  let {
    size: size,
    spread: spread,
    radius: radius,
    greyed: greyed,
    channel: channel,
  } = instructions;
  let cacheKey = JSON.stringify({
    instructions: instructions,
  });
  let cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }
  let ctx = new OffscreenCanvas(size, size).getContext('2d');
  ctx.lineCap = 'round';
  let centerX = size / 2 - 5;
  let centerY = size / 2;
  let offsetX = spread * Math.sin(Math.PI / 6);
  let offsetY = spread * Math.cos(Math.PI / 6);
  let drawCircle = (alpha, circleX, circleY, fillStyle, circleRadius) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI, !1);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };
  let gradientBlue = ctx.createLinearGradient(
    size,
    size * 0.5,
    size * 0.5,
    size * 0.5,
  );
  gradientBlue.addColorStop(0.1652, '#A6DEEF');
  gradientBlue.addColorStop(0.3949, '#6CC5F0');
  gradientBlue.addColorStop(0.8805, '#355BAA');
  let gradientYellow = ctx.createLinearGradient(
    size * 0.3,
    size * 0.25,
    size * 0.6,
    size * 0.6,
  );
  gradientYellow.addColorStop(0, '#FFF200');
  gradientYellow.addColorStop(1, '#FFCE07');
  let gradientRed = ctx.createLinearGradient(
    size * 0.5,
    size * 0.5,
    size * 0.5,
    size,
  );
  gradientRed.addColorStop(0, '#EC223B');
  gradientRed.addColorStop(0.2577, '#E42339');
  gradientRed.addColorStop(0.492, '#D42634');
  gradientRed.addColorStop(0.7172, '#BD292C');
  gradientRed.addColorStop(0.9354, '#9E2B22');
  gradientRed.addColorStop(1, '#942B1F');
  let ringDelta = 0.2;
  let outlineColor = '#666';
  if (
    (channel == 'beta' && (outlineColor = 'green'),
    channel == 'dev' && (outlineColor = '#F06'),
    drawCircle(
      1,
      centerX + spread,
      centerY,
      outlineColor,
      radius * (1 + ringDelta),
    ),
    drawCircle(
      1,
      centerX - offsetX,
      centerY - offsetY,
      outlineColor,
      radius * (1 + ringDelta),
    ),
    drawCircle(
      1,
      centerX - offsetX,
      centerY + offsetY,
      outlineColor,
      radius * (1 + ringDelta),
    ),
    (ctx.globalCompositeOperation = 'destination-out'),
    drawCircle(1, centerX + spread, centerY, '#FFF', radius * (1 - ringDelta)),
    drawCircle(
      1,
      centerX - offsetX,
      centerY - offsetY,
      '#FFF',
      radius * (1 - ringDelta),
    ),
    drawCircle(
      1,
      centerX - offsetX,
      centerY + offsetY,
      '#FFF',
      radius * (1 - ringDelta),
    ),
    (ctx.globalCompositeOperation = 'source-over'),
    !greyed)
  ) {
    drawCircle(1, centerX + spread, centerY, 'white', radius);
    drawCircle(1, centerX - offsetX, centerY - offsetY, 'white', radius);
    drawCircle(1, centerX - offsetX, centerY + offsetY, 'white', radius);
    drawCircle(1, centerX + spread, centerY, gradientBlue, radius);
    drawCircle(
      0.9,
      centerX - offsetX,
      centerY - offsetY,
      gradientYellow,
      radius,
    );
    drawCircle(0.85, centerX - offsetX, centerY + offsetY, gradientRed, radius);
  } else {
    let greyGradient = ctx.createLinearGradient(0, 0, size, size);
    greyGradient.addColorStop(0, '#333');
    greyGradient.addColorStop(1, '#CCC');
    drawCircle(1, centerX + spread, centerY, 'white', radius);
    drawCircle(1, centerX - offsetX, centerY - offsetY, 'white', radius);
    drawCircle(1, centerX - offsetX, centerY + offsetY, 'white', radius);
    drawCircle(0.2, centerX + spread, centerY, greyGradient, radius);
    drawCircle(0.2, centerX - offsetX, centerY - offsetY, greyGradient, radius);
    drawCircle(0.2, centerX - offsetX, centerY + offsetY, greyGradient, radius);
  }
  let imageData = ctx.getImageData(0, 0, size, size);
  cache.set(cacheKey, imageData);
  return imageData;
}
var iconCache = new Map();
var iconSize = 128;
var iconRadius = 35;
var iconSpread = 25;
var renderedImage = renderIconImage(
  {
    size: iconSize,
    radius: iconRadius,
    spread: iconSpread,
    greyed: !1,
    channel: 'stable',
  },
  iconCache,
);
var canvas = document.createElement('canvas');
canvas.width = canvas.height = iconSize;
document.body.appendChild(canvas);
var canvasCtx = canvas.getContext('2d');
canvasCtx.putImageData(renderedImage, 0, 0);
renderedImage = renderIconImage(
  {
    size: iconSize,
    radius: iconRadius,
    spread: iconSpread,
    greyed: !1,
    channel: 'beta',
  },
  iconCache,
);
canvas = document.createElement('canvas');
canvas.width = canvas.height = iconSize;
document.body.appendChild(canvas);
canvasCtx = canvas.getContext('2d');
canvasCtx.putImageData(renderedImage, 0, 0);
renderedImage = renderIconImage(
  {
    size: iconSize,
    radius: iconRadius,
    spread: iconSpread,
    greyed: !1,
    channel: 'dev',
  },
  iconCache,
);
canvas = document.createElement('canvas');
canvas.width = canvas.height = iconSize;
document.body.appendChild(canvas);
canvasCtx = canvas.getContext('2d');
canvasCtx.putImageData(renderedImage, 0, 0);
renderedImage = renderIconImage(
  {
    size: iconSize,
    radius: iconRadius,
    spread: iconSpread,
    greyed: !0,
    channel: 'stable',
  },
  iconCache,
);
canvas = document.createElement('canvas');
canvas.width = canvas.height = iconSize;
document.body.appendChild(canvas);
canvasCtx = canvas.getContext('2d');
canvasCtx.putImageData(renderedImage, 0, 0);
renderedImage = renderIconImage(
  {
    size: iconSize,
    radius: iconRadius,
    spread: iconSpread,
    greyed: !0,
    channel: 'beta',
  },
  iconCache,
);
canvas = document.createElement('canvas');
canvas.width = canvas.height = iconSize;
document.body.appendChild(canvas);
canvasCtx = canvas.getContext('2d');
canvasCtx.putImageData(renderedImage, 0, 0);
renderedImage = renderIconImage(
  {
    size: iconSize,
    radius: iconRadius,
    spread: iconSpread,
    greyed: !0,
    channel: 'dev',
  },
  iconCache,
);
canvas = document.createElement('canvas');
canvas.width = canvas.height = iconSize;
document.body.appendChild(canvas);
canvasCtx = canvas.getContext('2d');
canvasCtx.putImageData(renderedImage, 0, 0);
