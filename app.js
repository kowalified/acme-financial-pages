function getStoredUser() {
  return localStorage.getItem("acmeUser");
}

function setStoredUser(username) {
  localStorage.setItem("acmeUser", username);
}

function getTransferData() {
  const raw = localStorage.getItem("acmeTransfer");
  return raw ? JSON.parse(raw) : null;
}

function setTransferData(data) {
  localStorage.setItem("acmeTransfer", JSON.stringify(data));
}

function clearTransferData() {
  localStorage.removeItem("acmeTransfer");
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "home") {
    const sessionStatus = document.getElementById("session-status");
    const user = getStoredUser();
    if (sessionStatus) {
      sessionStatus.textContent = user
        ? `Signed in as ${user}`
        : "Not signed in.";
    }

    const loadProfileBtn = document.getElementById("load-profile-btn");
    const profileOutput = document.getElementById("profile-output");

    if (loadProfileBtn && profileOutput) {
      loadProfileBtn.addEventListener("click", async () => {
        profileOutput.textContent = "Loading profile...";
        const response = await fetch("/api/profile.json");
        const data = await response.json();
        profileOutput.textContent = JSON.stringify(data, null, 2);
      });
    }
  }

  if (page === "login") {
    const form = document.getElementById("login-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        setStoredUser(username || "Demo User");
        window.location.href = "/login-success.html";
      });
    }
  }

  if (page === "login-success") {
    const welcome = document.getElementById("welcome-message");
    const user = getStoredUser();
    if (welcome && user) {
      welcome.textContent = `Welcome back, ${user}.`;
    }
  }

  if (page === "transfer") {
    const form = document.getElementById("transfer-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        setTransferData({
          from: formData.get("from"),
          to: formData.get("to"),
          amount: formData.get("amount")
        });
        window.location.href = "/transfer-confirmation.html";
      });
    }
  }

  if (page === "transfer-confirmation") {
    const data = getTransferData();
    if (data) {
      document.getElementById("confirm-from").textContent = data.from;
      document.getElementById("confirm-to").textContent = data.to;
      document.getElementById("confirm-amount").textContent = Number(data.amount).toFixed(2);
    }

    const confirmBtn = document.getElementById("confirm-transfer-btn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        window.location.href = "/transfer-success.html";
      });
    }
  }

  if (page === "transfer-success") {
    const data = getTransferData();
    const successMessage = document.getElementById("success-message");
    if (data && successMessage) {
      successMessage.textContent = `Your transfer of $${Number(data.amount).toFixed(2)} has been submitted.`;
    }
    clearTransferData();
  }
});
