document.getElementById("saveBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  await browser.storage.local.set({
    "magister-autologin-username": username,
    "magister-autologin-password": password
  });
});