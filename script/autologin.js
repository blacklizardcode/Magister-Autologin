async function getCredentials() {
  const data = await browser.storage.local.get([
    "magister-autologin-username",
    "magister-autologin-password"
  ]);

  return {
    username: data["magister-autologin-username"] || "",
    password: data["magister-autologin-password"] || ""
  };
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
      return true;
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
      return true;
    } else {
        return false;
    }
  }
  return false;
}


(async () => {
  const { username, password } = await getCredentials();
  const usernameFilled = await fillUsername(username);
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
