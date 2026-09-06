"use client";

import {
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  Database,
  FileText,
  FlowArrow,
  House,
  Lightning,
  MagnifyingGlass,
  ShieldCheck,
  Sparkle,
  Users,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import styles from "./runey-landing.module.css";

const views = ["Workflows", "Assistant", "Knowledge", "Approvals"] as const;
type View = (typeof views)[number];

export function RuneyHeroArtwork() {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (paused || reduced) video.current?.pause();
    else void video.current?.play().catch(() => setPaused(true));
  }, [paused, reduced]);
  return (
    <div className={styles.heroArtwork}>
      <video
        ref={video}
        tabIndex={-1}
        aria-hidden="true"
        muted
        loop
        playsInline
        preload="none"
        poster="/brand/runey/glass-green-yellow.webp"
      >
        <source src="/brand/runey/hero-motion.mp4" type="video/mp4" />
      </video>
      {!reduced && (
        <button
          className={styles.motionToggle}
          type="button"
          onClick={() => setPaused(!paused)}
        >
          {paused ? "Play motion" : "Pause motion"}
        </button>
      )}
    </div>
  );
}

export function RuneyWorkspace({
  initialView = "Workflows",
  interactive = false,
}: {
  initialView?: View;
  interactive?: boolean;
}) {
  const [view, setView] = useState<View>(initialView);
  return (
    <div className={styles.previewGroup}>
      {interactive && (
        <fieldset
          className={styles.previewTabs}
          aria-label="Explore product previews"
        >
          {views.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={view === item}
              onClick={() => setView(item)}
            >
              {item}
            </button>
          ))}
        </fieldset>
      )}
      <section
        className={styles.workspace}
        aria-label={`Illustrative Innflow ${view.toLowerCase()} preview`}
      >
        <aside className={styles.workspaceRail} aria-hidden="true">
          <span className={styles.railLogo}>i</span>
          <House />
          <FlowArrow />
          <Sparkle />
          <Database />
          <FileText />
          <Users />
          <span className={styles.railBottom}>A</span>
        </aside>
        <div className={styles.workspaceBody}>
          <div className={styles.workspaceBar}>
            <span>
              Workspace <span className={styles.divider}>/</span> {view}
            </span>
            <span className={styles.previewLabel}>Illustrative preview</span>
          </div>
          <div className={styles.workspaceHeading}>
            <div>
              <span className={styles.workspaceEyebrow}>
                YOUR OPERATIONS, CONNECTED
              </span>
              <h3>
                {view === "Workflows"
                  ? "Every handoff. One clear flow."
                  : view === "Assistant"
                    ? "The right context. A clearer answer."
                    : view === "Knowledge"
                      ? "Everything your team needs to know."
                      : "A human at the moments that matter."}
              </h3>
              <p>
                {view === "Workflows"
                  ? "Resident request · Maintenance coordination"
                  : view === "Assistant"
                    ? "Ask a question. Review the next step."
                    : view === "Knowledge"
                      ? "Procedures, files, and working records in one place."
                      : "Review the context before work moves forward."}
              </p>
            </div>
            <span className={styles.workspaceStatus}>
              <span />{" "}
              {view === "Approvals" ? "Review required" : "Example workspace"}
            </span>
          </div>
          {view === "Workflows" ? (
            <div className={styles.flowCanvas}>
              <div className={styles.flowNode}>
                <span className={styles.nodeIcon}>
                  <Lightning />
                </span>
                <div>
                  <small>01 · TRIGGER</small>
                  <strong>Resident request received</strong>
                  <p>A maintenance request enters the workflow.</p>
                </div>
                <CheckCircle className={styles.nodeCheck} />
              </div>
              <div className={styles.connector}>
                <span>Attach property & resident context</span>
              </div>
              <div className={styles.flowNode}>
                <span className={styles.nodeIcon}>
                  <Sparkle />
                </span>
                <div>
                  <small>02 · PREPARE</small>
                  <strong>Find the right next step</strong>
                  <p>Check the procedure. Prepare a vendor handoff.</p>
                </div>
                <CheckCircle className={styles.nodeCheck} />
              </div>
              <div className={styles.connector}>
                <span>Keep a person in control</span>
              </div>
              <div className={`${styles.flowNode} ${styles.reviewNode}`}>
                <span className={styles.nodeIcon}>
                  <ShieldCheck />
                </span>
                <div>
                  <small>03 · HUMAN REVIEW</small>
                  <strong>Ready for your approval</strong>
                  <p>Review the details before the workflow continues.</p>
                </div>
                <Clock className={styles.nodeCheck} />
              </div>
              <div className={styles.canvasNote}>
                <span /> Context attached <span /> Every step recorded
              </div>
            </div>
          ) : view === "Assistant" ? (
            <div className={styles.assistantCanvas}>
              <div className={styles.question}>
                What needs review for this maintenance request?
              </div>
              <div className={styles.answer}>
                <Sparkle size={25} />
                <div>
                  <strong>Here’s the context for your review.</strong>
                  <p>
                    The request, property record, and maintenance procedure are
                    attached. Confirm the proposed vendor handoff before the
                    workflow proceeds.
                  </p>
                  <div className={styles.sourceChips}>
                    <span>
                      <FileText /> Maintenance procedure
                    </span>
                    <span>
                      <House /> Property record
                    </span>
                  </div>
                  <div className={styles.answerAction}>
                    Next step: review the handoff <ArrowRight />
                  </div>
                </div>
              </div>
              <div className={styles.promptPreview}>
                Ask about your operations… <span>↑</span>
              </div>
            </div>
          ) : view === "Knowledge" ? (
            <div className={styles.knowledgeCanvas}>
              <div className={styles.searchPreview}>
                <MagnifyingGlass /> Find a procedure, file, or record
              </div>
              {[
                "Maintenance procedures",
                "Resident communication guidelines",
                "Vendor onboarding checklist",
                "Property operating records",
              ].map((title, i) => (
                <div className={styles.documentRow} key={title}>
                  <span className={styles.documentIcon}>
                    <FileText />
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <small>
                      {i === 3 ? "Working records" : "Knowledge base"} · Example
                      content
                    </small>
                  </div>
                  <ArrowRight />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.approvalCanvas}>
              <div className={styles.approvalCard}>
                <span className={styles.approvalPill}>
                  <Clock /> Awaiting review
                </span>
                <h4>Vendor handoff</h4>
                <p>
                  A next step is prepared for this maintenance request. Review
                  the supporting context before approving.
                </p>
                <dl>
                  <div>
                    <dt>Workflow</dt>
                    <dd>Maintenance coordination</dd>
                  </div>
                  <div>
                    <dt>Review point</dt>
                    <dd>Before outbound action</dd>
                  </div>
                  <div>
                    <dt>Supporting context</dt>
                    <dd>3 attached records</dd>
                  </div>
                </dl>
                <div className={styles.approvalExample}>
                  <ShieldCheck /> Approval stays with your team
                </div>
              </div>
            </div>
          )}
          <div className={styles.workspaceBottom}>
            <span>
              <Check size={13} /> Connected context
            </span>
            <span>Innflow · Product illustration</span>
          </div>
        </div>
      </section>
    </div>
  );
}
