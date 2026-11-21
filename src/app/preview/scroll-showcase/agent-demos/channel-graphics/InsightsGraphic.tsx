import Image from "next/image";
import styles from "./channel-graphics.module.css";

const imgConnection = "/preview/homepage/channel-graphics/6-e1285.svg";

export function InsightsGraphic() {
  return (
    <div
      className={styles.canvas}
      data-node-id="1048:11716"
      data-name="Innflow / Communication / 06 / Insights from every interaction"
    >
      <div
        className={styles.layer121}
        data-node-id="1048:2027"
        data-name="Related feedback / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer122}
        data-node-id="1048:2028"
        data-name="Related feedback"
      >
        <p className={styles.layer123} data-node-id="1048:2029">
          Across your conversations
        </p>
        <p className={styles.layer124} data-node-id="1048:2030">
          “Where do I start with setup?”
        </p>
        <p className={styles.layer124} data-node-id="1048:2031">
          “Can someone walk me through this?”
        </p>
        <p className={styles.layer124} data-node-id="1048:2032">
          “Which step should I complete next?”
        </p>
      </div>
      <div
        className={styles.layer62}
        data-node-id="1048:2033"
        data-name="Connection"
      >
        <Image
          fill
          unoptimized
          sizes="580px"
          alt=""
          className={styles.layer20}
          src={imgConnection}
        />
      </div>
      <div
        className={styles.layer125}
        data-node-id="1048:2035"
        data-name="Recurring theme / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer126}
        data-node-id="1048:2036"
        data-name="Recurring theme"
      >
        <p className={styles.layer127} data-node-id="1048:2037">
          A shared theme emerges
        </p>
        <p className={styles.layer128} data-node-id="1048:2038">
          Getting started
        </p>
        <div className={styles.layer129} data-node-id="1048:2039">
          <p className={styles.layer72}>
            Related setup questions, grouped with
          </p>
          <p className={styles.layer73}>the original conversations attached.</p>
        </div>
      </div>
      <div
        className={styles.layer130}
        data-node-id="1048:2040"
        data-name="Review conversations"
      />
      <p className={styles.layer131} data-node-id="1048:2041">
        Review conversations
      </p>
      <div
        className={styles.layer132}
        data-node-id="1048:2042"
        data-name="3 related conversations"
      />
      <p className={styles.layer133} data-node-id="1048:2043">
        3 related conversations
      </p>
    </div>
  );
}
