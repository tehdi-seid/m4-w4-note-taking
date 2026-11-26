import type { KeyboardEvent } from "react";
import type { View } from "../notes/types";
import { pressedButton, quietButton } from "./styles";

const TABS: { id: View; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pinned", label: "Pinned" },
  { id: "archived", label: "Archived" },
];

type Props = {
  value: View;
  onChange: (view: View) => void;
  counts: Record<View, number>;
};

export default function ViewTabs({ value, onChange, counts }: Props) {
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = TABS.findIndex((tab) => tab.id === value);
    let next = index;

    switch (event.key) {
      case "ArrowRight":
        next = (index + 1) % TABS.length;
        break;
      case "ArrowLeft":
        next = (index - 1 + TABS.length) % TABS.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = TABS.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextView = TABS[next]?.id;
    if (!nextView) return;
    onChange(nextView);
    document.getElementById(`tab-${nextView}`)?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="Note views"
      className="flex gap-2 overflow-x-auto"
      onKeyDown={onKeyDown}
    >
      {TABS.map((tab) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            className={selected ? pressedButton : quietButton}
            aria-selected={selected}
            aria-controls={`panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
          >
            {tab.label} ({counts[tab.id]})
          </button>
        );
      })}
    </div>
  );
}
