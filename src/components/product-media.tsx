import Image from "next/image";

function FrameHeader({ label, status }: { label: string; status?: string }) {
  return (
    <div className="frame-header">
      <div className="frame-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span>{label}</span>
      {status ? <strong>{status}</strong> : <span aria-hidden="true" />}
    </div>
  );
}

export function HeroWorkflowFrame() {
  return (
    <section
      className="hero-product"
      aria-label="Illustrative Innflow workflow composition"
    >
      <FrameHeader label="Resident request workflow" />
      <div className="hero-product-grid">
        <div className="workflow-canvas">
          <div className="workflow-node node-trigger">
            <span className="node-kicker">Incoming request</span>
            <strong>New maintenance message</strong>
            <small>Trigger</small>
          </div>
          <div className="workflow-line line-one" aria-hidden="true" />
          <div className="workflow-node node-context">
            <span className="node-kicker">Find context</span>
            <strong>Lease + property record</strong>
            <small>Knowledge · Tables</small>
          </div>
          <div className="workflow-line line-two" aria-hidden="true" />
          <div className="workflow-node node-review">
            <span className="node-kicker">Human control</span>
            <strong>Request manager approval</strong>
            <small>Approval</small>
          </div>
          <div className="run-status">
            <span className="status-pulse" />
            Draft walkthrough · not a customer result
          </div>
        </div>
        <div className="assistant-panel">
          <div className="assistant-label">
            <span>in</span>
            Assistant
          </div>
          <p>
            “I found the property record and prepared the next step for review.”
          </p>
          <div className="assistant-proof">
            <span>2 sources</span>
            <span>Approval required</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeatureMedia({ type }: { type: string }) {
  if (type === "assistant") {
    return (
      <div className="product-frame image-frame">
        <FrameHeader label="Assistant with knowledge" />
        <Image
          src="/product/assistant-knowledge.png"
          alt="Approved Innflow product artwork showing an assistant response grounded in a knowledge article"
          width={1062}
          height={548}
          sizes="(max-width: 760px) 92vw, 48vw"
        />
        <p className="asset-caption">
          Approved Innflow product media · example content
        </p>
      </div>
    );
  }

  if (type === "website") {
    return (
      <div className="product-frame image-frame preview-frame">
        <FrameHeader label="Structured website concept" status="Preview" />
        <Image
          src="/product/website-structure-preview.png"
          alt="Approved Innflow preview artwork showing a structured help website"
          width={1734}
          height={868}
          sizes="(max-width: 760px) 92vw, 48vw"
        />
        <p className="asset-caption">Preview-only product media</p>
      </div>
    );
  }

  if (type === "communications") {
    return (
      <div className="product-frame communications-frame">
        <FrameHeader label="Communications concept" status="Preview" />
        <div className="message-list">
          <div className="message-row active">
            <span className="avatar">AR</span>
            <span>
              <strong>Alex R.</strong>
              <small>Water leak in unit 304</small>
            </span>
            <time>9:42</time>
          </div>
          <div className="message-row">
            <span className="avatar muted">MP</span>
            <span>
              <strong>Maple Property</strong>
              <small>Owner report follow-up</small>
            </span>
            <time>8:15</time>
          </div>
        </div>
        <div className="message-detail">
          <span className="preview-pill">Preview workflow</span>
          <h3>Route urgent maintenance request</h3>
          <p>
            Property context found. Manager review is required before the vendor
            handoff.
          </p>
          <div className="detail-actions">
            <span>Assign</span>
            <strong>Request approval</strong>
          </div>
        </div>
      </div>
    );
  }

  if (type === "context") {
    return (
      <div className="product-frame context-frame">
        <FrameHeader label="Operational record" />
        <div className="record-layout">
          <div className="record-sidebar">
            <span className="active">Request</span>
            <span>Property</span>
            <span>Files</span>
            <span>History</span>
          </div>
          <div className="record-main">
            <span className="record-label">Maintenance request</span>
            <h3>Unit 304 · kitchen leak</h3>
            <div className="record-fields">
              <span>
                <small>Priority</small>
                <strong>Needs review</strong>
              </span>
              <span>
                <small>Owner</small>
                <strong>Operations</strong>
              </span>
              <span>
                <small>Evidence</small>
                <strong>2 files</strong>
              </span>
              <span>
                <small>Last run</small>
                <strong>Visible</strong>
              </span>
            </div>
            <div className="approval-banner">
              <span>Approval requested</span>
              <strong>Review next action →</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-frame workflow-frame">
      <FrameHeader label="Visual workflow" />
      <div className="mini-workflow">
        <div>
          <small>Trigger</small>
          <strong>Request received</strong>
        </div>
        <span aria-hidden="true">→</span>
        <div>
          <small>Condition</small>
          <strong>Classify urgency</strong>
        </div>
        <span aria-hidden="true">→</span>
        <div>
          <small>Control</small>
          <strong>Manager review</strong>
        </div>
      </div>
      <div className="execution-strip">
        <span>
          <i className="status-dot complete" />
          Input captured
        </span>
        <span>
          <i className="status-dot complete" />
          Context attached
        </span>
        <span>
          <i className="status-dot waiting" />
          Awaiting review
        </span>
      </div>
    </div>
  );
}
