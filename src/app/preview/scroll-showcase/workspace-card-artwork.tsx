import Image from "next/image";
import styles from "./workspace-card-artwork.module.css";
import { WorkspaceConnectArtwork } from "./workspace-connect-artwork";

const assets = "/preview/homepage/workspace-overview/optimized";
const contacts = [
  ["Tori Mathers", "tori.mathers@pri...", "Today", "c4189.png"],
  ["Carl Matthews", "carl.matthews@r...", "Yesterday", "04b20.png"],
  ["Emily Kim", "emily.kim@liftwa...", "2 days ago", "2221c.png"],
  ["Meena Patel", "meena.patel@bri...", "4 days ago", "6bdfd.png"],
  ["Omar Raza", "omar.raza@talen...", "2 weeks ago", "4adff.png"],
] as const;

function TrainArtwork() {
  return (
    <div className={styles.train} data-source-node="57:367">
      <div className={styles.contacts}>
        <div className={styles.columnHeadings}>
          <span>Name</span>
          <span>Email</span>
          <span>Last activity</span>
        </div>
        {contacts.map(([name, email, activity, portrait]) => (
          <div className={styles.contactRow} key={name}>
            <span className={styles.contactName}>
              <Image
                src={`${assets}/${portrait}`}
                alt=""
                width={18.493}
                height={18.493}
              />
              {name}
            </span>
            <span>{email}</span>
            <span>{activity}</span>
          </div>
        ))}
      </div>
      <div className={styles.filter}>
        <div className={styles.glassFilter}>
          <div className={styles.filterPlate}>
            <div className={styles.filterLabel}>
              <Image
                src={`${assets}/505d0.svg`}
                alt=""
                width={8.86108}
                height={7.32002}
              />
              Filter
              <Image
                src={`${assets}/64413.svg`}
                alt=""
                width={7.32002}
                height={4.23791}
              />
            </div>
          </div>
        </div>
        <div className={styles.filterOptions}>
          <span>First activity date</span>
          <span className={styles.selectedOption}>Last activity date</span>
          <span>Next activity date</span>
        </div>
      </div>
      <div className={styles.contactCount}>
        <div className={styles.countPlate}>
          <div className={styles.countBadge}>
            <Image
              src={`${assets}/0a9d9.svg`}
              alt=""
              width={9.24634}
              height={9.24634}
            />
            <span>All contacts&nbsp; 347</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssignArtwork() {
  return (
    <div className={styles.assign} data-source-node="57:437">
      <div className={styles.messageShell} />
      <div className={styles.message}>
        <div className={styles.sender}>
          <Image
            src={`${assets}/d9cdd.svg`}
            alt=""
            width={36.5238}
            height={36.5238}
          />
          <div className={styles.senderLabels}>
            <strong>Quinn</strong>
            <span>to me, Dominic Mills ▾</span>
          </div>
        </div>
        <p className={styles.messageCopy}>
          Happy to set up a call for you with Dominic.
          <br />
          Here are a few times you’re both available.
        </p>
        <div className={styles.availableTimes}>
          {["10:00 AM", "2:30 PM", "3:00 PM"].map((time) => (
            <span key={time}>{time}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeployArtwork() {
  return (
    <div className={styles.agent} data-source-node="61:380">
      <div className={styles.agentIdentity}>
        <Image
          className={styles.agentLogo}
          src={`${assets}/21fd6.png`}
          alt=""
          width={38}
          height={38}
        />
        <div className={styles.agentLabels}>
          <strong>Your AI agent</strong>
          <span>Working for you</span>
        </div>
        <div className={styles.agentSwitch}>
          <span>
            <Image
              src={`${assets}/c359f.svg`}
              alt=""
              width={20.2258}
              height={20.2258}
            />
          </span>
        </div>
      </div>
      <div className={styles.agentValue}>
        <strong>Keep work moving.</strong>
        <p>
          Schedules work, follows up, and keeps
          <br />
          your everyday tasks on track.
        </p>
      </div>
    </div>
  );
}

// These are decorative product illustrations. Card controls own interaction.
export function WorkspaceCardArtwork({
  id,
}: {
  id: "connect" | "assist" | "automate" | "learn";
}) {
  return (
    <div className={styles.stage} data-workspace-artwork={id}>
      {id === "connect" ? (
        <WorkspaceConnectArtwork />
      ) : id === "assist" ? (
        <TrainArtwork />
      ) : id === "automate" ? (
        <AssignArtwork />
      ) : (
        <DeployArtwork />
      )}
    </div>
  );
}
