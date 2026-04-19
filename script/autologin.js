async function getCredentials() {
  const key = await getOrCreateCryptoKey();
  const data = await browser.storage.local.get([
    "magister-autologin-enabled",
    "magister-autologin-username",
    "magister-autologin-password"
  ]);

  const storedUsername = data["magister-autologin-username"];
  const storedPassword = data["magister-autologin-password"];

  let username = "";
  if (storedUsername && typeof storedUsername === "object" && storedUsername.iv && storedUsername.data) {
    username = await decryptString(key, storedUsername);
  } else if (typeof storedUsername === "string") {
    username = storedUsername;
  }

  let password = "";
  if (storedPassword && typeof storedPassword === "object" && storedPassword.iv && storedPassword.data) {
    password = await decryptString(key, storedPassword);
  } else if (typeof storedPassword === "string") {
    password = storedPassword;
  }

  return {
    enabled: data["magister-autologin-enabled"] || "",
    username,
    password
  };
}

function waitForElement(selector) {
  return new Promise(resolve => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

async function fillUsername(username) {
  const input = await document.querySelector('#username');
  if (input) {
    input.value = username;
    await input.dispatchEvent(new Event('input', { bubbles: true }));
    await input.dispatchEvent(new Event('change', { bubbles: true }));
    const button = await document.getElementById("username_submit");
    if (button) {
      await button.click();
      setTimeout(10);
      const button2 = await document.getElementById("username_submit");
      if (button2 == null) {
        return true;
      } else {
        return false;
      }
    } else {
        return false;
    }
  }
  return false;
}

async function fillPassword(password) {
  const input = await document.querySelector('#password');
  if (input) {
    input.value = password;
    await input.dispatchEvent(new Event('input', { bubbles: true }));
    await input.dispatchEvent(new Event('change', { bubbles: true }));
    const button = await document.getElementById("password_submit");
    if (button) {
      await button.click();
      setTimeout(10);
      const button2 = await document.getElementById("password_submit");
      if (button2 == null) {
        return true;
      } else {
        return false;
      }
    } else {
        return false;
    }
  }
  return false;
}


(async () => {
  const {enabled,  username, password } = await getCredentials();

  if (!enabled) {
    return;
  }

  const usernameInput = await waitForElement('#username');
  const usernameFilled = await fillUsername(username);

  const passwordInput = await waitForElement('#password');
  const passwordFilled = await fillPassword(password);

  if (!usernameFilled) {
    const observerUsername = new MutationObserver(() => {
      if (fillUsername(username)) {
        observerUsername.disconnect();
      }
    });

    observerUsername.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (!passwordFilled) {
    const observerPassword = new MutationObserver(() => {
      if (fillPassword(password)) {
        observerPassword.disconnect();
      }
    });

    observerPassword.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})()
