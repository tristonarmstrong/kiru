var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/@jridgewell+sourcemap-codec@1.5.5/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js
var require_sourcemap_codec_umd = __commonJS({
  "../../node_modules/.pnpm/@jridgewell+sourcemap-codec@1.5.5/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js"(exports, module) {
    (function(global, factory) {
      if (typeof exports === "object" && typeof module !== "undefined") {
        factory(module);
        module.exports = def(module);
      } else if (typeof define === "function" && define.amd) {
        define(["module"], function(mod) {
          factory.apply(this, arguments);
          mod.exports = def(mod);
        });
      } else {
        const mod = { exports: {} };
        factory(mod);
        global = typeof globalThis !== "undefined" ? globalThis : global || self;
        global.sourcemapCodec = def(mod);
      }
      function def(m) {
        return "default" in m.exports ? m.exports.default : m.exports;
      }
    })(exports, (function(module2) {
      "use strict";
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var sourcemap_codec_exports = {};
      __export(sourcemap_codec_exports, {
        decode: () => decode,
        decodeGeneratedRanges: () => decodeGeneratedRanges,
        decodeOriginalScopes: () => decodeOriginalScopes,
        encode: () => encode,
        encodeGeneratedRanges: () => encodeGeneratedRanges,
        encodeOriginalScopes: () => encodeOriginalScopes
      });
      module2.exports = __toCommonJS(sourcemap_codec_exports);
      var comma = ",".charCodeAt(0);
      var semicolon = ";".charCodeAt(0);
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var intToChar = new Uint8Array(64);
      var charToInt = new Uint8Array(128);
      for (let i = 0; i < chars.length; i++) {
        const c = chars.charCodeAt(i);
        intToChar[i] = c;
        charToInt[c] = i;
      }
      function decodeInteger(reader, relative2) {
        let value = 0;
        let shift = 0;
        let integer = 0;
        do {
          const c = reader.next();
          integer = charToInt[c];
          value |= (integer & 31) << shift;
          shift += 5;
        } while (integer & 32);
        const shouldNegate = value & 1;
        value >>>= 1;
        if (shouldNegate) {
          value = -2147483648 | -value;
        }
        return relative2 + value;
      }
      function encodeInteger(builder, num, relative2) {
        let delta = num - relative2;
        delta = delta < 0 ? -delta << 1 | 1 : delta << 1;
        do {
          let clamped = delta & 31;
          delta >>>= 5;
          if (delta > 0) clamped |= 32;
          builder.write(intToChar[clamped]);
        } while (delta > 0);
        return num;
      }
      function hasMoreVlq(reader, max) {
        if (reader.pos >= max) return false;
        return reader.peek() !== comma;
      }
      var bufLength = 1024 * 16;
      var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
        decode(buf) {
          const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
          return out.toString();
        }
      } : {
        decode(buf) {
          let out = "";
          for (let i = 0; i < buf.length; i++) {
            out += String.fromCharCode(buf[i]);
          }
          return out;
        }
      };
      var StringWriter = class {
        constructor() {
          this.pos = 0;
          this.out = "";
          this.buffer = new Uint8Array(bufLength);
        }
        write(v) {
          const { buffer } = this;
          buffer[this.pos++] = v;
          if (this.pos === bufLength) {
            this.out += td.decode(buffer);
            this.pos = 0;
          }
        }
        flush() {
          const { buffer, out, pos } = this;
          return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
        }
      };
      var StringReader = class {
        constructor(buffer) {
          this.pos = 0;
          this.buffer = buffer;
        }
        next() {
          return this.buffer.charCodeAt(this.pos++);
        }
        peek() {
          return this.buffer.charCodeAt(this.pos);
        }
        indexOf(char) {
          const { buffer, pos } = this;
          const idx = buffer.indexOf(char, pos);
          return idx === -1 ? buffer.length : idx;
        }
      };
      var EMPTY = [];
      function decodeOriginalScopes(input) {
        const { length } = input;
        const reader = new StringReader(input);
        const scopes = [];
        const stack = [];
        let line = 0;
        for (; reader.pos < length; reader.pos++) {
          line = decodeInteger(reader, line);
          const column = decodeInteger(reader, 0);
          if (!hasMoreVlq(reader, length)) {
            const last = stack.pop();
            last[2] = line;
            last[3] = column;
            continue;
          }
          const kind = decodeInteger(reader, 0);
          const fields = decodeInteger(reader, 0);
          const hasName = fields & 1;
          const scope = hasName ? [line, column, 0, 0, kind, decodeInteger(reader, 0)] : [line, column, 0, 0, kind];
          let vars = EMPTY;
          if (hasMoreVlq(reader, length)) {
            vars = [];
            do {
              const varsIndex = decodeInteger(reader, 0);
              vars.push(varsIndex);
            } while (hasMoreVlq(reader, length));
          }
          scope.vars = vars;
          scopes.push(scope);
          stack.push(scope);
        }
        return scopes;
      }
      function encodeOriginalScopes(scopes) {
        const writer = new StringWriter();
        for (let i = 0; i < scopes.length; ) {
          i = _encodeOriginalScopes(scopes, i, writer, [0]);
        }
        return writer.flush();
      }
      function _encodeOriginalScopes(scopes, index, writer, state) {
        const scope = scopes[index];
        const { 0: startLine, 1: startColumn, 2: endLine, 3: endColumn, 4: kind, vars } = scope;
        if (index > 0) writer.write(comma);
        state[0] = encodeInteger(writer, startLine, state[0]);
        encodeInteger(writer, startColumn, 0);
        encodeInteger(writer, kind, 0);
        const fields = scope.length === 6 ? 1 : 0;
        encodeInteger(writer, fields, 0);
        if (scope.length === 6) encodeInteger(writer, scope[5], 0);
        for (const v of vars) {
          encodeInteger(writer, v, 0);
        }
        for (index++; index < scopes.length; ) {
          const next = scopes[index];
          const { 0: l, 1: c } = next;
          if (l > endLine || l === endLine && c >= endColumn) {
            break;
          }
          index = _encodeOriginalScopes(scopes, index, writer, state);
        }
        writer.write(comma);
        state[0] = encodeInteger(writer, endLine, state[0]);
        encodeInteger(writer, endColumn, 0);
        return index;
      }
      function decodeGeneratedRanges(input) {
        const { length } = input;
        const reader = new StringReader(input);
        const ranges = [];
        const stack = [];
        let genLine = 0;
        let definitionSourcesIndex = 0;
        let definitionScopeIndex = 0;
        let callsiteSourcesIndex = 0;
        let callsiteLine = 0;
        let callsiteColumn = 0;
        let bindingLine = 0;
        let bindingColumn = 0;
        do {
          const semi = reader.indexOf(";");
          let genColumn = 0;
          for (; reader.pos < semi; reader.pos++) {
            genColumn = decodeInteger(reader, genColumn);
            if (!hasMoreVlq(reader, semi)) {
              const last = stack.pop();
              last[2] = genLine;
              last[3] = genColumn;
              continue;
            }
            const fields = decodeInteger(reader, 0);
            const hasDefinition = fields & 1;
            const hasCallsite = fields & 2;
            const hasScope = fields & 4;
            let callsite = null;
            let bindings = EMPTY;
            let range;
            if (hasDefinition) {
              const defSourcesIndex = decodeInteger(reader, definitionSourcesIndex);
              definitionScopeIndex = decodeInteger(
                reader,
                definitionSourcesIndex === defSourcesIndex ? definitionScopeIndex : 0
              );
              definitionSourcesIndex = defSourcesIndex;
              range = [genLine, genColumn, 0, 0, defSourcesIndex, definitionScopeIndex];
            } else {
              range = [genLine, genColumn, 0, 0];
            }
            range.isScope = !!hasScope;
            if (hasCallsite) {
              const prevCsi = callsiteSourcesIndex;
              const prevLine = callsiteLine;
              callsiteSourcesIndex = decodeInteger(reader, callsiteSourcesIndex);
              const sameSource = prevCsi === callsiteSourcesIndex;
              callsiteLine = decodeInteger(reader, sameSource ? callsiteLine : 0);
              callsiteColumn = decodeInteger(
                reader,
                sameSource && prevLine === callsiteLine ? callsiteColumn : 0
              );
              callsite = [callsiteSourcesIndex, callsiteLine, callsiteColumn];
            }
            range.callsite = callsite;
            if (hasMoreVlq(reader, semi)) {
              bindings = [];
              do {
                bindingLine = genLine;
                bindingColumn = genColumn;
                const expressionsCount = decodeInteger(reader, 0);
                let expressionRanges;
                if (expressionsCount < -1) {
                  expressionRanges = [[decodeInteger(reader, 0)]];
                  for (let i = -1; i > expressionsCount; i--) {
                    const prevBl = bindingLine;
                    bindingLine = decodeInteger(reader, bindingLine);
                    bindingColumn = decodeInteger(reader, bindingLine === prevBl ? bindingColumn : 0);
                    const expression = decodeInteger(reader, 0);
                    expressionRanges.push([expression, bindingLine, bindingColumn]);
                  }
                } else {
                  expressionRanges = [[expressionsCount]];
                }
                bindings.push(expressionRanges);
              } while (hasMoreVlq(reader, semi));
            }
            range.bindings = bindings;
            ranges.push(range);
            stack.push(range);
          }
          genLine++;
          reader.pos = semi + 1;
        } while (reader.pos < length);
        return ranges;
      }
      function encodeGeneratedRanges(ranges) {
        if (ranges.length === 0) return "";
        const writer = new StringWriter();
        for (let i = 0; i < ranges.length; ) {
          i = _encodeGeneratedRanges(ranges, i, writer, [0, 0, 0, 0, 0, 0, 0]);
        }
        return writer.flush();
      }
      function _encodeGeneratedRanges(ranges, index, writer, state) {
        const range = ranges[index];
        const {
          0: startLine,
          1: startColumn,
          2: endLine,
          3: endColumn,
          isScope,
          callsite,
          bindings
        } = range;
        if (state[0] < startLine) {
          catchupLine(writer, state[0], startLine);
          state[0] = startLine;
          state[1] = 0;
        } else if (index > 0) {
          writer.write(comma);
        }
        state[1] = encodeInteger(writer, range[1], state[1]);
        const fields = (range.length === 6 ? 1 : 0) | (callsite ? 2 : 0) | (isScope ? 4 : 0);
        encodeInteger(writer, fields, 0);
        if (range.length === 6) {
          const { 4: sourcesIndex, 5: scopesIndex } = range;
          if (sourcesIndex !== state[2]) {
            state[3] = 0;
          }
          state[2] = encodeInteger(writer, sourcesIndex, state[2]);
          state[3] = encodeInteger(writer, scopesIndex, state[3]);
        }
        if (callsite) {
          const { 0: sourcesIndex, 1: callLine, 2: callColumn } = range.callsite;
          if (sourcesIndex !== state[4]) {
            state[5] = 0;
            state[6] = 0;
          } else if (callLine !== state[5]) {
            state[6] = 0;
          }
          state[4] = encodeInteger(writer, sourcesIndex, state[4]);
          state[5] = encodeInteger(writer, callLine, state[5]);
          state[6] = encodeInteger(writer, callColumn, state[6]);
        }
        if (bindings) {
          for (const binding of bindings) {
            if (binding.length > 1) encodeInteger(writer, -binding.length, 0);
            const expression = binding[0][0];
            encodeInteger(writer, expression, 0);
            let bindingStartLine = startLine;
            let bindingStartColumn = startColumn;
            for (let i = 1; i < binding.length; i++) {
              const expRange = binding[i];
              bindingStartLine = encodeInteger(writer, expRange[1], bindingStartLine);
              bindingStartColumn = encodeInteger(writer, expRange[2], bindingStartColumn);
              encodeInteger(writer, expRange[0], 0);
            }
          }
        }
        for (index++; index < ranges.length; ) {
          const next = ranges[index];
          const { 0: l, 1: c } = next;
          if (l > endLine || l === endLine && c >= endColumn) {
            break;
          }
          index = _encodeGeneratedRanges(ranges, index, writer, state);
        }
        if (state[0] < endLine) {
          catchupLine(writer, state[0], endLine);
          state[0] = endLine;
          state[1] = 0;
        } else {
          writer.write(comma);
        }
        state[1] = encodeInteger(writer, endColumn, state[1]);
        return index;
      }
      function catchupLine(writer, lastLine, line) {
        do {
          writer.write(semicolon);
        } while (++lastLine < line);
      }
      function decode(mappings) {
        const { length } = mappings;
        const reader = new StringReader(mappings);
        const decoded = [];
        let genColumn = 0;
        let sourcesIndex = 0;
        let sourceLine = 0;
        let sourceColumn = 0;
        let namesIndex = 0;
        do {
          const semi = reader.indexOf(";");
          const line = [];
          let sorted = true;
          let lastCol = 0;
          genColumn = 0;
          while (reader.pos < semi) {
            let seg;
            genColumn = decodeInteger(reader, genColumn);
            if (genColumn < lastCol) sorted = false;
            lastCol = genColumn;
            if (hasMoreVlq(reader, semi)) {
              sourcesIndex = decodeInteger(reader, sourcesIndex);
              sourceLine = decodeInteger(reader, sourceLine);
              sourceColumn = decodeInteger(reader, sourceColumn);
              if (hasMoreVlq(reader, semi)) {
                namesIndex = decodeInteger(reader, namesIndex);
                seg = [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex];
              } else {
                seg = [genColumn, sourcesIndex, sourceLine, sourceColumn];
              }
            } else {
              seg = [genColumn];
            }
            line.push(seg);
            reader.pos++;
          }
          if (!sorted) sort(line);
          decoded.push(line);
          reader.pos = semi + 1;
        } while (reader.pos <= length);
        return decoded;
      }
      function sort(line) {
        line.sort(sortComparator);
      }
      function sortComparator(a, b) {
        return a[0] - b[0];
      }
      function encode(decoded) {
        const writer = new StringWriter();
        let sourcesIndex = 0;
        let sourceLine = 0;
        let sourceColumn = 0;
        let namesIndex = 0;
        for (let i = 0; i < decoded.length; i++) {
          const line = decoded[i];
          if (i > 0) writer.write(semicolon);
          if (line.length === 0) continue;
          let genColumn = 0;
          for (let j = 0; j < line.length; j++) {
            const segment = line[j];
            if (j > 0) writer.write(comma);
            genColumn = encodeInteger(writer, segment[0], genColumn);
            if (segment.length === 1) continue;
            sourcesIndex = encodeInteger(writer, segment[1], sourcesIndex);
            sourceLine = encodeInteger(writer, segment[2], sourceLine);
            sourceColumn = encodeInteger(writer, segment[3], sourceColumn);
            if (segment.length === 4) continue;
            namesIndex = encodeInteger(writer, segment[4], namesIndex);
          }
        }
        return writer.flush();
      }
    }));
  }
});

// ../../node_modules/.pnpm/magic-string@0.30.21/node_modules/magic-string/dist/magic-string.cjs.js
var require_magic_string_cjs = __commonJS({
  "../../node_modules/.pnpm/magic-string@0.30.21/node_modules/magic-string/dist/magic-string.cjs.js"(exports, module) {
    "use strict";
    var sourcemapCodec = require_sourcemap_codec_umd();
    var BitSet = class _BitSet {
      constructor(arg) {
        this.bits = arg instanceof _BitSet ? arg.bits.slice() : [];
      }
      add(n2) {
        this.bits[n2 >> 5] |= 1 << (n2 & 31);
      }
      has(n2) {
        return !!(this.bits[n2 >> 5] & 1 << (n2 & 31));
      }
    };
    var Chunk = class _Chunk {
      constructor(start, end, content) {
        this.start = start;
        this.end = end;
        this.original = content;
        this.intro = "";
        this.outro = "";
        this.content = content;
        this.storeName = false;
        this.edited = false;
        {
          this.previous = null;
          this.next = null;
        }
      }
      appendLeft(content) {
        this.outro += content;
      }
      appendRight(content) {
        this.intro = this.intro + content;
      }
      clone() {
        const chunk = new _Chunk(this.start, this.end, this.original);
        chunk.intro = this.intro;
        chunk.outro = this.outro;
        chunk.content = this.content;
        chunk.storeName = this.storeName;
        chunk.edited = this.edited;
        return chunk;
      }
      contains(index) {
        return this.start < index && index < this.end;
      }
      eachNext(fn) {
        let chunk = this;
        while (chunk) {
          fn(chunk);
          chunk = chunk.next;
        }
      }
      eachPrevious(fn) {
        let chunk = this;
        while (chunk) {
          fn(chunk);
          chunk = chunk.previous;
        }
      }
      edit(content, storeName, contentOnly) {
        this.content = content;
        if (!contentOnly) {
          this.intro = "";
          this.outro = "";
        }
        this.storeName = storeName;
        this.edited = true;
        return this;
      }
      prependLeft(content) {
        this.outro = content + this.outro;
      }
      prependRight(content) {
        this.intro = content + this.intro;
      }
      reset() {
        this.intro = "";
        this.outro = "";
        if (this.edited) {
          this.content = this.original;
          this.storeName = false;
          this.edited = false;
        }
      }
      split(index) {
        const sliceIndex = index - this.start;
        const originalBefore = this.original.slice(0, sliceIndex);
        const originalAfter = this.original.slice(sliceIndex);
        this.original = originalBefore;
        const newChunk = new _Chunk(index, this.end, originalAfter);
        newChunk.outro = this.outro;
        this.outro = "";
        this.end = index;
        if (this.edited) {
          newChunk.edit("", false);
          this.content = "";
        } else {
          this.content = originalBefore;
        }
        newChunk.next = this.next;
        if (newChunk.next) newChunk.next.previous = newChunk;
        newChunk.previous = this;
        this.next = newChunk;
        return newChunk;
      }
      toString() {
        return this.intro + this.content + this.outro;
      }
      trimEnd(rx) {
        this.outro = this.outro.replace(rx, "");
        if (this.outro.length) return true;
        const trimmed = this.content.replace(rx, "");
        if (trimmed.length) {
          if (trimmed !== this.content) {
            this.split(this.start + trimmed.length).edit("", void 0, true);
            if (this.edited) {
              this.edit(trimmed, this.storeName, true);
            }
          }
          return true;
        } else {
          this.edit("", void 0, true);
          this.intro = this.intro.replace(rx, "");
          if (this.intro.length) return true;
        }
      }
      trimStart(rx) {
        this.intro = this.intro.replace(rx, "");
        if (this.intro.length) return true;
        const trimmed = this.content.replace(rx, "");
        if (trimmed.length) {
          if (trimmed !== this.content) {
            const newChunk = this.split(this.end - trimmed.length);
            if (this.edited) {
              newChunk.edit(trimmed, this.storeName, true);
            }
            this.edit("", void 0, true);
          }
          return true;
        } else {
          this.edit("", void 0, true);
          this.outro = this.outro.replace(rx, "");
          if (this.outro.length) return true;
        }
      }
    };
    function getBtoa() {
      if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
        return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
      } else if (typeof Buffer === "function") {
        return (str) => Buffer.from(str, "utf-8").toString("base64");
      } else {
        return () => {
          throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
        };
      }
    }
    var btoa = /* @__PURE__ */ getBtoa();
    var SourceMap = class {
      constructor(properties) {
        this.version = 3;
        this.file = properties.file;
        this.sources = properties.sources;
        this.sourcesContent = properties.sourcesContent;
        this.names = properties.names;
        this.mappings = sourcemapCodec.encode(properties.mappings);
        if (typeof properties.x_google_ignoreList !== "undefined") {
          this.x_google_ignoreList = properties.x_google_ignoreList;
        }
        if (typeof properties.debugId !== "undefined") {
          this.debugId = properties.debugId;
        }
      }
      toString() {
        return JSON.stringify(this);
      }
      toUrl() {
        return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
      }
    };
    function guessIndent(code) {
      const lines = code.split("\n");
      const tabbed = lines.filter((line) => /^\t+/.test(line));
      const spaced = lines.filter((line) => /^ {2,}/.test(line));
      if (tabbed.length === 0 && spaced.length === 0) {
        return null;
      }
      if (tabbed.length >= spaced.length) {
        return "	";
      }
      const min = spaced.reduce((previous, current) => {
        const numSpaces = /^ +/.exec(current)[0].length;
        return Math.min(numSpaces, previous);
      }, Infinity);
      return new Array(min + 1).join(" ");
    }
    function getRelativePath(from, to) {
      const fromParts = from.split(/[/\\]/);
      const toParts = to.split(/[/\\]/);
      fromParts.pop();
      while (fromParts[0] === toParts[0]) {
        fromParts.shift();
        toParts.shift();
      }
      if (fromParts.length) {
        let i = fromParts.length;
        while (i--) fromParts[i] = "..";
      }
      return fromParts.concat(toParts).join("/");
    }
    var toString = Object.prototype.toString;
    function isObject(thing) {
      return toString.call(thing) === "[object Object]";
    }
    function getLocator(source) {
      const originalLines = source.split("\n");
      const lineOffsets = [];
      for (let i = 0, pos = 0; i < originalLines.length; i++) {
        lineOffsets.push(pos);
        pos += originalLines[i].length + 1;
      }
      return function locate(index) {
        let i = 0;
        let j = lineOffsets.length;
        while (i < j) {
          const m = i + j >> 1;
          if (index < lineOffsets[m]) {
            j = m;
          } else {
            i = m + 1;
          }
        }
        const line = i - 1;
        const column = index - lineOffsets[line];
        return { line, column };
      };
    }
    var wordRegex = /\w/;
    var Mappings = class {
      constructor(hires) {
        this.hires = hires;
        this.generatedCodeLine = 0;
        this.generatedCodeColumn = 0;
        this.raw = [];
        this.rawSegments = this.raw[this.generatedCodeLine] = [];
        this.pending = null;
      }
      addEdit(sourceIndex, content, loc, nameIndex) {
        if (content.length) {
          const contentLengthMinusOne = content.length - 1;
          let contentLineEnd = content.indexOf("\n", 0);
          let previousContentLineEnd = -1;
          while (contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd) {
            const segment2 = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
            if (nameIndex >= 0) {
              segment2.push(nameIndex);
            }
            this.rawSegments.push(segment2);
            this.generatedCodeLine += 1;
            this.raw[this.generatedCodeLine] = this.rawSegments = [];
            this.generatedCodeColumn = 0;
            previousContentLineEnd = contentLineEnd;
            contentLineEnd = content.indexOf("\n", contentLineEnd + 1);
          }
          const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
          if (nameIndex >= 0) {
            segment.push(nameIndex);
          }
          this.rawSegments.push(segment);
          this.advance(content.slice(previousContentLineEnd + 1));
        } else if (this.pending) {
          this.rawSegments.push(this.pending);
          this.advance(content);
        }
        this.pending = null;
      }
      addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
        let originalCharIndex = chunk.start;
        let first = true;
        let charInHiresBoundary = false;
        while (originalCharIndex < chunk.end) {
          if (original[originalCharIndex] === "\n") {
            loc.line += 1;
            loc.column = 0;
            this.generatedCodeLine += 1;
            this.raw[this.generatedCodeLine] = this.rawSegments = [];
            this.generatedCodeColumn = 0;
            first = true;
            charInHiresBoundary = false;
          } else {
            if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
              const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
              if (this.hires === "boundary") {
                if (wordRegex.test(original[originalCharIndex])) {
                  if (!charInHiresBoundary) {
                    this.rawSegments.push(segment);
                    charInHiresBoundary = true;
                  }
                } else {
                  this.rawSegments.push(segment);
                  charInHiresBoundary = false;
                }
              } else {
                this.rawSegments.push(segment);
              }
            }
            loc.column += 1;
            this.generatedCodeColumn += 1;
            first = false;
          }
          originalCharIndex += 1;
        }
        this.pending = null;
      }
      advance(str) {
        if (!str) return;
        const lines = str.split("\n");
        if (lines.length > 1) {
          for (let i = 0; i < lines.length - 1; i++) {
            this.generatedCodeLine++;
            this.raw[this.generatedCodeLine] = this.rawSegments = [];
          }
          this.generatedCodeColumn = 0;
        }
        this.generatedCodeColumn += lines[lines.length - 1].length;
      }
    };
    var n = "\n";
    var warned = {
      insertLeft: false,
      insertRight: false,
      storeName: false
    };
    var MagicString4 = class _MagicString {
      constructor(string, options = {}) {
        const chunk = new Chunk(0, string.length, string);
        Object.defineProperties(this, {
          original: { writable: true, value: string },
          outro: { writable: true, value: "" },
          intro: { writable: true, value: "" },
          firstChunk: { writable: true, value: chunk },
          lastChunk: { writable: true, value: chunk },
          lastSearchedChunk: { writable: true, value: chunk },
          byStart: { writable: true, value: {} },
          byEnd: { writable: true, value: {} },
          filename: { writable: true, value: options.filename },
          indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
          sourcemapLocations: { writable: true, value: new BitSet() },
          storedNames: { writable: true, value: {} },
          indentStr: { writable: true, value: void 0 },
          ignoreList: { writable: true, value: options.ignoreList },
          offset: { writable: true, value: options.offset || 0 }
        });
        this.byStart[0] = chunk;
        this.byEnd[string.length] = chunk;
      }
      addSourcemapLocation(char) {
        this.sourcemapLocations.add(char);
      }
      append(content) {
        if (typeof content !== "string") throw new TypeError("outro content must be a string");
        this.outro += content;
        return this;
      }
      appendLeft(index, content) {
        index = index + this.offset;
        if (typeof content !== "string") throw new TypeError("inserted content must be a string");
        this._split(index);
        const chunk = this.byEnd[index];
        if (chunk) {
          chunk.appendLeft(content);
        } else {
          this.intro += content;
        }
        return this;
      }
      appendRight(index, content) {
        index = index + this.offset;
        if (typeof content !== "string") throw new TypeError("inserted content must be a string");
        this._split(index);
        const chunk = this.byStart[index];
        if (chunk) {
          chunk.appendRight(content);
        } else {
          this.outro += content;
        }
        return this;
      }
      clone() {
        const cloned = new _MagicString(this.original, { filename: this.filename, offset: this.offset });
        let originalChunk = this.firstChunk;
        let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
        while (originalChunk) {
          cloned.byStart[clonedChunk.start] = clonedChunk;
          cloned.byEnd[clonedChunk.end] = clonedChunk;
          const nextOriginalChunk = originalChunk.next;
          const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
          if (nextClonedChunk) {
            clonedChunk.next = nextClonedChunk;
            nextClonedChunk.previous = clonedChunk;
            clonedChunk = nextClonedChunk;
          }
          originalChunk = nextOriginalChunk;
        }
        cloned.lastChunk = clonedChunk;
        if (this.indentExclusionRanges) {
          cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
        }
        cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
        cloned.intro = this.intro;
        cloned.outro = this.outro;
        return cloned;
      }
      generateDecodedMap(options) {
        options = options || {};
        const sourceIndex = 0;
        const names = Object.keys(this.storedNames);
        const mappings = new Mappings(options.hires);
        const locate = getLocator(this.original);
        if (this.intro) {
          mappings.advance(this.intro);
        }
        this.firstChunk.eachNext((chunk) => {
          const loc = locate(chunk.start);
          if (chunk.intro.length) mappings.advance(chunk.intro);
          if (chunk.edited) {
            mappings.addEdit(
              sourceIndex,
              chunk.content,
              loc,
              chunk.storeName ? names.indexOf(chunk.original) : -1
            );
          } else {
            mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
          }
          if (chunk.outro.length) mappings.advance(chunk.outro);
        });
        if (this.outro) {
          mappings.advance(this.outro);
        }
        return {
          file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
          sources: [
            options.source ? getRelativePath(options.file || "", options.source) : options.file || ""
          ],
          sourcesContent: options.includeContent ? [this.original] : void 0,
          names,
          mappings: mappings.raw,
          x_google_ignoreList: this.ignoreList ? [sourceIndex] : void 0
        };
      }
      generateMap(options) {
        return new SourceMap(this.generateDecodedMap(options));
      }
      _ensureindentStr() {
        if (this.indentStr === void 0) {
          this.indentStr = guessIndent(this.original);
        }
      }
      _getRawIndentString() {
        this._ensureindentStr();
        return this.indentStr;
      }
      getIndentString() {
        this._ensureindentStr();
        return this.indentStr === null ? "	" : this.indentStr;
      }
      indent(indentStr, options) {
        const pattern = /^[^\r\n]/gm;
        if (isObject(indentStr)) {
          options = indentStr;
          indentStr = void 0;
        }
        if (indentStr === void 0) {
          this._ensureindentStr();
          indentStr = this.indentStr || "	";
        }
        if (indentStr === "") return this;
        options = options || {};
        const isExcluded = {};
        if (options.exclude) {
          const exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
          exclusions.forEach((exclusion) => {
            for (let i = exclusion[0]; i < exclusion[1]; i += 1) {
              isExcluded[i] = true;
            }
          });
        }
        let shouldIndentNextCharacter = options.indentStart !== false;
        const replacer = (match) => {
          if (shouldIndentNextCharacter) return `${indentStr}${match}`;
          shouldIndentNextCharacter = true;
          return match;
        };
        this.intro = this.intro.replace(pattern, replacer);
        let charIndex = 0;
        let chunk = this.firstChunk;
        while (chunk) {
          const end = chunk.end;
          if (chunk.edited) {
            if (!isExcluded[charIndex]) {
              chunk.content = chunk.content.replace(pattern, replacer);
              if (chunk.content.length) {
                shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
              }
            }
          } else {
            charIndex = chunk.start;
            while (charIndex < end) {
              if (!isExcluded[charIndex]) {
                const char = this.original[charIndex];
                if (char === "\n") {
                  shouldIndentNextCharacter = true;
                } else if (char !== "\r" && shouldIndentNextCharacter) {
                  shouldIndentNextCharacter = false;
                  if (charIndex === chunk.start) {
                    chunk.prependRight(indentStr);
                  } else {
                    this._splitChunk(chunk, charIndex);
                    chunk = chunk.next;
                    chunk.prependRight(indentStr);
                  }
                }
              }
              charIndex += 1;
            }
          }
          charIndex = chunk.end;
          chunk = chunk.next;
        }
        this.outro = this.outro.replace(pattern, replacer);
        return this;
      }
      insert() {
        throw new Error(
          "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
        );
      }
      insertLeft(index, content) {
        if (!warned.insertLeft) {
          console.warn(
            "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
          );
          warned.insertLeft = true;
        }
        return this.appendLeft(index, content);
      }
      insertRight(index, content) {
        if (!warned.insertRight) {
          console.warn(
            "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
          );
          warned.insertRight = true;
        }
        return this.prependRight(index, content);
      }
      move(start, end, index) {
        start = start + this.offset;
        end = end + this.offset;
        index = index + this.offset;
        if (index >= start && index <= end) throw new Error("Cannot move a selection inside itself");
        this._split(start);
        this._split(end);
        this._split(index);
        const first = this.byStart[start];
        const last = this.byEnd[end];
        const oldLeft = first.previous;
        const oldRight = last.next;
        const newRight = this.byStart[index];
        if (!newRight && last === this.lastChunk) return this;
        const newLeft = newRight ? newRight.previous : this.lastChunk;
        if (oldLeft) oldLeft.next = oldRight;
        if (oldRight) oldRight.previous = oldLeft;
        if (newLeft) newLeft.next = first;
        if (newRight) newRight.previous = last;
        if (!first.previous) this.firstChunk = last.next;
        if (!last.next) {
          this.lastChunk = first.previous;
          this.lastChunk.next = null;
        }
        first.previous = newLeft;
        last.next = newRight || null;
        if (!newLeft) this.firstChunk = first;
        if (!newRight) this.lastChunk = last;
        return this;
      }
      overwrite(start, end, content, options) {
        options = options || {};
        return this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
      }
      update(start, end, content, options) {
        start = start + this.offset;
        end = end + this.offset;
        if (typeof content !== "string") throw new TypeError("replacement content must be a string");
        if (this.original.length !== 0) {
          while (start < 0) start += this.original.length;
          while (end < 0) end += this.original.length;
        }
        if (end > this.original.length) throw new Error("end is out of bounds");
        if (start === end)
          throw new Error(
            "Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead"
          );
        this._split(start);
        this._split(end);
        if (options === true) {
          if (!warned.storeName) {
            console.warn(
              "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
            );
            warned.storeName = true;
          }
          options = { storeName: true };
        }
        const storeName = options !== void 0 ? options.storeName : false;
        const overwrite = options !== void 0 ? options.overwrite : false;
        if (storeName) {
          const original = this.original.slice(start, end);
          Object.defineProperty(this.storedNames, original, {
            writable: true,
            value: true,
            enumerable: true
          });
        }
        const first = this.byStart[start];
        const last = this.byEnd[end];
        if (first) {
          let chunk = first;
          while (chunk !== last) {
            if (chunk.next !== this.byStart[chunk.end]) {
              throw new Error("Cannot overwrite across a split point");
            }
            chunk = chunk.next;
            chunk.edit("", false);
          }
          first.edit(content, storeName, !overwrite);
        } else {
          const newChunk = new Chunk(start, end, "").edit(content, storeName);
          last.next = newChunk;
          newChunk.previous = last;
        }
        return this;
      }
      prepend(content) {
        if (typeof content !== "string") throw new TypeError("outro content must be a string");
        this.intro = content + this.intro;
        return this;
      }
      prependLeft(index, content) {
        index = index + this.offset;
        if (typeof content !== "string") throw new TypeError("inserted content must be a string");
        this._split(index);
        const chunk = this.byEnd[index];
        if (chunk) {
          chunk.prependLeft(content);
        } else {
          this.intro = content + this.intro;
        }
        return this;
      }
      prependRight(index, content) {
        index = index + this.offset;
        if (typeof content !== "string") throw new TypeError("inserted content must be a string");
        this._split(index);
        const chunk = this.byStart[index];
        if (chunk) {
          chunk.prependRight(content);
        } else {
          this.outro = content + this.outro;
        }
        return this;
      }
      remove(start, end) {
        start = start + this.offset;
        end = end + this.offset;
        if (this.original.length !== 0) {
          while (start < 0) start += this.original.length;
          while (end < 0) end += this.original.length;
        }
        if (start === end) return this;
        if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
        if (start > end) throw new Error("end must be greater than start");
        this._split(start);
        this._split(end);
        let chunk = this.byStart[start];
        while (chunk) {
          chunk.intro = "";
          chunk.outro = "";
          chunk.edit("");
          chunk = end > chunk.end ? this.byStart[chunk.end] : null;
        }
        return this;
      }
      reset(start, end) {
        start = start + this.offset;
        end = end + this.offset;
        if (this.original.length !== 0) {
          while (start < 0) start += this.original.length;
          while (end < 0) end += this.original.length;
        }
        if (start === end) return this;
        if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
        if (start > end) throw new Error("end must be greater than start");
        this._split(start);
        this._split(end);
        let chunk = this.byStart[start];
        while (chunk) {
          chunk.reset();
          chunk = end > chunk.end ? this.byStart[chunk.end] : null;
        }
        return this;
      }
      lastChar() {
        if (this.outro.length) return this.outro[this.outro.length - 1];
        let chunk = this.lastChunk;
        do {
          if (chunk.outro.length) return chunk.outro[chunk.outro.length - 1];
          if (chunk.content.length) return chunk.content[chunk.content.length - 1];
          if (chunk.intro.length) return chunk.intro[chunk.intro.length - 1];
        } while (chunk = chunk.previous);
        if (this.intro.length) return this.intro[this.intro.length - 1];
        return "";
      }
      lastLine() {
        let lineIndex = this.outro.lastIndexOf(n);
        if (lineIndex !== -1) return this.outro.substr(lineIndex + 1);
        let lineStr = this.outro;
        let chunk = this.lastChunk;
        do {
          if (chunk.outro.length > 0) {
            lineIndex = chunk.outro.lastIndexOf(n);
            if (lineIndex !== -1) return chunk.outro.substr(lineIndex + 1) + lineStr;
            lineStr = chunk.outro + lineStr;
          }
          if (chunk.content.length > 0) {
            lineIndex = chunk.content.lastIndexOf(n);
            if (lineIndex !== -1) return chunk.content.substr(lineIndex + 1) + lineStr;
            lineStr = chunk.content + lineStr;
          }
          if (chunk.intro.length > 0) {
            lineIndex = chunk.intro.lastIndexOf(n);
            if (lineIndex !== -1) return chunk.intro.substr(lineIndex + 1) + lineStr;
            lineStr = chunk.intro + lineStr;
          }
        } while (chunk = chunk.previous);
        lineIndex = this.intro.lastIndexOf(n);
        if (lineIndex !== -1) return this.intro.substr(lineIndex + 1) + lineStr;
        return this.intro + lineStr;
      }
      slice(start = 0, end = this.original.length - this.offset) {
        start = start + this.offset;
        end = end + this.offset;
        if (this.original.length !== 0) {
          while (start < 0) start += this.original.length;
          while (end < 0) end += this.original.length;
        }
        let result = "";
        let chunk = this.firstChunk;
        while (chunk && (chunk.start > start || chunk.end <= start)) {
          if (chunk.start < end && chunk.end >= end) {
            return result;
          }
          chunk = chunk.next;
        }
        if (chunk && chunk.edited && chunk.start !== start)
          throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
        const startChunk = chunk;
        while (chunk) {
          if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
            result += chunk.intro;
          }
          const containsEnd = chunk.start < end && chunk.end >= end;
          if (containsEnd && chunk.edited && chunk.end !== end)
            throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
          const sliceStart = startChunk === chunk ? start - chunk.start : 0;
          const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
          result += chunk.content.slice(sliceStart, sliceEnd);
          if (chunk.outro && (!containsEnd || chunk.end === end)) {
            result += chunk.outro;
          }
          if (containsEnd) {
            break;
          }
          chunk = chunk.next;
        }
        return result;
      }
      // TODO deprecate this? not really very useful
      snip(start, end) {
        const clone = this.clone();
        clone.remove(0, start);
        clone.remove(end, clone.original.length);
        return clone;
      }
      _split(index) {
        if (this.byStart[index] || this.byEnd[index]) return;
        let chunk = this.lastSearchedChunk;
        let previousChunk = chunk;
        const searchForward = index > chunk.end;
        while (chunk) {
          if (chunk.contains(index)) return this._splitChunk(chunk, index);
          chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
          if (chunk === previousChunk) return;
          previousChunk = chunk;
        }
      }
      _splitChunk(chunk, index) {
        if (chunk.edited && chunk.content.length) {
          const loc = getLocator(this.original)(index);
          throw new Error(
            `Cannot split a chunk that has already been edited (${loc.line}:${loc.column} \u2013 "${chunk.original}")`
          );
        }
        const newChunk = chunk.split(index);
        this.byEnd[index] = chunk;
        this.byStart[index] = newChunk;
        this.byEnd[newChunk.end] = newChunk;
        if (chunk === this.lastChunk) this.lastChunk = newChunk;
        this.lastSearchedChunk = chunk;
        return true;
      }
      toString() {
        let str = this.intro;
        let chunk = this.firstChunk;
        while (chunk) {
          str += chunk.toString();
          chunk = chunk.next;
        }
        return str + this.outro;
      }
      isEmpty() {
        let chunk = this.firstChunk;
        do {
          if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim())
            return false;
        } while (chunk = chunk.next);
        return true;
      }
      length() {
        let chunk = this.firstChunk;
        let length = 0;
        do {
          length += chunk.intro.length + chunk.content.length + chunk.outro.length;
        } while (chunk = chunk.next);
        return length;
      }
      trimLines() {
        return this.trim("[\\r\\n]");
      }
      trim(charType) {
        return this.trimStart(charType).trimEnd(charType);
      }
      trimEndAborted(charType) {
        const rx = new RegExp((charType || "\\s") + "+$");
        this.outro = this.outro.replace(rx, "");
        if (this.outro.length) return true;
        let chunk = this.lastChunk;
        do {
          const end = chunk.end;
          const aborted = chunk.trimEnd(rx);
          if (chunk.end !== end) {
            if (this.lastChunk === chunk) {
              this.lastChunk = chunk.next;
            }
            this.byEnd[chunk.end] = chunk;
            this.byStart[chunk.next.start] = chunk.next;
            this.byEnd[chunk.next.end] = chunk.next;
          }
          if (aborted) return true;
          chunk = chunk.previous;
        } while (chunk);
        return false;
      }
      trimEnd(charType) {
        this.trimEndAborted(charType);
        return this;
      }
      trimStartAborted(charType) {
        const rx = new RegExp("^" + (charType || "\\s") + "+");
        this.intro = this.intro.replace(rx, "");
        if (this.intro.length) return true;
        let chunk = this.firstChunk;
        do {
          const end = chunk.end;
          const aborted = chunk.trimStart(rx);
          if (chunk.end !== end) {
            if (chunk === this.lastChunk) this.lastChunk = chunk.next;
            this.byEnd[chunk.end] = chunk;
            this.byStart[chunk.next.start] = chunk.next;
            this.byEnd[chunk.next.end] = chunk.next;
          }
          if (aborted) return true;
          chunk = chunk.next;
        } while (chunk);
        return false;
      }
      trimStart(charType) {
        this.trimStartAborted(charType);
        return this;
      }
      hasChanged() {
        return this.original !== this.toString();
      }
      _replaceRegexp(searchValue, replacement) {
        function getReplacement(match, str) {
          if (typeof replacement === "string") {
            return replacement.replace(/\$(\$|&|\d+)/g, (_, i) => {
              if (i === "$") return "$";
              if (i === "&") return match[0];
              const num = +i;
              if (num < match.length) return match[+i];
              return `$${i}`;
            });
          } else {
            return replacement(...match, match.index, str, match.groups);
          }
        }
        function matchAll(re, str) {
          let match;
          const matches = [];
          while (match = re.exec(str)) {
            matches.push(match);
          }
          return matches;
        }
        if (searchValue.global) {
          const matches = matchAll(searchValue, this.original);
          matches.forEach((match) => {
            if (match.index != null) {
              const replacement2 = getReplacement(match, this.original);
              if (replacement2 !== match[0]) {
                this.overwrite(match.index, match.index + match[0].length, replacement2);
              }
            }
          });
        } else {
          const match = this.original.match(searchValue);
          if (match && match.index != null) {
            const replacement2 = getReplacement(match, this.original);
            if (replacement2 !== match[0]) {
              this.overwrite(match.index, match.index + match[0].length, replacement2);
            }
          }
        }
        return this;
      }
      _replaceString(string, replacement) {
        const { original } = this;
        const index = original.indexOf(string);
        if (index !== -1) {
          if (typeof replacement === "function") {
            replacement = replacement(string, index, original);
          }
          if (string !== replacement) {
            this.overwrite(index, index + string.length, replacement);
          }
        }
        return this;
      }
      replace(searchValue, replacement) {
        if (typeof searchValue === "string") {
          return this._replaceString(searchValue, replacement);
        }
        return this._replaceRegexp(searchValue, replacement);
      }
      _replaceAllString(string, replacement) {
        const { original } = this;
        const stringLength = string.length;
        for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
          const previous = original.slice(index, index + stringLength);
          let _replacement = replacement;
          if (typeof replacement === "function") {
            _replacement = replacement(previous, index, original);
          }
          if (previous !== _replacement) this.overwrite(index, index + stringLength, _replacement);
        }
        return this;
      }
      replaceAll(searchValue, replacement) {
        if (typeof searchValue === "string") {
          return this._replaceAllString(searchValue, replacement);
        }
        if (!searchValue.global) {
          throw new TypeError(
            "MagicString.prototype.replaceAll called with a non-global RegExp argument"
          );
        }
        return this._replaceRegexp(searchValue, replacement);
      }
    };
    var hasOwnProp = Object.prototype.hasOwnProperty;
    var Bundle = class _Bundle {
      constructor(options = {}) {
        this.intro = options.intro || "";
        this.separator = options.separator !== void 0 ? options.separator : "\n";
        this.sources = [];
        this.uniqueSources = [];
        this.uniqueSourceIndexByFilename = {};
      }
      addSource(source) {
        if (source instanceof MagicString4) {
          return this.addSource({
            content: source,
            filename: source.filename,
            separator: this.separator
          });
        }
        if (!isObject(source) || !source.content) {
          throw new Error(
            "bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`"
          );
        }
        ["filename", "ignoreList", "indentExclusionRanges", "separator"].forEach((option) => {
          if (!hasOwnProp.call(source, option)) source[option] = source.content[option];
        });
        if (source.separator === void 0) {
          source.separator = this.separator;
        }
        if (source.filename) {
          if (!hasOwnProp.call(this.uniqueSourceIndexByFilename, source.filename)) {
            this.uniqueSourceIndexByFilename[source.filename] = this.uniqueSources.length;
            this.uniqueSources.push({ filename: source.filename, content: source.content.original });
          } else {
            const uniqueSource = this.uniqueSources[this.uniqueSourceIndexByFilename[source.filename]];
            if (source.content.original !== uniqueSource.content) {
              throw new Error(`Illegal source: same filename (${source.filename}), different contents`);
            }
          }
        }
        this.sources.push(source);
        return this;
      }
      append(str, options) {
        this.addSource({
          content: new MagicString4(str),
          separator: options && options.separator || ""
        });
        return this;
      }
      clone() {
        const bundle = new _Bundle({
          intro: this.intro,
          separator: this.separator
        });
        this.sources.forEach((source) => {
          bundle.addSource({
            filename: source.filename,
            content: source.content.clone(),
            separator: source.separator
          });
        });
        return bundle;
      }
      generateDecodedMap(options = {}) {
        const names = [];
        let x_google_ignoreList = void 0;
        this.sources.forEach((source) => {
          Object.keys(source.content.storedNames).forEach((name) => {
            if (!~names.indexOf(name)) names.push(name);
          });
        });
        const mappings = new Mappings(options.hires);
        if (this.intro) {
          mappings.advance(this.intro);
        }
        this.sources.forEach((source, i) => {
          if (i > 0) {
            mappings.advance(this.separator);
          }
          const sourceIndex = source.filename ? this.uniqueSourceIndexByFilename[source.filename] : -1;
          const magicString = source.content;
          const locate = getLocator(magicString.original);
          if (magicString.intro) {
            mappings.advance(magicString.intro);
          }
          magicString.firstChunk.eachNext((chunk) => {
            const loc = locate(chunk.start);
            if (chunk.intro.length) mappings.advance(chunk.intro);
            if (source.filename) {
              if (chunk.edited) {
                mappings.addEdit(
                  sourceIndex,
                  chunk.content,
                  loc,
                  chunk.storeName ? names.indexOf(chunk.original) : -1
                );
              } else {
                mappings.addUneditedChunk(
                  sourceIndex,
                  chunk,
                  magicString.original,
                  loc,
                  magicString.sourcemapLocations
                );
              }
            } else {
              mappings.advance(chunk.content);
            }
            if (chunk.outro.length) mappings.advance(chunk.outro);
          });
          if (magicString.outro) {
            mappings.advance(magicString.outro);
          }
          if (source.ignoreList && sourceIndex !== -1) {
            if (x_google_ignoreList === void 0) {
              x_google_ignoreList = [];
            }
            x_google_ignoreList.push(sourceIndex);
          }
        });
        return {
          file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
          sources: this.uniqueSources.map((source) => {
            return options.file ? getRelativePath(options.file, source.filename) : source.filename;
          }),
          sourcesContent: this.uniqueSources.map((source) => {
            return options.includeContent ? source.content : null;
          }),
          names,
          mappings: mappings.raw,
          x_google_ignoreList
        };
      }
      generateMap(options) {
        return new SourceMap(this.generateDecodedMap(options));
      }
      getIndentString() {
        const indentStringCounts = {};
        this.sources.forEach((source) => {
          const indentStr = source.content._getRawIndentString();
          if (indentStr === null) return;
          if (!indentStringCounts[indentStr]) indentStringCounts[indentStr] = 0;
          indentStringCounts[indentStr] += 1;
        });
        return Object.keys(indentStringCounts).sort((a, b) => {
          return indentStringCounts[a] - indentStringCounts[b];
        })[0] || "	";
      }
      indent(indentStr) {
        if (!arguments.length) {
          indentStr = this.getIndentString();
        }
        if (indentStr === "") return this;
        let trailingNewline = !this.intro || this.intro.slice(-1) === "\n";
        this.sources.forEach((source, i) => {
          const separator = source.separator !== void 0 ? source.separator : this.separator;
          const indentStart = trailingNewline || i > 0 && /\r?\n$/.test(separator);
          source.content.indent(indentStr, {
            exclude: source.indentExclusionRanges,
            indentStart
            //: trailingNewline || /\r?\n$/.test( separator )  //true///\r?\n/.test( separator )
          });
          trailingNewline = source.content.lastChar() === "\n";
        });
        if (this.intro) {
          this.intro = indentStr + this.intro.replace(/^[^\n]/gm, (match, index) => {
            return index > 0 ? indentStr + match : match;
          });
        }
        return this;
      }
      prepend(str) {
        this.intro = str + this.intro;
        return this;
      }
      toString() {
        const body = this.sources.map((source, i) => {
          const separator = source.separator !== void 0 ? source.separator : this.separator;
          const str = (i > 0 ? separator : "") + source.content.toString();
          return str;
        }).join("");
        return this.intro + body;
      }
      isEmpty() {
        if (this.intro.length && this.intro.trim()) return false;
        if (this.sources.some((source) => !source.content.isEmpty())) return false;
        return true;
      }
      length() {
        return this.sources.reduce(
          (length, source) => length + source.content.length(),
          this.intro.length
        );
      }
      trimLines() {
        return this.trim("[\\r\\n]");
      }
      trim(charType) {
        return this.trimStart(charType).trimEnd(charType);
      }
      trimStart(charType) {
        const rx = new RegExp("^" + (charType || "\\s") + "+");
        this.intro = this.intro.replace(rx, "");
        if (!this.intro) {
          let source;
          let i = 0;
          do {
            source = this.sources[i++];
            if (!source) {
              break;
            }
          } while (!source.content.trimStartAborted(charType));
        }
        return this;
      }
      trimEnd(charType) {
        const rx = new RegExp((charType || "\\s") + "+$");
        let source;
        let i = this.sources.length - 1;
        do {
          source = this.sources[i--];
          if (!source) {
            this.intro = this.intro.replace(rx, "");
            break;
          }
        } while (!source.content.trimEndAborted(charType));
        return this;
      }
    };
    MagicString4.Bundle = Bundle;
    MagicString4.SourceMap = SourceMap;
    MagicString4.default = MagicString4;
    module.exports = MagicString4;
  }
});

// ../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/lib/constants.js"(exports, module) {
    "use strict";
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var SEP = "/";
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
      SEP
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
      SEP: "\\"
    };
    var POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        __proto__: null,
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// ../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.isWindows = () => {
      if (typeof navigator !== "undefined" && navigator.platform) {
        const platform = navigator.platform.toLowerCase();
        return platform === "win32" || platform === "windows";
      }
      if (typeof process !== "undefined" && process.platform) {
        return process.platform === "win32";
      }
      return false;
    };
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
    exports.basename = (path8, { windows } = {}) => {
      const segs = path8.split(windows ? /[\\/]/ : "/");
      const last = segs[segs.length - 1];
      if (last === "") {
        return segs[segs.length - 2];
      }
      return last;
    };
  }
});

// ../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/lib/scan.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob) glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module.exports = scan;
  }
});

// ../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/lib/parse.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const PLATFORM_CHARS = constants.globChars(opts.windows);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output) append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.output = (prev.output || prev.value) + tok.value;
          prev.value += tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix2 = POSIX_REGEX_SOURCE[rest2];
                if (posix2) {
                  prev.value = pre + posix2;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".") prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(opts.windows);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            const source2 = create(match[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module.exports = parse;
  }
});

// ../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/lib/picomatch.js"(exports, module) {
    "use strict";
    var scan = require_scan();
    var parse = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch2 = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch2(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix2 = opts.windows;
      const regex = isState ? picomatch2.compileRe(glob, options) : picomatch2.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch2(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch2.test(input, regex, options, { glob, posix: posix2 });
        const result = { glob, state, regex, posix: posix2, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch2.test = (input, regex, options, { glob, posix: posix2 } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix2 ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch2.matchBase(input, regex, options, posix2);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch2.matchBase = (input, glob, options) => {
      const regex = glob instanceof RegExp ? glob : picomatch2.makeRe(glob, options);
      return regex.test(utils.basename(input));
    };
    picomatch2.isMatch = (str, patterns, options) => picomatch2(patterns, options)(str);
    picomatch2.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch2.parse(p, options));
      return parse(pattern, { ...options, fastpaths: false });
    };
    picomatch2.scan = (input, options) => scan(input, options);
    picomatch2.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch2.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse(input, options);
      }
      return picomatch2.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch2.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true) throw err;
        return /$^/;
      }
    };
    picomatch2.constants = constants;
    module.exports = picomatch2;
  }
});

// ../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "../../node_modules/.pnpm/picomatch@4.0.3/node_modules/picomatch/index.js"(exports, module) {
    "use strict";
    var pico = require_picomatch();
    var utils = require_utils();
    function picomatch2(glob, options, returnState = false) {
      if (options && (options.windows === null || options.windows === void 0)) {
        options = { ...options, windows: utils.isWindows() };
      }
      return pico(glob, options, returnState);
    }
    Object.assign(picomatch2, pico);
    module.exports = picomatch2;
  }
});

// src/index.ts
import path7 from "node:path";

// src/codegen/shared.ts
var import_magic_string = __toESM(require_magic_string_cjs(), 1);

// src/codegen/ast.ts
function findNode(node, predicate, maxDepth = Infinity) {
  let res = null;
  walk(node, {
    "*": (node2, ctx) => {
      if (predicate(node2)) {
        res = node2;
        ctx.exit();
      }
      if (ctx.stack.length >= maxDepth) ctx.exitBranch();
    }
  });
  return res;
}
function walk(node, visitor) {
  const ctx = {
    stack: [],
    exit: exitWalk,
    exitBranch
  };
  try {
    walk_impl(node, visitor, ctx);
  } catch (error) {
    if (error === "walk:exit") return;
    throw error;
  }
}
var exitWalk = () => {
  throw "walk:exit";
};
var exitBranch = () => {
  throw "walk:exit-branch";
};
var flushCallbacks = (callbacks) => {
  while (callbacks.length) {
    callbacks.pop()();
  }
};
function walk_impl(node, visitor, ctx) {
  const onExitCallbacks = [];
  try {
    {
      const cb = visitor[node.type]?.(node, ctx);
      if (cb instanceof Function) onExitCallbacks.push(cb);
    }
    {
      const cb = visitor["*"]?.(node, ctx);
      if (cb instanceof Function) onExitCallbacks.push(cb);
    }
  } catch (error) {
    if (error === "walk:exit-branch") {
      flushCallbacks(onExitCallbacks);
      return;
    }
    throw error;
  }
  ctx.stack.push(node);
  [
    node.arguments,
    node.declarations,
    node.properties,
    node.property,
    node.cases,
    node.body,
    node.consequent,
    node.init,
    node.argument,
    node.alternate,
    node.callee,
    node.declaration,
    node.expression,
    node.expressions,
    node.left,
    node.right
  ].filter(Boolean).forEach((a) => {
    if (Array.isArray(a)) {
      for (let i = 0; i < a.length; i++) {
        walk_impl(a[i], visitor, ctx);
      }
      return;
    }
    if (typeof a === "object" && "type" in a) {
      walk_impl(a, visitor, ctx);
      return;
    }
  });
  if (node.type === "Property" && node.value && typeof node.value === "object") {
    walk_impl(node.value, visitor, ctx);
  }
  ctx.stack.pop();
  flushCallbacks(onExitCallbacks);
}

// src/codegen/shared.ts
function createAliasHandler(name, namespace = "kiru") {
  const aliases = /* @__PURE__ */ new Set();
  const isMatchingCallExpression = (node) => node.type === "CallExpression" && node.callee?.type === "Identifier" && typeof node.callee.name === "string" && aliases.has(node.callee.name);
  const addAliases = (node) => {
    if (node.source?.value !== namespace) return false;
    let didAdd = false;
    const specifiers = node.specifiers || [];
    for (let i = 0; i < specifiers.length; i++) {
      const specifier = specifiers[i];
      if (specifier.imported && specifier.imported.name === name && !!specifier.local) {
        aliases.add(specifier.local.name);
        didAdd = true;
      }
    }
    return didAdd;
  };
  return { name, aliases, addAliases, isMatchingCallExpression };
}
function isComponent(node, bodyNodes) {
  const isTlf = isTopLevelFunction(node, bodyNodes);
  if (!isTlf) return false;
  const name = findNodeName(node);
  if (name === null) return false;
  const charCode = name.charCodeAt(0);
  return charCode >= 65 && charCode <= 90;
}
function findNodeName(node) {
  if (node.id?.name) return node.id.name;
  if (node.declaration?.id?.name) return node.declaration.id.name;
  if (node.declaration?.declarations?.[0]?.id?.name)
    return node.declaration.declarations[0].id.name;
  if (node.declarations?.[0]?.id?.name) return node.declarations[0].id.name;
  return null;
}
function findFunctionBodyNodes(node, name, bodyNodes) {
  let dec = node.declaration;
  if (!dec) {
    for (const _node of bodyNodes) {
      if (_node.type === "VariableDeclaration") {
        if (_node.declarations?.[0]?.id?.name === name) {
          dec = _node;
          break;
        }
      } else if (_node.type === "FunctionDeclaration") {
        if (_node.id?.name === name) {
          dec = _node;
          break;
        }
      }
    }
  }
  if (!dec) {
    throw new Error(
      "[vite-plugin-kiru]: failed to find declaration for component"
    );
  }
  if (dec.type === "FunctionDeclaration" && dec.body && !Array.isArray(dec.body) && dec.body.type === "BlockStatement") {
    return dec.body.body;
  } else if (dec.type === "VariableDeclaration") {
    if (!Array.isArray(dec.declarations)) {
      return null;
    }
    for (const _dec of dec.declarations) {
      if (_dec.id?.name !== name) continue;
      if (_dec.init?.type === "ArrowFunctionExpression" || _dec.init?.type === "FunctionExpression") {
        return _dec.init.body.body;
      } else if (_dec.init?.type === "CallExpression" && _dec.init.arguments) {
        const nodes = [];
        for (const arg of _dec.init.arguments) {
          if (isFuncDecOrExpr(arg) && arg.body && !Array.isArray(arg.body) && Array.isArray(arg.body.body)) {
            nodes.push(...arg.body.body);
          }
        }
        return nodes;
      }
    }
  }
  return null;
}
function isFuncDecOrExpr(node) {
  if (!node) return false;
  if (node.type === "VariableDeclaration") {
    return isFuncDecOrExpr(node.declarations?.[0]?.init);
  }
  return [
    "FunctionDeclaration",
    "FunctionExpression",
    "ArrowFunctionExpression"
  ].includes(node.type);
}
function isTopLevelFunction(node, bodyNodes) {
  if (isFuncDecOrExpr(node)) {
    return true;
  }
  switch (node.type) {
    case "VariableDeclaration":
    case "ExportNamedDeclaration":
      if (node.declaration) {
        return isFuncDecOrExpr(node.declaration);
      } else if (node.declarations) {
        return !!findNode(node, isFuncDecOrExpr);
      }
      const name = findNodeName(node);
      if (name === null) return false;
      const dec = findFunctionBodyNodes(node, name, bodyNodes);
      if (!dec) return false;
      return isFuncDecOrExpr(dec[0]);
    case "ExportDefaultDeclaration":
      return isFuncDecOrExpr(node.declaration);
  }
  return false;
}

// src/codegen/hmr.ts
import fs from "node:fs";
var UNNAMED_EFFECT_PREAMBLE = `

if (import.meta.hot && "window" in globalThis) {
  window.__kiru.HMRContext?.moduleEffects.registerNext();
}
`;
function prepareHMR(ctx) {
  const { code, ast, fileLinkFormatter, filePath } = ctx;
  try {
    const hotVars = findHotVars(code, ast.body, filePath);
    if (hotVars.size === 0 && !code.hasChanged()) return;
    code.prepend(`
if (import.meta.hot && "window" in globalThis) {
  window.__kiru.HMRContext?.prepare("${filePath}");
}
`);
    code.append(`
if (import.meta.hot && "window" in globalThis) {
  import.meta.hot.accept();
  ${createHMRRegistrationBlurb(hotVars, fileLinkFormatter, filePath)}
}
`);
  } catch (error) {
    console.error(
      "[vite-plugin-kiru]: HMR preparation failed for",
      filePath,
      error
    );
  }
}
function createHMRRegistrationBlurb(hotVars, fileLinkFormatter, filePath) {
  const src = fs.readFileSync(filePath, "utf-8");
  const entries = Array.from(hotVars).map(({ name, type }) => {
    const key = JSON.stringify(name);
    const line = findHotVarLineInSrc(src, name);
    return `    ${key}: {
      type: "${type}",
      value: ${name},
      link: "${fileLinkFormatter(filePath, line)}"
    }`;
  });
  return `
  window.__kiru.HMRContext?.register({
${entries.join(",\n")}
  });`;
}
function findHotVarLineInSrc(src, name) {
  const lines = src.split("\n");
  const potentialMatches = [
    `const ${name}`,
    `let ${name}`,
    `var ${name}`,
    `function ${name}`,
    `export const ${name}`,
    `export let ${name}`,
    `export var ${name}`,
    `export default ${name}`,
    `export function ${name}`,
    `export default function ${name}`
  ];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < potentialMatches.length; j++) {
      if (line.startsWith(potentialMatches[j])) return i + 1;
    }
  }
  return 0;
}
var exprAssign = [
  "ExpressionStatement",
  "AssignmentExpression"
];
var allowedHotVarParentStacks = [
  ["VariableDeclaration", "VariableDeclarator"],
  exprAssign,
  ["ExportNamedDeclaration", "VariableDeclaration", "VariableDeclarator"]
];
function findHotVars(code, bodyNodes, _id) {
  const hotVars = /* @__PURE__ */ new Set();
  const aliasHandlers = [
    "createStore",
    "signal",
    "computed",
    "effect",
    "createContext",
    "lazy"
  ].map((name) => createAliasHandler(name));
  aliasHandlers.push(createAliasHandler("definePageConfig", "kiru/router"));
  for (const node of bodyNodes) {
    if (node.type === "ImportDeclaration") {
      for (const aliasHandler of aliasHandlers) {
        aliasHandler.addAliases(node);
      }
      continue;
    }
    if (isComponent(node, bodyNodes)) {
      addHotVarDesc(node, hotVars, "component");
      continue;
    }
    for (const aliasHandler of aliasHandlers) {
      walk(node, {
        CallExpression: (node2, ctx) => {
          if (!aliasHandler.isMatchingCallExpression(node2)) {
            return ctx.exitBranch();
          }
          if (aliasHandler.name === "effect" && ctx.stack.length === 1 && ctx.stack[0].type === "ExpressionStatement") {
            code.appendRight(node2.start, UNNAMED_EFFECT_PREAMBLE);
            return ctx.exit();
          }
          const matchingParentStack = allowedHotVarParentStacks.find(
            (stack) => {
              return stack.every((type, i) => ctx.stack[i]?.type === type);
            }
          );
          if (!matchingParentStack) {
            return ctx.exitBranch();
          }
          if (matchingParentStack === exprAssign) {
            const [_expr, assign] = ctx.stack;
            const name2 = assign.left?.name;
            if (!name2) return ctx.exit();
            hotVars.add({
              type: aliasHandler.name,
              name: name2
            });
            return ctx.exit();
          }
          const remainingStack = ctx.stack.slice(matchingParentStack.length);
          if (remainingStack.some(
            (n) => n.type !== "ObjectExpression" && n.type !== "Property"
          )) {
            return ctx.exitBranch();
          }
          const name = ctx.stack.reduce((acc, item) => {
            switch (item.type) {
              case "VariableDeclarator":
                return item.id.name;
              case "Property":
                if (!item.key) return acc;
                if (item.key.name) return `${acc}.${item.key.name}`;
                if (item.key.raw) return `${acc}[${item.key.raw}]`;
                return acc;
            }
            return acc;
          }, "");
          hotVars.add({ type: aliasHandler.name, name });
          ctx.exitBranch();
        }
      });
    }
  }
  return hotVars;
}
function addHotVarDesc(node, names, type) {
  const name = findNodeName(node);
  if (name == null && type === "component") {
    console.error("[vite-plugin-kiru]: failed to find component name", node);
    throw new Error("[vite-plugin-kiru]: Component name not found");
  }
  if (name !== null) {
    names.add({ type, name });
  }
}

// src/codegen/devOnlyHooks.ts
function prepareDevOnlyHooks(ctx) {
  const { code, ast, isBuild } = ctx;
  replaceOnHMRCallbacks(code, ast, isBuild);
}
var VITE_IMPORT_META_HOT_ACCEPT = `if ("window" in globalThis) {
  if (import.meta.hot) {
    import.meta.hot.accept(%);
  }           
}`;
function replaceOnHMRCallbacks(code, ast, isBuild) {
  const onHMRAliasHandler = createAliasHandler("onHMR", "vite-plugin-kiru");
  for (const node of ast.body) {
    if (node.type === "ImportDeclaration") {
      if (onHMRAliasHandler.addAliases(node) && isBuild) {
        code.update(node.start, node.end, "");
      }
      continue;
    }
    walk(node, {
      CallExpression: (node2, ctx) => {
        if (onHMRAliasHandler.isMatchingCallExpression(node2)) {
          try {
            if (isBuild) {
              code.update(node2.start, node2.end, "");
              return;
            }
            const callback2 = node2.arguments[0];
            const callbackRaw = code.original.substring(
              callback2.start,
              callback2.end
            );
            code.update(
              node2.start,
              node2.end,
              VITE_IMPORT_META_HOT_ACCEPT.replace("%", callbackRaw)
            );
          } finally {
            ctx.exitBranch();
          }
        }
      }
    });
  }
}

// src/codegen/hoistJSX.ts
var staticHoistableIds = /* @__PURE__ */ new Set();
function prepareJSXHoisting(ctx) {
  const { code, ast } = ctx;
  const createElement = createAliasHandler("createElement");
  const fragment = createAliasHandler("Fragment");
  const memo = createAliasHandler("memo");
  const bodyNodes = ast.body;
  for (const node of bodyNodes) {
    if (node.type === "ImportDeclaration") {
      ;
      [createElement, fragment, memo].forEach((handler) => {
        handler.addAliases(node);
      });
    }
  }
  let counter = 0;
  const hoistableSet = /* @__PURE__ */ new Set();
  staticHoistableIds.clear();
  for (const node of bodyNodes) {
    if (node.type !== "VariableDeclaration") continue;
    const kind = node.kind;
    if (kind !== "const") continue;
    const declarations2 = node.declarations || [];
    for (const decl of declarations2) {
      if (decl.type !== "VariableDeclarator") continue;
      const id = decl.id;
      if (!id || id.type !== "Identifier" || !id.name) continue;
      const init = decl.init;
      if (!init) continue;
      let isStatic = false;
      if (isStaticLiteral(init)) {
        isStatic = true;
      } else if (init.type === "CallExpression" && isHoistableSubtree(init, createElement.aliases, fragment.aliases)) {
        isStatic = true;
      }
      if (isStatic) {
        staticHoistableIds.add(id.name);
      }
    }
  }
  for (const node of bodyNodes) {
    let pushCandidate2 = function(node2) {
      candidateNodes.push(node2);
    };
    var pushCandidate = pushCandidate2;
    const candidateNodes = [];
    let fnDepth = 0;
    const FunctionDepthTracker = () => {
      fnDepth++;
      return () => fnDepth--;
    };
    walk(node, {
      FunctionDeclaration: FunctionDepthTracker,
      FunctionExpression: FunctionDepthTracker,
      ArrowFunctionExpression: FunctionDepthTracker,
      CallExpression: (callNode) => {
        if (fnDepth === 0) return;
        const callee = callNode.callee;
        if (createElement.isMatchingCallExpression(callNode)) {
          pushCandidate2(callNode);
          const childrenArgs = callNode.arguments?.slice(2) || [];
          for (const child of childrenArgs) {
            if (child.type === "BinaryExpression" || child.type === "UnaryExpression" || child.type === "ConditionalExpression" || child.type === "LogicalExpression") {
              pushCandidate2(child);
              collectNestedOperations(child, candidateNodes);
            }
            if (child.type === "ArrayExpression" && isStaticLiteral(child)) {
              pushCandidate2(child);
            }
            if (child.type === "ObjectExpression" && isStaticLiteral(child)) {
              pushCandidate2(child);
            }
          }
          return;
        }
        if (callee?.type === "MemberExpression") {
          const obj = callee.object;
          if (obj?.type === "ArrayExpression" || obj?.type === "ObjectExpression" || obj?.type === "CallExpression" || obj?.type === "MemberExpression") {
            pushCandidate2(callNode);
          }
        }
      },
      MemberExpression: (memberNode) => {
        if (fnDepth === 0) return;
        const obj = memberNode.object;
        if (obj?.type === "ArrayExpression" || obj?.type === "ObjectExpression") {
          pushCandidate2(memberNode);
        }
      }
    });
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = candidateNodes.length - 1; i >= 0; i--) {
        const node2 = candidateNodes[i];
        if (hoistableSet.has(node2)) continue;
        if (node2.type === "CallExpression") {
          const callee = node2.callee;
          if (callee?.type === "MemberExpression") {
            if (isHoistableStaticOperation(
              node2,
              createElement.aliases,
              fragment.aliases,
              hoistableSet
            )) {
              hoistableSet.add(node2);
              changed = true;
            }
          } else {
            if (isHoistableSubtree(
              node2,
              createElement.aliases,
              fragment.aliases,
              hoistableSet
            )) {
              hoistableSet.add(node2);
              changed = true;
            }
          }
        } else if (node2.type === "MemberExpression") {
          if (isHoistableStaticOperation(
            node2,
            createElement.aliases,
            fragment.aliases,
            hoistableSet
          )) {
            hoistableSet.add(node2);
            changed = true;
          }
        } else if (node2.type === "ArrayExpression") {
          if (isStaticLiteral(node2)) {
            hoistableSet.add(node2);
            changed = true;
          }
        } else if (node2.type === "ObjectExpression") {
          if (isStaticLiteral(node2)) {
            hoistableSet.add(node2);
            changed = true;
          }
        } else {
          if (isHoistableStaticExpression(
            node2,
            createElement.aliases,
            fragment.aliases,
            hoistableSet
          )) {
            hoistableSet.add(node2);
            changed = true;
          }
        }
      }
    }
  }
  const allHoistables = [];
  for (const node of bodyNodes) {
    walk(node, {
      CallExpression: (callNode, walkCtx) => {
        if (!hoistableSet.has(callNode)) return;
        const varName = `$k${counter++}`;
        allHoistables.push({
          node: callNode,
          code: code.original.substring(callNode.start, callNode.end),
          varName
        });
        walkCtx.exitBranch();
      },
      MemberExpression: (memberNode, walkCtx) => {
        if (!hoistableSet.has(memberNode)) return;
        const stack = walkCtx.stack || [];
        if (stack.length > 0) {
          const parent = stack[stack.length - 1];
          if (parent?.type === "CallExpression" && parent.callee === memberNode) {
            if (!hoistableSet.has(parent)) {
              return;
            }
          }
        }
        const varName = `$k${counter++}`;
        allHoistables.push({
          node: memberNode,
          code: code.original.substring(memberNode.start, memberNode.end),
          varName
        });
        walkCtx.exitBranch();
      },
      BinaryExpression: (binaryNode, walkCtx) => {
        if (!hoistableSet.has(binaryNode)) return;
        const varName = `$k${counter++}`;
        allHoistables.push({
          node: binaryNode,
          code: code.original.substring(binaryNode.start, binaryNode.end),
          varName
        });
        walkCtx.exitBranch();
      },
      ConditionalExpression: (conditionalNode, walkCtx) => {
        if (!hoistableSet.has(conditionalNode)) return;
        const varName = `$k${counter++}`;
        allHoistables.push({
          node: conditionalNode,
          code: code.original.substring(
            conditionalNode.start,
            conditionalNode.end
          ),
          varName
        });
        walkCtx.exitBranch();
      },
      LogicalExpression: (logicalNode, walkCtx) => {
        if (!hoistableSet.has(logicalNode)) return;
        const varName = `$k${counter++}`;
        allHoistables.push({
          node: logicalNode,
          code: code.original.substring(logicalNode.start, logicalNode.end),
          varName
        });
        walkCtx.exitBranch();
      },
      ArrayExpression: (arrayNode, walkCtx) => {
        if (!hoistableSet.has(arrayNode)) return;
        const varName = `$k${counter++}`;
        allHoistables.push({
          node: arrayNode,
          code: code.original.substring(arrayNode.start, arrayNode.end),
          varName
        });
        walkCtx.exitBranch();
      },
      ObjectExpression: (objectNode, walkCtx) => {
        if (!hoistableSet.has(objectNode)) return;
        const varName = `$k${counter++}`;
        allHoistables.push({
          node: objectNode,
          code: code.original.substring(objectNode.start, objectNode.end),
          varName
        });
        walkCtx.exitBranch();
      }
    });
  }
  if (allHoistables.length === 0) return;
  const declarations = allHoistables.length === 1 ? `const ${allHoistables[0].varName} = ${allHoistables[0].code}` : allHoistables.map(
    (h, i) => i === 0 ? `const ${h.varName} =${h.code.startsWith("_jsx") ? " /* @__PURE__ */" : ""} ${h.code}` : `  ${h.varName} =${h.code.startsWith("_jsx") ? " /* @__PURE__ */" : ""} ${h.code}`
  ).join(",\n");
  code.append(`
${declarations}
`);
  for (let i = allHoistables.length - 1; i >= 0; i--) {
    const h = allHoistables[i];
    code.update(h.node.start, h.node.end, h.varName);
    if ("_rollupAnnotations" in h.node) {
      const annotations = h.node._rollupAnnotations;
      const pureAnnotation = annotations.find((a) => a.type === "pure");
      if (pureAnnotation) {
        code.remove(pureAnnotation.start, pureAnnotation.end);
      }
    }
  }
}
function isHoistableStaticOperation(node, jsxAliases, fragmentAliases, hoistableSet) {
  let memberExpr;
  let isCall = false;
  if (node.type === "CallExpression") {
    const callee = node.callee;
    if (callee?.type !== "MemberExpression") return false;
    memberExpr = callee;
    isCall = true;
  } else if (node.type === "MemberExpression") {
    memberExpr = node;
    isCall = false;
  } else {
    return false;
  }
  const obj = memberExpr.object;
  if (!obj) return false;
  let isStaticSource = false;
  if (obj.type === "ArrayExpression") {
    const elements = obj.elements || [];
    isStaticSource = elements.every((elem) => {
      if (!elem) return true;
      return isStaticLiteral(elem);
    });
  } else if (obj.type === "ObjectExpression") {
    const objNode = obj;
    const properties = objNode.properties || [];
    isStaticSource = properties.every((prop) => {
      if (prop.type !== "Property") return false;
      return isStaticLiteral(prop.value);
    });
  } else if (obj.type === "CallExpression" || obj.type === "MemberExpression") {
    const objNode = obj;
    if (hoistableSet.has(objNode)) {
      isStaticSource = true;
    } else {
      hoistableSet.add(objNode);
      isStaticSource = isHoistableStaticOperation(
        objNode,
        jsxAliases,
        fragmentAliases,
        hoistableSet
      );
      if (!isStaticSource) {
        hoistableSet.delete(objNode);
      }
    }
  }
  if (!isStaticSource) return false;
  if (!isCall) {
    const prop = memberExpr.property;
    if (prop?.type === "Identifier" && prop.name) {
      return true;
    }
    return false;
  }
  const callNode = node;
  const args = callNode.arguments || [];
  if (args.length === 0) return true;
  const firstArg = args[0];
  if (firstArg.type === "ArrowFunctionExpression" || firstArg.type === "FunctionExpression") {
    const params = firstArg.params || [];
    if (params.length === 0) return false;
    const paramNames = /* @__PURE__ */ new Set();
    for (const param of params) {
      if (param.type === "Identifier" && param.name) {
        paramNames.add(param.name);
      }
    }
    if (paramNames.size === 0) return false;
    const body = firstArg.body;
    if (!body) return false;
    if (Array.isArray(body)) return false;
    const bodyNode = body;
    let callbackResult = false;
    if (bodyNode.type === "BlockStatement") {
      const statements = bodyNode.body || [];
      if (statements.length !== 1) return false;
      const stmt = statements[0];
      if (stmt.type !== "ReturnStatement" || !stmt.argument)
        return false;
      const returnValue = stmt.argument;
      const firstParamName = Array.from(paramNames)[0];
      callbackResult = isStaticallyDerivedJSX(
        returnValue,
        firstParamName,
        jsxAliases,
        fragmentAliases,
        hoistableSet
      ) || isStaticallyDerivedValueMultiParam(returnValue, paramNames);
    } else {
      const firstParamName = Array.from(paramNames)[0];
      callbackResult = isStaticallyDerivedJSX(
        bodyNode,
        firstParamName,
        jsxAliases,
        fragmentAliases,
        hoistableSet
      ) || isStaticallyDerivedValueMultiParam(bodyNode, paramNames);
    }
    return callbackResult && args.slice(1).every((arg) => isStaticLiteral(arg));
  }
  return args.every((arg) => isStaticLiteral(arg));
}
function isStaticallyDerivedProps(propsArg, paramName) {
  if (!propsArg) return true;
  if (propsArg.type === "Literal") {
    return propsArg.value === null || propsArg.value === void 0;
  }
  if (propsArg.type === "ObjectExpression") {
    const props = propsArg.properties || [];
    if (props.length === 0) return true;
    for (const prop of props) {
      if (prop.type !== "Property") return false;
      if (!isStaticallyDerivedValue(prop.value, paramName)) {
        return false;
      }
    }
    return true;
  }
  return false;
}
function isStaticallyDerivedValueMultiParam(node, paramNames) {
  if (!node) return true;
  switch (node.type) {
    case "Literal":
      return true;
    case "Identifier":
      return node.name ? paramNames.has(node.name) : false;
    case "BinaryExpression":
      return isStaticallyDerivedValueMultiParam(node.left, paramNames) && isStaticallyDerivedValueMultiParam(node.right, paramNames);
    case "UnaryExpression":
      return isStaticallyDerivedValueMultiParam(
        node.argument,
        paramNames
      );
    case "MemberExpression":
      const obj = node.object;
      if (obj?.type === "Identifier" && obj.name && paramNames.has(obj.name)) {
        return true;
      }
      return false;
    default:
      return false;
  }
}
function isStaticallyDerivedValue(node, paramName) {
  return isStaticallyDerivedValueMultiParam(node, /* @__PURE__ */ new Set([paramName]));
}
function isStaticallyDerivedJSX(node, paramName, jsxAliases, fragmentAliases, hoistableSet) {
  if (node.type !== "CallExpression") return false;
  const callee = node.callee;
  if (callee?.type !== "Identifier" || !callee.name || !jsxAliases.has(callee.name)) {
    return false;
  }
  const propsArg = node.arguments?.[1];
  if (!isStaticallyDerivedProps(propsArg, paramName)) {
    return false;
  }
  const childrenArgs = node.arguments?.slice(2) || [];
  for (const child of childrenArgs) {
    if (child.type === "Identifier") {
      if (child.name !== paramName) {
        return false;
      }
      continue;
    }
    if (child.type === "CallExpression") {
      const childCallee = child.callee;
      if (childCallee?.type === "Identifier" && childCallee.name && jsxAliases.has(childCallee.name)) {
        if (hoistableSet.has(child)) {
          continue;
        }
        if (isStaticallyDerivedJSX(
          child,
          paramName,
          jsxAliases,
          fragmentAliases,
          hoistableSet
        )) {
          hoistableSet.add(child);
          continue;
        }
        return false;
      }
    }
    if (!isStaticValue(child)) {
      return false;
    }
  }
  return true;
}
function isHoistableSubtree(callNode, jsxAliases, fragmentAliases, hoistableSet) {
  const callee = callNode.callee;
  if (callee?.type !== "Identifier" || !callee.name || !jsxAliases.has(callee.name)) {
    return false;
  }
  const typeArg = callNode.arguments?.[0];
  if (!typeArg) return false;
  const propsArg = callNode.arguments?.[1];
  if (!isHoistablePropsStatic(propsArg)) {
    return false;
  }
  const childrenArgs = callNode.arguments?.slice(2) || [];
  for (const child of childrenArgs) {
    if (child.type === "CallExpression") {
      const childCallee = child.callee;
      if (childCallee?.type === "Identifier" && childCallee.name && jsxAliases.has(childCallee.name)) {
        if (hoistableSet?.has(child)) {
          continue;
        }
        if (isHoistableSubtree(child, jsxAliases, fragmentAliases, hoistableSet)) {
          hoistableSet?.add(child);
          continue;
        }
        return false;
      }
    }
    if (!isStaticChild(child)) {
      return false;
    }
  }
  return true;
}
function collectNestedOperations(node, candidates) {
  if (!node) return;
  switch (node.type) {
    case "BinaryExpression":
      collectNestedOperations(node.left, candidates);
      collectNestedOperations(node.right, candidates);
      break;
    case "UnaryExpression":
      collectNestedOperations(node.argument, candidates);
      break;
    case "ConditionalExpression":
      collectNestedOperations(node.test, candidates);
      collectNestedOperations(node.consequent, candidates);
      collectNestedOperations(node.alternate, candidates);
      break;
    case "LogicalExpression":
      collectNestedOperations(node.left, candidates);
      collectNestedOperations(node.right, candidates);
      break;
    case "CallExpression":
    case "MemberExpression":
      candidates.push(node);
      break;
  }
}
function isHoistableStaticExpression(node, jsxAliases, fragmentAliases, hoistableSet) {
  if (!node) return false;
  switch (node.type) {
    case "BinaryExpression":
      return isHoistableStaticExpression(
        node.left,
        jsxAliases,
        fragmentAliases,
        hoistableSet
      ) && isHoistableStaticExpression(
        node.right,
        jsxAliases,
        fragmentAliases,
        hoistableSet
      );
    case "UnaryExpression":
      return isHoistableStaticExpression(
        node.argument,
        jsxAliases,
        fragmentAliases,
        hoistableSet
      );
    case "ConditionalExpression":
      return isHoistableStaticExpression(
        node.test,
        jsxAliases,
        fragmentAliases,
        hoistableSet
      ) && isHoistableStaticExpression(
        node.consequent,
        jsxAliases,
        fragmentAliases,
        hoistableSet
      ) && isHoistableStaticExpression(
        node.alternate,
        jsxAliases,
        fragmentAliases,
        hoistableSet
      );
    case "LogicalExpression":
      return isHoistableStaticExpression(
        node.left,
        jsxAliases,
        fragmentAliases,
        hoistableSet
      ) && isHoistableStaticExpression(
        node.right,
        jsxAliases,
        fragmentAliases,
        hoistableSet
      );
    case "Literal":
      return true;
    case "ArrayExpression":
      return isStaticLiteral(node);
    case "ObjectExpression":
      return isStaticLiteral(node);
    case "CallExpression":
    case "MemberExpression":
      if (jsxAliases && fragmentAliases && hoistableSet) {
        if (hoistableSet.has(node)) return true;
        const isHoistable = isHoistableStaticOperation(
          node,
          jsxAliases,
          fragmentAliases,
          hoistableSet
        );
        if (isHoistable) {
          hoistableSet.add(node);
        }
        return isHoistable;
      }
      return false;
    default:
      return false;
  }
}
function isStaticChild(node) {
  if (!node) return true;
  switch (node.type) {
    case "Literal":
      return true;
    case "Identifier":
      if (node.name && staticHoistableIds.has(node.name)) {
        return true;
      }
      return false;
    case "ArrayExpression": {
      const elems = node.expressions || [];
      return elems.every((e) => isStaticChild(e));
    }
    case "ObjectExpression": {
      const props = node.properties || [];
      return props.every((p) => {
        if (p.type !== "Property") return false;
        return isStaticChild(p.value);
      });
    }
    case "BinaryExpression":
      return isStaticChild(node.left) && isStaticChild(node.right);
    case "ConditionalExpression":
      return isStaticChild(node.test) && isStaticChild(node.consequent) && isStaticChild(node.alternate);
    case "LogicalExpression":
      return isStaticChild(node.left) && isStaticChild(node.right);
    case "TemplateLiteral":
      return false;
    default:
      return false;
  }
}
function isHoistablePropsStatic(propsArg) {
  if (!propsArg) return true;
  if (propsArg.type === "Literal") {
    return propsArg.value === null || propsArg.value === void 0;
  }
  if (propsArg.type === "ObjectExpression") {
    const props = propsArg.properties || [];
    if (props.length === 0) return true;
    for (const prop of props) {
      if (prop.type !== "Property") return false;
      if (!isStaticLiteral(prop.value)) return false;
    }
    return true;
  }
  return false;
}
function isStaticLiteral(node) {
  if (!node) return true;
  switch (node.type) {
    case "Literal":
      return true;
    case "ArrayExpression": {
      const elems = node.elements || [];
      return elems.every((e) => isStaticLiteral(e));
    }
    case "ObjectExpression": {
      const props = node.properties || [];
      return props.every((p) => {
        if (p.type !== "Property") return false;
        return isStaticLiteral(p.value);
      });
    }
    case "BinaryExpression":
      return isStaticLiteral(node.left) && isStaticLiteral(node.right);
    default:
      return false;
  }
}
function isStaticValue(node) {
  if (!node) return true;
  switch (node.type) {
    case "Literal":
      return true;
    case "Identifier":
      return true;
    case "ArrayExpression": {
      const elems = node.expressions || [];
      return elems.every((e) => isStaticValue(e));
    }
    case "ObjectExpression": {
      const props = node.properties || [];
      return props.every((p) => {
        if (p.type !== "Property") return false;
        return isStaticValue(p.value);
      });
    }
    case "BinaryExpression":
      return isStaticValue(node.left) && isStaticValue(node.right);
    default:
      return false;
  }
}

// src/ansi.ts
var colors = {
  black: "\x1B[30m",
  black_bright: "\x1B[90m",
  red: "\x1B[31m",
  red_bright: "\x1B[91m",
  green: "\x1B[32m",
  green_bright: "\x1B[92m",
  yellow: "\x1B[33m",
  yellow_bright: "\x1B[93m",
  blue: "\x1B[34m",
  blue_bright: "\x1B[94m",
  magenta: "\x1B[35m",
  magenta_bright: "\x1B[95m",
  cyan: "\x1B[36m",
  cyan_bright: "\x1B[96m",
  white: "\x1B[37m",
  white_bright: "\x1B[97m",
  reset: "\x1B[0m"
};
var ANSI = tEntries(colors).reduce((acc, [key, value]) => {
  acc[key] = (str) => `${value}${str}${colors.reset}`;
  return acc;
}, {});
function tEntries(obj) {
  return Object.entries(obj);
}

// src/config.ts
import path3 from "node:path";

// src/utils.ts
import path2 from "node:path";

// ../../node_modules/.pnpm/tinyglobby@0.2.15/node_modules/tinyglobby/dist/index.mjs
import nativeFs2 from "fs";
import path, { posix } from "path";
import { fileURLToPath } from "url";

// ../../node_modules/.pnpm/fdir@6.5.0_picomatch@4.0.3/node_modules/fdir/dist/index.mjs
import { createRequire } from "module";
import { basename, dirname, normalize, relative, resolve, sep } from "path";
import * as nativeFs from "fs";
var __require = /* @__PURE__ */ createRequire(import.meta.url);
function cleanPath(path8) {
  let normalized = normalize(path8);
  if (normalized.length > 1 && normalized[normalized.length - 1] === sep) normalized = normalized.substring(0, normalized.length - 1);
  return normalized;
}
var SLASHES_REGEX = /[\\/]/g;
function convertSlashes(path8, separator) {
  return path8.replace(SLASHES_REGEX, separator);
}
var WINDOWS_ROOT_DIR_REGEX = /^[a-z]:[\\/]$/i;
function isRootDirectory(path8) {
  return path8 === "/" || WINDOWS_ROOT_DIR_REGEX.test(path8);
}
function normalizePath(path8, options) {
  const { resolvePaths, normalizePath: normalizePath$1, pathSeparator } = options;
  const pathNeedsCleaning = process.platform === "win32" && path8.includes("/") || path8.startsWith(".");
  if (resolvePaths) path8 = resolve(path8);
  if (normalizePath$1 || pathNeedsCleaning) path8 = cleanPath(path8);
  if (path8 === ".") return "";
  const needsSeperator = path8[path8.length - 1] !== pathSeparator;
  return convertSlashes(needsSeperator ? path8 + pathSeparator : path8, pathSeparator);
}
function joinPathWithBasePath(filename, directoryPath) {
  return directoryPath + filename;
}
function joinPathWithRelativePath(root, options) {
  return function(filename, directoryPath) {
    const sameRoot = directoryPath.startsWith(root);
    if (sameRoot) return directoryPath.slice(root.length) + filename;
    else return convertSlashes(relative(root, directoryPath), options.pathSeparator) + options.pathSeparator + filename;
  };
}
function joinPath(filename) {
  return filename;
}
function joinDirectoryPath(filename, directoryPath, separator) {
  return directoryPath + filename + separator;
}
function build$7(root, options) {
  const { relativePaths, includeBasePath } = options;
  return relativePaths && root ? joinPathWithRelativePath(root, options) : includeBasePath ? joinPathWithBasePath : joinPath;
}
function pushDirectoryWithRelativePath(root) {
  return function(directoryPath, paths) {
    paths.push(directoryPath.substring(root.length) || ".");
  };
}
function pushDirectoryFilterWithRelativePath(root) {
  return function(directoryPath, paths, filters) {
    const relativePath = directoryPath.substring(root.length) || ".";
    if (filters.every((filter) => filter(relativePath, true))) paths.push(relativePath);
  };
}
var pushDirectory = (directoryPath, paths) => {
  paths.push(directoryPath || ".");
};
var pushDirectoryFilter = (directoryPath, paths, filters) => {
  const path8 = directoryPath || ".";
  if (filters.every((filter) => filter(path8, true))) paths.push(path8);
};
var empty$2 = () => {
};
function build$6(root, options) {
  const { includeDirs, filters, relativePaths } = options;
  if (!includeDirs) return empty$2;
  if (relativePaths) return filters && filters.length ? pushDirectoryFilterWithRelativePath(root) : pushDirectoryWithRelativePath(root);
  return filters && filters.length ? pushDirectoryFilter : pushDirectory;
}
var pushFileFilterAndCount = (filename, _paths, counts, filters) => {
  if (filters.every((filter) => filter(filename, false))) counts.files++;
};
var pushFileFilter = (filename, paths, _counts, filters) => {
  if (filters.every((filter) => filter(filename, false))) paths.push(filename);
};
var pushFileCount = (_filename, _paths, counts, _filters) => {
  counts.files++;
};
var pushFile = (filename, paths) => {
  paths.push(filename);
};
var empty$1 = () => {
};
function build$5(options) {
  const { excludeFiles, filters, onlyCounts } = options;
  if (excludeFiles) return empty$1;
  if (filters && filters.length) return onlyCounts ? pushFileFilterAndCount : pushFileFilter;
  else if (onlyCounts) return pushFileCount;
  else return pushFile;
}
var getArray = (paths) => {
  return paths;
};
var getArrayGroup = () => {
  return [""].slice(0, 0);
};
function build$4(options) {
  return options.group ? getArrayGroup : getArray;
}
var groupFiles = (groups, directory, files) => {
  groups.push({
    directory,
    files,
    dir: directory
  });
};
var empty = () => {
};
function build$3(options) {
  return options.group ? groupFiles : empty;
}
var resolveSymlinksAsync = function(path8, state, callback$1) {
  const { queue, fs: fs4, options: { suppressErrors } } = state;
  queue.enqueue();
  fs4.realpath(path8, (error, resolvedPath) => {
    if (error) return queue.dequeue(suppressErrors ? null : error, state);
    fs4.stat(resolvedPath, (error$1, stat) => {
      if (error$1) return queue.dequeue(suppressErrors ? null : error$1, state);
      if (stat.isDirectory() && isRecursive(path8, resolvedPath, state)) return queue.dequeue(null, state);
      callback$1(stat, resolvedPath);
      queue.dequeue(null, state);
    });
  });
};
var resolveSymlinks = function(path8, state, callback$1) {
  const { queue, fs: fs4, options: { suppressErrors } } = state;
  queue.enqueue();
  try {
    const resolvedPath = fs4.realpathSync(path8);
    const stat = fs4.statSync(resolvedPath);
    if (stat.isDirectory() && isRecursive(path8, resolvedPath, state)) return;
    callback$1(stat, resolvedPath);
  } catch (e) {
    if (!suppressErrors) throw e;
  }
};
function build$2(options, isSynchronous) {
  if (!options.resolveSymlinks || options.excludeSymlinks) return null;
  return isSynchronous ? resolveSymlinks : resolveSymlinksAsync;
}
function isRecursive(path8, resolved, state) {
  if (state.options.useRealPaths) return isRecursiveUsingRealPaths(resolved, state);
  let parent = dirname(path8);
  let depth = 1;
  while (parent !== state.root && depth < 2) {
    const resolvedPath = state.symlinks.get(parent);
    const isSameRoot = !!resolvedPath && (resolvedPath === resolved || resolvedPath.startsWith(resolved) || resolved.startsWith(resolvedPath));
    if (isSameRoot) depth++;
    else parent = dirname(parent);
  }
  state.symlinks.set(path8, resolved);
  return depth > 1;
}
function isRecursiveUsingRealPaths(resolved, state) {
  return state.visited.includes(resolved + state.options.pathSeparator);
}
var onlyCountsSync = (state) => {
  return state.counts;
};
var groupsSync = (state) => {
  return state.groups;
};
var defaultSync = (state) => {
  return state.paths;
};
var limitFilesSync = (state) => {
  return state.paths.slice(0, state.options.maxFiles);
};
var onlyCountsAsync = (state, error, callback$1) => {
  report(error, callback$1, state.counts, state.options.suppressErrors);
  return null;
};
var defaultAsync = (state, error, callback$1) => {
  report(error, callback$1, state.paths, state.options.suppressErrors);
  return null;
};
var limitFilesAsync = (state, error, callback$1) => {
  report(error, callback$1, state.paths.slice(0, state.options.maxFiles), state.options.suppressErrors);
  return null;
};
var groupsAsync = (state, error, callback$1) => {
  report(error, callback$1, state.groups, state.options.suppressErrors);
  return null;
};
function report(error, callback$1, output, suppressErrors) {
  if (error && !suppressErrors) callback$1(error, output);
  else callback$1(null, output);
}
function build$1(options, isSynchronous) {
  const { onlyCounts, group, maxFiles } = options;
  if (onlyCounts) return isSynchronous ? onlyCountsSync : onlyCountsAsync;
  else if (group) return isSynchronous ? groupsSync : groupsAsync;
  else if (maxFiles) return isSynchronous ? limitFilesSync : limitFilesAsync;
  else return isSynchronous ? defaultSync : defaultAsync;
}
var readdirOpts = { withFileTypes: true };
var walkAsync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
  state.queue.enqueue();
  if (currentDepth < 0) return state.queue.dequeue(null, state);
  const { fs: fs4 } = state;
  state.visited.push(crawlPath);
  state.counts.directories++;
  fs4.readdir(crawlPath || ".", readdirOpts, (error, entries = []) => {
    callback$1(entries, directoryPath, currentDepth);
    state.queue.dequeue(state.options.suppressErrors ? null : error, state);
  });
};
var walkSync = (state, crawlPath, directoryPath, currentDepth, callback$1) => {
  const { fs: fs4 } = state;
  if (currentDepth < 0) return;
  state.visited.push(crawlPath);
  state.counts.directories++;
  let entries = [];
  try {
    entries = fs4.readdirSync(crawlPath || ".", readdirOpts);
  } catch (e) {
    if (!state.options.suppressErrors) throw e;
  }
  callback$1(entries, directoryPath, currentDepth);
};
function build(isSynchronous) {
  return isSynchronous ? walkSync : walkAsync;
}
var Queue = class {
  count = 0;
  constructor(onQueueEmpty) {
    this.onQueueEmpty = onQueueEmpty;
  }
  enqueue() {
    this.count++;
    return this.count;
  }
  dequeue(error, output) {
    if (this.onQueueEmpty && (--this.count <= 0 || error)) {
      this.onQueueEmpty(error, output);
      if (error) {
        output.controller.abort();
        this.onQueueEmpty = void 0;
      }
    }
  }
};
var Counter = class {
  _files = 0;
  _directories = 0;
  set files(num) {
    this._files = num;
  }
  get files() {
    return this._files;
  }
  set directories(num) {
    this._directories = num;
  }
  get directories() {
    return this._directories;
  }
  /**
  * @deprecated use `directories` instead
  */
  /* c8 ignore next 3 */
  get dirs() {
    return this._directories;
  }
};
var Aborter = class {
  aborted = false;
  abort() {
    this.aborted = true;
  }
};
var Walker = class {
  root;
  isSynchronous;
  state;
  joinPath;
  pushDirectory;
  pushFile;
  getArray;
  groupFiles;
  resolveSymlink;
  walkDirectory;
  callbackInvoker;
  constructor(root, options, callback$1) {
    this.isSynchronous = !callback$1;
    this.callbackInvoker = build$1(options, this.isSynchronous);
    this.root = normalizePath(root, options);
    this.state = {
      root: isRootDirectory(this.root) ? this.root : this.root.slice(0, -1),
      paths: [""].slice(0, 0),
      groups: [],
      counts: new Counter(),
      options,
      queue: new Queue((error, state) => this.callbackInvoker(state, error, callback$1)),
      symlinks: /* @__PURE__ */ new Map(),
      visited: [""].slice(0, 0),
      controller: new Aborter(),
      fs: options.fs || nativeFs
    };
    this.joinPath = build$7(this.root, options);
    this.pushDirectory = build$6(this.root, options);
    this.pushFile = build$5(options);
    this.getArray = build$4(options);
    this.groupFiles = build$3(options);
    this.resolveSymlink = build$2(options, this.isSynchronous);
    this.walkDirectory = build(this.isSynchronous);
  }
  start() {
    this.pushDirectory(this.root, this.state.paths, this.state.options.filters);
    this.walkDirectory(this.state, this.root, this.root, this.state.options.maxDepth, this.walk);
    return this.isSynchronous ? this.callbackInvoker(this.state, null) : null;
  }
  walk = (entries, directoryPath, depth) => {
    const { paths, options: { filters, resolveSymlinks: resolveSymlinks$1, excludeSymlinks, exclude, maxFiles, signal, useRealPaths, pathSeparator }, controller } = this.state;
    if (controller.aborted || signal && signal.aborted || maxFiles && paths.length > maxFiles) return;
    const files = this.getArray(this.state.paths);
    for (let i = 0; i < entries.length; ++i) {
      const entry = entries[i];
      if (entry.isFile() || entry.isSymbolicLink() && !resolveSymlinks$1 && !excludeSymlinks) {
        const filename = this.joinPath(entry.name, directoryPath);
        this.pushFile(filename, files, this.state.counts, filters);
      } else if (entry.isDirectory()) {
        let path8 = joinDirectoryPath(entry.name, directoryPath, this.state.options.pathSeparator);
        if (exclude && exclude(entry.name, path8)) continue;
        this.pushDirectory(path8, paths, filters);
        this.walkDirectory(this.state, path8, path8, depth - 1, this.walk);
      } else if (this.resolveSymlink && entry.isSymbolicLink()) {
        let path8 = joinPathWithBasePath(entry.name, directoryPath);
        this.resolveSymlink(path8, this.state, (stat, resolvedPath) => {
          if (stat.isDirectory()) {
            resolvedPath = normalizePath(resolvedPath, this.state.options);
            if (exclude && exclude(entry.name, useRealPaths ? resolvedPath : path8 + pathSeparator)) return;
            this.walkDirectory(this.state, resolvedPath, useRealPaths ? resolvedPath : path8 + pathSeparator, depth - 1, this.walk);
          } else {
            resolvedPath = useRealPaths ? resolvedPath : path8;
            const filename = basename(resolvedPath);
            const directoryPath$1 = normalizePath(dirname(resolvedPath), this.state.options);
            resolvedPath = this.joinPath(filename, directoryPath$1);
            this.pushFile(resolvedPath, files, this.state.counts, filters);
          }
        });
      }
    }
    this.groupFiles(this.state.groups, directoryPath, files);
  };
};
function promise(root, options) {
  return new Promise((resolve$1, reject) => {
    callback(root, options, (err, output) => {
      if (err) return reject(err);
      resolve$1(output);
    });
  });
}
function callback(root, options, callback$1) {
  let walker = new Walker(root, options, callback$1);
  walker.start();
}
function sync(root, options) {
  const walker = new Walker(root, options);
  return walker.start();
}
var APIBuilder = class {
  constructor(root, options) {
    this.root = root;
    this.options = options;
  }
  withPromise() {
    return promise(this.root, this.options);
  }
  withCallback(cb) {
    callback(this.root, this.options, cb);
  }
  sync() {
    return sync(this.root, this.options);
  }
};
var pm = null;
try {
  __require.resolve("picomatch");
  pm = __require("picomatch");
} catch {
}
var Builder = class {
  globCache = {};
  options = {
    maxDepth: Infinity,
    suppressErrors: true,
    pathSeparator: sep,
    filters: []
  };
  globFunction;
  constructor(options) {
    this.options = {
      ...this.options,
      ...options
    };
    this.globFunction = this.options.globFunction;
  }
  group() {
    this.options.group = true;
    return this;
  }
  withPathSeparator(separator) {
    this.options.pathSeparator = separator;
    return this;
  }
  withBasePath() {
    this.options.includeBasePath = true;
    return this;
  }
  withRelativePaths() {
    this.options.relativePaths = true;
    return this;
  }
  withDirs() {
    this.options.includeDirs = true;
    return this;
  }
  withMaxDepth(depth) {
    this.options.maxDepth = depth;
    return this;
  }
  withMaxFiles(limit) {
    this.options.maxFiles = limit;
    return this;
  }
  withFullPaths() {
    this.options.resolvePaths = true;
    this.options.includeBasePath = true;
    return this;
  }
  withErrors() {
    this.options.suppressErrors = false;
    return this;
  }
  withSymlinks({ resolvePaths = true } = {}) {
    this.options.resolveSymlinks = true;
    this.options.useRealPaths = resolvePaths;
    return this.withFullPaths();
  }
  withAbortSignal(signal) {
    this.options.signal = signal;
    return this;
  }
  normalize() {
    this.options.normalizePath = true;
    return this;
  }
  filter(predicate) {
    this.options.filters.push(predicate);
    return this;
  }
  onlyDirs() {
    this.options.excludeFiles = true;
    this.options.includeDirs = true;
    return this;
  }
  exclude(predicate) {
    this.options.exclude = predicate;
    return this;
  }
  onlyCounts() {
    this.options.onlyCounts = true;
    return this;
  }
  crawl(root) {
    return new APIBuilder(root || ".", this.options);
  }
  withGlobFunction(fn) {
    this.globFunction = fn;
    return this;
  }
  /**
  * @deprecated Pass options using the constructor instead:
  * ```ts
  * new fdir(options).crawl("/path/to/root");
  * ```
  * This method will be removed in v7.0
  */
  /* c8 ignore next 4 */
  crawlWithOptions(root, options) {
    this.options = {
      ...this.options,
      ...options
    };
    return new APIBuilder(root || ".", this.options);
  }
  glob(...patterns) {
    if (this.globFunction) return this.globWithOptions(patterns);
    return this.globWithOptions(patterns, ...[{ dot: true }]);
  }
  globWithOptions(patterns, ...options) {
    const globFn = this.globFunction || pm;
    if (!globFn) throw new Error("Please specify a glob function to use glob matching.");
    var isMatch = this.globCache[patterns.join("\0")];
    if (!isMatch) {
      isMatch = globFn(patterns, ...options);
      this.globCache[patterns.join("\0")] = isMatch;
    }
    this.options.filters.push((path8) => isMatch(path8));
    return this;
  }
};

// ../../node_modules/.pnpm/tinyglobby@0.2.15/node_modules/tinyglobby/dist/index.mjs
var import_picomatch = __toESM(require_picomatch2(), 1);
var isReadonlyArray = Array.isArray;
var isWin = process.platform === "win32";
var ONLY_PARENT_DIRECTORIES = /^(\/?\.\.)+$/;
function getPartialMatcher(patterns, options = {}) {
  const patternsCount = patterns.length;
  const patternsParts = Array(patternsCount);
  const matchers = Array(patternsCount);
  const globstarEnabled = !options.noglobstar;
  for (let i = 0; i < patternsCount; i++) {
    const parts = splitPattern(patterns[i]);
    patternsParts[i] = parts;
    const partsCount = parts.length;
    const partMatchers = Array(partsCount);
    for (let j = 0; j < partsCount; j++) partMatchers[j] = (0, import_picomatch.default)(parts[j], options);
    matchers[i] = partMatchers;
  }
  return (input) => {
    const inputParts = input.split("/");
    if (inputParts[0] === ".." && ONLY_PARENT_DIRECTORIES.test(input)) return true;
    for (let i = 0; i < patterns.length; i++) {
      const patternParts = patternsParts[i];
      const matcher = matchers[i];
      const inputPatternCount = inputParts.length;
      const minParts = Math.min(inputPatternCount, patternParts.length);
      let j = 0;
      while (j < minParts) {
        const part = patternParts[j];
        if (part.includes("/")) return true;
        const match = matcher[j](inputParts[j]);
        if (!match) break;
        if (globstarEnabled && part === "**") return true;
        j++;
      }
      if (j === inputPatternCount) return true;
    }
    return false;
  };
}
var WIN32_ROOT_DIR = /^[A-Z]:\/$/i;
var isRoot = isWin ? (p) => WIN32_ROOT_DIR.test(p) : (p) => p === "/";
function buildFormat(cwd, root, absolute) {
  if (cwd === root || root.startsWith(`${cwd}/`)) {
    if (absolute) {
      const start = isRoot(cwd) ? cwd.length : cwd.length + 1;
      return (p, isDir) => p.slice(start, isDir ? -1 : void 0) || ".";
    }
    const prefix = root.slice(cwd.length + 1);
    if (prefix) return (p, isDir) => {
      if (p === ".") return prefix;
      const result = `${prefix}/${p}`;
      return isDir ? result.slice(0, -1) : result;
    };
    return (p, isDir) => isDir && p !== "." ? p.slice(0, -1) : p;
  }
  if (absolute) return (p) => posix.relative(cwd, p) || ".";
  return (p) => posix.relative(cwd, `${root}/${p}`) || ".";
}
function buildRelative(cwd, root) {
  if (root.startsWith(`${cwd}/`)) {
    const prefix = root.slice(cwd.length + 1);
    return (p) => `${prefix}/${p}`;
  }
  return (p) => {
    const result = posix.relative(cwd, `${root}/${p}`);
    if (p.endsWith("/") && result !== "") return `${result}/`;
    return result || ".";
  };
}
var splitPatternOptions = { parts: true };
function splitPattern(path$1) {
  var _result$parts;
  const result = import_picomatch.default.scan(path$1, splitPatternOptions);
  return ((_result$parts = result.parts) === null || _result$parts === void 0 ? void 0 : _result$parts.length) ? result.parts : [path$1];
}
var POSIX_UNESCAPED_GLOB_SYMBOLS = /(?<!\\)([()[\]{}*?|]|^!|[!+@](?=\()|\\(?![()[\]{}!*+?@|]))/g;
var WIN32_UNESCAPED_GLOB_SYMBOLS = /(?<!\\)([()[\]{}]|^!|[!+@](?=\())/g;
var escapePosixPath = (path$1) => path$1.replace(POSIX_UNESCAPED_GLOB_SYMBOLS, "\\$&");
var escapeWin32Path = (path$1) => path$1.replace(WIN32_UNESCAPED_GLOB_SYMBOLS, "\\$&");
var escapePath = isWin ? escapeWin32Path : escapePosixPath;
function isDynamicPattern(pattern, options) {
  if ((options === null || options === void 0 ? void 0 : options.caseSensitiveMatch) === false) return true;
  const scan = import_picomatch.default.scan(pattern);
  return scan.isGlob || scan.negated;
}
function log(...tasks) {
  console.log(`[tinyglobby ${(/* @__PURE__ */ new Date()).toLocaleTimeString("es")}]`, ...tasks);
}
var PARENT_DIRECTORY = /^(\/?\.\.)+/;
var ESCAPING_BACKSLASHES = /\\(?=[()[\]{}!*+?@|])/g;
var BACKSLASHES = /\\/g;
function normalizePattern(pattern, expandDirectories, cwd, props, isIgnore) {
  let result = pattern;
  if (pattern.endsWith("/")) result = pattern.slice(0, -1);
  if (!result.endsWith("*") && expandDirectories) result += "/**";
  const escapedCwd = escapePath(cwd);
  if (path.isAbsolute(result.replace(ESCAPING_BACKSLASHES, ""))) result = posix.relative(escapedCwd, result);
  else result = posix.normalize(result);
  const parentDirectoryMatch = PARENT_DIRECTORY.exec(result);
  const parts = splitPattern(result);
  if (parentDirectoryMatch === null || parentDirectoryMatch === void 0 ? void 0 : parentDirectoryMatch[0]) {
    const n = (parentDirectoryMatch[0].length + 1) / 3;
    let i = 0;
    const cwdParts = escapedCwd.split("/");
    while (i < n && parts[i + n] === cwdParts[cwdParts.length + i - n]) {
      result = result.slice(0, (n - i - 1) * 3) + result.slice((n - i) * 3 + parts[i + n].length + 1) || ".";
      i++;
    }
    const potentialRoot = posix.join(cwd, parentDirectoryMatch[0].slice(i * 3));
    if (!potentialRoot.startsWith(".") && props.root.length > potentialRoot.length) {
      props.root = potentialRoot;
      props.depthOffset = -n + i;
    }
  }
  if (!isIgnore && props.depthOffset >= 0) {
    var _props$commonPath;
    (_props$commonPath = props.commonPath) !== null && _props$commonPath !== void 0 || (props.commonPath = parts);
    const newCommonPath = [];
    const length = Math.min(props.commonPath.length, parts.length);
    for (let i = 0; i < length; i++) {
      const part = parts[i];
      if (part === "**" && !parts[i + 1]) {
        newCommonPath.pop();
        break;
      }
      if (part !== props.commonPath[i] || isDynamicPattern(part) || i === parts.length - 1) break;
      newCommonPath.push(part);
    }
    props.depthOffset = newCommonPath.length;
    props.commonPath = newCommonPath;
    props.root = newCommonPath.length > 0 ? posix.join(cwd, ...newCommonPath) : cwd;
  }
  return result;
}
function processPatterns({ patterns = ["**/*"], ignore = [], expandDirectories = true }, cwd, props) {
  if (typeof patterns === "string") patterns = [patterns];
  if (typeof ignore === "string") ignore = [ignore];
  const matchPatterns = [];
  const ignorePatterns = [];
  for (const pattern of ignore) {
    if (!pattern) continue;
    if (pattern[0] !== "!" || pattern[1] === "(") ignorePatterns.push(normalizePattern(pattern, expandDirectories, cwd, props, true));
  }
  for (const pattern of patterns) {
    if (!pattern) continue;
    if (pattern[0] !== "!" || pattern[1] === "(") matchPatterns.push(normalizePattern(pattern, expandDirectories, cwd, props, false));
    else if (pattern[1] !== "!" || pattern[2] === "(") ignorePatterns.push(normalizePattern(pattern.slice(1), expandDirectories, cwd, props, true));
  }
  return {
    match: matchPatterns,
    ignore: ignorePatterns
  };
}
function formatPaths(paths, relative2) {
  for (let i = paths.length - 1; i >= 0; i--) {
    const path$1 = paths[i];
    paths[i] = relative2(path$1);
  }
  return paths;
}
function normalizeCwd(cwd) {
  if (!cwd) return process.cwd().replace(BACKSLASHES, "/");
  if (cwd instanceof URL) return fileURLToPath(cwd).replace(BACKSLASHES, "/");
  return path.resolve(cwd).replace(BACKSLASHES, "/");
}
function getCrawler(patterns, inputOptions = {}) {
  const options = process.env.TINYGLOBBY_DEBUG ? {
    ...inputOptions,
    debug: true
  } : inputOptions;
  const cwd = normalizeCwd(options.cwd);
  if (options.debug) log("globbing with:", {
    patterns,
    options,
    cwd
  });
  if (Array.isArray(patterns) && patterns.length === 0) return [{
    sync: () => [],
    withPromise: async () => []
  }, false];
  const props = {
    root: cwd,
    commonPath: null,
    depthOffset: 0
  };
  const processed = processPatterns({
    ...options,
    patterns
  }, cwd, props);
  if (options.debug) log("internal processing patterns:", processed);
  const matchOptions = {
    dot: options.dot,
    nobrace: options.braceExpansion === false,
    nocase: options.caseSensitiveMatch === false,
    noextglob: options.extglob === false,
    noglobstar: options.globstar === false,
    posix: true
  };
  const matcher = (0, import_picomatch.default)(processed.match, {
    ...matchOptions,
    ignore: processed.ignore
  });
  const ignore = (0, import_picomatch.default)(processed.ignore, matchOptions);
  const partialMatcher = getPartialMatcher(processed.match, matchOptions);
  const format = buildFormat(cwd, props.root, options.absolute);
  const formatExclude = options.absolute ? format : buildFormat(cwd, props.root, true);
  const fdirOptions = {
    filters: [options.debug ? (p, isDirectory) => {
      const path$1 = format(p, isDirectory);
      const matches = matcher(path$1);
      if (matches) log(`matched ${path$1}`);
      return matches;
    } : (p, isDirectory) => matcher(format(p, isDirectory))],
    exclude: options.debug ? (_, p) => {
      const relativePath = formatExclude(p, true);
      const skipped = relativePath !== "." && !partialMatcher(relativePath) || ignore(relativePath);
      if (skipped) log(`skipped ${p}`);
      else log(`crawling ${p}`);
      return skipped;
    } : (_, p) => {
      const relativePath = formatExclude(p, true);
      return relativePath !== "." && !partialMatcher(relativePath) || ignore(relativePath);
    },
    fs: options.fs ? {
      readdir: options.fs.readdir || nativeFs2.readdir,
      readdirSync: options.fs.readdirSync || nativeFs2.readdirSync,
      realpath: options.fs.realpath || nativeFs2.realpath,
      realpathSync: options.fs.realpathSync || nativeFs2.realpathSync,
      stat: options.fs.stat || nativeFs2.stat,
      statSync: options.fs.statSync || nativeFs2.statSync
    } : void 0,
    pathSeparator: "/",
    relativePaths: true,
    resolveSymlinks: true,
    signal: options.signal
  };
  if (options.deep !== void 0) fdirOptions.maxDepth = Math.round(options.deep - props.depthOffset);
  if (options.absolute) {
    fdirOptions.relativePaths = false;
    fdirOptions.resolvePaths = true;
    fdirOptions.includeBasePath = true;
  }
  if (options.followSymbolicLinks === false) {
    fdirOptions.resolveSymlinks = false;
    fdirOptions.excludeSymlinks = true;
  }
  if (options.onlyDirectories) {
    fdirOptions.excludeFiles = true;
    fdirOptions.includeDirs = true;
  } else if (options.onlyFiles === false) fdirOptions.includeDirs = true;
  props.root = props.root.replace(BACKSLASHES, "");
  const root = props.root;
  if (options.debug) log("internal properties:", props);
  const relative2 = cwd !== root && !options.absolute && buildRelative(cwd, props.root);
  return [new Builder(fdirOptions).crawl(root), relative2];
}
function globSync(patternsOrOptions, options) {
  if (patternsOrOptions && (options === null || options === void 0 ? void 0 : options.patterns)) throw new Error("Cannot pass patterns as both an argument and an option");
  const isModern = isReadonlyArray(patternsOrOptions) || typeof patternsOrOptions === "string";
  const opts = isModern ? options : patternsOrOptions;
  const patterns = isModern ? patternsOrOptions : patternsOrOptions.patterns;
  const [crawler, relative2] = getCrawler(patterns, opts);
  if (!relative2) return crawler.sync();
  return formatPaths(crawler.sync(), relative2);
}

// src/utils.ts
function createLogger(state) {
  return (...data) => {
    if (!state.loggingEnabled) return;
    console.log(ANSI.cyan("[vite-plugin-kiru]"), ...data);
  };
}
function resolveUserDocument(projectRoot, ssgOptions) {
  const { dir, document } = ssgOptions;
  const fp = path2.resolve(projectRoot, dir, document).replace(/\\/g, "/");
  const matches = globSync(fp);
  if (!matches.length) {
    throw new Error(`Document not found at ${fp}`);
  }
  return path2.resolve(projectRoot, matches[0]).replace(/\\/g, "/");
}
var TRANSFORMABLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".tsx",
  ".jsx",
  ".ts",
  ".js",
  ".mjs",
  ".mts",
  ".md",
  ".mdx"
]);
function shouldTransformFile(id, state) {
  if (id[0] === "\0" || id.startsWith("vite:") || id.includes("/node_modules/")) {
    return false;
  }
  const filePath = path2.resolve(id).replace(/\\/g, "/");
  const isIncludedByUser = state.includedPaths.some(
    (p) => filePath.startsWith(p)
  );
  const isWithinProject = filePath.startsWith(state.projectRoot);
  return (isWithinProject || isIncludedByUser) && TRANSFORMABLE_EXTENSIONS.has(path2.extname(filePath));
}

// src/virtual-modules.ts
var VIRTUAL_ROUTES_ID = "virtual:kiru:routes";
var VIRTUAL_ENTRY_SERVER_ID = "virtual:kiru:entry-server";
var VIRTUAL_ENTRY_CLIENT_ID = "virtual:kiru:entry-client";
async function createVirtualModules(projectRoot, ssgOptions) {
  const userDoc = resolveUserDocument(projectRoot, ssgOptions);
  function createRoutesModule() {
    const { dir, baseUrl, page, layout, transition } = ssgOptions;
    return `
import { formatViteImportMap, normalizePrefixPath } from "kiru/router/utils"

const dir = normalizePrefixPath("${dir}")
const baseUrl = normalizePrefixPath("${baseUrl}")
const pagesMap = import.meta.glob(["/**/${page}"])
const layoutsMap = import.meta.glob(["/**/${layout}"])
const pages = formatViteImportMap(pagesMap, dir, baseUrl)
const layouts = formatViteImportMap(layoutsMap, dir, baseUrl)
const transition = ${transition}

export { dir, baseUrl, pages, layouts, transition }
`;
  }
  function createEntryServerModule() {
    return `
import {
  render as kiruServerRender,
  generateStaticPaths as kiruServerGenerateStaticPaths
} from "kiru/router/server"
import Document from "${userDoc}"
import { baseUrl, pages, layouts } from "${VIRTUAL_ROUTES_ID}"

export async function render(url, ctx) {
  const { registerModule, registerPreloadedPageProps } = ctx
  return kiruServerRender(url, { registerModule, registerPreloadedPageProps, Document, baseUrl, pages, layouts })
}

export async function generateStaticPaths() {
  return kiruServerGenerateStaticPaths(pages)
}
`;
  }
  function createEntryClientModule() {
    return `
import { initClient } from "kiru/router/client"
import { dir, baseUrl, pages, layouts, transition } from "${VIRTUAL_ROUTES_ID}"
import "${userDoc}"

initClient({ dir, baseUrl, pages, layouts, transition })
`;
  }
  return {
    [VIRTUAL_ROUTES_ID]: createRoutesModule,
    [VIRTUAL_ENTRY_SERVER_ID]: createEntryServerModule,
    [VIRTUAL_ENTRY_CLIENT_ID]: createEntryClientModule
  };
}

// src/config.ts
var defaultEsBuildOptions = {
  jsxInject: `import { createElement as _jsx, Fragment as _jsxFragment } from "kiru"`,
  jsx: "transform",
  jsxFactory: "_jsx",
  jsxFragment: "_jsxFragment",
  loader: "tsx",
  include: ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"]
};
var defaultSSGOptions = {
  baseUrl: "/",
  dir: "src/pages",
  document: "document.{tsx,jsx}",
  page: "index.{tsx,jsx}",
  layout: "layout.{tsx,jsx}",
  transition: false,
  build: {
    maxConcurrentRenders: 100
  }
};
function createPluginState(opts = {}) {
  let fileLinkFormatter = (path8, line) => `vscode://file/${path8}:${line}`;
  let dtClientPathname = "/__devtools__";
  if (typeof opts.devtools === "object") {
    fileLinkFormatter = opts.devtools.formatFileLink ?? fileLinkFormatter;
  }
  if (!dtClientPathname.startsWith("/")) {
    throw new Error(
      "[vite-plugin-kiru]: devtools.dtClientPathname must start with '/'"
    );
  }
  const state = {
    projectRoot: process.cwd().replace(/\\/g, "/"),
    includedPaths: [],
    fileLinkFormatter,
    dtClientPathname,
    dtHostScriptPath: "/__devtools_host__.js",
    manifestPath: "vite-manifest.json",
    loggingEnabled: opts.loggingEnabled === true,
    features: {
      staticHoisting: opts.experimental?.staticHoisting === true
    },
    ssgOptions: null
  };
  const { ssg } = opts;
  if (!ssg) return state;
  if (ssg === true) {
    return {
      ...state,
      ssgOptions: defaultSSGOptions
    };
  }
  if (ssg.baseUrl && !ssg.baseUrl.startsWith("/")) {
    throw new Error("[vite-plugin-kiru]: ssg.baseUrl must start with '/'");
  }
  const {
    baseUrl,
    dir,
    document,
    page,
    layout,
    transition,
    build: { maxConcurrentRenders }
  } = defaultSSGOptions;
  return {
    ...state,
    ssgOptions: {
      ...ssg,
      baseUrl: ssg.baseUrl ?? baseUrl,
      dir: ssg.dir ?? dir,
      document: ssg.document ?? document,
      page: ssg.page ?? page,
      layout: ssg.layout ?? layout,
      transition: ssg.transition ?? transition,
      sitemap: ssg.sitemap,
      build: {
        maxConcurrentRenders: ssg.build?.maxConcurrentRenders ?? maxConcurrentRenders
      }
    }
  };
}
function createViteConfig(config, opts) {
  if (!opts.ssg) {
    return {
      ...config,
      esbuild: {
        ...defaultEsBuildOptions,
        ...config.esbuild
      }
    };
  }
  const isSsrBuild = config.build?.ssr;
  const rollup = config.build?.rollupOptions ?? {};
  let input = rollup.input;
  if (!input) {
    input = isSsrBuild ? VIRTUAL_ENTRY_SERVER_ID : VIRTUAL_ENTRY_CLIENT_ID;
  }
  const ssr = isSsrBuild === true ? true : config.build?.ssr;
  const baseOut = config.build?.outDir ?? "dist";
  const desiredOutDir = isSsrBuild ? `${baseOut}/server` : `${baseOut}/client`;
  return {
    ...config,
    appType: "custom",
    esbuild: {
      ...defaultEsBuildOptions,
      ...config.esbuild
    },
    server: {},
    build: {
      ...config.build,
      ssr,
      manifest: "vite-manifest.json",
      outDir: desiredOutDir,
      rollupOptions: {
        ...rollup,
        output: {
          manualChunks: ssr ? {} : { kiru: ["kiru", "kiru/router", "kiru/router/client"] }
        },
        input
      }
    }
  };
}
function updatePluginState(state, config, opts) {
  const isProduction = config.isProduction ?? false;
  const isBuild = config.command === "build";
  const isSSRBuild = !!config.build?.ssr;
  const devtoolsEnabled = opts.devtools !== false && !isBuild && !isProduction;
  const projectRoot = config.root.replace(/\\/g, "/") ?? process.cwd().replace(/\\/g, "/");
  const includedPaths = (opts.include ?? []).map(
    (p) => path3.resolve(projectRoot, p).replace(/\\/g, "/")
  );
  const outDir = config.build.outDir ?? "dist";
  const normalizedOut = outDir.replace(/\\/g, "/");
  const baseOutDir = normalizedOut.replace(/\/(server|client)$/i, "") || "dist";
  return {
    ...state,
    isProduction,
    isBuild,
    isSSRBuild,
    devtoolsEnabled,
    projectRoot,
    includedPaths,
    outDir,
    baseOutDir,
    // Ensure all required fields are present
    loggingEnabled: state.loggingEnabled ?? false,
    fileLinkFormatter: state.fileLinkFormatter,
    dtClientPathname: state.dtClientPathname,
    dtHostScriptPath: state.dtHostScriptPath,
    manifestPath: state.manifestPath,
    features: {
      staticHoisting: state.features?.staticHoisting ?? false
    },
    ssgOptions: state.ssgOptions,
    staticProps: {}
  };
}

// ../devtools-host/dist/index.js
var dist_default = `var Rg=Object.create;var so=Object.defineProperty;var Og=Object.getOwnPropertyDescriptor;var Ig=Object.getOwnPropertyNames;var Ng=Object.getPrototypeOf,Lg=Object.prototype.hasOwnProperty;var Vg=(e,t,n)=>t in e?so(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var M=(e,t)=>()=>(e&&(t=e(e=0)),t);var zg=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Wr=(e,t)=>{for(var n in t)so(e,n,{get:t[n],enumerable:!0})},Fg=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ig(t))!Lg.call(e,s)&&s!==n&&so(e,s,{get:()=>t[s],enumerable:!(i=Og(t,s))||i.enumerable});return e};var Hg=(e,t,n)=>(n=e!=null?Rg(Ng(e)):{},Fg(t||!e||!e.__esModule?so(n,"default",{value:e,enumerable:!0}):n,e));var F=(e,t,n)=>Vg(e,typeof t!="symbol"?t+"":t,n);var jr,O,ct,dt=M(()=>{"use strict";jr="production";if(jr!=="development"&&jr!=="production")throw new Error("NODE_ENV must either be set to development or production.");O=jr==="development",ct="window"in globalThis&&typeof window<"u"});var $r,On,Jt,Ur,re,Ye,ri,Wi,Gr,ai,ae,le,In,Qt,Ke,ji,Nc,Yr,oo,Lc,ut=M(()=>{"use strict";$r=Symbol.for("kiru.signal"),On=Symbol.for("kiru.context"),Jt=Symbol.for("kiru.fragment"),Ur=Symbol.for("kiru.error"),re=Symbol.for("kiru.hmrAccept"),Ye=Symbol.for("kiru.errorBoundary"),ri=Symbol.for("kiru.streamData"),Wi=Symbol.for("kiru.devFileLink"),Gr=50,ai="kiru:deferred",ae=2,le=4,In=8,Qt=16,Ke=128,ji=/^on:?/,Nc=new Set(["kiru-head-outlet","kiru-body-outlet","area","base","br","col","embed","hr","img","input","link","meta","source","track","wbr"]),Yr=new Set(["animateTransform","circle","clipPath","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feMerge","feMergeNode","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","path","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","title","tspan","use"]),oo=new Set(["allowfullscreen","autofocus","autoplay","async","checked","compact","controls","contenteditable","declare","default","defer","disabled","download","hidden","inert","ismap","multiple","nohref","noresize","noshade","novalidate","nowrap","open","popover","readonly","required","sandbox","scoped","selected","sortable","spellcheck","translate","wrap"]),Lc=new Map([["acceptCharset","accept-charset"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["httpEquiv","http-equiv"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]])});var Vc=M(()=>{"use strict"});function zc(e){return typeof e=="string"||typeof e=="number"||typeof e=="bigint"||typeof e=="boolean"||e===void 0||e===null}var Fc=M(()=>{"use strict"});var K,mt,Hc,Nn,ro,yt=M(()=>{"use strict";dt();K={current:null},mt={current:ct?"dom":"string"},Hc={current:"dynamic"},Nn=new WeakMap,ro=[]});function Kr(){let e=document.activeElement;e===document.body||!(e instanceof HTMLElement)||(e.addEventListener("blur",Bc),Ln=e)}function Xr(){Ln&&(Ln.removeEventListener("blur",Bc),Ln.isConnected&&Ln.focus(),Ln=null)}function qr(e){return t=>{if(Ln){t.preventDefault(),t.stopPropagation();return}e(t)}}function Bc(e){e.preventDefault(),e.stopPropagation()}var Ln,Zr=M(()=>{"use strict";Ln=null});function lo(e){let{dom:t,prev:n,props:i,cleanups:s}=e,o=n?.props??{},r=i??{};if(Qg(t)){let p=r.nodeValue;if(O&&L.isSignal(p)&&(p=et(p)),!L.isSignal(p)){t.nodeValue!==p&&(t.nodeValue=p);return}if(o.nodeValue===p)return;t.nodeValue=String(p.peek()??""),O&&(s?.nodeValue?.(),At(e,"nodeValue",p.subscribe((b,x)=>{b!==x&&(t.nodeValue=String(b??""),ct&&window.__kiru?.profilingContext?.emit("signalTextUpdate",Rt(e)))})));return}if(!n){Ug(e,t,r,s);let p=r.ref;p&&Vn(p,t);return}let a=new Set,l,c;for(let p in o){let b=o[p],x=r[p];if(b!==x){if(p.length>=2&&p.charCodeAt(0)===111&&p.charCodeAt(1)===110&&!x){c??(c=fn.get(e)??{}),fn.set(e,c);let y=p.replace(ji,""),w=c[y];w&&(t.removeEventListener(y,w),delete c[y]);continue}L.isSignal(b)&&s?.[p]&&(s[p](),delete s[p]),a.add(p)}}for(let p in r)(!(p in o)||o[p]!==r[p])&&a.add(p);let u=Array.from(a);if(ao(t)&&u.length>1){let p=a,b=!1,x=!1,y=[],w=!1,_=!1;for(let E in r){let T=E.length>=2&&E.charCodeAt(0)===111&&E.charCodeAt(1)===110;T?w=!0:_=!0;let A=!T&&E.startsWith("bind:")?E.slice(5):E,R=$c(A,T);R===1?(b=!0,p.has(E)&&(x=!0)):R===5&&y.push(E)}if(b&&x)for(let E of y)!p.has(E)&&E in r&&(u.push(E),p.add(E));(b&&x||w&&_)&&u.length>1&&jc(u)}for(let p=0;p<u.length;p++){let b=u[p],x=o[b],y=r[b];if(!Qr.has(b)){if(b.length>=2&&b.charCodeAt(0)===111&&b.charCodeAt(1)===110){c??(c=fn.get(e)??{}),fn.set(e,c);let w=b.replace(ji,""),_=c[w];if(!y){_&&(t.removeEventListener(w,_),delete c[w]);continue}let S=y.bind(void 0);if((w==="focus"||w==="blur")&&(S=qr(S)),_){_.handleEvent=S;continue}t.addEventListener(w,c[w]={handleEvent:S});continue}if(L.isSignal(y)){Gc(e,t,b,y,x);continue}if(b==="style"&&typeof y=="object"&&y!==null){if(s?.style&&(s.style(),delete s.style),l||(l=new Map),co(t,y,x,!0),l.size>0){let w=[];for(let[_,S]of l.entries())w.push(S.subscribe(_.startsWith("--")?E=>Ui(t,_,E):E=>Gi(t,_,E)));l.clear(),At(e,"style",()=>w.forEach(_=>_()))}continue}Yi(t,b,y,x)}}let d=o.ref,f=r.ref;d!==f&&(d&&Vn(d,null),f&&Vn(f,t))}function Wc(e,t,n,i){let s;for(let r in n){let a=n[r];if(!Qr.has(r)){if(r.length>=2&&r.charCodeAt(0)===111&&r.charCodeAt(1)===110){s??(s=fn.get(e)??{}),fn.set(e,s);let l=r.replace(ji,""),c=s[l];c&&(t.removeEventListener(l,c),delete s[l]);continue}if(L.isSignal(a)&&i?.[r]){i[r](),delete i[r];continue}if(r==="style"){i?.style&&(i.style(),delete i.style),ao(t)&&co(t,void 0,a);continue}ao(t)&&Yi(t,r,void 0,a)}}let o=n.ref;o&&Vn(o,null)}function Ug(e,t,n,i){let s=Object.keys(n);ao(t)&&s.length>1&&jc(s);let o;for(let r=0;r<s.length;r++){let a=s[r],l=n[a];if(!Qr.has(a)){if(a.length>=2&&a.charCodeAt(0)===111&&a.charCodeAt(1)===110){if(!l)continue;o??(o=fn.get(e)??{}),fn.set(e,o);let c=a.replace(ji,""),u=o[c],d=l.bind(void 0);(c==="focus"||c==="blur")&&(d=qr(d)),u?u.handleEvent=d:t.addEventListener(c,o[c]={handleEvent:d});continue}if(L.isSignal(l)){Gc(e,t,a,l,void 0);continue}if(a==="style"&&typeof l=="object"&&l!==null){if(co(t,l,void 0,!0),$i.size>0){i??(i={});for(let[c,u]of $i.entries()){let d=\`style-\${c}\`;i[d]?.(),i[d]=u.subscribe(c.startsWith("--")?f=>Ui(t,c,f):f=>Gi(t,c,f))}$i.clear()}continue}Yi(t,a,l,void 0)}}}function jc(e){if(e.length<=1)return;for(let n=0;n<7;n++)Jr[n].length=0;for(let n=0;n<e.length;n++){let i=e[n],s=i.length>=2&&i.charCodeAt(0)===111&&i.charCodeAt(1)===110,o=i;!s&&i.length>5&&i.charCodeAt(4)===58&&(o=i.slice(5));let r=$c(o,s),a;r<=0?a=0:r===1?a=1:r===2?a=2:r===3?a=3:r===5?a=4:r>=9?a=6:a=5,Jr[a].push(i)}let t=0;for(let n=0;n<7;n++){let i=Jr[n];for(let s=0;s<i.length;s++)e[t++]=i[s]}}function $c(e,t){if(t)return 9;switch(e){case"innerHTML":case"type":case"muted":case"autoplay":case"loop":return 0;case"min":case"max":case"step":case"pattern":case"accept":case"multiple":case"preload":case"minLength":case"maxLength":case"crossOrigin":case"decoding":case"loading":case"referrerPolicy":return 1;case"style":case"className":return 3;case"value":case"checked":case"selected":case"open":case"src":return 5;default:return 4}}function Uc(e,t){if(!e.multiple||t===void 0||t===null||t===""){e.value=t;return}let n=e.options,i=n.length;for(let s=0;s<i;s++){let o=n[s];o.selected=t.indexOf(o.value)>-1}}function Gc(e,t,n,i,s){let o=n.indexOf(":"),r=o===-1?n:n.slice(0,o),a=o===-1?void 0:n.slice(o+1);if(r==="bind"){let u=Wg[a];if(!u){O&&console.error(\`[kiru]: \${a} is not a valid element binding attribute.\`);return}let d=i.peek(),f=Gg(e,t,a,u,i,d);At(e,n,f)}else{let u=i.subscribe((d,f)=>{d!==f&&(Yi(t,n,d,f),O&&Kc(e))});At(e,n,u)}let l=i.peek(),c=Z(s);r!=="bind"&&l!==c&&Yi(t,a??r,l,c)}function Gg(e,t,n,i,s,o){let r=b=>{s.sneak(b),s.notify(x=>x!==l)},a=t.nodeName==="SELECT"&&n==="value"?b=>Uc(t,b):b=>t[n]=b,l=b=>{a(b),O&&Kc(e)},c,u;n==="value"?(c=qg(t),u=()=>r(c())):u=()=>{let b=t[n];n==="currentTime"&&s.peek()===b||r(b)},o!==void 0&&l(o);let d;n==="value"&&c?d=c():d=t[n];let f=s.peek();d!==f&&r(d),t.addEventListener(i,u);let p=s.subscribe(l);return()=>{t.removeEventListener(i,u),p()}}function Yi(e,t,n,i){switch(t){case"style":return co(e,n,i);case"className":return Xg(e,n);case"innerHTML":return Kg(e,n);case"muted":e.muted=!!n;return;case"value":if(e.nodeName==="SELECT")return Uc(e,n);let s=n==null?"":String(n);if($g.has(e.nodeName)){e.value=s;return}e.setAttribute("value",s);return;case"checked":if(e.nodeName==="INPUT"){e.checked=!!n;return}e.setAttribute("checked",String(n));return;default:return Yg(e,ea(t),n)}}function Yg(e,t,n){let i=oo.has(t);Yc(e,t,n,i)||e.setAttribute(t,i&&typeof n=="boolean"?"":String(n))}function Kg(e,t){if(t==null||typeof t=="boolean"){e.innerHTML="";return}e.innerHTML=String(t)}function Xg(e,t){let n=Z(t);if(!n)return e.removeAttribute("class");e.setAttribute("class",n)}function Ui(e,t,n){if(n==null){e.style.removeProperty(t);return}e.style.setProperty(t,String(n))}function Gi(e,t,n){e.style[t]=n!=null?String(n):""}function co(e,t,n,i=!1){if(Yc(e,"style",t))return;let s=Z(t);if(s==null){e.removeAttribute("style");return}if(typeof s=="string"){e.setAttribute("style",s);return}let o={},r=Z(n);typeof r=="string"?e.setAttribute("style",""):typeof r=="object"&&r!==null&&(o=r);let a=s,l=Object.keys(o),c=Object.keys(a);if(l.length===0){for(let d=0;d<c.length;d++){let f=c[d],p=a[f],b=Z(p);i&&L.isSignal(p)&&$i.set(f,p),f.startsWith("--")?Ui(e,f,b):Gi(e,f,b)}return}let u=new Set(c);for(let d=0;d<l.length;d++){let f=l[d];u.has(f)||(f.startsWith("--")?Ui(e,f,void 0):Gi(e,f,void 0))}for(let d=0;d<c.length;d++){let f=c[d],p=a[f],b=Z(o[f]),x=Z(p);i&&L.isSignal(p)&&$i.set(f,p),b!==x&&(f.startsWith("--")?Ui(e,f,x):Gi(e,f,x))}}function Yc(e,t,n,i=!1){if(n===null)return e.removeAttribute(t),!0;switch(typeof n){case"undefined":case"function":case"symbol":return e.removeAttribute(t),!0;case"boolean":if(i&&!n)return e.removeAttribute(t),!0}return!1}function qg(e){return e.nodeName==="INPUT"?Zg(e):e.nodeName==="SELECT"?()=>Jg(e):()=>e.value}function Zg(e){let t=e.type;return jg.has(t)?()=>e.valueAsNumber:()=>e.value}function Jg(e){return e.multiple?Array.from(e.selectedOptions).map(t=>t.value):e.value}function Kc(e){ct&&window.__kiru?.profilingContext?.emit("signalAttrUpdate",Rt(e))}function ao(e){return e.nodeType===1}function Qg(e){return e.nodeType===3}var fn,Qr,Jr,Wg,jg,$g,$i,ta=M(()=>{"use strict";q();ce();zn();ut();dt();Zr();fn=new WeakMap,Qr=new Set(["children","ref","key"]),Jr=[[],[],[],[],[],[],[]],Wg={value:"input",checked:"change",open:"toggle",volume:"volumechange",playbackRate:"ratechange",currentTime:"timeupdate"},jg=new Set(["progress","meter","number","range"]),$g=new Set(["INPUT","TEXTAREA"]);$i=new Map});var Ki,Fn,ye,na=M(()=>{"use strict";Ki=[],Fn=[],ye={bumpChildIndex(){Fn[Fn.length-1]++},getCurrentChild(){let e=Fn[Fn.length-1];return this.getCurrentParent().childNodes[e]},getCurrentParent(){return Ki[Ki.length-1]},clear(){Ki.length=0,Fn.length=0},pop(){Ki.pop(),Fn.pop()},push(e){Ki.push(e),Fn.push(0)}}});function tm(e){let t=e,n=[];for(;t&&t.parent;)typeof t.type=="function"?n.push(em(t.type)):typeof t.type=="string"&&n.push(t.type),t=t.parent;let i=typeof e.type=="function"?e:ia(e,s=>typeof s.type=="function");return\`The above error occurred in the <\${qc(i?.type||Zc)}> component:

\${n.map(s=>\`   at \${s}\`).join(\`
\`)}
\`}function em(e){let t=qc(e);if(O){let n=nm(e);n&&(t=\`\${t} (\${n})\`)}return t}function qc(e){return e.displayName??(e.name||"Anonymous Function")}function nm(e){return e.toString().match(/\\/\\/ \\[kiru_devtools\\]:(.*)/)?.[1]??null}var Xc,_t,li=M(()=>{"use strict";ut();dt();q();_t=class extends Error{constructor(t){let n=typeof t=="string"?t:t.message;super(n),this[Xc]=!0,typeof t!="string"&&(O&&t?.vNode&&(this.customNodeStack=tm(t.vNode)),this.fatal=t?.fatal)}static isKiruError(t){return t instanceof Error&&t[Ur]===!0}};Xc=Ur});function oa(e){let t=e.type;return t=="#text"?rm(e):Yr.has(t)?document.createElementNS("http://www.w3.org/2000/svg",t):document.createElement(t)}function ra(e){let t=e.type==="#text"?om(e):ye.getCurrentChild();if(ye.bumpChildIndex(),!t)throw new _t({message:"Hydration mismatch - no node found",vNode:e});let n=t.nodeName;if(Yr.has(n)||(n=n.toLowerCase()),e.type!==n)throw new _t({message:\`Hydration mismatch - expected node of type \${e.type.toString()} but received \${n}\`,vNode:e});if(e.dom=t,e.type!=="#text"&&!(e.flags&Qt)){lo(e);return}L.isSignal(e.props.nodeValue)&&sa(e,t,e.props.nodeValue);let i=e,s=e.sibling;for(;s&&s.type==="#text";){let o=s;ye.bumpChildIndex();let r=String(Z(i.props.nodeValue)??""),a=i.dom.splitText(r.length);o.dom=a,L.isSignal(o.props.nodeValue)&&sa(o,a,o.props.nodeValue),i=s,s=s.sibling}}function Jc(e){let t=e.parent,n=t?.dom;for(;t&&!n;)t=t.parent,n=t?.dom;if(!n||!t){if(!e.parent&&e.dom)return e;throw new _t({message:"No DOM parent found while attempting to place node.",vNode:e})}return t}function Qc(e,t){let{node:n,lastChild:i}=t,s=e.dom;if(i){i.after(s);return}let o=im(e,n);if(o){n.dom.insertBefore(s,o);return}n.dom.appendChild(s)}function im(e,t){let n=e;for(;n;){let i=n.sibling;for(;i;){if(!(i.flags&(le|Qt))){let s=sm(i);if(s?.isConnected)return s}i=i.sibling}if(n=n.parent,!n||n.flags&Qt||n===t)return}}function sm(e){let t=e;for(;t;){if(t.dom)return t.dom;if(t.flags&Qt)return;t=t.child}}function om(e){let t=e.props.nodeValue;if(!L.isSignal(t))return ye.getCurrentChild();let n=t.peek();if(hn(n))return ye.getCurrentChild();let i=tu(e,t),s=ye.getCurrentChild();return s?(s.before(i),i):ye.getCurrentParent().appendChild(i)}function sa(e,t,n){O&&(n=et(n));let i=n.subscribe((s,o)=>{s!==o&&(t.nodeValue=s,O&&ct&&window.__kiru?.profilingContext?.emit("signalTextUpdate",Rt(e)))});At(e,"nodeValue",i)}function rm(e){let{nodeValue:t}=e.props;return L.isSignal(t)?tu(e,t):document.createTextNode(t)}function tu(e,t){O&&(t=et(t));let n=t.peek()??"",i=document.createTextNode(n);return sa(e,i,t),i}var aa=M(()=>{"use strict";ut();ce();zn();na();q();li();dt();ta()});function ca(e){if(mt.current==="hydrate")return pn(e,uo);let t={node:e.dom?e:Jc(e)};la(e,t,(e.flags&le)>0),e.dom&&!(e.flags&Qt)&&eu(e,t,!1),uo(e)}function la(e,t,n){let i=e.child;for(;i;)i.dom?(la(i,{node:i},!1),i.flags&Qt||eu(i,t,n)):la(i,t,(i.flags&le)>0||n),uo(i),i=i.sibling}function eu(e,t,n){if((n||!e.dom.isConnected||e.flags&le)&&Qc(e,t),O&&e.prev&&Xi()){let{dom:i,prev:s,cleanups:o}=e;Wc(e,i,s.props,o),e.prev=null}(!e.prev||e.flags&ae)&&lo(e),t.lastChild=e.dom}function ua(e){e===e.parent?.child&&(e.parent.child=e.sibling);let t;O&&(t=Rt(e)),pn(e,n=>{let{subs:i,cleanups:s,dom:o,props:{ref:r},hooks:a}=n;if(i?.forEach(l=>l()),s&&Object.values(s).forEach(l=>l()),a){let{preCleanups:l,postCleanups:c}=a;ro.push(...c),l.forEach(Ft),l.length=c.length=0}O&&(window.__kiru.profilingContext?.emit("removeNode",t),o instanceof Element&&delete o.__kiruNode),o&&(o.isConnected&&!(n.flags&Qt)&&o.remove(),r&&Vn(r,null),delete n.dom)}),e.parent=null}var nu=M(()=>{"use strict";q();ut();dt();yt();qi();ta();aa()});var iu=M(()=>{"use strict";nu();Zr();aa()});function g(e,t=null,...n){e===kt&&(e=Jt);let i=t===null?{}:t,s=da(i.key),o=n.length;return o===1?i.children=n[0]:o>1&&(i.children=n),{type:e,key:s,props:i}}function kt({children:e,key:t}){return{type:Jt,key:da(t),props:{children:e}}}var ci=M(()=>{"use strict";ut();q()});function fo(e,t=null,n={},i=null,s=0){e===kt&&(e=Jt);let o=t?t.depth+1:0;return{type:e,key:i,props:n,parent:t,index:s,depth:o,flags:0,child:null,sibling:null,prev:null,deletions:null}}var fa=M(()=>{"use strict";ut();ci()});function go(e,t){return O&&(ga=Rt(e)),Array.isArray(t)?(O&&(cu in t&&dm(e,t),um(e,t)),lm(e,t)):am(e,t)}function am(e,t){let n=e.child;if(n===null)return au(e,t);let i=n.sibling,s=ou(e,n,t);if(s!==null)return n&&n!==s&&!s.prev?pa(e,n):i&&pa(e,i),s;{let o=uu(n),r=lu(o,e,0,t);if(r!==null){let a=r.prev;if(a!==null){let l=a.key;o.delete(l===null?a.index:l)}ho(r,0,0)}return o.forEach(a=>po(e,a)),r}}function lm(e,t){let n=null,i=null,s=e.child,o=null,r=0,a=0;for(;s!==null&&a<t.length;a++){s.index>a?(o=s,s=null):o=s.sibling;let c=ou(e,s,t[a]);if(c===null){s===null&&(s=o);break}s&&!c.prev&&po(e,s),r=ho(c,r,a),i===null?n=c:i.sibling=c,i=c,s=o}if(a===t.length)return pa(e,s),n;if(s===null){for(;a<t.length;a++){let c=au(e,t[a]);c!==null&&(r=ho(c,r,a),i===null?n=c:i.sibling=c,i=c)}return n}let l=uu(s);for(;a<t.length;a++){let c=lu(l,e,a,t[a]);if(c!==null){let u=c.prev;if(u!==null){let d=u.key;l.delete(d===null?u.index:d)}r=ho(c,r,a),i===null?n=c:i.sibling=c,i=c}}return l.forEach(c=>po(e,c)),n}function ou(e,t,n){let i=t===null?null:t.key;return hn(n)?i!==null||t?.type==="#text"&&L.isSignal(t.props.nodeValue)?null:su(e,t,""+n):L.isSignal(n)?t&&t.props.nodeValue!==n?null:su(e,t,n):ui(n)?n.key!==i?null:cm(e,t,n):Array.isArray(n)?i!==null?null:(O&&ma(n),ru(e,t,n)):null}function su(e,t,n){return t===null||t.type!=="#text"?Pe(e,"#text",{nodeValue:n}):(O&&Zi(),t.props.nodeValue!==n&&(t.props.nodeValue=n,t.flags|=ae),t.sibling=null,t)}function cm(e,t,n){let{type:i,props:s,key:o}=n;return O&&typeof i=="function"&&(i=et(i)),i===Jt?ru(e,t,s.children||[],s):t?.type===i?(O&&Zi(),t.index=0,t.sibling=null,typeof i=="string"?hu(t.props,s)&&(t.flags|=ae):t.flags|=ae,t.props=s,t):Pe(e,i,s,o)}function ru(e,t,n,i={}){return t===null||t.type!==Jt?Pe(e,Jt,{children:n,...i}):(O&&Zi(),t.props={...t.props,...i,children:n},t.flags|=ae,t.sibling=null,t)}function au(e,t){return hn(t)?Pe(e,"#text",{nodeValue:""+t}):L.isSignal(t)?Pe(e,"#text",{nodeValue:t}):ui(t)?Pe(e,t.type,t.props,t.key):Array.isArray(t)?(O&&ma(t),Pe(e,Jt,{children:t})):null}function ho(e,t,n){e.index=n;let i=e.prev;if(i!==null){let s=i.index;return s<t?(e.flags|=le,t):s}else return e.flags|=le,t}function lu(e,t,n,i){if(L.isSignal(i)||hn(i)){let o=e.get(n);if(o){if(o.props.nodeValue===i)return o;o.type==="#text"&&L.isSignal(o.props.nodeValue)&&o.cleanups?.nodeValue?.()}return Pe(t,"#text",{nodeValue:i},null,n)}if(ui(i)){let{type:o,props:r,key:a}=i,l=e.get(a===null?n:a);return l?.type===o?(O&&Zi(),typeof o=="string"?hu(l.props,r)&&(l.flags|=ae):l.flags|=ae,l.props=r,l.sibling=null,l.index=n,l):Pe(t,o,r,a,n)}if(Array.isArray(i)){let o={children:i},r=e.get(n);return O&&ma(i),r?(O&&Zi(),r.flags|=ae,r.props=o,r):Pe(t,Jt,o,null,n)}return null}function Zi(){ct&&window.__kiru.profilingContext?.emit("updateNode",ga)}function ma(e){Object.assign(e,{[cu]:!0})}function uu(e){let t=new Map;for(;e;){let n=e.key;t.set(n===null?e.index:n,e),e=e.sibling}return t}function po(e,t){e.deletions===null?e.deletions=[t]:e.deletions.push(t)}function pa(e,t){for(;t;)po(e,t),t=t.sibling}function um(e,t){let n=new Set,i=!1;for(let s of t){if(!ui(s))continue;let o=s.key;if(typeof o=="string"){if(!i&&n.has(o)){let r=fu(e);du(\`\${r} component produced a child in a list with a duplicate key prop: "\${o}". Keys should be unique so that components maintain their identity across updates\`),i=!0}n.add(o)}}}function dm(e,t){let n=!1,i=!1;for(let s of t)ui(s)&&(typeof s.key=="string"?n=!0:i=!0);if(i&&n){let s=fu(e);du(\`\${s} component produced a child in a list without a valid key prop\`)}}function du(e){let t=\`[kiru]: \${e}. See https://kirujs.dev/keys-warning for more information.\`;console.error(t)}function fu(e){if(ha.has(e))return ha.get(e);let t=e.parent,n;for(;!n&&t;)typeof t.type=="function"&&(n=t.type),t=t.parent;let i=\`<\${n?.displayName||n?.name||"Anonymous Function"} />\`;return ha.set(e,i),i}function Pe(e,t,n,i=null,s=0){let o=fo(t,e,n,i,s);return o.flags|=le,O&&ct&&window.__kiru.profilingContext?.emit("createNode",ga),o}function hu(e,t){return mo(e,t,fm)}var ga,cu,ha,fm,pu=M(()=>{"use strict";ut();q();ce();dt();fa();cu=Symbol("kiru:marked-list-child");ha=new WeakMap;fm=["children","key"]});function Ji(e){if(di){ba.push(e);return}e()}function mn(){di&&(window.cancelAnimationFrame(bu),yu())}function ka(e){e.flags|=Ke,Ae.push(e),di=!0,mn()}function Ht(e){if(mt.current==="hydrate")return Ji(()=>gu(e));gu(e)}function xu(){let e=K.current;if(!e)throw new Error("useRequestUpdate must be called inside a Kiru component");return()=>Ht(e)}function gu(e){if(xa&&(ya=!0),K.current===e){O&&window.__kiru.profilingContext?.emit("updateDirtied",De),va=!0;return}if(!(e.flags&(Ke|In))){if(e.flags|=Ke,!Ae.length){Ae.push(e),di||(di=!0,bu=window.requestAnimationFrame(yu));return}Ae.push(e)}}function hm(e){pn(e,t=>t.flags|=In),xo.push(e)}function yu(){if(O){let t=xo[0]??Ae[0];t?(De=Rt(t),window.__kiru.profilingContext?.beginTick(De)):De=null}let e=1;for(Kr();Ae.length;){Ae.length>e&&Ae.sort(wu),gn=Ae.shift(),e=Ae.length;let t=gn.flags;if(!(t&In)&&t&Ke){let n=gn;for(;n=pm(n););for(;xo.length;)ua(xo.pop());ca(gn),gn.flags&=~Ke}}if(Xr(),xa=!0,bo(mu),xa=!1,ya)return km(),bo(_a),ya=!1,wa++,O&&(window.__kiru.profilingContext?.endTick(De),window.__kiru.profilingContext?.emit("updateDirtied",De)),mn();for(wa=0,di=!1;ba.length;)ba.shift()();queueMicrotask(()=>{bo(ro),bo(_a)}),O&&(window.__kiru.emit("update",De),window.__kiru.profilingContext?.emit("update",De),window.__kiru.profilingContext?.endTick(De))}function pm(e){let t=gm(e);if(e.deletions!==null&&(e.deletions.forEach(hm),e.deletions=null),t)return t;let n=e;for(;n;){let{hooks:i}=n;if(i&&(mu.push(...i.pre),_a.push(...i.post),i.pre.length=0,i.post.length=0),n===gn)return null;if(n.sibling)return n.sibling;n=n.parent,mt.current==="hydrate"&&n?.dom&&ye.pop()}return null}function gm(e){let{type:t,props:n,prev:i,flags:s}=e;if(!(O&&Xi())){if(i&&(s&Ke)===0&&(i.props===n||!mo(i.props,n)))return null}try{return typeof t=="string"?_m(e):yo(t)?mm(e):bm(e)}catch(o){O&&window.__kiru.emit("error",De,o instanceof Error?o:new Error(String(o)));let r=vu(e);if(r){let a=r.error=o instanceof Error?o:new Error(String(o));return r.props.onError?.(a),r.depth<gn.depth&&(gn=r),r}if(_t.isKiruError(o)){if(o.customNodeStack&&setTimeout(()=>{throw new Error(o.customNodeStack)}),o.fatal)throw o;return console.error(o),e.child}setTimeout(()=>{throw o})}return null}function mm(e){let{props:t,type:n}=e,i=t.children;if(n===Ye){let s=e,{error:o}=s;o&&(i=typeof t.fallback=="function"?t.fallback(o):t.fallback,delete s.error)}return e.child=go(e,i)}function bm(e){let{type:t,props:n,subs:i}=e,s=(e.flags&Ke)===0;try{K.current=e;let o,r=0;do{if(e.flags&=~Ke,va=!1,i&&(i.forEach(Ft),i.clear()),O&&Xi()){let{hooks:a,cleanups:l}=e;if(l&&(Object.values(l).forEach(Ft),delete e.cleanups),a){let{preCleanups:c,postCleanups:u}=a;c.forEach(Ft),u.forEach(Ft),c.length=u.length=0}delete e.propSyncs,delete e.render}if(o=wm(e,t,n,s),++r>Gr){if(O)throw new _t({message:"Too many re-renders. Kiru limits the number of renders to prevent an infinite loop.",fatal:!0,vNode:e});break}}while(va);return e.child=go(e,o)}finally{K.current=null}}function xm(e){if("displayName"in e&&typeof e.displayName=="string")return e.displayName;if("render"in e&&typeof e.render=="function")return e.render.name}function ym(e){if(typeof e.type=="string")return e.type;if(typeof e.type=="function"){let s=e.type;return s.displayName||s.name||"Anonymous"}return typeof e.type=="symbol"?e.type.description||"Symbol":"Unknown"}function vm(e,t){let n="Unknown";if(e&&typeof e=="object"){let l=xm(e);l&&(n=l)}let s="",o=t.parent;for(;o;){let a=ym(o);s+=\`
    in <\${a}>\`,o=o.parent}let r=\`[kiru] Expected a function component but got an object. This often happens when passing a React component (like one wrapped in forwardRef) to Kiru.

Component: \${n}
Component Stack:\${s}\`;throw new _t(r)}function wm(e,t,n,i){let{render:s,propSyncs:o}=e;if(s){if(i){let l={...n};o?.forEach(c=>c(l))}return s(n)}let r=et(t);typeof r!="function"&&vm(r,e);let a=r(n);if(typeof a=="function"){if(e.subs?.forEach(Ft),e.render=a,i){let l={...n};o?.forEach(c=>c(l))}a=a(n)}else if(O&&Nn.has(e))throw new Error("setup() must not be called inside a render function");return a}function _m(e){let{props:t,type:n}=e;return O&&vo(e),e.dom||(mt.current==="hydrate"?ra(e):e.dom=oa(e),O&&e.dom instanceof Element&&(e.dom.__kiruNode=e)),n!=="#text"&&(e.child=go(e,t.children),e.child&&mt.current==="hydrate"&&ye.push(e.dom)),e.child}function km(){if(wa>Gr)throw new _t("Maximum update depth exceeded. This can happen when a component repeatedly calls setState during render or in useLayoutEffect. Kiru limits the number of nested updates to prevent infinite loops.")}function bo(e){for(let t=0;t<e.length;t++)e[t]();e.length=0}var De,Ae,di,ba,xo,xa,ya,va,wa,mu,_a,bu,gn,Xe=M(()=>{"use strict";ut();iu();q();dt();li();yt();na();pu();qi();Ae=[],di=!1,ba=[],xo=[],xa=!1,ya=!1,va=!1,wa=0,mu=[],_a=[],bu=-1;gn=null});var te,Qi=M(()=>{"use strict";te=new Map});function wo(e){let{id:t,subs:n,fn:i,deps:s=[],onDepChanged:o}=e,r;te.delete(t);let a=!!K.current&&!St();a||(r=new Map,qe.stack.push(r));let l=i(...s.map(c=>c.value));if(!a){for(let[u,d]of n)r.has(u)||(d(),n.delete(u));let c=()=>{te.size||queueMicrotask(_o),te.set(t,o)};for(let[u,d]of r){if(n.has(u))continue;let f=d.subscribe(c);n.set(u,f)}qe.stack.pop()}return l}var qe,fi=M(()=>{"use strict";yt();q();Qi();zn();qe={enabled:!0,stack:new Array,current:function(){return this.stack[this.stack.length-1]}}});var _u,L,D,ce=M(()=>{"use strict";q();ut();dt();yt();Xe();fi();L=class e{constructor(t,n){this[_u]=!0,this.$id=hi(),this.$value=t,this.$subs=new Set,n&&(this.displayName=n),O&&(this.$initialValue=ku(t),this[re]={provide:()=>this,inject:s=>{ct&&window.__kiru.devtools?.untrack(s),this.$id=s.$id,this.$subs=s.$subs,this.$initialValue===s.$initialValue?this.$value=s.$value:this.notify()},destroy:()=>{}});let i=K.current;i&&At(i,this.$id,e.dispose.bind(null,this))}get value(){if(O){let t=et(this);return e.entangle(t),t.$value}return e.entangle(this),this.$value}set value(t){if(O){let n=et(this);if(Object.is(n.$value,t))return;n.$prevValue=n.$value,n.$value=t,n.notify();return}Object.is(this.$value,t)||(this.$prevValue=this.$value,this.$value=t,this.notify())}peek(){return O?et(this).$value:this.$value}sneak(t){if(O){let n=et(this);n.$prevValue=n.$value,n.$value=t;return}this.$prevValue=this.$value,this.$value=t}toString(){if(O){let t=et(this);return e.entangle(t),\`\${t.$value}\`}return e.entangle(this),\`\${this.$value}\`}subscribe(t){if(O){let n=et(this);if(O&&n.$isDisposed){let s=\`Attempted to subscribe to a signal that has been disposed: \${n.displayName??n.$id}\`;throw Wi in n&&(s+=\`
File: \${n[Wi]}\`),s+=\`
Initial value: \${n.$initialValue}\`,new Error(s)}}return this.$subs.add(t),()=>this.$subs.delete(t)}notify(t){if(O)return et(this).$subs.forEach(i=>{if(t&&!t(i))return;let{$value:s,$prevValue:o}=et(this);return i(s,o)});this.$subs.forEach(n=>{if(!(t&&!t(n)))return n(this.$value,this.$prevValue)})}static isSignal(t){return typeof t=="object"&&!!t&&$r in t}static subscribers(t){return t.$subs}static entangle(t){if(qe.enabled===!1)return;O&&(t=et(t));let n=K.current,i=qe.current();if(i){(!n||n&&St())&&i.set(t.$id,t);return}if(!n||!St())return;let s=t.subscribe(()=>Ht(n));(n.subs??(n.subs=new Set)).add(s)}static dispose(t){if(t.$isDisposed=!0,O){ct&&window.__kiru.devtools?.untrack(et(t));return}t.$subs.clear()}};_u=$r;D=(e,t)=>new L(e,t)});function Z(e,t=!1){return L.isSignal(e)?t?e.value:e.peek():e}function _o(){te.forEach(Ft),te.clear()}var zn=M(()=>{"use strict";q();ce();Qi();fi()});function ft(...e){return e.filter(Boolean).join(" ")}function ko(e){return e.replace(Sm,"&amp;").replace(Em,"&lt;").replace(Mm,"&gt;").replace(Cm,"&quot;").replace(Tm,"&#039;").replace(Pm,"&#47;")}function ea(e){switch(e){case"className":return"class";case"htmlFor":return"for";case"tabIndex":case"formAction":case"formMethod":case"formEncType":case"contentEditable":case"spellCheck":case"allowFullScreen":case"autoPlay":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"noModule":case"noValidate":case"popoverTarget":case"popoverTargetAction":case"playsInline":case"readOnly":case"itemscope":case"rowSpan":case"crossOrigin":return e.toLowerCase();default:return e.indexOf("-")>-1?e:e.startsWith("aria")?"aria-"+e.substring(4).toLowerCase():Lc.get(e)||e}}function Am(e){let t="";for(let n in e){let i=Z(e[n]);if(i==null)continue;let s=n.replace(Dm,"-$&").toLowerCase();t+=\`\${s}:\${i};\`}return t}function Rm(e){return typeof e=="string"?e:typeof e=="object"&&e?Am(e):""}function Mu(e){let t=[],{className:n,style:i,...s}=e;if(n){let r=Z(n);r&&t.push(\`class="\${r}"\`)}if(i){let r=Z(i);r&&t.push(\`style="\${Rm(r)}"\`)}let o=Object.keys(s).filter(Eu.isStringRenderableProperty);for(let r=0;r<o.length;r++){let a=o[r],l=Z(e[a]);if(l==null)continue;a=a.split("bind:")[1]??a;let c=ea(a);switch(typeof l){case"function":case"symbol":continue;case"boolean":if(oo.has(c)){l&&t.push(c);continue}}t.push(\`\${c}="\${l}"\`)}return t.join(" ")}function ku(e,t={functions:!0}){let n=new WeakSet;return JSON.stringify(e,(i,s)=>{if(typeof s=="object"&&s!==null){if(n.has(s))return"[CIRCULAR]";n.add(s)}return typeof s=="function"?t.functions?s.toString():\`[FUNCTION (\${s.name||"anonymous"})]\`:s})}var Sm,Em,Mm,Tm,Cm,Pm,Dm,Su,Eu,Tu=M(()=>{"use strict";zn();ut();Sm=/&/g,Em=/</g,Mm=/>/g,Tm=/'/g,Cm=/"/g,Pm=/\\//g,Dm=/[A-Z]/g;Su=new Set(["children","ref","key","innerHTML"]),Eu={isInternalProp:e=>Su.has(e),isEvent:e=>e.startsWith("on"),isStringRenderableProperty:e=>!Su.has(e)&&!Eu.isEvent(e)}});function Ft(e){e()}function et(e){let t=e;if(O)for(;"__next"in t;)t=t.__next;return t}function Vn(e,t){if(typeof e=="function"){e(t);return}if(L.isSignal(e)){e.value=t;return}e.current=t}function St(){return mt.current==="dom"||mt.current==="hydrate"}var Zc,Sa=M(()=>{"use strict";ce();dt();yt();Zc=Object.freeze(()=>{})});function So(e){return(e.flags&In)!==0}function Cu(e){return typeof e=="object"&&e!==null&&"type"in e}function ui(e){return typeof e=="object"&&e!==null&&"type"in e}function hn(e){return typeof e=="string"&&e!==""||typeof e=="number"||typeof e=="bigint"}function yo(e){return e===Jt||e===On||e===Ye}function Rt(e){let t=e;for(;t;){if(t.app)return e.app=t.app;t=t.parent}return null}function uo(e){let{props:t,key:n,index:i}=e;e.prev={props:t,key:n,index:i},e.flags&=~(ae|le|In)}function pn(e,t){t(e);let n=e.child;for(;n;)t(n),n.child&&pn(n,t),n=n.sibling}function ia(e,t){let n=e.parent;for(;n;){if(t(n))return n;n=n.parent}return null}function vu(e){return ia(e,t=>t.type===Ye)}function vo(e){if("children"in e.props&&e.props.innerHTML)throw new _t({message:"Cannot use both children and innerHTML on an element",vNode:e});for(let t in e.props)if("bind:"+t in e.props)throw new _t({message:\`Cannot use both bind:\${t} and \${t} on an element\`,vNode:e})}function da(e){return e===void 0?null:typeof e=="string"||typeof e=="number"?e:null}function ts(e){let t=[],n=e;for(;n;)t.push(n.index),t.push(n.depth),n=n.parent;return\`k:\${BigInt(t.join("")).toString(36)}\`}function At(e,t,n){(e.cleanups??(e.cleanups={}))[t]=n}function mo(e,t,n){let i=Object.keys(e),s=Object.keys(t);if(i.length!==s.length)return!0;for(let o of i)if(!n?.includes(o)&&e[o]!==t[o])return!0;return!1}function wu(e,t){return e.depth-t.depth}var Eo=M(()=>{"use strict";ut();z();li();yt()});function hi(e=10,t=Om){let n="";for(let i=0;i<e;i++)n+=t[Math.random()*t.length|0];return n}var Om,Pu=M(()=>{"use strict";Om="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-"});var q=M(()=>{"use strict";Vc();Fc();Tu();Sa();Eo();Pu()});function Xi(){return Ea}function Du(e){return!!e&&(typeof e=="object"||typeof e=="function")&&re in e&&typeof e[re]=="object"&&!!e[re]}function Au(){let e=new Map,t=null,n=null,i=!1,s=()=>i,o=!1,r=[];return{register:d=>{if(n===null)throw new Error("[kiru]: HMR could not register: No active module");let f=new Set;for(let[p,b]of Object.entries(d)){let x=n.hotVars.get(p);if(b.value[Wi]=b.link,x?.value&&(x.value.__next=b.value),n.hotVars.set(p,b),!!x){if(Du(x.value)&&Du(b.value)){b.value[re].inject(x.value[re].provide()),x.value[re].destroy();continue}x.type==="component"&&b.type==="component"&&window.__kiru.apps.forEach(y=>{pn(y.rootNode,w=>{w.type===x.value&&(w.type=b.value,f.add(w))})})}}f.size&&(Ea=!0,f.forEach(p=>Ht(p)),mn(),Ea=!1),i=!1,n=null,t=null},prepare:d=>{let f=e.get(d);if(i=!!f,!f)f={hotVars:new Map,unnamedEffects:[],hmrCallbacks:[]},e.set(d,f);else{for(;f.hmrCallbacks.length;)f.hmrCallbacks.shift()();for(;r.length;)r.shift()();for(let p of f.unnamedEffects)p.stop();f.unnamedEffects.length=0}n=f,t=d},isReplacement:s,moduleEffects:{registerNext(){o=!0},push(d){o&&(n.unnamedEffects.push(d),o=!1)}},onHmr:d=>{if(n){n.hmrCallbacks.push(d);return}r.push(d)},getCurrentFilePath(){return t}}}function Ru(e){"window"in globalThis&&window.__kiru.HMRContext&&window.__kiru.HMRContext.onHmr(e)}var Ea,qi=M(()=>{"use strict";ut();q();Xe();Ea=!1});function Ou(){let e=new Map,t=new Map;return{appStats:t,emit:(n,i)=>{e.get(n)?.forEach(s=>s(i))},addEventListener:(n,i)=>{e.has(n)||e.set(n,new Set),e.get(n).add(i)},removeEventListener:(n,i)=>{e.has(n)&&e.get(n).delete(i)},mountDuration:n=>{let i=t.get(n);return i?i.mountDuration:0},totalTicks:n=>{let i=t.get(n);return i?i.totalTicks:0},lastTickDuration:n=>{let i=t.get(n);if(!i)return 1/0;let s=i.timestamps[i.timestamps.length-1];return!s||(s.end===1/0&&(s=i.timestamps[i.timestamps.length-2]),!s)?1/0:s.end-s.start},averageTickDuration:n=>{let i=t.get(n);if(!i)return 0;let s=i.timestamps.filter(o=>o.end!==1/0);return s.reduce((o,r)=>o+(r.end-r.start),0)/s.length},beginTick:n=>{t.has(n)||t.set(n,{mountDuration:1/0,timestamps:[],totalTicks:0});let i=t.get(n);i.totalTicks++,i.timestamps.push({start:performance.now(),end:1/0})},endTick:n=>{let i=t.get(n),s=i.timestamps[i.timestamps.length-1];s.end=performance.now(),i.mountDuration===1/0&&(i.mountDuration=s.end-s.start),i.timestamps.length>100&&i.timestamps.shift()}}}var Iu=M(()=>{"use strict"});var Nu,Lu=M(()=>{"use strict";Nu={current:null}});function Vu(){let e=new Set,t=new Map;function n(r,a,l){t.get(r)?.forEach(c=>c(a,l))}function i(r,a){t.has(r)||t.set(r,new Set),t.get(r).add(a)}function s(r,a){t.get(r)?.delete(a)}let o={get apps(){return Array.from(e)},emit:n,on:i,off:s};if(i("mount",r=>e.add(r)),i("unmount",r=>e.delete(r)),O){o.HMRContext=Au(),o.profilingContext=Ou(),o.fileRouterInstance=Nu;let r=new Set,a=new Set;o.devtools={track:(l,c)=>{r.add({label:c??l.displayName??"Unnamed Signal",signal:l}),a.forEach(u=>u(r))},untrack:l=>{r.forEach(c=>{c.signal===l&&r.delete(c)}),a.forEach(c=>c(r))},subscribe:l=>(a.add(l),l(r),()=>a.delete(l))}}return o}var zu=M(()=>{"use strict";dt();qi();Iu();Lu()});function Ot(e,t){return new es(e,t)}var es,Fu=M(()=>{"use strict";dt();ut();q();Qi();fi();ce();es=class e extends L{constructor(t,n){if(super(void 0,n),this.$getter=t,this.$unsubs=new Map,this.$isDirty=!0,O){let{inject:i}=this[re];this[re]={provide:()=>this,inject:s=>{i(s),e.stop(s),this.$isDirty=!0,e.run(this),this.notify()},destroy:()=>{}}}}get value(){return this.ensureNotDirty(),super.value}set value(t){super.value=t}toString(){return this.ensureNotDirty(),super.toString()}peek(){return this.ensureNotDirty(),super.peek()}subscribe(t){return this.$isDirty&&e.run(this),super.subscribe(t)}static dispose(t){e.stop(t),L.dispose(t)}static stop(t){O&&(t=et(t));let{$id:n,$unsubs:i}=t;te.delete(n),i.forEach(Ft),i.clear(),t.$isDirty=!0}static run(t){O&&(t=et(t));let{$id:n,$getter:i,$unsubs:s}=t,o=wo({id:n,subs:s,fn:()=>i(t.$value),onDepChanged:()=>{t.$isDirty=!0,t.$subs.size&&(e.run(t),!Object.is(t.$value,t.$prevValue)&&t.notify())}});t.sneak(o),t.$isDirty=!1}ensureNotDirty(){let t=this;if(O&&(t=et(this)),!t.$isDirty){let n=te.get(t.$id);n&&(n(),te.delete(t.$id))}t.$isDirty&&(O&&t.$isDisposed||e.run(t))}}});function Bt(e,t){if(typeof e=="function")return new pi(e);let n=e,i=t;return new pi(i,n)}var pi,Ma=M(()=>{"use strict";dt();Qi();fi();q();yt();pi=class e{constructor(t,n){this.id=hi(),this.callback=t,this.deps=n,this.unsubs=new Map,this.isRunning=!1,this.cleanup=null,O&&ct&&window.__kiru.HMRContext.moduleEffects.push(this);let i=K.current;if(i){if(!St())return;At(i,this.id,this.stop.bind(this))}this.start()}start(){if(!this.isRunning){if(this.isRunning=!0,O&&ct&&window.__kiru.HMRContext?.isReplacement())return queueMicrotask(()=>{this.isRunning&&e.run(this)});e.run(this)}}stop(){te.delete(this.id),this.unsubs.forEach(Ft),this.unsubs.clear(),this.cleanup?.(),this.cleanup=null,this.isRunning=!1}static run(t){let n=et(t),{id:i,callback:s,unsubs:o,deps:r}=n;n.cleanup=wo({id:i,subs:o,fn:s,deps:r,onDepChanged:()=>{n.cleanup?.(),e.run(n)}})??null}}});var Hu=M(()=>{"use strict"});var ns=M(()=>{"use strict";ce();Fu();Ma();zn();Hu()});function Im(e){return async(...t)=>{let{execute:n,onError:i}=e(...t);try{return{error:null,data:await n()}}catch(s){let o=new Mo(s);return i?.(o),{error:o,data:null}}}}var Mo,Bu=M(()=>{"use strict";Mo=class extends Error{constructor(t){super("Error occurred during action execution",{cause:t})}}});function Lm(e,t,n){if(O&&t.__kiruNode)return t.__kiruNode.app;let i=Vm(t),s=Nm++,o=n?.name??\`App-\${s}\`,r={id:s,name:o,rootNode:i,render:a,unmount:l};function a(c){i.props={children:c},ka(i)}function l(){i.props={children:null},ka(i),O&&(delete t.__kiruNode,delete i.app),window.__kiru.emit("unmount",r)}return O&&(i.app=r),a(e),window.__kiru.emit("mount",r),O&&!globalThis.__KIRU_READY__&&(globalThis.__KIRU_READY__=!0,queueMicrotask(()=>{window.dispatchEvent(new Event("kiru:ready"))})),r}function Vm(e){let t=fo(e.nodeName.toLowerCase());return t.flags|=Qt,t.dom=e,O&&(e.__kiruNode=t),t}var Nm,Wu=M(()=>{"use strict";ut();dt();Xe();fa();Nm=0});function ju({children:e,fallback:t,onError:n}){return g(Ye,{children:e,fallback:t,onError:n})}var $u=M(()=>{"use strict";ut();z()});function bn(e){return{current:e}}var Ta=M(()=>{"use strict"});function Wt(e){if(!St())return;let t=K.current;if(!t)throw new Error("Cannot queue onCleanup effect outside of a component");At(t,hi(10),e)}var To=M(()=>{"use strict";yt();q()});function Co(e){return typeof e=="object"&&!!e&&ri in e}function Po(e){return e instanceof Promise&&"id"in e&&"state"in e}function zm(e){let t=K.current;if(!t)throw new Error("statefulPromise must be called inside a Kiru component");let n=ts(t),i=D(!0);i.value=!0;let s=new AbortController;Wt(()=>s.abort());let o=Uu.get(t)??0;Uu.set(t,o+1);let r=\`\${n}:data:\${o}\`,a;mt.current==="string"?a=Promise.resolve():mt.current==="hydrate"&&Hc.current==="dynamic"?a=Fm(r,s.signal):a=e(s.signal);let c=Object.assign(a,{id:r,state:"pending"});return c.then(u=>{c.state="fulfilled",c.value=u,i.value=!1}).catch(u=>{c.state="rejected",c.error=u instanceof Error?u:new Error(u)}),Object.assign(c,{isPending:i})}function Fm(e,t){return new Promise((n,i)=>{let s=window[ai]??(window[ai]=new Map),o=s.get(e);if(o){let{data:a,error:l}=o;return s.delete(e),l?i(l):n(a)}let r=a=>{let{detail:l}=a;if(l.id===e){s.delete(e),window.removeEventListener(ai,r);let{data:c,error:u}=l;if(u)return i(u);n(c)}};window.addEventListener(ai,r),t.addEventListener("abort",()=>{window.removeEventListener(ai,r),i()})})}var Uu,Do=M(()=>{"use strict";ut();yt();ce();Eo();To();Uu=new WeakMap});var ve,Gu=M(()=>{"use strict";q();ns();ut();yt();Ta();Xe();Do();ve=()=>e=>{let{from:t,children:n,fallback:i,mode:s}=e,o=bn(null),r=new Set,a;if(Po(t))r.add(t),a=t.value;else if(L.isSignal(t))a=t.value;else{let l={};for(let c in t){let u=t[c];Po(u)&&r.add(u),l[c]=u.value}a=l}if(r.size===0)return n(a);if(!St())throw{[ri]:{fallback:i,data:Array.from(r)}};for(let l of r){if(l.state==="rejected")throw l.error;if(l.state==="pending"){let c=K.current;Promise.allSettled(r).then(()=>Ht(c));let u=o.current;return s!=="fallback"&&u?n(u,!0):i}}return o.current=a,n(a,!1)}});function Ze({each:e,fallback:t,children:n}){let i=Z(e,!0);return i.length===0?t:i.map(n)}var Yu=M(()=>{"use strict";ns()});function Hm(e){function t(n){let{fallback:i=null,...s}=n,o=K.current;if(!St())return i;let r=Bm(e.toString()),a=Ku.get(r);if(!a){let l=e(),c={promise:l,result:null};return Ku.set(r,c),l.then(u=>{c.result=typeof u=="function"?u:u.default,Ht(o)}),i}return a.result===null?(a.promise.then(()=>Ht(o)),i):g(a.result,s)}return O&&(t.displayName="Kiru.lazy"),t}var Ku,Bm,Xu=M(()=>{"use strict";ci();dt();Sa();yt();Xe();Ku=ct?window.__KIRU_LAZY_CACHE??(window.__KIRU_LAZY_CACHE=new Map):new Map;Bm=e=>e.replace(/import\\((["'])([^?"']+)\\?[^)"']*\\1\\)/g,(t,n,i)=>\`import(\${n}\${i}\${n})\`)});function Wm({children:e,container:t}){let n=K.current;if(!n.dom)switch(n.flags|=Qt,mt.current){case"dom":if(n.dom=typeof t=="function"?t():t,!(n.dom instanceof HTMLElement)){if(O)throw new _t({message:\`Invalid portal container, expected HTMLElement, got \${n.dom}\`,vNode:n});return null}return e;case"hydrate":Ji(()=>Ht(n));case"stream":case"string":return null}return e}var qu=M(()=>{"use strict";ut();dt();li();yt();Xe()});function jm({children:e,when:t,fallback:n}){let i=Z(t,!0);return i?typeof e=="function"?e(i):e:n}var Zu=M(()=>{"use strict";ns()});function $m(e,t){if(typeof t=="number")return t;switch(e){case"entered":return t?.in??Ju;case"exited":return t?.out??Ju}}var gi,Ju,Qu=M(()=>{"use strict";To();ce();Ma();zn();gi=e=>{let t=D(e.initialState||"exited"),n,i=o=>{clearTimeout(n),t.value=o,(o==="entered"||o==="exited")&&e.onTransitionEnd&&e.onTransitionEnd(o)},s=o=>{n=window.setTimeout(()=>i(o),$m(o,e.duration))};return Bt(()=>{let o=Z(e.in,!0),r=t.peek();o&&r!=="entered"&&r!=="entering"?(i("entering"),s("entered")):!o&&r!=="exited"&&r!=="exiting"&&(i("exiting"),s("exited"))}),Wt(()=>clearTimeout(n)),o=>o.element(t.value)},Ju=150});var td=M(()=>{"use strict";$u();Gu();Yu();Xu();qu();Zu();Qu()});function Um(e){let t=Object.assign(({value:n,children:i})=>g(On,{value:n,ctx:t},i),{[On]:()=>e});return t.displayName="Anonymous Context",t}function Gm(e,t){let n=e.parent;for(;n;){if(n.type===On){let i=n,{ctx:s,value:o}=i.props;if(s===t)return o}n=n.parent}return t[On]()}function Ym(e){let t=K.current;if(!t)throw new Error("useContext must be called inside a Kiru component");return Gm(t,e)}var ed=M(()=>{"use strict";ut();ci();yt()});var Ca,nd=M(()=>{"use strict";Ca=class{constructor(){}static on(t,n){return window.addEventListener(t,n),()=>window.removeEventListener(t,n)}static dispatch(t,n,i){(i||document).dispatchEvent(new CustomEvent(t,{detail:n,bubbles:!0}))}}});var Pa,id=M(()=>{"use strict";(function(e){e.track=(t,n)=>{"window"in globalThis&&window.__kiru.devtools?.track(t,n)},e.untrack=t=>{"window"in globalThis&&window.__kiru.devtools?.untrack(t)},e.subscribe=t=>!("window"in globalThis)||!window.__kiru.devtools?()=>{}:window.__kiru.devtools.subscribe(t)})(Pa||(Pa={}))});function is(){let e=K.current;return e?e.hooks??(e.hooks={pre:[],preCleanups:[],post:[],postCleanups:[]}):null}function ss(e,t){return()=>{let n=e();typeof n=="function"&&t.push(n)}}var Ao=M(()=>{"use strict";yt()});function Ct(e){if(!St())return;let t=is();if(!t)throw new Error("Cannot queue onMount effect outside of a component");t.post.push(ss(e,t.postCleanups))}var sd=M(()=>{"use strict";q();Ao()});function Da(e){if(!St())return;let t=is();if(!t)throw new Error("Cannot queue beforeMount effect outside of a component");t.pre.push(ss(e,t.preCleanups))}var od=M(()=>{"use strict";q();Ao()});function Aa(){let e=K.current;if(O){if(!e)throw new Error("setup() must be called inside a Kiru component");if(e.render)throw new Error("setup() cannot be used inside a render function")}if(Nn.has(e))return Nn.get(e);let t=Km(e);return Nn.set(e,t),t}function Km(e){let t,n=e.propSyncs=[],i=-1,s={current:{...e.props}},o=[],r=[];return n.push(l=>{let c=s.current,u=new Set;for(let d of r)d.accessedPaths.size>0&&Xm(c,l,d.accessedPaths)&&u.add(d);s.current=l;for(let d of r)u.has(d)||d.run()}),At(e,"vnode:setup",()=>{for(let l of o)l();Nn.delete(e)}),{derive(l){let c=D(void 0),u=new Map,d=new Set;function f(){d.clear();let b=ad(s.current,d),x=new Map;qe.stack.push(x);let y=l(b);qe.stack.pop(),c.value=y;for(let[w,_]of u)x.has(w)||(_(),u.delete(w));for(let[w,_]of x)if(!u.has(w))try{u.set(w,_.subscribe(f))}catch{}}f();let p={run:f,accessedPaths:d};return r.push(p),o.push(()=>{u.forEach(x=>x()),u.clear();let b=r.indexOf(p);b!==-1&&r.splice(b,1)}),c},get id(){return t||(t=D(ts(e)),i=e.index,n.push(()=>{i!==e.index&&(t.value=ts(e),i=e.index)})),t}}}function Xm(e,t,n){for(let i of n)if(!Object.is(rd(e,i),rd(t,i)))return!1;return!0}function rd(e,t){let n=e;for(let i of t.split(".")){if(n==null||typeof n!="object")return;n=n[i]}return n}function ad(e,t,n){return new Proxy(e,{get(i,s){let o=n?\`\${n}.\${s}\`:s,r=i[s];return L.isSignal(r)?(t.add(o),r):r!==null&&typeof r=="object"&&!Array.isArray(r)?ad(r,t,o):(t.add(o),r)}})}var ld=M(()=>{"use strict";ce();Eo();dt();yt();fi();q()});var cd=M(()=>{"use strict";To();sd();od();ld();Ao()});function Re(e,t,n,i){if(t===null||t===void 0||typeof t=="boolean")return;if(typeof t=="string")return e.write(ko(t));if(typeof t=="number"||typeof t=="bigint")return e.write(t.toString());if(t instanceof Array)return t.forEach((l,c)=>Re(e,l,n,c));if(L.isSignal(t)){let l=t.peek();if(!zc(l)){O&&console.error(\`[kiru]: expected primitive child but received \${l}\`);return}hn(l)&&e.write(ko(String(l)));return}if(!Cu(t))return;t.parent=n,t.depth=(n?.depth??-1)+1,t.index=i;let{type:s,props:o={}}=t;if(s==="#text")return e.write(ko(o.nodeValue??""));let r=o.children;if(yo(s)){if(s===Ye){let l="",c=new Set,u={write(d){l+=d},onStreamData(d){d.forEach(f=>c.add(f))}};try{Re(u,r,t,i),e.write(l),e.onStreamData?.([...c])}catch(d){if(Co(d))throw d;let f=d instanceof Error?d:new Error(String(d)),{fallback:p,onError:b}=o;b?.(f);let x=typeof p=="function"?p(f):p;Re(e,x,t,0)}return}Re(e,r,t,i);return}if(typeof s=="function")try{K.current=t;let l=s(o);typeof l=="function"&&(l=l(o)),Re(e,l,t,i);return}catch(l){if(Co(l)){let{fallback:c,data:u}=l[ri];return e.onStreamData?.(u),Re(e,c,t,0)}throw l}finally{K.current=null}O&&vo(t);let a=Mu(o);e.write(\`<\${s}\${a.length?\` \${a}\`:""}>\`),!Nc.has(s)&&("innerHTML"in o?e.write(String(L.isSignal(o.innerHTML)?o.innerHTML.peek():o.innerHTML)):Array.isArray(r)?r.forEach((l,c)=>Re(e,l,t,c)):Re(e,r,t,0),e.write(\`</\${s}>\`))}var ud=M(()=>{"use strict";yt();q();Do();ce();ut();dt()});function qm(e){let t=mt.current;mt.current="string";let n="";return Re({write(s){n+=s}},kt({children:e}),null,0),mt.current=t,n}var dd=M(()=>{"use strict";yt();ci();ud()});var Ra,fd=M(()=>{"use strict";Xe();dt();(function(e){let t=[],n=!1,i=!1,s=null,o=ct&&typeof document.startViewTransition=="function";function r(u,d){let f=d?.signal;return new Promise(p=>{let b=async()=>{let x=await u();p(x)};t.push(b),f?.addEventListener("abort",()=>{let x=t.indexOf(b);x!==-1?t.splice(x,1):s?.skipTransition()},{once:!0}),l()})}e.run=r;function a(){s?.skipTransition(),s=null,t.length=0,n=!1,i=!1}e.stop=a;function l(){i||(i=!0,queueMicrotask(()=>{i=!1,c()}))}async function c(){if(n||t.length===0)return;n=!0;let u=[...t];t.length=0;let d=async()=>{await Promise.all(u.map(f=>f())),mn()};o?(s=document.startViewTransition(d),await s.finished):await d(),s=null,n=!1,t.length>0&&l()}})(Ra||(Ra={}))});var j={};Wr(j,{ActionError:()=>Mo,ComputedSignal:()=>es,CustomEvents:()=>Ca,Derive:()=>ve,DevTools:()=>Pa,Effect:()=>pi,ErrorBoundary:()=>ju,For:()=>Ze,Fragment:()=>kt,KiruError:()=>_t,Portal:()=>Wm,Show:()=>jm,Signal:()=>L,Transition:()=>gi,ViewTransitions:()=>Ra,computed:()=>Ot,createContext:()=>Um,createElement:()=>g,defineAction:()=>Im,effect:()=>Bt,flushSync:()=>mn,getVNodeLifecycleHooks:()=>is,isStatefulPromise:()=>Po,isStreamDataThrowValue:()=>Co,lazy:()=>Hm,mount:()=>Lm,nextIdle:()=>Ji,onBeforeMount:()=>Da,onCleanup:()=>Wt,onHmr:()=>Ru,onMount:()=>Ct,ref:()=>bn,renderToString:()=>qm,requestUpdate:()=>Ht,setup:()=>Aa,signal:()=>D,statefulPromise:()=>zm,tick:()=>_o,unwrap:()=>Z,useContext:()=>Ym,useRequestUpdate:()=>xu,wrapLifecycleHookCallback:()=>ss});var z=M(()=>{"use strict";zu();dt();ns();Bu();Wu();td();ed();nd();id();ci();li();qi();cd();dd();Ta();Xe();Do();fd();ct&&(window.__kiru??(window.__kiru=Vu()))});function Je(e,t){if(!e)throw new Error(t)}function Hn(e){return e.type.displayName??(e.type.name||"Anonymous Function")}function os(e){try{return e[Zm]??null}catch{return null}}function ue(e){return e.name==="kiru.devtools"}function Jm(e){return Array.from(e.entries())}function Qe(e,t,n){return Math.min(Math.max(e,t),n)}function Qm(e,t,n){if(e.key==="Tab"){let i=t.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),s=i[0],o=i[i.length-1];if(n&&!t.contains(n)&&s&&s instanceof HTMLElement)return s.focus();e.shiftKey?n===s&&o instanceof HTMLElement&&(o.focus(),e.preventDefault()):n===o&&s instanceof HTMLElement&&(s.focus(),e.preventDefault())}}function tb(){return J.rootRef.value?.matches(":focus-within, :focus")}function Oa(e){let t=J.rootRef.value;return t?.matches(":focus-within, :focus")?e(t):null}function mi(e){let t=[],n=e;for(;n;){if(typeof n.type=="function"){let i=n.type,s=i.displayName??(i.name||"AnonymousFunction"),o=n.key!=null&&n.key!==void 0?\`k:\${String(n.key)}\`:\`i:\${n.index}\`;t.push(\`\${s}[\${o}]\`)}n=n.parent}return\`ch:\${t.join("/")}\`}function Ia(e,t){if(!e)return null;let n=[e];for(;n.length;){let i=n.pop();if(typeof i.type=="function"&&mi(i)===t)return i;i.child&&n.push(i.child),i.sibling&&n.push(i.sibling)}return null}var Zm,Bn=M(()=>{"use strict";Oe();Zm=Symbol.for("kiru.devFileLink")});function eb(e,t){let n=new BroadcastChannel(e),i=(l,c)=>{if(l.type==="SET"){let{key:u,version:d}=l;return hd[u]=c,n.postMessage({type:"SET",key:u,version:d})}n.postMessage(l)},s={},o={},r={};for(let l in t){let c=o[l]=D(t[l]);s[l]=0,r[l]=u=>{if(u.type==="GET"){let d=c.value,f=s[l];return i({type:"SET",key:l,version:f},d)}u.version>s[l]&&(c.value=hd[l],s[l]=u.version)},c.subscribe(u=>{let d=++s[l];i({type:"SET",key:l,version:d},u)})}n.addEventListener("message",({data:l})=>{r[l.key](l)});for(let l in o)i({type:"GET",key:l});return[o,()=>{n.close(),Object.values(o).forEach(l=>L.dispose(l))}]}var pd,hd,ht,J,Oe=M(()=>{"use strict";z();Bn();q();hd=(pd=window.opener??window).__kiru_devtools_state_register??(pd.__kiru_devtools_state_register={}),ht=()=>window.opener?.__kiru??window.__kiru;[J]=eb("kiru-devtools:syncedState",{apps:[],rootRef:null,appSearchTerm:"",appSearchInput:null,componentSelection:{enabled:!1,componentNode:null},devtoolsViewMode:"embedded",devtoolsTab:"Apps",popupWindow:null,selectedApp:null,selectedNode:null,viewerSettings:{objectKeysChunkSize:10,arrayChunkSize:10}});if("window"in globalThis){let{apps:e,componentSelection:t,selectedNode:n,selectedApp:i,viewerSettings:s}=J;window.addEventListener("kiru:ready",()=>{e.value=[...ht().apps],ht().on("mount",a=>{ue(a)||(e.value=[...e.value,a])}),ht().on("unmount",a=>{ue(a)||(e.value=e.value.filter(l=>l!==a))})});let o="kiru-devtools:viewerSettings";s.subscribe(a=>{localStorage.setItem("kiru-devtools:viewerSettings",JSON.stringify(a))});let r=localStorage.getItem(o);if(r)try{let a=JSON.parse(r);Je(typeof a.objectKeysChunkSize=="number"&&a.objectKeysChunkSize>0,"invalid objectKeysChunkSize"),Je(typeof a.arrayChunkSize=="number"&&a.arrayChunkSize>0,"invalid arrayChunkSize"),s.sneak({objectKeysChunkSize:a.objectKeysChunkSize,arrayChunkSize:a.arrayChunkSize})}catch{s.sneak({objectKeysChunkSize:10,arrayChunkSize:10})}t.subscribe(({componentNode:a})=>{n.value=a,i.value=a?Rt(a):null})}});function Na(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e},g("rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}),g("path",{d:"M12 9v11"}),g("path",{d:"M2 9h13a2 2 0 0 1 2 2v9"}))}var gd=M(()=>{"use strict";z()});function tn(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"m9 18 6-6-6-6"}))}var Ro=M(()=>{"use strict";z()});function La(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"M18 6 6 18"}),g("path",{d:"m6 6 12 12"}))}var md=M(()=>{"use strict";z()});function Va(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}),g("circle",{cx:"12",cy:"12",r:"3"}))}var bd=M(()=>{"use strict";z()});function nb(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"}),g("path",{d:"M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z"}),g("path",{d:"M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z"}),g("path",{d:"M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"}))}var xd=M(()=>{"use strict";z()});function rs(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"M15 3h6v6"}),g("path",{d:"M10 14 21 3"}),g("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}))}var yd=M(()=>{"use strict";z()});function za(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"}),g("path",{d:"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"}),g("path",{d:"M3 5a2 2 0 0 0 2 2h3"}),g("path",{d:"M3 3v13a2 2 0 0 0 2 2h3"}))}var vd=M(()=>{"use strict";z()});function ib(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"m15 15 6 6"}),g("path",{d:"m15 9 6-6"}),g("path",{d:"M21 16v5h-5"}),g("path",{d:"M21 8V3h-5"}),g("path",{d:"M3 16v5h5"}),g("path",{d:"m3 21 6-6"}),g("path",{d:"M3 8V3h5"}),g("path",{d:"M9 9 3 3"}))}var wd=M(()=>{"use strict";z()});function Fa(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e},g("path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}))}var _d=M(()=>{"use strict";z()});function as(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"m12 14 4-4"}),g("path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}))}var kd=M(()=>{"use strict";z()});function sb(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("circle",{cx:"12",cy:"5",r:"1"}),g("circle",{cx:"19",cy:"5",r:"1"}),g("circle",{cx:"5",cy:"5",r:"1"}),g("circle",{cx:"12",cy:"12",r:"1"}),g("circle",{cx:"19",cy:"12",r:"1"}),g("circle",{cx:"5",cy:"12",r:"1"}),g("circle",{cx:"12",cy:"19",r:"1"}),g("circle",{cx:"19",cy:"19",r:"1"}),g("circle",{cx:"5",cy:"19",r:"1"}))}var Sd=M(()=>{"use strict";z()});function ls(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"}))}var Ed=M(()=>{"use strict";z()});function ob(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"}),g("path",{d:"m21 3-9 9"}),g("path",{d:"M15 3h6v6"}))}var Md=M(()=>{"use strict";z()});function Ha(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478"}),g("path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134"}),g("path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134"}),g("path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478"}),g("circle",{cx:"12",cy:"12",r:"2"}))}var Td=M(()=>{"use strict";z()});function Wn(e){return g("svg",{width:"10",height:"10",viewBox:"0 0 10 10","aria-hidden":"true",...e},g("line",{x1:"9",y1:"1",x2:"1",y2:"9",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"}),g("line",{x1:"9",y1:"5",x2:"5",y2:"9",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"}))}var Cd=M(()=>{"use strict";z()});function rb(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}))}var Pd=M(()=>{"use strict";z()});var Dd=M(()=>{"use strict";gd();Ro();md();bd();xd();yd();vd();wd();_d();kd();Sd();Ed();Md();Td();Cd();Pd()});function en(e){let t=[],n=()=>t.forEach(x=>x()),i=D(null),s=D(null),o=D(ab(e)),r=Ot(()=>o.value.type==="snapped"?o.value.side:null),a=D(0),l=D(0),c=Ot(()=>[a.value,l.value]),u=D(!1),d=null;t.push(c.subscribe(([x,y])=>{let w=i.value;w.style.transform=\`translate(\${x}px, \${y}px)\`}));let f=x=>{if(x.button!==0)return;let y=i.value;if(!d){let B=y.getBoundingClientRect();d={width:B.width,height:B.height}}let[w,_]=[x.clientX,x.clientY],S=y.getBoundingClientRect(),[E,T]=[w-S.left,_-S.top];u.value=!1;let A=null,R=!1,P=!0,N=()=>{R=!1;let B=A;if(A=null,!B||!P||(!u.peek()&&(Math.abs(B.clientX-w)>5||Math.abs(B.clientY-_)>5)&&(u.value=!0),!u.peek()))return;let[st,Tt]=[B.clientX-E,B.clientY-T],[Q,nt]=e.getDraggableBounds(),{width:vt,height:Ee}=d??y.getBoundingClientRect(),je=st+vt/2,ge=Tt+Ee/2,zt=st,me=Q-(st+vt),Xt=Tt,qt=nt-(Tt+Ee),Zt=Math.min(zt,me,Xt,qt);if(e.allowFloat&&Zt>(e.snapDistance??0))o.value={type:"floating",x:je/Q,y:ge/nt};else{let tt=o.peek(),be=tt.type==="snapped"?tt.side:null,lt={top:Xt,right:me,bottom:qt,left:zt},ot;be&&lt[be]<=Zt?ot=be:Xt===Zt?ot="top":qt===Zt?ot="bottom":zt===Zt?ot="left":ot="right";let si=ot==="left"||ot==="right"?ge/nt:je/Q;o.value={type:"snapped",side:ot,percent:si}}p()},W=B=>{A=B,!R&&(R=!0,requestAnimationFrame(N))},H=()=>{if(P=!1,window.removeEventListener("mousemove",W),window.removeEventListener("mouseup",H),!u.peek())return e.onclick?.();u.value=!1,e.storage.setItem(e.key,JSON.stringify(o.value))};window.addEventListener("mousemove",W),window.addEventListener("mouseup",H)},p=()=>{let x=i.value;if(!d){let N=x.getBoundingClientRect();d={width:N.width,height:N.height}}let{width:y,height:w}=d,[_,S]=e.getDraggableBounds(),E=o.value;if(E.type==="floating"){let[N,W]=e.getPadding(null);a.value=Qe(E.x*_-y/2,N,_-N-y),l.value=Qe(E.y*S-w/2,W,S-W-w);return}let[T,A]=e.getPadding(E.side),R=0,P=0;switch(E.side){case"top":R=E.percent*_-y/2,P=0;break;case"bottom":R=E.percent*_-y/2,P=1/0;break;case"left":R=0,P=E.percent*S-w/2;break;case"right":R=1/0,P=E.percent*S-w/2;break}a.value=Qe(R,T,_-T-y),l.value=Qe(P,A,S-A-w)};return{init:()=>{let x=s.value;if(!x)return console.error("handle not found",new Error().stack);let y=i.value;if(!y)return console.error("container not found",new Error().stack);let w=y.getBoundingClientRect();d={width:w.width,height:w.height},y.style.position="fixed",y.style.top="0",y.style.left="0",p();let _=new ResizeObserver(S=>{let{width:E,height:T}=S[0].contentRect;d={width:E,height:T},p()});_.observe(y),window.addEventListener("resize",p),x.addEventListener("mousedown",f),t.push(()=>{_.disconnect(),window.removeEventListener("resize",p),x.removeEventListener("mousedown",f)})},isDragging:u,handleRef:s,containerRef:i,snapSide:r,containerPos:c,dispose:n}}function ab({storage:e,key:t,defaultPosition:n}){let i=e.getItem(t);if(i)try{let o=JSON.parse(i);if(o.type==="snapped")return Je(["top","right","bottom","left"].includes(o.side),"invalid side"),Je(typeof o.percent=="number"&&o.percent>=0&&o.percent<=1,"invalid percent"),o;if(o.type==="floating")return Je(typeof o.x=="number"&&o.x>=0&&o.x<=1,"invalid x"),Je(typeof o.y=="number"&&o.y>=0&&o.y<=1,"invalid y"),o}catch{}let s=n??{type:"floating",x:.5,y:.5};return e.setItem(t,JSON.stringify(s)),s}var Ad=M(()=>{"use strict";z();Bn()});function Ba(e,t={windowScroll:!0,windowResize:!0}){let n=[],i=()=>{n.forEach(_=>_()),n.length=0},s=t.windowScroll??!0,o=t.windowResize??!0,r=D(0),a=D(0),l=D(0),c=D(0),u=D(0),d=D(0),f=D(0),p=D(0),b=D(0),x=D(0),y=()=>{let _=e.current;if(!_){r.value=a.value=l.value=c.value=u.value=d.value=f.value=p.value=b.value=x.value=0;return}r.value=_.clientWidth,a.value=_.clientHeight;let S=_.getBoundingClientRect();l.value=S.top,c.value=S.left,u.value=S.right,d.value=S.bottom,f.value=S.x,p.value=S.y,b.value=window.scrollX,x.value=window.scrollY};return{state:{width:r,height:a,top:l,left:c,right:u,bottom:d,x:f,y:p,scrollX:b,scrollY:x},init:()=>{let _=e.current;if(!_)return console.error("element not found",new Error().stack);let S=new MutationObserver(y);S.observe(_,{attributeFilter:["style","class"],attributes:!0,childList:!0,subtree:!0}),n.push(()=>S.disconnect());let E=new ResizeObserver(y);E.observe(_),n.push(()=>E.disconnect()),s&&(window.addEventListener("scroll",y,{capture:!0,passive:!0}),n.push(()=>window.removeEventListener("scroll",y))),o&&(window.addEventListener("resize",y,{passive:!0}),n.push(()=>window.removeEventListener("resize",y))),y()},dispose:i}}var Rd=M(()=>{"use strict";z()});function jn(e){let t=[],n=()=>t.forEach(d=>d()),i=D(null),s=D(null),o=D(!1),[r,a]=e.minSize??[0,0],l=e.aspectRatio??null,c=d=>{if(d.button!==0)return;d.stopPropagation(),d.preventDefault(),o.value=!0,document.body.style.cursor="se-resize",document.body.style.userSelect="none";let f=i.value,p=d.clientX,b=d.clientY,x=f.offsetWidth,y=f.offsetHeight,w=S=>{let E=S.clientX-p,T=S.clientY-b;if(l!==null){let A=(E*l+T)/(l*l+1),R=Math.max(r,x+A*l),P=R/l;P<a&&(P=a,R=P*l),f.style.width=\`\${R}px\`,f.style.height=\`\${P}px\`}else f.style.width=\`\${Math.max(r,x+E)}px\`,f.style.height=\`\${Math.max(a,y+T)}px\`},_=()=>{window.removeEventListener("mousemove",w),window.removeEventListener("mouseup",_),o.value=!1,document.body.style.cursor="",document.body.style.userSelect="",e.storage.setItem(e.key,JSON.stringify({w:f.offsetWidth,h:f.offsetHeight}))};window.addEventListener("mousemove",w),window.addEventListener("mouseup",_)};return{containerRef:i,handleRef:s,isResizing:o,init:()=>{let d=s.value;if(!d)return console.error("resize handle not found",new Error().stack);let f=i.value;if(!f)return console.error("resize container not found",new Error().stack);let p=lb(e.storage,e.key);if(p){let b=p[0],x=l!==null?b/l:p[1];f.style.width=\`\${b}px\`,f.style.height=\`\${x}px\`}d.addEventListener("mousedown",c),t.push(()=>d.removeEventListener("mousedown",c))},dispose:n}}function lb(e,t){let n=e.getItem(t);if(!n)return null;try{let i=JSON.parse(n);if(typeof i.w=="number"&&typeof i.h=="number")return[i.w,i.h]}catch{}return null}var Od=M(()=>{"use strict";z()});function cs(){let e=D({x:0,y:0}),t=n=>{e.value={x:n.clientX,y:n.clientY}};return window.addEventListener("mousemove",t),[e,()=>window.removeEventListener("mousemove",t)]}var Id=M(()=>{"use strict";z()});function fs(e){return e+.5|0}function us(e){return xn(fs(e*2.55),0,255)}function yn(e){return xn(fs(e*255),0,255)}function nn(e){return xn(fs(e/2.55)/100,0,1)}function Nd(e){return xn(fs(e*100),0,100)}function fb(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&de[e[1]]*17,g:255&de[e[2]]*17,b:255&de[e[3]]*17,a:t===5?de[e[4]]*17:255}:(t===7||t===9)&&(n={r:de[e[1]]<<4|de[e[2]],g:de[e[3]]<<4|de[e[4]],b:de[e[5]]<<4|de[e[6]],a:t===9?de[e[7]]<<4|de[e[8]]:255})),n}function pb(e){var t=db(e)?cb:ub;return e?"#"+t(e.r)+t(e.g)+t(e.b)+hb(e.a,t):void 0}function Fd(e,t,n){let i=t*Math.min(n,1-n),s=(o,r=(o+e/30)%12)=>n-i*Math.max(Math.min(r-3,9-r,1),-1);return[s(0),s(8),s(4)]}function mb(e,t,n){let i=(s,o=(s+e/60)%6)=>n-n*t*Math.max(Math.min(o,4-o,1),0);return[i(5),i(3),i(1)]}function bb(e,t,n){let i=Fd(e,1,.5),s;for(t+n>1&&(s=1/(t+n),t*=s,n*=s),s=0;s<3;s++)i[s]*=1-t-n,i[s]+=t;return i}function xb(e,t,n,i,s){return e===s?(t-n)/i+(t<n?6:0):t===s?(n-e)/i+2:(e-t)/i+4}function $a(e){let n=e.r/255,i=e.g/255,s=e.b/255,o=Math.max(n,i,s),r=Math.min(n,i,s),a=(o+r)/2,l,c,u;return o!==r&&(u=o-r,c=a>.5?u/(2-o-r):u/(o+r),l=xb(n,i,s,u,o),l=l*60+.5),[l|0,c||0,a]}function Ua(e,t,n,i){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,i)).map(yn)}function Ga(e,t,n){return Ua(Fd,e,t,n)}function yb(e,t,n){return Ua(bb,e,t,n)}function vb(e,t,n){return Ua(mb,e,t,n)}function Hd(e){return(e%360+360)%360}function wb(e){let t=gb.exec(e),n=255,i;if(!t)return;t[5]!==i&&(n=t[6]?us(+t[5]):yn(+t[5]));let s=Hd(+t[2]),o=+t[3]/100,r=+t[4]/100;return t[1]==="hwb"?i=yb(s,o,r):t[1]==="hsv"?i=vb(s,o,r):i=Ga(s,o,r),{r:i[0],g:i[1],b:i[2],a:n}}function _b(e,t){var n=$a(e);n[0]=Hd(n[0]+t),n=Ga(n),e.r=n[0],e.g=n[1],e.b=n[2]}function kb(e){if(!e)return;let t=$a(e),n=t[0],i=Nd(t[1]),s=Nd(t[2]);return e.a<255?\`hsla(\${n}, \${i}%, \${s}%, \${nn(e.a)})\`:\`hsl(\${n}, \${i}%, \${s}%)\`}function Sb(){let e={},t=Object.keys(Vd),n=Object.keys(Ld),i,s,o,r,a;for(i=0;i<t.length;i++){for(r=a=t[i],s=0;s<n.length;s++)o=n[s],a=a.replace(o,Ld[o]);o=parseInt(Vd[r],16),e[a]=[o>>16&255,o>>8&255,o&255]}return e}function Eb(e){Io||(Io=Sb(),Io.transparent=[0,0,0,0]);let t=Io[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}function Tb(e){let t=Mb.exec(e),n=255,i,s,o;if(t){if(t[7]!==i){let r=+t[7];n=t[8]?us(r):xn(r*255,0,255)}return i=+t[1],s=+t[3],o=+t[5],i=255&(t[2]?us(i):xn(i,0,255)),s=255&(t[4]?us(s):xn(s,0,255)),o=255&(t[6]?us(o):xn(o,0,255)),{r:i,g:s,b:o,a:n}}}function Cb(e){return e&&(e.a<255?\`rgba(\${e.r}, \${e.g}, \${e.b}, \${nn(e.a)})\`:\`rgb(\${e.r}, \${e.g}, \${e.b})\`)}function Pb(e,t,n){let i=bi(nn(e.r)),s=bi(nn(e.g)),o=bi(nn(e.b));return{r:yn(Wa(i+n*(bi(nn(t.r))-i))),g:yn(Wa(s+n*(bi(nn(t.g))-s))),b:yn(Wa(o+n*(bi(nn(t.b))-o))),a:e.a+n*(t.a-e.a)}}function No(e,t,n){if(e){let i=$a(e);i[t]=Math.max(0,Math.min(i[t]+i[t]*n,t===0?360:1)),i=Ga(i),e.r=i[0],e.g=i[1],e.b=i[2]}}function Bd(e,t){return e&&Object.assign(t||{},e)}function zd(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=yn(e[3]))):(t=Bd(e,{r:0,g:0,b:0,a:1}),t.a=yn(t.a)),t}function Db(e){return e.charAt(0)==="r"?Tb(e):wb(e)}var xn,de,ja,cb,ub,Oo,db,hb,gb,Ld,Vd,Io,Mb,Wa,bi,ds,Wd=M(()=>{xn=(e,t,n)=>Math.max(Math.min(e,n),t);de={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},ja=[..."0123456789ABCDEF"],cb=e=>ja[e&15],ub=e=>ja[(e&240)>>4]+ja[e&15],Oo=e=>(e&240)>>4===(e&15),db=e=>Oo(e.r)&&Oo(e.g)&&Oo(e.b)&&Oo(e.a);hb=(e,t)=>e<255?t(e):"";gb=/^(hsla?|hwb|hsv)\\(\\s*([-+.e\\d]+)(?:deg)?[\\s,]+([-+.e\\d]+)%[\\s,]+([-+.e\\d]+)%(?:[\\s,]+([-+.e\\d]+)(%)?)?\\s*\\)$/;Ld={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Vd={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};Mb=/^rgba?\\(\\s*([-+.\\d]+)(%)?[\\s,]+([-+.e\\d]+)(%)?[\\s,]+([-+.e\\d]+)(%)?(?:[\\s,/]+([-+.e\\d]+)(%)?)?\\s*\\)$/;Wa=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,bi=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);ds=class e{constructor(t){if(t instanceof e)return t;let n=typeof t,i;n==="object"?i=zd(t):n==="string"&&(i=fb(t)||Eb(t)||Db(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=Bd(this._rgb);return t&&(t.a=nn(t.a)),t}set rgb(t){this._rgb=zd(t)}rgbString(){return this._valid?Cb(this._rgb):void 0}hexString(){return this._valid?pb(this._rgb):void 0}hslString(){return this._valid?kb(this._rgb):void 0}mix(t,n){if(t){let i=this.rgb,s=t.rgb,o,r=n===o?.5:n,a=2*r-1,l=i.a-s.a,c=((a*l===-1?a:(a+l)/(1+a*l))+1)/2;o=1-c,i.r=255&c*i.r+o*s.r+.5,i.g=255&c*i.g+o*s.g+.5,i.b=255&c*i.b+o*s.b+.5,i.a=r*i.a+(1-r)*s.a,this.rgb=i}return this}interpolate(t,n){return t&&(this._rgb=Pb(this._rgb,t._rgb,n)),this}clone(){return new e(this.rgb)}alpha(t){return this._rgb.a=yn(t),this}clearer(t){let n=this._rgb;return n.a*=1-t,this}greyscale(){let t=this._rgb,n=fs(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){let n=this._rgb;return n.a*=1+t,this}negate(){let t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return No(this._rgb,2,t),this}darken(t){return No(this._rgb,2,-t),this}saturate(t){return No(this._rgb,1,t),this}desaturate(t){return No(this._rgb,1,-t),this}rotate(t){return _b(this._rgb,t),this}}});function _e(){}function X(e){return e==null}function it(e){if(Array.isArray&&Array.isArray(e))return!0;let t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function Y(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function gt(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function Nt(e,t){return gt(e)?e:t}function $(e,t){return typeof e>"u"?t:e}function V(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function U(e,t,n,i){let s,o,r;if(it(e))if(o=e.length,i)for(s=o-1;s>=0;s--)t.call(n,e[s],s);else for(s=0;s<o;s++)t.call(n,e[s],s);else if(Y(e))for(r=Object.keys(e),o=r.length,s=0;s<o;s++)t.call(n,e[r[s]],r[s])}function vi(e,t){let n,i,s,o;if(!e||!t||e.length!==t.length)return!1;for(n=0,i=e.length;n<i;++n)if(s=e[n],o=t[n],s.datasetIndex!==o.datasetIndex||s.index!==o.index)return!1;return!0}function ps(e){if(it(e))return e.map(ps);if(Y(e)){let t=Object.create(null),n=Object.keys(e),i=n.length,s=0;for(;s<i;++s)t[n[s]]=ps(e[n[s]]);return t}return e}function Jd(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function Qd(e,t,n,i){if(!Jd(e))return;let s=t[e],o=n[e];Y(s)&&Y(o)?Gn(s,o,i):t[e]=ps(o)}function Gn(e,t,n){let i=it(t)?t:[t],s=i.length;if(!Y(e))return e;n=n||{};let o=n.merger||Qd,r;for(let a=0;a<s;++a){if(r=i[a],!Y(r))continue;let l=Object.keys(r);for(let c=0,u=l.length;c<u;++c)o(l[c],e,r,n)}return e}function Yn(e,t){return Gn(e,t,{merger:tf})}function tf(e,t,n){if(!Jd(e))return;let i=t[e],s=n[e];Y(i)&&Y(s)?Yn(i,s):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=ps(s))}function ef(e){let t=e.split("."),n=[],i="";for(let s of t)i+=s,i.endsWith("\\\\")?i=i.slice(0,-1)+".":(n.push(i),i="");return n}function Ab(e){let t=ef(e);return n=>{for(let i of t){if(i==="")break;n=n&&n[i]}return n}}function wi(e,t){return(jd[t]||(jd[t]=Ab(t)))(e)}function bs(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Ja(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}function Le(e,t,n){return Math.abs(e-t)<n}function Wo(e){let t=Math.round(e);e=Le(e,t,e/1e3)?t:e;let n=Math.pow(10,Math.floor(Ne(e))),i=e/n;return(i<=1?1:i<=2?2:i<=5?5:10)*n}function Qa(e){let t=[],n=Math.sqrt(e),i;for(i=1;i<n;i++)e%i===0&&(t.push(i),t.push(e/i));return n===(n|0)&&t.push(n),t.sort((s,o)=>s-o).pop(),t}function Rb(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function Kn(e){return!Rb(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function tl(e,t){let n=Math.round(e);return n-t<=e&&n+t>=e}function jo(e,t,n){let i,s,o;for(i=0,s=e.length;i<s;i++)o=e[i][n],isNaN(o)||(t.min=Math.min(t.min,o),t.max=Math.max(t.max,o))}function Ve(e){return e*(pt/180)}function xs(e){return e*(180/pt)}function $o(e){if(!gt(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function el(e,t){let n=t.x-e.x,i=t.y-e.y,s=Math.sqrt(n*n+i*i),o=Math.atan2(i,n);return o<-.5*pt&&(o+=jt),{angle:o,distance:s}}function ms(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function of(e,t){return(e-t+nf)%jt-pt}function ee(e){return(e%jt+jt)%jt}function Uo(e,t,n,i){let s=ee(e),o=ee(t),r=ee(n),a=ee(o-s),l=ee(r-s),c=ee(s-o),u=ee(s-r);return s===o||s===r||i&&o===r||a>l&&c<u}function $t(e,t,n){return Math.max(t,Math.min(n,e))}function nl(e){return $t(e,-32768,32767)}function Xn(e,t,n,i=1e-6){return e>=Math.min(t,n)-i&&e<=Math.max(t,n)+i}function ys(e,t,n){n=n||(r=>e[r]<t);let i=e.length-1,s=0,o;for(;i-s>1;)o=s+i>>1,n(o)?s=o:i=o;return{lo:s,hi:i}}function sl(e,t,n){let i=0,s=e.length;for(;i<s&&e[i]<t;)i++;for(;s>i&&e[s-1]>n;)s--;return i>0||s<e.length?e.slice(i,s):e}function ol(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),rf.forEach(n=>{let i="_onData"+bs(n),s=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...o){let r=s.apply(this,o);return e._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...o)}),r}})})}function Go(e,t){let n=e._chartjs;if(!n)return;let i=n.listeners,s=i.indexOf(t);s!==-1&&i.splice(s,1),!(i.length>0)&&(rf.forEach(o=>{delete e[o]}),delete e._chartjs)}function rl(e){let t=new Set(e);return t.size===e.length?e:Array.from(t)}function Ko(e,t){let n=[],i=!1;return function(...s){n=s,i||(i=!0,Yo.call(window,()=>{i=!1,e.apply(t,n)}))}}function al(e,t){let n;return function(...i){return t?(clearTimeout(n),n=setTimeout(e,t,i)):e.apply(this,i),t}}function cl(e,t,n){let i=t.length,s=0,o=i;if(e._sorted){let{iScale:r,vScale:a,_parsed:l}=e,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,u=r.axis,{min:d,max:f,minDefined:p,maxDefined:b}=r.getUserBounds();if(p){if(s=Math.min(on(l,u,d).lo,n?i:on(t,u,r.getPixelForValue(d)).lo),c){let x=l.slice(0,s+1).reverse().findIndex(y=>!X(y[a.axis]));s-=Math.max(0,x)}s=$t(s,0,i-1)}if(b){let x=Math.max(on(l,r.axis,f,!0).hi+1,n?0:on(t,u,r.getPixelForValue(f),!0).hi+1);if(c){let y=l.slice(x-1).findIndex(w=>!X(w[a.axis]));x+=Math.max(0,y)}o=$t(x,s,i)-s}else o=i-s}return{start:s,count:o}}function ul(e){let{xScale:t,yScale:n,_scaleRanges:i}=e,s={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!i)return e._scaleRanges=s,!0;let o=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==n.min||i.ymax!==n.max;return Object.assign(i,s),o}function qo(e){if(e&&typeof e=="object"){let t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Zo(e){return qo(e)?e:new ds(e)}function Fo(e){return qo(e)?e:new ds(e).saturate(.5).darken(.1).hexString()}function Nb(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:Ib},numbers:{type:"number",properties:Ob}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function Lb(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}function Vb(e,t){t=t||{};let n=e+JSON.stringify(t),i=Gd.get(n);return i||(i=new Intl.NumberFormat(e,t),Gd.set(n,i)),i}function vs(e,t,n){return Vb(t,n).format(e)}function zb(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}function Fb(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:ws.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}function hs(e,t){if(!t)return e;let n=t.split(".");for(let i=0,s=n.length;i<s;++i){let o=n[i];e=e[o]||(e[o]=Object.create(null))}return e}function Ya(e,t,n){return typeof t=="string"?Gn(hs(e,t),n):Gn(hs(e,""),t)}function lf(e){return!e||X(e.size)||X(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function xi(e,t,n,i,s){let o=t[s];return o||(o=t[s]=e.measureText(s).width,n.push(s)),o>i&&(i=o),i}function dl(e,t,n,i){i=i||{};let s=i.data=i.data||{},o=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(s=i.data={},o=i.garbageCollect=[],i.font=t),e.save(),e.font=t;let r=0,a=n.length,l,c,u,d,f;for(l=0;l<a;l++)if(d=n[l],d!=null&&!it(d))r=xi(e,s,o,r,d);else if(it(d))for(c=0,u=d.length;c<u;c++)f=d[c],f!=null&&!it(f)&&(r=xi(e,s,o,r,f));e.restore();let p=o.length/2;if(p>n.length){for(l=0;l<p;l++)delete s[o[l]];o.splice(0,p)}return r}function rn(e,t,n){let i=e.currentDevicePixelRatio,s=n!==0?Math.max(n/2,.5):0;return Math.round((t-s)*i)/i+s}function Qo(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function _s(e,t,n,i){tr(e,t,n,i,null)}function tr(e,t,n,i,s){let o,r,a,l,c,u,d,f,p=t.pointStyle,b=t.rotation,x=t.radius,y=(b||0)*sf;if(p&&typeof p=="object"&&(o=p.toString(),o==="[object HTMLImageElement]"||o==="[object HTMLCanvasElement]")){e.save(),e.translate(n,i),e.rotate(y),e.drawImage(p,-p.width/2,-p.height/2,p.width,p.height),e.restore();return}if(!(isNaN(x)||x<=0)){switch(e.beginPath(),p){default:s?e.ellipse(n,i,s/2,x,0,0,jt):e.arc(n,i,x,0,jt),e.closePath();break;case"triangle":u=s?s/2:x,e.moveTo(n+Math.sin(y)*u,i-Math.cos(y)*x),y+=Ka,e.lineTo(n+Math.sin(y)*u,i-Math.cos(y)*x),y+=Ka,e.lineTo(n+Math.sin(y)*u,i-Math.cos(y)*x),e.closePath();break;case"rectRounded":c=x*.516,l=x-c,r=Math.cos(y+vn)*l,d=Math.cos(y+vn)*(s?s/2-c:l),a=Math.sin(y+vn)*l,f=Math.sin(y+vn)*(s?s/2-c:l),e.arc(n-d,i-a,c,y-pt,y-It),e.arc(n+f,i-r,c,y-It,y),e.arc(n+d,i+a,c,y,y+It),e.arc(n-f,i+r,c,y+It,y+pt),e.closePath();break;case"rect":if(!b){l=Math.SQRT1_2*x,u=s?s/2:l,e.rect(n-u,i-l,2*u,2*l);break}y+=vn;case"rectRot":d=Math.cos(y)*(s?s/2:x),r=Math.cos(y)*x,a=Math.sin(y)*x,f=Math.sin(y)*(s?s/2:x),e.moveTo(n-d,i-a),e.lineTo(n+f,i-r),e.lineTo(n+d,i+a),e.lineTo(n-f,i+r),e.closePath();break;case"crossRot":y+=vn;case"cross":d=Math.cos(y)*(s?s/2:x),r=Math.cos(y)*x,a=Math.sin(y)*x,f=Math.sin(y)*(s?s/2:x),e.moveTo(n-d,i-a),e.lineTo(n+d,i+a),e.moveTo(n+f,i-r),e.lineTo(n-f,i+r);break;case"star":d=Math.cos(y)*(s?s/2:x),r=Math.cos(y)*x,a=Math.sin(y)*x,f=Math.sin(y)*(s?s/2:x),e.moveTo(n-d,i-a),e.lineTo(n+d,i+a),e.moveTo(n+f,i-r),e.lineTo(n-f,i+r),y+=vn,d=Math.cos(y)*(s?s/2:x),r=Math.cos(y)*x,a=Math.sin(y)*x,f=Math.sin(y)*(s?s/2:x),e.moveTo(n-d,i-a),e.lineTo(n+d,i+a),e.moveTo(n+f,i-r),e.lineTo(n-f,i+r);break;case"line":r=s?s/2:Math.cos(y)*x,a=Math.sin(y)*x,e.moveTo(n-r,i-a),e.lineTo(n+r,i+a);break;case"dash":e.moveTo(n,i),e.lineTo(n+Math.cos(y)*(s?s/2:x),i+Math.sin(y)*x);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function ne(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function ks(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function Ss(e){e.restore()}function fl(e,t,n,i,s){if(!t)return e.lineTo(n.x,n.y);if(s==="middle"){let o=(t.x+n.x)/2;e.lineTo(o,t.y),e.lineTo(o,n.y)}else s==="after"!=!!i?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function hl(e,t,n,i){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?n.cp2x:n.cp1x,i?n.cp2y:n.cp1y,n.x,n.y)}function Hb(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),X(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function Bb(e,t,n,i,s){if(s.strikethrough||s.underline){let o=e.measureText(i),r=t-o.actualBoundingBoxLeft,a=t+o.actualBoundingBoxRight,l=n-o.actualBoundingBoxAscent,c=n+o.actualBoundingBoxDescent,u=s.strikethrough?(l+c)/2:c;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=s.decorationWidth||2,e.moveTo(r,u),e.lineTo(a,u),e.stroke()}}function Wb(e,t){let n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function Sn(e,t,n,i,s,o={}){let r=it(t)?t:[t],a=o.strokeWidth>0&&o.strokeColor!=="",l,c;for(e.save(),e.font=s.string,Hb(e,o),l=0;l<r.length;++l)c=r[l],o.backdrop&&Wb(e,o.backdrop),a&&(o.strokeColor&&(e.strokeStyle=o.strokeColor),X(o.strokeWidth)||(e.lineWidth=o.strokeWidth),e.strokeText(c,n,i,o.maxWidth)),e.fillText(c,n,i,o.maxWidth),Bb(e,n,i,c,o),i+=Number(s.lineHeight);e.restore()}function ki(e,t){let{x:n,y:i,w:s,h:o,radius:r}=t;e.arc(n+r.topLeft,i+r.topLeft,r.topLeft,1.5*pt,pt,!0),e.lineTo(n,i+o-r.bottomLeft),e.arc(n+r.bottomLeft,i+o-r.bottomLeft,r.bottomLeft,pt,It,!0),e.lineTo(n+s-r.bottomRight,i+o),e.arc(n+s-r.bottomRight,i+o-r.bottomRight,r.bottomRight,It,0,!0),e.lineTo(n+s,i+r.topRight),e.arc(n+s-r.topRight,i+r.topRight,r.topRight,0,-It,!0),e.lineTo(n+r.topLeft,i)}function cf(e,t){let n=(""+e).match(jb);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}function er(e,t){let n={},i=Y(t),s=i?Object.keys(t):t,o=Y(e)?i?r=>$(e[r],e[t[r]]):r=>e[r]:()=>e;for(let r of s)n[r]=Ub(o(r));return n}function pl(e){return er(e,{top:"y",right:"x",bottom:"y",left:"x"})}function En(e){return er(e,["topLeft","topRight","bottomLeft","bottomRight"])}function Et(e){let t=pl(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function bt(e,t){e=e||{},t=t||rt.font;let n=$(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let i=$(e.style,t.style);i&&!(""+i).match($b)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);let s={family:$(e.family,t.family),lineHeight:cf($(e.lineHeight,t.lineHeight),n),size:n,style:i,weight:$(e.weight,t.weight),string:""};return s.string=lf(s),s}function Si(e,t,n,i){let s=!0,o,r,a;for(o=0,r=e.length;o<r;++o)if(a=e[o],a!==void 0&&(t!==void 0&&typeof a=="function"&&(a=a(t),s=!1),n!==void 0&&it(a)&&(a=a[n%a.length],s=!1),a!==void 0))return i&&!s&&(i.cacheable=!1),a}function gl(e,t,n){let{min:i,max:s}=e,o=Za(t,(s-i)/2),r=(a,l)=>n&&a===0?0:a+l;return{min:r(i,-Math.abs(o)),max:r(s,o)}}function ze(e,t){return Object.assign(Object.create(e),t)}function Es(e,t=[""],n,i,s=()=>e[0]){let o=n||e;typeof i>"u"&&(i=ff("_fallback",e));let r={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:o,_fallback:i,_getTarget:s,override:a=>Es([a,...e],t,o,i)};return new Proxy(r,{deleteProperty(a,l){return delete a[l],delete a._keys,delete e[0][l],!0},get(a,l){return uf(a,l,()=>Qb(l,t,e,a))},getOwnPropertyDescriptor(a,l){return Reflect.getOwnPropertyDescriptor(a._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(a,l){return Kd(a).includes(l)},ownKeys(a){return Kd(a)},set(a,l,c){let u=a._storage||(a._storage=s());return a[l]=u[l]=c,delete a._keys,!0}})}function _n(e,t,n,i){let s={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:nr(e,i),setContext:o=>_n(e,o,n,i),override:o=>_n(e.override(o),t,n,i)};return new Proxy(s,{deleteProperty(o,r){return delete o[r],delete e[r],!0},get(o,r,a){return uf(o,r,()=>Yb(o,r,a))},getOwnPropertyDescriptor(o,r){return o._descriptors.allKeys?Reflect.has(e,r)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,r)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(o,r){return Reflect.has(e,r)},ownKeys(){return Reflect.ownKeys(e)},set(o,r,a){return e[r]=a,delete o[r],!0}})}function nr(e,t={scriptable:!0,indexable:!0}){let{_scriptable:n=t.scriptable,_indexable:i=t.indexable,_allKeys:s=t.allKeys}=e;return{allKeys:s,scriptable:n,indexable:i,isScriptable:Ie(n)?n:()=>n,isIndexable:Ie(i)?i:()=>i}}function uf(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];let i=n();return e[t]=i,i}function Yb(e,t,n){let{_proxy:i,_context:s,_subProxy:o,_descriptors:r}=e,a=i[t];return Ie(a)&&r.isScriptable(t)&&(a=Kb(t,a,e,n)),it(a)&&a.length&&(a=Xb(t,a,e,r.isIndexable)),ml(t,a)&&(a=_n(a,s,o&&o[t],r)),a}function Kb(e,t,n,i){let{_proxy:s,_context:o,_subProxy:r,_stack:a}=n;if(a.has(e))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+e);a.add(e);let l=t(o,r||i);return a.delete(e),ml(e,l)&&(l=bl(s._scopes,s,e,l)),l}function Xb(e,t,n,i){let{_proxy:s,_context:o,_subProxy:r,_descriptors:a}=n;if(typeof o.index<"u"&&i(e))return t[o.index%t.length];if(Y(t[0])){let l=t,c=s._scopes.filter(u=>u!==l);t=[];for(let u of l){let d=bl(c,s,e,u);t.push(_n(d,o,r&&r[e],a))}}return t}function df(e,t,n){return Ie(e)?e(t,n):e}function Zb(e,t,n,i,s){for(let o of t){let r=qb(n,o);if(r){e.add(r);let a=df(r._fallback,n,s);if(typeof a<"u"&&a!==n&&a!==i)return a}else if(r===!1&&typeof i<"u"&&n!==i)return null}return!1}function bl(e,t,n,i){let s=t._rootScopes,o=df(t._fallback,n,i),r=[...e,...s],a=new Set;a.add(i);let l=Yd(a,r,n,o||n,i);return l===null||typeof o<"u"&&o!==n&&(l=Yd(a,r,o,l,i),l===null)?!1:Es(Array.from(a),[""],s,o,()=>Jb(t,n,i))}function Yd(e,t,n,i,s){for(;n;)n=Zb(e,t,n,i,s);return n}function Jb(e,t,n){let i=e._getTarget();t in i||(i[t]={});let s=i[t];return it(s)&&Y(n)?n:s||{}}function Qb(e,t,n,i){let s;for(let o of t)if(s=ff(Gb(o,e),n),typeof s<"u")return ml(e,s)?bl(n,i,e,s):s}function ff(e,t){for(let n of t){if(!n)continue;let i=n[e];if(typeof i<"u")return i}}function Kd(e){let t=e._keys;return t||(t=e._keys=tx(e._scopes)),t}function tx(e){let t=new Set;for(let n of e)for(let i of Object.keys(n).filter(s=>!s.startsWith("_")))t.add(i);return Array.from(t)}function pf(e,t,n,i){let s=e.skip?t:e,o=t,r=n.skip?t:n,a=ms(o,s),l=ms(r,o),c=a/(a+l),u=l/(a+l);c=isNaN(c)?0:c,u=isNaN(u)?0:u;let d=i*c,f=i*u;return{previous:{x:o.x-d*(r.x-s.x),y:o.y-d*(r.y-s.y)},next:{x:o.x+f*(r.x-s.x),y:o.y+f*(r.y-s.y)}}}function nx(e,t,n){let i=e.length,s,o,r,a,l,c=yi(e,0);for(let u=0;u<i-1;++u)if(l=c,c=yi(e,u+1),!(!l||!c)){if(Le(t[u],0,ex)){n[u]=n[u+1]=0;continue}s=n[u]/t[u],o=n[u+1]/t[u],a=Math.pow(s,2)+Math.pow(o,2),!(a<=9)&&(r=3/Math.sqrt(a),n[u]=s*r*t[u],n[u+1]=o*r*t[u])}}function ix(e,t,n="x"){let i=hf(n),s=e.length,o,r,a,l=yi(e,0);for(let c=0;c<s;++c){if(r=a,a=l,l=yi(e,c+1),!a)continue;let u=a[n],d=a[i];r&&(o=(u-r[n])/3,a[\`cp1\${n}\`]=u-o,a[\`cp1\${i}\`]=d-o*t[c]),l&&(o=(l[n]-u)/3,a[\`cp2\${n}\`]=u+o,a[\`cp2\${i}\`]=d+o*t[c])}}function gf(e,t="x"){let n=hf(t),i=e.length,s=Array(i).fill(0),o=Array(i),r,a,l,c=yi(e,0);for(r=0;r<i;++r)if(a=l,l=c,c=yi(e,r+1),!!l){if(c){let u=c[t]-l[t];s[r]=u!==0?(c[n]-l[n])/u:0}o[r]=a?c?we(s[r-1])!==we(s[r])?0:(s[r-1]+s[r])/2:s[r-1]:s[r]}nx(e,s,o),ix(e,o,t)}function Vo(e,t,n){return Math.max(Math.min(e,n),t)}function sx(e,t){let n,i,s,o,r,a=ne(e[0],t);for(n=0,i=e.length;n<i;++n)r=o,o=a,a=n<i-1&&ne(e[n+1],t),o&&(s=e[n],r&&(s.cp1x=Vo(s.cp1x,t.left,t.right),s.cp1y=Vo(s.cp1y,t.top,t.bottom)),a&&(s.cp2x=Vo(s.cp2x,t.left,t.right),s.cp2y=Vo(s.cp2y,t.top,t.bottom)))}function xl(e,t,n,i,s){let o,r,a,l;if(t.spanGaps&&(e=e.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")gf(e,s);else{let c=i?e[e.length-1]:e[0];for(o=0,r=e.length;o<r;++o)a=e[o],l=pf(c,a,e[Math.min(o+1,r-(i?0:1))%r],t.tension),a.cp1x=l.previous.x,a.cp1y=l.previous.y,a.cp2x=l.next.x,a.cp2y=l.next.y,c=a}t.capBezierPoints&&sx(e,n)}function Ms(){return typeof window<"u"&&typeof document<"u"}function Ts(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function Ho(e,t,n){let i;return typeof e=="string"?(i=parseInt(e,10),e.indexOf("%")!==-1&&(i=i/100*t.parentNode[n])):i=e,i}function mf(e,t){return ir(e).getPropertyValue(t)}function Un(e,t,n){let i={};n=n?"-"+n:"";for(let s=0;s<4;s++){let o=ox[s];i[o]=parseFloat(e[t+"-"+o+n])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}function ax(e,t){let n=e.touches,i=n&&n.length?n[0]:e,{offsetX:s,offsetY:o}=i,r=!1,a,l;if(rx(s,o,e.target))a=s,l=o;else{let c=t.getBoundingClientRect();a=i.clientX-c.left,l=i.clientY-c.top,r=!0}return{x:a,y:l,box:r}}function ie(e,t){if("native"in e)return e;let{canvas:n,currentDevicePixelRatio:i}=t,s=ir(n),o=s.boxSizing==="border-box",r=Un(s,"padding"),a=Un(s,"border","width"),{x:l,y:c,box:u}=ax(e,n),d=r.left+(u&&a.left),f=r.top+(u&&a.top),{width:p,height:b}=t;return o&&(p-=r.width+a.width,b-=r.height+a.height),{x:Math.round((l-d)/p*n.width/i),y:Math.round((c-f)/b*n.height/i)}}function lx(e,t,n){let i,s;if(t===void 0||n===void 0){let o=e&&Ts(e);if(!o)t=e.clientWidth,n=e.clientHeight;else{let r=o.getBoundingClientRect(),a=ir(o),l=Un(a,"border","width"),c=Un(a,"padding");t=r.width-c.width-l.width,n=r.height-c.height-l.height,i=Ho(a.maxWidth,o,"clientWidth"),s=Ho(a.maxHeight,o,"clientHeight")}}return{width:t,height:n,maxWidth:i||gs,maxHeight:s||gs}}function yl(e,t,n,i){let s=ir(e),o=Un(s,"margin"),r=Ho(s.maxWidth,e,"clientWidth")||gs,a=Ho(s.maxHeight,e,"clientHeight")||gs,l=lx(e,t,n),{width:c,height:u}=l;if(s.boxSizing==="content-box"){let f=Un(s,"border","width"),p=Un(s,"padding");c-=p.width+f.width,u-=p.height+f.height}return c=Math.max(0,c-o.width),u=Math.max(0,i?c/i:u-o.height),c=wn(Math.min(c,r,l.maxWidth)),u=wn(Math.min(u,a,l.maxHeight)),c&&!u&&(u=wn(c/2)),(t!==void 0||n!==void 0)&&i&&l.height&&u>l.height&&(u=l.height,c=wn(Math.floor(u*i))),{width:c,height:u}}function sr(e,t,n){let i=t||1,s=wn(e.height*i),o=wn(e.width*i);e.height=wn(e.height),e.width=wn(e.width);let r=e.canvas;return r.style&&(n||!r.style.height&&!r.style.width)&&(r.style.height=\`\${e.height}px\`,r.style.width=\`\${e.width}px\`),e.currentDevicePixelRatio!==i||r.height!==s||r.width!==o?(e.currentDevicePixelRatio=i,r.height=s,r.width=o,e.ctx.setTransform(i,0,0,i,0,0),!0):!1}function or(e,t){let n=mf(e,t),i=n&&n.match(/^(\\d+)(\\.\\d+)?px$/);return i?+i[1]:void 0}function sn(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function wl(e,t,n,i){return{x:e.x+n*(t.x-e.x),y:i==="middle"?n<.5?e.y:t.y:i==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function _l(e,t,n,i){let s={x:e.cp2x,y:e.cp2y},o={x:t.cp1x,y:t.cp1y},r=sn(e,s,n),a=sn(s,o,n),l=sn(o,t,n),c=sn(r,a,n),u=sn(a,l,n);return sn(c,u,n)}function Mn(e,t,n){return e?cx(t,n):ux()}function rr(e,t){let n,i;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,i=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=i)}function ar(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function bf(e){return e==="angle"?{between:Uo,compare:of,normalize:ee}:{between:Xn,compare:(t,n)=>t-n,normalize:t=>t}}function Xd({start:e,end:t,count:n,loop:i,style:s}){return{start:e%n,end:t%n,loop:i&&(t-e+1)%n===0,style:s}}function dx(e,t,n){let{property:i,start:s,end:o}=n,{between:r,normalize:a}=bf(i),l=t.length,{start:c,end:u,loop:d}=e,f,p;if(d){for(c+=l,u+=l,f=0,p=l;f<p&&r(a(t[c%l][i]),s,o);++f)c--,u--;c%=l,u%=l}return u<c&&(u+=l),{start:c,end:u,loop:d,style:e.style}}function kl(e,t,n){if(!n)return[e];let{property:i,start:s,end:o}=n,r=t.length,{compare:a,between:l,normalize:c}=bf(i),{start:u,end:d,loop:f,style:p}=dx(e,t,n),b=[],x=!1,y=null,w,_,S,E=()=>l(s,S,w)&&a(s,S)!==0,T=()=>a(o,w)===0||l(o,S,w),A=()=>x||E(),R=()=>!x||T();for(let P=u,N=u;P<=d;++P)_=t[P%r],!_.skip&&(w=c(_[i]),w!==S&&(x=l(w,s,o),y===null&&A()&&(y=a(w,s)===0?P:N),y!==null&&R()&&(b.push(Xd({start:y,end:P,loop:f,count:r,style:p})),y=null),N=P,S=w));return y!==null&&b.push(Xd({start:y,end:d,loop:f,count:r,style:p})),b}function Sl(e,t){let n=[],i=e.segments;for(let s=0;s<i.length;s++){let o=kl(i[s],e.points,t);o.length&&n.push(...o)}return n}function fx(e,t,n,i){let s=0,o=t-1;if(n&&!i)for(;s<t&&!e[s].skip;)s++;for(;s<t&&e[s].skip;)s++;for(s%=t,n&&(o+=s);o>s&&e[o%t].skip;)o--;return o%=t,{start:s,end:o}}function hx(e,t,n,i){let s=e.length,o=[],r=t,a=e[t],l;for(l=t+1;l<=n;++l){let c=e[l%s];c.skip||c.stop?a.skip||(i=!1,o.push({start:t%s,end:(l-1)%s,loop:i}),t=r=c.stop?l:null):(r=l,a.skip&&(t=l)),a=c}return r!==null&&o.push({start:t%s,end:r%s,loop:i}),o}function El(e,t){let n=e.points,i=e.options.spanGaps,s=n.length;if(!s)return[];let o=!!e._loop,{start:r,end:a}=fx(n,s,o,i);if(i===!0)return qd(e,[{start:r,end:a,loop:o}],n,t);let l=a<r?a+s:a,c=!!e._fullLoop&&r===0&&a===s-1;return qd(e,hx(n,r,l,c),n,t)}function qd(e,t,n,i){return!i||!i.setContext||!n?t:px(e,t,n,i)}function px(e,t,n,i){let s=e._chart.getContext(),o=Zd(e.options),{_datasetIndex:r,options:{spanGaps:a}}=e,l=n.length,c=[],u=o,d=t[0].start,f=d;function p(b,x,y,w){let _=a?-1:1;if(b!==x){for(b+=l;n[b%l].skip;)b-=_;for(;n[x%l].skip;)x+=_;b%l!==x%l&&(c.push({start:b%l,end:x%l,loop:y,style:w}),u=w,d=x%l)}}for(let b of t){d=a?d:b.start;let x=n[d%l],y;for(f=d+1;f<=b.end;f++){let w=n[f%l];y=Zd(i.setContext(ze(s,{type:"segment",p0:x,p1:w,p0DataIndex:(f-1)%l,p1DataIndex:f%l,datasetIndex:r}))),gx(y,u)&&p(d,f-1,b.loop,u),x=w,u=y}d<f-1&&p(d,f-1,b.loop,u)}return c}function Zd(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function gx(e,t){if(!t)return!1;let n=[],i=function(s,o){return qo(o)?(n.includes(o)||n.push(o),n.indexOf(o)):o};return JSON.stringify(e,i)!==JSON.stringify(t,i)}function zo(e,t,n){return e.options.clip?e[n]:t[n]}function mx(e,t){let{xScale:n,yScale:i}=e;return n&&i?{left:zo(n,t,"left"),right:zo(n,t,"right"),top:zo(i,t,"top"),bottom:zo(i,t,"bottom")}:t}function Ml(e,t){let n=t._clip;if(n.disabled)return!1;let i=mx(t,e.chartArea);return{left:n.left===!1?0:i.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:i.right+(n.right===!0?0:n.right),top:n.top===!1?0:i.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:i.bottom+(n.bottom===!0?0:n.bottom)}}var qa,Za,jd,_i,Ie,Bo,pt,jt,nf,gs,sf,It,vn,Ka,Ne,we,on,il,rf,Yo,Xo,Lt,ll,Lo,$d,Ud,$n,Ob,Ib,Gd,af,ws,kn,Jo,Xa,rt,jb,$b,Ub,Gb,ml,qb,ex,yi,hf,ir,ox,rx,wn,vl,cx,ux,Tl=M(()=>{Wd();qa=(()=>{let e=0;return()=>e++})();Za=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;jd={"":e=>e,x:e=>e.x,y:e=>e.y};_i=e=>typeof e<"u",Ie=e=>typeof e=="function",Bo=(e,t)=>{if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0};pt=Math.PI,jt=2*pt,nf=jt+pt,gs=Number.POSITIVE_INFINITY,sf=pt/180,It=pt/2,vn=pt/4,Ka=pt*2/3,Ne=Math.log10,we=Math.sign;on=(e,t,n,i)=>ys(e,n,i?s=>{let o=e[s][t];return o<n||o===n&&e[s+1][t]===n}:s=>e[s][t]<n),il=(e,t,n)=>ys(e,n,i=>e[i][t]>=n);rf=["push","pop","shift","splice","unshift"];Yo=(function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame})();Xo=e=>e==="start"?"left":e==="end"?"right":"center",Lt=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,ll=(e,t,n,i)=>e===(i?"left":"right")?n:e==="center"?(t+n)/2:t;Lo=e=>e===0||e===1,$d=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*jt/n)),Ud=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*jt/n)+1,$n={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*It)+1,easeOutSine:e=>Math.sin(e*It),easeInOutSine:e=>-.5*(Math.cos(pt*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>Lo(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>Lo(e)?e:$d(e,.075,.3),easeOutElastic:e=>Lo(e)?e:Ud(e,.075,.3),easeInOutElastic(e){return Lo(e)?e:e<.5?.5*$d(e*2,.1125,.45):.5+.5*Ud(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-$n.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?$n.easeInBounce(e*2)*.5:$n.easeOutBounce(e*2-1)*.5+.5};Ob=["x","y","borderWidth","radius","tension"],Ib=["color","borderColor","backgroundColor"];Gd=new Map;af={values(e){return it(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";let i=this.chart.options.locale,s,o=e;if(n.length>1){let c=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(c<1e-4||c>1e15)&&(s="scientific"),o=zb(e,n)}let r=Ne(Math.abs(o)),a=isNaN(r)?1:Math.max(Math.min(-1*Math.floor(r),20),0),l={notation:s,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(l,this.options.ticks.format),vs(e,i,l)},logarithmic(e,t,n){if(e===0)return"0";let i=n[t].significand||e/Math.pow(10,Math.floor(Ne(e)));return[1,2,3,5,10,15].includes(i)||t>.8*n.length?af.numeric.call(this,e,t,n):""}};ws={formatters:af};kn=Object.create(null),Jo=Object.create(null);Xa=class{constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>Fo(s.backgroundColor),this.hoverBorderColor=(i,s)=>Fo(s.borderColor),this.hoverColor=(i,s)=>Fo(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return Ya(this,t,n)}get(t){return hs(this,t)}describe(t,n){return Ya(Jo,t,n)}override(t,n){return Ya(kn,t,n)}route(t,n,i,s){let o=hs(this,t),r=hs(this,i),a="_"+n;Object.defineProperties(o,{[a]:{value:o[n],writable:!0},[n]:{enumerable:!0,get(){let l=this[a],c=r[s];return Y(l)?Object.assign({},c,l):$(l,c)},set(l){this[a]=l}}})}apply(t){t.forEach(n=>n(this))}},rt=new Xa({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[Nb,Lb,Fb]);jb=/^(normal|(\\d+(?:\\.\\d+)?)(px|em|%)?)$/,$b=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;Ub=e=>+e||0;Gb=(e,t)=>e?e+bs(t):t,ml=(e,t)=>Y(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);qb=(e,t)=>e===!0?t:typeof e=="string"?wi(t,e):void 0;ex=Number.EPSILON||1e-14,yi=(e,t)=>t<e.length&&!e[t].skip&&e[t],hf=e=>e==="x"?"y":"x";ir=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);ox=["top","right","bottom","left"];rx=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);wn=e=>Math.round(e*10)/10;vl=(function(){let e=!1;try{let t={get passive(){return e=!0,!1}};Ms()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e})();cx=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,i){return n-i},leftForLtr(n,i){return n-i}}},ux=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}}});function vx(e,t){let n=[],i=Object.keys(t);for(let s=0;s<i.length;s++){let o=e[i[s]];o&&o.active()&&n.push(o.wait())}return Promise.all(n)}function wx(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function yf(e,t){let n=e&&e.options||{},i=n.reverse,s=n.min===void 0?t:0,o=n.max===void 0?t:0;return{start:i?o:s,end:i?s:o}}function _x(e,t,n){if(n===!1)return!1;let i=yf(e,n),s=yf(t,n);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function kx(e){let t,n,i,s;return Y(e)?(t=e.top,n=e.right,i=e.bottom,s=e.left):t=n=i=s=e,{top:t,right:n,bottom:i,left:s,disabled:e===!1}}function rh(e,t){let n=[],i=e._getSortedDatasetMetas(t),s,o;for(s=0,o=i.length;s<o;++s)n.push(i[s].index);return n}function vf(e,t,n,i={}){let s=e.keys,o=i.mode==="single",r,a,l,c;if(t===null)return;let u=!1;for(r=0,a=s.length;r<a;++r){if(l=+s[r],l===n){if(u=!0,i.all)continue;break}c=e.values[l],gt(c)&&(o||t===0||we(t)===we(c))&&(t+=c)}return!u&&!i.all?0:t}function Sx(e,t){let{iScale:n,vScale:i}=t,s=n.axis==="x"?"x":"y",o=i.axis==="x"?"x":"y",r=Object.keys(e),a=new Array(r.length),l,c,u;for(l=0,c=r.length;l<c;++l)u=r[l],a[l]={[s]:u,[o]:e[u]};return a}function Cl(e,t){let n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function Ex(e,t,n){return\`\${e.id}.\${t.id}.\${n.stack||n.type}\`}function Mx(e){let{min:t,max:n,minDefined:i,maxDefined:s}=e.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:s?n:Number.POSITIVE_INFINITY}}function Tx(e,t,n){let i=e[t]||(e[t]={});return i[n]||(i[n]={})}function wf(e,t,n,i){for(let s of t.getMatchingVisibleMetas(i).reverse()){let o=e[s.index];if(n&&o>0||!n&&o<0)return s.index}return null}function _f(e,t){let{chart:n,_cachedMeta:i}=e,s=n._stacks||(n._stacks={}),{iScale:o,vScale:r,index:a}=i,l=o.axis,c=r.axis,u=Ex(o,r,i),d=t.length,f;for(let p=0;p<d;++p){let b=t[p],{[l]:x,[c]:y}=b,w=b._stacks||(b._stacks={});f=w[c]=Tx(s,u,x),f[a]=y,f._top=wf(f,r,!0,i.type),f._bottom=wf(f,r,!1,i.type);let _=f._visualValues||(f._visualValues={});_[a]=y}}function Pl(e,t){let n=e.scales;return Object.keys(n).filter(i=>n[i].axis===t).shift()}function Cx(e,t){return ze(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Px(e,t,n){return ze(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function Cs(e,t){let n=e.controller.index,i=e.vScale&&e.vScale.axis;if(i){t=t||e._parsed;for(let s of t){let o=s._stacks;if(!o||o[i]===void 0||o[i][n]===void 0)return;delete o[i][n],o[i]._visualValues!==void 0&&o[i]._visualValues[n]!==void 0&&delete o[i]._visualValues[n]}}}function qn(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}function Rx(e,t,n,i){let{controller:s,data:o,_sorted:r}=e,a=s._cachedMeta.iScale,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&r&&o.length){let c=a._reversePixels?il:on;if(i){if(s._sharedOptions){let u=o[0],d=typeof u.getRange=="function"&&u.getRange(t);if(d){let f=c(o,t,n-d),p=c(o,t,n+d);return{lo:f.lo,hi:p.hi}}}}else{let u=c(o,t,n);if(l){let{vScale:d}=s._cachedMeta,{_parsed:f}=e,p=f.slice(0,u.lo+1).reverse().findIndex(x=>!X(x[d.axis]));u.lo-=Math.max(0,p);let b=f.slice(u.hi).findIndex(x=>!X(x[d.axis]));u.hi+=Math.max(0,b)}return u}}return{lo:0,hi:o.length-1}}function zs(e,t,n,i,s){let o=e.getSortedVisibleDatasetMetas(),r=n[t];for(let a=0,l=o.length;a<l;++a){let{index:c,data:u}=o[a],{lo:d,hi:f}=Rx(o[a],t,r,s);for(let p=d;p<=f;++p){let b=u[p];b.skip||i(b,c,p)}}}function Ox(e){let t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(i,s){let o=t?Math.abs(i.x-s.x):0,r=n?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(r,2))}}function Al(e,t,n,i,s){let o=[];return!s&&!e.isPointInArea(t)||zs(e,n,t,function(a,l,c){!s&&!ne(a,e.chartArea,0)||a.inRange(t.x,t.y,i)&&o.push({element:a,datasetIndex:l,index:c})},!0),o}function Ix(e,t,n,i){let s=[];function o(r,a,l){let{startAngle:c,endAngle:u}=r.getProps(["startAngle","endAngle"],i),{angle:d}=el(r,{x:t.x,y:t.y});Uo(d,c,u)&&s.push({element:r,datasetIndex:a,index:l})}return zs(e,n,t,o),s}function Nx(e,t,n,i,s,o){let r=[],a=Ox(n),l=Number.POSITIVE_INFINITY;function c(u,d,f){let p=u.inRange(t.x,t.y,s);if(i&&!p)return;let b=u.getCenterPoint(s);if(!(!!o||e.isPointInArea(b))&&!p)return;let y=a(t,b);y<l?(r=[{element:u,datasetIndex:d,index:f}],l=y):y===l&&r.push({element:u,datasetIndex:d,index:f})}return zs(e,n,t,c),r}function Rl(e,t,n,i,s,o){return!o&&!e.isPointInArea(t)?[]:n==="r"&&!i?Ix(e,t,n,s):Nx(e,t,n,i,s,o)}function Sf(e,t,n,i,s){let o=[],r=n==="x"?"inXRange":"inYRange",a=!1;return zs(e,n,t,(l,c,u)=>{l[r]&&l[r](t[n],s)&&(o.push({element:l,datasetIndex:c,index:u}),a=a||l.inRange(t.x,t.y,s))}),i&&!a?[]:o}function Ps(e,t){return e.filter(n=>n.pos===t)}function Ef(e,t){return e.filter(n=>ah.indexOf(n.pos)===-1&&n.box.axis===t)}function Ds(e,t){return e.sort((n,i)=>{let s=t?i:n,o=t?n:i;return s.weight===o.weight?s.index-o.index:s.weight-o.weight})}function Vx(e){let t=[],n,i,s,o,r,a;for(n=0,i=(e||[]).length;n<i;++n)s=e[n],{position:o,options:{stack:r,stackWeight:a=1}}=s,t.push({index:n,box:s,pos:o,horizontal:s.isHorizontal(),weight:s.weight,stack:r&&o+r,stackWeight:a});return t}function zx(e){let t={};for(let n of e){let{stack:i,pos:s,stackWeight:o}=n;if(!i||!ah.includes(s))continue;let r=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});r.count++,r.weight+=o}return t}function Fx(e,t){let n=zx(e),{vBoxMaxWidth:i,hBoxMaxHeight:s}=t,o,r,a;for(o=0,r=e.length;o<r;++o){a=e[o];let{fullSize:l}=a.box,c=n[a.stack],u=c&&a.stackWeight/c.weight;a.horizontal?(a.width=u?u*i:l&&t.availableWidth,a.height=s):(a.width=i,a.height=u?u*s:l&&t.availableHeight)}return n}function Hx(e){let t=Vx(e),n=Ds(t.filter(c=>c.box.fullSize),!0),i=Ds(Ps(t,"left"),!0),s=Ds(Ps(t,"right")),o=Ds(Ps(t,"top"),!0),r=Ds(Ps(t,"bottom")),a=Ef(t,"x"),l=Ef(t,"y");return{fullSize:n,leftAndTop:i.concat(o),rightAndBottom:s.concat(l).concat(r).concat(a),chartArea:Ps(t,"chartArea"),vertical:i.concat(s).concat(l),horizontal:o.concat(r).concat(a)}}function Mf(e,t,n,i){return Math.max(e[n],t[n])+Math.max(e[i],t[i])}function lh(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function Bx(e,t,n,i){let{pos:s,box:o}=n,r=e.maxPadding;if(!Y(s)){n.size&&(e[s]-=n.size);let d=i[n.stack]||{size:0,count:1};d.size=Math.max(d.size,n.horizontal?o.height:o.width),n.size=d.size/d.count,e[s]+=n.size}o.getPadding&&lh(r,o.getPadding());let a=Math.max(0,t.outerWidth-Mf(r,e,"left","right")),l=Math.max(0,t.outerHeight-Mf(r,e,"top","bottom")),c=a!==e.w,u=l!==e.h;return e.w=a,e.h=l,n.horizontal?{same:c,other:u}:{same:u,other:c}}function Wx(e){let t=e.maxPadding;function n(i){let s=Math.max(t[i]-e[i],0);return e[i]+=s,s}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function jx(e,t){let n=t.maxPadding;function i(s){let o={left:0,top:0,right:0,bottom:0};return s.forEach(r=>{o[r]=Math.max(t[r],n[r])}),o}return i(e?["left","right"]:["top","bottom"])}function Os(e,t,n,i){let s=[],o,r,a,l,c,u;for(o=0,r=e.length,c=0;o<r;++o){a=e[o],l=a.box,l.update(a.width||t.w,a.height||t.h,jx(a.horizontal,t));let{same:d,other:f}=Bx(t,n,a,i);c|=d&&s.length,u=u||f,l.fullSize||s.push(a)}return c&&Os(s,t,n,i)||u}function lr(e,t,n,i,s){e.top=n,e.left=t,e.right=t+i,e.bottom=n+s,e.width=i,e.height=s}function Tf(e,t,n,i){let s=n.padding,{x:o,y:r}=t;for(let a of e){let l=a.box,c=i[a.stack]||{count:1,placed:0,weight:1},u=a.stackWeight/c.weight||1;if(a.horizontal){let d=t.w*u,f=c.size||l.height;_i(c.start)&&(r=c.start),l.fullSize?lr(l,s.left,r,n.outerWidth-s.right-s.left,f):lr(l,t.left+c.placed,r,d,f),c.start=r,c.placed+=d,r=l.bottom}else{let d=t.h*u,f=c.size||l.width;_i(c.start)&&(o=c.start),l.fullSize?lr(l,o,s.top,f,n.outerHeight-s.bottom-s.top):lr(l,o,t.top+c.placed,f,d),c.start=o,c.placed+=d,o=l.right}}t.x=o,t.y=r}function Ux(e,t){let n=e.style,i=e.getAttribute("height"),s=e.getAttribute("width");if(e[gr]={initial:{height:i,width:s,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",Cf(s)){let o=or(e,"width");o!==void 0&&(e.width=o)}if(Cf(i))if(e.style.height==="")e.height=e.width/(t||2);else{let o=or(e,"height");o!==void 0&&(e.height=o)}return e}function Gx(e,t,n){e&&e.addEventListener(t,n,ch)}function Yx(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,ch)}function Kx(e,t){let n=$x[e.type]||e.type,{x:i,y:s}=ie(e,t);return{type:n,chart:t,native:e,x:i!==void 0?i:null,y:s!==void 0?s:null}}function yr(e,t){for(let n of e)if(n===t||n.contains(t))return!0}function Xx(e,t,n){let i=e.canvas,s=new MutationObserver(o=>{let r=!1;for(let a of o)r=r||yr(a.addedNodes,i),r=r&&!yr(a.removedNodes,i);r&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}function qx(e,t,n){let i=e.canvas,s=new MutationObserver(o=>{let r=!1;for(let a of o)r=r||yr(a.removedNodes,i),r=r&&!yr(a.addedNodes,i);r&&n()});return s.observe(document,{childList:!0,subtree:!0}),s}function uh(){let e=window.devicePixelRatio;e!==Pf&&(Pf=e,Ls.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function Zx(e,t){Ls.size||window.addEventListener("resize",uh),Ls.set(e,t)}function Jx(e){Ls.delete(e),Ls.size||window.removeEventListener("resize",uh)}function Qx(e,t,n){let i=e.canvas,s=i&&Ts(i);if(!s)return;let o=Ko((a,l)=>{let c=s.clientWidth;n(a,l),c<s.clientWidth&&n()},window),r=new ResizeObserver(a=>{let l=a[0],c=l.contentRect.width,u=l.contentRect.height;c===0&&u===0||o(c,u)});return r.observe(s),Zx(e,o),r}function Ol(e,t,n){n&&n.disconnect(),t==="resize"&&Jx(e)}function t0(e,t,n){let i=e.canvas,s=Ko(o=>{e.ctx!==null&&n(Kx(o,e))},e);return Gx(i,t,s),s}function e0(e){return!Ms()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?Vl:zl}function n0(e,t){let n=e.options.ticks,i=i0(e),s=Math.min(n.maxTicksLimit||i,i),o=n.major.enabled?o0(t):[],r=o.length,a=o[0],l=o[r-1],c=[];if(r>s)return r0(t,c,o,r/s),c;let u=s0(o,t,s);if(r>0){let d,f,p=r>1?Math.round((l-a)/(r-1)):null;for(cr(t,c,u,X(p)?0:a-p,a),d=0,f=r-1;d<f;d++)cr(t,c,u,o[d],o[d+1]);return cr(t,c,u,l,X(p)?t.length:l+p),c}return cr(t,c,u),c}function i0(e){let t=e.options.offset,n=e._tickSize(),i=e._length/n+(t?0:1),s=e._maxLength/n;return Math.floor(Math.min(i,s))}function s0(e,t,n){let i=a0(e),s=t.length/n;if(!i)return Math.max(s,1);let o=Qa(i);for(let r=0,a=o.length-1;r<a;r++){let l=o[r];if(l>s)return l}return Math.max(s,1)}function o0(e){let t=[],n,i;for(n=0,i=e.length;n<i;n++)e[n].major&&t.push(n);return t}function r0(e,t,n,i){let s=0,o=n[0],r;for(i=Math.ceil(i),r=0;r<e.length;r++)r===o&&(t.push(e[r]),s++,o=n[s*i])}function cr(e,t,n,i,s){let o=$(i,0),r=Math.min($(s,e.length),e.length),a=0,l,c,u;for(n=Math.ceil(n),s&&(l=s-i,n=l/Math.floor(l/n)),u=o;u<0;)a++,u=Math.round(o+a*n);for(c=Math.max(o,0);c<r;c++)c===u&&(t.push(e[c]),a++,u=Math.round(o+a*n))}function a0(e){let t=e.length,n,i;if(t<2)return!1;for(i=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==i)return!1;return i}function Rf(e,t){let n=[],i=e.length/t,s=e.length,o=0;for(;o<s;o+=i)n.push(e[Math.floor(o)]);return n}function c0(e,t,n){let i=e.ticks.length,s=Math.min(t,i-1),o=e._startPixel,r=e._endPixel,a=1e-6,l=e.getPixelForTick(s),c;if(!(n&&(i===1?c=Math.max(l-o,r-l):t===0?c=(e.getPixelForTick(1)-l)/2:c=(l-e.getPixelForTick(s-1))/2,l+=s<t?c:-c,l<o-a||l>r+a)))return l}function u0(e,t){U(e,n=>{let i=n.gc,s=i.length/2,o;if(s>t){for(o=0;o<s;++o)delete n.data[i[o]];i.splice(0,s)}})}function As(e){return e.drawTicks?e.tickLength:0}function Of(e,t){if(!e.display)return 0;let n=bt(e.font,t),i=Et(e.padding);return(it(e.text)?e.text.length:1)*n.lineHeight+i.height}function d0(e,t){return ze(e,{scale:t,type:"scale"})}function f0(e,t,n){return ze(e,{tick:n,index:t,type:"tick"})}function h0(e,t,n){let i=Xo(e);return(n&&t!=="right"||!n&&t==="right")&&(i=l0(i)),i}function p0(e,t,n,i){let{top:s,left:o,bottom:r,right:a,chart:l}=e,{chartArea:c,scales:u}=l,d=0,f,p,b,x=r-s,y=a-o;if(e.isHorizontal()){if(p=Lt(i,o,a),Y(n)){let w=Object.keys(n)[0],_=n[w];b=u[w].getPixelForValue(_)+x-t}else n==="center"?b=(c.bottom+c.top)/2+x-t:b=Df(e,n,t);f=a-o}else{if(Y(n)){let w=Object.keys(n)[0],_=n[w];p=u[w].getPixelForValue(_)-y+t}else n==="center"?p=(c.left+c.right)/2-y+t:p=Df(e,n,t);b=Lt(i,r,s),d=n==="left"?-It:It}return{titleX:p,titleY:b,maxWidth:f,rotation:d}}function g0(e,t,n){let i=Gn(Object.create(null),[n?rt.get(n):{},rt.get(t),e.defaults]);rt.set(t,i),e.defaultRoutes&&m0(t,e.defaultRoutes),e.descriptors&&rt.describe(t,e.descriptors)}function m0(e,t){Object.keys(t).forEach(n=>{let i=n.split("."),s=i.pop(),o=[e].concat(i).join("."),r=t[n].split("."),a=r.pop(),l=r.join(".");rt.route(o,s,l,a)})}function b0(e){return"id"in e&&"defaults"in e}function x0(e){let t={},n=[],i=Object.keys(He.plugins.items);for(let o=0;o<i.length;o++)n.push(He.getPlugin(i[o]));let s=e.plugins||[];for(let o=0;o<s.length;o++){let r=s[o];n.indexOf(r)===-1&&(n.push(r),t[r.id]=!0)}return{plugins:n,localIds:t}}function y0(e,t){return!t&&e===!1?null:e===!0?{}:e}function v0(e,{plugins:t,localIds:n},i,s){let o=[],r=e.getContext();for(let a of t){let l=a.id,c=y0(i[l],s);c!==null&&o.push({plugin:a,options:w0(e.config,{plugin:a,local:n[l]},c,r)})}return o}function w0(e,{plugin:t,local:n},i,s){let o=e.pluginScopeKeys(t),r=e.getOptionScopes(i,o);return n&&t.defaults&&r.push(t.defaults),e.createResolver(r,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Bl(e,t){let n=rt.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function _0(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function k0(e,t){return e===t?"_index_":"_value_"}function If(e){if(e==="x"||e==="y"||e==="r")return e}function S0(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function Wl(e,...t){if(If(e))return e;for(let n of t){let i=n.axis||S0(n.position)||e.length>1&&If(e[0].toLowerCase());if(i)return i}throw new Error(\`Cannot determine type of '\${e}' axis. Please provide 'axis' or 'position' option.\`)}function Nf(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function E0(e,t){if(t.data&&t.data.datasets){let n=t.data.datasets.filter(i=>i.xAxisID===e||i.yAxisID===e);if(n.length)return Nf(e,"x",n[0])||Nf(e,"y",n[0])}return{}}function M0(e,t){let n=kn[e.type]||{scales:{}},i=t.scales||{},s=Bl(e.type,t),o=Object.create(null);return Object.keys(i).forEach(r=>{let a=i[r];if(!Y(a))return console.error(\`Invalid scale configuration for scale: \${r}\`);if(a._proxy)return console.warn(\`Ignoring resolver passed as options for scale: \${r}\`);let l=Wl(r,a,E0(r,e),rt.scales[a.type]),c=k0(l,s),u=n.scales||{};o[r]=Yn(Object.create(null),[{axis:l},a,u[l],u[c]])}),e.data.datasets.forEach(r=>{let a=r.type||e.type,l=r.indexAxis||Bl(a,t),u=(kn[a]||{}).scales||{};Object.keys(u).forEach(d=>{let f=_0(d,l),p=r[f+"AxisID"]||f;o[p]=o[p]||Object.create(null),Yn(o[p],[{axis:f},i[p],u[d]])})}),Object.keys(o).forEach(r=>{let a=o[r];Yn(a,[rt.scales[a.type],rt.scale])}),o}function dh(e){let t=e.options||(e.options={});t.plugins=$(t.plugins,{}),t.scales=M0(e,t)}function fh(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function T0(e){return e=e||{},e.data=fh(e.data),dh(e),e}function ur(e,t){let n=Lf.get(e);return n||(n=t(),Lf.set(e,n),hh.add(n)),n}function Vf(e,t,n){let i=e.get(t);i||(i=new Map,e.set(t,i));let s=n.join(),o=i.get(s);return o||(o={resolver:Es(t,n),subPrefixes:n.filter(a=>!a.toLowerCase().includes("hover"))},i.set(s,o)),o}function P0(e,t){let{isScriptable:n,isIndexable:i}=nr(e);for(let s of t){let o=n(s),r=i(s),a=(r||o)&&e[s];if(o&&(Ie(a)||C0(a))||r&&it(a))return!0}return!1}function zf(e,t){return e==="top"||e==="bottom"||A0.indexOf(e)===-1&&t==="x"}function Ff(e,t){return function(n,i){return n[e]===i[e]?n[t]-i[t]:n[e]-i[e]}}function Hf(e){let t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),V(n&&n.onComplete,[e],t)}function R0(e){let t=e.chart,n=t.options.animation;V(n&&n.onProgress,[e],t)}function ph(e){return Ms()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}function O0(e,t,n){let i=Object.keys(e);for(let s of i){let o=+s;if(o>=t){let r=e[s];delete e[s],(n>0||o>t)&&(e[o+n]=r)}}}function I0(e,t,n,i){return!n||e.type==="mouseout"?null:i?t:e}function Wf(){return U(fe.instances,e=>e._plugins.invalidate())}function gh(e,t,n=t){e.lineCap=$(n.borderCapStyle,t.borderCapStyle),e.setLineDash($(n.borderDash,t.borderDash)),e.lineDashOffset=$(n.borderDashOffset,t.borderDashOffset),e.lineJoin=$(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=$(n.borderWidth,t.borderWidth),e.strokeStyle=$(n.borderColor,t.borderColor)}function N0(e,t,n){e.lineTo(n.x,n.y)}function L0(e){return e.stepped?fl:e.tension||e.cubicInterpolationMode==="monotone"?hl:N0}function mh(e,t,n={}){let i=e.length,{start:s=0,end:o=i-1}=n,{start:r,end:a}=t,l=Math.max(s,r),c=Math.min(o,a),u=s<r&&o<r||s>a&&o>a;return{count:i,start:l,loop:t.loop,ilen:c<l&&!u?i+c-l:c-l}}function V0(e,t,n,i){let{points:s,options:o}=t,{count:r,start:a,loop:l,ilen:c}=mh(s,n,i),u=L0(o),{move:d=!0,reverse:f}=i||{},p,b,x;for(p=0;p<=c;++p)b=s[(a+(f?c-p:p))%r],!b.skip&&(d?(e.moveTo(b.x,b.y),d=!1):u(e,x,b,f,o.stepped),x=b);return l&&(b=s[(a+(f?c:0))%r],u(e,x,b,f,o.stepped)),!!l}function z0(e,t,n,i){let s=t.points,{count:o,start:r,ilen:a}=mh(s,n,i),{move:l=!0,reverse:c}=i||{},u=0,d=0,f,p,b,x,y,w,_=E=>(r+(c?a-E:E))%o,S=()=>{x!==y&&(e.lineTo(u,y),e.lineTo(u,x),e.lineTo(u,w))};for(l&&(p=s[_(0)],e.moveTo(p.x,p.y)),f=0;f<=a;++f){if(p=s[_(f)],p.skip)continue;let E=p.x,T=p.y,A=E|0;A===b?(T<x?x=T:T>y&&(y=T),u=(d*u+E)/++d):(S(),e.lineTo(E,T),b=A,d=0,x=y=T),w=T}S()}function $l(e){let t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?z0:V0}function F0(e){return e.stepped?wl:e.tension||e.cubicInterpolationMode==="monotone"?_l:sn}function H0(e,t,n,i){let s=t._path;s||(s=t._path=new Path2D,t.path(s,n,i)&&s.closePath()),gh(e,t.options),e.stroke(s)}function B0(e,t,n,i){let{segments:s,options:o}=t,r=$l(t);for(let a of s)gh(e,o,a.style),e.beginPath(),r(e,t,a,{start:n,end:n+i-1})&&e.closePath(),e.stroke()}function j0(e,t,n,i){W0&&!t.options.segment?H0(e,t,n,i):B0(e,t,n,i)}function jf(e,t,n,i){let s=e.options,{[n]:o}=e.getProps([n],i);return Math.abs(t-o)<s.radius+s.hitRadius}function U0(e,t,n,i,s){let o=G0(i,e,t,n),r=Y0(s,i,t.lineHeight);return{itemWidth:o,itemHeight:r}}function G0(e,t,n,i){let s=e.text;return s&&typeof s!="string"&&(s=s.reduce((o,r)=>o.length>r.length?o:r)),t+n.size/2+i.measureText(s).width}function Y0(e,t,n){let i=e;return typeof t.text!="string"&&(i=bh(t,n)),i}function bh(e,t){let n=e.text?e.text.length:0;return t*n}function K0(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}function Fe(e,t){return t&&(it(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function ln(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(\`
\`)>-1?e.split(\`
\`):e}function X0(e,t){let{element:n,datasetIndex:i,index:s}=t,o=e.getDatasetMeta(i).controller,{label:r,value:a}=o.getLabelAndValue(s);return{chart:e,label:r,parsed:o.getParsed(s),raw:e.data.datasets[i].data[s],formattedValue:a,dataset:o.getDataset(),dataIndex:s,datasetIndex:i,element:n}}function Uf(e,t){let n=e.chart.ctx,{body:i,footer:s,title:o}=e,{boxWidth:r,boxHeight:a}=t,l=bt(t.bodyFont),c=bt(t.titleFont),u=bt(t.footerFont),d=o.length,f=s.length,p=i.length,b=Et(t.padding),x=b.height,y=0,w=i.reduce((E,T)=>E+T.before.length+T.lines.length+T.after.length,0);if(w+=e.beforeBody.length+e.afterBody.length,d&&(x+=d*c.lineHeight+(d-1)*t.titleSpacing+t.titleMarginBottom),w){let E=t.displayColors?Math.max(a,l.lineHeight):l.lineHeight;x+=p*E+(w-p)*l.lineHeight+(w-1)*t.bodySpacing}f&&(x+=t.footerMarginTop+f*u.lineHeight+(f-1)*t.footerSpacing);let _=0,S=function(E){y=Math.max(y,n.measureText(E).width+_)};return n.save(),n.font=c.string,U(e.title,S),n.font=l.string,U(e.beforeBody.concat(e.afterBody),S),_=t.displayColors?r+2+t.boxPadding:0,U(i,E=>{U(E.before,S),U(E.lines,S),U(E.after,S)}),_=0,n.font=u.string,U(e.footer,S),n.restore(),y+=b.width,{width:y,height:x}}function q0(e,t){let{y:n,height:i}=t;return n<i/2?"top":n>e.height-i/2?"bottom":"center"}function Z0(e,t,n,i){let{x:s,width:o}=i,r=n.caretSize+n.caretPadding;if(e==="left"&&s+o+r>t.width||e==="right"&&s-o-r<0)return!0}function J0(e,t,n,i){let{x:s,width:o}=n,{width:r,chartArea:{left:a,right:l}}=e,c="center";return i==="center"?c=s<=(a+l)/2?"left":"right":s<=o/2?c="left":s>=r-o/2&&(c="right"),Z0(c,e,t,n)&&(c="center"),c}function Gf(e,t,n){let i=n.yAlign||t.yAlign||q0(e,n);return{xAlign:n.xAlign||t.xAlign||J0(e,t,n,i),yAlign:i}}function Q0(e,t){let{x:n,width:i}=e;return t==="right"?n-=i:t==="center"&&(n-=i/2),n}function ty(e,t,n){let{y:i,height:s}=e;return t==="top"?i+=n:t==="bottom"?i-=s+n:i-=s/2,i}function Yf(e,t,n,i){let{caretSize:s,caretPadding:o,cornerRadius:r}=e,{xAlign:a,yAlign:l}=n,c=s+o,{topLeft:u,topRight:d,bottomLeft:f,bottomRight:p}=En(r),b=Q0(t,a),x=ty(t,l,c);return l==="center"?a==="left"?b+=c:a==="right"&&(b-=c):a==="left"?b-=Math.max(u,f)+s:a==="right"&&(b+=Math.max(d,p)+s),{x:$t(b,0,i.width-t.width),y:$t(x,0,i.height-t.height)}}function dr(e,t,n){let i=Et(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-i.right:e.x+i.left}function Kf(e){return Fe([],ln(e))}function ey(e,t,n){return ze(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function Xf(e,t){let n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}function Ut(e,t,n,i){let s=e[t].call(n,i);return typeof s>"u"?yh[t].call(n,i):s}function iy(e,t,n,i){let s=e.indexOf(t);if(s===-1)return ny(e,t,n,i);let o=e.lastIndexOf(t);return s!==o?n:s}function qf(e){let t=this.getLabels();return e>=0&&e<t.length?t[e]:e}function oy(e,t){let n=[],{bounds:s,step:o,min:r,max:a,precision:l,count:c,maxTicks:u,maxDigits:d,includeBounds:f}=e,p=o||1,b=u-1,{min:x,max:y}=t,w=!X(r),_=!X(a),S=!X(c),E=(y-x)/(d+1),T=Wo((y-x)/b/p)*p,A,R,P,N;if(T<1e-14&&!w&&!_)return[{value:x},{value:y}];N=Math.ceil(y/T)-Math.floor(x/T),N>b&&(T=Wo(N*T/b/p)*p),X(l)||(A=Math.pow(10,l),T=Math.ceil(T*A)/A),s==="ticks"?(R=Math.floor(x/T)*T,P=Math.ceil(y/T)*T):(R=x,P=y),w&&_&&o&&tl((a-r)/o,T/1e3)?(N=Math.round(Math.min((a-r)/T,u)),T=(a-r)/N,R=r,P=a):S?(R=w?r:R,P=_?a:P,N=c-1,T=(P-R)/N):(N=(P-R)/T,Le(N,Math.round(N),T/1e3)?N=Math.round(N):N=Math.ceil(N));let W=Math.max($o(T),$o(R));A=Math.pow(10,X(l)?W:l),R=Math.round(R*A)/A,P=Math.round(P*A)/A;let H=0;for(w&&(f&&R!==r?(n.push({value:r}),R<r&&H++,Le(Math.round((R+H*T)*A)/A,r,Zf(r,E,e))&&H++):R<r&&H++);H<N;++H){let B=Math.round((R+H*T)*A)/A;if(_&&B>a)break;n.push({value:B})}return _&&f&&P!==a?n.length&&Le(n[n.length-1].value,a,Zf(a,E,e))?n[n.length-1].value=a:n.push({value:a}):(!_||P===a)&&n.push({value:P}),n}function Zf(e,t,{horizontal:n,minRotation:i}){let s=Ve(i),o=(n?Math.sin(s):Math.cos(s))||.001,r=.75*t*(""+e).length;return Math.min(t/o,r)}function Jf(e){return e/Math.pow(10,Vs(e))===1}function Qf(e,t,n){let i=Math.pow(10,n),s=Math.floor(e/i);return Math.ceil(t/i)-s}function ry(e,t){let n=t-e,i=Vs(n);for(;Qf(e,t,i)>10;)i++;for(;Qf(e,t,i)<10;)i--;return Math.min(i,Vs(e))}function ay(e,{min:t,max:n}){t=Nt(e.min,t);let i=[],s=Vs(t),o=ry(t,n),r=o<0?Math.pow(10,Math.abs(o)):1,a=Math.pow(10,o),l=s>o?Math.pow(10,s):0,c=Math.round((t-l)*r)/r,u=Math.floor((t-l)/a/10)*a*10,d=Math.floor((c-u)/Math.pow(10,o)),f=Nt(e.min,Math.round((l+u+d*Math.pow(10,o))*r)/r);for(;f<n;)i.push({value:f,major:Jf(f),significand:d}),d>=10?d=d<15?15:20:d++,d>=20&&(o++,d=2,r=o>=0?1:r),f=Math.round((l+u+d*Math.pow(10,o))*r)/r;let p=Nt(e.max,f);return i.push({value:p,major:Jf(p),significand:d}),i}function Ul(e){let t=e.ticks;if(t.display&&e.display){let n=Et(t.backdropPadding);return $(t.font&&t.font.size,rt.font.size)+n.height}return 0}function ly(e,t,n){return n=it(n)?n:[n],{w:dl(e,t.string,n),h:n.length*t.lineHeight}}function th(e,t,n,i,s){return e===i||e===s?{start:t-n/2,end:t+n/2}:e<i||e>s?{start:t-n,end:t}:{start:t,end:t+n}}function cy(e){let t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},n=Object.assign({},t),i=[],s=[],o=e._pointLabels.length,r=e.options.pointLabels,a=r.centerPointLabels?pt/o:0;for(let l=0;l<o;l++){let c=r.setContext(e.getPointLabelContext(l));s[l]=c.padding;let u=e.getPointPosition(l,e.drawingArea+s[l],a),d=bt(c.font),f=ly(e.ctx,d,e._pointLabels[l]);i[l]=f;let p=ee(e.getIndexAngle(l)+a),b=Math.round(xs(p)),x=th(b,u.x,f.w,0,180),y=th(b,u.y,f.h,90,270);uy(n,t,p,x,y)}e.setCenterPoint(t.l-n.l,n.r-t.r,t.t-n.t,n.b-t.b),e._pointLabelItems=hy(e,i,s)}function uy(e,t,n,i,s){let o=Math.abs(Math.sin(n)),r=Math.abs(Math.cos(n)),a=0,l=0;i.start<t.l?(a=(t.l-i.start)/o,e.l=Math.min(e.l,t.l-a)):i.end>t.r&&(a=(i.end-t.r)/o,e.r=Math.max(e.r,t.r+a)),s.start<t.t?(l=(t.t-s.start)/r,e.t=Math.min(e.t,t.t-l)):s.end>t.b&&(l=(s.end-t.b)/r,e.b=Math.max(e.b,t.b+l))}function dy(e,t,n){let i=e.drawingArea,{extra:s,additionalAngle:o,padding:r,size:a}=n,l=e.getPointPosition(t,i+s+r,o),c=Math.round(xs(ee(l.angle+It))),u=my(l.y,a.h,c),d=py(c),f=gy(l.x,a.w,d);return{visible:!0,x:l.x,y:u,textAlign:d,left:f,top:u,right:f+a.w,bottom:u+a.h}}function fy(e,t){if(!t)return!0;let{left:n,top:i,right:s,bottom:o}=e;return!(ne({x:n,y:i},t)||ne({x:n,y:o},t)||ne({x:s,y:i},t)||ne({x:s,y:o},t))}function hy(e,t,n){let i=[],s=e._pointLabels.length,o=e.options,{centerPointLabels:r,display:a}=o.pointLabels,l={extra:Ul(o)/2,additionalAngle:r?pt/s:0},c;for(let u=0;u<s;u++){l.padding=n[u],l.size=t[u];let d=dy(e,u,l);i.push(d),a==="auto"&&(d.visible=fy(d,c),d.visible&&(c=d))}return i}function py(e){return e===0||e===180?"center":e<180?"left":"right"}function gy(e,t,n){return n==="right"?e-=t:n==="center"&&(e-=t/2),e}function my(e,t,n){return n===90||n===270?e-=t/2:(n>270||n<90)&&(e-=t),e}function by(e,t,n){let{left:i,top:s,right:o,bottom:r}=n,{backdropColor:a}=t;if(!X(a)){let l=En(t.borderRadius),c=Et(t.backdropPadding);e.fillStyle=a;let u=i-c.left,d=s-c.top,f=o-i+c.width,p=r-s+c.height;Object.values(l).some(b=>b!==0)?(e.beginPath(),ki(e,{x:u,y:d,w:f,h:p,radius:l}),e.fill()):e.fillRect(u,d,f,p)}}function xy(e,t){let{ctx:n,options:{pointLabels:i}}=e;for(let s=t-1;s>=0;s--){let o=e._pointLabelItems[s];if(!o.visible)continue;let r=i.setContext(e.getPointLabelContext(s));by(n,r,o);let a=bt(r.font),{x:l,y:c,textAlign:u}=o;Sn(n,e._pointLabels[s],l,c+a.lineHeight/2,a,{color:r.color,textAlign:u,textBaseline:"middle"})}}function wh(e,t,n,i){let{ctx:s}=e;if(n)s.arc(e.xCenter,e.yCenter,t,0,jt);else{let o=e.getPointPosition(0,t);s.moveTo(o.x,o.y);for(let r=1;r<i;r++)o=e.getPointPosition(r,t),s.lineTo(o.x,o.y)}}function yy(e,t,n,i,s){let o=e.ctx,r=t.circular,{color:a,lineWidth:l}=t;!r&&!i||!a||!l||n<0||(o.save(),o.strokeStyle=a,o.lineWidth=l,o.setLineDash(s.dash||[]),o.lineDashOffset=s.dashOffset,o.beginPath(),wh(e,n,r,i),o.closePath(),o.stroke(),o.restore())}function vy(e,t,n){return ze(e,{label:n,index:t,type:"pointLabel"})}function eh(e,t){return e-t}function nh(e,t){if(X(t))return null;let n=e._adapter,{parser:i,round:s,isoWeekday:o}=e._parseOpts,r=t;return typeof i=="function"&&(r=i(r)),gt(r)||(r=typeof i=="string"?n.parse(r,i):n.parse(r)),r===null?null:(s&&(r=s==="week"&&(Kn(o)||o===!0)?n.startOf(r,"isoWeek",o):n.startOf(r,s)),+r)}function ih(e,t,n,i){let s=Gt.length;for(let o=Gt.indexOf(e);o<s-1;++o){let r=wr[Gt[o]],a=r.steps?r.steps:Number.MAX_SAFE_INTEGER;if(r.common&&Math.ceil((n-t)/(a*r.size))<=i)return Gt[o]}return Gt[s-1]}function wy(e,t,n,i,s){for(let o=Gt.length-1;o>=Gt.indexOf(n);o--){let r=Gt[o];if(wr[r].common&&e._adapter.diff(s,i,r)>=t-1)return r}return Gt[n?Gt.indexOf(n):0]}function _y(e){for(let t=Gt.indexOf(e)+1,n=Gt.length;t<n;++t)if(wr[Gt[t]].common)return Gt[t]}function sh(e,t,n){if(!n)e[t]=!0;else if(n.length){let{lo:i,hi:s}=ys(n,t),o=n[i]>=t?n[i]:n[s];e[o]=!0}}function ky(e,t,n,i){let s=e._adapter,o=+s.startOf(t[0].value,i),r=t[t.length-1].value,a,l;for(a=o;a<=r;a=+s.add(a,1,i))l=n[a],l>=0&&(t[l].major=!0);return t}function oh(e,t,n){let i=[],s={},o=t.length,r,a;for(r=0;r<o;++r)a=t[r],s[a]=r,i.push({value:a,major:!1});return o===0||!n?i:ky(e,i,s,n)}function hr(e,t,n){let i=0,s=e.length-1,o,r,a,l;n?(t>=e[i].pos&&t<=e[s].pos&&({lo:i,hi:s}=on(e,"pos",t)),{pos:o,time:a}=e[i],{pos:r,time:l}=e[s]):(t>=e[i].time&&t<=e[s].time&&({lo:i,hi:s}=on(e,"time",t)),{time:o,pos:a}=e[i],{time:r,pos:l}=e[s]);let c=r-o;return c?a+(l-a)*(t-o)/c:a}var Il,an,xf,yx,Nl,br,Dl,kf,Dx,Jn,Qn,Ll,Ax,Lx,ah,Cn,xr,Vl,gr,$x,Cf,ch,Ls,Pf,zl,Be,l0,Df,Af,ei,Mi,Fl,He,Hl,Lf,hh,Rs,jl,C0,D0,A0,mr,Bf,fe,W0,Tn,ti,$f,$0,vr,xh,Is,yh,Ns,vh,ny,sy,Ti,Di,Ci,Vs,Zn,fr,Ei,wr,Gt,Pi,pr,_h=M(()=>{Tl();Il=class{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,i,s){let o=n.listeners[s],r=n.duration;o.forEach(a=>a({chart:t,initial:n.initial,numSteps:r,currentStep:Math.min(i-n.start,r)}))}_refresh(){this._request||(this._running=!0,this._request=Yo.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;let o=i.items,r=o.length-1,a=!1,l;for(;r>=0;--r)l=o[r],l._active?(l._total>i.duration&&(i.duration=l._total),l.tick(t),a=!0):(o[r]=o[o.length-1],o.pop());a&&(s.draw(),this._notify(s,i,t,"progress")),o.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),n+=o.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){let n=this._charts,i=n.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,i)),i}listen(t,n,i){this._getAnims(t).listeners[n].push(i)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){let n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;let n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){let n=this._charts.get(t);if(!n||!n.items.length)return;let i=n.items,s=i.length-1;for(;s>=0;--s)i[s].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}},an=new Il,xf="transparent",yx={boolean(e,t,n){return n>.5?t:e},color(e,t,n){let i=Zo(e||xf),s=i.valid&&Zo(t||xf);return s&&s.valid?s.mix(i,n).hexString():t},number(e,t,n){return e+(t-e)*n}},Nl=class{constructor(t,n,i,s){let o=n[i];s=Si([t.to,s,o,t.from]);let r=Si([t.from,o,s]);this._active=!0,this._fn=t.fn||yx[t.type||typeof r],this._easing=$n[t.easing]||$n.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=i,this._from=r,this._to=s,this._promises=void 0}active(){return this._active}update(t,n,i){if(this._active){this._notify(!1);let s=this._target[this._prop],o=i-this._start,r=this._duration-o;this._start=i,this._duration=Math.floor(Math.max(r,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=Si([t.to,n,s,t.from]),this._from=Si([t.from,s,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){let n=t-this._start,i=this._duration,s=this._prop,o=this._from,r=this._loop,a=this._to,l;if(this._active=o!==a&&(r||n<i),!this._active){this._target[s]=a,this._notify(!0);return}if(n<0){this._target[s]=o;return}l=n/i%2,l=r&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[s]=this._fn(o,a,l)}wait(){let t=this._promises||(this._promises=[]);return new Promise((n,i)=>{t.push({res:n,rej:i})})}_notify(t){let n=t?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][n]()}},br=class{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!Y(t))return;let n=Object.keys(rt.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{let o=t[s];if(!Y(o))return;let r={};for(let a of n)r[a]=o[a];(it(o.properties)&&o.properties||[s]).forEach(a=>{(a===s||!i.has(a))&&i.set(a,r)})})}_animateOptions(t,n){let i=n.options,s=wx(t,i);if(!s)return[];let o=this._createAnimations(s,i);return i.$shared&&vx(t.options.$animations,i).then(()=>{t.options=i},()=>{}),o}_createAnimations(t,n){let i=this._properties,s=[],o=t.$animations||(t.$animations={}),r=Object.keys(n),a=Date.now(),l;for(l=r.length-1;l>=0;--l){let c=r[l];if(c.charAt(0)==="$")continue;if(c==="options"){s.push(...this._animateOptions(t,n));continue}let u=n[c],d=o[c],f=i.get(c);if(d)if(f&&d.active()){d.update(f,u,a);continue}else d.cancel();if(!f||!f.duration){t[c]=u;continue}o[c]=d=new Nl(f,t,c,u),s.push(d)}return s}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}let i=this._createAnimations(t,n);if(i.length)return an.add(this._chart,i),!0}};Dl=e=>e==="reset"||e==="none",kf=(e,t)=>t?e:Object.assign({},e),Dx=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:rh(n,!0),values:null},Jn=class{constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){let t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Cl(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Cs(this._cachedMeta),this.index=t}linkScales(){let t=this.chart,n=this._cachedMeta,i=this.getDataset(),s=(d,f,p,b)=>d==="x"?f:d==="r"?b:p,o=n.xAxisID=$(i.xAxisID,Pl(t,"x")),r=n.yAxisID=$(i.yAxisID,Pl(t,"y")),a=n.rAxisID=$(i.rAxisID,Pl(t,"r")),l=n.indexAxis,c=n.iAxisID=s(l,o,r,a),u=n.vAxisID=s(l,r,o,a);n.xScale=this.getScaleForId(o),n.yScale=this.getScaleForId(r),n.rScale=this.getScaleForId(a),n.iScale=this.getScaleForId(c),n.vScale=this.getScaleForId(u)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){let n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){let t=this._cachedMeta;this._data&&Go(this._data,this),t._stacked&&Cs(t)}_dataCheck(){let t=this.getDataset(),n=t.data||(t.data=[]),i=this._data;if(Y(n)){let s=this._cachedMeta;this._data=Sx(n,s)}else if(i!==n){if(i){Go(i,this);let s=this._cachedMeta;Cs(s),s._parsed=[]}n&&Object.isExtensible(n)&&ol(n,this),this._syncList=[],this._data=n}}addElements(){let t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){let n=this._cachedMeta,i=this.getDataset(),s=!1;this._dataCheck();let o=n._stacked;n._stacked=Cl(n.vScale,n),n.stack!==i.stack&&(s=!0,Cs(n),n.stack=i.stack),this._resyncElements(t),(s||o!==n._stacked)&&(_f(this,n._parsed),n._stacked=Cl(n.vScale,n))}configure(){let t=this.chart.config,n=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){let{_cachedMeta:i,_data:s}=this,{iScale:o,_stacked:r}=i,a=o.axis,l=t===0&&n===s.length?!0:i._sorted,c=t>0&&i._parsed[t-1],u,d,f;if(this._parsing===!1)i._parsed=s,i._sorted=!0,f=s;else{it(s[t])?f=this.parseArrayData(i,s,t,n):Y(s[t])?f=this.parseObjectData(i,s,t,n):f=this.parsePrimitiveData(i,s,t,n);let p=()=>d[a]===null||c&&d[a]<c[a];for(u=0;u<n;++u)i._parsed[u+t]=d=f[u],l&&(p()&&(l=!1),c=d);i._sorted=l}r&&_f(this,f)}parsePrimitiveData(t,n,i,s){let{iScale:o,vScale:r}=t,a=o.axis,l=r.axis,c=o.getLabels(),u=o===r,d=new Array(s),f,p,b;for(f=0,p=s;f<p;++f)b=f+i,d[f]={[a]:u||o.parse(c[b],b),[l]:r.parse(n[b],b)};return d}parseArrayData(t,n,i,s){let{xScale:o,yScale:r}=t,a=new Array(s),l,c,u,d;for(l=0,c=s;l<c;++l)u=l+i,d=n[u],a[l]={x:o.parse(d[0],u),y:r.parse(d[1],u)};return a}parseObjectData(t,n,i,s){let{xScale:o,yScale:r}=t,{xAxisKey:a="x",yAxisKey:l="y"}=this._parsing,c=new Array(s),u,d,f,p;for(u=0,d=s;u<d;++u)f=u+i,p=n[f],c[u]={x:o.parse(wi(p,a),f),y:r.parse(wi(p,l),f)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,i){let s=this.chart,o=this._cachedMeta,r=n[t.axis],a={keys:rh(s,!0),values:n._stacks[t.axis]._visualValues};return vf(a,r,o.index,{mode:i})}updateRangeFromParsed(t,n,i,s){let o=i[n.axis],r=o===null?NaN:o,a=s&&i._stacks[n.axis];s&&a&&(s.values=a,r=vf(s,o,this._cachedMeta.index)),t.min=Math.min(t.min,r),t.max=Math.max(t.max,r)}getMinMax(t,n){let i=this._cachedMeta,s=i._parsed,o=i._sorted&&t===i.iScale,r=s.length,a=this._getOtherScale(t),l=Dx(n,i,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:u,max:d}=Mx(a),f,p;function b(){p=s[f];let x=p[a.axis];return!gt(p[t.axis])||u>x||d<x}for(f=0;f<r&&!(!b()&&(this.updateRangeFromParsed(c,t,p,l),o));++f);if(o){for(f=r-1;f>=0;--f)if(!b()){this.updateRangeFromParsed(c,t,p,l);break}}return c}getAllParsedValues(t){let n=this._cachedMeta._parsed,i=[],s,o,r;for(s=0,o=n.length;s<o;++s)r=n[s][t.axis],gt(r)&&i.push(r);return i}getMaxOverflow(){return!1}getLabelAndValue(t){let n=this._cachedMeta,i=n.iScale,s=n.vScale,o=this.getParsed(t);return{label:i?""+i.getLabelForValue(o[i.axis]):"",value:s?""+s.getLabelForValue(o[s.axis]):""}}_update(t){let n=this._cachedMeta;this.update(t||"default"),n._clip=kx($(this.options.clip,_x(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){let t=this._ctx,n=this.chart,i=this._cachedMeta,s=i.data||[],o=n.chartArea,r=[],a=this._drawStart||0,l=this._drawCount||s.length-a,c=this.options.drawActiveElementsOnTop,u;for(i.dataset&&i.dataset.draw(t,o,a,l),u=a;u<a+l;++u){let d=s[u];d.hidden||(d.active&&c?r.push(d):d.draw(t,o))}for(u=0;u<r.length;++u)r[u].draw(t,o)}getStyle(t,n){let i=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,n,i){let s=this.getDataset(),o;if(t>=0&&t<this._cachedMeta.data.length){let r=this._cachedMeta.data[t];o=r.$context||(r.$context=Px(this.getContext(),t,r)),o.parsed=this.getParsed(t),o.raw=s.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=Cx(this.chart.getContext(),this.index)),o.dataset=s,o.index=o.datasetIndex=this.index;return o.active=!!n,o.mode=i,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",i){let s=n==="active",o=this._cachedDataOpts,r=t+"-"+n,a=o[r],l=this.enableOptionSharing&&_i(i);if(a)return kf(a,l);let c=this.chart.config,u=c.datasetElementScopeKeys(this._type,t),d=s?[\`\${t}Hover\`,"hover",t,""]:[t,""],f=c.getOptionScopes(this.getDataset(),u),p=Object.keys(rt.elements[t]),b=()=>this.getContext(i,s,n),x=c.resolveNamedOptions(f,p,b,d);return x.$shared&&(x.$shared=l,o[r]=Object.freeze(kf(x,l))),x}_resolveAnimations(t,n,i){let s=this.chart,o=this._cachedDataOpts,r=\`animation-\${n}\`,a=o[r];if(a)return a;let l;if(s.options.animation!==!1){let u=this.chart.config,d=u.datasetAnimationScopeKeys(this._type,n),f=u.getOptionScopes(this.getDataset(),d);l=u.createResolver(f,this.getContext(t,i,n))}let c=new br(s,l&&l.animations);return l&&l._cacheable&&(o[r]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||Dl(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){let i=this.resolveDataElementOptions(t,n),s=this._sharedOptions,o=this.getSharedOptions(i),r=this.includeOptions(n,o)||o!==s;return this.updateSharedOptions(o,n,i),{sharedOptions:o,includeOptions:r}}updateElement(t,n,i,s){Dl(s)?Object.assign(t,i):this._resolveAnimations(n,s).update(t,i)}updateSharedOptions(t,n,i){t&&!Dl(n)&&this._resolveAnimations(void 0,n).update(t,i)}_setStyle(t,n,i,s){t.active=s;let o=this.getStyle(n,s);this._resolveAnimations(n,i,s).update(t,{options:!s&&this.getSharedOptions(o)||o})}removeHoverStyle(t,n,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,n,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){let t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){let t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){let n=this._data,i=this._cachedMeta.data;for(let[a,l,c]of this._syncList)this[a](l,c);this._syncList=[];let s=i.length,o=n.length,r=Math.min(o,s);r&&this.parse(0,r),o>s?this._insertElements(s,o-s,t):o<s&&this._removeElements(o,s-o)}_insertElements(t,n,i=!0){let s=this._cachedMeta,o=s.data,r=t+n,a,l=c=>{for(c.length+=n,a=c.length-1;a>=r;a--)c[a]=c[a-n]};for(l(o),a=t;a<r;++a)o[a]=new this.dataElementType;this._parsing&&l(s._parsed),this.parse(t,n),i&&this.updateElements(o,t,n,"reset")}updateElements(t,n,i,s){}_removeElements(t,n){let i=this._cachedMeta;if(this._parsing){let s=i._parsed.splice(t,n);i._stacked&&Cs(i,s)}i.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{let[n,i,s]=t;this[n](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){let t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);let i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}};F(Jn,"defaults",{}),F(Jn,"datasetElementType",null),F(Jn,"dataElementType",null);Qn=class extends Jn{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){let n=this._cachedMeta,{dataset:i,data:s=[],_dataset:o}=n,r=this.chart._animationsDisabled,{start:a,count:l}=cl(n,s,r);this._drawStart=a,this._drawCount=l,ul(n)&&(a=0,l=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!o._decimated,i.points=s;let c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(i,void 0,{animated:!r,options:c},t),this.updateElements(s,a,l,t)}updateElements(t,n,i,s){let o=s==="reset",{iScale:r,vScale:a,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:u,includeOptions:d}=this._getSharedOptions(n,s),f=r.axis,p=a.axis,{spanGaps:b,segment:x}=this.options,y=Kn(b)?b:Number.POSITIVE_INFINITY,w=this.chart._animationsDisabled||o||s==="none",_=n+i,S=t.length,E=n>0&&this.getParsed(n-1);for(let T=0;T<S;++T){let A=t[T],R=w?A:{};if(T<n||T>=_){R.skip=!0;continue}let P=this.getParsed(T),N=X(P[p]),W=R[f]=r.getPixelForValue(P[f],T),H=R[p]=o||N?a.getBasePixel():a.getPixelForValue(l?this.applyStack(a,P,l):P[p],T);R.skip=isNaN(W)||isNaN(H)||N,R.stop=T>0&&Math.abs(P[f]-E[f])>y,x&&(R.parsed=P,R.raw=c.data[T]),d&&(R.options=u||this.resolveDataElementOptions(T,A.active?"active":s)),w||this.updateElement(A,T,R,s),E=P}}getMaxOverflow(){let t=this._cachedMeta,n=t.dataset,i=n.options&&n.options.borderWidth||0,s=t.data||[];if(!s.length)return i;let o=s[0].size(this.resolveDataElementOptions(0)),r=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,o,r)/2}draw(){let t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}};F(Qn,"id","line"),F(Qn,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),F(Qn,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});Ll=class e{constructor(t){F(this,"options");this.options=t||{}}static override(t){Object.assign(e.prototype,t)}init(){}formats(){return qn()}parse(){return qn()}format(){return qn()}add(){return qn()}diff(){return qn()}startOf(){return qn()}endOf(){return qn()}},Ax={_date:Ll};Lx={evaluateInteractionItems:zs,modes:{index(e,t,n,i){let s=ie(t,e),o=n.axis||"x",r=n.includeInvisible||!1,a=n.intersect?Al(e,s,o,i,r):Rl(e,s,o,!1,i,r),l=[];return a.length?(e.getSortedVisibleDatasetMetas().forEach(c=>{let u=a[0].index,d=c.data[u];d&&!d.skip&&l.push({element:d,datasetIndex:c.index,index:u})}),l):[]},dataset(e,t,n,i){let s=ie(t,e),o=n.axis||"xy",r=n.includeInvisible||!1,a=n.intersect?Al(e,s,o,i,r):Rl(e,s,o,!1,i,r);if(a.length>0){let l=a[0].datasetIndex,c=e.getDatasetMeta(l).data;a=[];for(let u=0;u<c.length;++u)a.push({element:c[u],datasetIndex:l,index:u})}return a},point(e,t,n,i){let s=ie(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;return Al(e,s,o,i,r)},nearest(e,t,n,i){let s=ie(t,e),o=n.axis||"xy",r=n.includeInvisible||!1;return Rl(e,s,o,n.intersect,i,r)},x(e,t,n,i){let s=ie(t,e);return Sf(e,s,"x",n.intersect,i)},y(e,t,n,i){let s=ie(t,e);return Sf(e,s,"y",n.intersect,i)}}},ah=["left","top","right","bottom"];Cn={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){let n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,i){if(!e)return;let s=Et(e.options.layout.padding),o=Math.max(t-s.width,0),r=Math.max(n-s.height,0),a=Hx(e.boxes),l=a.vertical,c=a.horizontal;U(e.boxes,x=>{typeof x.beforeLayout=="function"&&x.beforeLayout()});let u=l.reduce((x,y)=>y.box.options&&y.box.options.display===!1?x:x+1,0)||1,d=Object.freeze({outerWidth:t,outerHeight:n,padding:s,availableWidth:o,availableHeight:r,vBoxMaxWidth:o/2/u,hBoxMaxHeight:r/2}),f=Object.assign({},s);lh(f,Et(i));let p=Object.assign({maxPadding:f,w:o,h:r,x:s.left,y:s.top},s),b=Fx(l.concat(c),d);Os(a.fullSize,p,d,b),Os(l,p,d,b),Os(c,p,d,b)&&Os(l,p,d,b),Wx(p),Tf(a.leftAndTop,p,d,b),p.x+=p.w,p.y+=p.h,Tf(a.rightAndBottom,p,d,b),e.chartArea={left:p.left,top:p.top,right:p.left+p.w,bottom:p.top+p.h,height:p.h,width:p.w},U(a.chartArea,x=>{let y=x.box;Object.assign(y,e.chartArea),y.update(p.w,p.h,{left:0,top:0,right:0,bottom:0})})}},xr=class{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,i){}removeEventListener(t,n,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,i,s){return n=Math.max(0,n||t.width),i=i||t.height,{width:n,height:Math.max(0,s?Math.floor(n/s):i)}}isAttached(t){return!0}updateConfig(t){}},Vl=class extends xr{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}},gr="$chartjs",$x={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Cf=e=>e===null||e==="";ch=vl?{passive:!0}:!1;Ls=new Map,Pf=0;zl=class extends xr{acquireContext(t,n){let i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(Ux(t,n),i):null}releaseContext(t){let n=t.canvas;if(!n[gr])return!1;let i=n[gr].initial;["height","width"].forEach(o=>{let r=i[o];X(r)?n.removeAttribute(o):n.setAttribute(o,r)});let s=i.style||{};return Object.keys(s).forEach(o=>{n.style[o]=s[o]}),n.width=n.width,delete n[gr],!0}addEventListener(t,n,i){this.removeEventListener(t,n);let s=t.$proxies||(t.$proxies={}),r={attach:Xx,detach:qx,resize:Qx}[n]||t0;s[n]=r(t,n,i)}removeEventListener(t,n){let i=t.$proxies||(t.$proxies={}),s=i[n];if(!s)return;({attach:Ol,detach:Ol,resize:Ol}[n]||Yx)(t,n,s),i[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,i,s){return yl(t,n,i,s)}isAttached(t){let n=t&&Ts(t);return!!(n&&n.isConnected)}};Be=class{constructor(){F(this,"x");F(this,"y");F(this,"active",!1);F(this,"options");F(this,"$animations")}tooltipPosition(t){let{x:n,y:i}=this.getProps(["x","y"],t);return{x:n,y:i}}hasValue(){return Kn(this.x)&&Kn(this.y)}getProps(t,n){let i=this.$animations;if(!n||!i)return this;let s={};return t.forEach(o=>{s[o]=i[o]&&i[o].active()?i[o]._to:this[o]}),s}};F(Be,"defaults",{}),F(Be,"defaultRoutes");l0=e=>e==="left"?"right":e==="right"?"left":e,Df=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,Af=(e,t)=>Math.min(t||e,e);ei=class e extends Be{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:i,_suggestedMax:s}=this;return t=Nt(t,Number.POSITIVE_INFINITY),n=Nt(n,Number.NEGATIVE_INFINITY),i=Nt(i,Number.POSITIVE_INFINITY),s=Nt(s,Number.NEGATIVE_INFINITY),{min:Nt(t,i),max:Nt(n,s),minDefined:gt(t),maxDefined:gt(n)}}getMinMax(t){let{min:n,max:i,minDefined:s,maxDefined:o}=this.getUserBounds(),r;if(s&&o)return{min:n,max:i};let a=this.getMatchingVisibleMetas();for(let l=0,c=a.length;l<c;++l)r=a[l].controller.getMinMax(this,t),s||(n=Math.min(n,r.min)),o||(i=Math.max(i,r.max));return n=o&&n>i?i:n,i=s&&n>i?n:i,{min:Nt(n,Nt(i,n)),max:Nt(i,Nt(n,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){let t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){V(this.options.beforeUpdate,[this])}update(t,n,i){let{beginAtZero:s,grace:o,ticks:r}=this.options,a=r.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=gl(this,o,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();let l=a<this.ticks.length;this._convertTicksToLabels(l?Rf(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),r.display&&(r.autoSkip||r.source==="auto")&&(this.ticks=n0(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,i;this.isHorizontal()?(n=this.left,i=this.right):(n=this.top,i=this.bottom,t=!t),this._startPixel=n,this._endPixel=i,this._reversePixels=t,this._length=i-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){V(this.options.afterUpdate,[this])}beforeSetDimensions(){V(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){V(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),V(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){V(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){let n=this.options.ticks,i,s,o;for(i=0,s=t.length;i<s;i++)o=t[i],o.label=V(n.callback,[o.value,i,t],this)}afterTickToLabelConversion(){V(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){V(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){let t=this.options,n=t.ticks,i=Af(this.ticks.length,t.ticks.maxTicksLimit),s=n.minRotation||0,o=n.maxRotation,r=s,a,l,c;if(!this._isVisible()||!n.display||s>=o||i<=1||!this.isHorizontal()){this.labelRotation=s;return}let u=this._getLabelSizes(),d=u.widest.width,f=u.highest.height,p=$t(this.chart.width-d,0,this.maxWidth);a=t.offset?this.maxWidth/i:p/(i-1),d+6>a&&(a=p/(i-(t.offset?.5:1)),l=this.maxHeight-As(t.grid)-n.padding-Of(t.title,this.chart.options.font),c=Math.sqrt(d*d+f*f),r=xs(Math.min(Math.asin($t((u.highest.height+6)/a,-1,1)),Math.asin($t(l/c,-1,1))-Math.asin($t(f/c,-1,1)))),r=Math.max(s,Math.min(o,r))),this.labelRotation=r}afterCalculateLabelRotation(){V(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){V(this.options.beforeFit,[this])}fit(){let t={width:0,height:0},{chart:n,options:{ticks:i,title:s,grid:o}}=this,r=this._isVisible(),a=this.isHorizontal();if(r){let l=Of(s,n.options.font);if(a?(t.width=this.maxWidth,t.height=As(o)+l):(t.height=this.maxHeight,t.width=As(o)+l),i.display&&this.ticks.length){let{first:c,last:u,widest:d,highest:f}=this._getLabelSizes(),p=i.padding*2,b=Ve(this.labelRotation),x=Math.cos(b),y=Math.sin(b);if(a){let w=i.mirror?0:y*d.width+x*f.height;t.height=Math.min(this.maxHeight,t.height+w+p)}else{let w=i.mirror?0:x*d.width+y*f.height;t.width=Math.min(this.maxWidth,t.width+w+p)}this._calculatePadding(c,u,y,x)}}this._handleMargins(),a?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,i,s){let{ticks:{align:o,padding:r},position:a}=this.options,l=this.labelRotation!==0,c=a!=="top"&&this.axis==="x";if(this.isHorizontal()){let u=this.getPixelForTick(0)-this.left,d=this.right-this.getPixelForTick(this.ticks.length-1),f=0,p=0;l?c?(f=s*t.width,p=i*n.height):(f=i*t.height,p=s*n.width):o==="start"?p=n.width:o==="end"?f=t.width:o!=="inner"&&(f=t.width/2,p=n.width/2),this.paddingLeft=Math.max((f-u+r)*this.width/(this.width-u),0),this.paddingRight=Math.max((p-d+r)*this.width/(this.width-d),0)}else{let u=n.height/2,d=t.height/2;o==="start"?(u=0,d=t.height):o==="end"&&(u=n.height,d=0),this.paddingTop=u+r,this.paddingBottom=d+r}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){V(this.options.afterFit,[this])}isHorizontal(){let{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,i;for(n=0,i=t.length;n<i;n++)X(t[n].label)&&(t.splice(n,1),i--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){let n=this.options.ticks.sampleSize,i=this.ticks;n<i.length&&(i=Rf(i,n)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,i){let{ctx:s,_longestTextCache:o}=this,r=[],a=[],l=Math.floor(n/Af(n,i)),c=0,u=0,d,f,p,b,x,y,w,_,S,E,T;for(d=0;d<n;d+=l){if(b=t[d].label,x=this._resolveTickFontOptions(d),s.font=y=x.string,w=o[y]=o[y]||{data:{},gc:[]},_=x.lineHeight,S=E=0,!X(b)&&!it(b))S=xi(s,w.data,w.gc,S,b),E=_;else if(it(b))for(f=0,p=b.length;f<p;++f)T=b[f],!X(T)&&!it(T)&&(S=xi(s,w.data,w.gc,S,T),E+=_);r.push(S),a.push(E),c=Math.max(S,c),u=Math.max(E,u)}u0(o,n);let A=r.indexOf(c),R=a.indexOf(u),P=N=>({width:r[N]||0,height:a[N]||0});return{first:P(0),last:P(n-1),widest:P(A),highest:P(R),widths:r,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){let n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);let n=this._startPixel+t*this._length;return nl(this._alignToPixels?rn(this.chart,n,0):n)}getDecimalForPixel(t){let n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){let{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){let n=this.ticks||[];if(t>=0&&t<n.length){let i=n[t];return i.$context||(i.$context=f0(this.getContext(),t,i))}return this.$context||(this.$context=d0(this.chart.getContext(),this))}_tickSize(){let t=this.options.ticks,n=Ve(this.labelRotation),i=Math.abs(Math.cos(n)),s=Math.abs(Math.sin(n)),o=this._getLabelSizes(),r=t.autoSkipPadding||0,a=o?o.widest.width+r:0,l=o?o.highest.height+r:0;return this.isHorizontal()?l*i>a*s?a/i:l/s:l*s<a*i?l/i:a/s}_isVisible(){let t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){let n=this.axis,i=this.chart,s=this.options,{grid:o,position:r,border:a}=s,l=o.offset,c=this.isHorizontal(),d=this.ticks.length+(l?1:0),f=As(o),p=[],b=a.setContext(this.getContext()),x=b.display?b.width:0,y=x/2,w=function(nt){return rn(i,nt,x)},_,S,E,T,A,R,P,N,W,H,B,st;if(r==="top")_=w(this.bottom),R=this.bottom-f,N=_-y,H=w(t.top)+y,st=t.bottom;else if(r==="bottom")_=w(this.top),H=t.top,st=w(t.bottom)-y,R=_+y,N=this.top+f;else if(r==="left")_=w(this.right),A=this.right-f,P=_-y,W=w(t.left)+y,B=t.right;else if(r==="right")_=w(this.left),W=t.left,B=w(t.right)-y,A=_+y,P=this.left+f;else if(n==="x"){if(r==="center")_=w((t.top+t.bottom)/2+.5);else if(Y(r)){let nt=Object.keys(r)[0],vt=r[nt];_=w(this.chart.scales[nt].getPixelForValue(vt))}H=t.top,st=t.bottom,R=_+y,N=R+f}else if(n==="y"){if(r==="center")_=w((t.left+t.right)/2);else if(Y(r)){let nt=Object.keys(r)[0],vt=r[nt];_=w(this.chart.scales[nt].getPixelForValue(vt))}A=_-y,P=A-f,W=t.left,B=t.right}let Tt=$(s.ticks.maxTicksLimit,d),Q=Math.max(1,Math.ceil(d/Tt));for(S=0;S<d;S+=Q){let nt=this.getContext(S),vt=o.setContext(nt),Ee=a.setContext(nt),je=vt.lineWidth,ge=vt.color,zt=Ee.dash||[],me=Ee.dashOffset,Xt=vt.tickWidth,qt=vt.tickColor,Zt=vt.tickBorderDash||[],tt=vt.tickBorderDashOffset;E=c0(this,S,l),E!==void 0&&(T=rn(i,E,je),c?A=P=W=B=T:R=N=H=st=T,p.push({tx1:A,ty1:R,tx2:P,ty2:N,x1:W,y1:H,x2:B,y2:st,width:je,color:ge,borderDash:zt,borderDashOffset:me,tickWidth:Xt,tickColor:qt,tickBorderDash:Zt,tickBorderDashOffset:tt}))}return this._ticksLength=d,this._borderValue=_,p}_computeLabelItems(t){let n=this.axis,i=this.options,{position:s,ticks:o}=i,r=this.isHorizontal(),a=this.ticks,{align:l,crossAlign:c,padding:u,mirror:d}=o,f=As(i.grid),p=f+u,b=d?-u:p,x=-Ve(this.labelRotation),y=[],w,_,S,E,T,A,R,P,N,W,H,B,st="middle";if(s==="top")A=this.bottom-b,R=this._getXAxisLabelAlignment();else if(s==="bottom")A=this.top+b,R=this._getXAxisLabelAlignment();else if(s==="left"){let Q=this._getYAxisLabelAlignment(f);R=Q.textAlign,T=Q.x}else if(s==="right"){let Q=this._getYAxisLabelAlignment(f);R=Q.textAlign,T=Q.x}else if(n==="x"){if(s==="center")A=(t.top+t.bottom)/2+p;else if(Y(s)){let Q=Object.keys(s)[0],nt=s[Q];A=this.chart.scales[Q].getPixelForValue(nt)+p}R=this._getXAxisLabelAlignment()}else if(n==="y"){if(s==="center")T=(t.left+t.right)/2-p;else if(Y(s)){let Q=Object.keys(s)[0],nt=s[Q];T=this.chart.scales[Q].getPixelForValue(nt)}R=this._getYAxisLabelAlignment(f).textAlign}n==="y"&&(l==="start"?st="top":l==="end"&&(st="bottom"));let Tt=this._getLabelSizes();for(w=0,_=a.length;w<_;++w){S=a[w],E=S.label;let Q=o.setContext(this.getContext(w));P=this.getPixelForTick(w)+o.labelOffset,N=this._resolveTickFontOptions(w),W=N.lineHeight,H=it(E)?E.length:1;let nt=H/2,vt=Q.color,Ee=Q.textStrokeColor,je=Q.textStrokeWidth,ge=R;r?(T=P,R==="inner"&&(w===_-1?ge=this.options.reverse?"left":"right":w===0?ge=this.options.reverse?"right":"left":ge="center"),s==="top"?c==="near"||x!==0?B=-H*W+W/2:c==="center"?B=-Tt.highest.height/2-nt*W+W:B=-Tt.highest.height+W/2:c==="near"||x!==0?B=W/2:c==="center"?B=Tt.highest.height/2-nt*W:B=Tt.highest.height-H*W,d&&(B*=-1),x!==0&&!Q.showLabelBackdrop&&(T+=W/2*Math.sin(x))):(A=P,B=(1-H)*W/2);let zt;if(Q.showLabelBackdrop){let me=Et(Q.backdropPadding),Xt=Tt.heights[w],qt=Tt.widths[w],Zt=B-me.top,tt=0-me.left;switch(st){case"middle":Zt-=Xt/2;break;case"bottom":Zt-=Xt;break}switch(R){case"center":tt-=qt/2;break;case"right":tt-=qt;break;case"inner":w===_-1?tt-=qt:w>0&&(tt-=qt/2);break}zt={left:tt,top:Zt,width:qt+me.width,height:Xt+me.height,color:Q.backdropColor}}y.push({label:E,font:N,textOffset:B,options:{rotation:x,color:vt,strokeColor:Ee,strokeWidth:je,textAlign:ge,textBaseline:st,translation:[T,A],backdrop:zt}})}return y}_getXAxisLabelAlignment(){let{position:t,ticks:n}=this.options;if(-Ve(this.labelRotation))return t==="top"?"left":"right";let s="center";return n.align==="start"?s="left":n.align==="end"?s="right":n.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){let{position:n,ticks:{crossAlign:i,mirror:s,padding:o}}=this.options,r=this._getLabelSizes(),a=t+o,l=r.widest.width,c,u;return n==="left"?s?(u=this.right+o,i==="near"?c="left":i==="center"?(c="center",u+=l/2):(c="right",u+=l)):(u=this.right-a,i==="near"?c="right":i==="center"?(c="center",u-=l/2):(c="left",u=this.left)):n==="right"?s?(u=this.left+o,i==="near"?c="right":i==="center"?(c="center",u-=l/2):(c="left",u-=l)):(u=this.left+a,i==="near"?c="left":i==="center"?(c="center",u+=l/2):(c="right",u=this.right)):c="right",{textAlign:c,x:u}}_computeLabelArea(){if(this.options.ticks.mirror)return;let t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){let{ctx:t,options:{backgroundColor:n},left:i,top:s,width:o,height:r}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(i,s,o,r),t.restore())}getLineWidthForValue(t){let n=this.options.grid;if(!this._isVisible()||!n.display)return 0;let s=this.ticks.findIndex(o=>o.value===t);return s>=0?n.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){let n=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t)),o,r,a=(l,c,u)=>{!u.width||!u.color||(i.save(),i.lineWidth=u.width,i.strokeStyle=u.color,i.setLineDash(u.borderDash||[]),i.lineDashOffset=u.borderDashOffset,i.beginPath(),i.moveTo(l.x,l.y),i.lineTo(c.x,c.y),i.stroke(),i.restore())};if(n.display)for(o=0,r=s.length;o<r;++o){let l=s[o];n.drawOnChartArea&&a({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),n.drawTicks&&a({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){let{chart:t,ctx:n,options:{border:i,grid:s}}=this,o=i.setContext(this.getContext()),r=i.display?o.width:0;if(!r)return;let a=s.setContext(this.getContext(0)).lineWidth,l=this._borderValue,c,u,d,f;this.isHorizontal()?(c=rn(t,this.left,r)-r/2,u=rn(t,this.right,a)+a/2,d=f=l):(d=rn(t,this.top,r)-r/2,f=rn(t,this.bottom,a)+a/2,c=u=l),n.save(),n.lineWidth=o.width,n.strokeStyle=o.color,n.beginPath(),n.moveTo(c,d),n.lineTo(u,f),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;let i=this.ctx,s=this._computeLabelArea();s&&ks(i,s);let o=this.getLabelItems(t);for(let r of o){let a=r.options,l=r.font,c=r.label,u=r.textOffset;Sn(i,c,0,u,l,a)}s&&Ss(i)}drawTitle(){let{ctx:t,options:{position:n,title:i,reverse:s}}=this;if(!i.display)return;let o=bt(i.font),r=Et(i.padding),a=i.align,l=o.lineHeight/2;n==="bottom"||n==="center"||Y(n)?(l+=r.bottom,it(i.text)&&(l+=o.lineHeight*(i.text.length-1))):l+=r.top;let{titleX:c,titleY:u,maxWidth:d,rotation:f}=p0(this,l,n,a);Sn(t,i.text,0,0,o,{color:i.color,maxWidth:d,rotation:f,textAlign:h0(a,n,s),textBaseline:"middle",translation:[c,u]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){let t=this.options,n=t.ticks&&t.ticks.z||0,i=$(t.grid&&t.grid.z,-1),s=$(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==e.prototype.draw?[{z:n,draw:o=>{this.draw(o)}}]:[{z:i,draw:o=>{this.drawBackground(),this.drawGrid(o),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:n,draw:o=>{this.drawLabels(o)}}]}getMatchingVisibleMetas(t){let n=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[],o,r;for(o=0,r=n.length;o<r;++o){let a=n[o];a[i]===this.id&&(!t||a.type===t)&&s.push(a)}return s}_resolveTickFontOptions(t){let n=this.options.ticks.setContext(this.getContext(t));return bt(n.font)}_maxDigits(){let t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}},Mi=class{constructor(t,n,i){this.type=t,this.scope=n,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){let n=Object.getPrototypeOf(t),i;b0(n)&&(i=this.register(n));let s=this.items,o=t.id,r=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in s||(s[o]=t,g0(t,r,i),this.override&&rt.override(t.id,t.overrides)),r}get(t){return this.items[t]}unregister(t){let n=this.items,i=t.id,s=this.scope;i in n&&delete n[i],s&&i in rt[s]&&(delete rt[s][i],this.override&&delete kn[i])}};Fl=class{constructor(){this.controllers=new Mi(Jn,"datasets",!0),this.elements=new Mi(Be,"elements"),this.plugins=new Mi(Object,"plugins"),this.scales=new Mi(ei,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,i){[...n].forEach(s=>{let o=i||this._getRegistryForType(s);i||o.isForType(s)||o===this.plugins&&s.id?this._exec(t,o,s):U(s,r=>{let a=i||this._getRegistryForType(r);this._exec(t,a,r)})})}_exec(t,n,i){let s=bs(t);V(i["before"+s],[],i),n[t](i),V(i["after"+s],[],i)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){let i=this._typedRegistries[n];if(i.isForType(t))return i}return this.plugins}_get(t,n,i){let s=n.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return s}},He=new Fl,Hl=class{constructor(){this._init=void 0}notify(t,n,i,s){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;let o=s?this._descriptors(t).filter(s):this._descriptors(t),r=this._notify(o,t,n,i);return n==="afterDestroy"&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),r}_notify(t,n,i,s){s=s||{};for(let o of t){let r=o.plugin,a=r[i],l=[n,s,o.options];if(V(a,l,r)===!1&&s.cancelable)return!1}return!0}invalidate(){X(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;let n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){let i=t&&t.config,s=$(i.options&&i.options.plugins,{}),o=x0(i);return s===!1&&!n?[]:v0(t,o,s,n)}_notifyStateChanges(t){let n=this._oldCache||[],i=this._cache,s=(o,r)=>o.filter(a=>!r.some(l=>a.plugin.id===l.plugin.id));this._notify(s(n,i),t,"stop"),this._notify(s(i,n),t,"start")}};Lf=new Map,hh=new Set;Rs=(e,t,n)=>{let i=wi(t,n);i!==void 0&&e.add(i)},jl=class{constructor(t){this._config=T0(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=fh(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){let t=this._config;this.clearCache(),dh(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return ur(t,()=>[[\`datasets.\${t}\`,""]])}datasetAnimationScopeKeys(t,n){return ur(\`\${t}.transition.\${n}\`,()=>[[\`datasets.\${t}.transitions.\${n}\`,\`transitions.\${n}\`],[\`datasets.\${t}\`,""]])}datasetElementScopeKeys(t,n){return ur(\`\${t}-\${n}\`,()=>[[\`datasets.\${t}.elements.\${n}\`,\`datasets.\${t}\`,\`elements.\${n}\`,""]])}pluginScopeKeys(t){let n=t.id,i=this.type;return ur(\`\${i}-plugin-\${n}\`,()=>[[\`plugins.\${n}\`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){let i=this._scopeCache,s=i.get(t);return(!s||n)&&(s=new Map,i.set(t,s)),s}getOptionScopes(t,n,i){let{options:s,type:o}=this,r=this._cachedScopes(t,i),a=r.get(n);if(a)return a;let l=new Set;n.forEach(u=>{t&&(l.add(t),u.forEach(d=>Rs(l,t,d))),u.forEach(d=>Rs(l,s,d)),u.forEach(d=>Rs(l,kn[o]||{},d)),u.forEach(d=>Rs(l,rt,d)),u.forEach(d=>Rs(l,Jo,d))});let c=Array.from(l);return c.length===0&&c.push(Object.create(null)),hh.has(n)&&r.set(n,c),c}chartOptionScopes(){let{options:t,type:n}=this;return[t,kn[n]||{},rt.datasets[n]||{},{type:n},rt,Jo]}resolveNamedOptions(t,n,i,s=[""]){let o={$shared:!0},{resolver:r,subPrefixes:a}=Vf(this._resolverCache,t,s),l=r;if(P0(r,n)){o.$shared=!1,i=Ie(i)?i():i;let c=this.createResolver(t,i,a);l=_n(r,i,c)}for(let c of n)o[c]=l[c];return o}createResolver(t,n,i=[""],s){let{resolver:o}=Vf(this._resolverCache,t,i);return Y(n)?_n(o,n,void 0,s):o}};C0=e=>Y(e)&&Object.getOwnPropertyNames(e).some(t=>Ie(e[t]));D0="4.5.1",A0=["top","bottom","left","right","chartArea"];mr={},Bf=e=>{let t=ph(e);return Object.values(mr).filter(n=>n.canvas===t).pop()};fe=class{static register(...t){He.add(...t),Wf()}static unregister(...t){He.remove(...t),Wf()}constructor(t,n){let i=this.config=new jl(n),s=ph(t),o=Bf(s);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");let r=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||e0(s)),this.platform.updateConfig(i);let a=this.platform.acquireContext(s,r.aspectRatio),l=a&&a.canvas,c=l&&l.height,u=l&&l.width;if(this.id=qa(),this.ctx=a,this.canvas=l,this.width=u,this.height=c,this._options=r,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new Hl,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=al(d=>this.update(d),r.resizeDelay||0),this._dataChanges=[],mr[this.id]=this,!a||!l){console.error("Failed to create chart: can't acquire context from the given item");return}an.listen(this,"complete",Hf),an.listen(this,"progress",R0),this._initialize(),this.attached&&this.update()}get aspectRatio(){let{options:{aspectRatio:t,maintainAspectRatio:n},width:i,height:s,_aspectRatio:o}=this;return X(t)?n&&o?o:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return He}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():sr(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Qo(this.canvas,this.ctx),this}stop(){return an.stop(this),this}resize(t,n){an.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){let i=this.options,s=this.canvas,o=i.maintainAspectRatio&&this.aspectRatio,r=this.platform.getMaximumSize(s,t,n,o),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=r.width,this.height=r.height,this._aspectRatio=this.aspectRatio,sr(this,a,!0)&&(this.notifyPlugins("resize",{size:r}),V(i.onResize,[this,r],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){let n=this.options.scales||{};U(n,(i,s)=>{i.id=s})}buildOrUpdateScales(){let t=this.options,n=t.scales,i=this.scales,s=Object.keys(i).reduce((r,a)=>(r[a]=!1,r),{}),o=[];n&&(o=o.concat(Object.keys(n).map(r=>{let a=n[r],l=Wl(r,a),c=l==="r",u=l==="x";return{options:a,dposition:c?"chartArea":u?"bottom":"left",dtype:c?"radialLinear":u?"category":"linear"}}))),U(o,r=>{let a=r.options,l=a.id,c=Wl(l,a),u=$(a.type,r.dtype);(a.position===void 0||zf(a.position,c)!==zf(r.dposition))&&(a.position=r.dposition),s[l]=!0;let d=null;if(l in i&&i[l].type===u)d=i[l];else{let f=He.getScale(u);d=new f({id:l,type:u,ctx:this.ctx,chart:this}),i[d.id]=d}d.init(a,t)}),U(s,(r,a)=>{r||delete i[a]}),U(i,r=>{Cn.configure(this,r,r.options),Cn.addBox(this,r)})}_updateMetasets(){let t=this._metasets,n=this.data.datasets.length,i=t.length;if(t.sort((s,o)=>s.index-o.index),i>n){for(let s=n;s<i;++s)this._destroyDatasetMeta(s);t.splice(n,i-n)}this._sortedMetasets=t.slice(0).sort(Ff("order","index"))}_removeUnreferencedMetasets(){let{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((i,s)=>{n.filter(o=>o===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){let t=[],n=this.data.datasets,i,s;for(this._removeUnreferencedMetasets(),i=0,s=n.length;i<s;i++){let o=n[i],r=this.getDatasetMeta(i),a=o.type||this.config.type;if(r.type&&r.type!==a&&(this._destroyDatasetMeta(i),r=this.getDatasetMeta(i)),r.type=a,r.indexAxis=o.indexAxis||Bl(a,this.options),r.order=o.order||0,r.index=i,r.label=""+o.label,r.visible=this.isDatasetVisible(i),r.controller)r.controller.updateIndex(i),r.controller.linkScales();else{let l=He.getController(a),{datasetElementType:c,dataElementType:u}=rt.datasets[a];Object.assign(l,{dataElementType:He.getElement(u),datasetElementType:c&&He.getElement(c)}),r.controller=new l(this,i),t.push(r.controller)}}return this._updateMetasets(),t}_resetElements(){U(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){let n=this.config;n.update();let i=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;let o=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let r=0;for(let c=0,u=this.data.datasets.length;c<u;c++){let{controller:d}=this.getDatasetMeta(c),f=!s&&o.indexOf(d)===-1;d.buildOrUpdateElements(f),r=Math.max(+d.getMaxOverflow(),r)}r=this._minPadding=i.layout.autoPadding?r:0,this._updateLayout(r),s||U(o,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(Ff("z","_idx"));let{_active:a,_lastEvent:l}=this;l?this._eventHandler(l,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){U(this.scales,t=>{Cn.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){let t=this.options,n=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!Bo(n,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){let{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(let{method:i,start:s,count:o}of n){let r=i==="_removeElements"?-o:o;O0(t,s,r)}}_getUniformDataChanges(){let t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];let n=this.data.datasets.length,i=o=>new Set(t.filter(r=>r[0]===o).map((r,a)=>a+","+r.splice(1).join(","))),s=i(0);for(let o=1;o<n;o++)if(!Bo(s,i(o)))return;return Array.from(s).map(o=>o.split(",")).map(o=>({method:o[1],start:+o[2],count:+o[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Cn.update(this,this.width,this.height,t);let n=this.chartArea,i=n.width<=0||n.height<=0;this._layers=[],U(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,o)=>{s._idx=o}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,i=this.data.datasets.length;n<i;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,i=this.data.datasets.length;n<i;++n)this._updateDataset(n,Ie(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){let i=this.getDatasetMeta(t),s={meta:i,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(n),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(an.has(this)?this.attached&&!an.running(this)&&an.start(this):(this.draw(),Hf({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){let{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;let n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){let n=this._sortedMetasets,i=[],s,o;for(s=0,o=n.length;s<o;++s){let r=n[s];(!t||r.visible)&&i.push(r)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;let t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){let n=this.ctx,i={meta:t,index:t.index,cancelable:!0},s=Ml(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&ks(n,s),t.controller.draw(),s&&Ss(n),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return ne(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,i,s){let o=Lx.modes[n];return typeof o=="function"?o(this,t,i,s):[]}getDatasetMeta(t){let n=this.data.datasets[t],i=this._metasets,s=i.filter(o=>o&&o._dataset===n).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=ze(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){let n=this.data.datasets[t];if(!n)return!1;let i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!n.hidden}setDatasetVisibility(t,n){let i=this.getDatasetMeta(t);i.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,i){let s=i?"show":"hide",o=this.getDatasetMeta(t),r=o.controller._resolveAnimations(void 0,s);_i(n)?(o.data[n].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),r.update(o,{visible:i}),this.update(a=>a.datasetIndex===t?s:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){let n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),an.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");let{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Qo(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete mr[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){let t=this._listeners,n=this.platform,i=(o,r)=>{n.addEventListener(this,o,r),t[o]=r},s=(o,r,a)=>{o.offsetX=r,o.offsetY=a,this._eventHandler(o)};U(this.options.events,o=>i(o,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});let t=this._responsiveListeners,n=this.platform,i=(l,c)=>{n.addEventListener(this,l,c),t[l]=c},s=(l,c)=>{t[l]&&(n.removeEventListener(this,l,c),delete t[l])},o=(l,c)=>{this.canvas&&this.resize(l,c)},r,a=()=>{s("attach",a),this.attached=!0,this.resize(),i("resize",o),i("detach",r)};r=()=>{this.attached=!1,s("resize",o),this._stop(),this._resize(0,0),i("attach",a)},n.isAttached(this.canvas)?a():r()}unbindEvents(){U(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},U(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,i){let s=i?"set":"remove",o,r,a,l;for(n==="dataset"&&(o=this.getDatasetMeta(t[0].datasetIndex),o.controller["_"+s+"DatasetHoverStyle"]()),a=0,l=t.length;a<l;++a){r=t[a];let c=r&&this.getDatasetMeta(r.datasetIndex).controller;c&&c[s+"HoverStyle"](r.element,r.datasetIndex,r.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){let n=this._active||[],i=t.map(({datasetIndex:o,index:r})=>{let a=this.getDatasetMeta(o);if(!a)throw new Error("No dataset found at index "+o);return{datasetIndex:o,element:a.data[r],index:r}});!vi(i,n)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,n))}notifyPlugins(t,n,i){return this._plugins.notify(this,t,n,i)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,i){let s=this.options.hover,o=(l,c)=>l.filter(u=>!c.some(d=>u.datasetIndex===d.datasetIndex&&u.index===d.index)),r=o(n,t),a=i?t:o(t,n);r.length&&this.updateHoverStyle(r,s.mode,!1),a.length&&s.mode&&this.updateHoverStyle(a,s.mode,!0)}_eventHandler(t,n){let i={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},s=r=>(r.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;let o=this._handleEvent(t,n,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(o||i.changed)&&this.render(),this}_handleEvent(t,n,i){let{_active:s=[],options:o}=this,r=n,a=this._getActiveElements(t,s,i,r),l=Ja(t),c=I0(t,this._lastEvent,i,l);i&&(this._lastEvent=null,V(o.onHover,[t,a,this],this),l&&V(o.onClick,[t,a,this],this));let u=!vi(a,s);return(u||n)&&(this._active=a,this._updateHoverStyles(a,s,n)),this._lastEvent=c,u}_getActiveElements(t,n,i,s){if(t.type==="mouseout")return[];if(!i)return n;let o=this.options.hover;return this.getElementsAtEventForMode(t,o.mode,o,s)}};F(fe,"defaults",rt),F(fe,"instances",mr),F(fe,"overrides",kn),F(fe,"registry",He),F(fe,"version",D0),F(fe,"getChart",Bf);W0=typeof Path2D=="function";Tn=class extends Be{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){let i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){let s=i.spanGaps?this._loop:this._fullLoop;xl(this._points,i,t,s,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=El(this,this.options.segment))}first(){let t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){let t=this.segments,n=this.points,i=t.length;return i&&n[t[i-1].end]}interpolate(t,n){let i=this.options,s=t[n],o=this.points,r=Sl(this,{property:n,start:s,end:s});if(!r.length)return;let a=[],l=F0(i),c,u;for(c=0,u=r.length;c<u;++c){let{start:d,end:f}=r[c],p=o[d],b=o[f];if(p===b){a.push(p);continue}let x=Math.abs((s-p[n])/(b[n]-p[n])),y=l(p,b,x,i.stepped);y[n]=t[n],a.push(y)}return a.length===1?a[0]:a}pathSegment(t,n,i){return $l(this)(t,this,n,i)}path(t,n,i){let s=this.segments,o=$l(this),r=this._loop;n=n||0,i=i||this.points.length-n;for(let a of s)r&=o(t,this,a,{start:n,end:n+i-1});return!!r}draw(t,n,i,s){let o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),j0(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}};F(Tn,"id","line"),F(Tn,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),F(Tn,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),F(Tn,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});ti=class extends Be{constructor(n){super();F(this,"parsed");F(this,"skip");F(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,n&&Object.assign(this,n)}inRange(n,i,s){let o=this.options,{x:r,y:a}=this.getProps(["x","y"],s);return Math.pow(n-r,2)+Math.pow(i-a,2)<Math.pow(o.hitRadius+o.radius,2)}inXRange(n,i){return jf(this,n,"x",i)}inYRange(n,i){return jf(this,n,"y",i)}getCenterPoint(n){let{x:i,y:s}=this.getProps(["x","y"],n);return{x:i,y:s}}size(n){n=n||this.options||{};let i=n.radius||0;i=Math.max(i,i&&n.hoverRadius||0);let s=i&&n.borderWidth||0;return(i+s)*2}draw(n,i){let s=this.options;this.skip||s.radius<.1||!ne(this,i,this.size(s)/2)||(n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.fillStyle=s.backgroundColor,_s(n,s,this.x,this.y))}getRange(){let n=this.options||{};return n.radius+n.hitRadius}};F(ti,"id","point"),F(ti,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),F(ti,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});$f=(e,t)=>{let{boxHeight:n=t,boxWidth:i=t}=e;return e.usePointStyle&&(n=Math.min(n,t),i=e.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:n,itemHeight:Math.max(t,n)}},$0=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index,vr=class extends Be{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,i){this.maxWidth=t,this.maxHeight=n,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){let t=this.options.labels||{},n=V(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(i=>t.filter(i,this.chart.data))),t.sort&&(n=n.sort((i,s)=>t.sort(i,s,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){let{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}let i=t.labels,s=bt(i.font),o=s.size,r=this._computeTitleHeight(),{boxWidth:a,itemHeight:l}=$f(i,o),c,u;n.font=s.string,this.isHorizontal()?(c=this.maxWidth,u=this._fitRows(r,o,a,l)+10):(u=this.maxHeight,c=this._fitCols(r,s,a,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(u,t.maxHeight||this.maxHeight)}_fitRows(t,n,i,s){let{ctx:o,maxWidth:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],u=s+a,d=t;o.textAlign="left",o.textBaseline="middle";let f=-1,p=-u;return this.legendItems.forEach((b,x)=>{let y=i+n/2+o.measureText(b.text).width;(x===0||c[c.length-1]+y+2*a>r)&&(d+=u,c[c.length-(x>0?0:1)]=0,p+=u,f++),l[x]={left:0,top:p,row:f,width:y,height:s},c[c.length-1]+=y+a}),d}_fitCols(t,n,i,s){let{ctx:o,maxHeight:r,options:{labels:{padding:a}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],u=r-t,d=a,f=0,p=0,b=0,x=0;return this.legendItems.forEach((y,w)=>{let{itemWidth:_,itemHeight:S}=U0(i,n,o,y,s);w>0&&p+S+2*a>u&&(d+=f+a,c.push({width:f,height:p}),b+=f+a,x++,f=p=0),l[w]={left:b,top:p,col:x,width:_,height:S},f=Math.max(f,_),p+=S+a}),d+=f,c.push({width:f,height:p}),d}adjustHitBoxes(){if(!this.options.display)return;let t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:i,labels:{padding:s},rtl:o}}=this,r=Mn(o,this.left,this.width);if(this.isHorizontal()){let a=0,l=Lt(i,this.left+s,this.right-this.lineWidths[a]);for(let c of n)a!==c.row&&(a=c.row,l=Lt(i,this.left+s,this.right-this.lineWidths[a])),c.top+=this.top+t+s,c.left=r.leftForLtr(r.x(l),c.width),l+=c.width+s}else{let a=0,l=Lt(i,this.top+t+s,this.bottom-this.columnSizes[a].height);for(let c of n)c.col!==a&&(a=c.col,l=Lt(i,this.top+t+s,this.bottom-this.columnSizes[a].height)),c.top=l,c.left+=this.left+s,c.left=r.leftForLtr(r.x(c.left),c.width),l+=c.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){let t=this.ctx;ks(t,this),this._draw(),Ss(t)}}_draw(){let{options:t,columnSizes:n,lineWidths:i,ctx:s}=this,{align:o,labels:r}=t,a=rt.color,l=Mn(t.rtl,this.left,this.width),c=bt(r.font),{padding:u}=r,d=c.size,f=d/2,p;this.drawTitle(),s.textAlign=l.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=c.string;let{boxWidth:b,boxHeight:x,itemHeight:y}=$f(r,d),w=function(A,R,P){if(isNaN(b)||b<=0||isNaN(x)||x<0)return;s.save();let N=$(P.lineWidth,1);if(s.fillStyle=$(P.fillStyle,a),s.lineCap=$(P.lineCap,"butt"),s.lineDashOffset=$(P.lineDashOffset,0),s.lineJoin=$(P.lineJoin,"miter"),s.lineWidth=N,s.strokeStyle=$(P.strokeStyle,a),s.setLineDash($(P.lineDash,[])),r.usePointStyle){let W={radius:x*Math.SQRT2/2,pointStyle:P.pointStyle,rotation:P.rotation,borderWidth:N},H=l.xPlus(A,b/2),B=R+f;tr(s,W,H,B,r.pointStyleWidth&&b)}else{let W=R+Math.max((d-x)/2,0),H=l.leftForLtr(A,b),B=En(P.borderRadius);s.beginPath(),Object.values(B).some(st=>st!==0)?ki(s,{x:H,y:W,w:b,h:x,radius:B}):s.rect(H,W,b,x),s.fill(),N!==0&&s.stroke()}s.restore()},_=function(A,R,P){Sn(s,P.text,A,R+y/2,c,{strikethrough:P.hidden,textAlign:l.textAlign(P.textAlign)})},S=this.isHorizontal(),E=this._computeTitleHeight();S?p={x:Lt(o,this.left+u,this.right-i[0]),y:this.top+u+E,line:0}:p={x:this.left+u,y:Lt(o,this.top+E+u,this.bottom-n[0].height),line:0},rr(this.ctx,t.textDirection);let T=y+u;this.legendItems.forEach((A,R)=>{s.strokeStyle=A.fontColor,s.fillStyle=A.fontColor;let P=s.measureText(A.text).width,N=l.textAlign(A.textAlign||(A.textAlign=r.textAlign)),W=b+f+P,H=p.x,B=p.y;l.setWidth(this.width),S?R>0&&H+W+u>this.right&&(B=p.y+=T,p.line++,H=p.x=Lt(o,this.left+u,this.right-i[p.line])):R>0&&B+T>this.bottom&&(H=p.x=H+n[p.line].width+u,p.line++,B=p.y=Lt(o,this.top+E+u,this.bottom-n[p.line].height));let st=l.x(H);if(w(st,B,A),H=ll(N,H+b+f,S?H+W:this.right,t.rtl),_(l.x(H),B,A),S)p.x+=W+u;else if(typeof A.text!="string"){let Tt=c.lineHeight;p.y+=bh(A,Tt)+u}else p.y+=T}),ar(this.ctx,t.textDirection)}drawTitle(){let t=this.options,n=t.title,i=bt(n.font),s=Et(n.padding);if(!n.display)return;let o=Mn(t.rtl,this.left,this.width),r=this.ctx,a=n.position,l=i.size/2,c=s.top+l,u,d=this.left,f=this.width;if(this.isHorizontal())f=Math.max(...this.lineWidths),u=this.top+c,d=Lt(t.align,d,this.right-f);else{let b=this.columnSizes.reduce((x,y)=>Math.max(x,y.height),0);u=c+Lt(t.align,this.top,this.bottom-b-t.labels.padding-this._computeTitleHeight())}let p=Lt(a,d,d+f);r.textAlign=o.textAlign(Xo(a)),r.textBaseline="middle",r.strokeStyle=n.color,r.fillStyle=n.color,r.font=i.string,Sn(r,n.text,p,u,i)}_computeTitleHeight(){let t=this.options.title,n=bt(t.font),i=Et(t.padding);return t.display?n.lineHeight+i.height:0}_getLegendItemAt(t,n){let i,s,o;if(Xn(t,this.left,this.right)&&Xn(n,this.top,this.bottom)){for(o=this.legendHitBoxes,i=0;i<o.length;++i)if(s=o[i],Xn(t,s.left,s.left+s.width)&&Xn(n,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(t){let n=this.options;if(!K0(t.type,n))return;let i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){let s=this._hoveredItem,o=$0(s,i);s&&!o&&V(n.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!o&&V(n.onHover,[t,i,this],this)}else i&&V(n.onClick,[t,i,this],this)}};xh={id:"legend",_element:vr,start(e,t,n){let i=e.legend=new vr({ctx:e.ctx,options:n,chart:e});Cn.configure(e,i,n),Cn.addBox(e,i)},stop(e){Cn.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){let i=e.legend;Cn.configure(e,i,n),i.options=n},afterUpdate(e){let t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){let i=t.datasetIndex,s=n.chart;s.isDatasetVisible(i)?(s.hide(i),t.hidden=!0):(s.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){let t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:i,textAlign:s,color:o,useBorderRadius:r,borderRadius:a}}=e.legend.options;return e._getSortedDatasetMetas().map(l=>{let c=l.controller.getStyle(n?0:void 0),u=Et(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:o,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(u.width+u.height)/4,strokeStyle:c.borderColor,pointStyle:i||c.pointStyle,rotation:c.rotation,textAlign:s||c.textAlign,borderRadius:r&&(a||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}},Is={average(e){if(!e.length)return!1;let t,n,i=new Set,s=0,o=0;for(t=0,n=e.length;t<n;++t){let a=e[t].element;if(a&&a.hasValue()){let l=a.tooltipPosition();i.add(l.x),s+=l.y,++o}}return o===0||i.size===0?!1:{x:[...i].reduce((a,l)=>a+l)/i.size,y:s/o}},nearest(e,t){if(!e.length)return!1;let n=t.x,i=t.y,s=Number.POSITIVE_INFINITY,o,r,a;for(o=0,r=e.length;o<r;++o){let l=e[o].element;if(l&&l.hasValue()){let c=l.getCenterPoint(),u=ms(t,c);u<s&&(s=u,a=l)}}if(a){let l=a.tooltipPosition();n=l.x,i=l.y}return{x:n,y:i}}};yh={beforeTitle:_e,title(e){if(e.length>0){let t=e[0],n=t.chart.data.labels,i=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return n[t.dataIndex]}return""},afterTitle:_e,beforeBody:_e,beforeLabel:_e,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");let n=e.formattedValue;return X(n)||(t+=n),t},labelColor(e){let n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){let n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:_e,afterBody:_e,beforeFooter:_e,footer:_e,afterFooter:_e};Ns=class extends Be{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){let t=this._cachedAnimations;if(t)return t;let n=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&n.options.animation&&i.animations,o=new br(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(o)),o}getContext(){return this.$context||(this.$context=ey(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){let{callbacks:i}=n,s=Ut(i,"beforeTitle",this,t),o=Ut(i,"title",this,t),r=Ut(i,"afterTitle",this,t),a=[];return a=Fe(a,ln(s)),a=Fe(a,ln(o)),a=Fe(a,ln(r)),a}getBeforeBody(t,n){return Kf(Ut(n.callbacks,"beforeBody",this,t))}getBody(t,n){let{callbacks:i}=n,s=[];return U(t,o=>{let r={before:[],lines:[],after:[]},a=Xf(i,o);Fe(r.before,ln(Ut(a,"beforeLabel",this,o))),Fe(r.lines,Ut(a,"label",this,o)),Fe(r.after,ln(Ut(a,"afterLabel",this,o))),s.push(r)}),s}getAfterBody(t,n){return Kf(Ut(n.callbacks,"afterBody",this,t))}getFooter(t,n){let{callbacks:i}=n,s=Ut(i,"beforeFooter",this,t),o=Ut(i,"footer",this,t),r=Ut(i,"afterFooter",this,t),a=[];return a=Fe(a,ln(s)),a=Fe(a,ln(o)),a=Fe(a,ln(r)),a}_createItems(t){let n=this._active,i=this.chart.data,s=[],o=[],r=[],a=[],l,c;for(l=0,c=n.length;l<c;++l)a.push(X0(this.chart,n[l]));return t.filter&&(a=a.filter((u,d,f)=>t.filter(u,d,f,i))),t.itemSort&&(a=a.sort((u,d)=>t.itemSort(u,d,i))),U(a,u=>{let d=Xf(t.callbacks,u);s.push(Ut(d,"labelColor",this,u)),o.push(Ut(d,"labelPointStyle",this,u)),r.push(Ut(d,"labelTextColor",this,u))}),this.labelColors=s,this.labelPointStyles=o,this.labelTextColors=r,this.dataPoints=a,a}update(t,n){let i=this.options.setContext(this.getContext()),s=this._active,o,r=[];if(!s.length)this.opacity!==0&&(o={opacity:0});else{let a=Is[i.position].call(this,s,this._eventPosition);r=this._createItems(i),this.title=this.getTitle(r,i),this.beforeBody=this.getBeforeBody(r,i),this.body=this.getBody(r,i),this.afterBody=this.getAfterBody(r,i),this.footer=this.getFooter(r,i);let l=this._size=Uf(this,i),c=Object.assign({},a,l),u=Gf(this.chart,i,c),d=Yf(i,c,u,this.chart);this.xAlign=u.xAlign,this.yAlign=u.yAlign,o={opacity:1,x:d.x,y:d.y,width:l.width,height:l.height,caretX:a.x,caretY:a.y}}this._tooltipItems=r,this.$context=void 0,o&&this._resolveAnimations().update(this,o),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,i,s){let o=this.getCaretPosition(t,i,s);n.lineTo(o.x1,o.y1),n.lineTo(o.x2,o.y2),n.lineTo(o.x3,o.y3)}getCaretPosition(t,n,i){let{xAlign:s,yAlign:o}=this,{caretSize:r,cornerRadius:a}=i,{topLeft:l,topRight:c,bottomLeft:u,bottomRight:d}=En(a),{x:f,y:p}=t,{width:b,height:x}=n,y,w,_,S,E,T;return o==="center"?(E=p+x/2,s==="left"?(y=f,w=y-r,S=E+r,T=E-r):(y=f+b,w=y+r,S=E-r,T=E+r),_=y):(s==="left"?w=f+Math.max(l,u)+r:s==="right"?w=f+b-Math.max(c,d)-r:w=this.caretX,o==="top"?(S=p,E=S-r,y=w-r,_=w+r):(S=p+x,E=S+r,y=w+r,_=w-r),T=S),{x1:y,x2:w,x3:_,y1:S,y2:E,y3:T}}drawTitle(t,n,i){let s=this.title,o=s.length,r,a,l;if(o){let c=Mn(i.rtl,this.x,this.width);for(t.x=dr(this,i.titleAlign,i),n.textAlign=c.textAlign(i.titleAlign),n.textBaseline="middle",r=bt(i.titleFont),a=i.titleSpacing,n.fillStyle=i.titleColor,n.font=r.string,l=0;l<o;++l)n.fillText(s[l],c.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+a,l+1===o&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,n,i,s,o){let r=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:l,boxWidth:c}=o,u=bt(o.bodyFont),d=dr(this,"left",o),f=s.x(d),p=l<u.lineHeight?(u.lineHeight-l)/2:0,b=n.y+p;if(o.usePointStyle){let x={radius:Math.min(c,l)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},y=s.leftForLtr(f,c)+c/2,w=b+l/2;t.strokeStyle=o.multiKeyBackground,t.fillStyle=o.multiKeyBackground,_s(t,x,y,w),t.strokeStyle=r.borderColor,t.fillStyle=r.backgroundColor,_s(t,x,y,w)}else{t.lineWidth=Y(r.borderWidth)?Math.max(...Object.values(r.borderWidth)):r.borderWidth||1,t.strokeStyle=r.borderColor,t.setLineDash(r.borderDash||[]),t.lineDashOffset=r.borderDashOffset||0;let x=s.leftForLtr(f,c),y=s.leftForLtr(s.xPlus(f,1),c-2),w=En(r.borderRadius);Object.values(w).some(_=>_!==0)?(t.beginPath(),t.fillStyle=o.multiKeyBackground,ki(t,{x,y:b,w:c,h:l,radius:w}),t.fill(),t.stroke(),t.fillStyle=r.backgroundColor,t.beginPath(),ki(t,{x:y,y:b+1,w:c-2,h:l-2,radius:w}),t.fill()):(t.fillStyle=o.multiKeyBackground,t.fillRect(x,b,c,l),t.strokeRect(x,b,c,l),t.fillStyle=r.backgroundColor,t.fillRect(y,b+1,c-2,l-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,n,i){let{body:s}=this,{bodySpacing:o,bodyAlign:r,displayColors:a,boxHeight:l,boxWidth:c,boxPadding:u}=i,d=bt(i.bodyFont),f=d.lineHeight,p=0,b=Mn(i.rtl,this.x,this.width),x=function(P){n.fillText(P,b.x(t.x+p),t.y+f/2),t.y+=f+o},y=b.textAlign(r),w,_,S,E,T,A,R;for(n.textAlign=r,n.textBaseline="middle",n.font=d.string,t.x=dr(this,y,i),n.fillStyle=i.bodyColor,U(this.beforeBody,x),p=a&&y!=="right"?r==="center"?c/2+u:c+2+u:0,E=0,A=s.length;E<A;++E){for(w=s[E],_=this.labelTextColors[E],n.fillStyle=_,U(w.before,x),S=w.lines,a&&S.length&&(this._drawColorBox(n,t,E,b,i),f=Math.max(d.lineHeight,l)),T=0,R=S.length;T<R;++T)x(S[T]),f=d.lineHeight;U(w.after,x)}p=0,f=d.lineHeight,U(this.afterBody,x),t.y-=o}drawFooter(t,n,i){let s=this.footer,o=s.length,r,a;if(o){let l=Mn(i.rtl,this.x,this.width);for(t.x=dr(this,i.footerAlign,i),t.y+=i.footerMarginTop,n.textAlign=l.textAlign(i.footerAlign),n.textBaseline="middle",r=bt(i.footerFont),n.fillStyle=i.footerColor,n.font=r.string,a=0;a<o;++a)n.fillText(s[a],l.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+i.footerSpacing}}drawBackground(t,n,i,s){let{xAlign:o,yAlign:r}=this,{x:a,y:l}=t,{width:c,height:u}=i,{topLeft:d,topRight:f,bottomLeft:p,bottomRight:b}=En(s.cornerRadius);n.fillStyle=s.backgroundColor,n.strokeStyle=s.borderColor,n.lineWidth=s.borderWidth,n.beginPath(),n.moveTo(a+d,l),r==="top"&&this.drawCaret(t,n,i,s),n.lineTo(a+c-f,l),n.quadraticCurveTo(a+c,l,a+c,l+f),r==="center"&&o==="right"&&this.drawCaret(t,n,i,s),n.lineTo(a+c,l+u-b),n.quadraticCurveTo(a+c,l+u,a+c-b,l+u),r==="bottom"&&this.drawCaret(t,n,i,s),n.lineTo(a+p,l+u),n.quadraticCurveTo(a,l+u,a,l+u-p),r==="center"&&o==="left"&&this.drawCaret(t,n,i,s),n.lineTo(a,l+d),n.quadraticCurveTo(a,l,a+d,l),n.closePath(),n.fill(),s.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){let n=this.chart,i=this.$animations,s=i&&i.x,o=i&&i.y;if(s||o){let r=Is[t.position].call(this,this._active,this._eventPosition);if(!r)return;let a=this._size=Uf(this,t),l=Object.assign({},r,this._size),c=Gf(n,t,l),u=Yf(t,l,c,n);(s._to!==u.x||o._to!==u.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=a.width,this.height=a.height,this.caretX=r.x,this.caretY=r.y,this._resolveAnimations().update(this,u))}}_willRender(){return!!this.opacity}draw(t){let n=this.options.setContext(this.getContext()),i=this.opacity;if(!i)return;this._updateAnimationTarget(n);let s={width:this.width,height:this.height},o={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;let r=Et(n.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(o,t,s,n),rr(t,n.textDirection),o.y+=r.top,this.drawTitle(o,t,n),this.drawBody(o,t,n),this.drawFooter(o,t,n),ar(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){let i=this._active,s=t.map(({datasetIndex:a,index:l})=>{let c=this.chart.getDatasetMeta(a);if(!c)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:c.data[l],index:l}}),o=!vi(i,s),r=this._positionChanged(s,n);(o||r)&&(this._active=s,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,i=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;let s=this.options,o=this._active||[],r=this._getActiveElements(t,o,n,i),a=this._positionChanged(r,t),l=n||!vi(r,o)||a;return l&&(this._active=r,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),l}_getActiveElements(t,n,i,s){let o=this.options;if(t.type==="mouseout")return[];if(!s)return n.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);let r=this.chart.getElementsAtEventForMode(t,o.mode,o,i);return o.reverse&&r.reverse(),r}_positionChanged(t,n){let{caretX:i,caretY:s,options:o}=this,r=Is[o.position].call(this,t,n);return r!==!1&&(i!==r.x||s!==r.y)}};F(Ns,"positioners",Is);vh={id:"tooltip",_element:Ns,positioners:Is,afterInit(e,t,n){n&&(e.tooltip=new Ns({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){let t=e.tooltip;if(t&&t._willRender()){let n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){let n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:yh},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},ny=(e,t,n,i)=>(typeof t=="string"?(n=e.push(t)-1,i.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);sy=(e,t)=>e===null?null:$t(Math.round(e),0,t);Ti=class extends ei{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){let n=this._addedLabels;if(n.length){let i=this.getLabels();for(let{index:s,label:o}of n)i[s]===o&&i.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(X(t))return null;let i=this.getLabels();return n=isFinite(n)&&i[n]===t?n:iy(i,t,$(n,t),this._addedLabels),sy(n,i.length-1)}determineDataLimits(){let{minDefined:t,maxDefined:n}=this.getUserBounds(),{min:i,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),n||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){let t=this.min,n=this.max,i=this.options.offset,s=[],o=this.getLabels();o=t===0&&n===o.length-1?o:o.slice(t,n+1),this._valueRange=Math.max(o.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let r=t;r<=n;r++)s.push({value:r});return s}getLabelForValue(t){return qf.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){let n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}};F(Ti,"id","category"),F(Ti,"defaults",{ticks:{callback:qf}});Di=class extends ei{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return X(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){let{beginAtZero:t}=this.options,{minDefined:n,maxDefined:i}=this.getUserBounds(),{min:s,max:o}=this,r=l=>s=n?s:l,a=l=>o=i?o:l;if(t){let l=we(s),c=we(o);l<0&&c<0?a(0):l>0&&c>0&&r(0)}if(s===o){let l=o===0?1:Math.abs(o*.05);a(o+l),t||r(s-l)}this.min=s,this.max=o}getTickLimit(){let t=this.options.ticks,{maxTicksLimit:n,stepSize:i}=t,s;return i?(s=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,s>1e3&&(console.warn(\`scales.\${this.id}.ticks.stepSize: \${i} would result generating up to \${s} ticks. Limiting to 1000.\`),s=1e3)):(s=this.computeTickLimit(),n=n||11),n&&(s=Math.min(n,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){let t=this.options,n=t.ticks,i=this.getTickLimit();i=Math.max(2,i);let s={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},o=this._range||this,r=oy(s,o);return t.bounds==="ticks"&&jo(r,this,"value"),t.reverse?(r.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),r}configure(){let t=this.ticks,n=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){let s=(i-n)/Math.max(t.length-1,1)/2;n-=s,i+=s}this._startValue=n,this._endValue=i,this._valueRange=i-n}getLabelForValue(t){return vs(t,this.chart.options.locale,this.options.ticks.format)}},Ci=class extends Di{determineDataLimits(){let{min:t,max:n}=this.getMinMax(!0);this.min=gt(t)?t:0,this.max=gt(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){let t=this.isHorizontal(),n=t?this.width:this.height,i=Ve(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,o.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}};F(Ci,"id","linear"),F(Ci,"defaults",{ticks:{callback:ws.formatters.numeric}});Vs=e=>Math.floor(Ne(e)),Zn=(e,t)=>Math.pow(10,Vs(e)+t);fr=class extends ei{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,n){let i=Di.prototype.parse.apply(this,[t,n]);if(i===0){this._zero=!0;return}return gt(i)&&i>0?i:null}determineDataLimits(){let{min:t,max:n}=this.getMinMax(!0);this.min=gt(t)?Math.max(0,t):null,this.max=gt(n)?Math.max(0,n):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!gt(this._userMin)&&(this.min=t===Zn(this.min,0)?Zn(this.min,-1):Zn(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){let{minDefined:t,maxDefined:n}=this.getUserBounds(),i=this.min,s=this.max,o=a=>i=t?i:a,r=a=>s=n?s:a;i===s&&(i<=0?(o(1),r(10)):(o(Zn(i,-1)),r(Zn(s,1)))),i<=0&&o(Zn(s,-1)),s<=0&&r(Zn(i,1)),this.min=i,this.max=s}buildTicks(){let t=this.options,n={min:this._userMin,max:this._userMax},i=ay(n,this);return t.bounds==="ticks"&&jo(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":vs(t,this.chart.options.locale,this.options.ticks.format)}configure(){let t=this.min;super.configure(),this._startValue=Ne(t),this._valueRange=Ne(this.max)-Ne(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Ne(t)-this._startValue)/this._valueRange)}getValueForPixel(t){let n=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+n*this._valueRange)}};F(fr,"id","logarithmic"),F(fr,"defaults",{ticks:{callback:ws.formatters.logarithmic,major:{enabled:!0}}});Ei=class extends Di{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){let t=this._padding=Et(Ul(this.options)/2),n=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+n/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(n,i)/2)}determineDataLimits(){let{min:t,max:n}=this.getMinMax(!1);this.min=gt(t)&&!isNaN(t)?t:0,this.max=gt(n)&&!isNaN(n)?n:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Ul(this.options))}generateTickLabels(t){Di.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((n,i)=>{let s=V(this.options.pointLabels.callback,[n,i],this);return s||s===0?s:""}).filter((n,i)=>this.chart.getDataVisibility(i))}fit(){let t=this.options;t.display&&t.pointLabels.display?cy(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,n,i,s){this.xCenter+=Math.floor((t-n)/2),this.yCenter+=Math.floor((i-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,n,i,s))}getIndexAngle(t){let n=jt/(this._pointLabels.length||1),i=this.options.startAngle||0;return ee(t*n+Ve(i))}getDistanceFromCenterForValue(t){if(X(t))return NaN;let n=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*n:(t-this.min)*n}getValueForDistanceFromCenter(t){if(X(t))return NaN;let n=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-n:this.min+n}getPointLabelContext(t){let n=this._pointLabels||[];if(t>=0&&t<n.length){let i=n[t];return vy(this.getContext(),t,i)}}getPointPosition(t,n,i=0){let s=this.getIndexAngle(t)-It+i;return{x:Math.cos(s)*n+this.xCenter,y:Math.sin(s)*n+this.yCenter,angle:s}}getPointPositionForValue(t,n){return this.getPointPosition(t,this.getDistanceFromCenterForValue(n))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){let{left:n,top:i,right:s,bottom:o}=this._pointLabelItems[t];return{left:n,top:i,right:s,bottom:o}}drawBackground(){let{backgroundColor:t,grid:{circular:n}}=this.options;if(t){let i=this.ctx;i.save(),i.beginPath(),wh(this,this.getDistanceFromCenterForValue(this._endValue),n,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){let t=this.ctx,n=this.options,{angleLines:i,grid:s,border:o}=n,r=this._pointLabels.length,a,l,c;if(n.pointLabels.display&&xy(this,r),s.display&&this.ticks.forEach((u,d)=>{if(d!==0||d===0&&this.min<0){l=this.getDistanceFromCenterForValue(u.value);let f=this.getContext(d),p=s.setContext(f),b=o.setContext(f);yy(this,p,l,r,b)}}),i.display){for(t.save(),a=r-1;a>=0;a--){let u=i.setContext(this.getPointLabelContext(a)),{color:d,lineWidth:f}=u;!f||!d||(t.lineWidth=f,t.strokeStyle=d,t.setLineDash(u.borderDash),t.lineDashOffset=u.borderDashOffset,l=this.getDistanceFromCenterForValue(n.reverse?this.min:this.max),c=this.getPointPosition(a,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){let t=this.ctx,n=this.options,i=n.ticks;if(!i.display)return;let s=this.getIndexAngle(0),o,r;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,l)=>{if(l===0&&this.min>=0&&!n.reverse)return;let c=i.setContext(this.getContext(l)),u=bt(c.font);if(o=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=u.string,r=t.measureText(a.label).width,t.fillStyle=c.backdropColor;let d=Et(c.backdropPadding);t.fillRect(-r/2-d.left,-o-u.size/2-d.top,r+d.width,u.size+d.height)}Sn(t,a.label,0,-o,u,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}};F(Ei,"id","radialLinear"),F(Ei,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:ws.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),F(Ei,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),F(Ei,"descriptors",{angleLines:{_fallback:"grid"}});wr={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Gt=Object.keys(wr);Pi=class extends ei{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){let i=t.time||(t.time={}),s=this._adapter=new Ax._date(t.adapters.date);s.init(n),Yn(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:nh(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){let t=this.options,n=this._adapter,i=t.time.unit||"day",{min:s,max:o,minDefined:r,maxDefined:a}=this.getUserBounds();function l(c){!r&&!isNaN(c.min)&&(s=Math.min(s,c.min)),!a&&!isNaN(c.max)&&(o=Math.max(o,c.max))}(!r||!a)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),s=gt(s)&&!isNaN(s)?s:+n.startOf(Date.now(),i),o=gt(o)&&!isNaN(o)?o:+n.endOf(Date.now(),i)+1,this.min=Math.min(s,o-1),this.max=Math.max(s+1,o)}_getLabelBounds(){let t=this.getLabelTimestamps(),n=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],i=t[t.length-1]),{min:n,max:i}}buildTicks(){let t=this.options,n=t.time,i=t.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);let o=this.min,r=this.max,a=sl(s,o,r);return this._unit=n.unit||(i.autoSkip?ih(n.minUnit,this.min,this.max,this._getLabelCapacity(o)):wy(this,a.length,n.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:_y(this._unit),this.initOffsets(s),t.reverse&&a.reverse(),oh(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,i=0,s,o;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?n=1-s:n=(this.getDecimalForValue(t[1])-s)/2,o=this.getDecimalForValue(t[t.length-1]),t.length===1?i=o:i=(o-this.getDecimalForValue(t[t.length-2]))/2);let r=t.length<3?.5:.25;n=$t(n,0,r),i=$t(i,0,r),this._offsets={start:n,end:i,factor:1/(n+1+i)}}_generate(){let t=this._adapter,n=this.min,i=this.max,s=this.options,o=s.time,r=o.unit||ih(o.minUnit,n,i,this._getLabelCapacity(n)),a=$(s.ticks.stepSize,1),l=r==="week"?o.isoWeekday:!1,c=Kn(l)||l===!0,u={},d=n,f,p;if(c&&(d=+t.startOf(d,"isoWeek",l)),d=+t.startOf(d,c?"day":r),t.diff(i,n,r)>1e5*a)throw new Error(n+" and "+i+" are too far apart with stepSize of "+a+" "+r);let b=s.ticks.source==="data"&&this.getDataTimestamps();for(f=d,p=0;f<i;f=+t.add(f,a,r),p++)sh(u,f,b);return(f===i||s.bounds==="ticks"||p===1)&&sh(u,f,b),Object.keys(u).sort(eh).map(x=>+x)}getLabelForValue(t){let n=this._adapter,i=this.options.time;return i.tooltipFormat?n.format(t,i.tooltipFormat):n.format(t,i.displayFormats.datetime)}format(t,n){let s=this.options.time.displayFormats,o=this._unit,r=n||s[o];return this._adapter.format(t,r)}_tickFormatFunction(t,n,i,s){let o=this.options,r=o.ticks.callback;if(r)return V(r,[t,n,i],this);let a=o.time.displayFormats,l=this._unit,c=this._majorUnit,u=l&&a[l],d=c&&a[c],f=i[n],p=c&&d&&f&&f.major;return this._adapter.format(t,s||(p?d:u))}generateTickLabels(t){let n,i,s;for(n=0,i=t.length;n<i;++n)s=t[n],s.label=this._tickFormatFunction(s.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){let n=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+i)*n.factor)}getValueForPixel(t){let n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){let n=this.options.ticks,i=this.ctx.measureText(t).width,s=Ve(this.isHorizontal()?n.maxRotation:n.minRotation),o=Math.cos(s),r=Math.sin(s),a=this._resolveTickFontOptions(0).size;return{w:i*o+a*r,h:i*r+a*o}}_getLabelCapacity(t){let n=this.options.time,i=n.displayFormats,s=i[n.unit]||i.millisecond,o=this._tickFormatFunction(t,0,oh(this,[t],this._majorUnit),s),r=this._getLabelSize(o),a=Math.floor(this.isHorizontal()?this.width/r.w:this.height/r.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],n,i;if(t.length)return t;let s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(n=0,i=s.length;n<i;++n)t=t.concat(s[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){let t=this._cache.labels||[],n,i;if(t.length)return t;let s=this.getLabels();for(n=0,i=s.length;n<i;++n)t.push(nh(this,s[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return rl(t.sort(eh))}};F(Pi,"id","time"),F(Pi,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});pr=class extends Pi{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){let t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=hr(n,this.min),this._tableRange=hr(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){let{min:n,max:i}=this,s=[],o=[],r,a,l,c,u;for(r=0,a=t.length;r<a;++r)c=t[r],c>=n&&c<=i&&s.push(c);if(s.length<2)return[{time:n,pos:0},{time:i,pos:1}];for(r=0,a=s.length;r<a;++r)u=s[r+1],l=s[r-1],c=s[r],Math.round((u+l)/2)!==c&&o.push({time:c,pos:r/(a-1)});return o}_generate(){let t=this.min,n=this.max,i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(n)||i.length===1)&&i.push(n),i.sort((s,o)=>s-o)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;let n=this.getDataTimestamps(),i=this.getLabelTimestamps();return n.length&&i.length?t=this.normalize(n.concat(i)):t=n.length?n:i,t=this._cache.all=t,t}getDecimalForValue(t){return(hr(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){let n=this._offsets,i=this.getDecimalForPixel(t)/n.factor-n.end;return hr(this._table,i*this._tableRange+this._minPos,!0)}};F(pr,"id","timeseries"),F(pr,"defaults",Pi.defaults)});var kh=zg((ME,_r)=>{(function(e,t,n,i){"use strict";var s=["","webkit","Moz","MS","ms","o"],o=t.createElement("div"),r="function",a=Math.round,l=Math.abs,c=Date.now;function u(h,m,v){return setTimeout(_(h,v),m)}function d(h,m,v){return Array.isArray(h)?(f(h,v[m],v),!0):!1}function f(h,m,v){var k;if(h)if(h.forEach)h.forEach(m,v);else if(h.length!==i)for(k=0;k<h.length;)m.call(v,h[k],k,h),k++;else for(k in h)h.hasOwnProperty(k)&&m.call(v,h[k],k,h)}function p(h,m,v){var k="DEPRECATED METHOD: "+m+\`
\`+v+\` AT 
\`;return function(){var C=new Error("get-stack-trace"),I=C&&C.stack?C.stack.replace(/^[^\\(]+?[\\n$]/gm,"").replace(/^\\s+at\\s+/gm,"").replace(/^Object.<anonymous>\\s*\\(/gm,"{anonymous}()@"):"Unknown Stack Trace",G=e.console&&(e.console.warn||e.console.log);return G&&G.call(e.console,k,I),h.apply(this,arguments)}}var b;typeof Object.assign!="function"?b=function(m){if(m===i||m===null)throw new TypeError("Cannot convert undefined or null to object");for(var v=Object(m),k=1;k<arguments.length;k++){var C=arguments[k];if(C!==i&&C!==null)for(var I in C)C.hasOwnProperty(I)&&(v[I]=C[I])}return v}:b=Object.assign;var x=p(function(m,v,k){for(var C=Object.keys(v),I=0;I<C.length;)(!k||k&&m[C[I]]===i)&&(m[C[I]]=v[C[I]]),I++;return m},"extend","Use \`assign\`."),y=p(function(m,v){return x(m,v,!0)},"merge","Use \`assign\`.");function w(h,m,v){var k=m.prototype,C;C=h.prototype=Object.create(k),C.constructor=h,C._super=k,v&&b(C,v)}function _(h,m){return function(){return h.apply(m,arguments)}}function S(h,m){return typeof h==r?h.apply(m&&m[0]||i,m):h}function E(h,m){return h===i?m:h}function T(h,m,v){f(N(m),function(k){h.addEventListener(k,v,!1)})}function A(h,m,v){f(N(m),function(k){h.removeEventListener(k,v,!1)})}function R(h,m){for(;h;){if(h==m)return!0;h=h.parentNode}return!1}function P(h,m){return h.indexOf(m)>-1}function N(h){return h.trim().split(/\\s+/g)}function W(h,m,v){if(h.indexOf&&!v)return h.indexOf(m);for(var k=0;k<h.length;){if(v&&h[k][v]==m||!v&&h[k]===m)return k;k++}return-1}function H(h){return Array.prototype.slice.call(h,0)}function B(h,m,v){for(var k=[],C=[],I=0;I<h.length;){var G=m?h[I][m]:h[I];W(C,G)<0&&k.push(h[I]),C[I]=G,I++}return v&&(m?k=k.sort(function(wt,Dt){return wt[m]>Dt[m]}):k=k.sort()),k}function st(h,m){for(var v,k,C=m[0].toUpperCase()+m.slice(1),I=0;I<s.length;){if(v=s[I],k=v?v+C:m,k in h)return k;I++}return i}var Tt=1;function Q(){return Tt++}function nt(h){var m=h.ownerDocument||h;return m.defaultView||m.parentWindow||e}var vt=/mobile|tablet|ip(ad|hone|od)|android/i,Ee="ontouchstart"in e,je=st(e,"PointerEvent")!==i,ge=Ee&&vt.test(navigator.userAgent),zt="touch",me="pen",Xt="mouse",qt="kinect",Zt=25,tt=1,be=2,lt=4,ot=8,si=1,Ni=2,Li=4,Vi=8,zi=16,Me=Ni|Li,An=Vi|zi,gc=Me|An,mc=["x","y"],Xs=["clientX","clientY"];function se(h,m){var v=this;this.manager=h,this.callback=m,this.element=h.element,this.target=h.options.inputTarget,this.domHandler=function(k){S(h.options.enable,[h])&&v.handler(k)},this.init()}se.prototype={handler:function(){},init:function(){this.evEl&&T(this.element,this.evEl,this.domHandler),this.evTarget&&T(this.target,this.evTarget,this.domHandler),this.evWin&&T(nt(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&A(this.element,this.evEl,this.domHandler),this.evTarget&&A(this.target,this.evTarget,this.domHandler),this.evWin&&A(nt(this.element),this.evWin,this.domHandler)}};function og(h){var m,v=h.options.inputClass;return v?m=v:je?m=Or:ge?m=Js:Ee?m=Ir:m=Zs,new m(h,rg)}function rg(h,m,v){var k=v.pointers.length,C=v.changedPointers.length,I=m&tt&&k-C===0,G=m&(lt|ot)&&k-C===0;v.isFirst=!!I,v.isFinal=!!G,I&&(h.session={}),v.eventType=m,ag(h,v),h.emit("hammer.input",v),h.recognize(v),h.session.prevInput=v}function ag(h,m){var v=h.session,k=m.pointers,C=k.length;v.firstInput||(v.firstInput=bc(m)),C>1&&!v.firstMultiple?v.firstMultiple=bc(m):C===1&&(v.firstMultiple=!1);var I=v.firstInput,G=v.firstMultiple,xt=G?G.center:I.center,wt=m.center=xc(k);m.timeStamp=c(),m.deltaTime=m.timeStamp-I.timeStamp,m.angle=Rr(xt,wt),m.distance=qs(xt,wt),lg(v,m),m.offsetDirection=vc(m.deltaX,m.deltaY);var Dt=yc(m.deltaTime,m.deltaX,m.deltaY);m.overallVelocityX=Dt.x,m.overallVelocityY=Dt.y,m.overallVelocity=l(Dt.x)>l(Dt.y)?Dt.x:Dt.y,m.scale=G?dg(G.pointers,k):1,m.rotation=G?ug(G.pointers,k):0,m.maxPointers=v.prevInput?m.pointers.length>v.prevInput.maxPointers?m.pointers.length:v.prevInput.maxPointers:m.pointers.length,cg(v,m);var Ce=h.element;R(m.srcEvent.target,Ce)&&(Ce=m.srcEvent.target),m.target=Ce}function lg(h,m){var v=m.center,k=h.offsetDelta||{},C=h.prevDelta||{},I=h.prevInput||{};(m.eventType===tt||I.eventType===lt)&&(C=h.prevDelta={x:I.deltaX||0,y:I.deltaY||0},k=h.offsetDelta={x:v.x,y:v.y}),m.deltaX=C.x+(v.x-k.x),m.deltaY=C.y+(v.y-k.y)}function cg(h,m){var v=h.lastInterval||m,k=m.timeStamp-v.timeStamp,C,I,G,xt;if(m.eventType!=ot&&(k>Zt||v.velocity===i)){var wt=m.deltaX-v.deltaX,Dt=m.deltaY-v.deltaY,Ce=yc(k,wt,Dt);I=Ce.x,G=Ce.y,C=l(Ce.x)>l(Ce.y)?Ce.x:Ce.y,xt=vc(wt,Dt),h.lastInterval=m}else C=v.velocity,I=v.velocityX,G=v.velocityY,xt=v.direction;m.velocity=C,m.velocityX=I,m.velocityY=G,m.direction=xt}function bc(h){for(var m=[],v=0;v<h.pointers.length;)m[v]={clientX:a(h.pointers[v].clientX),clientY:a(h.pointers[v].clientY)},v++;return{timeStamp:c(),pointers:m,center:xc(m),deltaX:h.deltaX,deltaY:h.deltaY}}function xc(h){var m=h.length;if(m===1)return{x:a(h[0].clientX),y:a(h[0].clientY)};for(var v=0,k=0,C=0;C<m;)v+=h[C].clientX,k+=h[C].clientY,C++;return{x:a(v/m),y:a(k/m)}}function yc(h,m,v){return{x:m/h||0,y:v/h||0}}function vc(h,m){return h===m?si:l(h)>=l(m)?h<0?Ni:Li:m<0?Vi:zi}function qs(h,m,v){v||(v=mc);var k=m[v[0]]-h[v[0]],C=m[v[1]]-h[v[1]];return Math.sqrt(k*k+C*C)}function Rr(h,m,v){v||(v=mc);var k=m[v[0]]-h[v[0]],C=m[v[1]]-h[v[1]];return Math.atan2(C,k)*180/Math.PI}function ug(h,m){return Rr(m[1],m[0],Xs)+Rr(h[1],h[0],Xs)}function dg(h,m){return qs(m[0],m[1],Xs)/qs(h[0],h[1],Xs)}var fg={mousedown:tt,mousemove:be,mouseup:lt},hg="mousedown",pg="mousemove mouseup";function Zs(){this.evEl=hg,this.evWin=pg,this.pressed=!1,se.apply(this,arguments)}w(Zs,se,{handler:function(m){var v=fg[m.type];v&tt&&m.button===0&&(this.pressed=!0),v&be&&m.which!==1&&(v=lt),this.pressed&&(v&lt&&(this.pressed=!1),this.callback(this.manager,v,{pointers:[m],changedPointers:[m],pointerType:Xt,srcEvent:m}))}});var gg={pointerdown:tt,pointermove:be,pointerup:lt,pointercancel:ot,pointerout:ot},mg={2:zt,3:me,4:Xt,5:qt},wc="pointerdown",_c="pointermove pointerup pointercancel";e.MSPointerEvent&&!e.PointerEvent&&(wc="MSPointerDown",_c="MSPointerMove MSPointerUp MSPointerCancel");function Or(){this.evEl=wc,this.evWin=_c,se.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}w(Or,se,{handler:function(m){var v=this.store,k=!1,C=m.type.toLowerCase().replace("ms",""),I=gg[C],G=mg[m.pointerType]||m.pointerType,xt=G==zt,wt=W(v,m.pointerId,"pointerId");I&tt&&(m.button===0||xt)?wt<0&&(v.push(m),wt=v.length-1):I&(lt|ot)&&(k=!0),!(wt<0)&&(v[wt]=m,this.callback(this.manager,I,{pointers:v,changedPointers:[m],pointerType:G,srcEvent:m}),k&&v.splice(wt,1))}});var bg={touchstart:tt,touchmove:be,touchend:lt,touchcancel:ot},xg="touchstart",yg="touchstart touchmove touchend touchcancel";function kc(){this.evTarget=xg,this.evWin=yg,this.started=!1,se.apply(this,arguments)}w(kc,se,{handler:function(m){var v=bg[m.type];if(v===tt&&(this.started=!0),!!this.started){var k=vg.call(this,m,v);v&(lt|ot)&&k[0].length-k[1].length===0&&(this.started=!1),this.callback(this.manager,v,{pointers:k[0],changedPointers:k[1],pointerType:zt,srcEvent:m})}}});function vg(h,m){var v=H(h.touches),k=H(h.changedTouches);return m&(lt|ot)&&(v=B(v.concat(k),"identifier",!0)),[v,k]}var wg={touchstart:tt,touchmove:be,touchend:lt,touchcancel:ot},_g="touchstart touchmove touchend touchcancel";function Js(){this.evTarget=_g,this.targetIds={},se.apply(this,arguments)}w(Js,se,{handler:function(m){var v=wg[m.type],k=kg.call(this,m,v);k&&this.callback(this.manager,v,{pointers:k[0],changedPointers:k[1],pointerType:zt,srcEvent:m})}});function kg(h,m){var v=H(h.touches),k=this.targetIds;if(m&(tt|be)&&v.length===1)return k[v[0].identifier]=!0,[v,v];var C,I,G=H(h.changedTouches),xt=[],wt=this.target;if(I=v.filter(function(Dt){return R(Dt.target,wt)}),m===tt)for(C=0;C<I.length;)k[I[C].identifier]=!0,C++;for(C=0;C<G.length;)k[G[C].identifier]&&xt.push(G[C]),m&(lt|ot)&&delete k[G[C].identifier],C++;if(xt.length)return[B(I.concat(xt),"identifier",!0),xt]}var Sg=2500,Sc=25;function Ir(){se.apply(this,arguments);var h=_(this.handler,this);this.touch=new Js(this.manager,h),this.mouse=new Zs(this.manager,h),this.primaryTouch=null,this.lastTouches=[]}w(Ir,se,{handler:function(m,v,k){var C=k.pointerType==zt,I=k.pointerType==Xt;if(!(I&&k.sourceCapabilities&&k.sourceCapabilities.firesTouchEvents)){if(C)Eg.call(this,v,k);else if(I&&Mg.call(this,k))return;this.callback(m,v,k)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});function Eg(h,m){h&tt?(this.primaryTouch=m.changedPointers[0].identifier,Ec.call(this,m)):h&(lt|ot)&&Ec.call(this,m)}function Ec(h){var m=h.changedPointers[0];if(m.identifier===this.primaryTouch){var v={x:m.clientX,y:m.clientY};this.lastTouches.push(v);var k=this.lastTouches,C=function(){var I=k.indexOf(v);I>-1&&k.splice(I,1)};setTimeout(C,Sg)}}function Mg(h){for(var m=h.srcEvent.clientX,v=h.srcEvent.clientY,k=0;k<this.lastTouches.length;k++){var C=this.lastTouches[k],I=Math.abs(m-C.x),G=Math.abs(v-C.y);if(I<=Sc&&G<=Sc)return!0}return!1}var Mc=st(o.style,"touchAction"),Tc=Mc!==i,Cc="compute",Pc="auto",Nr="manipulation",Rn="none",Fi="pan-x",Hi="pan-y",Qs=Cg();function Lr(h,m){this.manager=h,this.set(m)}Lr.prototype={set:function(h){h==Cc&&(h=this.compute()),Tc&&this.manager.element.style&&Qs[h]&&(this.manager.element.style[Mc]=h),this.actions=h.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var h=[];return f(this.manager.recognizers,function(m){S(m.options.enable,[m])&&(h=h.concat(m.getTouchAction()))}),Tg(h.join(" "))},preventDefaults:function(h){var m=h.srcEvent,v=h.offsetDirection;if(this.manager.session.prevented){m.preventDefault();return}var k=this.actions,C=P(k,Rn)&&!Qs[Rn],I=P(k,Hi)&&!Qs[Hi],G=P(k,Fi)&&!Qs[Fi];if(C){var xt=h.pointers.length===1,wt=h.distance<2,Dt=h.deltaTime<250;if(xt&&wt&&Dt)return}if(!(G&&I)&&(C||I&&v&Me||G&&v&An))return this.preventSrc(m)},preventSrc:function(h){this.manager.session.prevented=!0,h.preventDefault()}};function Tg(h){if(P(h,Rn))return Rn;var m=P(h,Fi),v=P(h,Hi);return m&&v?Rn:m||v?m?Fi:Hi:P(h,Nr)?Nr:Pc}function Cg(){if(!Tc)return!1;var h={},m=e.CSS&&e.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(v){h[v]=m?e.CSS.supports("touch-action",v):!0}),h}var to=1,oe=2,oi=4,dn=8,$e=dn,Bi=16,Te=32;function Ue(h){this.options=b({},this.defaults,h||{}),this.id=Q(),this.manager=null,this.options.enable=E(this.options.enable,!0),this.state=to,this.simultaneous={},this.requireFail=[]}Ue.prototype={defaults:{},set:function(h){return b(this.options,h),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(h){if(d(h,"recognizeWith",this))return this;var m=this.simultaneous;return h=eo(h,this),m[h.id]||(m[h.id]=h,h.recognizeWith(this)),this},dropRecognizeWith:function(h){return d(h,"dropRecognizeWith",this)?this:(h=eo(h,this),delete this.simultaneous[h.id],this)},requireFailure:function(h){if(d(h,"requireFailure",this))return this;var m=this.requireFail;return h=eo(h,this),W(m,h)===-1&&(m.push(h),h.requireFailure(this)),this},dropRequireFailure:function(h){if(d(h,"dropRequireFailure",this))return this;h=eo(h,this);var m=W(this.requireFail,h);return m>-1&&this.requireFail.splice(m,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(h){return!!this.simultaneous[h.id]},emit:function(h){var m=this,v=this.state;function k(C){m.manager.emit(C,h)}v<dn&&k(m.options.event+Dc(v)),k(m.options.event),h.additionalEvent&&k(h.additionalEvent),v>=dn&&k(m.options.event+Dc(v))},tryEmit:function(h){if(this.canEmit())return this.emit(h);this.state=Te},canEmit:function(){for(var h=0;h<this.requireFail.length;){if(!(this.requireFail[h].state&(Te|to)))return!1;h++}return!0},recognize:function(h){var m=b({},h);if(!S(this.options.enable,[this,m])){this.reset(),this.state=Te;return}this.state&($e|Bi|Te)&&(this.state=to),this.state=this.process(m),this.state&(oe|oi|dn|Bi)&&this.tryEmit(m)},process:function(h){},getTouchAction:function(){},reset:function(){}};function Dc(h){return h&Bi?"cancel":h&dn?"end":h&oi?"move":h&oe?"start":""}function Ac(h){return h==zi?"down":h==Vi?"up":h==Ni?"left":h==Li?"right":""}function eo(h,m){var v=m.manager;return v?v.get(h):h}function xe(){Ue.apply(this,arguments)}w(xe,Ue,{defaults:{pointers:1},attrTest:function(h){var m=this.options.pointers;return m===0||h.pointers.length===m},process:function(h){var m=this.state,v=h.eventType,k=m&(oe|oi),C=this.attrTest(h);return k&&(v&ot||!C)?m|Bi:k||C?v&lt?m|dn:m&oe?m|oi:oe:Te}});function no(){xe.apply(this,arguments),this.pX=null,this.pY=null}w(no,xe,{defaults:{event:"pan",threshold:10,pointers:1,direction:gc},getTouchAction:function(){var h=this.options.direction,m=[];return h&Me&&m.push(Hi),h&An&&m.push(Fi),m},directionTest:function(h){var m=this.options,v=!0,k=h.distance,C=h.direction,I=h.deltaX,G=h.deltaY;return C&m.direction||(m.direction&Me?(C=I===0?si:I<0?Ni:Li,v=I!=this.pX,k=Math.abs(h.deltaX)):(C=G===0?si:G<0?Vi:zi,v=G!=this.pY,k=Math.abs(h.deltaY))),h.direction=C,v&&k>m.threshold&&C&m.direction},attrTest:function(h){return xe.prototype.attrTest.call(this,h)&&(this.state&oe||!(this.state&oe)&&this.directionTest(h))},emit:function(h){this.pX=h.deltaX,this.pY=h.deltaY;var m=Ac(h.direction);m&&(h.additionalEvent=this.options.event+m),this._super.emit.call(this,h)}});function Vr(){xe.apply(this,arguments)}w(Vr,xe,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Rn]},attrTest:function(h){return this._super.attrTest.call(this,h)&&(Math.abs(h.scale-1)>this.options.threshold||this.state&oe)},emit:function(h){if(h.scale!==1){var m=h.scale<1?"in":"out";h.additionalEvent=this.options.event+m}this._super.emit.call(this,h)}});function zr(){Ue.apply(this,arguments),this._timer=null,this._input=null}w(zr,Ue,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[Pc]},process:function(h){var m=this.options,v=h.pointers.length===m.pointers,k=h.distance<m.threshold,C=h.deltaTime>m.time;if(this._input=h,!k||!v||h.eventType&(lt|ot)&&!C)this.reset();else if(h.eventType&tt)this.reset(),this._timer=u(function(){this.state=$e,this.tryEmit()},m.time,this);else if(h.eventType&lt)return $e;return Te},reset:function(){clearTimeout(this._timer)},emit:function(h){this.state===$e&&(h&&h.eventType&lt?this.manager.emit(this.options.event+"up",h):(this._input.timeStamp=c(),this.manager.emit(this.options.event,this._input)))}});function Fr(){xe.apply(this,arguments)}w(Fr,xe,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Rn]},attrTest:function(h){return this._super.attrTest.call(this,h)&&(Math.abs(h.rotation)>this.options.threshold||this.state&oe)}});function Hr(){xe.apply(this,arguments)}w(Hr,xe,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Me|An,pointers:1},getTouchAction:function(){return no.prototype.getTouchAction.call(this)},attrTest:function(h){var m=this.options.direction,v;return m&(Me|An)?v=h.overallVelocity:m&Me?v=h.overallVelocityX:m&An&&(v=h.overallVelocityY),this._super.attrTest.call(this,h)&&m&h.offsetDirection&&h.distance>this.options.threshold&&h.maxPointers==this.options.pointers&&l(v)>this.options.velocity&&h.eventType&lt},emit:function(h){var m=Ac(h.offsetDirection);m&&this.manager.emit(this.options.event+m,h),this.manager.emit(this.options.event,h)}});function io(){Ue.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}w(io,Ue,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[Nr]},process:function(h){var m=this.options,v=h.pointers.length===m.pointers,k=h.distance<m.threshold,C=h.deltaTime<m.time;if(this.reset(),h.eventType&tt&&this.count===0)return this.failTimeout();if(k&&C&&v){if(h.eventType!=lt)return this.failTimeout();var I=this.pTime?h.timeStamp-this.pTime<m.interval:!0,G=!this.pCenter||qs(this.pCenter,h.center)<m.posThreshold;this.pTime=h.timeStamp,this.pCenter=h.center,!G||!I?this.count=1:this.count+=1,this._input=h;var xt=this.count%m.taps;if(xt===0)return this.hasRequireFailures()?(this._timer=u(function(){this.state=$e,this.tryEmit()},m.interval,this),oe):$e}return Te},failTimeout:function(){return this._timer=u(function(){this.state=Te},this.options.interval,this),Te},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==$e&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}});function Ge(h,m){return m=m||{},m.recognizers=E(m.recognizers,Ge.defaults.preset),new Br(h,m)}Ge.VERSION="2.0.7",Ge.defaults={domEvents:!1,touchAction:Cc,enable:!0,inputTarget:null,inputClass:null,preset:[[Fr,{enable:!1}],[Vr,{enable:!1},["rotate"]],[Hr,{direction:Me}],[no,{direction:Me},["swipe"]],[io],[io,{event:"doubletap",taps:2},["tap"]],[zr]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var Pg=1,Rc=2;function Br(h,m){this.options=b({},Ge.defaults,m||{}),this.options.inputTarget=this.options.inputTarget||h,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=h,this.input=og(this),this.touchAction=new Lr(this,this.options.touchAction),Oc(this,!0),f(this.options.recognizers,function(v){var k=this.add(new v[0](v[1]));v[2]&&k.recognizeWith(v[2]),v[3]&&k.requireFailure(v[3])},this)}Br.prototype={set:function(h){return b(this.options,h),h.touchAction&&this.touchAction.update(),h.inputTarget&&(this.input.destroy(),this.input.target=h.inputTarget,this.input.init()),this},stop:function(h){this.session.stopped=h?Rc:Pg},recognize:function(h){var m=this.session;if(!m.stopped){this.touchAction.preventDefaults(h);var v,k=this.recognizers,C=m.curRecognizer;(!C||C&&C.state&$e)&&(C=m.curRecognizer=null);for(var I=0;I<k.length;)v=k[I],m.stopped!==Rc&&(!C||v==C||v.canRecognizeWith(C))?v.recognize(h):v.reset(),!C&&v.state&(oe|oi|dn)&&(C=m.curRecognizer=v),I++}},get:function(h){if(h instanceof Ue)return h;for(var m=this.recognizers,v=0;v<m.length;v++)if(m[v].options.event==h)return m[v];return null},add:function(h){if(d(h,"add",this))return this;var m=this.get(h.options.event);return m&&this.remove(m),this.recognizers.push(h),h.manager=this,this.touchAction.update(),h},remove:function(h){if(d(h,"remove",this))return this;if(h=this.get(h),h){var m=this.recognizers,v=W(m,h);v!==-1&&(m.splice(v,1),this.touchAction.update())}return this},on:function(h,m){if(h!==i&&m!==i){var v=this.handlers;return f(N(h),function(k){v[k]=v[k]||[],v[k].push(m)}),this}},off:function(h,m){if(h!==i){var v=this.handlers;return f(N(h),function(k){m?v[k]&&v[k].splice(W(v[k],m),1):delete v[k]}),this}},emit:function(h,m){this.options.domEvents&&Dg(h,m);var v=this.handlers[h]&&this.handlers[h].slice();if(!(!v||!v.length)){m.type=h,m.preventDefault=function(){m.srcEvent.preventDefault()};for(var k=0;k<v.length;)v[k](m),k++}},destroy:function(){this.element&&Oc(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}};function Oc(h,m){var v=h.element;if(v.style){var k;f(h.options.cssProps,function(C,I){k=st(v.style,I),m?(h.oldCssProps[k]=v.style[k],v.style[k]=C):v.style[k]=h.oldCssProps[k]||""}),m||(h.oldCssProps={})}}function Dg(h,m){var v=t.createEvent("Event");v.initEvent(h,!0,!0),v.gesture=m,m.target.dispatchEvent(v)}b(Ge,{INPUT_START:tt,INPUT_MOVE:be,INPUT_END:lt,INPUT_CANCEL:ot,STATE_POSSIBLE:to,STATE_BEGAN:oe,STATE_CHANGED:oi,STATE_ENDED:dn,STATE_RECOGNIZED:$e,STATE_CANCELLED:Bi,STATE_FAILED:Te,DIRECTION_NONE:si,DIRECTION_LEFT:Ni,DIRECTION_RIGHT:Li,DIRECTION_UP:Vi,DIRECTION_DOWN:zi,DIRECTION_HORIZONTAL:Me,DIRECTION_VERTICAL:An,DIRECTION_ALL:gc,Manager:Br,Input:se,TouchAction:Lr,TouchInput:Js,MouseInput:Zs,PointerEventInput:Or,TouchMouseInput:Ir,SingleTouchInput:kc,Recognizer:Ue,AttrRecognizer:xe,Tap:io,Pan:no,Swipe:Hr,Pinch:Vr,Rotate:Fr,Press:zr,on:T,off:A,each:f,merge:y,extend:x,assign:b,inherit:w,bindFn:_,prefixed:st});var Ag=typeof e<"u"?e:typeof self<"u"?self:{};Ag.Hammer=Ge,typeof define=="function"&&define.amd?define(function(){return Ge}):typeof _r<"u"&&_r.exports?_r.exports=Ge:e[n]=Ge})(window,document,"Hammer")});var Sh=M(()=>{Tl();});var Eh=M(()=>{Sh()});function Pn(e,t,n){return e===void 0?!0:typeof e=="string"?e.indexOf(t)!==-1:typeof e=="function"?e({chart:n}).indexOf(t)!==-1:!1}function Gl(e,t){return typeof e=="function"&&(e=e({chart:t})),typeof e=="string"?{x:e.indexOf("x")!==-1,y:e.indexOf("y")!==-1}:{x:!1,y:!1}}function Sy(e,t){let n;return function(){return clearTimeout(n),n=setTimeout(e,t),t}}function Ey({x:e,y:t},n){let i=n.scales,s=Object.keys(i);for(let o=0;o<s.length;o++){let r=i[s[o]];if(t>=r.top&&t<=r.bottom&&e>=r.left&&e<=r.right)return r}return null}function Fh(e,t,n){let{mode:i="xy",scaleMode:s,overScaleMode:o}=e||{},r=Ey(t,n),a=Gl(i,n),l=Gl(s,n);if(o){let u=Gl(o,n);for(let d of["x","y"])u[d]&&(l[d]=a[d],a[d]=!1)}if(r&&l[r.axis])return[r];let c=[];return U(n.scales,function(u){a[u.axis]&&c.push(u)}),c}function at(e){let t=Yl.get(e);return t||(t={originalScaleLimits:{},updatedScaleLimits:{},handlers:{},panDelta:{},dragging:!1,panning:!1},Yl.set(e,t)),t}function My(e){Yl.delete(e)}function Hh(e,t,n,i){let s=Math.max(0,Math.min(1,(e-t)/n||0)),o=1-s;return{min:i*s,max:i*o}}function Bh(e,t){let n=e.isHorizontal()?t.x:t.y;return e.getValueForPixel(n)}function Wh(e,t,n){let i=e.max-e.min,s=i*(t-1),o=Bh(e,n);return Hh(o,e.min,i,s)}function Ty(e,t,n){let i=Bh(e,n);if(i===void 0)return{min:e.min,max:e.max};let s=Math.log10(e.min),o=Math.log10(e.max),r=Math.log10(i),a=o-s,l=a*(t-1),c=Hh(r,s,a,l);return{min:Math.pow(10,s+c.min),max:Math.pow(10,o-c.max)}}function Cy(e,t){return t&&(t[e.id]||t[e.axis])||{}}function Mh(e,t,n,i,s){let o=n[i];if(o==="original"){let r=e.originalScaleLimits[t.id][i];o=$(r.options,r.scale)}return $(o,s)}function Py(e,t,n){let i=e.getValueForPixel(t),s=e.getValueForPixel(n);return{min:Math.min(i,s),max:Math.max(i,s)}}function Dy(e,{min:t,max:n,minLimit:i,maxLimit:s},o){let r=(e-n+t)/2;t-=r,n+=r;let a=o.min.options??o.min.scale,l=o.max.options??o.max.scale,c=e/1e6;return Le(t,a,c)&&(t=a),Le(n,l,c)&&(n=l),t<i?(t=i,n=Math.min(i+e,s)):n>s&&(n=s,t=Math.max(s-e,i)),{min:t,max:n}}function ni(e,{min:t,max:n},i,s=!1){let o=at(e.chart),{options:r}=e,a=Cy(e,i),{minRange:l=0}=a,c=Mh(o,e,a,"min",-1/0),u=Mh(o,e,a,"max",1/0);if(s==="pan"&&(t<c||n>u))return!0;let d=e.max-e.min,f=s?Math.max(n-t,l):d;if(s&&f===l&&d<=l)return!0;let p=Dy(f,{min:t,max:n,minLimit:c,maxLimit:u},o.originalScaleLimits[e.id]);return r.min=p.min,r.max=p.max,o.updatedScaleLimits[e.id]=p,e.parse(p.min)!==e.min||e.parse(p.max)!==e.max}function Ay(e,t,n,i){let s=Wh(e,t,n),o={min:e.min+s.min,max:e.max-s.max};return ni(e,o,i,!0)}function Ry(e,t,n,i){let s=Ty(e,t,n);return ni(e,s,i,!0)}function Oy(e,t,n,i){ni(e,Py(e,t,n),i,!0)}function Iy(e){let n=e.getLabels().length-1;e.min>0&&(e.min-=1),e.max<n&&(e.max+=1)}function Ny(e,t,n,i){let s=Wh(e,t,n);e.min===e.max&&t<1&&Iy(e);let o={min:e.min+Th(s.min),max:e.max-Th(s.max)};return ni(e,o,i,!0)}function Ly(e){return e.isHorizontal()?e.width:e.height}function Vy(e,t,n){let s=e.getLabels().length-1,{min:o,max:r}=e,a=Math.max(r-o,1),l=Math.round(Ly(e)/Math.max(a,10)),c=Math.round(Math.abs(t/l)),u;return t<-l?(r=Math.min(r+c,s),o=a===1?r:r-a,u=r===s):t>l&&(o=Math.max(0,o-c),r=a===1?o:o+a,u=o===0),ni(e,{min:o,max:r},n)||u}function jh(e,t,n,i=!1){let{min:s,max:o,options:r}=e,a=r.time&&r.time.round,l=zy[a]||0,c=e.getValueForPixel(e.getPixelForValue(s+l)-t),u=e.getValueForPixel(e.getPixelForValue(o+l)-t);return isNaN(c)||isNaN(u)?!0:ni(e,{min:c,max:u},n,i?"pan":!1)}function Ch(e,t,n){return jh(e,t,n,!0)}function Fy(e,t,n){let{id:i,options:{min:s,max:o}}=e;if(!t[i]||!n[i])return!0;let r=n[i];return r.min!==s||r.max!==o}function Ph(e,t){U(e,(n,i)=>{t[i]||delete e[i]})}function Ri(e,t){let{scales:n}=e,{originalScaleLimits:i,updatedScaleLimits:s}=t;return U(n,function(o){Fy(o,i,s)&&(i[o.id]={min:{scale:o.min,options:o.options.min},max:{scale:o.max,options:o.options.max}})}),Ph(i,n),Ph(s,n),i}function Dh(e,t,n,i){let s=Kl[e.type]||Kl.default;V(s,[e,t,n,i])}function Ah(e,t,n,i){let s=Xl[e.type]||Xl.default;V(s,[e,t,n,i])}function Hy(e){let t=e.chartArea;return{x:(t.left+t.right)/2,y:(t.top+t.bottom)/2}}function tc(e,t,n="none",i="api"){let{x:s=1,y:o=1,focalPoint:r=Hy(e)}=typeof t=="number"?{x:t,y:t}:t,a=at(e),{options:{limits:l,zoom:c}}=a;Ri(e,a);let u=s!==1,d=o!==1,f=Fh(c,r,e);U(f||e.scales,function(p){p.isHorizontal()&&u?Dh(p,s,r,l):!p.isHorizontal()&&d&&Dh(p,o,r,l)}),e.update(n),V(c.onZoom,[{chart:e,trigger:i}])}function $h(e,t,n,i="none",s="api"){let o=at(e),{options:{limits:r,zoom:a}}=o,{mode:l="xy"}=a;Ri(e,o);let c=Pn(l,"x",e),u=Pn(l,"y",e);U(e.scales,function(d){d.isHorizontal()&&c?Ah(d,t.x,n.x,r):!d.isHorizontal()&&u&&Ah(d,t.y,n.y,r)}),e.update(i),V(a.onZoom,[{chart:e,trigger:s}])}function By(e,t,n,i="none",s="api"){let o=at(e);Ri(e,o);let r=e.scales[t];ni(r,n,void 0,!0),e.update(i),V(o.options.zoom?.onZoom,[{chart:e,trigger:s}])}function Wy(e,t="default"){let n=at(e),i=Ri(e,n);U(e.scales,function(s){let o=s.options;i[s.id]?(o.min=i[s.id].min.options,o.max=i[s.id].max.options):(delete o.min,delete o.max),delete n.updatedScaleLimits[s.id]}),e.update(t),V(n.options.zoom.onZoomComplete,[{chart:e}])}function jy(e,t){let n=e.originalScaleLimits[t];if(!n)return;let{min:i,max:s}=n;return $(s.options,s.scale)-$(i.options,i.scale)}function $y(e){let t=at(e),n=1,i=1;return U(e.scales,function(s){let o=jy(t,s.id);if(o){let r=Math.round(o/(s.max-s.min)*100)/100;n=Math.min(n,r),i=Math.max(i,r)}}),n<1?n:i}function Rh(e,t,n,i){let{panDelta:s}=i,o=s[e.id]||0;we(o)===we(t)&&(t+=o);let r=ql[e.type]||ql.default;V(r,[e,t,n])?s[e.id]=0:s[e.id]=t}function Uh(e,t,n,i="none"){let{x:s=0,y:o=0}=typeof t=="number"?{x:t,y:t}:t,r=at(e),{options:{pan:a,limits:l}}=r,{onPan:c}=a||{};Ri(e,r);let u=s!==0,d=o!==0;U(n||e.scales,function(f){f.isHorizontal()&&u?Rh(f,s,l,r):!f.isHorizontal()&&d&&Rh(f,o,l,r)}),e.update(i),V(c,[{chart:e}])}function Gh(e){let t=at(e);Ri(e,t);let n={};for(let i of Object.keys(e.scales)){let{min:s,max:o}=t.originalScaleLimits[i]||{min:{},max:{}};n[i]={min:s.scale,max:o.scale}}return n}function Uy(e){let t=at(e),n={};for(let i of Object.keys(e.scales))n[i]=t.updatedScaleLimits[i];return n}function Gy(e){let t=Gh(e);for(let n of Object.keys(e.scales)){let{min:i,max:s}=t[n];if(i!==void 0&&e.scales[n].min!==i||s!==void 0&&e.scales[n].max!==s)return!0}return!1}function Oh(e){let t=at(e);return t.panning||t.dragging}function Yt(e,t){let{handlers:n}=at(e),i=n[t];i&&i.target&&(i.target.removeEventListener(t,i),delete n[t])}function Fs(e,t,n,i){let{handlers:s,options:o}=at(e),r=s[n];if(r&&r.target===t)return;Yt(e,n),s[n]=l=>i(e,l,o),s[n].target=t;let a=n==="wheel"?!1:void 0;t.addEventListener(n,s[n],{passive:a})}function Yy(e,t){let n=at(e);n.dragStart&&(n.dragging=!0,n.dragEnd=t,e.update("none"))}function Ky(e,t){let n=at(e);!n.dragStart||t.key!=="Escape"||(Yt(e,"keydown"),n.dragging=!1,n.dragStart=n.dragEnd=null,e.update("none"))}function Zl(e,t){if(e.target!==t.canvas){let n=t.canvas.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}}return ie(e,t)}function Yh(e,t,n){let{onZoomStart:i,onZoomRejected:s}=n;if(i){let o=Zl(t,e);if(V(i,[{chart:e,event:t,point:o}])===!1)return V(s,[{chart:e,event:t}]),!1}}function Xy(e,t){if(e.legend){let o=ie(t,e);if(ne(o,e.legend))return}let n=at(e),{pan:i,zoom:s={}}=n.options;if(t.button!==0||zh(Hs(i),t)||Ql(Hs(s.drag),t))return V(s.onZoomRejected,[{chart:e,event:t}]);Yh(e,t,s)!==!1&&(n.dragStart=t,Fs(e,e.canvas.ownerDocument,"mousemove",Yy),Fs(e,window.document,"keydown",Ky))}function qy({begin:e,end:t},n){let i=t.x-e.x,s=t.y-e.y,o=Math.abs(i/s);o>n?i=Math.sign(i)*Math.abs(s*n):o<n&&(s=Math.sign(s)*Math.abs(i/n)),t.x=e.x+i,t.y=e.y+s}function Nh(e,t,n,{min:i,max:s,prop:o}){e[i]=Ih(Math.min(n.begin[o],n.end[o]),t[i],t[s]),e[s]=Ih(Math.max(n.begin[o],n.end[o]),t[i],t[s])}function Zy(e,t,n){let i={begin:Zl(t.dragStart,e),end:Zl(t.dragEnd,e)};if(n){let s=e.chartArea.width/e.chartArea.height;qy(i,s)}return i}function Kh(e,t,n,i){let s=Pn(t,"x",e),o=Pn(t,"y",e),{top:r,left:a,right:l,bottom:c,width:u,height:d}=e.chartArea,f={top:r,left:a,right:l,bottom:c},p=Zy(e,n,i&&s&&o);s&&Nh(f,e.chartArea,p,{min:"left",max:"right",prop:"x"}),o&&Nh(f,e.chartArea,p,{min:"top",max:"bottom",prop:"y"});let b=f.right-f.left,x=f.bottom-f.top;return{...f,width:b,height:x,zoomX:s&&b?1+(u-b)/u:1,zoomY:o&&x?1+(d-x)/d:1}}function Jy(e,t){let n=at(e);if(!n.dragStart)return;Yt(e,"mousemove");let{mode:i,onZoomComplete:s,drag:{threshold:o=0,maintainAspectRatio:r}}=n.options.zoom,a=Kh(e,i,{dragStart:n.dragStart,dragEnd:t},r),l=Pn(i,"x",e)?a.width:0,c=Pn(i,"y",e)?a.height:0,u=Math.sqrt(l*l+c*c);if(n.dragStart=n.dragEnd=null,u<=o){n.dragging=!1,e.update("none");return}$h(e,{x:a.left,y:a.top},{x:a.right,y:a.bottom},"zoom","drag"),n.dragging=!1,n.filterNextClick=!0,V(s,[{chart:e}])}function Qy(e,t,n){if(Ql(Hs(n.wheel),t)){V(n.onZoomRejected,[{chart:e,event:t}]);return}if(Yh(e,t,n)!==!1&&(t.cancelable&&t.preventDefault(),t.deltaY!==void 0))return!0}function tv(e,t){let{handlers:{onZoomComplete:n},options:{zoom:i}}=at(e);if(!Qy(e,t,i))return;let s=t.target.getBoundingClientRect(),o=i.wheel.speed,r=t.deltaY>=0?2-1/(1-o):1+o,a={x:r,y:r,focalPoint:{x:t.clientX-s.left,y:t.clientY-s.top}};tc(e,a,"zoom","wheel"),V(n,[{chart:e}])}function ev(e,t,n,i){n&&(at(e).handlers[t]=Sy(()=>V(n,[{chart:e}]),i))}function nv(e,t){let n=e.canvas,{wheel:i,drag:s,onZoomComplete:o}=t.zoom;i.enabled?(Fs(e,n,"wheel",tv),ev(e,"onZoomComplete",o,250)):Yt(e,"wheel"),s.enabled?(Fs(e,n,"mousedown",Xy),Fs(e,n.ownerDocument,"mouseup",Jy)):(Yt(e,"mousedown"),Yt(e,"mousemove"),Yt(e,"mouseup"),Yt(e,"keydown"))}function iv(e){Yt(e,"mousedown"),Yt(e,"mousemove"),Yt(e,"mouseup"),Yt(e,"wheel"),Yt(e,"click"),Yt(e,"keydown")}function sv(e,t){return function(n,i){let{pan:s,zoom:o={}}=t.options;if(!s||!s.enabled)return!1;let r=i&&i.srcEvent;return r&&!t.panning&&i.pointerType==="mouse"&&(Ql(Hs(s),r)||zh(Hs(o.drag),r))?(V(s.onPanRejected,[{chart:e,event:i}]),!1):!0}}function ov(e,t){let n=Math.abs(e.clientX-t.clientX),i=Math.abs(e.clientY-t.clientY),s=n/i,o,r;return s>.3&&s<1.7?o=r=!0:n>i?o=!0:r=!0,{x:o,y:r}}function Xh(e,t,n){if(t.scale){let{center:i,pointers:s}=n,o=1/t.scale*n.scale,r=n.target.getBoundingClientRect(),a=ov(s[0],s[1]),l=t.options.zoom.mode,c={x:a.x&&Pn(l,"x",e)?o:1,y:a.y&&Pn(l,"y",e)?o:1,focalPoint:{x:i.x-r.left,y:i.y-r.top}};tc(e,c,"zoom","pinch"),t.scale=n.scale}}function rv(e,t,n){if(t.options.zoom.pinch.enabled){let i=ie(n,e);V(t.options.zoom.onZoomStart,[{chart:e,event:n,point:i}])===!1?(t.scale=null,V(t.options.zoom.onZoomRejected,[{chart:e,event:n}])):t.scale=1}}function av(e,t,n){t.scale&&(Xh(e,t,n),t.scale=null,V(t.options.zoom.onZoomComplete,[{chart:e}]))}function qh(e,t,n){let i=t.delta;i&&(t.panning=!0,Uh(e,{x:n.deltaX-i.x,y:n.deltaY-i.y},t.panScales),t.delta={x:n.deltaX,y:n.deltaY})}function lv(e,t,n){let{enabled:i,onPanStart:s,onPanRejected:o}=t.options.pan;if(!i)return;let r=n.target.getBoundingClientRect(),a={x:n.center.x-r.left,y:n.center.y-r.top};if(V(s,[{chart:e,event:n,point:a}])===!1)return V(o,[{chart:e,event:n}]);t.panScales=Fh(t.options.pan,a,e),t.delta={x:0,y:0},qh(e,t,n)}function cv(e,t){t.delta=null,t.panning&&(t.panning=!1,t.filterNextClick=!0,V(t.options.pan.onPanComplete,[{chart:e}]))}function Lh(e,t){let n=at(e),i=e.canvas,{pan:s,zoom:o}=t,r=new Ai.default.Manager(i);o&&o.pinch.enabled&&(r.add(new Ai.default.Pinch),r.on("pinchstart",a=>rv(e,n,a)),r.on("pinch",a=>Xh(e,n,a)),r.on("pinchend",a=>av(e,n,a))),s&&s.enabled&&(r.add(new Ai.default.Pan({threshold:s.threshold,enable:sv(e,n)})),r.on("panstart",a=>lv(e,n,a)),r.on("panmove",a=>qh(e,n,a)),r.on("panend",()=>cv(e,n))),Jl.set(e,r)}function Vh(e){let t=Jl.get(e);t&&(t.remove("pinchstart"),t.remove("pinch"),t.remove("pinchend"),t.remove("panstart"),t.remove("pan"),t.remove("panend"),t.destroy(),Jl.delete(e))}function uv(e,t){let{pan:n,zoom:i}=e,{pan:s,zoom:o}=t;return i?.zoom?.pinch?.enabled!==o?.zoom?.pinch?.enabled||n?.enabled!==s?.enabled||n?.threshold!==s?.threshold}function kr(e,t,n){let i=n.zoom.drag,{dragStart:s,dragEnd:o}=at(e);if(i.drawTime!==t||!o)return;let{left:r,top:a,width:l,height:c}=Kh(e,n.zoom.mode,{dragStart:s,dragEnd:o},i.maintainAspectRatio),u=e.ctx;u.save(),u.beginPath(),u.fillStyle=i.backgroundColor||"rgba(225,225,225,0.3)",u.fillRect(r,a,l,c),i.borderWidth>0&&(u.lineWidth=i.borderWidth,u.strokeStyle=i.borderColor||"rgba(225,225,225)",u.strokeRect(r,a,l,c)),u.restore()}var Ai,Hs,zh,Ql,Yl,Th,zy,Kl,Xl,ql,Ih,Jl,dv,Zh,Jh=M(()=>{Ai=Hg(kh());Eh();Hs=e=>e&&e.enabled&&e.modifierKey,zh=(e,t)=>e&&t[e+"Key"],Ql=(e,t)=>e&&!t[e+"Key"];Yl=new WeakMap;Th=e=>e===0||isNaN(e)?0:e<0?Math.min(Math.round(e),-1):Math.max(Math.round(e),1);zy={second:500,minute:30*1e3,hour:1800*1e3,day:720*60*1e3,week:3.5*24*60*60*1e3,month:360*60*60*1e3,quarter:1440*60*60*1e3,year:4368*60*60*1e3};Kl={category:Ny,default:Ay,logarithmic:Ry},Xl={default:Oy},ql={category:Vy,default:jh,logarithmic:Ch,timeseries:Ch};Ih=(e,t,n)=>Math.min(n,Math.max(t,e));Jl=new WeakMap;dv="2.2.0";Zh={id:"zoom",version:dv,defaults:{pan:{enabled:!1,mode:"xy",threshold:10,modifierKey:null},zoom:{wheel:{enabled:!1,speed:.1,modifierKey:null},drag:{enabled:!1,drawTime:"beforeDatasetsDraw",modifierKey:null},pinch:{enabled:!1},mode:"xy"}},start:function(e,t,n){let i=at(e);i.options=n,Object.prototype.hasOwnProperty.call(n.zoom,"enabled")&&console.warn("The option \`zoom.enabled\` is no longer supported. Please use \`zoom.wheel.enabled\`, \`zoom.drag.enabled\`, or \`zoom.pinch.enabled\`."),(Object.prototype.hasOwnProperty.call(n.zoom,"overScaleMode")||Object.prototype.hasOwnProperty.call(n.pan,"overScaleMode"))&&console.warn("The option \`overScaleMode\` is deprecated. Please use \`scaleMode\` instead (and update \`mode\` as desired)."),Ai.default&&Lh(e,n),e.pan=(s,o,r)=>Uh(e,s,o,r),e.zoom=(s,o)=>tc(e,s,o),e.zoomRect=(s,o,r)=>$h(e,s,o,r),e.zoomScale=(s,o,r)=>By(e,s,o,r),e.resetZoom=s=>Wy(e,s),e.getZoomLevel=()=>$y(e),e.getInitialScaleBounds=()=>Gh(e),e.getZoomedScaleBounds=()=>Uy(e),e.isZoomedOrPanned=()=>Gy(e),e.isZoomingOrPanning=()=>Oh(e)},beforeEvent(e,{event:t}){if(Oh(e))return!1;if(t.type==="click"||t.type==="mouseup"){let n=at(e);if(n.filterNextClick)return n.filterNextClick=!1,!1}},beforeUpdate:function(e,t,n){let i=at(e),s=i.options;i.options=n,uv(s,n)&&(Vh(e),Lh(e,n)),nv(e,n)},beforeDatasetsDraw(e,t,n){kr(e,"beforeDatasetsDraw",n)},afterDatasetsDraw(e,t,n){kr(e,"afterDatasetsDraw",n)},beforeDraw(e,t,n){kr(e,"beforeDraw",n)},afterDraw(e,t,n){kr(e,"afterDraw",n)},stop:function(e){iv(e),Ai.default&&Vh(e),My(e)},panFunctions:ql,zoomFunctions:Kl,zoomRectFunctions:Xl}});function ec(e){let t=[],n=()=>t.forEach(l=>l()),i=D(null),s=null;return{canvasRef:i,init:()=>{let l=i.value;if(!l)return console.error("createLineChart: canvas ref not set",new Error().stack),n;fe.register(Zh,Ci,Qn,Ti,ti,Tn,xh,vh),s=new fe(l,{type:"line",data:e.data.peek(),options:{scales:{y:{min:0,suggestedMax:10}},animation:!1,responsive:!0,plugins:{zoom:{pan:{enabled:!0,mode:"x"},zoom:{wheel:{enabled:!0},mode:"x"}},legend:{align:"start",position:"bottom"},title:{display:!1}}}});let c=e.data.subscribe(d=>{s&&(s.data=d,s.update())}),u=new ResizeObserver(()=>s?.resize());return u.observe(l.parentElement),t.push(()=>{u.disconnect(),s?.destroy(),s=null,c()}),()=>n()},resetZoom:()=>s?.resetZoom(),getZoomLevel:()=>s?.getZoomLevel()??0}}var Qh=M(()=>{"use strict";z();_h();Jh()});var Sr=M(()=>{"use strict";Ad();Rd();Od();Id();Qh()});var nc,tp=M(()=>{"use strict";z();q();Sr();nc=e=>{let t=e.minContainerWidth??250,n=[],i=()=>{n.forEach(y=>y()),n.length=0},s=D(null),o=D(0),r=D(0),a=bn(null),l=bn(null),[c,u]=cs(),d=Ba(a);n.push(u);let f=y=>{y.preventDefault(),s.value={...c.value},o.value=r.value,console.log("onMouseDown",{startMouse:s.value,prevFirstContainerWidth:o.value,firstContainerWidth:r.value})},p=()=>s.value=null,b=y=>{if(s.value==null||l.current==null)return;let w=Math.max(o.value+y.x-s.value.x,t);r.value=Math.min(w,l.current.clientWidth-t),console.log("onMouseMove",w,r.value)},x=()=>{l.current!=null&&l.current.clientWidth-t<r.value&&(r.value=Math.max(l.current.clientWidth-t,t))};return window.addEventListener("mouseup",p),window.addEventListener("mousemove",b),window.addEventListener("resize",x),n.push(()=>{window.removeEventListener("mouseup",p),window.removeEventListener("mousemove",b),window.removeEventListener("resize",x)}),Da(()=>{if(l.current)return r.value=l.current.clientWidth/2,d.init(),()=>{d.dispose()}}),d.state.width.subscribe(y=>{console.log("width",y)}),Wt(()=>i()),({children:y,className:w,..._})=>{let[S,E]=Array.isArray(y)?y:[];return g("div",{className:ft("flex-grow grid gap-2 items-start w-full relative",Z(w)),ref:l,style:{gridTemplateColumns:\`\${r}px 1fr\`},..._},g("div",{ref:a,className:"firstContainer w-full h-full"},S),d.state.width.value!=0&&g("div",{className:"w-8 flex justify-center h-full absolute top-0 -translate-x-1/2 cursor-col-resize z-[9999]",style:{left:\`\${d.state.width.value}px\`},onmousedown:f},g("div",{className:"dividerLine w-[5px] bg-neutral-800 h-full"})),g("div",{className:"secondContainer h-full"},E))}}});function Dn({root:e,className:t}){let{objectKeysChunkSize:n}=J.viewerSettings.value,i=e.page.value,s=e.children.slice(0,(i+1)*n),o=s.length<e.children.length;return g(kt,null,g("div",{className:ft("flex flex-col items-start w-full",Z(t))},s.map(r=>g("div",{key:r.path,className:"flex flex-col items-start w-full gap-2 pl-2 py-1 pr-1 border-b border-neutral-700 last:border-b-0"},g(Er,{node:r})))),o&&g("button",{onclick:()=>e.page.value++,title:"Show more",className:"p-1 border font-bold border-neutral-700 hover:bg-neutral-700"},g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1rem",height:"1rem",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},g("circle",{cx:"12",cy:"12",r:"1"}),g("circle",{cx:"19",cy:"12",r:"1"}),g("circle",{cx:"5",cy:"12",r:"1"}))))}function Er({node:e}){switch(e.kind){case"null":case"undefined":case"string":case"number":case"bigint":case"boolean":case"symbol":case"function":case"dom-node":case"error":return g(fv,{node:e});case"object":return g(pv,{node:e});case"array":return g(gv,{node:e});case"array-chunk":return g(mv,{node:e});case"signal":return g(bv,{node:e})}}function fv({node:e}){let{label:t,path:n,raw:i,kind:s}=e;return g(Mr,null,g("label",{className:"text-xs truncate",title:n},t),g(hv,{kind:s,raw:i}))}function hv({kind:e,raw:t}){switch(e){case"null":return g("small",{className:"text-neutral-300"},"null");case"undefined":return g("small",{className:"text-neutral-300"},"undefined");case"dom-node":return g("small",{className:"text-neutral-300"},"<",g("span",{style:"color: #f0a05e"},t.nodeName),"/>");case"error":{let n=t;return g("small",{className:"text-neutral-300"},n.message,"cause"in n&&!!n.cause&&\` (\${String(n.cause)})\`)}case"string":return g("small",{className:"text-neutral-300"},\`"\${t}"\`);case"number":case"bigint":return g("small",{className:"text-neutral-300"},t);case"boolean":return g("small",{className:"text-neutral-300"},t?"true":"false");case"symbol":return g("small",{className:"text-neutral-300"},t.toString());case"function":return g("small",{className:"text-neutral-300 italic"},\`\\u0192 \${t.name??"anonymous"}()\`)}}function pv({node:e}){let t=e.collapsed.value;t||e.buildChildren();let n=t?null:e.children.peek();return g(Mr,null,g("button",{className:"text-xs flex items-center gap-1 cursor-pointer w-full",title:e.path,onclick:()=>e.collapsed.value=!e.collapsed.value},e.label,g(tn,{width:10,height:10,className:\`transition \${t?"":"rotate-90"}\`})),n!==null&&g(Dn,{root:{children:n,page:e.page}}))}function gv({node:e}){let t=e.collapsed.value;t||e.buildChildren();let n=t?null:e.children.peek();return g(Mr,null,g("button",{className:"text-xs flex items-center gap-1 cursor-pointer w-full",title:e.path,onclick:()=>e.collapsed.value=!e.collapsed.value},e.label,g(tn,{width:10,height:10,className:\`transition \${t?"":"rotate-90"}\`})),t?g("small",{className:"text-neutral-300"},\`Array(\${e.length})\`):n&&g("div",{className:"flex flex-col items-start gap-1 w-full"},n.map(i=>g(Er,{node:i}))))}function mv({node:e}){let t=e.collapsed.value;t||e.buildChildren();let n=t?null:e.children.peek();return g("div",{className:"flex flex-col items-start gap-1 w-full"},g("button",{className:"text-xs flex items-center gap-1 cursor-pointer w-full",onclick:()=>e.collapsed.value=!e.collapsed.value},e.label,g(tn,{width:10,height:10,className:\`transition \${t?"":"rotate-90"}\`})),n&&g("div",{className:"flex flex-col items-start gap-1 w-full"},n.map(i=>g(Er,{node:i}))))}function bv({node:e}){let t=e.viewerNode.value;return g(Mr,null,g("div",{className:"flex items-center gap-2"},g("label",{className:"text-xs truncate",title:e.path},e.label),g("span",{className:"text-[10px] italic text-primary border border-primary/40 px-1 rounded leading-none py-px"},"signal")),g("div",{className:"pl-2 w-full"},g(Er,{node:t})))}function Mr({children:e}){return g("div",{className:"flex flex-col items-start gap-1 w-full"},e)}var ic=M(()=>{"use strict";z();z();q();Ro();Oe()});function Pt(){return{collapsed:new Map,page:new Map,children:new Map,signalNodes:new Map}}function ke(e,t,n){n.page.set(t,e.page),Ws(e.children,n)}function Ws(e,t){for(let n of e)if(n.kind==="object"){t.collapsed.set(n.path,n.collapsed),t.page.set(n.path,n.page),t.children.set(n.path,n.children);let i=n.children.peek();i!==null&&Ws(i,t)}else if(n.kind==="array"||n.kind==="array-chunk"){t.collapsed.set(n.path,n.collapsed),t.children.set(n.path,n.children);let i=n.children.peek();i!==null&&Ws(i,t)}else n.kind==="signal"&&(t.signalNodes.set(n.path,n),Ws([n.viewerNode.peek()],t))}function he(e){for(let t of e.collapsed.values())L.dispose(t);for(let t of e.page.values())L.dispose(t);for(let t of e.children.values())L.dispose(t);for(let t of e.signalNodes.values())t.unsubscribe(),L.dispose(t.viewerNode)}function xv(e){if(e===null)return"null";if(e===void 0)return"undefined";let t=window.opener?window.opener.Node:window.Node;if(e instanceof t)return"dom-node";let n=window.opener?window.opener.Error:window.Error;if(e instanceof n)return"error";let i=typeof e;return i==="string"?"string":i==="number"?"number":i==="bigint"?"bigint":i==="boolean"?"boolean":i==="symbol"?"symbol":i==="function"?"function":null}function Bs(e,t,n,i,s){let o=xv(e);if(o!==null)return{kind:o,label:t,path:n,raw:e};if(L.isSignal(e)){let d=e,f=\`\${n}.$value\`,p=Bs(d.peek(),"value",f,i,s),b=D(p),x=d.subscribe(y=>{let w=Pt();Ws([b.peek()],w),b.value=Bs(y,"value",f,w,s),he(w)});return{kind:"signal",label:t,path:n,signal:d,viewerNode:b,unsubscribe:x}}if(Array.isArray(e)){let d=i.collapsed.get(n)??D(!0);i.collapsed.delete(n);let f=D(null);return{kind:"array",label:t,path:n,collapsed:d,length:e.length,children:f,buildChildren:()=>{if(f.peek()===null)if(e.length>s.arrayChunkSize){let b=Math.ceil(e.length/s.arrayChunkSize);f.value=Array.from({length:b},(x,y)=>{let w=y*s.arrayChunkSize,_=Math.min((y+1)*s.arrayChunkSize,e.length),S=\`\${n}[\${w}..\${_-1}]\`,E=D(!0),T=D(null),A=e.slice(w,_);return{kind:"array-chunk",label:\`[\${w}..\${_-1}]\`,path:S,collapsed:E,range:{start:w,end:_},children:T,buildChildren:()=>{T.peek()===null&&(T.value=A.map((P,N)=>Bs(P,(w+N).toString(),\`\${n}[\${w+N}]\`,Pt(),s)))}}})}else f.value=e.map((b,x)=>Bs(b,x.toString(),\`\${n}[\${x}]\`,Pt(),s))}}}let r=i.collapsed.get(n)??D(!0);i.collapsed.delete(n);let a=i.page.get(n)??D(0);i.page.delete(n);let l=D(null),c=e;return{kind:"object",label:t,path:n,collapsed:r,page:a,children:l,buildChildren:()=>{l.peek()===null&&(l.value=ep(c,n,Pt(),s))}}}function ep(e,t,n,i){return Object.keys(e).map(s=>Bs(e[s],s,\`\${t}.\${s}\`,n,i))}function cn(e,t,n,i){let s=n.page.get(t)??D(0);n.page.delete(t);let o=ep(e,t,n,i);return{page:s,children:o}}var sc=M(()=>{"use strict";z()});var js=M(()=>{"use strict";Dd();tp();ic();sc()});function Tr(e){e&&("nodes"in e?e.nodes.forEach(Tr):(Tr(e.child),Tr(e.sibling)))}function np(e,t,n){let i=new Map;Cr(n,i);let s=e.rootNode,o=rc();if(s){let r=t.trim().toLowerCase(),a=r?r.split(/\\s+/):[];o.nodes.push(...op(s,a,i))}for(let{collapsed:r}of i.values())L.dispose(r);return o}function Cr(e,t){if(e)if("nodes"in e)for(let n of e.nodes)Cr(n,t);else{let{id:n,collapsed:i}=e;t.set(e.kiruNode,{id:n,collapsed:i}),Cr(e.child,t),Cr(e.sibling,t)}}function op(e,t,n=new Map){let i=[],s=e;for(;s;){let o=op(s.child,t,n);if(typeof s.type!="function")i.push(...o);else{let r=Hn(s);if(wv(t,r)){let a=_v(s,r,n);a.child=o[0]??null;for(let l=0;l<o.length;l++)o[l].parent=a,o[l].sibling=o[l+1]??null;i.push(a)}else i.push(...o)}s=s.sibling}return i}function wv(e,t){let n=t.toLowerCase();return e.every(i=>n.includes(i))}function rc(...e){return{value:"ROOT",nodes:e}}function _v(e,t,n=new Map){let{id:i,collapsed:s}=n.get(e)??{id:crypto.randomUUID(),collapsed:D(!0)};return n.delete(e),{id:i,name:t,kiruNode:e,collapsed:s,parent:null,child:null,sibling:null}}function oc(e){let t=Oi.peek();if(!t)return;let n=ac(e,t);if(!n)return;let i=n.parent;for(;i;)i.collapsed.value=!1,i=i.parent}function rp(e){e&&oc(Kt.peek())}function kv(e){let t=Oi.peek();if(!t)return;let n=ac(Kt.peek(),t);n?.child&&(n.collapsed.value=e)}function Sv(e,t){let n=Array.from(e.querySelectorAll("[data-graph-node-id]"));if(n.length===0)return;let i=Oi.peek(),s=-1;if(i){let c=ac(Kt.peek(),i);c&&(s=n.findIndex(u=>u.dataset.graphNodeId===c.id))}let r=s===-1?t==="down"?0:n.length-1:(s+(t==="up"?-1:1)+n.length)%n.length,a=n[r];if(!a)return;let l=Ev(Kt.peek(),a);l&&(Oi.sneak(l.kiruNode),Oi.notify(c=>c!==rp))}function Ev(e,t){let n=t.dataset.graphNodeId;if(!n)return null;let i=s=>s?s.id===n?s:i(s.child)??i(s.sibling):null;for(let s of e.nodes){let o=i(s);if(o)return o}return null}function ac(e,t){let n=i=>i?i.kiruNode===t?i:n(i.child)??n(i.sibling):null;for(let i of e.nodes){let s=n(i);if(s)return s}return null}var yv,Oi,vv,Kt,sp,ip,ap=M(()=>{"use strict";z();Oe();Bn();({selectedApp:yv,selectedNode:Oi,appSearchTerm:vv}=J),Kt=D(rc()),sp=()=>(window.addEventListener("keydown",ip),()=>window.removeEventListener("keydown",ip));Bt(()=>{let e=yv.value,t=vv.value;if(!e){Tr(Kt.peek()),Kt.value=rc();return}Kt.value=np(e,t,Kt.peek()),oc(Kt.peek());let n=i=>{i===e&&(Kt.value=np(i,t,Kt.peek()),oc(Kt.peek()))};return ht().on("update",n),()=>ht().off("update",n)});Oi.subscribe(rp);ip=e=>{Oa(t=>{if(e.key==="l"&&e.ctrlKey){e.preventDefault(),J.appSearchInput.value?.focus(),J.appSearchInput.value?.select();return}if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key))return;if(J.appSearchInput.value?.matches(":focus")){if(!e.altKey)return;e.preventDefault()}let n=e.key==="ArrowUp"?"up":e.key==="ArrowDown"?"down":e.key==="ArrowLeft"?"left":"right";if(n==="left"||n==="right"){kv(n==="left");return}Sv(t,n)})}});function cp(){return Ct(()=>sp()),()=>g("div",{className:"flex-grow p-2 sticky top-0"},g("div",{className:"flex gap-4 pb-2 border-b-2 border-neutral-800 mb-2 items-center"},g("input",{autofocus:!0,ref:Tv,className:"bg-[#171616] px-1 py-2 w-full focus:outline focus:outline-primary",placeholder:"Search for component",type:"text","bind:value":Mv})),g("div",{className:"flex flex-col"},g(ve,{from:Kt},e=>g(Cv,{root:e}))))}function Cv({root:e}){return e.nodes.map(t=>g(lc,{node:t,traverseSiblings:!0}))}function lc({node:e,traverseSiblings:t=!0}){let n=e.collapsed.value,i=lp.value===e.kiruNode,s=o=>{o.preventDefault(),o.stopPropagation(),e.collapsed.value=!e.collapsed.value};return g(kt,null,g("div",{"data-graph-node-id":e.id,className:"pl-4 mb-1 w-full"},g("button",{className:ft("flex gap-2 items-center px-2 py-0.5 w-full",i?"bg-crimson text-white":""),onclick:()=>lp.value=e.kiruNode},e.child&&g(tn,{className:ft("transition-transform duration-200 w-4 h-4",n?"":"rotate-90"),onclick:s}),g("div",{className:e.child?"":"ml-6"},g("span",{className:i?"":"text-neutral-400"},"<"),g("span",{className:ft("font-medium",i?"":"text-crimson")},e.name),g("span",{className:i?"":"text-neutral-400"},">"))),!n&&e.child&&g(lc,{node:e.child})),t&&g(Pv,{node:e}))}function Pv({node:e}){if(!e)return null;let t=[],n=e.sibling;for(;n;)t.push(n),n=n.sibling;return g(kt,null,t.map(i=>g(lc,{node:i,traverseSiblings:!1})))}var lp,Mv,Tv,up=M(()=>{"use strict";z();Oe();ap();js();q();({selectedNode:lp,appSearchTerm:Mv,appSearchInput:Tv}=J)});function hp(e,t){let n=$s.peek();if(!e){n&&pp(n.props),$s.value=null;return}let i=n?.node===e,s=Pt();i&&n?ke(n.props.root,"props",s):n&&pp(n.props);let o={...e.props};delete o.children;let r=i?n?.props.collapsed??D(!0):D(!0),a=cn(o,"props",s,t);he(s),$s.value={node:e,name:Hn(e),props:{root:a,collapsed:r}}}function pp(e){L.dispose(e.collapsed),L.dispose(e.root.page);let t=Pt();ke(e.root,"props",t),he(t)}var dp,Dv,fp,$s,gp=M(()=>{"use strict";z();q();Oe();Bn();sc();({selectedNode:dp,selectedApp:Dv,viewerSettings:fp}=J),$s=D(null);Bt(()=>{let e=dp.value,t=Dv.value,n=fp.value;if(hp(e,n),!e||!t)return;let i=s=>{if(s===t){if(So(e)){dp.value=null;return}hp(e,fp.peek())}};return ht().on("update",i),()=>ht().off("update",i)})});function mp(){let e=$s.value;if(!e)return null;let{name:t,props:n}=e,i=n.collapsed.value;return g("div",{className:"flex-grow p-2 sticky top-0"},g("h2",{className:"flex justify-between items-center font-bold mb-2 pb-2 border-b-2 border-neutral-800"},g("div",{className:"flex gap-2 items-center"},"<"+t+">")),g("div",{className:"flex flex-col"},g("button",{onclick:()=>n.collapsed.value=!n.collapsed.value,className:n.root.children.length===0?"opacity-50 cursor-default":"cursor-pointer"},g("span",{className:"flex items-center gap-2 font-medium"},g(tn,{className:\`transition \${i?"":"rotate-90"}\`}),"props")),i?null:g("div",{className:"p-2",...n},g(Dn,{root:n.root}))))}var bp=M(()=>{"use strict";z();ic();Ro();gp()});function cc(){let e=yp.value;return g(kt,null,g("div",{className:"flex items-center justify-between gap-4 p-2 bg-neutral-400 bg-opacity-5 border border-white border-opacity-10 rounded"},g("div",{className:"flex items-center gap-4"},g("select",{className:"px-2 py-1 bg-neutral-800 text-neutral-100 rounded border border-white border-opacity-10",value:e?.name??"",onchange:t=>yp.value=xp.peek().find(n=>n.name===t.currentTarget.value)??null},g("option",{value:"",disabled:!0},"Select App"),g(Ze,{each:xp},t=>g("option",{key:t.id,value:t.name},t.name))),g("button",{title:"Toggle Component Inspection",onclick:Av,className:\`p-1 rounded \${Rv.value?"bg-neutral-900":""}\`},g(ls,null)))),g(nc,{minContainerWidth:100,className:"min-w-[480px]"},g(cp,null),g(mp,null)))}var xp,yp,Pr,Av,Rv,vp=M(()=>{"use strict";z();Oe();js();up();bp();({apps:xp,selectedApp:yp,componentSelection:Pr}=J),Av=()=>{Pr.value={enabled:!Pr.value.enabled,componentNode:Pr.value.componentNode}},Rv=Ot(()=>Pr.value.enabled)});function Mp(e){if(_p)return;_p=!0;let t=e.profilingContext,n=s=>{if(ue(s)||We.value.find(a=>a.app.name===s.name))return;let r=Sp(e,t,s);We.value=[...We.value,r]},i=s=>{ue(s)||(console.log("onAppUnmounted",s),We.value.find(o=>o.app.name===s.name)?.dispose())};t.appStats.forEach((s,o)=>{if(ue(o))return;let r=Sp(e,t,o);We.value=[...We.value,r]}),e.on("mount",n),e.on("unmount",i)}function kp(e,t){return{mountDuration:e.mountDuration(t).toFixed(2),totalTicks:e.totalTicks(t).toLocaleString(),avgTickDuration:e.averageTickDuration(t).toFixed(2),lastTickDuration:e.lastTickDuration(t).toFixed(2)}}function Sp(e,t,n){let i=[],s=()=>{i.forEach(u=>u()),We.value=We.value.filter(u=>u.app.name!==n.name)},o=Ov(),r=D({labels:[(performance.now()/1e3).toFixed(2)],datasets:Ep(o)});i.push(()=>L.dispose(r)),Object.entries(o).forEach(([u,{values:d}])=>{let f=b=>{b.name===n.name&&d[d.length-1]++},p=u;t.addEventListener(p,f),i.push(()=>t.removeEventListener(p,f))});let a=setInterval(()=>{Object.values(o).forEach(d=>{d.values.push(0),d.values.length>wp&&d.values.shift()});let u=[...r.value.labels,(performance.now()/1e3).toFixed(2)];u.length>wp&&u.shift(),r.value={labels:u,datasets:Ep(o)}},100);i.push(()=>clearInterval(a));let l=D(kp(t,n)),c=u=>{u.name===n.name&&(l.value=kp(t,u))};return e.on("update",c),i.push(()=>e.off("update",c)),{app:n,stats:l,chartData:r,dispose:s}}function Ep(e){return Object.entries(e).map(([t,{values:n,color:i}])=>({label:t,data:[...n],fill:!1,borderColor:i,tension:.1}))}function Ov(){return{update:{values:[0],color:"#ad981f"},updateDirtied:{values:[0],color:"#b21f3a"},createNode:{values:[0],color:"#198019"},removeNode:{values:[0],color:"#5F3691"},updateNode:{values:[0],color:"#2f2f9d"},signalAttrUpdate:{values:[0],color:"#28888f"},signalTextUpdate:{values:[0],color:"#9b3b98"}}}var wp,We,_p,Tp=M(()=>{"use strict";z();Bn();wp=100,We=D([]),_p=!1});function Cp(e){return g("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...e},g("circle",{cx:"12",cy:"12",r:"10"}),g("path",{d:"M12 16v-4"}),g("path",{d:"M12 8h.01"}))}var Pp=M(()=>{"use strict";z()});function Us({pauseWhen:e}){let t=ht();return Ct(()=>Mp(t)),g("div",{className:"flex flex-col gap-2"},g(Ze,{each:We},n=>g(Iv,{item:n,pauseWhen:e})))}function Iv({item:e,pauseWhen:t}){let n=D(!1),i=D(e.chartData.peek()),s=ec({data:i}),o=e.chartData.subscribe(c=>{n.peek()||t?.peek()||(i.value=c)});Wt(()=>o()),Ct(()=>s.init());let r=D(!1),a=()=>{n.value=!0},l=()=>{t?.peek()||(n.value=!1,i.value=e.chartData.peek(),s.resetZoom())};return()=>g("div",{className:"flex overflow-hidden"},g("canvas",{ref:s.canvasRef,className:"w-full max-w-full h-80 overflow-hidden",onmouseover:a,onmouseout:l,onmousedown:c=>{s.getZoomLevel()<=1||(c.preventDefault(),c.stopPropagation(),c.stopImmediatePropagation())}}),g("div",{onmousedown:c=>c.stopPropagation(),className:"absolute top-1 right-1 flex flex-col gap-1 items-end text-neutral-300"},g("button",{className:"p-1",onclick:()=>r.value=!r.value},g(Cp,{className:"w-4 h-4"})),g(ve,{from:{stats:e.stats,showStatsTooltip:r}},({stats:c,showStatsTooltip:u})=>u&&g("div",{className:"bg-neutral-800 bg-opacity-60 hover:bg-opacity-80 rounded-md p-2 flex flex-col gap-2 cursor-auto"},g("div",{className:"text-xs font-medium"},e.app.name),g("div",{className:"text-xs grid grid-cols-2 gap-x-4 text-neutral-400",style:"grid-template-columns: auto auto;"},g("span",null,"Mount duration:"),g("span",null,c.mountDuration," ms"),g("span",null,"Total updates:"),g("span",null,c.totalTicks),g("span",null,"Avg. update duration:"),g("span",null,c.avgTickDuration," ms"),g("span",null,"Latest update:"),g("span",null,c.lastTickDuration," ms"))))))}var Dp=M(()=>{"use strict";z();Sr();Oe();Tp();Pp()});var uc=M(()=>{"use strict";vp();Dp()});var Dr,Ap=M(()=>{"use strict";z();js();uc();Dr={Apps:{Icon:Na,View:cc},FileRouter:{Icon:za,View:()=>g("div",null,"FileRouter")},Profiling:{Icon:as,View:Us},Settings:{Icon:Va,View:()=>g("div",null,"Settings")}}});function Lv(){return g("button",{ref:J.rootRef,className:"flex gap-2 cursor-default"},g("nav",{className:"flex flex-col gap-2 justify-between"},g("div",{className:"flex flex-col gap-2"},Object.keys(Dr).map(e=>g(Vv,{key:e,id:e})))),g("main",{className:"flex flex-col flex-1 max-h-[calc(100vh-1rem)] overflow-y-auto p-2 bg-neutral-400/5 rounded"},g(ve,{from:Nv},e=>g(e.View,null))))}function Vv({id:e}){let{Icon:t}=Dr[e];return g("button",{key:e,onclick:()=>J.devtoolsTab.value=e,className:"flex items-center px-2 py-1 gap-2 rounded border text-xs border-white border-opacity-10"+(J.devtoolsTab.value===e?" bg-white bg-opacity-5 text-neutral-100":" hover:bg-white hover:bg-opacity-10 text-neutral-400"),title:e},g(t,{className:"text-primary"}),g("span",{className:"hidden sm:inline"},e))}var Nv,Rp=M(()=>{"use strict";z();Oe();Ap();Nv=Ot(()=>Dr[J.devtoolsTab.value])});var Op={};Wr(Op,{AppsIcon:()=>Na,AppsTabView:()=>cc,ChevronRightIcon:()=>tn,CloseIcon:()=>La,CogIcon:()=>Va,ComponentIcon:()=>nb,DevtoolsApp:()=>Lv,ExpandIcon:()=>ib,ExternalLinkIcon:()=>rs,FlameIcon:()=>Fa,FolderTreeIcon:()=>za,GaugeIcon:()=>as,GripIcon:()=>sb,MouseIcon:()=>ls,OpenIcon:()=>ob,ProfilingTabView:()=>Us,RadioIcon:()=>Ha,ResizableSplit:()=>nc,ResizeGripIcon:()=>Wn,ValueViewer:()=>Dn,ZapIcon:()=>rb,assert:()=>Je,buildViewerRoot:()=>cn,clamp:()=>Qe,collectFromRoot:()=>ke,computeComponentHash:()=>mi,createDraggableController:()=>en,createElementBoundingTracker:()=>Ba,createLineChart:()=>ec,createMousePositionTracker:()=>cs,createResizableController:()=>jn,devtoolsAppRootHasFocus:()=>tb,devtoolsState:()=>J,disposeCache:()=>he,emptyCache:()=>Pt,findComponentByHash:()=>Ia,getFileLink:()=>os,getNodeName:()=>Hn,ifDevtoolsAppRootHasFocus:()=>Oa,isDevtoolsApp:()=>ue,kiruGlobal:()=>ht,trapFocus:()=>Qm,typedMapEntries:()=>Jm});var ii=M(()=>{"use strict";Rp();js();Sr();Oe();uc();Bn()});var QM,Gs,Ys,Se,Mt,Ip,un,pe,Ii=M(()=>{"use strict";z();QM=D(!1),Gs=D(!1),Ys=D(!1),Se=D(!1),Mt=D([]),Ip=Ot(()=>Mt.value.length>0),un=50,pe=D(null)});var Ks=M(()=>{"use strict"});var zv,Fv,Vp,Hv,Bv,Wv,zp=M(()=>{"use strict";z();q();ii();Ks();Ii();zv="kiru.devtools.debuggerPosition",Fv="kiru.devtools.debuggerSize",Vp=()=>{let e=en({key:zv,storage:sessionStorage,allowFloat:!0,snapDistance:50,defaultPosition:{type:"floating",x:.5,y:.5},getDraggableBounds:()=>[window.innerWidth,window.innerHeight],getPadding:()=>[10,10]}),t=jn({key:Fv,storage:sessionStorage,minSize:[320,180]});Ct(()=>(e.init(),t.init(),()=>{e.dispose(),t.dispose()}));let n=s=>{e.containerRef.value=s,e.handleRef.value=s,t.containerRef.value=s},i=s=>{t.handleRef.value=s};return({state:s})=>g("div",{ref:n,className:ft("fixed rounded-lg p-0.5 flex flex-col gap-2 select-none overflow-hidden","bg-neutral-900 opacity-75 hover:opacity-100 shadow-lg"),style:{zIndex:pe.value==="debugger"?un+1:un,minWidth:\`\${320}px\`,minHeight:\`\${180}px\`,cursor:t.isResizing.value?"se-resize":e.isDragging.value?"grabbing":"grab"},onclick:()=>pe.value="debugger"},g("div",{style:{transition:"80ms ease-in-out",opacity:s==="entered"?1:0,flex:1,overflow:"auto",scrollbarWidth:"thin",minHeight:0}},g(Hv,null)),g("div",{ref:i,style:{position:"absolute",bottom:"4px",right:"4px",width:"16px",height:"16px",cursor:"se-resize",display:"flex",alignItems:"center",justifyContent:"center"}},g(Wn,{className:"text-neutral-500"})))},Hv=()=>{let e=D([]);return Ct(()=>{let t=ht().devtools.subscribe(n=>{e.value=Array.from(n).map(i=>({...i,link:os(i.signal)}))});return()=>t()}),g("div",{className:"flex flex-col gap-2 p-2"},g(Ze,{each:e,fallback:g("div",{className:"flex flex-col items-center justify-center gap-2 py-8 px-4 text-center text-neutral-400 text-sm"},g("p",{className:"font-medium"},"No signals tracked"),g("p",{className:"text-xs text-neutral-500 max-w-[240px]"},"Use"," ",g("code",{className:"px-1 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[11px]"},"DevTools.track(signal, label)")," ","in your app to inspect signal values here."))},t=>g(Bv,{key:\`\${t.signal.$id}:\${t.label}\${t.link}\`,entry:t})))},Bv=({entry:e})=>{let t=J.viewerSettings.peek(),n=s=>s!==null&&typeof s=="object"&&!Array.isArray(s)?s:{value:s},i=D(cn(n(e.signal.peek()),e.label,Pt(),t));return Ct(()=>{let s=e.signal.subscribe(o=>{let r=Pt();ke(i.peek(),e.label,r),i.value=cn(n(o),e.label,r,t),he(r)});return()=>{s();let o=Pt();ke(i.peek(),e.label,o),he(o)}}),()=>g("div",{className:"rounded border border-neutral-700 text-xs"},g("div",{className:"flex items-center justify-between px-2 py-1 border-b border-neutral-700 font-medium text-neutral-300"},e.label,g(Wv,{link:e.link})),g(ve,{from:i},s=>g(Dn,{root:s})))},Wv=({link:e})=>e?g("a",{className:"flex items-center gap-1 text-[10px] opacity-50 hover:opacity-100 transition-opacity",href:e,onclick:t=>{t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation(),window.open(e)},title:"Open in editor"},"Open in editor",g(rs,{width:"0.65rem",height:"0.65rem"})):null});var jv,$v,Bp,Wp=M(()=>{"use strict";z();q();ii();Ks();Ii();jv="kiru.devtools.profilerPosition",$v="kiru.devtools.profilerSize",Bp=()=>{let e=en({key:jv,storage:sessionStorage,allowFloat:!0,snapDistance:50,defaultPosition:{type:"floating",x:.5,y:.5},getDraggableBounds:()=>[window.innerWidth,window.innerHeight],getPadding:()=>[10,10]}),t=jn({key:$v,storage:sessionStorage,minSize:[360,180],aspectRatio:2/1});Ct(()=>(e.init(),t.init(),()=>{e.dispose(),t.dispose()}));let n=s=>{e.containerRef.value=s,e.handleRef.value=s,t.containerRef.value=s},i=s=>{t.handleRef.value=s};return({state:s})=>g("div",{ref:n,className:ft("fixed rounded-lg p-0.5 flex flex-col gap-2 overflow-hidden","bg-neutral-900 opacity-75 hover:opacity-100 shadow-lg"),style:{zIndex:pe.value==="profiler"?un+1:un,minWidth:\`\${360}px\`,minHeight:\`\${180}px\`,cursor:t.isResizing.value?"se-resize":e.isDragging.value?"grabbing":"grab"},onclick:()=>pe.value="profiler"},g("div",{style:{transition:"80ms ease-in-out",opacity:s==="entered"?1:0,flex:1,overflow:"hidden",minHeight:0}},g(Us,{pauseWhen:e.isDragging})),g("div",{ref:i,style:{position:"absolute",bottom:"4px",right:"4px",width:"16px",height:"16px",cursor:"se-resize",display:"flex",alignItems:"center",justifyContent:"center"}},g(Wn,{className:"text-neutral-500"})))}});function Ar({style:e,top:t,left:n,width:i,height:s,...o}){return g("div",{style:{...e,position:"absolute",zIndex:50,top:t+"px",left:n+"px",width:i+"px",height:s+"px",background:"linear-gradient(135deg, rgb(164 11 32 / 66%) 0%, rgb(82 14 47 / 80%) 80%)"},...o})}var dc=M(()=>{"use strict";z()});function Uv(e){let t=null,n=e;for(;n;){if(typeof n.type=="function"){let i=n,s=os(i.type);if(s){t={component:i,link:s};break}}n=n.parent}return t?{...t,elements:$p(t.component.child)}:null}function $p(e,t=new Set){let n=e;for(;n;)n.dom&&n.dom instanceof Element?t.add(n.dom):n.child&&$p(n.child,t),n=n.sibling;return t}var jp,Up=M(()=>{"use strict";z();ii();Ii();dc();q();jp=()=>{let[e,t]=cs();Wt(()=>t());let n=D(null),i=null,s=()=>{let u=Se.value,{x:d,y:f}=e.value;if(!u){n.value=null;return}let p=document.elementsFromPoint(d,f),b=null;for(let T of p){let A=T.__kiruNode;if(A&&(b=Uv(A),b))break}if(!b){n.value=null;return}let x=1/0,y=1/0,w=-1/0,_=-1/0;for(let T of b.elements){let{top:A,left:R,width:P,height:N}=T.getBoundingClientRect();x=Math.min(x,R),y=Math.min(y,A),w=Math.max(w,R+P),_=Math.max(_,A+N)}let S=w-x,E=_-y;n.value={name:Hn(b.component),top:y,left:x,width:S,height:E,link:b.link,component:b.component}},o=()=>{i==null&&(i=requestAnimationFrame(()=>{i=null,s()}))};Bt([Se,e],o);let r=u=>{if(u.preventDefault(),u.stopPropagation(),u.stopImmediatePropagation(),!Se.value||!n.value)return;let{name:d,link:f,component:p}=n.value;if(!f)return;let b=mi(p);Se.value=!1;let x=Mt.value,y=x.findIndex(w=>w.hash===b&&w.link===f);if(y!==-1){let w=x[y],_={...w,pulseGeneration:(w.pulseGeneration??0)+1},S=x.filter(E=>E.id!==w.id);Mt.value=[...S,_],pe.value="componentInfo";return}Mt.value=[...x,{id:crypto.randomUUID(),name:d,link:f,component:p,unmounted:!1,hash:b,pulseGeneration:0}],pe.value="componentInfo"},a=u=>{ue(u)||o()};ht().on("update",a),window.addEventListener("resize",o),window.addEventListener("scroll",o);let l=new MutationObserver(o);l.observe(document.body,{childList:!0,subtree:!0});let c=new ResizeObserver(o);return c.observe(document.body),Wt(()=>{ht().off("update",a),window.removeEventListener("resize",o),window.removeEventListener("scroll",o),l.disconnect(),c.disconnect()}),({state:u})=>{let d=Se.value,f=n.value;return!d||!f||u==="exited"?null:g(Ar,{top:f.top+window.scrollY,left:f.left+window.scrollX,width:f.width,height:f.height,className:ft("text-white flex items-center justify-center",u==="entered"?"opacity-100":"opacity-90",u==="entered"?"scale-100":"scale-90"),onclick:r},g("span",{className:"font-medium text-sm truncate max-w-full"},\`<\${f.name}>\`))}}});function Kp(e){let t={...e.props};return delete t.children,t}function fc(e){let t=Pt();ke(e,"props",t),he(t)}function Xp(e,t=new Set){let n=e;for(;n;)n.dom&&n.dom instanceof Element?t.add(n.dom):n.child&&Xp(n.child,t),n=n.sibling;return t}function Xv(e){if(!e.child)return null;let t=Xp(e.child);if(t.size===0)return null;let n=1/0,i=1/0,s=-1/0,o=-1/0;for(let l of t){let{top:c,left:u,width:d,height:f}=l.getBoundingClientRect();n=Math.min(n,u),i=Math.min(i,c),s=Math.max(s,u+d),o=Math.max(o,c+f)}let r=s-n,a=o-i;return{top:i,left:n,width:r,height:a}}var Gv,Yv,Kv,qv,qp,Zp=M(()=>{"use strict";z();q();ii();Ks();Ii();dc();Gv="kiru.devtools.componentInfoPosition",Yv="kiru.devtools.componentInfoSize",Kv=300;qv=()=>{let e=D(null),t=D(null),n=D(null),i=D(!1),s=D(!1),o=-1;Bt(()=>{let u=n.value;if(!u){let _=e.peek();_&&(fc(_),e.value=null);return}let d=Mt.value,f=d.find(_=>_.id===u);if(!f){let _=e.peek();_&&(fc(_),e.value=null);return}if(f.pulseGeneration!==o&&(o=f.pulseGeneration,f.pulseGeneration>0&&(s.value=!0,setTimeout(()=>{o===f.pulseGeneration&&(s.value=!1)},Kv))),!f.unmounted){let _=mi(f.component);t.value=_,f.hash!==_&&(Mt.value=d.map(S=>S.id===u?{...S,hash:_}:S))}if(f.unmounted)return;let p=e.peek(),b=Pt();p&&ke(p,"props",b);let x=J.viewerSettings.peek(),y=Kp(f.component),w=cn(y,"props",b,x);e.value=w,he(b)}),Wt(()=>{let u=e.peek();u&&(fc(u),e.value=null)});let r=en({key:Gv,storage:sessionStorage,allowFloat:!0,snapDistance:50,defaultPosition:{type:"floating",x:.5,y:.5},getDraggableBounds:()=>[window.innerWidth,window.innerHeight],getPadding:()=>[10,10]}),a=jn({key:Yv,storage:sessionStorage,minSize:[320,200]});Ct(()=>{r.init(),a.init();let u=d=>{let f=n.value;if(!f)return;let p=Mt.value,b=p.find(S=>S.id===f);if(!b||ue(d))return;let x=Rt(b.component);if(x&&x!==d)return;if(b.unmounted){let S=t.value;if(!S)return;let E=Ia(d.rootNode,S);if(!E)return;Mt.value=p.map(T=>T.id===f?{...T,component:E,unmounted:!1}:T);return}if(So(b.component)){Mt.value=p.map(S=>S.id===f?{...S,unmounted:!0}:S);return}let y=e.peek();if(!y)return;let w=J.viewerSettings.peek(),_=Pt();ke(y,"props",_),e.value=cn(Kp(b.component),"props",_,w),he(_)};return ht().on("update",u),()=>{r.dispose(),a.dispose(),ht().off("update",u)}});let l=u=>{r.containerRef.value=u,r.handleRef.value=u,a.containerRef.value=u},c=u=>{a.handleRef.value=u};return({panel:u,state:d})=>{n.value||(n.value=u.id);let p=Mt.value.find(_=>_.id===u.id);if(!p)return null;let b=()=>{let _=Mt.value,S=_.find(E=>E.id===u.id);S&&(Mt.value=[..._.filter(E=>E.id!==u.id),S],pe.value="componentInfo")},x=i.value,y=s.value,w=x&&!p.unmounted?Xv(p.component):null;return g(kt,null,w&&g(Ar,{top:w.top+window.scrollY,left:w.left+window.scrollX,width:w.width,height:w.height,className:ft("pointer-events-none",d==="entered"?"opacity-100":"opacity-90")}),g("div",{ref:l,className:"fixed p-0.5 flex flex-col gap-2 select-none z-index-1001",style:{zIndex:pe.value==="componentInfo"?un+1:un,minWidth:\`\${320}px\`,minHeight:\`\${200}px\`,opacity:d==="entered"?1:0,cursor:a.isResizing.value?"se-resize":r.isDragging.value?"grabbing":"grab"},onclick:b,onmousedown:b,onmouseenter:()=>i.value=!0,onmouseleave:()=>i.value=!1},g("div",{style:{transition:"80ms ease-in-out",opacity:y?1:.75,flex:1,scrollbarWidth:"thin",minHeight:0,overflow:"hidden",boxShadow:y?"0 0 8px crimson":void 0},className:"rounded-lg bg-neutral-900 opacity-75 hover:opacity-100! shadow-lg"},g("div",{className:"flex flex-col text-sm overflow-auto"},g("div",{className:"flex items-center justify-between gap-2 p-2"},g("a",{href:p.link,className:ft("flex items-center justify-center gap-2","text-neutral-400 hover:text-neutral-200"),onclick:_=>{_.preventDefault(),_.stopPropagation(),window.open(p.link)},onmousedown:_=>_.stopPropagation(),title:"Open in editor"},\`<\${p.name}>\`,g(rs,{className:"w-4 h-4 shrink-0 pointer-events-none"})),g("div",{className:"flex items-center gap-2"},p.unmounted&&g("span",{className:"rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-medium text-amber-400"},"Unmounted"),g("button",{type:"button",className:"p-1 text-neutral-400 hover:text-neutral-200",onclick:()=>{Mt.value=Mt.value.filter(_=>_.id!==u.id)},title:"Close"},g(La,{className:"w-4 h-4 shrink-0 pointer-events-none"})))),g("div",{className:"pt-2 px-4"},g("div",{className:"mb-1.5 font-medium text-neutral-300 text-xs"},"Props"),g(ve,{from:e},_=>_?_.children.length===0?g("div",{className:"text-neutral-500 text-xs italic py-1"},"No props"):g(Dn,{root:_,className:"text-xs"}):null)))),g("div",{ref:c,style:{position:"absolute",bottom:"4px",right:"4px",width:"16px",height:"16px",cursor:"se-resize",display:"flex",alignItems:"center",justifyContent:"center"}},g(Wn,{className:"text-neutral-500"}))))}},qp=({state:e})=>g(Ze,{each:Mt},(t,n)=>g(qv,{key:t.id,panel:t,index:n,state:e}))});var Jp=M(()=>{"use strict";zp();Wp();Up();Zp()});var ig={};Wr(ig,{default:()=>ng});function ng(){let e=en({storage:localStorage,key:Zv,defaultPosition:{type:"snapped",side:"bottom",percent:.5},getPadding:()=>[10,10],getDraggableBounds:()=>[window.innerWidth,window.innerHeight],onclick:()=>hc.value=!hc.value}),t=Ot(()=>{let i=e.snapSide.value;return i==="left"||i==="right"?"column":"row"}),n=Ot(()=>{let i=e.snapSide.value;return i==="left"||i==="right"?"row":"column"});return Ct(()=>{e.init();let i=e.containerRef.value,s=tg.current;setTimeout(()=>{eg.value=!0},50),Bt([hc,e.snapSide,e.containerPos],(o,r,[a,l])=>{let[c,u]=[s.offsetWidth,s.offsetHeight],d=e.handleRef.value,f=d?.offsetWidth??0,p=d?.offsetHeight??0,b=0,x=0;if(r==="top"||r==="bottom"){let A=a+i.offsetWidth/2-c/2;b=Qe(A,10,window.innerWidth-10-c)-A}else{let A=l+i.offsetHeight/2-u/2;x=Qe(A,10,window.innerHeight-10-u)-A}let y=f/2+8+c/2,w=p/2+8+u/2,_=0,S=0;r==="left"?_=o?y:-y:r==="right"?_=o?-y:y:r==="top"?S=o?w:-w:S=o?-w:w;let E=-c/2+b+_,T=-u/2+x+S;s.style.transform=\`scale(\${o?1:0}) translate(\${E}px, \${T}px)\`})}),()=>g(kt,null,g("div",{ref:e.containerRef,style:{transition:"80ms",opacity:Jv,flexDirection:n},className:"z-999999 top-0 left-0 flex items-center justify-center"},g("button",{ref:e.handleRef,className:"rounded-full p-2 z-10 text-white",style:{background:"linear-gradient(135deg, rgb(143 1 1 / 90%) 0%, rgba(119, 14, 103, 0.89) 75%)"}},g(Fa,{className:"w-5 h-5"})),g("div",{ref:tg,style:{transition:"80ms ease-in-out",transformOrigin:"0 0",flexDirection:t},className:ft("absolute left-1/2 top-1/2 z-0 flex p-1 gap-1","bg-neutral-900 rounded-xl shadow-sm")},g(pc,{active:Gs,title:"Toggle Profiler",onclick:()=>Gs.value=!Gs.value},g(as,{className:"w-4 h-4 pointer-events-none"}),g("small",null,"Profiler")),g(pc,{active:Ys,title:"Toggle Debugger",onclick:()=>Ys.value=!Ys.value},g(Ha,{className:"w-4 h-4 pointer-events-none"}),g("small",null,"Tracking")),g(pc,{active:Se,title:"Select Component",onclick:()=>{Se.value=!Se.value}},g(ls,{className:"w-4 h-4 pointer-events-none"}),g("small",null,"Inspect")))),g(gi,{in:Gs,duration:{in:0,out:150},element:i=>i==="exited"?null:g(Bp,{state:i})}),g(gi,{in:Ys,duration:{in:0,out:150},element:i=>i==="exited"?null:g(Vp,{state:i})}),g(gi,{in:Se,duration:{in:0,out:150},element:i=>i==="exited"?null:g(jp,{state:i})}),g(gi,{in:Ip,duration:{in:0,out:150},element:i=>i==="exited"?null:g(qp,{state:i})}))}var Zv,eg,hc,tg,Jv,pc,sg=M(()=>{"use strict";z();q();ii();Ii();Ks();Jp();Zv="kiru.devtools.anchorPosition",eg=D(!1),hc=D(!1),tg=bn(null),Jv=Ot(()=>eg.value?1:0);pc=()=>{let{derive:e}=Aa(),t=e(({className:i,active:s})=>{let o=!!s?.value;return ft("flex items-center px-1.5 py-0.5 gap-2","text-sm rounded-lg border border-white/10",o?"text-neutral-100":"bg-white/2.5 hover:bg-white/5 text-neutral-400","transition-colors duration-150",Z(i,!0))}),n=e(({active:i})=>!!i?.value?"linear-gradient(135deg, rgb(143 1 1 / 75%) 0%, rgba(119, 14, 103, 0.89) 65%)":"transparent");return({className:i,active:s,...o})=>g("button",{className:t,style:{background:n},...o})}});var Ic=\`/*! tailwindcss v4.2.1 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-amber-400: oklch(82.8% 0.189 84.429);
    --color-amber-500: oklch(76.9% 0.188 70.08);
    --color-neutral-100: oklch(97% 0 0);
    --color-neutral-200: oklch(92.2% 0 0);
    --color-neutral-300: oklch(87% 0 0);
    --color-neutral-400: oklch(70.8% 0 0);
    --color-neutral-500: oklch(55.6% 0 0);
    --color-neutral-700: oklch(37.1% 0 0);
    --color-neutral-800: oklch(26.9% 0 0);
    --color-neutral-900: oklch(20.5% 0 0);
    --color-black: #000;
    --color-white: #fff;
    --spacing: 0.25rem;
    --text-xs: 0.75rem;
    --text-xs--line-height: calc(1 / 0.75);
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --font-weight-medium: 500;
    --font-weight-bold: 700;
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .pointer-events-none {
    pointer-events: none;
  }
  .visible {
    visibility: visible;
  }
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .relative {
    position: relative;
  }
  .sticky {
    position: sticky;
  }
  .inset-0 {
    inset: calc(var(--spacing) * 0);
  }
  .start {
    inset-inline-start: var(--spacing);
  }
  .end {
    inset-inline-end: var(--spacing);
  }
  .top-0 {
    top: calc(var(--spacing) * 0);
  }
  .top-1 {
    top: calc(var(--spacing) * 1);
  }
  .top-1\\\\/2 {
    top: calc(1 / 2 * 100%);
  }
  .right-1 {
    right: calc(var(--spacing) * 1);
  }
  .left-0 {
    left: calc(var(--spacing) * 0);
  }
  .left-1\\\\/2 {
    left: calc(1 / 2 * 100%);
  }
  .z-0 {
    z-index: 0;
  }
  .z-10 {
    z-index: 10;
  }
  .z-40 {
    z-index: 40;
  }
  .z-50 {
    z-index: 50;
  }
  .z-999999 {
    z-index: 999999;
  }
  .z-\\\\[9999\\\\] {
    z-index: 9999;
  }
  .container {
    width: 100%;
    @media (width >= 40rem) {
      max-width: 40rem;
    }
    @media (width >= 48rem) {
      max-width: 48rem;
    }
    @media (width >= 64rem) {
      max-width: 64rem;
    }
    @media (width >= 80rem) {
      max-width: 80rem;
    }
    @media (width >= 96rem) {
      max-width: 96rem;
    }
  }
  .mb-1 {
    margin-bottom: calc(var(--spacing) * 1);
  }
  .mb-1\\\\.5 {
    margin-bottom: calc(var(--spacing) * 1.5);
  }
  .mb-2 {
    margin-bottom: calc(var(--spacing) * 2);
  }
  .ml-6 {
    margin-left: calc(var(--spacing) * 6);
  }
  .contents {
    display: contents;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .hidden {
    display: none;
  }
  .h-4 {
    height: calc(var(--spacing) * 4);
  }
  .h-5 {
    height: calc(var(--spacing) * 5);
  }
  .h-80 {
    height: calc(var(--spacing) * 80);
  }
  .h-full {
    height: 100%;
  }
  .max-h-\\\\[calc\\\\(100vh-1rem\\\\)\\\\] {
    max-height: calc(100vh - 1rem);
  }
  .w-4 {
    width: calc(var(--spacing) * 4);
  }
  .w-5 {
    width: calc(var(--spacing) * 5);
  }
  .w-8 {
    width: calc(var(--spacing) * 8);
  }
  .w-\\\\[5px\\\\] {
    width: 5px;
  }
  .w-full {
    width: 100%;
  }
  .max-w-\\\\[240px\\\\] {
    max-width: 240px;
  }
  .max-w-full {
    max-width: 100%;
  }
  .min-w-\\\\[480px\\\\] {
    min-width: 480px;
  }
  .flex-1 {
    flex: 1;
  }
  .shrink-0 {
    flex-shrink: 0;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .-translate-x-1\\\\/2 {
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .scale-90 {
    --tw-scale-x: 90%;
    --tw-scale-y: 90%;
    --tw-scale-z: 90%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .scale-100 {
    --tw-scale-x: 100%;
    --tw-scale-y: 100%;
    --tw-scale-z: 100%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .rotate-90 {
    rotate: 90deg;
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .cursor-auto {
    cursor: auto;
  }
  .cursor-col-resize {
    cursor: col-resize;
  }
  .cursor-default {
    cursor: default;
  }
  .cursor-grab {
    cursor: grab;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .resize {
    resize: both;
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .flex-col {
    flex-direction: column;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .gap-1 {
    gap: calc(var(--spacing) * 1);
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4);
  }
  .gap-x-4 {
    column-gap: calc(var(--spacing) * 4);
  }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .overflow-auto {
    overflow: auto;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  .rounded {
    border-radius: 0.25rem;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .rounded-md {
    border-radius: var(--radius-md);
  }
  .rounded-sm {
    border-radius: var(--radius-sm);
  }
  .rounded-xl {
    border-radius: var(--radius-xl);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-b {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
  }
  .border-b-2 {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 2px;
  }
  .border-neutral-700 {
    border-color: var(--color-neutral-700);
  }
  .border-neutral-800 {
    border-color: var(--color-neutral-800);
  }
  .border-white {
    border-color: var(--color-white);
  }
  .border-white\\\\/10 {
    border-color: color-mix(in srgb, #fff 10%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--color-white) 10%, transparent);
    }
  }
  .bg-\\\\[\\\\#171616\\\\] {
    background-color: #171616;
  }
  .bg-amber-500\\\\/20 {
    background-color: color-mix(in srgb, oklch(76.9% 0.188 70.08) 20%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-amber-500) 20%, transparent);
    }
  }
  .bg-black\\\\/30 {
    background-color: color-mix(in srgb, #000 30%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 30%, transparent);
    }
  }
  .bg-neutral-400 {
    background-color: var(--color-neutral-400);
  }
  .bg-neutral-400\\\\/5 {
    background-color: color-mix(in srgb, oklch(70.8% 0 0) 5%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-neutral-400) 5%, transparent);
    }
  }
  .bg-neutral-800 {
    background-color: var(--color-neutral-800);
  }
  .bg-neutral-900 {
    background-color: var(--color-neutral-900);
  }
  .bg-neutral-900\\\\/30 {
    background-color: color-mix(in srgb, oklch(20.5% 0 0) 30%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-neutral-900) 30%, transparent);
    }
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .bg-white\\\\/2\\\\.5 {
    background-color: color-mix(in srgb, #fff 2.5%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 2.5%, transparent);
    }
  }
  .bg-white\\\\/5 {
    background-color: color-mix(in srgb, #fff 5%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 5%, transparent);
    }
  }
  .p-0\\\\.5 {
    padding: calc(var(--spacing) * 0.5);
  }
  .p-1 {
    padding: calc(var(--spacing) * 1);
  }
  .p-2 {
    padding: calc(var(--spacing) * 2);
  }
  .px-1 {
    padding-inline: calc(var(--spacing) * 1);
  }
  .px-1\\\\.5 {
    padding-inline: calc(var(--spacing) * 1.5);
  }
  .px-2 {
    padding-inline: calc(var(--spacing) * 2);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .py-0\\\\.5 {
    padding-block: calc(var(--spacing) * 0.5);
  }
  .py-1 {
    padding-block: calc(var(--spacing) * 1);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .py-8 {
    padding-block: calc(var(--spacing) * 8);
  }
  .py-px {
    padding-block: 1px;
  }
  .pt-2 {
    padding-top: calc(var(--spacing) * 2);
  }
  .pr-1 {
    padding-right: calc(var(--spacing) * 1);
  }
  .pb-2 {
    padding-bottom: calc(var(--spacing) * 2);
  }
  .pl-2 {
    padding-left: calc(var(--spacing) * 2);
  }
  .pl-4 {
    padding-left: calc(var(--spacing) * 4);
  }
  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  .font-mono {
    font-family: var(--font-mono);
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .text-xs {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  .text-\\\\[10px\\\\] {
    font-size: 10px;
  }
  .text-\\\\[11px\\\\] {
    font-size: 11px;
  }
  .leading-none {
    --tw-leading: 1;
    line-height: 1;
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .text-amber-400 {
    color: var(--color-amber-400);
  }
  .text-neutral-100 {
    color: var(--color-neutral-100);
  }
  .text-neutral-300 {
    color: var(--color-neutral-300);
  }
  .text-neutral-400 {
    color: var(--color-neutral-400);
  }
  .text-neutral-500 {
    color: var(--color-neutral-500);
  }
  .text-white {
    color: var(--color-white);
  }
  .italic {
    font-style: italic;
  }
  .opacity-50 {
    opacity: 50%;
  }
  .opacity-75 {
    opacity: 75%;
  }
  .opacity-90 {
    opacity: 90%;
  }
  .opacity-100 {
    opacity: 100%;
  }
  .shadow {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-lg {
    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-sm {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-opacity {
    transition-property: opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .duration-150 {
    --tw-duration: 150ms;
    transition-duration: 150ms;
  }
  .duration-200 {
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
  .ease-in-out {
    --tw-ease: var(--ease-in-out);
    transition-timing-function: var(--ease-in-out);
  }
  .select-none {
    -webkit-user-select: none;
    user-select: none;
  }
  .last\\\\:border-b-0 {
    &:last-child {
      border-bottom-style: var(--tw-border-style);
      border-bottom-width: 0px;
    }
  }
  .hover\\\\:bg-neutral-700 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-neutral-700);
      }
    }
  }
  .hover\\\\:bg-neutral-900 {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-neutral-900);
      }
    }
  }
  .hover\\\\:bg-white {
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-white);
      }
    }
  }
  .hover\\\\:bg-white\\\\/5 {
    &:hover {
      @media (hover: hover) {
        background-color: color-mix(in srgb, #fff 5%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-white) 5%, transparent);
        }
      }
    }
  }
  .hover\\\\:text-neutral-200 {
    &:hover {
      @media (hover: hover) {
        color: var(--color-neutral-200);
      }
    }
  }
  .hover\\\\:opacity-100 {
    &:hover {
      @media (hover: hover) {
        opacity: 100%;
      }
    }
  }
  .hover\\\\:opacity-100\\\\! {
    &:hover {
      @media (hover: hover) {
        opacity: 100% !important;
      }
    }
  }
  .focus\\\\:outline {
    &:focus {
      outline-style: var(--tw-outline-style);
      outline-width: 1px;
    }
  }
  .active\\\\:cursor-grabbing {
    &:active {
      cursor: grabbing;
    }
  }
  .sm\\\\:inline {
    @media (width >= 40rem) {
      display: inline;
    }
  }
}
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-scale-x {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-y {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-z {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-rotate-x {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-y {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-z {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-x {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-y {
  syntax: "*";
  inherits: false;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-ease {
  syntax: "*";
  inherits: false;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-border-style: solid;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-duration: initial;
      --tw-ease: initial;
      --tw-outline-style: solid;
    }
  }
}\`;if("window"in globalThis){async function e(){let t=await Promise.resolve().then(()=>(z(),j)),{default:n}=await Promise.resolve().then(()=>(sg(),ig)),{devtoolsState:i}=await Promise.resolve().then(()=>(ii(),Op)),s=document.createElement("kiru-devtools");s.setAttribute("style","display: contents"),s.tabIndex=-1,document.body.appendChild(s);let o=s.attachShadow({mode:"open",delegatesFocus:!0}),r=new CSSStyleSheet;r.replaceSync(Ic),o.adoptedStyleSheets=[r],t.mount(t.createElement(n),o,{name:"kiru.devtools"});let a=()=>i.popupWindow.value?.close();window.addEventListener("close",a),window.addEventListener("beforeunload",a)}window.addEventListener("kiru:ready",e,{once:!0})}
/*! Bundled license information:

@kurkle/color/dist/color.esm.js:
  (*!
   * @kurkle/color v0.3.4
   * https://github.com/kurkle/color#readme
   * (c) 2024 Jukka Kurkela
   * Released under the MIT License
   *)

chart.js/dist/chunks/helpers.dataset.js:
chart.js/dist/chart.js:
chart.js/dist/helpers.js:
  (*!
   * Chart.js v4.5.1
   * https://www.chartjs.org
   * (c) 2025 Chart.js Contributors
   * Released under the MIT License
   *)

hammerjs/hammer.js:
  (*! Hammer.JS - v2.0.7 - 2016-04-22
   * http://hammerjs.github.io/
   *
   * Copyright (c) 2016 Jorik Tangelder;
   * Licensed under the MIT license *)

chartjs-plugin-zoom/dist/chartjs-plugin-zoom.esm.js:
  (*!
  * chartjs-plugin-zoom v2.2.0
  * https://www.chartjs.org/chartjs-plugin-zoom/2.2.0/
   * (c) 2016-2024 chartjs-plugin-zoom Contributors
   * Released under the MIT License
   *)
*/

`;

// src/devtools.ts
function setupDevtools(server, _options, dtHostScriptPath, log2) {
  log2(`Serving devtools host at ${ANSI.magenta(dtHostScriptPath)}`);
  server.middlewares.use(dtHostScriptPath, (_, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.end(dist_default, "utf-8");
  });
}
function createDevtoolsHtmlTransform(dtClientPathname, dtHostScriptPath) {
  return {
    html: "",
    tags: [
      {
        tag: "script",
        children: `window.__KIRU_DEVTOOLS_PATHNAME__ = "${dtClientPathname}";`
      },
      {
        tag: "script",
        attrs: {
          type: "module",
          src: dtHostScriptPath
        }
      }
    ]
  };
}

// src/dev-server.ts
import path4 from "node:path";
function injectClientScript(html) {
  const scriptTag = `<script type="module" src="/@id/${VIRTUAL_ENTRY_CLIENT_ID}"></script>`;
  if (html.includes("</body>")) {
    return html.replace("</body>", scriptTag + "</body>");
  }
  return html + scriptTag;
}
async function handleSSR(server, url, projectRoot, baseUrl, resolveUserDocument2) {
  const mod = await server.ssrLoadModule(
    VIRTUAL_ENTRY_SERVER_ID
  );
  const moduleIds = [];
  const documentModule = resolveUserDocument2().substring(projectRoot.length);
  moduleIds.push(documentModule);
  const ctx = {
    registerModule: (moduleId) => {
      moduleIds.push(moduleId);
    },
    registerPreloadedPageProps: () => {
    }
  };
  const { status, body } = await mod.render(url, ctx);
  let html = injectClientScript(body);
  const importedModules = /* @__PURE__ */ new Set();
  const seen = /* @__PURE__ */ new Set();
  const scan = (mod2) => {
    if (importedModules.has(mod2)) return;
    importedModules.add(mod2);
    for (const dep of mod2.importedModules) {
      if (seen.has(dep)) continue;
      seen.add(dep);
      scan(dep);
    }
  };
  for (const id of moduleIds) {
    const p = path4.join(projectRoot, id).replace(/\\/g, "/");
    const mod2 = server.moduleGraph.getModuleById(p);
    if (!mod2) {
      console.error(`Module not found: ${p}`);
      continue;
    }
    scan(mod2);
  }
  const localModules = Array.from(importedModules).filter(
    (m) => m.id?.startsWith(projectRoot)
  );
  const cssModules = localModules.filter((m) => m.id?.endsWith(".css"));
  html = await server.transformIndexHtml(
    url,
    html,
    "\0" + VIRTUAL_ENTRY_CLIENT_ID
  );
  if (cssModules.length) {
    const stylesheets = cssModules.map((mod2) => {
      const p = mod2.id?.replace(projectRoot, "");
      return `<link rel="stylesheet" type="text/css" href="${path4.join(baseUrl, p).replace(/\\/g, "/")}?temp">`;
    });
    html = html.replace("<head>", "<head>" + stylesheets.join("\n"));
  }
  return { status, html };
}

// src/preview-server.ts
import { resolve as resolve2 } from "node:path";
import fs2 from "node:fs";
import path5 from "node:path";

// ../../node_modules/.pnpm/mime@4.1.0/node_modules/mime/dist/types/other.js
var types = {
  "application/prs.cww": ["cww"],
  "application/prs.xsf+xml": ["xsf"],
  "application/vnd.1000minds.decision-model+xml": ["1km"],
  "application/vnd.3gpp.pic-bw-large": ["plb"],
  "application/vnd.3gpp.pic-bw-small": ["psb"],
  "application/vnd.3gpp.pic-bw-var": ["pvb"],
  "application/vnd.3gpp2.tcap": ["tcap"],
  "application/vnd.3m.post-it-notes": ["pwn"],
  "application/vnd.accpac.simply.aso": ["aso"],
  "application/vnd.accpac.simply.imp": ["imp"],
  "application/vnd.acucobol": ["acu"],
  "application/vnd.acucorp": ["atc", "acutc"],
  "application/vnd.adobe.air-application-installer-package+zip": ["air"],
  "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
  "application/vnd.adobe.fxp": ["fxp", "fxpl"],
  "application/vnd.adobe.xdp+xml": ["xdp"],
  "application/vnd.adobe.xfdf": ["*xfdf"],
  "application/vnd.age": ["age"],
  "application/vnd.ahead.space": ["ahead"],
  "application/vnd.airzip.filesecure.azf": ["azf"],
  "application/vnd.airzip.filesecure.azs": ["azs"],
  "application/vnd.amazon.ebook": ["azw"],
  "application/vnd.americandynamics.acc": ["acc"],
  "application/vnd.amiga.ami": ["ami"],
  "application/vnd.android.package-archive": ["apk"],
  "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
  "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
  "application/vnd.antix.game-component": ["atx"],
  "application/vnd.apple.installer+xml": ["mpkg"],
  "application/vnd.apple.keynote": ["key"],
  "application/vnd.apple.mpegurl": ["m3u8"],
  "application/vnd.apple.numbers": ["numbers"],
  "application/vnd.apple.pages": ["pages"],
  "application/vnd.apple.pkpass": ["pkpass"],
  "application/vnd.aristanetworks.swi": ["swi"],
  "application/vnd.astraea-software.iota": ["iota"],
  "application/vnd.audiograph": ["aep"],
  "application/vnd.autodesk.fbx": ["fbx"],
  "application/vnd.balsamiq.bmml+xml": ["bmml"],
  "application/vnd.blueice.multipass": ["mpm"],
  "application/vnd.bmi": ["bmi"],
  "application/vnd.businessobjects": ["rep"],
  "application/vnd.chemdraw+xml": ["cdxml"],
  "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
  "application/vnd.cinderella": ["cdy"],
  "application/vnd.citationstyles.style+xml": ["csl"],
  "application/vnd.claymore": ["cla"],
  "application/vnd.cloanto.rp9": ["rp9"],
  "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
  "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
  "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
  "application/vnd.commonspace": ["csp"],
  "application/vnd.contact.cmsg": ["cdbcmsg"],
  "application/vnd.cosmocaller": ["cmc"],
  "application/vnd.crick.clicker": ["clkx"],
  "application/vnd.crick.clicker.keyboard": ["clkk"],
  "application/vnd.crick.clicker.palette": ["clkp"],
  "application/vnd.crick.clicker.template": ["clkt"],
  "application/vnd.crick.clicker.wordbank": ["clkw"],
  "application/vnd.criticaltools.wbs+xml": ["wbs"],
  "application/vnd.ctc-posml": ["pml"],
  "application/vnd.cups-ppd": ["ppd"],
  "application/vnd.curl.car": ["car"],
  "application/vnd.curl.pcurl": ["pcurl"],
  "application/vnd.dart": ["dart"],
  "application/vnd.data-vision.rdz": ["rdz"],
  "application/vnd.dbf": ["dbf"],
  "application/vnd.dcmp+xml": ["dcmp"],
  "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
  "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
  "application/vnd.dece.unspecified": ["uvx", "uvvx"],
  "application/vnd.dece.zip": ["uvz", "uvvz"],
  "application/vnd.denovo.fcselayout-link": ["fe_launch"],
  "application/vnd.dna": ["dna"],
  "application/vnd.dolby.mlp": ["mlp"],
  "application/vnd.dpgraph": ["dpg"],
  "application/vnd.dreamfactory": ["dfac"],
  "application/vnd.ds-keypoint": ["kpxx"],
  "application/vnd.dvb.ait": ["ait"],
  "application/vnd.dvb.service": ["svc"],
  "application/vnd.dynageo": ["geo"],
  "application/vnd.ecowin.chart": ["mag"],
  "application/vnd.enliven": ["nml"],
  "application/vnd.epson.esf": ["esf"],
  "application/vnd.epson.msf": ["msf"],
  "application/vnd.epson.quickanime": ["qam"],
  "application/vnd.epson.salt": ["slt"],
  "application/vnd.epson.ssf": ["ssf"],
  "application/vnd.eszigno3+xml": ["es3", "et3"],
  "application/vnd.ezpix-album": ["ez2"],
  "application/vnd.ezpix-package": ["ez3"],
  "application/vnd.fdf": ["*fdf"],
  "application/vnd.fdsn.mseed": ["mseed"],
  "application/vnd.fdsn.seed": ["seed", "dataless"],
  "application/vnd.flographit": ["gph"],
  "application/vnd.fluxtime.clip": ["ftc"],
  "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
  "application/vnd.frogans.fnc": ["fnc"],
  "application/vnd.frogans.ltf": ["ltf"],
  "application/vnd.fsc.weblaunch": ["fsc"],
  "application/vnd.fujitsu.oasys": ["oas"],
  "application/vnd.fujitsu.oasys2": ["oa2"],
  "application/vnd.fujitsu.oasys3": ["oa3"],
  "application/vnd.fujitsu.oasysgp": ["fg5"],
  "application/vnd.fujitsu.oasysprs": ["bh2"],
  "application/vnd.fujixerox.ddd": ["ddd"],
  "application/vnd.fujixerox.docuworks": ["xdw"],
  "application/vnd.fujixerox.docuworks.binder": ["xbd"],
  "application/vnd.fuzzysheet": ["fzs"],
  "application/vnd.genomatix.tuxedo": ["txd"],
  "application/vnd.geogebra.file": ["ggb"],
  "application/vnd.geogebra.slides": ["ggs"],
  "application/vnd.geogebra.tool": ["ggt"],
  "application/vnd.geometry-explorer": ["gex", "gre"],
  "application/vnd.geonext": ["gxt"],
  "application/vnd.geoplan": ["g2w"],
  "application/vnd.geospace": ["g3w"],
  "application/vnd.gmx": ["gmx"],
  "application/vnd.google-apps.document": ["gdoc"],
  "application/vnd.google-apps.drawing": ["gdraw"],
  "application/vnd.google-apps.form": ["gform"],
  "application/vnd.google-apps.jam": ["gjam"],
  "application/vnd.google-apps.map": ["gmap"],
  "application/vnd.google-apps.presentation": ["gslides"],
  "application/vnd.google-apps.script": ["gscript"],
  "application/vnd.google-apps.site": ["gsite"],
  "application/vnd.google-apps.spreadsheet": ["gsheet"],
  "application/vnd.google-earth.kml+xml": ["kml"],
  "application/vnd.google-earth.kmz": ["kmz"],
  "application/vnd.gov.sk.xmldatacontainer+xml": ["xdcf"],
  "application/vnd.grafeq": ["gqf", "gqs"],
  "application/vnd.groove-account": ["gac"],
  "application/vnd.groove-help": ["ghf"],
  "application/vnd.groove-identity-message": ["gim"],
  "application/vnd.groove-injector": ["grv"],
  "application/vnd.groove-tool-message": ["gtm"],
  "application/vnd.groove-tool-template": ["tpl"],
  "application/vnd.groove-vcard": ["vcg"],
  "application/vnd.hal+xml": ["hal"],
  "application/vnd.handheld-entertainment+xml": ["zmm"],
  "application/vnd.hbci": ["hbci"],
  "application/vnd.hhe.lesson-player": ["les"],
  "application/vnd.hp-hpgl": ["hpgl"],
  "application/vnd.hp-hpid": ["hpid"],
  "application/vnd.hp-hps": ["hps"],
  "application/vnd.hp-jlyt": ["jlt"],
  "application/vnd.hp-pcl": ["pcl"],
  "application/vnd.hp-pclxl": ["pclxl"],
  "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
  "application/vnd.ibm.minipay": ["mpy"],
  "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
  "application/vnd.ibm.rights-management": ["irm"],
  "application/vnd.ibm.secure-container": ["sc"],
  "application/vnd.iccprofile": ["icc", "icm"],
  "application/vnd.igloader": ["igl"],
  "application/vnd.immervision-ivp": ["ivp"],
  "application/vnd.immervision-ivu": ["ivu"],
  "application/vnd.insors.igm": ["igm"],
  "application/vnd.intercon.formnet": ["xpw", "xpx"],
  "application/vnd.intergeo": ["i2g"],
  "application/vnd.intu.qbo": ["qbo"],
  "application/vnd.intu.qfx": ["qfx"],
  "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
  "application/vnd.irepository.package+xml": ["irp"],
  "application/vnd.is-xpr": ["xpr"],
  "application/vnd.isac.fcs": ["fcs"],
  "application/vnd.jam": ["jam"],
  "application/vnd.jcp.javame.midlet-rms": ["rms"],
  "application/vnd.jisp": ["jisp"],
  "application/vnd.joost.joda-archive": ["joda"],
  "application/vnd.kahootz": ["ktz", "ktr"],
  "application/vnd.kde.karbon": ["karbon"],
  "application/vnd.kde.kchart": ["chrt"],
  "application/vnd.kde.kformula": ["kfo"],
  "application/vnd.kde.kivio": ["flw"],
  "application/vnd.kde.kontour": ["kon"],
  "application/vnd.kde.kpresenter": ["kpr", "kpt"],
  "application/vnd.kde.kspread": ["ksp"],
  "application/vnd.kde.kword": ["kwd", "kwt"],
  "application/vnd.kenameaapp": ["htke"],
  "application/vnd.kidspiration": ["kia"],
  "application/vnd.kinar": ["kne", "knp"],
  "application/vnd.koan": ["skp", "skd", "skt", "skm"],
  "application/vnd.kodak-descriptor": ["sse"],
  "application/vnd.las.las+xml": ["lasxml"],
  "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
  "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
  "application/vnd.lotus-1-2-3": ["123"],
  "application/vnd.lotus-approach": ["apr"],
  "application/vnd.lotus-freelance": ["pre"],
  "application/vnd.lotus-notes": ["nsf"],
  "application/vnd.lotus-organizer": ["org"],
  "application/vnd.lotus-screencam": ["scm"],
  "application/vnd.lotus-wordpro": ["lwp"],
  "application/vnd.macports.portpkg": ["portpkg"],
  "application/vnd.mapbox-vector-tile": ["mvt"],
  "application/vnd.mcd": ["mcd"],
  "application/vnd.medcalcdata": ["mc1"],
  "application/vnd.mediastation.cdkey": ["cdkey"],
  "application/vnd.mfer": ["mwf"],
  "application/vnd.mfmp": ["mfm"],
  "application/vnd.micrografx.flo": ["flo"],
  "application/vnd.micrografx.igx": ["igx"],
  "application/vnd.mif": ["mif"],
  "application/vnd.mobius.daf": ["daf"],
  "application/vnd.mobius.dis": ["dis"],
  "application/vnd.mobius.mbk": ["mbk"],
  "application/vnd.mobius.mqy": ["mqy"],
  "application/vnd.mobius.msl": ["msl"],
  "application/vnd.mobius.plc": ["plc"],
  "application/vnd.mobius.txf": ["txf"],
  "application/vnd.mophun.application": ["mpn"],
  "application/vnd.mophun.certificate": ["mpc"],
  "application/vnd.mozilla.xul+xml": ["xul"],
  "application/vnd.ms-artgalry": ["cil"],
  "application/vnd.ms-cab-compressed": ["cab"],
  "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
  "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
  "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
  "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
  "application/vnd.ms-fontobject": ["eot"],
  "application/vnd.ms-htmlhelp": ["chm"],
  "application/vnd.ms-ims": ["ims"],
  "application/vnd.ms-lrm": ["lrm"],
  "application/vnd.ms-officetheme": ["thmx"],
  "application/vnd.ms-outlook": ["msg"],
  "application/vnd.ms-pki.seccat": ["cat"],
  "application/vnd.ms-pki.stl": ["*stl"],
  "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
  "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
  "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
  "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
  "application/vnd.ms-project": ["*mpp", "mpt"],
  "application/vnd.ms-visio.viewer": ["vdx"],
  "application/vnd.ms-word.document.macroenabled.12": ["docm"],
  "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
  "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
  "application/vnd.ms-wpl": ["wpl"],
  "application/vnd.ms-xpsdocument": ["xps"],
  "application/vnd.mseq": ["mseq"],
  "application/vnd.musician": ["mus"],
  "application/vnd.muvee.style": ["msty"],
  "application/vnd.mynfc": ["taglet"],
  "application/vnd.nato.bindingdataobject+xml": ["bdo"],
  "application/vnd.neurolanguage.nlu": ["nlu"],
  "application/vnd.nitf": ["ntf", "nitf"],
  "application/vnd.noblenet-directory": ["nnd"],
  "application/vnd.noblenet-sealer": ["nns"],
  "application/vnd.noblenet-web": ["nnw"],
  "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
  "application/vnd.nokia.n-gage.data": ["ngdat"],
  "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
  "application/vnd.nokia.radio-preset": ["rpst"],
  "application/vnd.nokia.radio-presets": ["rpss"],
  "application/vnd.novadigm.edm": ["edm"],
  "application/vnd.novadigm.edx": ["edx"],
  "application/vnd.novadigm.ext": ["ext"],
  "application/vnd.oasis.opendocument.chart": ["odc"],
  "application/vnd.oasis.opendocument.chart-template": ["otc"],
  "application/vnd.oasis.opendocument.database": ["odb"],
  "application/vnd.oasis.opendocument.formula": ["odf"],
  "application/vnd.oasis.opendocument.formula-template": ["odft"],
  "application/vnd.oasis.opendocument.graphics": ["odg"],
  "application/vnd.oasis.opendocument.graphics-template": ["otg"],
  "application/vnd.oasis.opendocument.image": ["odi"],
  "application/vnd.oasis.opendocument.image-template": ["oti"],
  "application/vnd.oasis.opendocument.presentation": ["odp"],
  "application/vnd.oasis.opendocument.presentation-template": ["otp"],
  "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
  "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
  "application/vnd.oasis.opendocument.text": ["odt"],
  "application/vnd.oasis.opendocument.text-master": ["odm"],
  "application/vnd.oasis.opendocument.text-template": ["ott"],
  "application/vnd.oasis.opendocument.text-web": ["oth"],
  "application/vnd.olpc-sugar": ["xo"],
  "application/vnd.oma.dd2+xml": ["dd2"],
  "application/vnd.openblox.game+xml": ["obgx"],
  "application/vnd.openofficeorg.extension": ["oxt"],
  "application/vnd.openstreetmap.data+xml": ["osm"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    "pptx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.slide": [
    "sldx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
    "ppsx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.template": [
    "potx"
  ],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": [
    "xltx"
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    "docx"
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": [
    "dotx"
  ],
  "application/vnd.osgeo.mapguide.package": ["mgp"],
  "application/vnd.osgi.dp": ["dp"],
  "application/vnd.osgi.subsystem": ["esa"],
  "application/vnd.palm": ["pdb", "pqa", "oprc"],
  "application/vnd.pawaafile": ["paw"],
  "application/vnd.pg.format": ["str"],
  "application/vnd.pg.osasli": ["ei6"],
  "application/vnd.picsel": ["efif"],
  "application/vnd.pmi.widget": ["wg"],
  "application/vnd.pocketlearn": ["plf"],
  "application/vnd.powerbuilder6": ["pbd"],
  "application/vnd.previewsystems.box": ["box"],
  "application/vnd.procrate.brushset": ["brushset"],
  "application/vnd.procreate.brush": ["brush"],
  "application/vnd.procreate.dream": ["drm"],
  "application/vnd.proteus.magazine": ["mgz"],
  "application/vnd.publishare-delta-tree": ["qps"],
  "application/vnd.pvi.ptid1": ["ptid"],
  "application/vnd.pwg-xhtml-print+xml": ["xhtm"],
  "application/vnd.quark.quarkxpress": [
    "qxd",
    "qxt",
    "qwd",
    "qwt",
    "qxl",
    "qxb"
  ],
  "application/vnd.rar": ["rar"],
  "application/vnd.realvnc.bed": ["bed"],
  "application/vnd.recordare.musicxml": ["mxl"],
  "application/vnd.recordare.musicxml+xml": ["musicxml"],
  "application/vnd.rig.cryptonote": ["cryptonote"],
  "application/vnd.rim.cod": ["cod"],
  "application/vnd.rn-realmedia": ["rm"],
  "application/vnd.rn-realmedia-vbr": ["rmvb"],
  "application/vnd.route66.link66+xml": ["link66"],
  "application/vnd.sailingtracker.track": ["st"],
  "application/vnd.seemail": ["see"],
  "application/vnd.sema": ["sema"],
  "application/vnd.semd": ["semd"],
  "application/vnd.semf": ["semf"],
  "application/vnd.shana.informed.formdata": ["ifm"],
  "application/vnd.shana.informed.formtemplate": ["itp"],
  "application/vnd.shana.informed.interchange": ["iif"],
  "application/vnd.shana.informed.package": ["ipk"],
  "application/vnd.simtech-mindmapper": ["twd", "twds"],
  "application/vnd.smaf": ["mmf"],
  "application/vnd.smart.teacher": ["teacher"],
  "application/vnd.software602.filler.form+xml": ["fo"],
  "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
  "application/vnd.spotfire.dxp": ["dxp"],
  "application/vnd.spotfire.sfs": ["sfs"],
  "application/vnd.stardivision.calc": ["sdc"],
  "application/vnd.stardivision.draw": ["sda"],
  "application/vnd.stardivision.impress": ["sdd"],
  "application/vnd.stardivision.math": ["smf"],
  "application/vnd.stardivision.writer": ["sdw", "vor"],
  "application/vnd.stardivision.writer-global": ["sgl"],
  "application/vnd.stepmania.package": ["smzip"],
  "application/vnd.stepmania.stepchart": ["sm"],
  "application/vnd.sun.wadl+xml": ["wadl"],
  "application/vnd.sun.xml.calc": ["sxc"],
  "application/vnd.sun.xml.calc.template": ["stc"],
  "application/vnd.sun.xml.draw": ["sxd"],
  "application/vnd.sun.xml.draw.template": ["std"],
  "application/vnd.sun.xml.impress": ["sxi"],
  "application/vnd.sun.xml.impress.template": ["sti"],
  "application/vnd.sun.xml.math": ["sxm"],
  "application/vnd.sun.xml.writer": ["sxw"],
  "application/vnd.sun.xml.writer.global": ["sxg"],
  "application/vnd.sun.xml.writer.template": ["stw"],
  "application/vnd.sus-calendar": ["sus", "susp"],
  "application/vnd.svd": ["svd"],
  "application/vnd.symbian.install": ["sis", "sisx"],
  "application/vnd.syncml+xml": ["xsm"],
  "application/vnd.syncml.dm+wbxml": ["bdm"],
  "application/vnd.syncml.dm+xml": ["xdm"],
  "application/vnd.syncml.dmddf+xml": ["ddf"],
  "application/vnd.tao.intent-module-archive": ["tao"],
  "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
  "application/vnd.tmobile-livetv": ["tmo"],
  "application/vnd.trid.tpt": ["tpt"],
  "application/vnd.triscape.mxs": ["mxs"],
  "application/vnd.trueapp": ["tra"],
  "application/vnd.ufdl": ["ufd", "ufdl"],
  "application/vnd.uiq.theme": ["utz"],
  "application/vnd.umajin": ["umj"],
  "application/vnd.unity": ["unityweb"],
  "application/vnd.uoml+xml": ["uoml", "uo"],
  "application/vnd.vcx": ["vcx"],
  "application/vnd.visio": ["vsd", "vst", "vss", "vsw", "vsdx", "vtx"],
  "application/vnd.visionary": ["vis"],
  "application/vnd.vsf": ["vsf"],
  "application/vnd.wap.wbxml": ["wbxml"],
  "application/vnd.wap.wmlc": ["wmlc"],
  "application/vnd.wap.wmlscriptc": ["wmlsc"],
  "application/vnd.webturbo": ["wtb"],
  "application/vnd.wolfram.player": ["nbp"],
  "application/vnd.wordperfect": ["wpd"],
  "application/vnd.wqd": ["wqd"],
  "application/vnd.wt.stf": ["stf"],
  "application/vnd.xara": ["xar"],
  "application/vnd.xfdl": ["xfdl"],
  "application/vnd.yamaha.hv-dic": ["hvd"],
  "application/vnd.yamaha.hv-script": ["hvs"],
  "application/vnd.yamaha.hv-voice": ["hvp"],
  "application/vnd.yamaha.openscoreformat": ["osf"],
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
  "application/vnd.yamaha.smaf-audio": ["saf"],
  "application/vnd.yamaha.smaf-phrase": ["spf"],
  "application/vnd.yellowriver-custom-menu": ["cmp"],
  "application/vnd.zul": ["zir", "zirz"],
  "application/vnd.zzazz.deck+xml": ["zaz"],
  "application/x-7z-compressed": ["7z"],
  "application/x-abiword": ["abw"],
  "application/x-ace-compressed": ["ace"],
  "application/x-apple-diskimage": ["*dmg"],
  "application/x-arj": ["arj"],
  "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
  "application/x-authorware-map": ["aam"],
  "application/x-authorware-seg": ["aas"],
  "application/x-bcpio": ["bcpio"],
  "application/x-bdoc": ["*bdoc"],
  "application/x-bittorrent": ["torrent"],
  "application/x-blender": ["blend"],
  "application/x-blorb": ["blb", "blorb"],
  "application/x-bzip": ["bz"],
  "application/x-bzip2": ["bz2", "boz"],
  "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
  "application/x-cdlink": ["vcd"],
  "application/x-cfs-compressed": ["cfs"],
  "application/x-chat": ["chat"],
  "application/x-chess-pgn": ["pgn"],
  "application/x-chrome-extension": ["crx"],
  "application/x-cocoa": ["cco"],
  "application/x-compressed": ["*rar"],
  "application/x-conference": ["nsc"],
  "application/x-cpio": ["cpio"],
  "application/x-csh": ["csh"],
  "application/x-debian-package": ["*deb", "udeb"],
  "application/x-dgc-compressed": ["dgc"],
  "application/x-director": [
    "dir",
    "dcr",
    "dxr",
    "cst",
    "cct",
    "cxt",
    "w3d",
    "fgd",
    "swa"
  ],
  "application/x-doom": ["wad"],
  "application/x-dtbncx+xml": ["ncx"],
  "application/x-dtbook+xml": ["dtb"],
  "application/x-dtbresource+xml": ["res"],
  "application/x-dvi": ["dvi"],
  "application/x-envoy": ["evy"],
  "application/x-eva": ["eva"],
  "application/x-font-bdf": ["bdf"],
  "application/x-font-ghostscript": ["gsf"],
  "application/x-font-linux-psf": ["psf"],
  "application/x-font-pcf": ["pcf"],
  "application/x-font-snf": ["snf"],
  "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
  "application/x-freearc": ["arc"],
  "application/x-futuresplash": ["spl"],
  "application/x-gca-compressed": ["gca"],
  "application/x-glulx": ["ulx"],
  "application/x-gnumeric": ["gnumeric"],
  "application/x-gramps-xml": ["gramps"],
  "application/x-gtar": ["gtar"],
  "application/x-hdf": ["hdf"],
  "application/x-httpd-php": ["php"],
  "application/x-install-instructions": ["install"],
  "application/x-ipynb+json": ["ipynb"],
  "application/x-iso9660-image": ["*iso"],
  "application/x-iwork-keynote-sffkey": ["*key"],
  "application/x-iwork-numbers-sffnumbers": ["*numbers"],
  "application/x-iwork-pages-sffpages": ["*pages"],
  "application/x-java-archive-diff": ["jardiff"],
  "application/x-java-jnlp-file": ["jnlp"],
  "application/x-keepass2": ["kdbx"],
  "application/x-latex": ["latex"],
  "application/x-lua-bytecode": ["luac"],
  "application/x-lzh-compressed": ["lzh", "lha"],
  "application/x-makeself": ["run"],
  "application/x-mie": ["mie"],
  "application/x-mobipocket-ebook": ["*prc", "mobi"],
  "application/x-ms-application": ["application"],
  "application/x-ms-shortcut": ["lnk"],
  "application/x-ms-wmd": ["wmd"],
  "application/x-ms-wmz": ["wmz"],
  "application/x-ms-xbap": ["xbap"],
  "application/x-msaccess": ["mdb"],
  "application/x-msbinder": ["obd"],
  "application/x-mscardfile": ["crd"],
  "application/x-msclip": ["clp"],
  "application/x-msdos-program": ["*exe"],
  "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
  "application/x-msmediaview": ["mvb", "m13", "m14"],
  "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
  "application/x-msmoney": ["mny"],
  "application/x-mspublisher": ["pub"],
  "application/x-msschedule": ["scd"],
  "application/x-msterminal": ["trm"],
  "application/x-mswrite": ["wri"],
  "application/x-netcdf": ["nc", "cdf"],
  "application/x-ns-proxy-autoconfig": ["pac"],
  "application/x-nzb": ["nzb"],
  "application/x-perl": ["pl", "pm"],
  "application/x-pilot": ["*prc", "*pdb"],
  "application/x-pkcs12": ["p12", "pfx"],
  "application/x-pkcs7-certificates": ["p7b", "spc"],
  "application/x-pkcs7-certreqresp": ["p7r"],
  "application/x-rar-compressed": ["*rar"],
  "application/x-redhat-package-manager": ["rpm"],
  "application/x-research-info-systems": ["ris"],
  "application/x-sea": ["sea"],
  "application/x-sh": ["sh"],
  "application/x-shar": ["shar"],
  "application/x-shockwave-flash": ["swf"],
  "application/x-silverlight-app": ["xap"],
  "application/x-sql": ["*sql"],
  "application/x-stuffit": ["sit"],
  "application/x-stuffitx": ["sitx"],
  "application/x-subrip": ["srt"],
  "application/x-sv4cpio": ["sv4cpio"],
  "application/x-sv4crc": ["sv4crc"],
  "application/x-t3vm-image": ["t3"],
  "application/x-tads": ["gam"],
  "application/x-tar": ["tar"],
  "application/x-tcl": ["tcl", "tk"],
  "application/x-tex": ["tex"],
  "application/x-tex-tfm": ["tfm"],
  "application/x-texinfo": ["texinfo", "texi"],
  "application/x-tgif": ["*obj"],
  "application/x-ustar": ["ustar"],
  "application/x-virtualbox-hdd": ["hdd"],
  "application/x-virtualbox-ova": ["ova"],
  "application/x-virtualbox-ovf": ["ovf"],
  "application/x-virtualbox-vbox": ["vbox"],
  "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
  "application/x-virtualbox-vdi": ["vdi"],
  "application/x-virtualbox-vhd": ["vhd"],
  "application/x-virtualbox-vmdk": ["vmdk"],
  "application/x-wais-source": ["src"],
  "application/x-web-app-manifest+json": ["webapp"],
  "application/x-x509-ca-cert": ["der", "crt", "pem"],
  "application/x-xfig": ["fig"],
  "application/x-xliff+xml": ["*xlf"],
  "application/x-xpinstall": ["xpi"],
  "application/x-xz": ["xz"],
  "application/x-zip-compressed": ["*zip"],
  "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
  "audio/vnd.dece.audio": ["uva", "uvva"],
  "audio/vnd.digital-winds": ["eol"],
  "audio/vnd.dra": ["dra"],
  "audio/vnd.dts": ["dts"],
  "audio/vnd.dts.hd": ["dtshd"],
  "audio/vnd.lucent.voice": ["lvp"],
  "audio/vnd.ms-playready.media.pya": ["pya"],
  "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
  "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
  "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
  "audio/vnd.rip": ["rip"],
  "audio/x-aac": ["*aac"],
  "audio/x-aiff": ["aif", "aiff", "aifc"],
  "audio/x-caf": ["caf"],
  "audio/x-flac": ["flac"],
  "audio/x-m4a": ["*m4a"],
  "audio/x-matroska": ["mka"],
  "audio/x-mpegurl": ["m3u"],
  "audio/x-ms-wax": ["wax"],
  "audio/x-ms-wma": ["wma"],
  "audio/x-pn-realaudio": ["ram", "ra"],
  "audio/x-pn-realaudio-plugin": ["rmp"],
  "audio/x-realaudio": ["*ra"],
  "audio/x-wav": ["*wav"],
  "chemical/x-cdx": ["cdx"],
  "chemical/x-cif": ["cif"],
  "chemical/x-cmdf": ["cmdf"],
  "chemical/x-cml": ["cml"],
  "chemical/x-csml": ["csml"],
  "chemical/x-xyz": ["xyz"],
  "image/prs.btif": ["btif", "btf"],
  "image/prs.pti": ["pti"],
  "image/vnd.adobe.photoshop": ["psd"],
  "image/vnd.airzip.accelerator.azv": ["azv"],
  "image/vnd.blockfact.facti": ["facti"],
  "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
  "image/vnd.djvu": ["djvu", "djv"],
  "image/vnd.dvb.subtitle": ["*sub"],
  "image/vnd.dwg": ["dwg"],
  "image/vnd.dxf": ["dxf"],
  "image/vnd.fastbidsheet": ["fbs"],
  "image/vnd.fpx": ["fpx"],
  "image/vnd.fst": ["fst"],
  "image/vnd.fujixerox.edmics-mmr": ["mmr"],
  "image/vnd.fujixerox.edmics-rlc": ["rlc"],
  "image/vnd.microsoft.icon": ["ico"],
  "image/vnd.ms-dds": ["dds"],
  "image/vnd.ms-modi": ["mdi"],
  "image/vnd.ms-photo": ["wdp"],
  "image/vnd.net-fpx": ["npx"],
  "image/vnd.pco.b16": ["b16"],
  "image/vnd.tencent.tap": ["tap"],
  "image/vnd.valve.source.texture": ["vtf"],
  "image/vnd.wap.wbmp": ["wbmp"],
  "image/vnd.xiff": ["xif"],
  "image/vnd.zbrush.pcx": ["pcx"],
  "image/x-3ds": ["3ds"],
  "image/x-adobe-dng": ["dng"],
  "image/x-cmu-raster": ["ras"],
  "image/x-cmx": ["cmx"],
  "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
  "image/x-icon": ["*ico"],
  "image/x-jng": ["jng"],
  "image/x-mrsid-image": ["sid"],
  "image/x-ms-bmp": ["*bmp"],
  "image/x-pcx": ["*pcx"],
  "image/x-pict": ["pic", "pct"],
  "image/x-portable-anymap": ["pnm"],
  "image/x-portable-bitmap": ["pbm"],
  "image/x-portable-graymap": ["pgm"],
  "image/x-portable-pixmap": ["ppm"],
  "image/x-rgb": ["rgb"],
  "image/x-tga": ["tga"],
  "image/x-xbitmap": ["xbm"],
  "image/x-xpixmap": ["xpm"],
  "image/x-xwindowdump": ["xwd"],
  "message/vnd.wfa.wsc": ["wsc"],
  "model/vnd.bary": ["bary"],
  "model/vnd.cld": ["cld"],
  "model/vnd.collada+xml": ["dae"],
  "model/vnd.dwf": ["dwf"],
  "model/vnd.gdl": ["gdl"],
  "model/vnd.gtw": ["gtw"],
  "model/vnd.mts": ["*mts"],
  "model/vnd.opengex": ["ogex"],
  "model/vnd.parasolid.transmit.binary": ["x_b"],
  "model/vnd.parasolid.transmit.text": ["x_t"],
  "model/vnd.pytha.pyox": ["pyo", "pyox"],
  "model/vnd.sap.vds": ["vds"],
  "model/vnd.usda": ["usda"],
  "model/vnd.usdz+zip": ["usdz"],
  "model/vnd.valve.source.compiled-map": ["bsp"],
  "model/vnd.vtu": ["vtu"],
  "text/prs.lines.tag": ["dsc"],
  "text/vnd.curl": ["curl"],
  "text/vnd.curl.dcurl": ["dcurl"],
  "text/vnd.curl.mcurl": ["mcurl"],
  "text/vnd.curl.scurl": ["scurl"],
  "text/vnd.dvb.subtitle": ["sub"],
  "text/vnd.familysearch.gedcom": ["ged"],
  "text/vnd.fly": ["fly"],
  "text/vnd.fmi.flexstor": ["flx"],
  "text/vnd.graphviz": ["gv"],
  "text/vnd.in3d.3dml": ["3dml"],
  "text/vnd.in3d.spot": ["spot"],
  "text/vnd.sun.j2me.app-descriptor": ["jad"],
  "text/vnd.wap.wml": ["wml"],
  "text/vnd.wap.wmlscript": ["wmls"],
  "text/x-asm": ["s", "asm"],
  "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
  "text/x-component": ["htc"],
  "text/x-fortran": ["f", "for", "f77", "f90"],
  "text/x-handlebars-template": ["hbs"],
  "text/x-java-source": ["java"],
  "text/x-lua": ["lua"],
  "text/x-markdown": ["mkd"],
  "text/x-nfo": ["nfo"],
  "text/x-opml": ["opml"],
  "text/x-org": ["*org"],
  "text/x-pascal": ["p", "pas"],
  "text/x-processing": ["pde"],
  "text/x-sass": ["sass"],
  "text/x-scss": ["scss"],
  "text/x-setext": ["etx"],
  "text/x-sfv": ["sfv"],
  "text/x-suse-ymp": ["ymp"],
  "text/x-uuencode": ["uu"],
  "text/x-vcalendar": ["vcs"],
  "text/x-vcard": ["vcf"],
  "video/vnd.dece.hd": ["uvh", "uvvh"],
  "video/vnd.dece.mobile": ["uvm", "uvvm"],
  "video/vnd.dece.pd": ["uvp", "uvvp"],
  "video/vnd.dece.sd": ["uvs", "uvvs"],
  "video/vnd.dece.video": ["uvv", "uvvv"],
  "video/vnd.dvb.file": ["dvb"],
  "video/vnd.fvt": ["fvt"],
  "video/vnd.mpegurl": ["mxu", "m4u"],
  "video/vnd.ms-playready.media.pyv": ["pyv"],
  "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
  "video/vnd.vivo": ["viv"],
  "video/x-f4v": ["f4v"],
  "video/x-fli": ["fli"],
  "video/x-flv": ["flv"],
  "video/x-m4v": ["m4v"],
  "video/x-matroska": ["mkv", "mk3d", "mks"],
  "video/x-mng": ["mng"],
  "video/x-ms-asf": ["asf", "asx"],
  "video/x-ms-vob": ["vob"],
  "video/x-ms-wm": ["wm"],
  "video/x-ms-wmv": ["wmv"],
  "video/x-ms-wmx": ["wmx"],
  "video/x-ms-wvx": ["wvx"],
  "video/x-msvideo": ["avi"],
  "video/x-sgi-movie": ["movie"],
  "video/x-smv": ["smv"],
  "x-conference/x-cooltalk": ["ice"]
};
Object.freeze(types);
var other_default = types;

// ../../node_modules/.pnpm/mime@4.1.0/node_modules/mime/dist/types/standard.js
var types2 = {
  "application/andrew-inset": ["ez"],
  "application/appinstaller": ["appinstaller"],
  "application/applixware": ["aw"],
  "application/appx": ["appx"],
  "application/appxbundle": ["appxbundle"],
  "application/atom+xml": ["atom"],
  "application/atomcat+xml": ["atomcat"],
  "application/atomdeleted+xml": ["atomdeleted"],
  "application/atomsvc+xml": ["atomsvc"],
  "application/atsc-dwd+xml": ["dwd"],
  "application/atsc-held+xml": ["held"],
  "application/atsc-rsat+xml": ["rsat"],
  "application/automationml-aml+xml": ["aml"],
  "application/automationml-amlx+zip": ["amlx"],
  "application/bdoc": ["bdoc"],
  "application/calendar+xml": ["xcs"],
  "application/ccxml+xml": ["ccxml"],
  "application/cdfx+xml": ["cdfx"],
  "application/cdmi-capability": ["cdmia"],
  "application/cdmi-container": ["cdmic"],
  "application/cdmi-domain": ["cdmid"],
  "application/cdmi-object": ["cdmio"],
  "application/cdmi-queue": ["cdmiq"],
  "application/cpl+xml": ["cpl"],
  "application/cu-seeme": ["cu"],
  "application/cwl": ["cwl"],
  "application/dash+xml": ["mpd"],
  "application/dash-patch+xml": ["mpp"],
  "application/davmount+xml": ["davmount"],
  "application/dicom": ["dcm"],
  "application/docbook+xml": ["dbk"],
  "application/dssc+der": ["dssc"],
  "application/dssc+xml": ["xdssc"],
  "application/ecmascript": ["ecma"],
  "application/emma+xml": ["emma"],
  "application/emotionml+xml": ["emotionml"],
  "application/epub+zip": ["epub"],
  "application/exi": ["exi"],
  "application/express": ["exp"],
  "application/fdf": ["fdf"],
  "application/fdt+xml": ["fdt"],
  "application/font-tdpfr": ["pfr"],
  "application/geo+json": ["geojson"],
  "application/gml+xml": ["gml"],
  "application/gpx+xml": ["gpx"],
  "application/gxf": ["gxf"],
  "application/gzip": ["gz"],
  "application/hjson": ["hjson"],
  "application/hyperstudio": ["stk"],
  "application/inkml+xml": ["ink", "inkml"],
  "application/ipfix": ["ipfix"],
  "application/its+xml": ["its"],
  "application/java-archive": ["jar", "war", "ear"],
  "application/java-serialized-object": ["ser"],
  "application/java-vm": ["class"],
  "application/javascript": ["*js"],
  "application/json": ["json", "map"],
  "application/json5": ["json5"],
  "application/jsonml+json": ["jsonml"],
  "application/ld+json": ["jsonld"],
  "application/lgr+xml": ["lgr"],
  "application/lost+xml": ["lostxml"],
  "application/mac-binhex40": ["hqx"],
  "application/mac-compactpro": ["cpt"],
  "application/mads+xml": ["mads"],
  "application/manifest+json": ["webmanifest"],
  "application/marc": ["mrc"],
  "application/marcxml+xml": ["mrcx"],
  "application/mathematica": ["ma", "nb", "mb"],
  "application/mathml+xml": ["mathml"],
  "application/mbox": ["mbox"],
  "application/media-policy-dataset+xml": ["mpf"],
  "application/mediaservercontrol+xml": ["mscml"],
  "application/metalink+xml": ["metalink"],
  "application/metalink4+xml": ["meta4"],
  "application/mets+xml": ["mets"],
  "application/mmt-aei+xml": ["maei"],
  "application/mmt-usd+xml": ["musd"],
  "application/mods+xml": ["mods"],
  "application/mp21": ["m21", "mp21"],
  "application/mp4": ["*mp4", "*mpg4", "mp4s", "m4p"],
  "application/msix": ["msix"],
  "application/msixbundle": ["msixbundle"],
  "application/msword": ["doc", "dot"],
  "application/mxf": ["mxf"],
  "application/n-quads": ["nq"],
  "application/n-triples": ["nt"],
  "application/node": ["cjs"],
  "application/octet-stream": [
    "bin",
    "dms",
    "lrf",
    "mar",
    "so",
    "dist",
    "distz",
    "pkg",
    "bpk",
    "dump",
    "elc",
    "deploy",
    "exe",
    "dll",
    "deb",
    "dmg",
    "iso",
    "img",
    "msi",
    "msp",
    "msm",
    "buffer"
  ],
  "application/oda": ["oda"],
  "application/oebps-package+xml": ["opf"],
  "application/ogg": ["ogx"],
  "application/omdoc+xml": ["omdoc"],
  "application/onenote": [
    "onetoc",
    "onetoc2",
    "onetmp",
    "onepkg",
    "one",
    "onea"
  ],
  "application/oxps": ["oxps"],
  "application/p2p-overlay+xml": ["relo"],
  "application/patch-ops-error+xml": ["xer"],
  "application/pdf": ["pdf"],
  "application/pgp-encrypted": ["pgp"],
  "application/pgp-keys": ["asc"],
  "application/pgp-signature": ["sig", "*asc"],
  "application/pics-rules": ["prf"],
  "application/pkcs10": ["p10"],
  "application/pkcs7-mime": ["p7m", "p7c"],
  "application/pkcs7-signature": ["p7s"],
  "application/pkcs8": ["p8"],
  "application/pkix-attr-cert": ["ac"],
  "application/pkix-cert": ["cer"],
  "application/pkix-crl": ["crl"],
  "application/pkix-pkipath": ["pkipath"],
  "application/pkixcmp": ["pki"],
  "application/pls+xml": ["pls"],
  "application/postscript": ["ai", "eps", "ps"],
  "application/provenance+xml": ["provx"],
  "application/pskc+xml": ["pskcxml"],
  "application/raml+yaml": ["raml"],
  "application/rdf+xml": ["rdf", "owl"],
  "application/reginfo+xml": ["rif"],
  "application/relax-ng-compact-syntax": ["rnc"],
  "application/resource-lists+xml": ["rl"],
  "application/resource-lists-diff+xml": ["rld"],
  "application/rls-services+xml": ["rs"],
  "application/route-apd+xml": ["rapd"],
  "application/route-s-tsid+xml": ["sls"],
  "application/route-usd+xml": ["rusd"],
  "application/rpki-ghostbusters": ["gbr"],
  "application/rpki-manifest": ["mft"],
  "application/rpki-roa": ["roa"],
  "application/rsd+xml": ["rsd"],
  "application/rss+xml": ["rss"],
  "application/rtf": ["rtf"],
  "application/sbml+xml": ["sbml"],
  "application/scvp-cv-request": ["scq"],
  "application/scvp-cv-response": ["scs"],
  "application/scvp-vp-request": ["spq"],
  "application/scvp-vp-response": ["spp"],
  "application/sdp": ["sdp"],
  "application/senml+xml": ["senmlx"],
  "application/sensml+xml": ["sensmlx"],
  "application/set-payment-initiation": ["setpay"],
  "application/set-registration-initiation": ["setreg"],
  "application/shf+xml": ["shf"],
  "application/sieve": ["siv", "sieve"],
  "application/smil+xml": ["smi", "smil"],
  "application/sparql-query": ["rq"],
  "application/sparql-results+xml": ["srx"],
  "application/sql": ["sql"],
  "application/srgs": ["gram"],
  "application/srgs+xml": ["grxml"],
  "application/sru+xml": ["sru"],
  "application/ssdl+xml": ["ssdl"],
  "application/ssml+xml": ["ssml"],
  "application/swid+xml": ["swidtag"],
  "application/tei+xml": ["tei", "teicorpus"],
  "application/thraud+xml": ["tfi"],
  "application/timestamped-data": ["tsd"],
  "application/toml": ["toml"],
  "application/trig": ["trig"],
  "application/ttml+xml": ["ttml"],
  "application/ubjson": ["ubj"],
  "application/urc-ressheet+xml": ["rsheet"],
  "application/urc-targetdesc+xml": ["td"],
  "application/voicexml+xml": ["vxml"],
  "application/wasm": ["wasm"],
  "application/watcherinfo+xml": ["wif"],
  "application/widget": ["wgt"],
  "application/winhlp": ["hlp"],
  "application/wsdl+xml": ["wsdl"],
  "application/wspolicy+xml": ["wspolicy"],
  "application/xaml+xml": ["xaml"],
  "application/xcap-att+xml": ["xav"],
  "application/xcap-caps+xml": ["xca"],
  "application/xcap-diff+xml": ["xdf"],
  "application/xcap-el+xml": ["xel"],
  "application/xcap-ns+xml": ["xns"],
  "application/xenc+xml": ["xenc"],
  "application/xfdf": ["xfdf"],
  "application/xhtml+xml": ["xhtml", "xht"],
  "application/xliff+xml": ["xlf"],
  "application/xml": ["xml", "xsl", "xsd", "rng"],
  "application/xml-dtd": ["dtd"],
  "application/xop+xml": ["xop"],
  "application/xproc+xml": ["xpl"],
  "application/xslt+xml": ["*xsl", "xslt"],
  "application/xspf+xml": ["xspf"],
  "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
  "application/yang": ["yang"],
  "application/yin+xml": ["yin"],
  "application/zip": ["zip"],
  "application/zip+dotlottie": ["lottie"],
  "audio/3gpp": ["*3gpp"],
  "audio/aac": ["adts", "aac"],
  "audio/adpcm": ["adp"],
  "audio/amr": ["amr"],
  "audio/basic": ["au", "snd"],
  "audio/midi": ["mid", "midi", "kar", "rmi"],
  "audio/mobile-xmf": ["mxmf"],
  "audio/mp3": ["*mp3"],
  "audio/mp4": ["m4a", "mp4a", "m4b"],
  "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
  "audio/ogg": ["oga", "ogg", "spx", "opus"],
  "audio/s3m": ["s3m"],
  "audio/silk": ["sil"],
  "audio/wav": ["wav"],
  "audio/wave": ["*wav"],
  "audio/webm": ["weba"],
  "audio/xm": ["xm"],
  "font/collection": ["ttc"],
  "font/otf": ["otf"],
  "font/ttf": ["ttf"],
  "font/woff": ["woff"],
  "font/woff2": ["woff2"],
  "image/aces": ["exr"],
  "image/apng": ["apng"],
  "image/avci": ["avci"],
  "image/avcs": ["avcs"],
  "image/avif": ["avif"],
  "image/bmp": ["bmp", "dib"],
  "image/cgm": ["cgm"],
  "image/dicom-rle": ["drle"],
  "image/dpx": ["dpx"],
  "image/emf": ["emf"],
  "image/fits": ["fits"],
  "image/g3fax": ["g3"],
  "image/gif": ["gif"],
  "image/heic": ["heic"],
  "image/heic-sequence": ["heics"],
  "image/heif": ["heif"],
  "image/heif-sequence": ["heifs"],
  "image/hej2k": ["hej2"],
  "image/ief": ["ief"],
  "image/jaii": ["jaii"],
  "image/jais": ["jais"],
  "image/jls": ["jls"],
  "image/jp2": ["jp2", "jpg2"],
  "image/jpeg": ["jpg", "jpeg", "jpe"],
  "image/jph": ["jph"],
  "image/jphc": ["jhc"],
  "image/jpm": ["jpm", "jpgm"],
  "image/jpx": ["jpx", "jpf"],
  "image/jxl": ["jxl"],
  "image/jxr": ["jxr"],
  "image/jxra": ["jxra"],
  "image/jxrs": ["jxrs"],
  "image/jxs": ["jxs"],
  "image/jxsc": ["jxsc"],
  "image/jxsi": ["jxsi"],
  "image/jxss": ["jxss"],
  "image/ktx": ["ktx"],
  "image/ktx2": ["ktx2"],
  "image/pjpeg": ["jfif"],
  "image/png": ["png"],
  "image/sgi": ["sgi"],
  "image/svg+xml": ["svg", "svgz"],
  "image/t38": ["t38"],
  "image/tiff": ["tif", "tiff"],
  "image/tiff-fx": ["tfx"],
  "image/webp": ["webp"],
  "image/wmf": ["wmf"],
  "message/disposition-notification": ["disposition-notification"],
  "message/global": ["u8msg"],
  "message/global-delivery-status": ["u8dsn"],
  "message/global-disposition-notification": ["u8mdn"],
  "message/global-headers": ["u8hdr"],
  "message/rfc822": ["eml", "mime", "mht", "mhtml"],
  "model/3mf": ["3mf"],
  "model/gltf+json": ["gltf"],
  "model/gltf-binary": ["glb"],
  "model/iges": ["igs", "iges"],
  "model/jt": ["jt"],
  "model/mesh": ["msh", "mesh", "silo"],
  "model/mtl": ["mtl"],
  "model/obj": ["obj"],
  "model/prc": ["prc"],
  "model/step": ["step", "stp", "stpnc", "p21", "210"],
  "model/step+xml": ["stpx"],
  "model/step+zip": ["stpz"],
  "model/step-xml+zip": ["stpxz"],
  "model/stl": ["stl"],
  "model/u3d": ["u3d"],
  "model/vrml": ["wrl", "vrml"],
  "model/x3d+binary": ["*x3db", "x3dbz"],
  "model/x3d+fastinfoset": ["x3db"],
  "model/x3d+vrml": ["*x3dv", "x3dvz"],
  "model/x3d+xml": ["x3d", "x3dz"],
  "model/x3d-vrml": ["x3dv"],
  "text/cache-manifest": ["appcache", "manifest"],
  "text/calendar": ["ics", "ifb"],
  "text/coffeescript": ["coffee", "litcoffee"],
  "text/css": ["css"],
  "text/csv": ["csv"],
  "text/html": ["html", "htm", "shtml"],
  "text/jade": ["jade"],
  "text/javascript": ["js", "mjs"],
  "text/jsx": ["jsx"],
  "text/less": ["less"],
  "text/markdown": ["md", "markdown"],
  "text/mathml": ["mml"],
  "text/mdx": ["mdx"],
  "text/n3": ["n3"],
  "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
  "text/richtext": ["rtx"],
  "text/rtf": ["*rtf"],
  "text/sgml": ["sgml", "sgm"],
  "text/shex": ["shex"],
  "text/slim": ["slim", "slm"],
  "text/spdx": ["spdx"],
  "text/stylus": ["stylus", "styl"],
  "text/tab-separated-values": ["tsv"],
  "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
  "text/turtle": ["ttl"],
  "text/uri-list": ["uri", "uris", "urls"],
  "text/vcard": ["vcard"],
  "text/vtt": ["vtt"],
  "text/wgsl": ["wgsl"],
  "text/xml": ["*xml"],
  "text/yaml": ["yaml", "yml"],
  "video/3gpp": ["3gp", "3gpp"],
  "video/3gpp2": ["3g2"],
  "video/h261": ["h261"],
  "video/h263": ["h263"],
  "video/h264": ["h264"],
  "video/iso.segment": ["m4s"],
  "video/jpeg": ["jpgv"],
  "video/jpm": ["*jpm", "*jpgm"],
  "video/mj2": ["mj2", "mjp2"],
  "video/mp2t": ["ts", "m2t", "m2ts", "mts"],
  "video/mp4": ["mp4", "mp4v", "mpg4"],
  "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
  "video/ogg": ["ogv"],
  "video/quicktime": ["qt", "mov"],
  "video/webm": ["webm"]
};
Object.freeze(types2);
var standard_default = types2;

// ../../node_modules/.pnpm/mime@4.1.0/node_modules/mime/dist/src/Mime.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Mime_extensionToType;
var _Mime_typeToExtension;
var _Mime_typeToExtensions;
var Mime = class {
  constructor(...args) {
    _Mime_extensionToType.set(this, /* @__PURE__ */ new Map());
    _Mime_typeToExtension.set(this, /* @__PURE__ */ new Map());
    _Mime_typeToExtensions.set(this, /* @__PURE__ */ new Map());
    for (const arg of args) {
      this.define(arg);
    }
  }
  define(typeMap, force = false) {
    for (let [type, extensions] of Object.entries(typeMap)) {
      type = type.toLowerCase();
      extensions = extensions.map((ext) => ext.toLowerCase());
      if (!__classPrivateFieldGet(this, _Mime_typeToExtensions, "f").has(type)) {
        __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").set(type, /* @__PURE__ */ new Set());
      }
      const allExtensions = __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type);
      let first = true;
      for (let extension of extensions) {
        const starred = extension.startsWith("*");
        extension = starred ? extension.slice(1) : extension;
        allExtensions?.add(extension);
        if (first) {
          __classPrivateFieldGet(this, _Mime_typeToExtension, "f").set(type, extension);
        }
        first = false;
        if (starred)
          continue;
        const currentType = __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(extension);
        if (currentType && currentType != type && !force) {
          throw new Error(`"${type} -> ${extension}" conflicts with "${currentType} -> ${extension}". Pass \`force=true\` to override this definition.`);
        }
        __classPrivateFieldGet(this, _Mime_extensionToType, "f").set(extension, type);
      }
    }
    return this;
  }
  getType(path8) {
    if (typeof path8 !== "string")
      return null;
    const last = path8.replace(/^.*[/\\]/s, "").toLowerCase();
    const ext = last.replace(/^.*\./s, "").toLowerCase();
    const hasPath = last.length < path8.length;
    const hasDot = ext.length < last.length - 1;
    if (!hasDot && hasPath)
      return null;
    return __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(ext) ?? null;
  }
  getExtension(type) {
    if (typeof type !== "string")
      return null;
    type = type?.split?.(";")[0];
    return (type && __classPrivateFieldGet(this, _Mime_typeToExtension, "f").get(type.trim().toLowerCase())) ?? null;
  }
  getAllExtensions(type) {
    if (typeof type !== "string")
      return null;
    return __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type.toLowerCase()) ?? null;
  }
  _freeze() {
    this.define = () => {
      throw new Error("define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances");
    };
    Object.freeze(this);
    for (const extensions of __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").values()) {
      Object.freeze(extensions);
    }
    return this;
  }
  _getTestState() {
    return {
      types: __classPrivateFieldGet(this, _Mime_extensionToType, "f"),
      extensions: __classPrivateFieldGet(this, _Mime_typeToExtension, "f")
    };
  }
};
_Mime_extensionToType = /* @__PURE__ */ new WeakMap(), _Mime_typeToExtension = /* @__PURE__ */ new WeakMap(), _Mime_typeToExtensions = /* @__PURE__ */ new WeakMap();
var Mime_default = Mime;

// ../../node_modules/.pnpm/mime@4.1.0/node_modules/mime/dist/src/index.js
var src_default = new Mime_default(standard_default, other_default)._freeze();

// src/preview-server.ts
function createPreviewMiddleware(projectRoot, baseOutDir) {
  const clientOutDir = resolve2(projectRoot, `${baseOutDir}/client`);
  return async (req, res, next) => {
    try {
      let url = req.url || "/";
      let filePath = path5.join(clientOutDir, url);
      const extName = path5.extname(filePath);
      if (extName && extName !== ".html") {
        return next();
      }
      if (url.endsWith("/")) {
        filePath = path5.join(filePath, "index.html");
      }
      if (!path5.extname(filePath) && !url.endsWith("/")) {
        const htmlCandidate = filePath + ".html";
        if (fs2.existsSync(htmlCandidate)) {
          filePath = htmlCandidate;
        }
      }
      if (!fs2.existsSync(filePath)) {
        const normalizedUrl = url.replace(/\/$/, "") || "/";
        const urlSegments = normalizedUrl.split("/").filter(Boolean);
        let found404 = false;
        for (let i = urlSegments.length; i >= 0; i--) {
          const parentSegments = urlSegments.slice(0, i);
          const fourOhFourPath = "/" + [...parentSegments, "404"].join("/");
          const fourOhFourFilePath = path5.join(
            clientOutDir,
            fourOhFourPath + ".html"
          );
          if (fs2.existsSync(fourOhFourFilePath)) {
            filePath = fourOhFourFilePath;
            found404 = true;
            break;
          }
        }
        if (!found404) {
          res.statusCode = 404;
          res.end("Not Found");
          return;
        }
      }
      const type = src_default.getType(filePath) ?? "application/octet-stream";
      const content = fs2.readFileSync(filePath);
      const is404Page = filePath.includes("/404.html");
      res.statusCode = is404Page ? 404 : 200;
      res.setHeader("Content-Type", type);
      res.end(content);
    } catch (err) {
      next(err);
    }
  };
}

// src/ssg.ts
import path6 from "node:path";
import fs3 from "node:fs";
import { pathToFileURL } from "node:url";
async function generateStaticSite(state, outputOptions, bundle, log2, baseUrl) {
  const { projectRoot, baseOutDir, manifestPath, ssgOptions } = state;
  const outDirAbs = path6.resolve(projectRoot, outputOptions?.dir ?? "dist");
  const ssrEntry = Object.values(bundle).find(
    (c) => c.type === "chunk" && c.isEntry
  );
  if (!ssrEntry) return;
  const ssrEntryAbs = path6.resolve(outDirAbs, ssrEntry.fileName);
  const mod = await import(pathToFileURL(ssrEntryAbs).href);
  const paths = await mod.generateStaticPaths();
  const clientOutDirAbs = path6.resolve(projectRoot, `${baseOutDir}/client`);
  const { clientEntry } = await getClientAssets(clientOutDirAbs, manifestPath);
  let manifest = null;
  const clientManifestPath = path6.resolve(clientOutDirAbs, manifestPath);
  if (fs3.existsSync(clientManifestPath)) {
    try {
      manifest = JSON.parse(fs3.readFileSync(clientManifestPath, "utf-8"));
    } catch {
    }
  }
  const routes = Object.keys(paths);
  log2(ANSI.cyan("[SSG]"), `discovered ${routes.length} routes:`, routes);
  const renderingChunks = [];
  const maxConcurrentRenders = ssgOptions.build.maxConcurrentRenders;
  for (let i = 0; i < routes.length; i += maxConcurrentRenders) {
    const chunkKeys = routes.slice(i, i + maxConcurrentRenders);
    renderingChunks.push(
      chunkKeys.reduce(
        (acc, key) => {
          acc[key] = paths[key];
          return acc;
        },
        {}
      )
    );
  }
  for (const chunk of renderingChunks) {
    await Promise.all(
      Object.entries(chunk).map(async ([route, srcFilePath]) => {
        const html = await renderRoute(
          state,
          mod,
          route,
          srcFilePath,
          clientEntry,
          manifest,
          baseUrl
        );
        const filePath = getOutputPath(clientOutDirAbs, route);
        log2(ANSI.cyan("[SSG]"), "write:", ANSI.black(filePath));
        fs3.mkdirSync(path6.dirname(filePath), { recursive: true });
        fs3.writeFileSync(filePath, html, "utf-8");
      })
    );
  }
  await appendStaticPropsToClientModules(state, clientOutDirAbs, log2);
  if (ssgOptions.sitemap?.domain) {
    await generateSitemap(state, routes, clientOutDirAbs, log2);
  }
}
async function getClientAssets(clientOutDirAbs, manifestPath) {
  let clientEntry = null;
  try {
    const clientManifestPath = path6.resolve(clientOutDirAbs, manifestPath);
    if (fs3.existsSync(clientManifestPath)) {
      const manifest = JSON.parse(fs3.readFileSync(clientManifestPath, "utf-8"));
      const clientEntryKey = "virtual:kiru:entry-client";
      if (manifest[clientEntryKey]?.file) {
        clientEntry = manifest[clientEntryKey].file;
      }
    }
  } catch {
  }
  if (!clientEntry) {
    clientEntry = findClientEntry(clientOutDirAbs);
  }
  return { clientEntry };
}
function collectCssForModules(manifest, moduleIds, projectRoot) {
  const seen = /* @__PURE__ */ new Set();
  const cssFiles = /* @__PURE__ */ new Set();
  const collectCss = (key) => {
    if (seen.has(key)) return;
    seen.add(key);
    const it = manifest[key];
    if (!it) {
      return;
    }
    ;
    (it.css || []).forEach((c) => cssFiles.add(c));
    (it.imports || []).forEach((imp) => collectCss(imp));
  };
  const entryClientKey = "virtual:kiru:entry-client";
  if (manifest[entryClientKey] && !seen.has(entryClientKey)) {
    collectCss(entryClientKey);
  }
  for (const moduleId of moduleIds) {
    let normalizedId = moduleId.replace(/\\/g, "/");
    if (normalizedId.startsWith(projectRoot)) {
      normalizedId = normalizedId.substring(projectRoot.length);
    }
    if (normalizedId.startsWith("/")) {
      normalizedId = normalizedId.substring(1);
    }
    if (manifest[normalizedId]) {
      collectCss(normalizedId);
      continue;
    }
    if (manifest["/" + normalizedId]) {
      collectCss("/" + normalizedId);
      continue;
    }
    if (manifest[moduleId]) {
      collectCss(moduleId);
      continue;
    }
    for (const key in manifest) {
      const keyNormalized = key.replace(/\\/g, "/");
      const moduleBaseName = path6.basename(normalizedId);
      const keyBaseName = path6.basename(keyNormalized);
      if ((keyNormalized.endsWith(normalizedId) || normalizedId.endsWith(keyNormalized)) && moduleBaseName === keyBaseName) {
        collectCss(key);
        break;
      }
    }
  }
  return Array.from(cssFiles);
}
function findClientEntry(dir) {
  if (!fs3.existsSync(dir)) return null;
  const top = fs3.readdirSync(dir);
  const topJs = top.find((f) => f.endsWith(".js"));
  if (topJs) return topJs;
  const assetsDir = path6.join(dir, "assets");
  if (fs3.existsSync(assetsDir)) {
    const assetJs = fs3.readdirSync(assetsDir).find((f) => f.endsWith(".js"));
    return assetJs ? `assets/${assetJs}` : null;
  }
  return null;
}
async function renderRoute(state, mod, route, srcFilePath, clientEntry, manifest, baseUrl) {
  const moduleIds = [];
  const { projectRoot, ssgOptions } = state;
  const documentPath = path6.resolve(
    projectRoot,
    ssgOptions.dir,
    ssgOptions.document
  );
  const documentModuleId = documentPath.replace(/\\/g, "/");
  moduleIds.push(documentModuleId);
  const ctx = {
    registerModule: (moduleId) => {
      moduleIds.push(moduleId);
    },
    registerPreloadedPageProps: (props) => {
      ;
      (state.staticProps[srcFilePath] ??= {})[route] = props;
    }
  };
  const result = await mod.render(route, ctx);
  let html = result.body;
  let cssLinks = [];
  if (manifest) {
    cssLinks = collectCssForModules(manifest, moduleIds, projectRoot);
  }
  if (clientEntry) {
    const scriptTag = `<script type="module" src="${path6.join(baseUrl, clientEntry).replace(/\\/g, "/")}"></script>`;
    const headInjected = cssLinks ? html.replace(
      "<head>",
      "<head>" + cssLinks.map(
        (f) => `<link rel="stylesheet" type="text/css" href="${path6.join(baseUrl, f).replace(/\\/g, "/")}">`
      ).join("")
    ) : html;
    html = headInjected.includes("</body>") ? headInjected.replace("</body>", scriptTag + "</body>") : headInjected + scriptTag;
  }
  return html;
}
function getOutputPath(clientOutDirAbs, route) {
  if (route === "/") {
    return path6.resolve(clientOutDirAbs, "index.html");
  }
  const parts = route.replace(/^\//, "").split("/").filter(Boolean);
  if (parts.length === 1) {
    return path6.resolve(clientOutDirAbs, `${parts[0]}.html`);
  }
  const dirPath = path6.resolve(clientOutDirAbs, parts.slice(0, -1).join("/"));
  let last = parts[parts.length - 1];
  if (last.endsWith("*")) {
    last = last.slice(0, -1);
  }
  return path6.resolve(dirPath, `${last}.html`);
}
async function generateSitemap(state, routes, clientOutDirAbs, log2) {
  const sitemapConfig = state.ssgOptions.sitemap;
  const {
    domain,
    lastmod: lastModified,
    changefreq = "weekly",
    priority = 0.5,
    overrides = {}
  } = sitemapConfig;
  const baseUrl = state.ssgOptions.baseUrl;
  const normalizedDomain = domain.replace(/\/$/, "");
  const normalizedBaseUrl = baseUrl === "/" ? "" : baseUrl.replace(/\/$/, "");
  let hasImages = false;
  let hasVideos = false;
  for (const route of routes) {
    const override = overrides[route];
    if (override?.images?.length) {
      hasImages = true;
    }
    if (override?.videos?.length) {
      hasVideos = true;
    }
  }
  const sortedRoutes = [...routes].filter((route) => !route.endsWith("/404")).sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    const aDepth = a.split("/").filter(Boolean).length;
    const bDepth = b.split("/").filter(Boolean).length;
    if (aDepth !== bDepth) {
      return aDepth - bDepth;
    }
    return a < b ? -1 : a > b ? 1 : 0;
  });
  const urls = sortedRoutes.map((route) => {
    const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
    const url = `${normalizedDomain}${normalizedBaseUrl}${normalizedRoute}`;
    const override = overrides[route] || {};
    const routeChangefreq = override.changefreq ?? changefreq;
    const routePriority = override.priority ?? priority;
    const routeLastModified = override.lastmod ?? lastModified;
    let urlEntry = `  <url>
    <loc>${escapeXml(url)}</loc>
    <changefreq>${routeChangefreq}</changefreq>
    <priority>${routePriority}</priority>`;
    if (routeLastModified) {
      const lastMod = routeLastModified.toISOString().split("T")[0];
      urlEntry += `
    <lastmod>${lastMod}</lastmod>`;
    }
    if (override.images?.length) {
      for (const image of override.images) {
        const imageUrl = image.startsWith("http") ? image : `${normalizedDomain}${normalizedBaseUrl}${image.startsWith("/") ? image : `/${image}`}`;
        urlEntry += `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
    </image:image>`;
      }
    }
    if (override.videos?.length) {
      for (const video of override.videos) {
        const thumbnailUrl = video.thumbnail_loc.startsWith("http") ? video.thumbnail_loc : `${normalizedDomain}${normalizedBaseUrl}${video.thumbnail_loc.startsWith("/") ? video.thumbnail_loc : `/${video.thumbnail_loc}`}`;
        urlEntry += `
    <video:video>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:thumbnail_loc>${escapeXml(thumbnailUrl)}</video:thumbnail_loc>`;
        if (video.description) {
          urlEntry += `
      <video:description>${escapeXml(
            video.description
          )}</video:description>`;
        }
        urlEntry += `
    </video:video>`;
      }
    }
    urlEntry += `
  </url>`;
    return urlEntry;
  }).join("\n");
  const namespaces = [
    'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    hasImages && 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
    hasVideos && 'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"'
  ].filter(Boolean).join(" ");
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset ${namespaces}>
${urls}
</urlset>`;
  const sitemapPath = path6.resolve(clientOutDirAbs, "sitemap.xml");
  fs3.writeFileSync(sitemapPath, sitemapXml, "utf-8");
  log2(ANSI.cyan("[SSG]"), "Generated sitemap:", ANSI.black(sitemapPath));
}
function escapeXml(unsafe) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
async function appendStaticPropsToClientModules(state, clientOutDirAbs, log2) {
  const { projectRoot, manifestPath, ssgOptions } = state;
  try {
    log2(ANSI.cyan("[SSG]"), "Starting static props collection...");
    const clientManifestPath = path6.resolve(clientOutDirAbs, manifestPath);
    if (!fs3.existsSync(clientManifestPath)) {
      log2(
        ANSI.yellow("[SSG]"),
        "Client manifest not found, skipping static props"
      );
      return;
    }
    log2(ANSI.cyan("[SSG]"), "Found client manifest at:", clientManifestPath);
    const srcPages = globSync(`${ssgOptions.dir}/**/${ssgOptions.page}`, {
      cwd: projectRoot
    }).map((s) => s.replace(/\\/g, "/"));
    const manifest = JSON.parse(
      fs3.readFileSync(clientManifestPath, "utf-8")
    );
    log2(
      ANSI.cyan("[SSG]"),
      "Parsed manifest with",
      Object.keys(manifest).length,
      "entries"
    );
    const clientEntryChunk = manifest["virtual:kiru:entry-client"];
    if (!clientEntryChunk) {
      throw new Error("Client entry chunk not found in manifest");
    }
    await Promise.all(
      srcPages.map(async (moduleId) => {
        const staticProps = state.staticProps[`/` + moduleId];
        if (!staticProps) return;
        const chunk = manifest[moduleId];
        if (!chunk) {
          log2(ANSI.red(`failed to get manifest chunk for module "${moduleId}"`));
          return;
        }
        const filePath = path6.resolve(clientOutDirAbs, chunk.file);
        const code = `export const __KIRU_STATIC_PROPS__ = ${JSON.stringify(
          staticProps
        )};`;
        fs3.appendFileSync(filePath, `
${code}`, "utf-8");
        log2(ANSI.cyan("[SSG]"), "Added static props to:", chunk.file);
      })
    );
  } catch (error) {
    log2(ANSI.red("[SSG]"), "Failed to append static props:", error);
  }
}

// src/index.ts
import {
  build as build2
} from "vite";
function kiru(opts = {}) {
  let state;
  let log2;
  let virtualModules = {};
  let inlineConfig;
  let resolvedConfig;
  const mainPlugin = {
    name: "vite-plugin-kiru",
    config(config) {
      inlineConfig = config;
      return createViteConfig(config, opts);
    },
    async configResolved(config) {
      resolvedConfig = config;
      const initialState = createPluginState(opts);
      state = updatePluginState(initialState, config, opts);
      log2 = createLogger(state);
      if (state.ssgOptions) {
        virtualModules = await createVirtualModules(
          state.projectRoot,
          state.ssgOptions
        );
      }
    },
    transformIndexHtml() {
      if (!state.devtoolsEnabled) return;
      return createDevtoolsHtmlTransform(
        state.dtClientPathname,
        state.dtHostScriptPath
      );
    },
    configurePreviewServer(server) {
      if (!state.ssgOptions) return;
      server.middlewares.use(
        createPreviewMiddleware(state.projectRoot, state.baseOutDir)
      );
    },
    configureServer(server) {
      if (state.isProduction || state.isBuild) return;
      const {
        ssgOptions,
        devtoolsEnabled,
        dtClientPathname,
        dtHostScriptPath,
        fileLinkFormatter,
        projectRoot
      } = state;
      if (devtoolsEnabled) {
        setupDevtools(
          server,
          { dtClientPathname, formatFileLink: fileLinkFormatter },
          dtHostScriptPath,
          log2
        );
      }
      if (ssgOptions) {
        server.middlewares.use(async (req, res, next) => {
          try {
            const url = req.originalUrl || req.url || "/";
            const filePath = path7.join(state.baseOutDir, "client", url);
            const extName = path7.extname(filePath);
            if (extName && extName !== ".html") {
              return next();
            }
            const accept = req.headers["accept"] || "";
            if (typeof accept === "string" && accept.includes("text/html") && !url.startsWith("/node_modules/") && !url.startsWith("/@") && !url.startsWith(dtHostScriptPath) && !url.startsWith(dtClientPathname)) {
              const { status, html } = await handleSSR(
                server,
                url,
                state.projectRoot,
                resolvedConfig?.base ?? "/",
                () => resolveUserDocument(projectRoot, ssgOptions)
              );
              res.statusCode = status;
              res.setHeader("Content-Type", "text/html");
              res.end(html);
              return;
            }
          } catch (e) {
            console.error(e);
          }
          next();
        });
      }
    },
    resolveId(id) {
      if (id in virtualModules) {
        return "\0" + id;
      }
      return null;
    },
    load(id) {
      if (!id.startsWith("\0")) return null;
      const raw = id.slice(1);
      if (!(raw in virtualModules)) return null;
      return virtualModules[raw]();
    },
    async writeBundle(outputOptions, bundle) {
      if (!state.ssgOptions) return;
      if (!state.isBuild || !state.isSSRBuild) return;
      try {
        await generateStaticSite(
          state,
          outputOptions,
          bundle,
          log2,
          resolvedConfig?.base ?? "/"
        );
      } catch (e) {
        log2(ANSI.red("[SSG]: prerender failed"), e);
      }
    },
    async transform(src, id) {
      if (!shouldTransformFile(id, state)) {
        if (!state.includedPaths.some((p) => id.startsWith(p)) && !id.startsWith(state.projectRoot)) {
          opts?.onFileExcluded?.(id);
        }
        return { code: src };
      }
      log2(`Processing ${ANSI.black(id)}`);
      const ast = this.parse(src);
      const code = new import_magic_string.default(src);
      const ctx = {
        code,
        ast,
        isBuild: state.isBuild,
        fileLinkFormatter: state.fileLinkFormatter,
        filePath: id,
        log: log2
      };
      prepareDevOnlyHooks(ctx);
      if (state.features.staticHoisting) {
        prepareJSXHoisting(ctx);
      }
      if (!state.isProduction && !state.isBuild) {
        prepareHMR(ctx);
      }
      if (!code.hasChanged()) {
        log2(ANSI.green("\u2713"), "No changes");
        return { code: src };
      }
      const map = code.generateMap({
        source: id,
        file: `${id}.map`,
        includeContent: true
      });
      log2(ANSI.green("\u2713"), "Transformed");
      const result = code.toString();
      opts.onFileTransformed?.(id, result);
      return {
        code: result,
        map: map.toString()
      };
    }
  };
  return [
    mainPlugin,
    {
      name: "vite-plugin-kiru:ssg",
      apply: "build",
      enforce: "post",
      async closeBundle(error) {
        if (error || this.environment.config.build.ssr || !state.ssgOptions)
          return;
        log2(ANSI.cyan("[SSG]"), "Starting SSG build...");
        await build2({
          ...inlineConfig,
          configFile: false,
          build: {
            ...inlineConfig?.build,
            ssr: true
          }
        });
        log2(ANSI.cyan("[SSG]"), "SSG build complete!");
      }
    }
  ];
}
function onHMR(callback2) {
}
export {
  kiru as default,
  defaultEsBuildOptions,
  onHMR
};
