/* biome-ignore-all lint/performance/noImgElement: Supplied SVGs preserve their exact native canvas and mask geometry. */
import styles from "./artwork.module.css";

const imgPanelFastener = "/brand/mcp-agent-orbit/f3642.svg";

export function CoverArtwork() {
  return (
    <div
      className={styles.f267}
      data-node-id="1171:5646"
      data-name="Inset panel"
    >
      <div className={styles.f268} data-node-id="1171:5647">
        <p className={styles.f269}>YOUR</p>
        <p className={styles.f270}>AGENT</p>
        <p className={styles.f271}>HERE</p>
      </div>
      <div
        className={styles.f272}
        data-node-id="1171:5648"
        data-name="Panel fastener"
      >
        <img alt="" className={styles.f273} src={imgPanelFastener} />
      </div>
      <div
        className={styles.f274}
        data-node-id="1171:5649"
        data-name="Panel fastener"
      >
        <img alt="" className={styles.f275} src={imgPanelFastener} />
      </div>
      <div
        className={styles.f276}
        data-node-id="1171:5650"
        data-name="Panel fastener"
      >
        <img alt="" className={styles.f277} src={imgPanelFastener} />
      </div>
      <div
        className={styles.f278}
        data-node-id="1171:5651"
        data-name="Panel fastener"
      >
        <img alt="" className={styles.f279} src={imgPanelFastener} />
      </div>
    </div>
  );
}
