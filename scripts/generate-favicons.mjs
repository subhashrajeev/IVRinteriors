import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'ivr-logo.svg');
const svgBuffer = fs.readFileSync(svgPath);

// Generate PNG favicons at different sizes
const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
    for (const { name, size } of sizes) {
        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(path.join(publicDir, name));
        console.log(`Generated ${name}`);
    }

    // Generate favicon.ico (using 32x32 PNG as base)
    // Note: Sharp doesn't directly support ICO, so we'll use the 32x32 PNG
    // For a proper .ico file, you'd need a different tool, but browsers also accept PNG
    await sharp(svgBuffer)
        .resize(32, 32)
        .png()
        .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('Generated favicon.ico (as PNG with .ico extension)');

    console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
