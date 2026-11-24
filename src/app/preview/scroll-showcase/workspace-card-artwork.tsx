import Image from "next/image";
import { Check } from "@/components/icons/mage";
import { agentAvatars } from "@/config/agent-avatars";
import styles from "./workspace-card-artwork.module.css";
import { WorkspaceConnectArtwork } from "./workspace-connect-artwork";

function DeployArtwork() {
  return (
    <div className={styles.agent} data-source-node="961:8643">
      <div className={styles.agentIdentity}>
        <Image
          className={styles.agentLogo}
          src={agentAvatars.deploy}
          alt=""
          width={38}
          height={38}
        />
        <div className={styles.agentLabels}>
          <strong>Acorn · Project Manager</strong>
          <span>Meeting ended · Acme renewal call</span>
        </div>
        <div className={styles.agentSwitch}>
          <span>
            <Check size={11.5} />
          </span>
        </div>
      </div>
      <div className={styles.agentValue}>
        <strong>Next steps from the call</strong>
        <ol>
          <li>Logged the renewal request</li>
          <li>Routed pricing to Rahul</li>
          <li>Drafted Thursday’s follow-up</li>
        </ol>
      </div>
    </div>
  );
}

// These are decorative product illustrations. Card controls own interaction.
export function WorkspaceCardArtwork({
  id,
}: {
  id: "connect" | "learn";
}) {
  return (
    <div className={styles.stage} data-workspace-artwork={id} aria-hidden="true">
      {id === "connect" ? (
        <WorkspaceConnectArtwork />
      ) : (
        <DeployArtwork />
      )}
    </div>
  );
}
