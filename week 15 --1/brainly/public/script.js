const state = {
  token: localStorage.getItem("brainly_token"),
  content: [],
  filter: "all",
};

const grid = document.querySelector("#contentGrid");
const statusBox = document.querySelector("#status");
const authButton = document.querySelector("#authButton");
const addButton = document.querySelector("#addButton");
const shareButton = document.querySelector("#shareButton");
const authModal = document.querySelector("#authModal");
const contentModal = document.querySelector("#contentModal");
const shareModal = document.querySelector("#shareModal");
const authForm = document.querySelector("#authForm");
const signupButton = document.querySelector("#signupButton");
const contentForm = document.querySelector("#contentForm");
const createShareButton = document.querySelector("#createShareButton");
const disableShareButton = document.querySelector("#disableShareButton");
const shareLink = document.querySelector("#shareLink");
const shareCount = document.querySelector("#shareCount");

const demoContent = [
  {
    id: "demo-1",
    type: "document",
    title: "Future Projects",
    link: "https://example.com/projects",
    tags: ["productivity", "ideas"],
    addedOn: "2024-03-10T00:00:00.000Z",
  },
  {
    id: "demo-2",
    type: "youtube",
    title: "How to Build a Second Brain",
    link: "https://www.youtube.com/watch?v=example",
    tags: ["productivity", "learning"],
    addedOn: "2024-03-09T00:00:00.000Z",
  },
  {
    id: "demo-3",
    type: "tweet",
    title: "Productivity Tip",
    link: "https://twitter.com/example/status/1",
    tags: ["productivity", "learning"],
    addedOn: "2024-03-08T00:00:00.000Z",
  },
];

function setStatus(message, isError = false) {
  statusBox.hidden = !message;
  statusBox.textContent = message || "";
  statusBox.style.borderColor = isError ? "#fecaca" : "#e5e7eb";
}

function openModal(modal) {
  modal.hidden = false;
}

function closeModals() {
  document.querySelectorAll(".overlay").forEach((modal) => {
    modal.hidden = true;
  });
}

function authHeaders() {
  return state.token ? { Authorization: `Bearer ${state.token}` } : {};
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = Array.isArray(data.errors)
      ? data.errors.map((error) => error.message).join(", ")
      : "";
    throw new Error(detail || data.message || "Request failed");
  }

  return data;
}

function typeIcon(type) {
  return {
    document: "▤",
    tweet: "t",
    youtube: "▻",
    link: "↔",
  }[type] || "▤";
}

function typeLabel(item) {
  if (item.id && item.id.startsWith("demo-1")) return "Project Ideas";
  if (item.type === "tweet") return item.title;
  if (item.type === "youtube") return item.title;
  return item.type[0].toUpperCase() + item.type.slice(1);
}

function formatDate(value) {
  if (!value) return "Added recently";
  const date = new Date(value);
  return `Added on ${date.toLocaleDateString("en-GB")}`;
}

function renderContent() {
  const source = state.token ? state.content : demoContent;
  const visible = state.filter === "all" || state.filter === "tags"
    ? source
    : source.filter((item) => item.type === state.filter);

  shareCount.textContent = `${source.length} items will be shared`;
  authButton.textContent = state.token ? "Sign Out" : "Sign In";

  if (!visible.length) {
    grid.innerHTML = `<article class="card"><h2>No notes yet</h2><p>Add your first piece of content to start building your second brain.</p></article>`;
    return;
  }

  grid.innerHTML = visible
    .map((item) => {
      const body = item.type === "document"
        ? `<h2>${item.title}</h2><ul><li>Build a personal knowledge base</li><li>Create a habit tracker</li><li>Design a minimalist todo app</li></ul>`
        : item.type === "youtube"
          ? `<div class="preview">▧</div>`
          : `<p>The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.</p>`;

      return `
        <article class="card">
          <div class="card-head">
            <div class="card-kind"><span>${typeIcon(item.type)}</span>${typeLabel(item)}</div>
            <div>
              <button class="icon-button" data-share-card="${item.link}" title="Open content">⌘</button>
              ${state.token ? `<button class="icon-button" data-delete="${item.id}" title="Delete content">⌫</button>` : ""}
            </div>
          </div>
          ${body}
          <div class="chips">${item.tags.map((tag) => `<span class="chip">#${tag}</span>`).join("")}</div>
          <span class="date">${formatDate(item.addedOn)}</span>
        </article>
      `;
    })
    .join("");
}

async function loadContent() {
  if (!state.token) {
    renderContent();
    return;
  }

  try {
    const data = await api("/api/v1/content");
    state.content = data.content || [];
    setStatus("");
  } catch (error) {
    setStatus(error.message, true);
  }

  renderContent();
}

authButton.addEventListener("click", () => {
  if (state.token) {
    localStorage.removeItem("brainly_token");
    state.token = "";
    state.content = [];
    renderContent();
    setStatus("Signed out. Showing sample notes.");
    return;
  }

  openModal(authModal);
});

addButton.addEventListener("click", () => {
  if (!state.token) {
    openModal(authModal);
    return;
  }

  openModal(contentModal);
});

shareButton.addEventListener("click", () => {
  if (!state.token) {
    openModal(authModal);
    return;
  }

  openModal(shareModal);
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", closeModals);
});

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderContent();
  });
});

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value;

  try {
    const data = await api("/api/v1/signin", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    state.token = data.token;
    localStorage.setItem("brainly_token", data.token);
    closeModals();
    await loadContent();
  } catch (error) {
    setStatus(error.message, true);
  }
});

signupButton.addEventListener("click", async () => {
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value;

  try {
    await api("/api/v1/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setStatus("Signup successful. You can sign in now.");
  } catch (error) {
    setStatus(error.message, true);
  }
});

contentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const tags = document.querySelector("#contentTags").value.split(",").map((tag) => tag.trim()).filter(Boolean);

  try {
    await api("/api/v1/content", {
      method: "POST",
      body: JSON.stringify({
        type: document.querySelector("#contentType").value,
        title: document.querySelector("#contentTitle").value.trim(),
        link: document.querySelector("#contentLink").value.trim(),
        tags,
      }),
    });
    contentForm.reset();
    closeModals();
    await loadContent();
  } catch (error) {
    setStatus(error.message, true);
  }
});

createShareButton.addEventListener("click", async () => {
  try {
    const data = await api("/api/v1/brain/share", {
      method: "POST",
      body: JSON.stringify({ share: true }),
    });
    shareLink.hidden = false;
    shareLink.value = `${location.origin}${data.link}`;
    await navigator.clipboard?.writeText(shareLink.value);
    setStatus("Share link created and copied.");
  } catch (error) {
    setStatus(error.message, true);
  }
});

disableShareButton.addEventListener("click", async () => {
  try {
    await api("/api/v1/brain/share", {
      method: "POST",
      body: JSON.stringify({ share: false }),
    });
    shareLink.hidden = true;
    shareLink.value = "";
    closeModals();
    setStatus("Sharing disabled.");
  } catch (error) {
    setStatus(error.message, true);
  }
});

grid.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest("[data-delete]");
  const openButton = event.target.closest("[data-share-card]");

  if (openButton) {
    window.open(openButton.dataset.shareCard, "_blank", "noopener");
  }

  if (deleteButton) {
    try {
      await api("/api/v1/content", {
        method: "DELETE",
        body: JSON.stringify({ contentId: deleteButton.dataset.delete }),
      });
      await loadContent();
    } catch (error) {
      setStatus(error.message, true);
    }
  }
});

loadContent();
