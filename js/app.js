const updateSignaturePreview = () => {
  document.getElementById("previewPhone").textContent =
    document.getElementById("inputPhone").value || "[Phone Number]";
  document.getElementById("previewEmail").textContent =
    document.getElementById("inputEmail").value || "[Email Address]";
  document.getElementById("previewName").textContent =
    document.getElementById("inputName").value || "[Full Name]";
  document.getElementById("previewRole").textContent =
    document.getElementById("inputRole").value || "[Role or Position]";
};

const getAbsoluteUrl = (relativeUrl) => {
  const baseUrl = window.location.href.replace(/\/[^\/]*$/, "/");
  const anchor = document.createElement("a");
  anchor.href = relativeUrl;
  return anchor.href.startsWith("file:") && !relativeUrl.match(/^[a-z][a-z0-9+.-]*:/i)
    ? baseUrl + relativeUrl.replace(/^\.\//, "")
    : anchor.href;
};

const getSignatureHtml = () => {
  const preview = document.getElementById("signaturePreview").cloneNode(true);
  preview.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    if (src && !/^[a-z][a-z0-9+.-]*:/i.test(src)) {
      img.setAttribute("src", getAbsoluteUrl(src));
    }
  });
  preview.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && !/^(mailto:|tel:|#|javascript:|data:|http:|https:)/i.test(href)) {
      link.setAttribute("href", getAbsoluteUrl(href));
    }
  });
  return preview.innerHTML;
};

const copySignatureHtml = async () => {
  const html = getSignatureHtml();
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
      }),
    ]);
    alert("Signature HTML copied to clipboard.");
  } catch (error) {
    await navigator.clipboard.writeText(html);
    alert("Signature HTML copied as text; paste it into Gmail signature settings.");
  }
};

document.querySelectorAll("#signatureForm input").forEach((input) => {
  input.addEventListener("input", updateSignaturePreview);
});

document.getElementById("copySignatureBtn").addEventListener("click", copySignatureHtml);
