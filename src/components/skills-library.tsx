"use client";

import { useMemo, useState } from "react";
import styles from "@/app/skills/page.module.css";
import type { SkillCategory, SkillSummary } from "@/lib/skills";
import { skillColorValue } from "@/lib/skills";

type SkillsLibraryProps = {
  skills: SkillSummary[];
  categories: SkillCategory[];
};

export function SkillsLibrary({ skills, categories }: SkillsLibraryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return skills.filter((skill) => {
      if (activeCategory !== "all" && skill.category?.slug !== activeCategory) {
        return false;
      }
      if (!needle) return true;
      const haystack =
        `${skill.name} ${skill.shortDescription ?? ""}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [skills, activeCategory, query]);

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.chips}>
          <button
            type="button"
            className={styles.filterChip}
            data-active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={styles.filterChip}
              data-active={activeCategory === category.slug}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.title}
            </button>
          ))}
        </div>
        <input
          type="search"
          className={styles.search}
          placeholder="Search skills…"
          aria-label="Search skills"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <p className={styles.count} aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "skill" : "skills"}
      </p>
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>
            No skills match that filter. Try a different search or category.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      )}
    </>
  );
}

function SkillCard({ skill }: { skill: SkillSummary }) {
  const accent = skillColorValue(skill.color, skill.cardColor);
  return (
    <a
      className={styles.card}
      href={`/skills/${skill.slug}`}
      style={{ borderTopColor: accent }}
    >
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <span
            className={styles.dot}
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          {skill.category ? (
            <span className={styles.chip}>{skill.category.title}</span>
          ) : null}
        </div>
        <h3>{skill.name}</h3>
        {skill.shortDescription ? (
          <p className={styles.excerpt}>{skill.shortDescription}</p>
        ) : null}
        {skill.builtBy ? (
          <p className={styles.builtBy}>Built by {skill.builtBy}</p>
        ) : null}
      </div>
    </a>
  );
}
