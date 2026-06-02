const submit = document.getElementById("submit");
const input = document.getElementById("input");
const Hscode = document.getElementById("Hscode");
const copyBtn = document.getElementById("copyBtn");
const counterDisplay = document.getElementById("counter");
const resetBtn = document.getElementById("reset");
const decrementBtn = document.getElementById("decrement");
const comment = document.getElementById("comment");
const procComment = document.getElementById("proc-comment");
const entryInput = document.getElementById("entry-input");
const duplicateBtn = document.getElementById("duplicate-btn");
const duplicateInput = document.getElementById("duplicate-input");
const editBtn = document.getElementById("edit");
const editInput = document.getElementById("editInput");

function formatCooLines(coo, lines) {
  const parts = [];
  if (coo) parts.push(coo);
  if (lines) parts.push(lines);
  return parts.length ? ` - ${parts.join(" - ")}` : "";
}

//////////////////////////
//  localStorage with logs//////////
let logs = [];

const store = localStorage.getItem("inputLogs");

try {
  const parse = JSON.parse(store);
  if (Array.isArray(parse)) {
    logs = parse;
  }
} catch (e) {
  logs = [];
}

//////////////////////////
// Event Listeners
//////////////////////////

submit.addEventListener("click", async () => {
  const result = input.value.trim().replace(/\./g, "");
  if (result === "") {
    alert("Please Enter HTS Code");
  }
  Hscode.textContent = `Tarrif: ${result} ` || "No code entered";
  Hscode.classList.add("preview");
  input.value = "";
  Hscode.style.letterSpacing = "1px";
  setTimeout(
    () => (
      (Hscode.style.transform = "scale(1)"), (Hscode.style.color = "blue")
    ),
    200
  );
  const Hscodes = result;
  try {
    await navigator.clipboard.writeText(Hscodes).then(() => {
      const val = counts.increment();
      counterDisplay.textContent = `Copied: ${val} times`;
      counterDisplay.style.color = "#28a745";
      setTimeout(() => (counterDisplay.style.color = "#007bff"), 800);
    });
  } catch (err) {
    console.error("Failed to copy:", err);
  }
});

resetBtn.addEventListener("click", () => {
  counts.reset();
  counterDisplay.textContent = "Copied: 0 times";
});

decrementBtn.addEventListener("click", () => {
  const val = counts.decrement();
  counterDisplay.textContent = `Copied: ${val} times`;
});

procComment.addEventListener("click", function () {
  const previewHold = document.getElementById("previewHold");
  const entry = entryInput.value.trim();

  if (!entry) {
    alert("Enter a shipment number for Shipment In Use.");
    return;
  }
  if (!allowedEntryPattern.test(entry)) {
    alert("Shipment In Use may only contain letters, numbers, spaces, and hyphens.");
    return;
  }

  const preview = `Shipment in use - ${entry} - 7501PROC`;
  navigator.clipboard.writeText(`${entry} - Shipment is on hold`);
  previewHold.textContent = preview;
  previewHold.classList.add("preview");
});

if (duplicateBtn && duplicateInput) {
  duplicateBtn.addEventListener("click", async function () {
    const duplicatePreview = document.getElementById("duplicatePreview");
    const entry = duplicateInput.value.trim();

    if (!entry) {
      alert("Enter an entry number for Duplicate (Already).");
      return;
    }
    if (!allowedEntryPattern.test(entry)) {
      alert("Duplicate entry may only contain letters, numbers, spaces, and hyphens.");
      return;
    }

    const commentText = `Duplicate - Already processed, Entry Number ${entry} - 7501Proc`;
    duplicatePreview.textContent = commentText;
    duplicatePreview.classList.add("preview");
    try {
      await navigator.clipboard.writeText(commentText);
    } catch (err) {
      console.error("Failed to copy duplicate comment:", err);
      alert("Unable to copy to clipboard. Please allow clipboard access or try again.");
    }
  });
}

editBtn.addEventListener("click", () => {
  const newVal = Number(editInput.value);
  const updated = counts.edit(newVal);
  counterDisplay.textContent = `Copied: ${updated} times`;
  editInput.value = "";
});
///////////////////////////Exit ///////////////////////////////

const exitInput = document.getElementById("inputExit");
const exitBtn = document.getElementById("exitBtn");

exitBtn.addEventListener("click", async function () {
  if (entryInput.value === " ") {
    alert("Please Add Reason for Exit");
    return;
  }
  const input = exitInput.value.trim();
  const inputText = `Exit - ${input} - 7501 PROC`;
  const preview = document.getElementById("exitsPreview");
  preview.textContent = inputText;
  preview.classList.add("preview");
  try {
    await navigator.clipboard.writeText(inputText);
  } catch (err) {
    alert(`please find error Massesge ${err}`);
  }
});

//////////////////Dropdown ///////////////////////////

//////////// Commeting section ./////////////////

const commentSeven = document.getElementById("commentSeven");
const indexComplete = document.getElementById("indexComplete");

// Indexing Completed shipements //////////
const siFormal = document.getElementById("siFormal");
if (siFormal) {
siFormal.addEventListener("click", async () => {
  const input = document.getElementById("indexShips");
  const newValue = input.value;
  const previewIndex = document.getElementById("previewIndex");
  const coo = (document.getElementById("coo") || {}).value || "";
  const lines = (document.getElementById("lines") || {}).value || "";
  const text = `${newValue} SI FORMAL - ${coo} - ${lines} - Index`;
  input.value = "";

  previewIndex.innerHTML = `<div>${text}</div>
    <div>
        <div>ENTRY TYPE :<span style = "font-weight:bold","color:red"> UNASSIGNED </span></div>
        <div s>ATTRIBUTE: <span style = "font-weight:bold","color:red>DISSELECT ANY </span></div>
        <div>CAGE CODE : <span style = "font-weight:bold","color:red>CODE ONE </span></div>
        <div>PROCESSING FLAG : <span style = "font-weight:bold","color:red>FLAG ONE </span></div>
    </div>`;
  previewIndex.classList.add("preview");
  try {
    const text = "SI inFORMAL - Index";
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy:", err);
  }

  const log = {
    date: Date.now(),
    action: text,
    waight: 1,
  };
  logs.push(log);
  localStorage.setItem("inputLogs", JSON.stringify(logs));
  renderLogs();
});
}

const siMulti = document.getElementById("siMulti");
if (siMulti) {
siMulti.addEventListener("click", async () => {
  const input = document.getElementById("indexShips");
  const newValue = input.value;
  const previewIndex = document.getElementById("previewIndex");
  const coo = (document.getElementById("coo") || {}).value || "";
  const lines = (document.getElementById("lines") || {}).value || "";
  const text = `${newValue} SI MUTLI - ${coo} - ${lines} - Index`;
  input.value = "";
  previewIndex.innerHTML = `<div>${text}</div>
    <div>
        <div>ENTRY TYPE :<span style = "font-weight:bold","color:red"> UNASSIGNED </span></div>
        <div s>ATTRIBUTE: <span style = "font-weight:bold","color:red>DISSELECT ANY </span></div>
        <div>CAGE CODE : <span style = "font-weight:bold","color:red>CODE ONE </span></div>
        <div>PROCESSING FLAG : <span style = "font-weight:bold","color:red>FLAG ONE </span></div>
    </div>`;
  previewIndex.classList.add("preview");
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy:", err);
  }

  const log = {
    date: Date.now(),
    action: text,
    waight: 1,
  };
  logs.push(log);
  localStorage.setItem("inputLogs", JSON.stringify(logs));
  renderLogs();
});
}

if (indexComplete) {
indexComplete.addEventListener("click", async () => {
  const inputs = document.getElementById("indexShips");
  const newValue = inputs.value;
  const previewIndex = document.getElementById("previewIndex");
  const coo = (document.getElementById("coo") || {}).value || "";
  const lines = (document.getElementById("lines") || {}).value || "";
  const text = `${newValue} SI AUTO - ${coo} - ${lines} - Index`;
  previewIndex.innerHTML = `
     <div>${text}</div>
    <div>
        <div>ENTRY TYPE :<span style = "font-weight:bold","color:red"> UNASSIGNED </span></div>
        <div s>ATTRIBUTE: <span style = "font-weight:bold","color:red>DISSELECT ANY </span></div>
        <div>CAGE CODE : <span style = "font-weight:bold","color:red>CODE ONE </span></div>
        <div>PROCESSING FLAG : <span style = "font-weight:bold","color:red>FLAG ONE </span></div>
    </div>`;
  inputs.value = "";
  previewIndex.classList.add("preview");
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy:", err);
  }

  const log = {
    date: Date.now(),
    action: text,
    waight: 1,
  };
  logs.push(log);

  localStorage.setItem("inputLogs", JSON.stringify(logs));
  renderLogs();
});
}

const latestBtn = document.getElementById("commentSeven");
const entryTypeText = document.getElementById("entryTypeText");
const attributesText = document.getElementById("attributesText");
const attributesNote = document.getElementById("attributesNote");

const completedCommentInput = document.getElementById("input75");
if (completedCommentInput) {
  completedCommentInput.value = "GN - Business Document";
  completedCommentInput.addEventListener("input", () => {
    completedCommentInput.value = completedCommentInput.value.replace(/[^A-Za-z0-9\s-]/g, "");
    updateAttributesForCompletedComment();
  });
  updateAttributesForCompletedComment();
}

function setEntryTypeForReview() {
  if (entryTypeText) {
    if (entryTypeText.tagName === "INPUT") {
      entryTypeText.value = "Do not make any changes";
    } else {
      entryTypeText.textContent = "Do not make any changes";
    }
  }
}

function setAttributesValue(element, value) {
  if (!element) return;
  if (element.tagName === "INPUT") {
    element.value = value;
  } else {
    element.textContent = value;
  }
}

function setBadgeValue(value) {
  // Badge function deprecated - badge removed from UI
}

function updateAttributesForCompletedComment() {
  if (!attributesText || !completedCommentInput) return;
  const commentValue = completedCommentInput.value.trim();

  if (!commentValue) {
    setAttributesValue(attributesText, "None Selected");
    if (attributesNote) attributesNote.textContent = "Type a comment to see the suggested attribute.";
    return;
  }

  if (commentValue.toUpperCase().includes("GN - BUSINESS DOCUMENT")) {
    setAttributesValue(attributesText, "GN");
    if (attributesNote) attributesNote.textContent = "Detected GN business document. Attribute set to GN.";
    return;
  }

  setAttributesValue(attributesText, "ECOM");
  if (attributesNote) attributesNote.textContent = "Manual entry detected. Attribute set to ECOM.";
}

if (attributesText) {
  setAttributesValue(attributesText, "None Selected");
}
if (entryTypeText) {
  setEntryTypeForReview();
}
if (attributesNote) {
  attributesNote.textContent = "Live review status will appear here.";
}


const allowedEntryPattern = /^[A-Za-z0-9\s-]+$/;
const numericAlphaInputs = [entryInput, duplicateInput];
numericAlphaInputs.forEach((element) => {
  if (element) {
    element.addEventListener("input", () => {
      element.value = element.value.replace(/[^A-Za-z0-9\s-]/g, "");
    });
  }
});

if (latestBtn) {
  latestBtn.addEventListener("click", async () => {
    const inputs = document.getElementById("input75");
    const coo = document.getElementById("coo").value;
    const lines = document.getElementById("lines").value;
    const commentValue = inputs?.value.trim() || "";
    const allowedPattern = /^[A-Za-z0-9\s-]+$/;

    if (!commentValue || !coo || !lines) {
      alert("7501 comment, COO, and Lines are required");
      return;
    }
    if (!allowedPattern.test(commentValue)) {
      alert("Please use only letters, numbers, spaces, and hyphens in the 7501 comment.");
      return;
    }

    const preview = `${commentValue} - Keyed 87/01 - ${coo} - ${lines} - 7501PROC`;
    const preview7501 = document.getElementById("preview7501");
    if (preview7501) {
      preview7501.textContent = preview;
      preview7501.classList.add("preview");
      preview7501.style.display = "block";
    }
    updateAttributesForCompletedComment();
    inputs.value = "";
    try {
      await navigator.clipboard.writeText(preview);
    } catch (err) {
      console.error("Failed to copy:", err);
    }

  const log = {
    date: Date.now(),
    action: preview,
    waight: 1,
  };

  logs.push(log);

  localStorage.setItem("inputLogs", JSON.stringify(logs));
  inputs.value = "";
  renderLogs();
});
}

/////////////////////////DATE GENRERATOR////////////////////////////////

function formateDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth()).padStart(2, "0");
  const year = String(d.getFullYear()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  // const second = String(d.getSeconds()).padStart("2 ,0");

  return `${day}/${month}/${year} ${hours}:${min}`;
}

//////////////////////////Index Review Block///////////////////////////
const indexReview = document.getElementById("btn-raviewTwo");

if (indexReview) {
  indexReview.addEventListener("click", async () => {
    const dept = document.getElementById("deptTwo");
    // const task = document.getElementById("taskTwo");

    const inputs = [dept];
    const Alllogs = [];

    inputs.forEach((items) => {
      const selected = Array.from(items.selectedOptions).map((optn) => {
        return optn.value;
      });
      const letselect = selected.join(" ");
      console.log(letselect);
      Alllogs.push(...selected);
    });
    const addnText = (document.getElementById("addComment") || {}).value || "";
    const coo = (document.getElementById("coo") || {}).value || "";
    const lines = (document.getElementById("lines") || {}).value || "";
    if (Alllogs == "Manufacture information missing") {
      const finalselect = `Review - ${Alllogs} - ${addnText} - ${coo} - ${lines} - Index `;
      const preview = document.getElementById("preview");
      if (preview) {
        preview.innerHTML = `
         <div>${finalselect}</div>
        <div>
            <div>ENTRY TYPE :<span style = "font-weight:bold","color:red"> UNASSIGNED </span></div>
            <div s>ATTRIBUTE: <span style = "font-weight:bold","color:red>DISSELECT ANY </span></div>
            <div>CAGE CODE : <span style = "font-weight:bold","color:red>CODE ONE </span></div>
            <div>PROCESSING FLAG : <span style = "font-weight:bold","color:red>FLAG ONE </span></div>
        </div>`;
      }

      try {
        await navigator.clipboard.writeText(finalselect);
        console.log("✅ Copied to clipboard:", finalselect);
      } catch (err) {
        alert("❌ Failed to copy: " + err);
      }

      const log = {
        date: Date.now(),
        action: finalselect,
        waight: 1,
      };
      console.log(log);
      logs.push(log);
      localStorage.setItem("inputLogs", JSON.stringify(logs));
      renderLogs();
    } else {
      const finalselect = `Review - ${Alllogs} - ${addnText} - Index - ${coo} - ${lines}`;
      const preview = document.getElementById("preview");
      if (preview) {
        preview.textContent = finalselect;
        preview.classList.add("preview");
      }
      try {
        await navigator.clipboard.writeText(finalselect);
        console.log("✅ Copied to clipboard:", finalselect);
      } catch (err) {
        alert("❌ Failed to copy: " + err);
      }

      const log = {
        date: Date.now(),
        action: finalselect,
        waight: 1,
      };
      console.log(log);
      logs.push(log);
      localStorage.setItem("inputLogs", JSON.stringify(logs));
      renderLogs();
    }

    // Copy to clipboard (fixed reference)
  });
}
////////////////////////////////7501 Review Block///////////////////////////
const Review7501 = document.getElementById("review7501");

if (Review7501) {
  Review7501.addEventListener("click", async () => {
    const dept = document.getElementById("dept");
    const task = document.getElementById("task");
    const inputComment = document.getElementById("add-comment");

    const selectedDept = dept?.value || "";
    const selectedTask = task?.value || "";
    const additionalComment = inputComment?.value.trim() || "";

    if (!selectedDept) {
      alert("Please select a department for 7501 Review Comment.");
      return;
    }
    if (!selectedTask) {
      alert("Please select a task for 7501 Review Comment.");
      return;
    }

    const commentParts = ["Review", selectedDept, selectedTask];
    if (additionalComment) commentParts.push(additionalComment);
    commentParts.push("7501PROC");

    const newSelect = commentParts.join(" - ");
    const output = document.getElementById("output");
    if (output) {
      output.textContent = newSelect;
      output.classList.add("preview");
    }
    setEntryTypeForReview();
    if (attributesText) setAttributesValue(attributesText, "Review");
    if (attributesNote) attributesNote.textContent = "Review selected. Awaiting department and task.";

    try {
      await navigator.clipboard.writeText(newSelect);
    } catch (err) {
      alert("❌ Failed to copy: " + err);
    }

    const log = {
      date: Date.now(),
      action: newSelect,
      waight: 1,
    };
    logs.push(log);
    localStorage.setItem("inputLogs", JSON.stringify(logs));
    renderLogs();
  });
}

/////////////////////////////////////////////////////////
function renderLogs() {
  const logscontainer = document.getElementById("logsContainer");
  logscontainer.innerHTML = "";

  logs.forEach((item, index) => {
    const renderDiv = document.createElement("div");
    renderDiv.className = "logs-renders";

    renderDiv.innerHTML = `
      <div class='render-container'>
        <div class='table-items'>
          <div>${item.action}</div>
          <div>${formateDate(item.date)}</div>
        </div>
        <div data-index="${index}" class="delete-btn">X</div>
      </div>
    `;
    logscontainer.appendChild(renderDiv);
  });

  // Total Count
  let total = logs.reduce((acc, item) => acc + item.waight, 0);
  document.getElementById(
    "activitySummary"
  ).innerHTML = `Total Actions : ${total}`;
}

const actionLogEl = document.getElementById("actionLog");
if (actionLogEl) {
  actionLogEl.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
      logs.splice(index, 1);
      localStorage.setItem("inputLogs", JSON.stringify(logs));
      renderLogs();
    }
  });
}
/////Reset Button activity ////////////////
const drawer = document.getElementById("activityDrawer");
const openBtn = document.getElementById("actionLog");
const closeBtn = document.getElementById("closeDrawer");

if (openBtn && drawer) {
  openBtn.addEventListener("click", () => {
    drawer.classList.add("open");
    renderLogs();
  });
}

if (closeBtn && drawer) {
  closeBtn.addEventListener("click", () => {
    drawer.classList.remove("open");
  });
}
document
  .getElementById("logsContainer")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
      logs.splice(index, 1);
      localStorage.setItem("inputLogs", JSON.stringify(logs));
      renderLogs();
    }
  });

const resetActivity = document.getElementById("resetLogsBtn");

resetActivity.addEventListener("click", function () {
  const confirmReset = confirm(
    "Are you sure you want to clear all activity logs?"
  );
  if (!confirmReset) return;
  // localStorage.removeItem("inputLogs");
  logs = [];
  renderLogs();
  localStorage.setItem("inputLogs", JSON.stringify(logs));
});

const departmentTasks = {
  "Country of origin": [
    "Country Code Invalid"
  ],

  Description: [
    "Better Description Required",
    "Kit Breakdown. Multiple line request"
  ],

  "Document Missing": [
    "APHIS core Processing/disclaim required",
    "MFG details needed",
    "FDA document required",
    "Lacey Information",
    "Motor Worksheet Required",
    "Invoice missing",
    "HS7 BOX",
    "ADD/CVD Missing",
    "Ukraine Sanction form"
  ],

  "Duplex Error": [
    "00477 Entry Voided",
    "01624 Warning Duplicate combo of bill NBRS on another Manifest",
    "CNEE profile built tax-id must be keyed app 90 send to review",
    "Manufacture PWBID not found",
    "No Release Consignee Selected",
    "This Needs 90/6 - No access",
    "Invalid Entry Error",
    "Build to manifest",
    "ENTRY CAN NOT BE RESUMED.NOT IN PROPER STATUS",
    "Tariff restricted"
  ],

  "Paper Work": [
    "Invoice is not clear",
    "Need Invoice in English language"
  ],

  Parties: [
    "IMPNO consignee IRS no not Found",
    "IMPNO consignee PWDID no not Found",
    "Manufacturing details Required for Invoice Textile description",
    "Shipper postal code incorrect",
    "BROKER INFO",
    "Special Instructions available in CCP",
    "Special Instruction available in SBP",
    "Shipment for IRS"
  ],

  Value: [
    "Value mismatch between Jupiter and CI",
    "Value Break down needed"
  ],

  Quantity: [
    "Unit of measurement missing"
  ],

  "Shipment Contains Diamond": [
    "1B to Handle"
  ],

  Watches: [
    "Shipment Contains Watch"
  ],

  "Reason not listed": [
    "No sub reason"
  ]
};

const dept = document.getElementById("dept");
const task = document.getElementById("task");
const finalSelect = [];
const debug = document.getElementById("debug");

function populateReviewTasks() {
  if (!dept || !task) return;

  const deptSelect = dept.value;
  task.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select Task";
  task.appendChild(placeholder);

  if (!deptSelect) {
    return;
  }

  const tasks = departmentTasks[deptSelect] || [];
  tasks.forEach((opn) => {
    const option = document.createElement("option");
    option.value = opn;
    option.textContent = opn;
    task.appendChild(option);
  });
  if (debug) debug.textContent = "";
}

if (dept && task) {
  dept.addEventListener("change", populateReviewTasks);
  populateReviewTasks();
}

const tariffJsonPaths = ["json/tariffData.json", "../json/tariffData.json", "./json/tariffData.json"];

async function loadTariffData() {
  let data = null;
  for (const path of tariffJsonPaths) {
    try {
      const response = await fetch(path);
      if (!response.ok) continue;
      data = await response.json();
      break;
    } catch (err) {
      // try next path
    }
  }

  if (!data) {
    console.warn("Tariff JSON data not found at expected paths.");
    return;
  }

  const tarrifinput = document.getElementById("tarrifinput");
  const resultsContainer = document.getElementById("results");

  if (tarrifinput && resultsContainer) {
    tarrifinput.addEventListener("input", async function () {
      const searchTerm = tarrifinput.value.toLowerCase();
      resultsContainer.innerHTML = "";

      if (searchTerm.length === 0) return;

      const filtered = data.filter(
        (item) =>
          item.description.toLowerCase().includes(searchTerm) ||
          item.hts_code.includes(searchTerm)
      );

      filtered.forEach((item) => {
        const div = document.createElement("div");
        div.textContent = `${item.description} - ${item.hts_code}`;
        div.classList.add("preview");
        div.addEventListener("click", () => {
          tarrifinput.value = `${item.description} - ${item.hts_code}`;
          const hts = item.hts_code;
          navigator.clipboard.writeText(hts);
          resultsContainer.innerHTML = "";
        });
        resultsContainer.appendChild(div);
      });
    });

    document.addEventListener("click", (e) => {
      if (!resultsContainer.contains(e.target) && e.target !== tarrifinput) {
        resultsContainer.innerHTML = "";
      } else {
        tarrifinput.value = "";
      }
    });
  }
}

loadTariffData();

// Highlight active page
document.querySelectorAll(".tab").forEach((tab) => {
  if (tab.href && tab.href === window.location.href) {
    tab.classList.add("active");
  }
});

const activitySelect = document.getElementById("activitySelect");

if (activitySelect) {
  activitySelect.addEventListener("change", () => {
    confirm("are you sure want to Set Activity?");
    const selectedActivity = activitySelect.value;
    console.log("Selected activity:", selectedActivity);
    console.log(Date.now());

    const log = {
    action: selectedActivity,
    date: Date.now(),
    waight: 0,
  };
  console.log(log);
  logs.push(log);
  localStorage.setItem("inputLogs", JSON.stringify(logs));
  renderLogs();
});
}

const idleLogs = document.getElementById("idleLogs");
idleLogs.innerHTML = ""; // clear UI

const IDLE = "Idle";
const idleTime = 25; // 30 minutes in milliseconds

for (let i = 0; i < logs.length - 1; i++) {
  // console.log(formateDate(logs[i].date));
  const diff = logs[i + 1].date - logs[i].date;
  const holdtime = Math.floor(diff / 60000);
  if (holdtime >= idleTime) {
    const LogsRender = document.createElement("div");
    LogsRender.innerHTML = `
      <div class="idle-row">
        <div class="task-name">${logs[i + 1].action}</div>
        <div class="duration">${holdtime} min</div>
        <div class="status">${IDLE}</div>
      </div>`;
    idleLogs.appendChild(LogsRender);
  }
}

const IDLE_LIMIT_MIN = 25;

const exportExcelEl = document.getElementById("exportExcel");
if (exportExcelEl) {
  exportExcelEl.addEventListener("click", () => {
    exportLogsToExcel(logs);
  });
}

function exportLogsToExcel(logs) {
  if (!logs || logs.length === 0) {
    alert("No logs to export");
    return;
  }

  // Ensure date is timestamp & sort
  const sortedLogs = logs
    .map((log) => ({
      ...log,
      date: new Date(log.date).getTime(),
    }))
    .sort((a, b) => a.date - b.date);

  /* ================= ALL LOGS SHEET ================= */
  const allLogsSheet = sortedLogs.map((log, index) => ({
    "Sr No": index + 1,
    Action: log.action,
    "Date & Time": new Date(log.date).toLocaleString(),
  }));

  /* ================= IDLE LOGS SHEET ================= */
  const idleLogsSheet = [];

  for (let i = 0; i < sortedLogs.length - 1; i++) {
    const diffMs = sortedLogs[i + 1].date - sortedLogs[i].date;
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin >= IDLE_LIMIT_MIN) {
      idleLogsSheet.push({
        "From Action": sortedLogs[i].action,
        "To Action": sortedLogs[i + 1].action,
        "Idle Duration (min)": diffMin,
        "From Time": new Date(sortedLogs[i].date).toLocaleString(),
        "To Time": new Date(sortedLogs[i + 1].date).toLocaleString(),
      });
    }
  }

  /* ================= EXCEL GENERATION ================= */
  const workbook = XLSX.utils.book_new();

  const wsAll = XLSX.utils.json_to_sheet(allLogsSheet);
  const wsIdle = XLSX.utils.json_to_sheet(idleLogsSheet);

  XLSX.utils.book_append_sheet(workbook, wsAll, "All Logs");
  XLSX.utils.book_append_sheet(workbook, wsIdle, "Idle Logs");

  XLSX.writeFile(workbook, "User_Activity_Logs.xlsx");
}
////////////////////// Unit Conversion //////////////////////////////////

const categoryUnits = {
  length: [
    { value: "meter", label: "Meter" },
    { value: "kilometer", label: "Kilometer" },
    { value: "centimeter", label: "Centimeter" },
    { value: "millimeter", label: "Millimeter" },
    { value: "micrometer", label: "Micrometer" },
    { value: "nanometer", label: "Nanometer" },
    { value: "mile", label: "Mile" },
    { value: "yard", label: "Yard" },
    { value: "foot", label: "Foot" },
    { value: "inch", label: "Inch" },
    { value: "lightyear", label: "Light Year" }
  ],
  temperature: [
    { value: "celsius", label: "Celsius" },
    { value: "fahrenheit", label: "Fahrenheit" },
    { value: "kelvin", label: "Kelvin" }
  ],
  area: [
    { value: "squaremeter", label: "Square Meter" },
    { value: "squarekilometer", label: "Square Kilometer" },
    { value: "squarecentimeter", label: "Square Centimeter" },
    { value: "squaremillimeter", label: "Square Millimeter" },
    { value: "squaremicrometer", label: "Square Micrometer" },
    { value: "hectare", label: "Hectare" },
    { value: "squaremile", label: "Square Mile" },
    { value: "squareyard", label: "Square Yard" },
    { value: "squarefoot", label: "Square Foot" },
    { value: "squareinch", label: "Square Inch" },
    { value: "acre", label: "Acre" }
  ],
  volume: [
    { value: "cubemeter", label: "Cubic Meter" },
    { value: "cubekilometer", label: "Cubic Kilometer" },
    { value: "cubecentimeter", label: "Cubic Centimeter" },
    { value: "cubemillimeter", label: "Cubic Millimeter" },
    { value: "liter", label: "Liter" },
    { value: "milliliter", label: "Milliliter" },
    { value: "usgallon", label: "US Gallon" },
    { value: "usform", label: "US Quart" },
    { value: "uspint", label: "US Pint" },
    { value: "uscup", label: "US Cup" },
    { value: "usfloz", label: "US Fluid Ounce" }
  ],
  weight: [
    { value: "kilogram", label: "Kilogram" },
    { value: "gram", label: "Gram" },
    { value: "milligram", label: "Milligram" },
    { value: "metrictone", label: "Metric Ton" },
    { value: "longton", label: "Long Ton" },
    { value: "shortton", label: "Short Ton" },
    { value: "pound", label: "Pound" },
    { value: "ounce", label: "Ounce" },
    { value: "carat", label: "Carat" },
    { value: "atomicmassunit", label: "Atomic Mass Unit" }
  ]
};

const conversionFactors = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    micrometer: 1e-6,
    nanometer: 1e-9,
    mile: 1609.344,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254,
    lightyear: 9.4607e15
  },
  area: {
    squaremeter: 1,
    squarekilometer: 1e6,
    squarecentimeter: 0.0001,
    squaremillimeter: 1e-6,
    squaremicrometer: 1e-12,
    hectare: 10000,
    squaremile: 2.59e6,
    squareyard: 0.83612736,
    squarefoot: 0.09290304,
    squareinch: 0.00064516,
    acre: 4046.8564224
  },
  volume: {
    cubemeter: 1,
    cubekilometer: 1e9,
    cubecentimeter: 1e-6,
    cubemillimeter: 1e-9,
    liter: 0.001,
    milliliter: 1e-6,
    usgallon: 0.003785411784,
    usform: 0.000946352946,
    uspint: 0.000473176473,
    uscup: 0.0002365882365,
    usfloz: 2.95735295625e-5
  },
  weight: {
    kilogram: 1,
    gram: 0.001,
    milligram: 1e-6,
    metrictone: 1000,
    longton: 1016.0469088,
    shortton: 907.18474,
    pound: 0.45359237,
    ounce: 0.028349523125,
    carat: 0.0002,
    atomicmassunit: 1.66053906660e-27
  }
};

function setUnitOptions(category, unitSelect) {
  unitSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select Unit";
  unitSelect.appendChild(placeholder);

  if (!category || !categoryUnits[category]) {
    return;
  }

  categoryUnits[category].forEach(unit => {
    const option = document.createElement("option");
    option.value = unit.value;
    option.textContent = unit.label;
    unitSelect.appendChild(option);
  });
}

function formatNumber(value) {
  return Number(value).toFixed(2);
}

function convertTemperature(value, fromUnit, toUnit) {
  let celsius;
  if (fromUnit === "celsius") {
    celsius = value;
  } else if (fromUnit === "fahrenheit") {
    celsius = (value - 32) * 5 / 9;
  } else if (fromUnit === "kelvin") {
    celsius = value - 273.15;
  }

  if (toUnit === "celsius") {
    return celsius;
  }
  if (toUnit === "fahrenheit") {
    return celsius * 9 / 5 + 32;
  }
  if (toUnit === "kelvin") {
    return celsius + 273.15;
  }
  return value;
}

function convertWithFactor(value, category, fromUnit, toUnit) {
  const factors = conversionFactors[category];
  const fromFactor = factors[fromUnit];
  const toFactor = factors[toUnit];
  const baseValue = value * fromFactor;
  return baseValue / toFactor;
}

function buildSingleConversionResult(category, amount, fromUnit, toUnit) {
  if (!category || !fromUnit || !toUnit) {
    return null;
  }

  let convertedValue;
  if (category === "temperature") {
    convertedValue = convertTemperature(amount, fromUnit, toUnit);
  } else {
    convertedValue = convertWithFactor(amount, category, fromUnit, toUnit);
  }

  const fromLabel =
    categoryUnits[category].find((unit) => unit.value === fromUnit)?.label ||
    fromUnit;
  const toLabel =
    categoryUnits[category].find((unit) => unit.value === toUnit)?.label ||
    toUnit;

  return `${formatNumber(amount)} ${fromLabel} = ${formatNumber(convertedValue)} ${toLabel}`;
}

function showPreview(resultText, previewUnit) {
  previewUnit.innerHTML = "";
  const content = document.createElement("div");
  content.textContent = resultText;
  previewUnit.appendChild(content);
  previewUnit.classList.add("preview");
  previewUnit.style.display = "flex";
}

function initializeUnitConversion() {
  const categorySelect = document.getElementById("categorySelect");
  const convertBtn = document.getElementById("convertBtn");
  const fromUnitSelect = document.getElementById("fromUnitSelect");
  const toUnitSelect = document.getElementById("toUnitSelect");
  const inputUnit = document.getElementById("inputUnit");
  const previewUnit = document.getElementById("previewUnitConv");

  if (
    !categorySelect ||
    !convertBtn ||
    !fromUnitSelect ||
    !toUnitSelect ||
    !inputUnit ||
    !previewUnit
  ) {
    console.warn("Unit conversion elements are missing from the page.");
    return;
  }

  previewUnit.style.display = "none";

  categorySelect.addEventListener("change", function () {
    setUnitOptions(categorySelect.value, fromUnitSelect);
    setUnitOptions(categorySelect.value, toUnitSelect);
    previewUnit.innerHTML = "";
  });

  convertBtn.addEventListener("click", function () {
    const category = categorySelect.value;
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const rawValue = inputUnit.value.trim();
    const amount = parseFloat(rawValue);

    if (!rawValue || isNaN(amount)) {
      alert("Please enter a valid number to convert.");
      return;
    }
    if (!category) {
      alert("Please choose a category first.");
      return;
    }
    if (!fromUnit || !toUnit) {
      alert("Please choose both the from and to units.");
      return;
    }

    const resultText = buildSingleConversionResult(
      category,
      amount,
      fromUnit,
      toUnit
    );
    if (resultText) {
      showPreview(resultText, previewUnit);
      const convertedValue =
        category === "temperature"
          ? convertTemperature(amount, fromUnit, toUnit)
          : convertWithFactor(amount, category, fromUnit, toUnit);
      navigator.clipboard.writeText(formatNumber(convertedValue)).catch(() => {});
    }
  });

  const resetConvertBtn = document.getElementById("resetConvertBtn");
  if (resetConvertBtn) {
    resetConvertBtn.addEventListener("click", function () {
      inputUnit.value = "";
      categorySelect.value = "";
      fromUnitSelect.innerHTML = "<option value=''>From Unit</option>";
      toUnitSelect.innerHTML = "<option value=''>To Unit</option>";
      previewUnit.innerHTML = "";
      previewUnit.style.display = "none";
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeUnitConversion);
} else {
  initializeUnitConversion();
}
