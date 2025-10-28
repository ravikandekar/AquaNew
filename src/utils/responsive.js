import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Based on standard ~5" screen mobile device
const widthBaseScale = SCREEN_WIDTH / 375;
const heightBaseScale = SCREEN_HEIGHT / 667;

function normalize(size, based = 'width') {
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// Width percentage
export const wp = (widthPercent) => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

// Height percentage
export const hp = (heightPercent) => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

// Font scaling
export const fs = (size) => normalize(size, 'width');

// Spacing
export const sp = (size) => normalize(size, 'width');

export default {
  wp,
  hp,
  fs,
  sp,
};
