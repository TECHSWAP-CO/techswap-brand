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

document.querySelectorAll("#signatureForm input").forEach((input) => {
  input.addEventListener("input", updateSignaturePreview);
});
