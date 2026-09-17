"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { type KeyboardEvent, useRef, useState } from "react";
import { ChannelsDemos } from "./agent-demos/channels-demos";
import styles from "./baseline-features.module.css";
import { features as preparedFeatures } from "./homepage-content";
import { useChannelsScroll } from "./use-channels-scroll";

const root = "/preview/homepage/baseline-features";
type Item = { title: string; icon: string; body?: string };
type Feature = {
  id: string;
  node: string;
  label: string;
  badge?: string;
  title: string;
  reverse?: boolean;
  glyph: string;
  items: Item[];
};

function preparedBody(featureId: string, title: string): string {
  const state = preparedFeatures
    .find((feature) => feature.id === featureId)
    ?.states.find((item) => item.title === title);
  if (!state)
    throw new Error(`Missing prepared feature copy: ${featureId}/${title}`);
  return state.body;
}

export const baselineFeatures: Feature[] = [
  {
    id: "channels",
    node: "350:11199",
    label: "Channels",
    title: "10x with agent",
    glyph: "imgVector.svg",
    items: [
      {
        title: "Orchestrate actions",
        icon: "imgTemplate.svg",
        body: "Give every handoff a clear owner. Route Priority IS Urgent to a teammate and everything else to an agent.",
      },
      {
        title: "All your channels, connected",
        icon: "imgImage.png",
        body: "Connect and scale Slack, Microsoft Teams, Discord, email, chat, your portal and more.",
      },
      {
        title: "An assistant for your team",
        icon: "imgTextCaption.svg",
        body: "Research, triage and resolve requests with an AI assistant that works across your systems.",
      },
      {
        title: "AI agents, working together",
        icon: "imgWindmill.svg",
        body: "Run multiple AI agents alongside human teammates. Keep people in control of complex conversations.",
      },
      {
        title: "Workflows that take action",
        icon: "imgTemplate.svg",
        body: "Route requests, trigger investigations, notify teams and take action in your own systems.",
      },
      {
        title: "Insights from every interaction",
        icon: "imgApps.svg",
        body: "Spot recurring issues, understand customer themes and turn support into product insight.",
      },
      {
        title: "Flexible, API-first building blocks",
        icon: "imgUsersGroup.svg",
        body: "Extend, customize or embed your support infrastructure into your product and existing tools.",
      },
    ],
  },
  {
    id: "agents",
    node: "350:11344",
    label: "Agents",
    badge: "AI",
    title: "Orchestrate your AI agents",
    reverse: true,
    glyph: "imgContainer.svg",
    items: [
      {
        title: "Orchestrate actions",
        icon: "imgIcon1.svg",
        body: "Run multiple AI agents alongside human teammates. Coordinate their work while keeping people in control.",
      },
      {
        title: "Delegate a task. Review the result.",
        icon: "imgImage.png",
        body: preparedBody("agents", "Delegate a task. Review the result."),
      },
      {
        title: "Build your own agents",
        icon: "imgMessages.svg",
        body: preparedBody("agents", "Build your own agents"),
      },
    ],
  },
  {
    id: "workflows",
    node: "350:11402",
    label: "Workflows",
    badge: "Platform",
    title: "Automate the work\nbetween conversations",
    glyph: "imgVector.svg",
    items: [
      {
        title: "Connect external systems",
        icon: "imgList.svg",
        body: "Create a Linear issue, notify engineers or call your own API. Put your support context to work.",
      },
      {
        title: "Build with AI",
        icon: "imgContract.svg",
        body: preparedBody("workflows", "Build with AI"),
      },
      {
        title: "Auto-triage requests",
        icon: "imgApps.svg",
        body: preparedBody("workflows", "Auto-triage requests"),
      },
      {
        title: "Keep thread summaries current",
        icon: "imgSparkles.svg",
        body: preparedBody("workflows", "Keep thread summaries current"),
      },
    ],
  },
  {
    id: "insights",
    node: "350:11485",
    label: "Insights",
    badge: "Platform",
    title: "Learn from your customers",
    reverse: true,
    glyph: "imgVector.svg",
    items: [
      {
        title: "Detect trends",
        icon: "imgImage.png",
        body: "Spot recurring issues, trends and opportunities across every conversation, without manual analysis.",
      },
      {
        title: "Catch up instantly",
        icon: "imgCube.svg",
        body: preparedBody("insights", "Catch up instantly"),
      },
      {
        title: "Daily summaries",
        icon: "imgReceipt.svg",
        body: preparedBody("insights", "Daily summaries"),
      },
      {
        title: "Product insights",
        icon: "imgLink.svg",
        body: preparedBody("insights", "Product insights"),
      },
    ],
  },
];
