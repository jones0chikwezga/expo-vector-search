/**
 * This test demonstrates how to handle binary data for vector search
 * in a Node/Jest environment.
 */

import * as fs from 'fs';
import * as path from 'path';

describe('Binary Data Integrity', () => {
    const BIN_PATH = path.join(__dirname, '../assets/products_vectors.bin');
    const META_PATH = path.join(__dirname, '../assets/products_metadata.json');
    const VECTOR_DIMENSION = 4; // Matching our dummy data

    it('should have matching metadata and vector counts', () => {
        if (!fs.existsSync(BIN_PATH) || !fs.existsSync(META_PATH)) {
            console.warn('Binary files not found. Skipping test.');
            return;
        }

        const metadata = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
        const stats = fs.statSync(BIN_PATH);

        // Each float32 is 4 bytes
        const expectedBytes = metadata.length * VECTOR_DIMENSION * 4;

        expect(stats.size).toBe(expectedBytes);
    });

    it('should be able to parse vectors correctly', () => {
        if (!fs.existsSync(BIN_PATH)) return;

        const buffer = fs.readFileSync(BIN_PATH);
        const floatView = new Float32Array(buffer.buffer, buffer.byteOffset, buffer.length / 4);

        expect(floatView.length % VECTOR_DIMENSION).toBe(0);

        // Verify first vector if exists
        if (floatView.length >= VECTOR_DIMENSION) {
            const firstVector = floatView.slice(0, VECTOR_DIMENSION);
            // In our dummy data, first vector was [0.1, 0.2, 0.3, 0.4]
            expect(firstVector[0]).toBeCloseTo(0.1);
            expect(firstVector[3]).toBeCloseTo(0.4);
        }
    });
});
