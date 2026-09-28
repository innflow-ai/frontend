"use client";

import {
  ArrowUpRight,
  Books,
  CaretDown,
  CaretRight,
  ChatCircleDots,
  ChatText,
  Code,
  Files,
  GraduationCap,
  List,
  MagnifyingGlass,
  Megaphone,
  PlugsConnected,
  Robot,
  SidebarSimple,
  Sparkle,
  TrendUp,
  UsersThree,
  Warning,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { helpArticles, helpCategories } from "@/content/help-center";
import styles from "./help-center.module.css";

const cards = [
  {
    title: "Connect my tools",
    description: "Connect the apps your team uses",
    icon: PlugsConnected,
    article: 0,
  },
  {
    title: "Build a workflow",
    description: "Bring recurring work into one flow",
    icon: SidebarSimple,
    article: 1,
  },
  {
    title: "Set up an AI agent",
    description: "Give your agent tools and context",
    icon: Robot,
    article: 2,
  },
  {
    title: "Manage my workspace",
    description: "Connect people, work, and knowledge",
    icon: UsersThree,
    article: 9,
  },
  {
    title: "Add files and knowledge",
    description: "Keep the right information close",
    icon: Files,
    article: 3,
  },
  {
    title: "Review workflow activity",
    description: "See what happened at every step",
    icon: Sparkle,
    article: 7,
  },
];
const popular = [
  "Connect an integration",
  "Build my first workflow",
  "Add files and knowledge",
  "Set up an AI agent",
  "Manage permissions",
];
const popularQueries = [
  "connection",
  "first workflow",
  "files",
  "AI agent",
  "permissions",
];
const menus = [
  {
    title: "Product",
    links: [
      ["Platform", "/platform"],
      ["AI agents", "/products/agent-studio"],
      ["Workflows", "/features/workflows"],
      ["Integrations", "/integrations"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["Solutions", "/solutions"],
      ["Industries", "/industries"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Resource library", "/resources"],
      ["Blog", "/blog"],
      ["Help center", "/help"],
      ["Contact us", "/contact"],
    ],
  },
];

export function HelpCenter() {
  const [announcement, setAnnouncement] = useState(true);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<
    "search" | "menu" | "support" | "navigation" | null
  >(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = helpArticles.filter((article) =>
    words.every((word) =>
      `${article.title} ${article.description} ${article.keywords}`
        .toLowerCase()
        .includes(word),
    ),
  );

  function openModal(kind: NonNullable<typeof modal>, initialQuery = "") {
    opener.current = document.activeElement as HTMLElement;
    setQuery(initialQuery);
    setModal(kind);
  }
  function closeModal() {
    dialog.current?.close();
    setModal(null);
    opener.current?.focus();
  }
  useEffect(() => {
    if (!modal) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (modal === "search") input.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [modal]);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        opener.current = document.activeElement as HTMLElement;
        setQuery("");
        setModal("search");
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  const supportLinks = (
    <>
      <button type="button" onClick={() => openModal("support")}>
        <ChatText />
        Contact support
      </button>
      <a href={`mailto:${siteConfig.supportEmail}?subject=Report%20abuse`}>
        <Warning />
        Report abuse
      </a>
      <a href="/resources">
        <UsersThree />
        Innflow resources
        <ArrowUpRight />
      </a>
      <a href="/platform/integrations">
        <Code />
        Integration guides
        <ArrowUpRight />
      </a>
    </>
  );
  const categories = (
    <div className={styles.categories}>
      <p>Categories</p>
      {helpCategories.map((category) => (
        <details key={category.title}>
          <summary>
            <CaretRight />
            {category.title}
          </summary>
          <div>
            {category.articles.map((index) => (
              <a key={index} href={helpArticles[index].href}>
                {helpArticles[index].title}
              </a>
            ))}
          </div>
        </details>
      ))}
    </div>
  );

  return (
    <div className={styles.page} data-announcement={announcement}>
      <header className={styles.header}>
        {announcement && (
          <div className={styles.announcement}>
            <Megaphone size={16} />
            <a href="/platform">
              Meet Innflow, your connected workspace for everyday work.
              <span>
                Learn more <ArrowUpRight />
              </span>
            </a>
            <button
              type="button"
              aria-label="Dismiss announcement"
              onClick={() => setAnnouncement(false)}
            >
              <X />
            </button>
          </div>
        )}
        <div className={styles.navbar}>
          <a href="/" aria-label="Innflow home">
            <Image
              className={styles.logo}
              src="/brand/innflow_logo_set_B.svg"
              alt="Innflow"
              width={150}
              height={36}
              priority
            />
          </a>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {menus.map((menu) => (
              <details key={menu.title}>
                <summary>
                  {menu.title}
                  <CaretDown size={13} />
                </summary>
                <div>
                  {menu.links.map(([label, href]) => (
                    <a href={href} key={href}>
                      {label}
                    </a>
                  ))}
                </div>
              </details>
            ))}
            <a href="/pricing">Pricing</a>
          </nav>
          <div className={styles.navActions}>
            <a className={styles.sales} href={siteConfig.contactUrl}>
              Talk to sales
            </a>
            <a className={styles.login} href={siteConfig.appOrigin}>
              Log in
            </a>
            <a className={styles.primary} href={siteConfig.signupUrl}>
              Get started<span>&nbsp;for free</span>
            </a>
            <button
              className={styles.hamburger}
              type="button"
              aria-label="Open navigation"
              onClick={() => openModal("navigation")}
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </header>
      <aside className={styles.sidebar} aria-label="Help navigation">
        <div className={styles.sidebarSearch}>
          <button type="button" onClick={() => openModal("search")}>
            <MagnifyingGlass />
            Search...<kbd>⌘ K</kbd>
          </button>
        </div>
        <div className={styles.sidebarScroll} data-lenis-prevent>
          <div className={styles.sectionLinks}>
            <a href="/help" aria-current="page">
              <Books />
              Help Center
            </a>
            <a href="/resources">
              <GraduationCap />
              Learning Hub
            </a>
          </div>
          {categories}
        </div>
        <div className={styles.supportLinks}>{supportLinks}</div>
      </aside>
      <div className={styles.body}>
        <main id="main-content" className={styles.main}>
          <section className={styles.hero}>
            <h1>How can we help?</h1>
            <p>
              Find clear answers, solve issues fast, and get back to what
              matters.
            </p>
            <button
              className={styles.heroSearch}
              type="button"
              onClick={() => openModal("search")}
            >
              <MagnifyingGlass size={24} />
              <span>Search for anything...</span>
              <kbd>⌘ K</kbd>
            </button>
            <div className={styles.popular}>
              <p>
                <TrendUp size={16} />
                Popular searches
              </p>
              <div>
                {popular.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => openModal("search", popularQueries[i])}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>
          <section className={styles.using} aria-labelledby="using-innflow">
            <h2 id="using-innflow">Using Innflow</h2>
            <div className={styles.cardGrid}>
              {cards.map(({ title, description, icon: Icon, article }) => (
                <a
                  className={styles.card}
                  key={title}
                  href={helpArticles[article].href}
                >
                  <span className={styles.cardIcon}>
                    <Icon size={32} />
                  </span>
                  <span className={styles.cardText}>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </span>
                  <span className={styles.arrow}>
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              ))}
            </div>
          </section>
          <section className={`${styles.feature} ${styles.learning}`}>
            <div className={styles.featureText}>
              <h2>Learning hub</h2>
              <p>
                Learn how to use Innflow at your own pace with resources and
                workflow guides.
              </p>
              <a className={styles.primary} href="/resources">
                <span>Start learning</span>
                <ArrowUpRight />
              </a>
            </div>
            <Image
              src="/brand/help/learning.png"
              alt="Getting started with Innflow: from setup to your first workflow"
              width={832}
              height={497}
            />
          </section>
          <section className={styles.feature}>
            <div className={styles.featureText}>
              <h2>Innflow integrations</h2>
              <p>
                Build connected workflows with the tools and systems your team
                already uses.
              </p>
              <a className={styles.primary} href="/platform/integrations">
                <span>Explore integrations</span>
                <ArrowUpRight />
              </a>
            </div>
            <Image
              src="/brand/help/integrations.png"
              alt="Innflow connected to tools, workflows, and data"
              width={832}
              height={497}
            />
          </section>
        </main>
        <section className={styles.needHelp}>
          <h2>Still need help?</h2>
          <p>Our team is here to help you find the next step.</p>
          <div className={styles.cardGrid}>
            <a className={styles.card} href="/resources">
              <span className={styles.cardIcon}>
                <UsersThree size={32} />
              </span>
              <span className={styles.cardText}>
                <strong>Explore Innflow resources</strong>
                <span>Find ideas and helpful guides</span>
              </span>
              <span className={styles.arrow}>
                <ArrowUpRight />
              </span>
            </a>
            <button
              className={styles.card}
              type="button"
              onClick={() => openModal("support")}
            >
              <span className={styles.cardIcon}>
                <ChatText size={32} />
              </span>
              <span className={styles.cardText}>
                <strong>Contact support</strong>
                <span>Get in touch with our team</span>
              </span>
              <span className={styles.arrow}>
                <ArrowUpRight />
              </span>
            </button>
          </div>
        </section>
        <footer className={styles.footer}>
          <span>English</span>
          <div>
            <a href="/legal/privacy-policy">Privacy Policy</a>
            <a href="/legal/terms-of-service">Terms</a>
            <a href="/legal/cookie-policy">Cookie Policy</a>
            <a href="/contact">Contact</a>
          </div>
          <small>Copyright Innflow {new Date().getFullYear()}</small>
        </footer>
      </div>
      <button
        className={styles.chat}
        type="button"
        aria-label="Open support"
        onClick={() => openModal("support")}
      >
        <ChatCircleDots size={26} />
      </button>
      <nav className={styles.mobileBar} aria-label="Help tools">
        <a href="/help" aria-current="page">
          <Books />
          Help
        </a>
        <a href="/resources">
          <GraduationCap />
          Learn
        </a>
        <button type="button" onClick={() => openModal("menu")}>
          <SidebarSimple />
          Menu
        </button>
        <button type="button" onClick={() => openModal("search")}>
          <MagnifyingGlass />
          Search
        </button>
        <button type="button" onClick={() => openModal("support")}>
          <ChatText />
          Support
        </button>
      </nav>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: native dialog Escape handling provides the keyboard equivalent of backdrop dismissal. */}
      <dialog
        ref={dialog}
        className={`${styles.dialog} ${modal === "menu" || modal === "navigation" ? styles.menuDialog : ""}`}
        aria-label={
          modal === "search"
            ? "Search help"
            : modal === "support"
              ? "Contact support"
              : "Menu"
        }
        onCancel={(event) => {
          event.preventDefault();
          closeModal();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const r = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < r.left ||
              event.clientX > r.right ||
              event.clientY < r.top ||
              event.clientY > r.bottom
            )
              closeModal();
          }
        }}
      >
        {modal === "search" ? (
          <>
            <div className={styles.dialogSearch}>
              <MagnifyingGlass size={24} />
              <input
                ref={input}
                type="search"
                aria-label="Search help articles"
                placeholder="Search for anything..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={closeModal}
              >
                Esc
              </button>
            </div>
            <div className={styles.results} data-lenis-prevent>
              <p className={styles.resultCount} role="status">
                {query
                  ? `${results.length} results for “${query}”`
                  : "Popular articles"}
              </p>
              {results.map((article) => (
                <article key={article.title}>
                  <a href={article.href}>
                    <strong>{article.title}</strong>
                    <ArrowUpRight size={18} />
                  </a>
                  <p>{article.description}</p>
                  <small>Help Center / {article.category}</small>
                  <details>
                    <summary>
                      <Sparkle size={16} />
                      Quick answer
                      <CaretDown size={14} />
                    </summary>
                    <p>{article.answer}</p>
                    <a href={article.href}>
                      Explore this topic <ArrowUpRight size={14} />
                    </a>
                  </details>
                </article>
              ))}
              {!results.length && (
                <div className={styles.empty}>
                  <h2>No answers found</h2>
                  <p>
                    Try “workflow”, “files”, or “integration”. You can also
                    contact our team for help.
                  </p>
                  <button
                    className={styles.primary}
                    type="button"
                    onClick={() => setModal("support")}
                  >
                    Contact support
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={styles.dialogTitle}>
              <h2>{modal === "support" ? "Contact support" : "Menu"}</h2>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={closeModal}
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.dialogContent} data-lenis-prevent>
              {modal === "support" ? (
                <>
                  <h3>How can we help?</h3>
                  <p>
                    Share your question and the details our team needs to help
                    you.
                  </p>
                  <a
                    className={styles.supportOption}
                    href={`mailto:${siteConfig.supportEmail}`}
                  >
                    <ChatText size={24} />
                    <span>
                      <strong>Email support</strong>
                      <small>{siteConfig.supportEmail}</small>
                    </span>
                    <ArrowUpRight />
                  </a>
                  <a
                    className={styles.supportOption}
                    href={siteConfig.contactUrl}
                  >
                    <UsersThree size={24} />
                    <span>
                      <strong>Talk to our team</strong>
                      <small>Discuss your workspace and workflows</small>
                    </span>
                    <ArrowUpRight />
                  </a>
                </>
              ) : modal === "menu" ? (
                <>
                  {categories}
                  <div className={styles.supportLinks}>{supportLinks}</div>
                </>
              ) : (
                <>
                  {menus.map((menu) => (
                    <div className={styles.navigationGroup} key={menu.title}>
                      <h3>{menu.title}</h3>
                      {menu.links.map(([label, href]) => (
                        <a key={href} href={href}>
                          {label}
                          <ArrowUpRight />
                        </a>
                      ))}
                    </div>
                  ))}
                  <a href="/pricing">Pricing</a>
                  <a href={siteConfig.appOrigin}>Log in</a>
                </>
              )}
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
