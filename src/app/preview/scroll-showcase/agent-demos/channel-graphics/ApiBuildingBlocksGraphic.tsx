import Image from "next/image";
import styles from "./channel-graphics.module.css";

const imgConnection = "/preview/homepage/channel-graphics/7-f1e37.svg";

export function ApiBuildingBlocksGraphic() {
  return (
    <div
      className={styles.canvas}
      data-node-id="1048:11717"
      data-name="Innflow / Communication / 07 / Flexible, API-first building blocks"
    >
      <div
        className={styles.layer134}
        data-node-id="1048:2053"
        data-name="API request / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer135}
        data-node-id="1048:2054"
        data-name="API request"
      >
        <p className={styles.layer127} data-node-id="1048:2055">
          Connect your own tools
        </p>
        <p
          className={styles.layer136}
          data-node-id="1048:2056"
        >{`POST   /workflow/run`}</p>
        <div className={styles.layer137} data-node-id="1048:2057">
          <p className={styles.layer72}>{`{`}</p>
          <p
            className={styles.layer72}
          >{`  "request": "customer-follow-up",`}</p>
          <p className={styles.layer72}>{`  "context": "conversation",`}</p>
          <p className={styles.layer72}>{`  "review": "required"`}</p>
          <p className={styles.layer73}>{`}`}</p>
        </div>
      </div>
      <div
        className={styles.layer62}
        data-node-id="1048:2058"
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
        className={styles.layer138}
        data-node-id="1048:2060"
        data-name="Structured response / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer139}
        data-node-id="1048:2061"
        data-name="Structured response"
      >
        <p className={styles.layer140} data-node-id="1048:2062">
          A clear result for the next step
        </p>
        <div className={styles.layer129} data-node-id="1048:2063">
          <p className={styles.layer72}>Context attached</p>
          <p className={styles.layer72}>Owner assigned</p>
          <p className={styles.layer73}>Ready for team review</p>
        </div>
      </div>
      <div
        className={styles.layer141}
        data-node-id="1048:2064"
        data-name="CRM"
      />
      <p className={styles.layer142} data-node-id="1048:2065">
        CRM
      </p>
      <div
        className={styles.layer143}
        data-node-id="1048:2066"
        data-name="Your API"
      />
      <p className={styles.layer144} data-node-id="1048:2067">
        Your API
      </p>
      <div
        className={styles.layer145}
        data-node-id="1048:2068"
        data-name="Team tools"
      />
      <p className={styles.layer146} data-node-id="1048:2069">
        Team tools
      </p>
      <div
        className={styles.layer147}
        data-node-id="1048:2070"
        data-name="Illustrative API workflow"
      />
      <p className={styles.layer148} data-node-id="1048:2071">
        Illustrative API workflow
      </p>
    </div>
  );
}
