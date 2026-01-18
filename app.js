const form = document.getElementById("signature-form");
const preview = document.getElementById("signature-preview");
const copyButton = document.getElementById("copy-button");
const clearButton = document.getElementById("clear-button");
const statusBadge = document.getElementById("status");
const adminToggle = document.getElementById("admin-toggle");
const adminPanel = document.getElementById("admin-panel");
const logoInput = document.getElementById("logo-input");
const resetLogoButton = document.getElementById("reset-logo");

const config = {
  logoPath: "assets/logo.svg",
  companyName: "Empresa",
  website: "www.empresa.com",
  address: "Av. Paulista, 1000 - São Paulo, SP",
  phonePrefix: "+55 31 3270-",
};
const adminPassword = "admin123";

const departmentMap = new Map([
  ["administrativo", "Administration"],
  ["comercial", "Sales"],
  ["financeiro", "Finance"],
  ["jurídico", "Legal"],
  ["marketing", "Marketing"],
  ["operações", "Operations"],
  ["recursos humanos", "Human Resources"],
  ["tecnologia da informação", "Information Technology"],
  ["vendas", "Sales"],
]);

const normalizeText = (value) => value.trim().toLowerCase();

const formatDepartment = (value) => {
  const normalized = normalizeText(value);
  return departmentMap.get(normalized) || value;
};

const getLogoPath = () => localStorage.getItem("signatureLogo") || config.logoPath;

const renderSignature = ({ name, email, extension, department }) => {
  if (!name && !email && !extension && !department) {
    preview.innerHTML = "";
    statusBadge.textContent = "Preencha o formulário para visualizar.";
    return;
  }

  statusBadge.textContent = "Assinatura pronta para copiar.";
  const departmentEnglish = formatDepartment(department || "Departamento");
  const phoneValue = extension ? `${config.phonePrefix}${extension}` : config.phonePrefix;

  preview.innerHTML = `
    <div class="signature__content" id="signature-html">
      <img class="signature__logo" src="${getLogoPath()}" alt="Logotipo" />
      <div class="signature__details">
        <span class="signature__name">${name || "Nome"}</span>
        <span class="signature__department signature__department--pt">${department || "Departamento"}</span>
        <span class="signature__department">${departmentEnglish}</span>
        <span class="signature__contact">${email || "email@empresa.com"}</span>
        <span class="signature__contact">Tel.: ${phoneValue}</span>
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
    extension: data.get("extension")?.toString() || "",
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

adminToggle.addEventListener("click", () => {
  const password = window.prompt("Digite a senha de administrador:");
  if (password === adminPassword) {
    adminPanel.hidden = false;
    adminToggle.textContent = "Administrador autenticado";
    adminToggle.disabled = true;
  } else if (password) {
    window.alert("Senha incorreta.");
  }
});

logoInput.addEventListener("change", () => {
  const file = logoInput.files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem("signatureLogo", reader.result);
    renderSignature(getFormData());
  };
  reader.readAsDataURL(file);
});

resetLogoButton.addEventListener("click", () => {
  localStorage.removeItem("signatureLogo");
  renderSignature(getFormData());
});

renderSignature(getFormData());
