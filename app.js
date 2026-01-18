const form = document.getElementById("signature-form");
const preview = document.getElementById("signature-preview");
const copyButton = document.getElementById("copy-button");
const clearButton = document.getElementById("clear-button");
const statusBadge = document.getElementById("status");

const config = {
  logoPath: "assets/logo.svg",
  companyName: "Empresa",
  website: "www.empresa.com",
  address: "Av. Paulista, 1000 - São Paulo, SP",
};

const departmentMap = new Map([
  ["administrativo", "Administration"],
  ["comercial", "Sales"],
  ["financeiro", "Finance"],
  ["juridico", "Legal"],
  ["jurídico", "Legal"],
  ["marketing", "Marketing"],
  ["operacoes", "Operations"],
  ["operações", "Operations"],
  ["recursos humanos", "Human Resources"],
  ["rh", "Human Resources"],
  ["ti", "IT"],
  ["tecnologia", "Technology"],
  ["vendas", "Sales"],
]);

const normalizeText = (value) => value.trim().toLowerCase();

const formatDepartment = (value) => {
  const normalized = normalizeText(value);
  return departmentMap.get(normalized) || value;
};

const renderSignature = ({ name, email, phone, department }) => {
  if (!name && !email && !phone && !department) {
    preview.innerHTML = "";
    statusBadge.textContent = "Preencha o formulário para visualizar.";
    return;
  }

  statusBadge.textContent = "Assinatura pronta para copiar.";

  preview.innerHTML = `
    <div class="signature__content" id="signature-html">
      <img class="signature__logo" src="${config.logoPath}" alt="Logotipo" />
      <div class="signature__details">
        <span class="signature__name">${name || "Nome"}</span>
        <span class="signature__department">${formatDepartment(department || "Departamento")}</span>
        <span class="signature__contact">${email || "email@empresa.com"}</span>
        <span class="signature__contact">${phone || "+55 (00) 00000-0000"}</span>
        <span class="signature__contact">${config.companyName} · ${config.website}</span>
        <span class="signature__contact">${config.address}</span>
      </div>
    </div>
  `;
};

const getFormData = () => {
  const data = new FormData(form);
  return {
    name: data.get("name")?.toString() || "",
    email: data.get("email")?.toString() || "",
    phone: data.get("phone")?.toString() || "",
    department: data.get("department")?.toString() || "",
  };
};

const copySignature = async () => {
  const signatureElement = document.getElementById("signature-html");

  if (!signatureElement) {
    statusBadge.textContent = "Preencha os dados antes de copiar.";
    return;
  }

  const htmlContent = signatureElement.outerHTML;
  const textContent = signatureElement.textContent?.trim() || "";

  try {
    if (navigator.clipboard && window.ClipboardItem) {
      const blobHtml = new Blob([htmlContent], { type: "text/html" });
      const blobText = new Blob([textContent], { type: "text/plain" });
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText,
        }),
      ]);
      statusBadge.textContent = "Assinatura copiada!";
      return;
    }

    await navigator.clipboard.writeText(textContent);
    statusBadge.textContent = "Assinatura copiada como texto.";
  } catch (error) {
    statusBadge.textContent = "Não foi possível copiar automaticamente.";
  }
};

form.addEventListener("input", () => {
  renderSignature(getFormData());
});

copyButton.addEventListener("click", (event) => {
  event.preventDefault();
  copySignature();
});

clearButton.addEventListener("click", () => {
  form.reset();
  renderSignature(getFormData());
});

renderSignature(getFormData());
