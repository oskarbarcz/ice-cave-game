import React, { useEffect, useState } from 'react';

interface Pixel {
    r: number;
    g: number;
    b: number;
    a: number;
}

interface ImageReaderProps {
    imageUrl: string;
}

class Image {
    private pixels: Pixel[];
    private width: number;
    private height: number;

    constructor(pixels: Pixel[], width: number, height: number) {
        this.pixels = pixels;
        this.width = width;
        this.height = height;
    }

    getPixel(x: number, y: number): Pixel | null {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null;
        }
        const index = y * this.width + x;
        return this.pixels[index];
    }

    static async fromUrl(imageUrl: string): Promise<Image> {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const dataView = new DataView(arrayBuffer);

        const width = dataView.getUint32(18, true);
        const height = dataView.getUint32(22, true);
        const pixelArray: Pixel[] = [];

        let offset = 54; // Bitmap header size
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const b = dataView.getUint8(offset++);
                const g = dataView.getUint8(offset++);
                const r = dataView.getUint8(offset++);
                const a = 255; // Bitmap files do not have alpha channel, setting it to 255
                pixelArray.push({ r, g, b, a });
            }
            // Bitmap rows are padded to multiples of 4 bytes
            offset += (4 - (width * 3) % 4) % 4;
        }

        return new Image(pixelArray, width, height);
    }
}

const fetchImage = async (imageUrl: string): Promise<Pixel[]> => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const dataView = new DataView(arrayBuffer);

    const width = dataView.getUint32(18, true);
    const height = dataView.getUint32(22, true);
    const pixelArray: Pixel[] = [];

    let offset = 54; // Bitmap header size
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const b = dataView.getUint8(offset++);
            const g = dataView.getUint8(offset++);
            const r = dataView.getUint8(offset++);
            const a = 255; // Bitmap files do not have alpha channel, setting it to 255
            pixelArray.push({ r, g, b, a });
        }
        // Bitmap rows are padded to multiples of 4 bytes
        offset += (4 - (width * 3) % 4) % 4;
    }

    return pixelArray;
};

const ImageReader: React.FC<ImageReaderProps> = ({ imageUrl }) => {
    const [pixels, setPixels] = useState<Pixel[]>([]);

    useEffect(() => {
        const loadImage = async () => {
            const pixelArray = await fetchImage(imageUrl);
            setPixels(pixelArray);
        };

        loadImage();
    }, [imageUrl]);

    return (
        <div>
            <h1>Image Reader</h1>
            <p>Loaded {pixels.length} pixels from the image.</p>
        </div>
    );
};

export default ImageReader;