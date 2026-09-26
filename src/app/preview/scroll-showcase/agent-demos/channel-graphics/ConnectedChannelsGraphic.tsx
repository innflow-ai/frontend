import Image from "next/image";
import styles from "./channel-graphics.module.css";

const imgConnection = "/preview/homepage/channel-graphics/2-a559f.svg";

export function ConnectedChannelsGraphic() {
  return (
    <div
      className={styles.canvas}
      data-node-id="1048:11712"
      data-name="Innflow / Communication / 02 / All your channels, connected"
    >
      <div
        className={styles.layer49}
        data-node-id="1047:2013"
        data-name="Connected inbox / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer50}
        data-node-id="1047:2014"
        data-name="Connected inbox"
      >
        <p className={styles.layer51} data-node-id="1047:2015">
          Team inbox
        </p>
        <p className={styles.layer52} data-node-id="1047:2016">
          Every conversation. The context beside it.
        </p>
        <div
          className={styles.layer53}
          data-node-id="1047:2017"
          data-name="Email / Conversation"
        >
          <p
            className={styles.layer54}
            data-node-id="1047:2018"
          >{`Email  ·  Maya Chen · Scheduling`}</p>
          <p className={styles.layer55} data-node-id="1047:2019">
            Could we move our meeting?
          </p>
        </div>
        <div
          className={styles.layer53}
          data-node-id="1047:2020"
          data-name="Live chat / Conversation"
        >
          <p
            className={styles.layer54}
            data-node-id="1047:2021"
          >{`Live chat  ·  Jordan Lee · Support`}</p>
          <p className={styles.layer55} data-node-id="1047:2022">
            I need help accessing my account.
          </p>
        </div>
        <div
          className={styles.layer53}
          data-node-id="1047:2023"
          data-name="Slack / Conversation"
        >
          <p
            className={styles.layer54}
            data-node-id="1047:2024"
          >{`Slack  ·  Operations · Internal handoff`}</p>
          <p className={styles.layer55} data-node-id="1047:2025">
            The customer approved the next step.
          </p>
        </div>
      </div>
      <div
        className={styles.layer56}
        data-node-id="1047:2026"
        data-name="Email"
      />
      <p className={styles.layer57} data-node-id="1047:2027">
        Email
      </p>
      <div
        className={styles.layer58}
        data-node-id="1047:2028"
        data-name="Live chat"
      />
      <p className={styles.layer59} data-node-id="1047:2029">
        Live chat
      </p>
      <div
        className={styles.layer60}
        data-node-id="1047:2030"
        data-name="Slack"
      />
      <p className={styles.layer61} data-node-id="1047:2031">
        Slack
      </p>
      <div
        className={styles.layer62}
        data-node-id="1047:2032"
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
        className={styles.layer63}
        data-node-id="1047:2034"
        data-name="Customer context attached"
      />
      <p className={styles.layer64} data-node-id="1047:2035">
        Customer context attached
      </p>
    </div>
  );
}
