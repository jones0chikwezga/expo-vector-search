import json
import random
import struct
import os

OUTPUT_METADATA = "./assets/products_metadata.json"
OUTPUT_VECTORS = "./assets/products_vectors.bin"

VECTOR_DIM = 768
COUNT = 100

def generate():
    print(f"🚀 Generating {COUNT} fake products...")
    
    metadata = []
    vector_data = []

    for i in range(COUNT):
        # random vector
        vec = [random.uniform(-1.0, 1.0) for _ in range(VECTOR_DIM)]
        
        # metadata
        m = {
            "id": str(i),
            "name": f"Product {i} (Fake)",
            "image": f"https://picsum.photos/200?random={i}",
            "metadata": {
                "type": "fake"
            }
        }
        
        metadata.append(m)
        vector_data.append(vec)

    # 1. Save binary vectors
    print(f"💾 Saving binary vectors to {OUTPUT_VECTORS}...")
    with open(OUTPUT_VECTORS, 'wb') as f:
        for vec in vector_data:
            f.write(struct.pack(f'{len(vec)}f', *vec))

    # 2. Save metadata JSON
    print(f"💾 Saving metadata to {OUTPUT_METADATA}...")
    with open(OUTPUT_METADATA, 'w') as f:
        json.dump(metadata, f, separators=(',', ':'))

    print("✅ Done! Restart your app to load the new data.")

if __name__ == "__main__":
    generate()
