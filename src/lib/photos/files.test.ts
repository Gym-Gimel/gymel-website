import { describe, expect, it } from "vitest";
import { getWebpDimensions, sortPhotoFileNames } from "@/lib/photos/files";

describe("photo files", () => {
  it("sorts numbered photo file names naturally", () => {
    expect(sortPhotoFileNames(["010.webp", "002.webp", "001.webp"])).toEqual([
      "001.webp",
      "002.webp",
      "010.webp",
    ]);
  });

  it("reads VP8X WebP dimensions", () => {
    const buffer = Buffer.alloc(30);
    buffer.write("RIFF", 0, "ascii");
    buffer.write("WEBP", 8, "ascii");
    buffer.write("VP8X", 12, "ascii");
    buffer.writeUInt32LE(10, 16);
    buffer[24] = 0xcf;
    buffer[25] = 0x07;
    buffer[26] = 0x00;
    buffer[27] = 0x37;
    buffer[28] = 0x04;
    buffer[29] = 0x00;

    expect(getWebpDimensions(buffer)).toEqual({ width: 2000, height: 1080 });
  });
});
