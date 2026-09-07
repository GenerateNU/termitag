# TermiTag — Project Wiki

## Index

- [One-Sentence Description](#one-sentence-description)
- [Problem and Value Proposition](#problem-and-value-proposition)
- [What Currently Exists](#what-currently-exists)
- [Competitive Landscape](#competitive-landscape)
- [Target Market](#target-market)
- [Business Model and Pricing](#business-model-and-pricing)
- [What the Client Wants Generate to Build](#what-the-client-wants-generate-to-build)
- [Future Timeline on Hardware](#future-timeline-on-hardware)
- [Open Questions for the Client (Technical)](#open-questions-for-the-client-technical)

---

## One-Sentence Description

TermiTag is a termite detection and prevention **device** that gives property owners early alerts before termite activity becomes costly structural damage or requires broad chemical treatment.

**Our (Generate/dev team) scope:** the software layer — backend, data model, dashboard, and admin tools — that turns the hardware device into a usable, trusted monitoring product.

---

## Problem and Value Proposition

- Homeowners currently only discover termites after **visible structural damage** has occurred — expensive, stressful, and uncertain to resolve.
- Existing detection options are largely **passive** rather than **active**; per the pitch, "every solution is reactive — you don't see them until it's too late."
- Core value proposition: *early detection only creates value if the alert is clearly received, logged, trusted, and easy for the user to act on.*
- Secondary framing: earlier detection → more targeted treatment → less cost and less environmental impact. Pitch adds a specific environmental angle: **tenting (fumigation) releases potent greenhouse gases**, and avoiding it is part of TermiTag's environmental mission.

**Scale/severity data (from pitch — for context, not technical requirements):**
- An estimated **40–60 million American homes** are at risk of termite damage.
- Termites cause an estimated **$5 billion** in damage nationally.
- Ben's own home was quoted **$5,000** just for tenting.
- Termite damage can reduce a home's resale value by **20%+**.
- TermiTag interviewed homeowners across the U.S.; **82%** independently cited the same pain point — no reliable way to detect termites before damage occurs.
- Example beyond single-family homes: Wellesley College dorms reportedly had visible termite damage (holes in floors/walls) — suggests some appetite for the product in institutional/multi-unit settings, though this isn't a stated target market yet (see [Target Market](#target-market)).

---

## What Currently Exists

**Hardware (prototype stage):**
- **Form factor:** In-ground detection stakes, installed flush with the ground, placed roughly **every 10 ft around the perimeter of a house**.
- **Detection mechanism:** Each stake contains a **consumable bait**. When termites feed on the bait, a notification is triggered and sent to the homeowner's phone automatically.
- **Current connectivity:** Devices connect via **USB** — this is a dev/testing convenience only, not a field deployment method. Production units will connect via a **Wi-Fi hub** (see [Future Timeline on Hardware](#future-timeline-on-hardware)); USB is how we can get software talking to the hardware now, ahead of that.
- **No embedded GPS** in the stake itself — this is why device location has to be captured another way at install time (see the QR-scan + phone-GPS approach under [What the Client Wants Generate to Build](#what-the-client-wants-generate-to-build)).

**Frontend (existing prototype):**
- An **HTML mockup**, built by 14 grad students via Northeastern's experiential learning network, using **Claude Code**.
- Has **no backend** and is **not connected to any devices**.
- Serves only as a **mood board / feature reference** — not a foundation to build directly on top of.

---

## Competitive Landscape

| # | Category | Examples | Approx. Cost (per pitch) | Strengths | Weaknesses / Why TermiTag differentiates |
|---|----------|----------|---------------------------|-----------|-------------------------------------------|
| 1 | Professional bait systems | Sentricon-style | Contracts starting at **~$1,000** | Effective | Requires professional install, recurring contracts, technician visits — not self-serve/consumer-controlled |
| 2 | DIY termite stakes | Spectracide-style | **~$200** | Cheap, accessible | Manual inspection required; unreliable — **client-tested confirmation that rain can dissolve the consumable bait, causing false flags** |
| 3 | Visual indicator monitors | Red Eye / Green Eye-style | — | Easier to visually confirm than stakes | Still requires physical inspection — not instant/active detection |
| 4 | Chemical treatment / fumigation ("tenting") | — | Up to **~$5,000** | Current default response | Reactive, not preventive; releases greenhouse gases into the atmosphere |
| 5 | Emerging IoT/remote monitoring concepts | — | — | Validates market direction | Not consumer-focused, not available in the U.S., or too complex/expensive/service-oriented |
| 6 | Professional detection tools | Acoustic/radar detectors | — | Useful for inspectors | Expensive, operator-dependent, not built for continuous 24/7 consumer monitoring |

**Positioning (per pitch):** "Every solution is either unreliable, expensive, or harmful. TermiTag is the only solution that has built-in treatment, real-time detection, and affordable pricing." *(See the open question on "built-in treatment" in [Open Questions](#open-questions-for-the-client-technical).)*

---

## Target Market

**Two target markets, confirmed consistently across all sources:**
- **Individual homeowners** — single-property view.
- **Businesses** — HOAs and pest control companies managing multiple properties — multi-property view.

**Implication for software:** the homeowner vs. company/HOA distinction remains the first-class product concept for the permission/role model (see [What the Client Wants Generate to Build](#what-the-client-wants-generate-to-build)).

---

## Business Model and Pricing

> This is the first source to describe TermiTag's actual pricing/business model in detail. Flagging as potentially relevant to software scope (see note at end of section).

- **Homeowners:** buy a kit for **$300** via TermiTag's website; pay a **$5/month** app subscription fee.
- **Pest control companies & HOAs:** buy devices in bulk at **$10/device**; pay **$5 per property/month** for the "professional monitoring dashboard."
- **Unit economics:** each device costs TermiTag **~$2** to produce and ship.
- **Product lifecycle:** ~3-year device life cycle; TermiTag expects recurring reinstatements/renewals as devices age out.

---

## What the Client Wants Generate to Build

**Scope, given what's described above under [What Currently Exists](#what-currently-exists):** since the existing frontend is disconnected and mockup-only, and Ben is open to a full rebuild, this is effectively a **full-stack build** — a new frontend plus the backend — not a backend-only engagement.

### Product Surface — Responsive Web App

- **Responsive web app** at **termitetag.com**, targeting both desktop and mobile.
- **Push and email notifications** for alerts.
- **Three user tiers:**
  1. **Admin** (Ben, initially — possibly others, see [Open Questions](#open-questions-for-the-client-technical)) — full platform oversight.
  2. **Company / HOA** — multi-property view (property managers, HOAs, pest control companies).
  3. **Individual homeowner** — single-property view.

### Core Homeowner Dashboard View

- Clear, simple **alert status**: "safe" vs. "not safe."
- **Map view** with color-coded device icons per property (🟢 no activity / 🔴 termite detected).
- Map provider: **Google Maps API or OpenStreetMap** (open decision).
- Device pins placed using a **QR-scan + phone-GPS** location captured at install time (compensates for the stake having no embedded GPS).
- Full device/alert **history** view (confirmed in pitch as a homeowner-facing feature, not just admin-facing).

### Company / HOA Tier

- Multi-property view across all managed properties/devices.
- **Auto-notification integration:** notify a linked pest control company when activity is detected. *(Still unclear whether pest control companies get their own account tier vs. are purely a notification recipient — see [Open Questions](#open-questions-for-the-client-technical).)*
- **New consideration (from the business model):** likely need to support **bulk device provisioning** for large contracts (e.g., a pest control company managing 500 homes), not just one-device-at-a-time onboarding.

### Admin Portal (TermiTag Staff)

- Manage customers, devices, error reports, alert records.

### Device Onboarding

- **Connect new device flow** for individual devices (QR scan + GPS, see above).
- Possible **bulk onboarding flow** for company/HOA contracts (see Company / HOA Tier above) — not yet confirmed as in-scope, needs clarification.

### Possible New Scope Item: Treatment/Consumable Tracking

- If the "built-in treatment" claim raised in the pitch reflects an actual current hardware capability rather than aspirational marketing, the software may need to track **treatment-delivery events** and **bait/consumable status** (e.g., remaining capacity, expiration, "needs replacement") as data distinct from termite-detection alerts. **Not yet confirmed as in-scope — pending clarification (see [Open Questions](#open-questions-for-the-client-technical)).**

### Definition of Success (End of Semester)

The client defines success as a **deployable software MVP** supporting real-world TermiTag pilots:

1. Working backend connected to a (new or improved) frontend.
2. Database structure covering: **users, properties, devices, alerts, device history**.
3. Dashboard where users can see: their properties, connected devices, device status, and termite alerts.
4. **Admin tools** for TermiTag staff to manage customers, devices, error reports, and alert records.
5. Clean handoff package: documentation, code structure, deployment instructions, clear next steps.
6. A **demo** where a simulated or real device event triggers an alert in the system end-to-end.

**Confirmed by interview:** the deliverable is expected to be a **fully deployed frontend + backend**, with infrastructure docs/reproduction steps included in handoff.

---

## Future Timeline on Hardware

- **Q1 (completed, per pitch):** Hardware MVP completed; company incorporated; Sherman Venture Co-op secured; team grown.
- **September:** Prototype batch begins — 10 devices available for team testing.
- **Fall (this semester):** "Phase one testing" — beta planned with ~30 homes, some with known/active termite presence. Provisional patent filing also targeted for this period.
- **Oct/Nov:** Manufacturing targeted to begin.
- **December:** Selling targeted to begin.
- **Connectivity shift:** A **Wi-Fi hub** is planned to replace/supplement USB for production units, roughly aligned with the manufacturing phase.

---

## Open Questions for the Client (Technical)

*Resolved items have been removed and folded into the relevant sections above; only open items remain below.*

- **Interface Control Document (ICD) / protocol spec needed (high priority):** The hardware side has no existing driver or reference implementation for the USB connection, so we need a written spec — an ICD — covering: (a) the wire protocol/framing for the USB serial link (baud rate, start/stop framing, checksum, etc.), used for our dev/testing only; and (b) the full payload/message schema — what fields exist beyond a termite-detected trigger (timestamp, battery/power level, device health, raw sensor values, etc.). This is the single most build-blocking item and needs answering before the device-ingestion layer can be designed at all.
- **Payload continuity across transports:** Does the message *content* (device ID, event type, timestamp, battery level, etc.) stay the same across the current USB link and the future Wi-Fi hub, with only the transport-level wrapper differing — or is the USB connection a separate test harness whose payload won't reflect what production actually sends? This determines whether one canonical internal event schema can serve both transports (via thin, transport-specific adapters) or whether we should expect a payload redesign when the Wi-Fi hub ships.
- **Device identity & pairing:** How is each device's unique ID assigned and represented (e.g., burned into firmware, encoded in the QR code scanned at install, or both)? How do we map an incoming signal to the correct device record?
- **Reporting cadence & power source:** Does the device only transmit on-trigger (event-driven), or also send periodic heartbeat/health signals? Now that we know production is Wi-Fi-based, is it battery-powered, and does that constrain how often it can report?
- **Device authentication:** Is there any signing/authentication on device messages, or do we need to design something to guard against spoofed or duplicate signals?
- **Subscription/billing scope (new):** Given the $5/month (homeowner) and $5/property/month (company) pricing model, does the MVP need to enforce or reflect subscription/payment status (e.g., gating dashboard access), or is billing handled entirely outside the app for now?
- **Bulk device onboarding (new):** For large pest control/HOA contracts (potentially hundreds of devices), is a bulk provisioning flow needed at MVP, or is one-at-a-time QR-scan onboarding acceptable for the semester's scope?
- **"Built-in treatment" claim (new, high priority):** Does the current/near-term hardware actually deliver treatment (e.g., an insecticidal bait), or is this a forward-looking/aspirational claim from the pitch deck? If real: does the software need to track treatment-delivery events and bait/consumable status separately from detection alerts?
