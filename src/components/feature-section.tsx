import { FeatureMedia } from "@/components/product-media";
import type { FeatureStory } from "@/content/home";

export function FeatureSection({
  story,
  index,
}: {
  story: FeatureStory;
  index: number;
}) {
  return (
    <article className={`feature-story ${index % 2 ? "feature-reverse" : ""}`}>
      <div className="feature-copy">
        <div className="eyebrow-row">
          <span className="eyebrow">{story.eyebrow}</span>
          <span className={`status-label status-${story.status.toLowerCase()}`}>
            {story.status}
          </span>
        </div>
        <h3>{story.title}</h3>
        <dl className="story-details">
          <div>
            <dt>Problem</dt>
            <dd>{story.problem}</dd>
          </div>
          <div>
            <dt>Workflow</dt>
            <dd>{story.workflow}</dd>
          </div>
          <div>
            <dt>Outcome</dt>
            <dd>{story.outcome}</dd>
          </div>
        </dl>
      </div>
      <FeatureMedia type={story.media} />
    </article>
  );
}
