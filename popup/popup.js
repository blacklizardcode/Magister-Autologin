document.getElementById("saveBtn").addEventListener("click", async () => {
  const enabled = document.getElementById("enabled").checked;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;


  await browser.storage.local.set({
    "magister-autologin-enabled": enabled,
    "magister-autologin-username": username,
    "magister-autologin-password": password
  });
});


document.addEventListener("DOMContentLoaded", async () => {
  const enabledInput = document.getElementById("enabled");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const stored = await browser.storage.local.get([
    "magister-autologin-enabled",
    "magister-autologin-username",
    "magister-autologin-password"
  ]);

  if (typeof stored["magister-autologin-enabled"] === "boolean") {
    enabledInput.checked = stored["magister-autologin-enabled"];
  }

  if (typeof stored["magister-autologin-username"] === "string") {
    usernameInput.value = stored["magister-autologin-username"];
  }

  if (typeof stored["magister-autologin-password"] === "string") {
    passwordInput.value = stored["magister-autologin-password"];
  }
});
