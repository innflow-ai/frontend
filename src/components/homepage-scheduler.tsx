import {
  Bell,
  CalendarBlank,
  CalendarCheck,
  ChartBar,
  CheckCircle,
  Circle,
  Clock,
  GearSix,
  LinkSimple,
  ListBullets,
  Plugs,
  Signpost,
  User,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import styles from "./homepage-scheduler.module.css";

const navigation = [
  { label: "Booking pages", icon: ListBullets },
  { label: "Scheduled events", icon: CalendarCheck },
  { label: "Availability", icon: Clock },
  { label: "Routing forms", icon: Signpost },
  { label: "Generated links", icon: LinkSimple },
  { label: "Notification settings", icon: Bell },
  { label: "Analytics", icon: ChartBar },
  { label: "Integrations", icon: Plugs },
  { label: "Client management", icon: Users },
];

const features = [
  {
    title: "Set up additional booking types",
    copy: "Offer different meeting lengths and group sessions.",
    art: "booking-types",
    icon: CalendarBlank,
  },
  {
    title: "Send automated reminders",
    copy: "Remind guests before meetings and follow up afterward.",
    art: "reminders",
    icon: Bell,
  },
  {
    title: "Route bookings to the right person",
    copy: "Match each guest with the right member of your team.",
    art: "routing",
    icon: Signpost,
  },
];

const tasks = [
  "Connect calendar",
  "Make a test booking",
  "Add email signature",
  "Add your logo",
  "Claim custom link",
];

export function HomepageScheduler() {
  return (
    <section className={styles.section} aria-labelledby="scheduler-heading">
      <h2 id="scheduler-heading">Your scheduling workspace</h2>
      <figure
        className={styles.window}
        aria-label="Scheduling workspace preview"
      >
        <aside className={styles.sidebar}>
          <strong>Scheduler</strong>
          <ul>
            {navigation.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Icon />
                {label}
              </li>
            ))}
          </ul>
          <small>Team scheduling</small>
          <ul>
            {["Managed schedules", "Groups", "Teams"].map((label) => (
              <li key={label}>
                <Users />
                {label}
              </li>
            ))}
          </ul>
          <span className={styles.settings}>
            <GearSix /> Settings
          </span>
        </aside>
        <div className={styles.main}>
          <strong className={styles.title}>Booking pages</strong>
          <div className={styles.features}>
            {features.map(({ title, copy, art, icon: Icon }) => (
              <div key={art} className={styles.feature}>
                <div>
                  <Icon />
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
                <Image
                  src={`/preview/homepage/scheduler/${art}.webp`}
                  width={100}
                  height={143}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className={styles.profile}>
            <Image
              src="/brand/innflow-favicon.svg"
              alt=""
              width={23}
              height={23}
            />{" "}
            Julian Patrick | Innflow
          </div>
          <strong className={styles.label}>My booking pages (1)</strong>
          <div className={styles.bookings}>
            <div className={styles.booking}>
              <strong>30 mins with Julian</strong>
              <span>
                <Clock />
                30 mins · <User />
                One on one
              </span>
            </div>
            <div className={styles.empty}>
              <CalendarBlank size={32} />
            </div>
          </div>
          <div className={styles.checklist}>
            <div className={styles.checkHeader}>
              <strong>Get booked faster</strong>
              <p>Finish setting up your booking page.</p>
              <div>
                <progress value={1} max={5} aria-label="Setup progress" />
                <small>1/5</small>
              </div>
            </div>
            <ul>
              {tasks.map((task, index) => (
                <li key={task}>
                  {index === 0 ? (
                    <CheckCircle weight="fill" aria-label="Completed" />
                  ) : (
                    <Circle />
                  )}
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </figure>
    </section>
  );
}
