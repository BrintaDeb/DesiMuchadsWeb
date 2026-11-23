with open("src/data/demoProductsData.ts", "r", encoding="utf-8") as f:
    text = f.read()

# Replace unescaped inch quotes in strings
text = text.replace('Print (24" × 24"', 'Print (24\\" × 24\\"')
text = text.replace('(A2 - 16.5" × 23.4"', '(A2 - 16.5\\" × 23.4\\"')
text = text.replace('Print (36" × 24"', 'Print (36\\" × 24\\"')
text = text.replace('Canvas (48" × 24"', 'Canvas (48\\" × 24\\"')
text = text.replace('large 48" canvas', 'large 48\\" canvas')

with open("src/data/demoProductsData.ts", "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed unescaped quotes in demoProductsData.ts!")
