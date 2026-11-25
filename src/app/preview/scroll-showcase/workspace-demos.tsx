"use client";

import { createContext, type ReactNode, useContext, useId } from "react";

const assets = "/preview/homepage/workspace-overview/demos";
const Timeline = createContext({ seconds: 6, loop: true });
type Cue = [percent: number, value: string | number];

function Track({
  property,
  cues,
}: {
  property: "opacity" | "translate" | "scale" | "rotate";
  cues: Cue[];
}) {
  const { seconds, loop } = useContext(Timeline);
  const props = {
    dur: `${seconds}s`,
    repeatCount: loop ? "indefinite" : 1,
    fill: "freeze" as const,
    values: cues.map(([, value]) => value).join(";"),
    keyTimes: cues.map(([percent]) => percent / 100).join(";"),
    calcMode: "spline" as const,
    keySplines: cues
      .slice(1)
      .map(() => (property === "rotate" ? "0 0 1 1" : ".42 0 .25 1"))
      .join(";"),
  };
  return property === "opacity" ? (
    <animate attributeName="opacity" {...props} />
  ) : (
    <animateTransform attributeName="transform" type={property} {...props} />
  );
}

function Reveal({
  at,
  until,
  children,
}: {
  at: number;
  until?: number;
  children: ReactNode;
}) {
  const cues: Cue[] = [
    [0, 0],
    [at, 0],
    [at + 3, 1],
  ];
  if (until !== undefined) cues.push([until, 1], [until + 3, 0]);
  cues.push([100, until === undefined ? 1 : 0]);
  return (
    <g opacity="0">
      <Track property="opacity" cues={cues} />
      {children}
    </g>
  );
}

function Cursor({
  src,
  size,
  path,
  presses,
}: {
  src: string;
  size: number;
  path: Cue[];
  presses: number[];
}) {
  const press: Cue[] = [[0, 1]];
  for (const at of presses) press.push([at - 2, 1], [at, 0.86], [at + 2, 1]);
  press.push([100, 1]);
  return (
    <g>
      <Track property="translate" cues={path} />
      <g>
        <Track property="scale" cues={press} />
        <image href={`${assets}/${src}`} width={size} height={size} />
      </g>
    </g>
  );
}

const documents = [
  ["Visited vendor-onboarding", "0:07"],
  ["Typed into search input", "0:31"],
  ["Clicked on company", "0:55"],
  ["Opened filings tab", "1:19"],
  ["Downloaded annual return", "1:43"],
  ["Filled supplier form", "2:07"],
];
const entryTimes = [0, 14, 29, 44, 60, 77];

function Admin() {
  return (
    <>
      <rect width="407" height="272" rx="14" fill="white" />
      <path d="M32 44C32 54 46 54 46 64V272" fill="none" stroke="#ebebf1" />
      <circle cx="32" cy="32" r="12" fill="white" stroke="#e2e2e8" />
      <circle cx="32" cy="32" r="4" fill="#ea2630">
        <animate
          attributeName="opacity"
          values="1;.45;1"
          dur=".85s"
          repeatCount="6"
        />
      </circle>
      <text x="54" y="37" fill="#777780">
        Recording..
      </text>
      {documents.map(([label, time], index) => {
        const positions: Cue[] = [[0, index === 0 ? "0 64" : "0 56"]];
        const opacity: Cue[] = [[0, index === 0 ? 1 : 0]];
        for (let step = Math.max(1, index); step < documents.length; step++) {
          const depth = step - index;
          const at = entryTimes[step];
          positions.push(
            [at, positions[positions.length - 1][1]],
            [at + 4, `0 ${64 + 40 * depth}`],
          );
          opacity.push(
            [at, opacity[opacity.length - 1][1]],
            [at + 4, 1 - depth * 0.18],
          );
        }
        positions.push([100, positions[positions.length - 1][1]]);
        opacity.push([100, opacity[opacity.length - 1][1]]);
        return (
          <g key={label}>
            <Track property="translate" cues={positions} />
            <Track property="opacity" cues={opacity} />
            <circle cx="46" cy="20" r="2" fill="#81818a" />
            <rect x="64" y="5" width="48" height="6" rx="1" fill="#d5d5da" />
            <path d="M70 16h22M70 22h30M70 28h18" stroke="#e7e7eb" />
            <text x="124" y="25">
              {label}
            </text>
            <text x="387" y="25" textAnchor="end" fill="#777780">
              {time}
            </text>
          </g>
        );
      })}
      <Cursor
        src="head-cursor.svg"
        size={37}
        presses={entryTimes.slice(1)}
        path={[
          [0, "316 113"],
          [12, "307 83"],
          [21, "307 83"],
          [28, "286 89"],
          [38, "286 89"],
          [43, "318 81"],
          [54, "318 81"],
          [59, "301 92"],
          [71, "301 92"],
          [77, "312 82"],
          [91, "307 101"],
          [100, "307 101"],
        ]}
      />
    </>
  );
}

const contacts = [
  ["Tori Mathers", "tori.mathers@pri…", "Today", 0],
  ["Carl Matthews", "carl.matthews@r…", "Yesterday", 1],
  ["Emily Kim", "emily.kim@liftwa…", "2 days ago", 2],
  ["Meena Patel", "meena.patel@bri…", "9 days ago", 9],
  ["Omar Raza", "omar.raza@talen…", "2 weeks ago", 14],
] as const;

// Keep each contact's avatar attached to its record in both table states.
const opsContacts = contacts.map(
  ([name, email, last, daysInactive], avatarIndex) => ({
    name,
    email,
    last,
    daysInactive,
    avatarIndex,
  }),
);
const inactiveContacts = opsContacts.filter(
  ({ daysInactive }) => daysInactive >= 7,
);

function ContactRows({ rows }: { rows: typeof opsContacts }) {
  return rows.map(({ name, email, last, avatarIndex }, i) => (
    <g key={name} transform={`translate(0 ${233 + i * 73})`}>
      <path d="M69 0h613" stroke="#dce0e3" />
      <svg
        aria-hidden="true"
        x="87"
        y="19"
        width="36"
        height="36"
        viewBox={`0 ${avatarIndex * 36} 36 36`}
        overflow="hidden"
      >
        <image
          href={`${assets}/contact-avatars.webp`}
          width="36"
          height="180"
        />
      </svg>
      <text x="135" y="45">
        {name}
      </text>
      <text x="305" y="45">
        {email}
      </text>
      <text x="515" y="45">
        {last}
      </text>
    </g>
  ));
}

function ContactPlaceholders() {
  return (
    <g fill="#e1e5e9">
      {opsContacts.map(({ name }, i) => (
        <g key={name} transform={`translate(0 ${269 + i * 73})`}>
          <circle cx="105" r="16" />
          <rect x="135" y="-6" width={96 + (i % 2) * 18} height="12" rx="6" />
          <rect x="305" y="-6" width={142 - (i % 3) * 12} height="12" rx="6" />
          <rect x="515" y="-6" width={74 + (i % 2) * 16} height="12" rx="6" />
        </g>
      ))}
    </g>
  );
}

function Ops() {
  const tableClip = useId();
  return (
    <g>
      <Track
        property="opacity"
        cues={[
          [0, 0],
          [3, 1],
          [94, 1],
          [99, 0],
          [100, 0],
        ]}
      />
      <defs>
        <clipPath id={tableClip}>
          <rect x="69" y="167" width="613" height="434" rx="32" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${tableClip})`} fontSize="20">
        <rect x="69" y="167" width="613" height="434" fill="white" />
        <rect x="69" y="167" width="613" height="66" fill="#f5f6f7" />
        <g fontWeight="600">
          <text x="87" y="211">
            Name
          </text>
          <text x="305" y="211">
            Email
          </text>
          <text x="509" y="211">
            Last activity
          </text>
        </g>
        <path d="M287 167v434M496 167v434" stroke="#dce0e3" />
        <g>
          <Track
            property="opacity"
            cues={[
              [0, 1],
              [9, 1],
              [13, 0],
              [52, 0],
              [56, 1],
              [64, 1],
              [68, 0],
              [100, 0],
            ]}
          />
          <ContactPlaceholders />
        </g>
        <Reveal at={10} until={52}>
          <ContactRows rows={opsContacts} />
        </Reveal>
        <Reveal at={65}>
          <ContactRows rows={inactiveContacts} />
        </Reveal>
      </g>
      <rect x="439" y="78" width="268" height="110" rx="28" fill="white" />
      <rect
        x="469"
        y="108"
        width="208"
        height="51"
        rx="10"
        fill="white"
        stroke="#b2bac2"
        strokeWidth="2"
      />
      <g>
        <Track
          property="opacity"
          cues={[
            [0, 1],
            [54, 1],
            [57, 0],
            [100, 0],
          ]}
        />
        <path
          d="M517 129h17m-14 6h11m-8 6h5m87-10 7 7 7-7"
          fill="none"
          stroke="#233647"
          strokeWidth="3"
        />
        <text x="550" y="142" fontSize="21">
          Filter
        </text>
      </g>
      <Reveal at={54}>
        <rect
          x="469"
          y="108"
          width="208"
          height="51"
          rx="10"
          fill="#e9eff6"
          stroke="#9eacbc"
        />
        <text
          x="573"
          y="141"
          textAnchor="middle"
          fontSize="19"
          fontWeight="600"
        >
          ✓ Inactive 7+ days
        </text>
      </Reveal>
      <Reveal at={25} until={54}>
        <rect
          x="468"
          y="163"
          width="211"
          height="136"
          rx="8"
          fill="white"
          stroke="#e2e6eb"
        />
        <Reveal at={44}>
          <rect x="471" y="211" width="204" height="42" rx="6" fill="#d5deea" />
        </Reveal>
        {["All contacts", "Inactive 7+ days", "Active this week"].map(
          (v, i) => (
            <text key={v} x="486" y={197 + i * 42} fontSize="20">
              {v}
            </text>
          ),
        )}
      </Reveal>
      <rect x="409" y="590" width="290" height="109" rx="26" fill="white" />
      <rect x="439" y="618" width="230" height="48" rx="11" fill="#262d2f" />
      <g textAnchor="middle" fontSize="19" fill="white">
        <g>
          <Track
            property="opacity"
            cues={[
              [0, 1],
              [52, 1],
              [55, 0],
              [100, 0],
            ]}
          />
          <text x="554" y="649">
            All {opsContacts.length} contacts
          </text>
        </g>
        <Reveal at={53} until={64}>
          <text x="554" y="649">
            Filtering…
          </text>
        </Reveal>
        <Reveal at={65}>
          <text x="554" y="649">
            {inactiveContacts.length} matching contacts
          </text>
        </Reveal>
      </g>
      <Cursor
        src="leaf-cursor.svg"
        size={78}
        presses={[25, 54]}
        path={[
          [0, "380 350"],
          [8, "380 350"],
          [23, "570 132"],
          [31, "570 132"],
          [49, "590 226"],
          [56, "590 226"],
          [69, "624 279"],
          [88, "624 279"],
          [100, "380 350"],
        ]}
      />
    </g>
  );
}

function Recipient({
  y,
  label,
  address,
  avatar,
  width,
}: {
  y: number;
  label: string;
  address: string;
  avatar: string;
  width: number;
}) {
  return (
    <g transform={`translate(0 ${y})`}>
      <text x="149" y="34" fontSize="24">
        {label}
      </text>
      <rect
        x="195"
        width={width}
        height="50"
        rx="10"
        fill="white"
        stroke="#a6afbc"
      />
      <image href={avatar} x="207" y="8" width="34" height="34" />
      <text x="251" y="32" fontSize="20">
        {address}
      </text>
      <text x={169 + width} y="33" fontSize="23" fill="#78818a">
        ×
      </text>
    </g>
  );
}

function Sales() {
  return (
    <>
      <rect x="84" y="247" width="583" height="370" rx="56" fill="white" />
      <Reveal at={4}>
        <Recipient
          y={311}
          label="To:"
          address="luke@acme.com"
          avatar={`${assets}/luke.webp`}
          width={254}
        />
      </Reveal>
      <Reveal at={15}>
        <Recipient
          y={373}
          label="CC:"
          address="sales@innflow.ai"
          avatar={`${assets}/sales-avatar.webp`}
          width={278}
        />
      </Reveal>
      <path d="M149 451h455" stroke="#d9dee5" strokeWidth="2" />
      <g fontSize="24">
        <Reveal at={28}>
          <text x="282" y="506">
            Sales, can you schedule a
          </text>
        </Reveal>
        <Reveal at={36}>
          <text x="282" y="540">
            meeting with Luke next week?
          </text>
        </Reveal>
      </g>
      {(
        [
          ["gmail", 513, 197, 54],
          ["outlook", 585, 311, 69],
        ] as const
      ).map(([app, x, y, at]) => (
        <g key={app} transform={`translate(${x} ${y})`}>
          <rect
            width="102"
            height="102"
            rx="20"
            fill="white"
            stroke="#dce0e5"
            strokeWidth="2"
          />
          <Reveal at={at}>
            <rect
              width="102"
              height="102"
              rx="20"
              fill="#e5f1ff"
              stroke="#3388ff"
              strokeWidth="4"
            />
          </Reveal>
          <image
            href={`/integrations/${app}.svg`}
            x="24"
            y="24"
            width="54"
            height="54"
          />
        </g>
      ))}
      <Cursor
        src="droplet-cursor.svg"
        size={61}
        presses={[55, 70]}
        path={[
          [0, "425 341"],
          [8, "425 341"],
          [16, "490 395"],
          [23, "490 395"],
          [39, "605 551"],
          [44, "605 551"],
          [53, "567 252"],
          [60, "567 252"],
          [68, "640 366"],
          [76, "640 366"],
          [86, "605 551"],
          [93, "425 341"],
          [100, "425 341"],
        ]}
      />
    </>
  );
}

function Management() {
  return (
    <>
      <rect x="24" y="42" width="336" height="170" rx="22" fill="white" />
      <image
        href="/brand/agents/circular/acorn-sky.svg"
        x="49"
        y="66"
        width="38"
        height="38"
      />
      <text x="97" y="82" fontSize="17">
        Management
      </text>
      <text x="97" y="101" fontSize="12" fill="#646970">
        Acorn / Project Manager
      </text>
      <rect x="286" y="72" width="42" height="23" rx="12" fill="#b8bdc3" />
      <Reveal at={34} until={72}>
        <rect x="286" y="72" width="42" height="23" rx="12" fill="#34c759" />
      </Reveal>
      <circle cx="297.5" cy="83.5" r="8.5" fill="white">
        <Track
          property="translate"
          cues={[
            [0, "0 0"],
            [34, "0 0"],
            [37, "19 0"],
            [72, "19 0"],
            [75, "0 0"],
            [100, "0 0"],
          ]}
        />
      </circle>
      <text x="121" y="138" fontSize="15">
        Deliver the weekly report
      </text>
      <g fontSize="12.5" fill="#525a62">
        <text x="121" y="160">
          Send this week’s project updates
        </text>
        <text x="121" y="177">
          to the team.
        </text>
      </g>
      <Reveal at={36} until={63}>
        <g transform="translate(268 83)">
          <circle r="6" stroke="#c8cdd1" strokeWidth="2.5" fill="none" />
          <circle
            r="6"
            stroke="#52616e"
            strokeWidth="2.5"
            strokeDasharray="12 28"
            fill="none"
          >
            <Track
              property="rotate"
              cues={[
                [0, 0],
                [36, 0],
                [66, 720],
                [100, 720],
              ]}
            />
          </circle>
        </g>
      </Reveal>
      <Reveal at={65} until={94}>
        <path
          d="m261 83 4.5 4.5 9-9"
          fill="none"
          stroke="#208653"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <text x="121" y="196" fontSize="11" fill="#208653">
          Delivered to the team
        </text>
      </Reveal>
      <Cursor
        src="acorn-cursor.webp"
        size={36}
        presses={[35]}
        path={[
          [0, "238 145"],
          [8, "238 145"],
          [32, "302 84"],
          [45, "302 84"],
          [59, "321 106"],
          [83, "321 106"],
          [100, "238 145"],
        ]}
      />
    </>
  );
}

const scenes = {
  connect: {
    Content: Admin,
    viewBox: "0 0 407 272",
    seconds: 5.8,
    loop: false,
  },
  assist: { Content: Ops, viewBox: "0 0 771 830", seconds: 7.6, loop: true },
  automate: {
    Content: Sales,
    viewBox: "56 178 670 465",
    seconds: 6,
    loop: true,
  },
  learn: {
    Content: Management,
    viewBox: "0 0 384 260",
    seconds: 6,
    loop: true,
  },
};

export function WorkspaceDemo({ id }: { id: keyof typeof scenes }) {
  const scene = scenes[id];
  return (
    <Timeline.Provider value={scene}>
      <svg
        data-workspace-demo={id}
        viewBox={scene.viewBox}
        width="100%"
        height="100%"
        aria-hidden="true"
        fontFamily="Roboto, Arial, sans-serif"
        fontSize="14"
        fill="#202830"
      >
        <scene.Content />
      </svg>
    </Timeline.Provider>
  );
}
