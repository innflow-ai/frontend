import Image from "next/image";
import styles from "./channel-graphics.module.css";

const imgConnection = "/preview/homepage/channel-graphics/4-8a4cc.svg";
const imgInnflowAiAgent = "/preview/homepage/channel-graphics/4-19ffe.svg";

export function AgentsTogetherGraphic() {
  return (
    <div
      className={styles.canvas}
      data-node-id="1048:11714"
      data-name="Innflow / Communication / 04 / AI agents, working together"
    >
      <div
        className={styles.layer85}
        data-node-id="1048:1947"
        data-name="Shared task brief / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer86}
        data-node-id="1048:1948"
        data-name="Shared task brief"
      >
        <p className={styles.layer87} data-node-id="1048:1949">
          Prepare the customer follow-up
        </p>
        <p className={styles.layer48} data-node-id="1048:1950">
          One request · Shared context · Clear instructions
        </p>
      </div>
      <div
        className={styles.layer62}
        data-node-id="1048:1951"
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
        className={styles.layer88}
        data-node-id="1048:1953"
        data-name="Research agent / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer89}
        data-node-id="1048:1954"
        data-name="Research agent"
      >
        <p className={styles.layer47} data-node-id="1048:1955">
          Research
        </p>
        <div className={styles.layer90} data-node-id="1048:1956">
          <p className={styles.layer91}>Find the</p>
          <p className={styles.layer92}>relevant context</p>
        </div>
      </div>
      <div
        className={styles.layer93}
        data-node-id="1048:1957"
        data-name="Innflow AI Agent"
      >
        <Image
          fill
          unoptimized
          sizes="580px"
          alt=""
          className={styles.layer20}
          src={imgInnflowAiAgent}
        />
      </div>
      <div
        className={styles.layer94}
        data-node-id="1048:1959"
        data-name="Draft agent / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer95}
        data-node-id="1048:1960"
        data-name="Draft agent"
      >
        <p className={styles.layer47} data-node-id="1048:1961">
          Draft
        </p>
        <div className={styles.layer90} data-node-id="1048:1962">
          <p className={styles.layer91}>Prepare a</p>
          <p className={styles.layer92}>clear response</p>
        </div>
      </div>
      <div
        className={styles.layer96}
        data-node-id="1048:1963"
        data-name="Innflow AI Agent"
      >
        <Image
          fill
          unoptimized
          sizes="580px"
          alt=""
          className={styles.layer20}
          src={imgInnflowAiAgent}
        />
      </div>
      <div
        className={styles.layer97}
        data-node-id="1048:1965"
        data-name="Review agent / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer98}
        data-node-id="1048:1966"
        data-name="Review agent"
      >
        <p className={styles.layer47} data-node-id="1048:1967">
          Review
        </p>
        <div className={styles.layer90} data-node-id="1048:1968">
          <p className={styles.layer91}>Flag decisions</p>
          <p className={styles.layer92}>for your team</p>
        </div>
      </div>
      <div
        className={styles.layer99}
        data-node-id="1048:1969"
        data-name="Innflow AI Agent"
      >
        <Image
          fill
          unoptimized
          sizes="580px"
          alt=""
          className={styles.layer20}
          src={imgInnflowAiAgent}
        />
      </div>
      <div
        className={styles.layer100}
        data-node-id="1048:1971"
        data-name="Team review checkpoint / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer101}
        data-node-id="1048:1972"
        data-name="Team review checkpoint"
      >
        <p className={styles.layer102} data-node-id="1048:1973">
          Ready for your team
        </p>
        <p className={styles.layer48} data-node-id="1048:1974">
          Review the draft. Decide what happens next.
        </p>
      </div>
    </div>
  );
}
