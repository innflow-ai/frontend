/* biome-ignore-all lint/performance/noImgElement: Supplied SVGs preserve their exact native canvas and mask geometry. */

import styles from "./artwork.module.css";
import { CoverArtwork } from "./cover-artwork";
import { FocusAgent } from "./focus-agent";
import { Easing, interpolate } from "./timeline";

const imgClaudeEditableSvg = "/brand/mcp-agent-orbit/5174b.svg";
const imgGrokbotSuppliedArtwork = "/brand/mcp-agent-orbit/0a166.png";
const imgGlassAgentCodexLoop2Orbit01 = "/brand/mcp-agent-orbit/f1df7.svg";
const imgQuinnAiSharedArtwork = "/brand/mcp-agent-orbit/47010.svg";
const imgCursorEditableSvg = "/brand/mcp-agent-orbit/7ced1.svg";
const imgGlassAgentMuseOrbit01 = "/brand/mcp-agent-orbit/4a6cf.svg";
const imgDevinEditableSvg = "/brand/mcp-agent-orbit/4be58.svg";
const imgGlassAgentCodexLoop2Orbit02 = "/brand/mcp-agent-orbit/94927.svg";
const imgGlassAgentMuseOrbit02 = "/brand/mcp-agent-orbit/70880.svg";
const imgGlassAgentCodexLoop2Orbit03 = "/brand/mcp-agent-orbit/2a987.svg";
const imgGlassAgentMuseOrbit03 = "/brand/mcp-agent-orbit/23502.svg";
const imgGlassAgentCodexLoop2Orbit04 = "/brand/mcp-agent-orbit/22e27.svg";
const imgGlassAgentMuseOrbit04 = "/brand/mcp-agent-orbit/a55e4.svg";
const imgCasingInnerAgentCutoutWithWhiteSurround =
  "/brand/mcp-agent-orbit/d73e6.svg";
const imgGroup5 = "/brand/mcp-agent-orbit/innflow-white.svg";
function InnflowAgentLogoClaude({ className }: { className?: string }) {
  return (
    <div
      className={className || styles["f-reusable-claude"]}
      data-node-id="1185:2514"
      data-name="Innflow / Agent logo / Claude"
    >
      <div
        className={styles.f0}
        data-node-id="1185:2515"
        data-name="Claude / Editable SVG"
      >
        <img alt="" className={styles.f1} src={imgClaudeEditableSvg} />
      </div>
    </div>
  );
}

export function FigmaScene({ frame }: { frame: number }) {
  return (
    <div
      className={`${styles.artwork} ${styles.f2}`}
      data-node-id="1171:3155"
      data-name="Innflow / MCP / 02 / Dock"
    >
      <div
        className={styles.f3}
        data-node-id="1171:3156"
        style={{
          backgroundImage:
            "linear-gradient(181.48699184103754deg, rgb(79, 178, 255) 6.4541%, rgb(105, 187, 255) 18.736%, rgb(176, 229, 255) 32.655%, rgb(174, 233, 241) 49.441%, rgb(122, 204, 237) 67.381%, rgb(33, 132, 207) 84.293%, rgb(0, 64, 119) 98.856%)",
        }}
        data-name="Background / Blue mint waveform"
      />
      <div
        style={{
          position: "absolute",
          left: -574,
          top: 232,
          width: 1920,
          height: 1920,
          transformOrigin: "960px 960px",
          rotate: interpolate(
            frame,
            [0, 48, 174, 183, 198, 228, 264],
            [
              "-10.8948144deg",
              "0.1381815deg",
              "0.1381815deg",
              "1.0772969deg",
              "3.1009913deg",
              "7.632954deg",
              "11.2149203deg",
            ],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.42, 0, 0.58, 1),
            },
          ),
        }}
        data-node-id="1171:3157"
      >
        <div style={{ width: 1920, height: 1920 }}>
          <div
            className={styles.f6}
            data-name="Icon orbit / Continuous rotation"
          >
            <div
              className={styles.f7}
              data-node-id="1171:3158"
              style={{ opacity: frame > 48 && frame < 174 ? 0 : 1 }}
              data-name="Glass agent / Codex / Loop 2 / Orbit 01"
            >
              <div className={styles.f8}>
                <img
                  alt=""
                  className={styles.f9}
                  src={imgGlassAgentCodexLoop2Orbit01}
                />
              </div>
            </div>
            <div className={styles.f10} data-node-id="1171:3160">
              <div className={styles.f11}>
                <div
                  className={styles.f12}
                  data-name="Glass agent / VS Code / Loop 1 / Orbit 01"
                >
                  <div aria-hidden={true} className={styles.f13} />
                  <div
                    style={{
                      position: "relative",
                      width: 68.293,
                      height: 68.293,
                    }}
                    data-node-id="1171:3161"
                  >
                    <img
                      alt=""
                      src={"/brand/mcp-agent-orbit/vscode-original.svg"}
                      style={{
                        position: "absolute",
                        left: -6.3535,
                        top: -6.3535,
                        rotate: "-11.388182deg",
                      }}
                    />
                  </div>
                  <div className={styles.f27} />
                </div>
              </div>
            </div>
            <div className={styles.f28} data-node-id="1171:3173">
              <div className={styles.f29}>
                <div
                  className={styles.f30}
                  data-name="Glass agent / Quinn AI / Loop 2 / Orbit 01"
                >
                  <div aria-hidden={true} className={styles.f31} />
                  <div
                    className={styles.f32}
                    data-node-id="1171:3174"
                    data-name="Quinn AI / Editable logo"
                  >
                    <div
                      className={styles.f33}
                      data-node-id="1231:2564"
                      data-name="Quinn AI / Shared artwork"
                    >
                      <img
                        alt=""
                        className={styles.f34}
                        src={imgQuinnAiSharedArtwork}
                      />
                    </div>
                  </div>
                  <div className={styles.f35} />
                </div>
              </div>
            </div>
            <div className={styles.f36} data-node-id="1171:3176">
              <div className={styles.f37}>
                <div
                  className={styles.f38}
                  data-name="Glass agent / Cursor / Loop 1 / Orbit 01"
                >
                  <div aria-hidden={true} className={styles.f39} />
                  <div
                    className={styles.f40}
                    data-node-id="1171:3177"
                    data-name="Cursor / Editable SVG"
                  >
                    <img
                      alt=""
                      className={styles.f41}
                      src={imgCursorEditableSvg}
                    />
                  </div>
                  <div className={styles.f42} />
                </div>
              </div>
            </div>
            <div className={styles.f43} data-node-id="1171:3183">
              <div className={styles.f44}>
                <div
                  className={styles.f45}
                  data-name="Glass agent / Muse / Orbit 01"
                >
                  <div className={styles.f46}>
                    <img
                      alt=""
                      className={styles.f47}
                      src={imgGlassAgentMuseOrbit01}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.f48} data-node-id="1171:3185">
              <div className={styles.f49}>
                <div
                  className={styles.f50}
                  data-name="Glass agent / Devin / Orbit 01"
                >
                  <div aria-hidden={true} className={styles.f51} />
                  <div
                    className={styles.f52}
                    data-node-id="1171:3186"
                    data-name="Devin / Editable SVG"
                  >
                    <img
                      alt=""
                      className={styles.f53}
                      src={imgDevinEditableSvg}
                    />
                  </div>
                  <div className={styles.f54} />
                </div>
              </div>
            </div>
            <div className={styles.f55} data-node-id="1171:3188">
              <div className={styles.f56}>
                <div
                  className={styles.f57}
                  data-name="Glass agent / Grokbot / Orbit 01"
                >
                  <div aria-hidden={true} className={styles.f58} />
                  <div
                    className={styles.f59}
                    data-node-id="1171:3189"
                    data-name="Grokbot / Supplied artwork"
                  >
                    <img
                      alt=""
                      className={styles.f60}
                      src={imgGrokbotSuppliedArtwork}
                    />
                  </div>
                  <div className={styles.f61} />
                </div>
              </div>
            </div>
            <div className={styles.f62} data-node-id="1171:3190">
              <div className={styles.f63}>
                <div
                  className={styles.f64}
                  data-name="Glass agent / Claude / Orbit 01"
                >
                  <div aria-hidden={true} className={styles.f65} />
                  <InnflowAgentLogoClaude className={styles.f66} />
                  <div className={styles.f67} />
                </div>
              </div>
            </div>
            <div className={styles.f68} data-node-id="1171:3195">
              <div className={styles.f69}>
                <div
                  className={styles.f70}
                  data-name="Glass agent / Codex / Loop 2 / Orbit 02"
                >
                  <div className={styles.f71}>
                    <img
                      alt=""
                      className={styles.f72}
                      src={imgGlassAgentCodexLoop2Orbit02}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.f73} data-node-id="1171:3197">
              <div className={styles.f74}>
                <div
                  className={styles.f75}
                  data-name="Glass agent / VS Code / Loop 1 / Orbit 02"
                >
                  <div aria-hidden={true} className={styles.f76} />
                  <div
                    style={{
                      position: "relative",
                      width: 68.293,
                      height: 68.293,
                    }}
                    data-node-id="1171:3198"
                  >
                    <img
                      alt=""
                      src={"/brand/mcp-agent-orbit/vscode-original.svg"}
                      style={{
                        position: "absolute",
                        left: -6.3535,
                        top: -6.3535,
                        rotate: "-11.388182deg",
                      }}
                    />
                  </div>
                  <div className={styles.f90} />
                </div>
              </div>
            </div>
            <div className={styles.f91} data-node-id="1171:3210">
              <div className={styles.f92}>
                <div
                  className={styles.f93}
                  data-name="Glass agent / Quinn AI / Loop 2 / Orbit 02"
                >
                  <div aria-hidden={true} className={styles.f94} />
                  <div
                    className={styles.f95}
                    data-node-id="1171:3211"
                    data-name="Quinn AI / Editable logo"
                  >
                    <div
                      className={styles.f96}
                      data-node-id="1231:2569"
                      data-name="Quinn AI / Shared artwork"
                    >
                      <img
                        alt=""
                        className={styles.f97}
                        src={imgQuinnAiSharedArtwork}
                      />
                    </div>
                  </div>
                  <div className={styles.f98} />
                </div>
              </div>
            </div>
            <div className={styles.f99} data-node-id="1171:3213">
              <div className={styles.f100}>
                <div
                  className={styles.f101}
                  data-name="Glass agent / Cursor / Loop 1 / Orbit 02"
                >
                  <div aria-hidden={true} className={styles.f102} />
                  <div
                    className={styles.f103}
                    data-node-id="1171:3214"
                    data-name="Cursor / Editable SVG"
                  >
                    <img
                      alt=""
                      className={styles.f104}
                      src={imgCursorEditableSvg}
                    />
                  </div>
                  <div className={styles.f105} />
                </div>
              </div>
            </div>
            <div className={styles.f106} data-node-id="1171:3220">
              <div className={styles.f107}>
                <div
                  className={styles.f108}
                  data-name="Glass agent / Muse / Orbit 02"
                >
                  <div className={styles.f109}>
                    <img
                      alt=""
                      className={styles.f110}
                      src={imgGlassAgentMuseOrbit02}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.f111} data-node-id="1171:3222">
              <div className={styles.f112}>
                <div
                  className={styles.f113}
                  data-name="Glass agent / Devin / Orbit 02"
                >
                  <div aria-hidden={true} className={styles.f114} />
                  <div
                    className={styles.f115}
                    data-node-id="1171:3223"
                    data-name="Devin / Editable SVG"
                  >
                    <img
                      alt=""
                      className={styles.f116}
                      src={imgDevinEditableSvg}
                    />
                  </div>
                  <div className={styles.f117} />
                </div>
              </div>
            </div>
            <div className={styles.f118} data-node-id="1171:3225">
              <div className={styles.f119}>
                <div
                  className={styles.f120}
                  data-name="Glass agent / Grokbot / Orbit 02"
                >
                  <div aria-hidden={true} className={styles.f121} />
                  <div
                    className={styles.f122}
                    data-node-id="1171:3226"
                    data-name="Grokbot / Supplied artwork"
                  >
                    <img
                      alt=""
                      className={styles.f123}
                      src={imgGrokbotSuppliedArtwork}
                    />
                  </div>
                  <div className={styles.f124} />
                </div>
              </div>
            </div>
            <div className={styles.f125} data-node-id="1171:3227">
              <div className={styles.f126}>
                <div
                  className={styles.f127}
                  data-name="Glass agent / Claude / Orbit 02"
                >
                  <div aria-hidden={true} className={styles.f128} />
                  <InnflowAgentLogoClaude className={styles.f129} />
                  <div className={styles.f130} />
                </div>
              </div>
            </div>
            <div className={styles.f131} data-node-id="1171:3232">
              <div className={styles.f132}>
                <div
                  className={styles.f133}
                  data-name="Glass agent / Codex / Loop 2 / Orbit 03"
                >
                  <div className={styles.f134}>
                    <img
                      alt=""
                      className={styles.f135}
                      src={imgGlassAgentCodexLoop2Orbit03}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.f136} data-node-id="1171:3234">
              <div className={styles.f137}>
                <div
                  className={styles.f138}
                  data-name="Glass agent / VS Code / Loop 1 / Orbit 03"
                >
                  <div aria-hidden={true} className={styles.f139} />
                  <div
                    style={{
                      position: "relative",
                      width: 68.293,
                      height: 68.293,
                    }}
                    data-node-id="1171:3235"
                  >
                    <img
                      alt=""
                      src={"/brand/mcp-agent-orbit/vscode-original.svg"}
                      style={{
                        position: "absolute",
                        left: -6.3535,
                        top: -6.3535,
                        rotate: "-11.388182deg",
                      }}
                    />
                  </div>
                  <div className={styles.f153} />
                </div>
              </div>
            </div>
            <div className={styles.f154} data-node-id="1171:3247">
              <div className={styles.f155}>
                <div
                  className={styles.f156}
                  data-name="Glass agent / Quinn AI / Loop 2 / Orbit 03"
                >
                  <div aria-hidden={true} className={styles.f157} />
                  <div
                    className={styles.f158}
                    data-node-id="1171:3248"
                    data-name="Quinn AI / Editable logo"
                  >
                    <div
                      className={styles.f159}
                      data-node-id="1231:2574"
                      data-name="Quinn AI / Shared artwork"
                    >
                      <img
                        alt=""
                        className={styles.f160}
                        src={imgQuinnAiSharedArtwork}
                      />
                    </div>
                  </div>
                  <div className={styles.f161} />
                </div>
              </div>
            </div>
            <div className={styles.f162} data-node-id="1171:3250">
              <div className={styles.f163}>
                <div
                  className={styles.f164}
                  data-name="Glass agent / Cursor / Loop 1 / Orbit 03"
                >
                  <div aria-hidden={true} className={styles.f165} />
                  <div
                    className={styles.f166}
                    data-node-id="1171:3251"
                    data-name="Cursor / Editable SVG"
                  >
                    <img
                      alt=""
                      className={styles.f167}
                      src={imgCursorEditableSvg}
                    />
                  </div>
                  <div className={styles.f168} />
                </div>
              </div>
            </div>
            <div className={styles.f169} data-node-id="1171:3257">
              <div className={styles.f170}>
                <div
                  className={styles.f171}
                  data-name="Glass agent / Muse / Orbit 03"
                >
                  <div className={styles.f172}>
                    <img
                      alt=""
                      className={styles.f173}
                      src={imgGlassAgentMuseOrbit03}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.f174} data-node-id="1171:3259">
              <div className={styles.f175}>
                <div
                  className={styles.f176}
                  data-name="Glass agent / Devin / Orbit 03"
                >
                  <div aria-hidden={true} className={styles.f177} />
                  <div
                    className={styles.f178}
                    data-node-id="1171:3260"
                    data-name="Devin / Editable SVG"
                  >
                    <img
                      alt=""
                      className={styles.f179}
                      src={imgDevinEditableSvg}
                    />
                  </div>
                  <div className={styles.f180} />
                </div>
              </div>
            </div>
            <div className={styles.f181} data-node-id="1171:3262">
              <div className={styles.f182}>
                <div
                  className={styles.f183}
                  data-name="Glass agent / Grokbot / Orbit 03"
                >
                  <div aria-hidden={true} className={styles.f184} />
                  <div
                    className={styles.f185}
                    data-node-id="1171:3263"
                    data-name="Grokbot / Supplied artwork"
                  >
                    <img
                      alt=""
                      className={styles.f186}
                      src={imgGrokbotSuppliedArtwork}
                    />
                  </div>
                  <div className={styles.f187} />
                </div>
              </div>
            </div>
            <div className={styles.f188} data-node-id="1171:3264">
              <div className={styles.f189}>
                <div
                  className={styles.f190}
                  data-name="Glass agent / Claude / Orbit 03"
                >
                  <div aria-hidden={true} className={styles.f191} />
                  <InnflowAgentLogoClaude className={styles.f192} />
                  <div className={styles.f193} />
                </div>
              </div>
            </div>
            <div className={styles.f194} data-node-id="1171:3269">
              <div className={styles.f195}>
                <div
                  className={styles.f196}
                  data-name="Glass agent / Codex / Loop 2 / Orbit 04"
                >
                  <div className={styles.f197}>
                    <img
                      alt=""
                      className={styles.f198}
                      src={imgGlassAgentCodexLoop2Orbit04}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.f199} data-node-id="1171:3271">
              <div className={styles.f200}>
                <div
                  className={styles.f201}
                  data-name="Glass agent / VS Code / Loop 1 / Orbit 04"
                >
                  <div aria-hidden={true} className={styles.f202} />
                  <div
                    style={{
                      position: "relative",
                      width: 68.293,
                      height: 68.293,
                    }}
                    data-node-id="1171:3272"
                  >
                    <img
                      alt=""
                      src={"/brand/mcp-agent-orbit/vscode-original.svg"}
                      style={{
                        position: "absolute",
                        left: -6.3535,
                        top: -6.3535,
                        rotate: "-11.388182deg",
                      }}
                    />
                  </div>
                  <div className={styles.f216} />
                </div>
              </div>
            </div>
            <div className={styles.f217} data-node-id="1171:3284">
              <div className={styles.f218}>
                <div
                  className={styles.f219}
                  data-name="Glass agent / Quinn AI / Loop 2 / Orbit 04"
                >
                  <div aria-hidden={true} className={styles.f220} />
                  <div
                    className={styles.f221}
                    data-node-id="1171:3285"
                    data-name="Quinn AI / Editable logo"
                  >
                    <div
                      className={styles.f222}
                      data-node-id="1231:2579"
                      data-name="Quinn AI / Shared artwork"
                    >
                      <img
                        alt=""
                        className={styles.f223}
                        src={imgQuinnAiSharedArtwork}
                      />
                    </div>
                  </div>
                  <div className={styles.f224} />
                </div>
              </div>
            </div>
            <div className={styles.f225} data-node-id="1171:3287">
              <div className={styles.f226}>
                <div
                  className={styles.f227}
                  data-name="Glass agent / Cursor / Loop 1 / Orbit 04"
                >
                  <div aria-hidden={true} className={styles.f228} />
                  <div
                    className={styles.f229}
                    data-node-id="1171:3288"
                    data-name="Cursor / Editable SVG"
                  >
                    <img
                      alt=""
                      className={styles.f230}
                      src={imgCursorEditableSvg}
                    />
                  </div>
                  <div className={styles.f231} />
                </div>
              </div>
            </div>
            <div className={styles.f232} data-node-id="1171:3294">
              <div className={styles.f233}>
                <div
                  className={styles.f234}
                  data-name="Glass agent / Muse / Orbit 04"
                >
                  <div className={styles.f235}>
                    <img
                      alt=""
                      className={styles.f236}
                      src={imgGlassAgentMuseOrbit04}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.f237} data-node-id="1171:3296">
              <div className={styles.f238}>
                <div
                  className={styles.f239}
                  data-name="Glass agent / Devin / Orbit 04"
                >
                  <div aria-hidden={true} className={styles.f240} />
                  <div
                    className={styles.f241}
                    data-node-id="1171:3297"
                    data-name="Devin / Editable SVG"
                  >
                    <img
                      alt=""
                      className={styles.f242}
                      src={imgDevinEditableSvg}
                    />
                  </div>
                  <div className={styles.f243} />
                </div>
              </div>
            </div>
            <div className={styles.f244} data-node-id="1171:3299">
              <div className={styles.f245}>
                <div
                  className={styles.f246}
                  data-name="Glass agent / Grokbot / Orbit 04"
                >
                  <div aria-hidden={true} className={styles.f247} />
                  <div
                    className={styles.f248}
                    data-node-id="1171:3300"
                    data-name="Grokbot / Supplied artwork"
                  >
                    <img
                      alt=""
                      className={styles.f249}
                      src={imgGrokbotSuppliedArtwork}
                    />
                  </div>
                  <div className={styles.f250} />
                </div>
              </div>
            </div>
            <div className={styles.f251} data-node-id="1171:3301">
              <div className={styles.f252}>
                <div
                  className={styles.f253}
                  data-name="Glass agent / Claude / Orbit 04"
                >
                  <div aria-hidden={true} className={styles.f254} />
                  <InnflowAgentLogoClaude className={styles.f255} />
                  <div className={styles.f256} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {frame < 75 && <FocusAgent frame={frame} />}
      <div
        className={styles.f257}
        data-node-id="1171:3311"
        data-name="Agent group shell"
      >
        <div
          className={styles.f258}
          data-node-id="1171:3312"
          data-name="Casing / Inner agent cutout with white surround"
        >
          <div className={styles.f259}>
            <img
              alt=""
              className={styles.f260}
              src={imgCasingInnerAgentCutoutWithWhiteSurround}
            />
          </div>
        </div>
        <div
          className={styles.f261}
          data-node-id="1171:3313"
          data-name="Upper / Blue border with white surround"
        >
          <div
            className={styles.f262}
            data-node-id="1171:3314"
            data-name="Inset / Transparent agent cutout"
          />
        </div>
        <div
          className={styles.f263}
          data-node-id="1171:3320"
          data-name="Lower / Brand tile"
        >
          <div
            className={styles.f264}
            data-node-id="1171:3321"
            data-name="Blue gradient tile face"
          >
            <div
              className={styles.f265}
              data-node-id="1171:3322"
              data-name="Group"
            >
              <img alt="" className={styles.f266} src={imgGroup5} />
            </div>
          </div>
        </div>
      </div>
      {frame >= 75 && <FocusAgent frame={frame} />}
      <div
        style={{
          position: "absolute",
          left: 320.94,
          top: 249.45,
          width: 130,
          height: interpolate(
            frame,
            [0, 48, 174, 183, 198, 228, 264],
            [76, 0, 0, 71, 102, 140, 80],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.42, 0, 0.58, 1),
            },
          ),
          overflow: "hidden",
          maxHeight: 130,
          borderRadius: 18.416,
        }}
      >
        <div style={{ width: 130, height: 140 }}>
          <CoverArtwork />
        </div>
      </div>
    </div>
  );
}
