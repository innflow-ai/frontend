import { CollaborationSection } from "./collaboration-section";
import { EmailDemo } from "./email-demo";
import { MessagesDemo } from "./messages-demo";
import { SlackDemo } from "./slack-demo";
import { TeamsDemo } from "./teams-demo";

export function HomepageCollaboration() {
  return (
    <CollaborationSection
      demos={[
        <SlackDemo key="slack" />,
        <TeamsDemo key="teams" />,
        <EmailDemo key="email" />,
        <MessagesDemo key="messages" />,
      ]}
    />
  );
}
