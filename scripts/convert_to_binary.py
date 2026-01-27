import json
import struct
import os

INPUT_FILE = "./assets/products_vectors.json"
OUTPUT_METADATA = "./assets/products_metadata.json"
OUTPUT_VECTORS = "./assets/products_vectors.bin"

def convert():
    if not os.path.exists(INPUT_FILE):
        print(f"❌ {INPUT_FILE} not found. Run download script first.")
        return

    print(f"🚀 Loading {INPUT_FILE}...")
    with open(INPUT_FILE, 'r') as f:
        data = json.load(f)

    metadata = []
    vectors = []

    print("🔄 Processing items...")
    for item in data:
        vec = item.get("vector")
        if not vec or not isinstance(vec, list) or len(vec) == 0:
            continue
            
        # Save metadata without vector
        m = {
            "id": item["id"],
            "name": item["name"],
            "image": item["image"],
            "metadata": item["metadata"]
        }
        metadata.append(m)
        vectors.append(vec)

    # 1. Save binary vectors
    print(f"💾 Saving vectors to {OUTPUT_VECTORS}...")
    with open(OUTPUT_VECTORS, 'wb') as f:
        for vec in vectors:
            # 'f' is for 32-bit float
            f.write(struct.pack(f'{len(vec)}f', *vec))

    # 2. Save metadata JSON
    print(f"💾 Saving metadata to {OUTPUT_METADATA}...")
    with open(OUTPUT_METADATA, 'pretty' if False else 'w') as f:
        json.dump(metadata, f, separators=(',', ':'))

    print("\n🎉 Success!")
    print(f"📊 Summary:")
    print(f"   - Items: {len(vectors)}")
    print(f"   - Dimensions: {len(vectors[0]) if vectors else 0}")
    print(f"   - Binary size: {os.path.getsize(OUTPUT_VECTORS) / 1024 / 1024:.2f} MB")
    print(f"   - Metadata size: {os.path.getsize(OUTPUT_METADATA) / 1024 / 1024:.2f} MB")
    print(f"   - VS Original JSON: {os.path.getsize(INPUT_FILE) / 1024 / 1024:.2f} MB")

if __name__ == "__main__":
    convert()
