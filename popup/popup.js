const keyPromise = getOrCreateCryptoKey();

document.getElementById("saveBtn").addEventListener("click", async () => {
  const key = await keyPromise;
  
  const enabled = document.getElementById("enabled").checked;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;


  const usernameEnc = await encryptString(key, username);
  const passwordEnc = await encryptString(key, password);

  await browser.storage.local.set({
    "magister-autologin-enabled": enabled,
    "magister-autologin-username": usernameEnc,
    "magister-autologin-password": passwordEnc
  });
});


document.addEventListener("DOMContentLoaded", async () => {
  const key = await keyPromise;
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

  const storedUsername = stored["magister-autologin-username"];
  if (storedUsername && typeof storedUsername === "object" && storedUsername.iv && storedUsername.data) {
    usernameInput.value = await decryptString(key, storedUsername);
  } else if (typeof storedUsername === "string") {
    usernameInput.value = storedUsername; // fallback for old plain-text values
  }

  const storedPassword = stored["magister-autologin-password"];
  if (storedPassword && typeof storedPassword === "object" && storedPassword.iv && storedPassword.data) {
    passwordInput.value = await decryptString(key, storedPassword);
  } else if (typeof storedPassword === "string") {
    passwordInput.value = storedPassword; // fallback for old plain-text values
  }
});
