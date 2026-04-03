import { useEffect } from "react";

const HOME_BTN_CLASS = "bl-injected-home";
const WRAPPER_CLASS = "back-home-row";

function injectHomeButtons() {
  document.querySelectorAll(".back-button").forEach((btn) => {
    // Skip if already wrapped
    if (btn.parentElement?.classList.contains(WRAPPER_CLASS)) return;

    // Create wrapper
    const wrapper = document.createElement("div");
    wrapper.className = WRAPPER_CLASS;

    // Insert wrapper before the button, then move button inside
    btn.parentNode?.insertBefore(wrapper, btn);
    wrapper.appendChild(btn);

    // Create home button
    const homeBtn = document.createElement("button");
    homeBtn.className = HOME_BTN_CLASS;
    homeBtn.setAttribute("aria-label", "Početna");
    homeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
    homeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = "/";
    });

    wrapper.appendChild(homeBtn);
  });
}

export default function GlobalHomeButton() {
  useEffect(() => {
    injectHomeButtons();

    const observer = new MutationObserver(() => {
      injectHomeButtons();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
