with open("src/components/demos/DemoStorefrontClient.tsx", "r", encoding="utf-8") as f:
    text = f.read()

art_start = "{/* 13. ART CURATOR & INTERACTIVE VECTOR/MATTE STUDIO (Sacred Art & Concept Showcase) */}"
art_end = "          )}\n\n                </div>\n\n                <button"

idx1 = text.find(art_start)
idx2 = text.find(art_end)

if idx1 != -1 and idx2 != -1:
    art_block = text[idx1:idx2 + len("          )}")]
    # remove it from the wrong location
    text = text[:idx1] + text[idx2 + len("          )}\n\n"):]
    print("Extracted art_block from wrong location!")
    
    # Now find the true end of product_benchmarks
    bench_table_end = """                      <td className="py-2 text-zinc-500">1,800ms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}"""
    
    table_idx = text.find(bench_table_end)
    if table_idx != -1:
        insert_pt = table_idx + len(bench_table_end)
        text = text[:insert_pt] + "\n\n          " + art_block + text[insert_pt:]
        print("Inserted art_block at correct position after product_benchmarks!")
    else:
        print("Could not find bench_table_end")
else:
    print(f"Could not find indices: idx1={idx1}, idx2={idx2}")

with open("src/components/demos/DemoStorefrontClient.tsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Saved DemoStorefrontClient.tsx!")
