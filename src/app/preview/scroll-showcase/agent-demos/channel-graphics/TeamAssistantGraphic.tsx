import Image from "next/image";
import styles from "./channel-graphics.module.css";

const imgInnflowAiAgent = "/preview/homepage/channel-graphics/3-ecfb3.svg";

export function TeamAssistantGraphic() {
  return (
    <div
      className={styles.canvas}
      data-node-id="1048:11713"
      data-name="Innflow / Communication / 03 / An assistant for your team"
    >
      <div
        className={styles.layer65}
        data-node-id="1047:2044"
        data-name="Team request / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer66}
        data-node-id="1047:2045"
        data-name="Team request"
      >
        <p className={styles.layer43} data-node-id="1047:2046">
          Ask Innflow
        </p>
        <p className={styles.layer67} data-node-id="1047:2047">
          Find the background and draft a reply.
        </p>
      </div>
      <div
        className={styles.layer68}
        data-node-id="1047:2048"
        data-name="Assistant draft / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer69}
        data-node-id="1047:2049"
        data-name="Assistant draft"
      >
        <p className={styles.layer70} data-node-id="1047:2050">
          Response ready for review
        </p>
        <div className={styles.layer71} data-node-id="1047:2051">
          <p className={styles.layer72}>Based on the customer’s conversation</p>
          <p className={styles.layer73}>and your team’s knowledge.</p>
        </div>
        <div className={styles.layer74} data-node-id="1047:2052">
          <p className={styles.layer75}>
            Hi Maya, we can help move the meeting.
          </p>
          <p className={styles.layer75}>
            I’ve gathered the available times and
          </p>
          <p className={styles.layer76}>
            prepared the next step for your review.
          </p>
        </div>
        <div
          className={styles.layer77}
          data-node-id="1047:2053"
          data-name="Attached sources"
        >
          <div
            className={styles.layer78}
            data-node-id="1047:2054"
            data-name="Conversation"
          >
            <p className={styles.layer79} data-node-id="1047:2055">
              Conversation
            </p>
          </div>
          <div
            className={styles.layer78}
            data-node-id="1047:2056"
            data-name="Team knowledge"
          >
            <p className={styles.layer79} data-node-id="1047:2057">
              Team knowledge
            </p>
          </div>
        </div>
      </div>
      <div
        className={styles.layer80}
        data-node-id="1047:2058"
        data-name="Review draft"
      />
      <p className={styles.layer81} data-node-id="1047:2059">
        Review draft
      </p>
      <div
        className={styles.layer82}
        data-node-id="1047:2060"
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
        className={styles.layer83}
        data-node-id="1047:2062"
        data-name="Your team chooses the next step"
      />
      <p className={styles.layer84} data-node-id="1047:2063">
        Your team chooses the next step
      </p>
    </div>
  );
}
