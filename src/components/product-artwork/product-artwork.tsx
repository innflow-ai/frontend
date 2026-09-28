import Image from "next/image";
import type { ReactNode } from "react";
import { ChevronRight } from "@/components/chevron-right";
import {
  ArrowRight,
  Refresh as ArrowsClockwise,
  ChevronDown as CaretDown,
  Check,
  CheckCircle,
  Clock,
  Server as Cloud,
  Database,
  DotsHorizontal as DotsThree,
  NoteText as FileText,
  Folder,
  Settings as GearSix,
  Globe,
  Checklist as ListChecks,
  Lock,
  Clock as MageClock,
  Goals as MageGoals,
  LArrowDownLeft as MageLArrowDownLeft,
  Minus as MageMinus,
  Plus as MagePlus,
  Search as MagnifyingGlass,
  Play,
  Plus,
  ShieldCheck,
  Dashboard as SquaresFour,
  Upload as UploadSimple,
  User,
  Users,
} from "@/components/icons/mage";
import {
  type ArtworkScene,
  productArtworkScenes,
  type SceneItem,
} from "@/content/product-artwork-scenes";
import { artworkAssets } from "./inventory";
import styles from "./product-artwork.module.css";

function AgentIcon() {
  return (
    <Image
      src="/brand/product-artwork/ai-agent.svg"
      width={19}
      height={20}
      alt=""
      className={styles.agentIcon}
    />
  );
}
function Avatar() {
  return (
    <Image
      src="/brand/product-artwork/laura-demo.png"
      width={24}
      height={24}
      alt=""
      className={styles.avatar}
    />
  );
}
function Glass({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.glass} ${className}`}>
      <div className={styles.surface}>{children}</div>
    </div>
  );
}
function Heading({
  title,
  icon = <AgentIcon />,
  badge,
}: {
  title: string;
  icon?: ReactNode;
  badge?: string;
}) {
  return (
    <div className={styles.heading}>
      <span className={styles.headingIcon}>{icon}</span>
      <strong>{title}</strong>
      {badge && <span className={styles.badge}>{badge}</span>}
    </div>
  );
}
function WindowBar({ title }: { title: string }) {
  return (
    <div className={styles.windowBar}>
      <span className={styles.windowDots}>
        <i />
        <i />
        <i />
      </span>
      <span>{title}</span>
      <DotsThree />
    </div>
  );
}
function Footnote({ children }: { children: ReactNode }) {
  return (
    <div className={styles.footnote}>
      <span className={styles.statusDot} />
      {children}
    </div>
  );
}
function ItemRows({
  items,
  icon = "file",
}: {
  items: SceneItem[];
  icon?: "file" | "check" | "person";
}) {
  return (
    <div className={styles.itemRows}>
      {items.map((item, index) => (
        <div
          className={styles.itemRow}
          key={`${item.label}:${item.value}`}
          data-secondary={index > 1}
        >
          <span className={styles.rowIcon}>
            {icon === "check" ? (
              <Check />
            ) : icon === "person" ? (
              <User />
            ) : (
              <FileText />
            )}
          </span>
          <span className={styles.rowCopy}>
            <strong>{item.label}</strong>
            <span>{item.value}</span>
          </span>
          <ArrowRight className={styles.rowArrow} />
        </div>
      ))}
    </div>
  );
}
function SearchField({ label }: { label: string }) {
  return (
    <div className={styles.searchField}>
      <MagnifyingGlass />
      <span>{label}</span>
      <span className={styles.keycap}>
        <MageLArrowDownLeft size="1em" />
      </span>
    </div>
  );
}

/** Ready pose only. Ports and connectors share a fixed coordinate system. */
function BranchScene({ scene }: { scene: ArtworkScene }) {
  const [condition, human, agent] = scene.items;
  return (
    <div className={styles.branch}>
      <svg
        className={styles.branchLines}
        viewBox="0 0 500 340"
        fill="none"
        aria-hidden="true"
      >
        <path d="M126 72 V116 M235 169 C263 169 260 143 294 143 M235 220 C267 220 260 253 294 253" />
        {[
          [126, 72],
          [126, 116],
          [235, 169],
          [294, 143],
          [235, 220],
          [294, 253],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
        ))}
      </svg>
      <div className={styles.trigger}>
        <span>
          <Play weight="fill" />
          {scene.context}
        </span>
      </div>
      <Glass className={styles.condition}>
        <Heading
          title={condition.label}
          icon={
            <Image src="/brand/mage/split.svg" width={18} height={18} alt="" />
          }
        />
        <div className={styles.conditionRows}>
          <span>If</span>
          <div className={styles.conditionField}>
            <span>{condition.value}</span>
            <CaretDown />
          </div>
          <span className={styles.elseField}>Else</span>
        </div>
      </Glass>
      <Glass className={styles.humanNode}>
        <Heading title={human.label} icon={<User weight="fill" />} />
        <div className={styles.assignee}>
          <Avatar />
          <span>{human.value}</span>
        </div>
      </Glass>
      <Glass className={styles.agentNode}>
        <Heading title={agent.label} />
        <div className={styles.assignee}>
          <AgentIcon />
          <span>{agent.value}</span>
        </div>
      </Glass>
    </div>
  );
}

function FlowScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.flow}>
      <div className={styles.contextPill}>
        <ArrowsClockwise />
        {scene.context}
      </div>
      <div className={styles.flowStack}>
        {scene.items.map((item, index) => (
          <Glass
            key={`${item.label}:${item.value}`}
            className={styles.flowNode}
          >
            <span className={styles.stepIcon}>
              {index === 0 ? (
                <Play />
              ) : index === scene.items.length - 1 ? (
                <User />
              ) : (
                <AgentIcon />
              )}
            </span>
            <div className={styles.rowCopy}>
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </div>
            {item.value.includes("Laura") ? (
              <Avatar />
            ) : (
              <span className={styles.miniState}>
                {index === scene.items.length - 1 ? <Clock /> : <Check />}
              </span>
            )}
          </Glass>
        ))}
      </div>
      <Footnote>{scene.result}</Footnote>
    </div>
  );
}

function HubScene({ scene }: { scene: ArtworkScene }) {
  const marks = ["gmail", "google-drive", "slack", "google-sheets"];
  return (
    <div className={styles.hub}>
      <svg
        viewBox="0 0 440 340"
        className={styles.hubLines}
        fill="none"
        aria-hidden="true"
      >
        <path d="M184 150 110 87 M256 150 330 87 M184 195 110 255 M256 195 330 255" />
      </svg>
      <div className={styles.hubCenter}>
        <Image
          src="/brand/innflow-app-icon.png"
          alt=""
          width={72}
          height={72}
        />
      </div>
      {scene.items.slice(0, 4).map((item, index) => (
        <div
          className={styles.toolTile}
          data-corner={index}
          key={`${item.label}:${item.value}`}
        >
          <span className={styles.toolShell}>
            <Image
              src={`/integrations/${marks[index]}.svg`}
              width={36}
              height={36}
              alt=""
            />
          </span>
          <strong>{item.label}</strong>
          <span>{item.value}</span>
        </div>
      ))}
      <span className={styles.hubCaption}>{scene.result}</span>
    </div>
  );
}

function EditorScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.editorScene}>
      <Glass className={styles.editorWindow}>
        <WindowBar title={scene.title} />
        <div className={styles.editorToolbar}>
          <span>
            <Play /> Test workflow
          </span>
          <span className={styles.toolbarPill}>Draft</span>
        </div>
        <div className={styles.editorCanvas}>
          <div className={styles.canvasNodes}>
            {scene.items.slice(0, 3).map((item, i) => (
              <div
                key={`${item.label}:${item.value}`}
                className={styles.canvasNode}
                data-selected={i === 1}
              >
                <span>
                  {i === 0 ? <Play /> : i === 1 ? <AgentIcon /> : <User />}
                </span>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.canvasZoom}>
            <MageMinus size="1em" /> <span>100%</span> <MagePlus size="1em" />
          </div>
        </div>
      </Glass>
      <Glass className={styles.configDrawer}>
        <Heading title={scene.items[1].label} icon={<GearSix />} />
        <div className={styles.fieldLabel}>Configuration</div>
        <div className={styles.fakeField}>
          {scene.items[1].value}
          <CaretDown />
        </div>
        <div className={styles.fieldLabel}>Next step</div>
        <div className={styles.fakeField}>
          {scene.items[2].value}
          <ArrowRight />
        </div>
        <Footnote>{scene.result}</Footnote>
      </Glass>
    </div>
  );
}

function ReviewScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.reviewScene}>
      <div className={styles.attachedNote}>
        <FileText />
        Source context attached
      </div>
      <Glass>
        <Heading title={scene.title} badge="Review" />
        <div className={styles.panelBody}>
          <span className={styles.overline}>{scene.context}</span>
          <ItemRows items={scene.items} />
          <div className={styles.reviewer}>
            <Avatar />
            <span>
              <strong>Laura Kim</strong>
              <span>Assigned reviewer</span>
            </span>
            <span className={styles.reviewDot} />
          </div>
          <div className={styles.reviewActions}>
            <span className={styles.primaryAction}>
              <Check />
              Approve
            </span>
            <span className={styles.secondaryAction}>Request revision</span>
          </div>
        </div>
      </Glass>
      <Footnote>{scene.result}</Footnote>
    </div>
  );
}

function CompareScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.compareScene}>
      <div className={styles.contextPill}>
        <ListChecks />
        {scene.context}
      </div>
      <div className={styles.comparison}>
        {scene.items.slice(0, 2).map((item, index) => (
          <Glass key={`${item.label}:${item.value}`}>
            <div className={styles.compareLabel} data-after={index === 1}>
              {index === 0 ? <FileText /> : <CheckCircle />}
              <span>{item.label}</span>
            </div>
            <div className={styles.compareCopy}>
              <span className={styles.documentLines}>
                <i />
                <i />
              </span>
              <strong>{item.value}</strong>
              <span className={styles.compareTag}>
                {index === 0 ? "Reference" : "Review result"}
              </span>
            </div>
          </Glass>
        ))}
      </div>
      <Glass className={styles.compareResult}>
        <span className={styles.rowIcon}>
          <CheckCircle />
        </span>
        <div className={styles.rowCopy}>
          <strong>{scene.items[2].label}</strong>
          <span>{scene.items[2].value}</span>
        </div>
        <ArrowRight />
      </Glass>
      <Footnote>{scene.result}</Footnote>
    </div>
  );
}

function LibraryScene({ scene }: { scene: ArtworkScene }) {
  const upload = scene.title.includes("files into");
  return (
    <div className={styles.libraryScene}>
      <Glass>
        <WindowBar title={scene.title} />
        <div className={styles.libraryBody}>
          <div className={styles.librarySidebar}>
            <Folder />
            <span>Workspace</span>
            <span className={styles.navSelected}>Files</span>
            <span>Shared</span>
            <span>Recent</span>
          </div>
          <div className={styles.libraryMain}>
            <SearchField label={scene.context} />
            {upload && (
              <div className={styles.uploadZone}>
                <UploadSimple />
                <span>Drop a file here</span>
              </div>
            )}
            <ItemRows items={scene.items} />
            <div className={styles.fileFooter}>
              <span>{scene.items.length} records</span>
              <span>
                <Plus />
                Add file
              </span>
            </div>
          </div>
        </div>
      </Glass>
      <div className={styles.fileToast}>
        <CheckCircle />
        <span>{scene.result}</span>
      </div>
    </div>
  );
}

function SearchScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.searchScene}>
      <Glass>
        <div className={styles.panelBody}>
          <SearchField label={scene.context} />
          <div className={styles.searchResults}>
            {scene.items.slice(0, 2).map((item, index) => (
              <div
                className={styles.searchResult}
                key={`${item.label}:${item.value}`}
              >
                <div className={styles.searchResultTitle}>
                  <FileText />
                  <strong>{item.label}</strong>
                  <span>[{index + 1}]</span>
                </div>
                <p>{item.value}</p>
                <span className={styles.excerptLine} />
              </div>
            ))}
          </div>
        </div>
      </Glass>
      <Glass className={styles.answerCard}>
        <Heading title={scene.items[2]?.label ?? "Relevant context"} />
        <p>{scene.items[2]?.value ?? scene.result}</p>
        <div className={styles.citations}>
          <span>
            <FileText />
            Source 1
          </span>
          <span>
            <FileText />
            Source 2
          </span>
        </div>
      </Glass>
      <Footnote>{scene.result}</Footnote>
    </div>
  );
}

function TableScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.tableScene}>
      <Glass>
        <WindowBar title={scene.title} />
        <div className={styles.panelBody}>
          <div className={styles.tableToolbar}>
            <span>
              <Database />
              {scene.context}
            </span>
            <Plus />
          </div>
          <div className={styles.dataTable}>
            <div className={styles.tableHead}>
              <span>Record</span>
              <span>Owner / status</span>
            </div>
            {scene.items.map((item, i) => (
              <div
                key={`${item.label}:${item.value}`}
                className={styles.tableRow}
                data-selected={i === 0}
              >
                <span>
                  <span className={styles.checkbox}>
                    {i === 0 && <Check />}
                  </span>
                  {item.label}
                </span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Glass>
      <Glass className={styles.linkedRecord}>
        <Heading title="Linked workflow" icon={<Database />} />
        <span>Customer follow-up</span>
        <Footnote>{scene.result}</Footnote>
      </Glass>
    </div>
  );
}

function SettingsScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.settingsScene}>
      <Glass>
        <Heading title={scene.title} icon={<GearSix />} />
        <div className={styles.panelBody}>
          <span className={styles.overline}>{scene.context}</span>
          <div className={styles.settingRows}>
            {scene.items.map((item, index) => (
              <div
                className={styles.settingRow}
                key={`${item.label}:${item.value}`}
                data-secondary={index > 1}
              >
                <span>{item.label}</span>
                <div className={styles.fakeField}>
                  {item.value}
                  <CaretDown />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.saveRow}>
            <span>
              <CheckCircle />
              Draft configuration
            </span>
            <span className={styles.primaryAction}>Review settings</span>
          </div>
        </div>
      </Glass>
      <Footnote>{scene.result}</Footnote>
    </div>
  );
}

function TemplatesScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.templatesScene}>
      <div className={styles.contextPill}>
        <SquaresFour />
        {scene.context}
      </div>
      <div className={styles.templateStack}>
        {scene.items.map((item, index) => (
          <Glass
            key={`${item.label}:${item.value}`}
            className={styles.templateCard}
          >
            <div className={styles.templatePreview} data-variant={index}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.rowCopy}>
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </div>
            <span className={styles.templateChoice}>
              {index === 0 ? <CheckCircle weight="fill" /> : <Plus />}
            </span>
          </Glass>
        ))}
      </div>
      <Footnote>{scene.result}</Footnote>
    </div>
  );
}

function Trend({ bars = false }: { bars?: boolean }) {
  return (
    <div className={styles.chart}>
      {bars ? (
        <div className={styles.bars}>
          {[37, 62, 44, 76, 54, 83, 69, 90, 74].map((height) => (
            <span key={height} style={{ height: `${height}%` }} />
          ))}
        </div>
      ) : (
        <svg viewBox="0 0 360 110" fill="none" aria-hidden="true">
          <path
            className={styles.chartGrid}
            d="M0 22H360 M0 55H360 M0 88H360"
          />
          <path
            className={styles.chartArea}
            d="M0 96L35 90 72 65 107 74 145 44 181 54 217 27 253 35 289 15 324 24 360 8V110H0Z"
          />
          <path
            className={styles.chartLine}
            d="M0 96L35 90 72 65 107 74 145 44 181 54 217 27 253 35 289 15 324 24 360 8"
          />
        </svg>
      )}
      <div className={styles.chartLabels}>
        <span>Earlier runs</span>
        <span>Recent runs</span>
      </div>
    </div>
  );
}
function DashboardScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.dashboardScene}>
      <Glass>
        <WindowBar title={scene.title} />
        <div className={styles.panelBody}>
          <div className={styles.dashboardTop}>
            <span className={styles.overline}>{scene.context}</span>
            <span className={styles.toolbarPill}>Example</span>
          </div>
          <div className={styles.metricStrip}>
            {scene.items.slice(0, 3).map((item, i) => (
              <div key={`${item.label}:${item.value}`}>
                <span>{item.label}</span>
                <strong>
                  {
                    [
                      <ChevronRight key="growth" />,
                      <MageClock key="clock" size="1em" />,
                      <MageGoals key="goals" size="1em" />,
                    ][i]
                  }
                </strong>
                <small>{item.value}</small>
              </div>
            ))}
          </div>
          <Trend bars={scene.title.includes("Resources")} />
          <div className={styles.dashboardAlert}>
            <Clock />
            <span>{scene.result}</span>
            <ArrowRight />
          </div>
        </div>
      </Glass>
    </div>
  );
}

function TraceScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.traceScene}>
      <Glass>
        <Heading title={scene.title} icon={<ListChecks />} />
        <div className={styles.panelBody}>
          <div className={styles.traceContext}>
            <span>{scene.context}</span>
            <span className={styles.toolbarPill}>Trace</span>
          </div>
          <div className={styles.traceList}>
            {scene.items.map((item, index) => (
              <div
                className={styles.traceRow}
                data-selected={index === 1}
                key={`${item.label}:${item.value}`}
              >
                <span className={styles.traceDot}>
                  {index === scene.items.length - 1 ? <Clock /> : <Check />}
                </span>
                <span className={styles.rowCopy}>
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </span>
                <span className={styles.traceSpan} />
              </div>
            ))}
          </div>
          <div className={styles.traceDetail}>
            <span>Selected step</span>
            <div>
              <span>
                Input <FileText />
              </span>
              <ArrowRight />
              <span>
                Output <FileText />
              </span>
            </div>
          </div>
        </div>
      </Glass>
      <Footnote>{scene.result}</Footnote>
    </div>
  );
}

function ArchitectureScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.architectureScene}>
      <div className={styles.boundary}>
        <div className={styles.boundaryLabel}>
          <Lock />
          {scene.context}
        </div>
        <div className={styles.architectureStack}>
          {scene.items.map((item, index) => (
            <Glass key={`${item.label}:${item.value}`}>
              <span className={styles.architectureIcon}>
                {index === 0 ? (
                  <Users />
                ) : index === 1 ? (
                  <Cloud />
                ) : (
                  <Database />
                )}
              </span>
              <div className={styles.rowCopy}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
              <span className={styles.accessTag}>
                <ShieldCheck />
              </span>
            </Glass>
          ))}
        </div>
      </div>
      <Footnote>{scene.result}</Footnote>
    </div>
  );
}

function RegionsScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.regionsScene}>
      <Glass>
        <Heading title={scene.title} icon={<Globe />} />
        <div className={styles.regionMap}>
          <svg viewBox="0 0 380 145" fill="none" aria-hidden="true">
            <ellipse cx="190" cy="73" rx="142" ry="60" />
            <ellipse cx="190" cy="73" rx="72" ry="60" />
            <path d="M48 73H332 M67 44H313 M67 103H313 M190 13V133" />
            <path className={styles.regionRoute} d="M118 51Q172 5 250 88" />
            <circle cx="118" cy="51" r="7" />
            <circle cx="250" cy="88" r="7" />
          </svg>
          <span className={styles.regionPin}>
            <Lock />
            Selected region
          </span>
        </div>
        <div className={styles.panelBody}>
          <ItemRows items={scene.items} icon="check" />
        </div>
      </Glass>
      <Footnote>{scene.result}</Footnote>
    </div>
  );
}

function WebsiteScene({ scene }: { scene: ArtworkScene }) {
  const portal = /access|sign in/i.test(scene.title);
  return (
    <div className={styles.websiteScene}>
      <Glass className={styles.websiteWindow}>
        <WindowBar title={scene.title} />
        <div className={styles.siteNavigation}>
          <span>Northstar living</span>
          <span>Homes · About · {portal ? "Sign in" : "Contact"}</span>
        </div>
        <div className={styles.websitePreview}>
          <div className={styles.houseArt}>
            <span />
            <span />
            <span />
          </div>
          <span className={styles.siteEyebrow}>
            {portal ? "Resident portal" : "Find your next place"}
          </span>
          <strong>{portal ? "Welcome back." : "A place to call home."}</strong>
          <span className={styles.siteButton}>
            {portal ? "Sign in to your account" : "Explore available homes"}
            <ArrowRight />
          </span>
        </div>
        <div className={styles.siteCards}>
          {scene.items.slice(0, 2).map((item) => (
            <div key={`${item.label}:${item.value}`}>
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </Glass>
      <Glass className={styles.phone}>
        <span className={styles.phoneNotch} />
        <div className={styles.phoneArt} />
        <strong>{scene.items[2]?.label ?? "Mobile preview"}</strong>
        <span>{scene.items[2]?.value ?? "Same content"}</span>
        <span className={styles.phoneButton} />
      </Glass>
    </div>
  );
}

function PermissionsScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.permissionsScene}>
      <Glass>
        <Heading title={scene.title} icon={<ShieldCheck />} />
        <div className={styles.panelBody}>
          <span className={styles.overline}>{scene.context}</span>
          <div className={styles.permissionGrid}>
            <div className={styles.permissionHead}>
              <span>Role / scope</span>
              <span>View</span>
              <span>Act</span>
            </div>
            {scene.items.map((item, index) => (
              <div
                className={styles.permissionRow}
                key={`${item.label}:${item.value}`}
              >
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.value}</small>
                </span>
                <span>
                  <Check />
                </span>
                <span>{index === 0 ? <Lock /> : <Check />}</span>
              </div>
            ))}
          </div>
          <div className={styles.accessRequest}>
            <Avatar />
            <span>
              Access request <strong>Review required</strong>
            </span>
            <ArrowRight />
          </div>
        </div>
      </Glass>
      <Footnote>{scene.result}</Footnote>
    </div>
  );
}

function ReportScene({ scene }: { scene: ArtworkScene }) {
  return (
    <div className={styles.reportScene}>
      <Glass>
        <WindowBar title="Workspace report" />
        <div className={styles.panelBody}>
          <span className={styles.overline}>{scene.context}</span>
          <strong className={styles.reportTitle}>{scene.title}</strong>
          <Trend />
          <ItemRows items={scene.items} icon="check" />
          <div className={styles.reportFooter}>
            <FileText />
            <span>Supporting sources attached</span>
            <span className={styles.primaryAction}>Share report</span>
          </div>
        </div>
      </Glass>
    </div>
  );
}

const renderers = {
  branch: BranchScene,
  flow: FlowScene,
  hub: HubScene,
  editor: EditorScene,
  review: ReviewScene,
  compare: CompareScene,
  library: LibraryScene,
  search: SearchScene,
  table: TableScene,
  settings: SettingsScene,
  templates: TemplatesScene,
  dashboard: DashboardScene,
  trace: TraceScene,
  architecture: ArchitectureScene,
  regions: RegionsScene,
  website: WebsiteScene,
  permissions: PermissionsScene,
  report: ReportScene,
};

/** Server-rendered, reusable artwork. No simulated controls enter the tab order. */
export function ProductArtwork({
  assetId,
  density = "full",
}: {
  assetId: string;
  density?: "full" | "compact" | "wide";
}) {
  const scene = productArtworkScenes[assetId];
  const asset = artworkAssets[assetId];
  if (!scene || !asset)
    throw new Error(`Missing authored product artwork: ${assetId}`);
  const Renderer = renderers[scene.kind];
  return (
    <div
      className={styles.scene}
      data-product-artwork={assetId}
      data-scene-kind={scene.kind}
      data-density={density}
      role="img"
      aria-label={`Illustrative ${asset.name}: ${asset.brief}`}
    >
      <div className={styles.composition} aria-hidden="true">
        <Renderer scene={scene} />
      </div>
    </div>
  );
}
