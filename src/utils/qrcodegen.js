/*
 * QR Code generator library (qrcodegen)
 * Copyright (c) Project Nayuki
 * MIT License - https://www.nayuki.io/page/qr-code-generator-library
 */

/* eslint-disable */
export const qrcodegen = (() => {
  "use strict";
  function QrCode(typeNumber, errorCorrectionLevel, dataCodewords, mask) {
    this.version = typeNumber;
    this.errorCorrectionLevel = errorCorrectionLevel;
    this.size = typeNumber * 4 + 17;
    this.mask = mask;
    this.modules = [];
    for (let i = 0; i < this.size; i++) {
      const row = [];
      for (let j = 0; j < this.size; j++) row.push(null);
      this.modules.push(row);
    }
    drawFunctionPatterns(this);
    const allCodewords = addEccAndInterleave(dataCodewords, typeNumber, errorCorrectionLevel);
    drawCodewords(this, allCodewords);
    if (mask === -1) {
      let minPenalty = Infinity;
      let bestMask = 0;
      for (let i = 0; i < 8; i++) {
        this.mask = i;
        applyMask(this);
        drawFormatBits(this, errorCorrectionLevel);
        const penalty = getPenaltyScore(this);
        if (penalty < minPenalty) {
          minPenalty = penalty;
          bestMask = i;
        }
        applyMask(this);
      }
      this.mask = bestMask;
    }
    applyMask(this);
    drawFormatBits(this, errorCorrectionLevel);
  }
  QrCode.prototype.getModule = function (x, y) {
    return this.modules[y][x];
  };
  QrCode.encodeText = function (text, ecl) {
    const seg = QrSegment.makeBytes(toUtf8ByteArray(text));
    return QrCode.encodeSegments([seg], ecl);
  };
  QrCode.encodeSegments = function (segments, ecl, minVersion = 1, maxVersion = 40, mask = -1, boostEcl = true) {
    let version;
    let dataUsedBits;
    for (version = minVersion; ; version++) {
      const dataCapacityBits = getNumDataCodewords(version, ecl) * 8;
      dataUsedBits = QrSegment.getTotalBits(segments, version);
      if (dataUsedBits <= dataCapacityBits) break;
      if (version >= maxVersion) throw new Error("Data too long");
    }
    if (boostEcl) {
      for (const newEcl of [QrCode.Ecc.MEDIUM, QrCode.Ecc.QUARTILE, QrCode.Ecc.HIGH]) {
        if (dataUsedBits <= getNumDataCodewords(version, newEcl) * 8) ecl = newEcl;
      }
    }
    let bb = [];
    for (const seg of segments) {
      appendBits(seg.mode.modeBits, 4, bb);
      appendBits(seg.numChars, seg.mode.numCharCountBits(version), bb);
      for (const b of seg.data) bb.push(b);
    }
    const dataCapacityBits = getNumDataCodewords(version, ecl) * 8;
    appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
    appendBits(0, (8 - (bb.length % 8)) % 8, bb);
    for (let padByte = 0xEC; bb.length < dataCapacityBits; padByte ^= 0xEC ^ 0x11) {
      appendBits(padByte, 8, bb);
    }
    const dataCodewords = [];
    for (let i = 0; i < bb.length; i += 8) {
      let byte = 0;
      for (let j = 0; j < 8; j++) byte = (byte << 1) | bb[i + j];
      dataCodewords.push(byte);
    }
    return new QrCode(version, ecl, dataCodewords, mask);
  };
  QrCode.prototype.toSvgString = function (border = 4) {
    if (border < 0) throw new RangeError("Border must be non-negative");
    let parts = [];
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.getModule(x, y)) {
          parts.push(`M${x + border},${y + border}h1v1h-1z`);
        }
      }
    }
    const size = this.size + border * 2;
    return `<?xml version="1.0" encoding="UTF-8"?>` +
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">` +
      `<rect width="100%" height="100%" fill="#FFFFFF"/>` +
      `<path d="${parts.join(" ")}" fill="#000000"/>` +
      `</svg>`;
  };
  QrCode.Ecc = { LOW: 1, MEDIUM: 0, QUARTILE: 3, HIGH: 2 };
  function QrSegment(mode, numChars, data) {
    this.mode = mode;
    this.numChars = numChars;
    this.data = data;
  }
  QrSegment.makeBytes = function (data) {
    const bb = [];
    for (const b of data) appendBits(b, 8, bb);
    return new QrSegment(QrSegment.Mode.BYTE, data.length, bb);
  };
  QrSegment.getTotalBits = function (segs, version) {
    let result = 0;
    for (const seg of segs) {
      const ccbits = seg.mode.numCharCountBits(version);
      if (seg.numChars >= (1 << ccbits)) return Infinity;
      result += 4 + ccbits + seg.data.length;
    }
    return result;
  };
  QrSegment.Mode = {
    BYTE: {
      modeBits: 0b0100,
      numCharCountBits(version) {
        if (1 <= version && version <= 9) return 8;
        else if (10 <= version && version <= 26) return 16;
        else return 16;
      }
    }
  };
  function appendBits(val, len, bb) {
    for (let i = len - 1; i >= 0; i--) bb.push((val >>> i) & 1);
  }
  function toUtf8ByteArray(str) {
    const encoder = new TextEncoder();
    return Array.from(encoder.encode(str));
  }
  function drawFunctionPatterns(qr) {
    const size = qr.size;
    const setFunctionModule = (x, y, isBlack) => {
      qr.modules[y][x] = isBlack;
    };
    for (let i = 0; i < size; i++) {
      setFunctionModule(6, i, i % 2 === 0);
      setFunctionModule(i, 6, i % 2 === 0);
    }
    drawFinderPattern(qr, 3, 3);
    drawFinderPattern(qr, size - 4, 3);
    drawFinderPattern(qr, 3, size - 4);
    const alignPatPos = getAlignmentPatternPositions(qr.version);
    for (let i = 0; i < alignPatPos.length; i++) {
      for (let j = 0; j < alignPatPos.length; j++) {
        if (!(i === 0 && j === 0) && !(i === 0 && j === alignPatPos.length - 1) && !(i === alignPatPos.length - 1 && j === 0)) {
          drawAlignmentPattern(qr, alignPatPos[i], alignPatPos[j]);
        }
      }
    }
    drawFormatBits(qr, qr.errorCorrectionLevel);
    drawVersion(qr);
  }
  function drawFinderPattern(qr, x, y) {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const dist = Math.max(Math.abs(dx), Math.abs(dy));
        const xx = x + dx, yy = y + dy;
        if (0 <= xx && xx < qr.size && 0 <= yy && yy < qr.size) {
          qr.modules[yy][xx] = dist !== 2 && dist !== 4;
        }
      }
    }
  }
  function drawAlignmentPattern(qr, x, y) {
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        qr.modules[y + dy][x + dx] = Math.max(Math.abs(dx), Math.abs(dy)) !== 1;
      }
    }
  }
  function drawFormatBits(qr, ecl) {
    const data = (ecl << 3) | qr.mask;
    let rem = data;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    let bits = ((data << 10) | rem) ^ 0x5412;
    for (let i = 0; i <= 5; i++) qr.modules[8][i] = ((bits >>> i) & 1) !== 0;
    qr.modules[8][7] = ((bits >>> 6) & 1) !== 0;
    qr.modules[8][8] = ((bits >>> 7) & 1) !== 0;
    qr.modules[7][8] = ((bits >>> 8) & 1) !== 0;
    for (let i = 9; i < 15; i++) qr.modules[14 - i][8] = ((bits >>> i) & 1) !== 0;
    for (let i = 0; i < 8; i++) qr.modules[qr.size - 1 - i][8] = ((bits >>> i) & 1) !== 0;
    for (let i = 8; i < 15; i++) qr.modules[8][qr.size - 15 + i] = ((bits >>> i) & 1) !== 0;
    qr.modules[8][qr.size - 8] = true;
  }
  function drawVersion(qr) {
    const version = qr.version;
    if (version < 7) return;
    let rem = version;
    for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
    let bits = (version << 12) | rem;
    for (let i = 0; i < 18; i++) {
      const bit = ((bits >>> i) & 1) !== 0;
      const a = qr.size - 11 + (i % 3);
      const b = Math.floor(i / 3);
      qr.modules[b][a] = bit;
      qr.modules[a][b] = bit;
    }
  }
  function addEccAndInterleave(data, version, ecl) {
    const numBlocks = NUM_ERROR_CORRECTION_BLOCKS[ecl][version];
    const blockEccLen = ECC_CODEWORDS_PER_BLOCK[ecl][version];
    const rawCodewords = getNumRawDataModules(version) / 8;
    const dataLen = getNumDataCodewords(version, ecl);
    const numShortBlocks = numBlocks - (rawCodewords - dataLen) / blockEccLen;
    const shortBlockLen = Math.floor(rawCodewords / numBlocks);
    const blocks = [];
    let k = 0;
    for (let i = 0; i < numBlocks; i++) {
      const dat = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
      k += dat.length;
      const ecc = reedSolomonCompute(divPolynomial(dat, blockEccLen), blockEccLen);
      blocks.push(dat.concat(ecc));
    }
    const result = [];
    for (let i = 0; i < blocks[0].length; i++) {
      for (let j = 0; j < blocks.length; j++) {
        if (i < blocks[j].length) result.push(blocks[j][i]);
      }
    }
    return result;
  }
  function drawCodewords(qr, data) {
    let i = 0;
    for (let right = qr.size - 1; right >= 1; right -= 2) {
      if (right === 6) right--;
      for (let vert = 0; vert < qr.size; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = right - j;
          const y = ((right + 1) & 2) === 0 ? qr.size - 1 - vert : vert;
          if (qr.modules[y][x] === null) {
            qr.modules[y][x] = ((data[i >>> 3] >>> (7 - (i & 7))) & 1) !== 0;
            i++;
          }
        }
      }
    }
  }
  function applyMask(qr) {
    for (let y = 0; y < qr.size; y++) {
      for (let x = 0; x < qr.size; x++) {
        if (qr.modules[y][x] !== null && !isFunctionModule(qr, x, y)) {
          const invert = getMaskBit(qr.mask, x, y);
          if (invert) qr.modules[y][x] = !qr.modules[y][x];
        }
      }
    }
  }
  function isFunctionModule(qr, x, y) {
    if (x === 6 || y === 6) return true;
    if (x < 9 && y < 9) return true;
    if (x >= qr.size - 8 && y < 9) return true;
    if (x < 9 && y >= qr.size - 8) return true;
    const alignPos = getAlignmentPatternPositions(qr.version);
    for (let i = 0; i < alignPos.length; i++) {
      for (let j = 0; j < alignPos.length; j++) {
        const ax = alignPos[i], ay = alignPos[j];
        if (Math.abs(x - ax) <= 2 && Math.abs(y - ay) <= 2) return true;
      }
    }
    if (qr.version >= 7) {
      if (x < 6 && y >= qr.size - 11) return true;
      if (y < 6 && x >= qr.size - 11) return true;
    }
    return false;
  }
  function getMaskBit(mask, x, y) {
    switch (mask) {
      case 0: return (x + y) % 2 === 0;
      case 1: return y % 2 === 0;
      case 2: return x % 3 === 0;
      case 3: return (x + y) % 3 === 0;
      case 4: return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0;
      case 5: return ((x * y) % 2) + ((x * y) % 3) === 0;
      case 6: return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
      case 7: return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
      default: throw new Error("Invalid mask");
    }
  }
  function getPenaltyScore(qr) {
    let result = 0;
    for (let y = 0; y < qr.size; y++) {
      let runColor = false;
      let runX = 0;
      for (let x = 0; x < qr.size; x++) {
        const color = qr.modules[y][x];
        if (color === runColor) {
          runX++;
          if (runX === 5) result += 3;
          else if (runX > 5) result++;
        } else {
          runColor = color;
          runX = 1;
        }
      }
    }
    for (let x = 0; x < qr.size; x++) {
      let runColor = false;
      let runY = 0;
      for (let y = 0; y < qr.size; y++) {
        const color = qr.modules[y][x];
        if (color === runColor) {
          runY++;
          if (runY === 5) result += 3;
          else if (runY > 5) result++;
        } else {
          runColor = color;
          runY = 1;
        }
      }
    }
    for (let y = 0; y < qr.size - 1; y++) {
      for (let x = 0; x < qr.size - 1; x++) {
        const color = qr.modules[y][x];
        if (color === qr.modules[y][x + 1] &&
            color === qr.modules[y + 1][x] &&
            color === qr.modules[y + 1][x + 1]) result += 3;
      }
    }
    for (let y = 0; y < qr.size; y++) {
      for (let x = 0; x < qr.size - 6; x++) {
        if (qr.modules[y][x] && !qr.modules[y][x + 1] && qr.modules[y][x + 2] &&
            qr.modules[y][x + 3] && qr.modules[y][x + 4] && !qr.modules[y][x + 5] &&
            qr.modules[y][x + 6]) {
          const left = x >= 4 && !qr.modules[y][x - 1] && !qr.modules[y][x - 2] && !qr.modules[y][x - 3] && !qr.modules[y][x - 4];
          const right = x + 7 < qr.size && !qr.modules[y][x + 7] && !qr.modules[y][x + 8] && !qr.modules[y][x + 9] && !qr.modules[y][x + 10];
          if (left || right) result += 40;
        }
      }
    }
    for (let x = 0; x < qr.size; x++) {
      for (let y = 0; y < qr.size - 6; y++) {
        if (qr.modules[y][x] && !qr.modules[y + 1][x] && qr.modules[y + 2][x] &&
            qr.modules[y + 3][x] && qr.modules[y + 4][x] && !qr.modules[y + 5][x] &&
            qr.modules[y + 6][x]) {
          const up = y >= 4 && !qr.modules[y - 1][x] && !qr.modules[y - 2][x] && !qr.modules[y - 3][x] && !qr.modules[y - 4][x];
          const down = y + 7 < qr.size && !qr.modules[y + 7][x] && !qr.modules[y + 8][x] && !qr.modules[y + 9][x] && !qr.modules[y + 10][x];
          if (up || down) result += 40;
        }
      }
    }
    let black = 0;
    for (let y = 0; y < qr.size; y++) {
      for (let x = 0; x < qr.size; x++) if (qr.modules[y][x]) black++;
    }
    const total = qr.size * qr.size;
    const k = Math.abs(black * 20 - total * 10) / total;
    result += Math.floor(k) * 10;
    return result;
  }
  function getAlignmentPatternPositions(version) {
    if (version === 1) return [];
    const numAlign = Math.floor(version / 7) + 2;
    const step = version === 32 ? 26 : Math.ceil((version * 4 + 10) / (numAlign * 2 - 2)) * 2;
    const result = [6];
    for (let pos = version * 4 + 10; result.length < numAlign; pos -= step) result.splice(1, 0, pos);
    return result;
  }
  function getNumRawDataModules(ver) {
    let result = (16 * ver + 128) * ver + 64;
    if (ver >= 2) {
      const numAlign = Math.floor(ver / 7) + 2;
      result -= (25 * numAlign - 10) * numAlign - 55;
      if (ver >= 7) result -= 36;
    }
    return result;
  }
  function getNumDataCodewords(ver, ecl) {
    return Math.floor(getNumRawDataModules(ver) / 8) - ECC_CODEWORDS_PER_BLOCK[ecl][ver] * NUM_ERROR_CORRECTION_BLOCKS[ecl][ver];
  }
  function reedSolomonCompute(data, degree) {
    const result = new Array(degree).fill(0);
    for (const b of data) {
      const factor = b ^ result[0];
      result.shift();
      result.push(0);
      for (let i = 0; i < result.length; i++) {
        result[i] ^= gfMultiply(GF_EXP[i], factor);
      }
    }
    return result;
  }
  function divPolynomial(data, degree) {
    return data.slice();
  }
  function gfMultiply(x, y) {
    if (x === 0 || y === 0) return 0;
    return GF_EXP[(GF_LOG[x] + GF_LOG[y]) % 255];
  }
  const GF_EXP = new Array(512);
  const GF_LOG = new Array(256);
  for (let i = 0, x = 1; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
  const ECC_CODEWORDS_PER_BLOCK = [
    [],
    [null, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [null, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    [null, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [null, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
  ];
  const NUM_ERROR_CORRECTION_BLOCKS = [
    [],
    [null, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    [null, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
    [null, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
    [null, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
  ];
  return { QrCode, QrSegment };
})();
