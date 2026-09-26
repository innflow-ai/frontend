import Image from "next/image";
import styles from "./channel-graphics.module.css";

const imgConnection = "/preview/homepage/channel-graphics/5-ed6da.svg";
const imgConnection1 = "/preview/homepage/channel-graphics/5-e67be.svg";
const imgConnection2 = "/preview/homepage/channel-graphics/5-ab212.svg";
const imgConnection3 = "/preview/homepage/channel-graphics/5-97c1c.svg";
const imgConnection4 = "/preview/homepage/channel-graphics/5-f4eae.svg";

export function WorkflowsGraphic() {
  return (
    <div
      className={styles.canvas}
      data-node-id="1048:11715"
      data-name="Innflow / Communication / 05 / Workflows that take action"
    >
      <div
        className={styles.layer62}
        data-node-id="1048:1983"
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
        className={styles.layer103}
        data-node-id="1048:1985"
        data-name="Request received / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer104}
        data-node-id="1048:1986"
        data-name="Request received"
      >
        <p className={styles.layer102} data-node-id="1048:1987">
          Request received
        </p>
        <p className={styles.layer48} data-node-id="1048:1988">
          Customer asks to move a meeting.
        </p>
      </div>
      <div
        className={styles.layer105}
        data-node-id="1048:1989"
        data-name="Step 01"
      />
      <p className={styles.layer106} data-node-id="1048:1990">
        01
      </p>
      <div
        className={styles.layer62}
        data-node-id="1048:1991"
        data-name="Connection"
      >
        <Image
          fill
          unoptimized
          sizes="580px"
          alt=""
          className={styles.layer20}
          src={imgConnection1}
        />
      </div>
      <div
        className={styles.layer107}
        data-node-id="1048:1993"
        data-name="Assign an owner / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer108}
        data-node-id="1048:1994"
        data-name="Assign an owner"
      >
        <p className={styles.layer102} data-node-id="1048:1995">
          Assign an owner
        </p>
        <p className={styles.layer48} data-node-id="1048:1996">
          Send the request to Customer Success.
        </p>
      </div>
      <div
        className={styles.layer109}
        data-node-id="1048:1997"
        data-name="Step 02"
      />
      <p className={styles.layer110} data-node-id="1048:1998">
        02
      </p>
      <div
        className={styles.layer62}
        data-node-id="1048:1999"
        data-name="Connection"
      >
        <Image
          fill
          unoptimized
          sizes="580px"
          alt=""
          className={styles.layer20}
          src={imgConnection2}
        />
      </div>
      <div
        className={styles.layer111}
        data-node-id="1048:2001"
        data-name="Notify the team / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer112}
        data-node-id="1048:2002"
        data-name="Notify the team"
      >
        <p className={styles.layer102} data-node-id="1048:2003">
          Notify the team
        </p>
        <p className={styles.layer48} data-node-id="1048:2004">
          Share the conversation and next step.
        </p>
      </div>
      <div
        className={styles.layer113}
        data-node-id="1048:2005"
        data-name="Step 03"
      />
      <p className={styles.layer114} data-node-id="1048:2006">
        03
      </p>
      <div
        className={styles.layer62}
        data-node-id="1048:2007"
        data-name="Connection"
      >
        <Image
          fill
          unoptimized
          sizes="580px"
          alt=""
          className={styles.layer20}
          src={imgConnection3}
        />
      </div>
      <div
        className={styles.layer115}
        data-node-id="1048:2009"
        data-name="Update the connected tool / Glass backing"
      >
        <div aria-hidden="true" className={styles.layer40} />
        <div className={styles.layer41} />
      </div>
      <div
        className={styles.layer116}
        data-node-id="1048:2010"
        data-name="Update the connected tool"
      >
        <p className={styles.layer102} data-node-id="1048:2011">
          Update the connected tool
        </p>
        <p className={styles.layer48} data-node-id="1048:2012">
          Prepare the CRM activity for review.
        </p>
      </div>
      <div
        className={styles.layer117}
        data-node-id="1048:2013"
        data-name="Step 04"
      />
      <p className={styles.layer118} data-node-id="1048:2014">
        04
      </p>
      <div
        className={styles.layer62}
        data-node-id="1048:2015"
        data-name="Connection"
      >
        <Image
          fill
          unoptimized
          sizes="580px"
          alt=""
          className={styles.layer20}
          src={imgConnection4}
        />
      </div>
      <div
        className={styles.layer119}
        data-node-id="1048:2017"
        data-name="Context travels with every step"
      />
      <p className={styles.layer120} data-node-id="1048:2018">
        Context travels with every step
      </p>
    </div>
  );
}
