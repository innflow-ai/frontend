import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import styles from "./article.module.css";

export function BlogSearch({
  defaultValue = "",
  id = "blog-search",
  tone = "dark",
}: {
  defaultValue?: string;
  id?: string;
  tone?: "dark" | "light";
}) {
  return (
    <search>
      <form
        className={`${styles.search}${tone === "light" ? ` ${styles.searchLight}` : ""}`}
        action="/blog"
        method="get"
      >
        <label className={styles.srOnly} htmlFor={id}>
          Search the Innflow blog
        </label>
        <input
          id={id}
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder="Search"
          autoComplete="off"
        />
        <button type="submit">
          <MagnifyingGlass size={16} weight="bold" aria-hidden="true" />
          Search
        </button>
      </form>
    </search>
  );
}
