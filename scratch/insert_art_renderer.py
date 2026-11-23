with open("src/components/demos/DemoStorefrontClient.tsx", "r", encoding="utf-8") as f:
    client_code = f.read()

# Check if art states exist, if not add them near other states (around line 210)
art_state_block = """  // Art Curator Studio interactive states
  const [activeArtPresetIndex, setActiveArtPresetIndex] = useState<number>(0);
  const [activeArtZoom, setActiveArtZoom] = useState<number>(1);
  const [isArtAudioPlaying, setIsArtAudioPlaying] = useState<boolean>(false);
  const [disabledArtLayers, setDisabledArtLayers] = useState<string[]>([]);
"""

state_insertion_target = "  const [secondsLeft, setSecondsLeft] = useState<number>(712); // ~11m 52s"

if state_insertion_target in client_code and "activeArtPresetIndex" not in client_code:
    client_code = client_code.replace(state_insertion_target, art_state_block + "\n" + state_insertion_target)
    print("Added art interactive state variables!")
else:
    print("Art state variables already present or insertion target missing")

# Add art_curator_studio interactive renderer
art_module_jsx = """
          {/* 13. ART CURATOR & INTERACTIVE VECTOR/MATTE STUDIO (Sacred Art & Concept Showcase) */}
          {config.interactiveType === "art_curator_studio" && (
            <div className="rounded-3xl p-5 sm:p-8 bg-zinc-950/90 border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.08)] space-y-6">
              {/* Studio Header & Architectural Meta */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold">
                      INTERACTIVE MASTER ART ATELIER · 300 DPI VECTOR &amp; MATTE ENGINE
                    </span>
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                    {config.interactiveData?.title || "Master Digital Artwork & Concept Studio"}
                  </h3>
                </div>

                {/* Vector / Matte Spec Badges */}
                {config.interactiveData?.artVectorSpecs && (
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-zinc-300">
                      📐 {config.interactiveData.artVectorSpecs.resolution}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-zinc-300">
                      🎨 {config.interactiveData.artVectorSpecs.colorSpace}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                      ⚡ {config.interactiveData.artVectorSpecs.layersCount} Master Layers
                    </span>
                  </div>
                )}
              </div>

              {/* Main Interactive Artwork Canvas with Dynamic Zoom & Shader Filters */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-black/80 flex items-center justify-center p-3 sm:p-6 min-h-[380px] sm:min-h-[500px]">
                {/* Ambient Generative Shader Glow Backdrop */}
                <div
                  className="absolute inset-0 blur-3xl opacity-25 pointer-events-none transition-all duration-700"
                  style={{
                    backgroundColor:
                      config.interactiveData?.artPresets?.[activeArtPresetIndex]?.glow || "#f59e0b",
                  }}
                />

                {/* Scaled & Filtered Canvas Image */}
                <div className="relative overflow-hidden rounded-xl max-w-full max-h-[550px] flex items-center justify-center">
                  <img
                    src={config.interactiveData?.artworkMasterImage || config.products[0]?.image}
                    alt={config.brandName}
                    style={{
                      transform: `scale(${activeArtZoom})`,
                      filter:
                        config.interactiveData?.artPresets?.[activeArtPresetIndex]?.filter || "none",
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease",
                    }}
                    className="max-w-full max-h-[500px] object-contain rounded-lg shadow-2xl select-none"
                    draggable={false}
                  />
                </div>

                {/* Floating Canvas Quick-Controls Bar (Zoom, Sound, Reset) */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  <div className="flex items-center rounded-xl bg-black/80 backdrop-blur-md border border-white/20 p-1 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPluck(130);
                        setActiveArtZoom((z) => (z === 1 ? 1.5 : z === 1.5 ? 2.2 : 1));
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white hover:text-black transition-all text-white font-bold flex items-center gap-1 cursor-pointer"
                      title="Cycle Zoom Levels (1x, 1.5x, 2.2x)"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{activeArtZoom}× Zoom</span>
                    </button>
                    {activeArtZoom !== 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          sound.playPluck(90);
                          setActiveArtZoom(1);
                        }}
                        className="px-2 py-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title="Reset Zoom to 100%"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  {/* Ambient Audio Toggle */}
                  {config.interactiveData?.artAudioAmbience && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPluck(isArtAudioPlaying ? 110 : 220);
                        setIsArtAudioPlaying(!isArtAudioPlaying);
                        showToast(
                          isArtAudioPlaying
                            ? "Atmospheric ambience paused"
                            : `Now Playing: ${config.interactiveData?.artAudioAmbience}`
                        );
                      }}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 backdrop-blur-md border transition-all cursor-pointer ${
                        isArtAudioPlaying
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)] font-bold"
                          : "bg-black/80 text-zinc-300 border-white/20 hover:text-white"
                      }`}
                      title="Toggle Meditative Ambient Soundscape"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {isArtAudioPlaying ? "Ambience ON" : "Ambient Sound"}
                      </span>
                    </button>
                  )}
                </div>

                {/* Canvas Bottom Watermark Strip */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-zinc-400 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  <span className="truncate">
                    DESI MUCHADS ATELIER · {config.brandName.toUpperCase()}
                  </span>
                  <span className="hidden sm:inline text-emerald-400 font-bold">
                    ● AUTHENTICATED MASTER ASSET
                  </span>
                </div>
              </div>

              {/* Multi-Angle Interactive Control Decks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Deck A: Color Grading & Atmospheric Shaders */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                      Color Grading &amp; Shader Mood
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Preset {activeArtPresetIndex + 1} of{" "}
                      {config.interactiveData?.artPresets?.length || 4}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {config.interactiveData?.artPresets?.map((pr, pIdx) => {
                      const isSelected = activeArtPresetIndex === pIdx;
                      return (
                        <button
                          key={pr.id}
                          type="button"
                          onClick={() => {
                            sound.playPluck(150 + pIdx * 25);
                            setActiveArtPresetIndex(pIdx);
                            showToast(`Color grade applied: ${pr.name}`);
                          }}
                          className={`p-2.5 rounded-xl text-left transition-all border text-xs font-mono flex items-center justify-between gap-2 cursor-pointer ${
                            isSelected
                              ? "bg-white/15 border-white text-white font-bold shadow-md"
                              : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08]"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: pr.glow }}
                            />
                            <span className="truncate">{pr.name}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Deck B: Production Layer Architecture Breakdown */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold">
                      Vector &amp; Matte Layer Architecture
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">Click to Inspect</span>
                  </div>
                  <div className="space-y-2">
                    {config.interactiveData?.artLayers?.map((layer) => {
                      const isDisabled = disabledArtLayers.includes(layer.id);
                      return (
                        <div
                          key={layer.id}
                          onClick={() => {
                            sound.playPluck(140);
                            setDisabledArtLayers((prev) =>
                              prev.includes(layer.id)
                                ? prev.filter((id) => id !== layer.id)
                                : [...prev, layer.id]
                            );
                          }}
                          className={`p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs font-mono cursor-pointer ${
                            isDisabled
                              ? "bg-black/50 border-white/5 text-zinc-500 opacity-60"
                              : "bg-white/[0.02] border-white/10 text-zinc-300 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <div>
                            <span className="font-bold block text-white">{layer.name}</span>
                            <span className="text-[10px] text-zinc-400 font-sans">{layer.desc}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[9.5px] uppercase font-bold shrink-0 ml-2 ${
                              isDisabled
                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            }`}
                          >
                            {isDisabled ? "Hidden" : layer.tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Direct Purchase & Archival Acquisition Quick Strip */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest font-bold block">
                    LIMITED COLLECTOR EDITIONS &amp; COMMERCIAL LICENSES
                  </span>
                  <h4 className="font-display font-black text-base sm:text-lg text-white uppercase">
                    Acquire Physical Museum Canvas or Scalable Vector License
                  </h4>
                  <p className="text-xs text-zinc-300 font-sans mt-0.5">
                    Printed on archival cotton rag / Awagami washi, or instant lossless commercial vector source download.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (config.products[0]) {
                        handleAddToCart(config.products[0]);
                        setIsCartOpen(true);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-display font-black text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Acquire Edition ({formatPrice(config.products[0]?.price || 6499)})
                  </button>
                </div>
              </div>
            </div>
          )}
"""

target_end_benchmarks = '          {config.interactiveType === "product_benchmarks" && ('

if target_end_benchmarks in client_code:
    # Find closing of benchmarks
    bench_idx = client_code.find(target_end_benchmarks)
    # Find next closing of block
    close_idx = client_code.find("          )}", bench_idx)
    if close_idx != -1:
        insert_point = close_idx + len("          )}")
        client_code = client_code[:insert_point] + "\n" + art_module_jsx + client_code[insert_point:]
        print("Successfully inserted art_curator_studio renderer into DemoStorefrontClient.tsx!")
    else:
        print("Could not find closing of benchmarks block")
else:
    print("Could not find benchmarks start")

with open("src/components/demos/DemoStorefrontClient.tsx", "w", encoding="utf-8") as f:
    f.write(client_code)

print("Updated DemoStorefrontClient.tsx!")
