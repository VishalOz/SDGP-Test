// Commit 3
  function isValidTracking(trk) {
    if (!trk) return false;
    const cleaned = trk.replace(/\s+/g, "");
    if (/^\d+$/.test(cleaned)) {
      return (
        [12, 15, 20].includes(cleaned.length) ||
        (cleaned.length >= 10 && cleaned.length <= 22)
      );
    }
    // alphanumeric fallback (allow hyphens)
    const alphaNum = cleaned.replace(/[-]/g, "");
    return (
      /^[A-Za-z0-9]+$/.test(alphaNum) &&
      alphaNum.length >= 10 &&
      alphaNum.length <= 34
    );
  }

  // --- Mock lookup function (simulate async API) ---
  function mockLookup(trackingNumber) {
    return new Promise((resolve) => {
      // Simulate network latency
      setTimeout(() => {
        // Return a fake status based on last digit/char to vary responses
        const last = trackingNumber.trim().slice(-1);
        const statuses = {
          delivered: "Delivered",
          in_transit: "In Transit",
          exception: "Exception - contact support",
          label_created: "Label Created",
        };
        // simple heuristic
        let key = "in_transit";
        if (/[02468]$/.test(last)) key = "delivered";
        if (/[13579]$/.test(last)) key = "in_transit";
        if (/[A-Za-z]$/.test(last)) key = "label_created";
        if (/9$/.test(last)) key = "exception";

        resolve({
          trackingNumber,
          status: statuses[key],
          lastLocation: "Memphis, TN (mock)",
          estimatedDelivery:
            key === "delivered" ? null : "2 business days (mock)",
        });
      }, 600 + Math.random() * 900);
    });
  }

  // --- DOM helpers and state ---
  const form = document.getElementById("tracking-form");
  const input = document.getElementById("tracking-input");
  const resultBox = document.getElementById("tracking-result");
  const errorBox = document.getElementById("tracking-error");
  const recentList = document.getElementById("recent-trackings");
  const LIVE_REGION_ID = "tracking-live-region";

  // Accessible live region (create if missing)
  let live = document.getElementById(LIVE_REGION_ID);
  if (!live) {
    live = document.createElement("div");
    live.id = LIVE_REGION_ID;
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");
    live.style.position = "absolute";
    live.style.width = "1px";
    live.style.height = "1px";
    live.style.overflow = "hidden";
    live.style.clip = "rect(1px, 1px, 1px, 1px)";
    document.body.appendChild(live);
  }

  // Manage recent numbers in localStorage
  const RECENT_KEY = "sdgp_recent_trackings";
  function getRecent() {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  function saveRecent(arr) {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(arr.slice(0, 10)));
    } catch (e) {}
  }
  function addToRecent(trk) {
    const arr = getRecent().filter((x) => x !== trk);
    arr.unshift(trk);
    saveRecent(arr);
    renderRecent();
  }
  function renderRecent() {
    if (!recentList) return;
    const arr = getRecent();
    if (arr.length === 0) {
      recentList.innerHTML =
        '<div class="no-recent">No recent tracking numbers</div>';
      return;
    }
    recentList.innerHTML = arr
      .map(
        (t) =>
          `<button class="recent-btn" data-trk="${t}" aria-label="Lookup ${t}">${t}</button>`
      )
      .join("");
    recentList
      .querySelectorAll(".recent-btn")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          submitTracking(btn.getAttribute("data-trk"))
        )
      );
  }

  // UI: show error
  function showError(msg) {
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.style.display = "block";
      input && input.setAttribute("aria-invalid", "true");
    } else {
      alert(msg);
    }
    live.textContent = msg;
  }
  function clearError() {
    if (errorBox) {
      errorBox.textContent = "";
      errorBox.style.display = "none";
      input && input.removeAttribute("aria-invalid");
    }
  }

  // UI: show result
  function showResult(data) {
    if (!resultBox) {
      console.log("Tracking result:", data);
      live.textContent = `Status for ${data.trackingNumber}: ${data.status}`;
      return;
    }
    const html = `
      <div class="result-card" role="status" aria-live="polite">
        <div class="result-number">Tracking: <strong>${escapeHtml(
          data.trackingNumber
        )}</strong></div>
        <div class="result-status">Status: <strong>${escapeHtml(
          data.status
        )}</strong></div>
        <div class="result-location">Last known: ${escapeHtml(
          data.lastLocation
        )}</div>
        <div class="result-est">Estimated delivery: ${
          data.estimatedDelivery ? escapeHtml(data.estimatedDelivery) : "N/A"
        }</div>
      </div>
    `;
    resultBox.innerHTML = html;
    live.textContent = `Lookup result: ${data.trackingNumber} — ${data.status}`;
  }

  // small escape helper
  function escapeHtml(s) {
    return ("" + s).replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m])
    );
  }

  // Submit flow (string or event)
  async function submitTracking(valueOrEvent) {
    let trk;
    if (typeof valueOrEvent === "string") trk = valueOrEvent;
    else if (valueOrEvent && valueOrEvent.target) {
      valueOrEvent.preventDefault();
      trk = input ? input.value : "";
    } else {
      trk = "";
    }

    trk = trk ? trk.trim() : "";
    clearError();
    if (!isValidTracking(trk)) {
      showError(
        "Please enter a valid tracking number (check length and characters)."
      );
      return;
    }

    // UI feedback: disable form, show loading
    if (form) {
      form
        .querySelectorAll("input, button, select, textarea")
        .forEach((el) => (el.disabled = true));
    }
    if (resultBox)
      resultBox.innerHTML =
        '<div class="loading">Looking up tracking number…</div>';
    live.textContent = `Looking up ${trk}`;

    try {
      const data = await mockLookup(trk);
      showResult(data);
      addToRecent(trk);
    } catch (err) {
      showError("Unable to look up tracking at this time (mock).");
      console.error(err);
    } finally {
      if (form)
        form
          .querySelectorAll("input, button, select, textarea")
          .forEach((el) => (el.disabled = false));
    }
  }

  // Form hook up
  if (form) {
    form.addEventListener("submit", submitTracking);
  } else {
    // If there is no form element, add a click to the submit button if present
    const submitBtn = document.getElementById("tracking-submit");
    if (submitBtn) {
      submitBtn.addEventListener("click", submitTracking);
    }
  }

  // Input: allow enter submission when focused
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitTracking();
      }
    });
  }

  // Initialize recent items on load
  document.addEventListener("DOMContentLoaded", renderRecent);

  // Expose a tiny debugging object
  window.sdgpTracking = {
    isValidTracking,
    mockLookup,
    submitTracking,
    getRecent,
  };
})();
