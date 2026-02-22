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
const editBtn = document.getElementById("edit");
const editInput = document.getElementById("editInput");

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
  const coo = (document.getElementById("coo") || {}).value || "";
  const lines = (document.getElementById("lines") || {}).value || "";
  const suffix = ` - ${coo} - ${lines}`;
  const preview = `Shipment in use - ${entry} - 7501PROC${suffix}`;
  navigator.clipboard.writeText(`${entry} - Shipment is on hold${suffix}`);
  previewHold.textContent = preview;
  previewHold.classList.add("preview");
});

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
  const input = exitInput.value.trim(" ");
  const coo = (document.getElementById("coo") || {}).value || "";
  const lines = (document.getElementById("lines") || {}).value || "";
  const inputText = `Exit - ${input} - 7501 PROC - ${coo} - ${lines}`;
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
siFormal.addEventListener("click", async () => {
  const input = document.getElementById("indexShips");
  const newValue = input.value;
  const previewIndex = document.getElementById("previewIndex");
  const coo = (document.getElementById("coo") || {}).value || "";
  const lines = (document.getElementById("lines") || {}).value || "";
  const text = `${newValue} SI FORMAL - Index - ${coo} - ${lines}`;
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
siMulti.addEventListener("click", async () => {
  const input = document.getElementById("indexShips");
  const newValue = input.value;
  const previewIndex = document.getElementById("previewIndex");
  const coo = (document.getElementById("coo") || {}).value || "";
  const lines = (document.getElementById("lines") || {}).value || "";
  const text = `${newValue} SI MUTLI - Index - ${coo} - ${lines}`;
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

indexComplete.addEventListener("click", async () => {
  const inputs = document.getElementById("indexShips");
  const newValue = inputs.value;
  const previewIndex = document.getElementById("previewIndex");
  const coo = (document.getElementById("coo") || {}).value || "";
  const lines = (document.getElementById("lines") || {}).value || "";
  const text = `${newValue} SI AUTO - Index - ${coo} - ${lines}`;
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

const latestBtn = document.getElementById("commentSeven");

latestBtn.addEventListener("click", async () => {
  const inputs = document.getElementById("input75");
  const coo = document.getElementById("coo").value;
  const lines = document.getElementById("lines").value;

  if (inputs.value.trim() === "" || !coo || !lines) {
    alert("Entry No, COO, and Lines required");
    return;
  }

  const preview = `${inputs.value} - Keyed 87/01 - ${coo} - ${lines}`;
  const preview7501 = document.getElementById("preview7501");
  preview7501.textContent = preview;
  preview7501.classList.add("preview");
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
  const addnText = document.getElementById("addComment").value;
  const coo = (document.getElementById("coo") || {}).value || "";
  const lines = (document.getElementById("lines") || {}).value || "";
  if (Alllogs == "Manufacture information missing") {
    const finalselect = `Review - ${Alllogs} - ${addnText} - Index - ${coo} - ${lines}`;
    const preview = document.getElementById("preview");
    // preview.textContent = `Review - ${finalselect} | ENTRY TYPE  To Select : SI | ATTRIBUTES  To Select : SIAUTO`;
    preview.innerHTML = `
     <div>${finalselect}</div>
    <div>
        <div>ENTRY TYPE :<span style = "font-weight:bold","color:red"> UNASSIGNED </span></div>
        <div s>ATTRIBUTE: <span style = "font-weight:bold","color:red>DISSELECT ANY </span></div>
        <div>CAGE CODE : <span style = "font-weight:bold","color:red>CODE ONE </span></div>
        <div>PROCESSING FLAG : <span style = "font-weight:bold","color:red>FLAG ONE </span></div>
    </div>`;

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
    preview.textContent = finalselect;
    preview.classList.add("preview");
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
////////////////////////////////7501 Review Block///////////////////////////
const Review7501 = document.getElementById("review7501");

Review7501.addEventListener("click", async () => {
  const dept = document.getElementById("dept");
  const task = document.getElementById("task");

  const inputs = [dept, task];
  const Alllogs = [];

  inputs.forEach((items) => {
    const selected = Array.from(items.selectedOptions).map((optn) => {
      return optn.value;
    });
    Alllogs.push(...selected);
  });
  const inputComment = document.getElementById("add-comment");
  const newinputs = inputComment.value;
  console.log(newinputs);
  console.log(Alllogs);
  const coo = (document.getElementById("coo") || {}).value || "";
  const lines = (document.getElementById("lines") || {}).value || "";
  const newSelect = `Review - ${Alllogs.join(" ")} ${newinputs} - 7501PROC - ${coo} - ${lines}`;
  const output = document.getElementById("output");
  output.textContent = newSelect;
  output.classList.add("preview");

  // ✅ Copy to clipboard
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
  console.log(log);
  logs.push(log);
  localStorage.setItem("inputLogs", JSON.stringify(logs));
  renderLogs();
});

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

document.getElementById("actionLog").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    logs.splice(index, 1);
    localStorage.setItem("inputLogs", JSON.stringify(logs));
    renderLogs();
  }
});
/////Reset Button activity ////////////////
const drawer = document.getElementById("activityDrawer");
const openBtn = document.getElementById("actionLog");
const closeBtn = document.getElementById("closeDrawer");

openBtn.addEventListener("click", () => {
  drawer.classList.add("open");
  renderLogs();
});

closeBtn.addEventListener("click", () => {
  drawer.classList.remove("open");
});
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
  "Country of origin": ["Country code invalid"],

  Description: [
    "Better description required",
    "Kit breakdown – multiple line request",
  ],

  "Document missing": [
    "APHIS core processing / disclaimer required",
    "MFG details needed",
    "FDA document required",
    "License information",
    "Motor worksheet required",
    "Invoice missing",
    "ISF BOX",
    "ADD/CVD missing",
    "Ukraine sanction form",
  ],

  "Duplex error": [
    "00477 Entry voided",
    "CNEE profile built with temp tax-id must be keyed app 90 send to review",
    "Manufacturers PWDBW not found",
    "No release consignee selected",
    "This needs to 90/G – No access",
    "Invalid entry error",
    "Built to manifest",
    "ENTRY CAN NOT BE RESUMED. NOT IN PROPER STATUS",
    "Tariff restricted",
  ],

  "Paper work": ["Invoice is not clear", "Need invoice in English language"],

  Parties: [
    "IMPNO consignee IRS no not found",
    "IMPNO consignee PWDD no not found",
    "Manufacturing details required for invoice textile description",
    "BROKER INFO",
    "Special instructions available in CCA",
    "Special instruction available in SAP",
    "Shipment for IRS",
  ],

  Value: ["Value mismatch between Jupiter and CI", "Value breakdown needed"],

  Quantity: ["Unit of measurement missing"],

  "Shipment contains diamond": ["1B to Handle"],

  "Reason not listed": ["No sub reason"],
};

const dept = document.getElementById("dept");
const task = document.getElementById("task");
const finalSelect = [];
const debug = document.getElementById("debug");

dept.addEventListener("change", function () {
  const deptSelect = dept.value;
  if (deptSelect === " ") {
    debug.textContent = "No department selected";
    return;
  }
  task.innerHTML = "";
  departmentTasks[deptSelect].forEach((opn) => {
    const option = document.createElement("option");
    option.value = opn;
    option.textContent = opn;
    task.appendChild(option);
  });
});

fetch("../json/tariffData.json")
  .then((response) => response.json())
  .then((data) => {
    const tarrifinput = document.getElementById("tarrifinput");
    const resultsContainer = document.getElementById("results");

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
  });

// Highlight active page
document.querySelectorAll(".tab").forEach((tab) => {
  if (tab.href && tab.href === window.location.href) {
    tab.classList.add("active");
  }
});

const activitySelect = document.getElementById("activitySelect");

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

document.getElementById("exportExcel").addEventListener("click", () => {
  exportLogsToExcel(logs);
});

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
////////////////////// Unit Converstion//////////////////////////////////

const convertBtn = document.getElementById("convertBtn");
const unitSelect = document.getElementById("unitSelect");
const inputUnit = document.getElementById("inputUnit");
const previewUnit = document.getElementById("previewUnitConv");

// function convertUnit() {
//   convertBtn.addEventListener("click", function () {

//   });
// }

unitSelect.addEventListener("change", function () {
  const selectValue = unitSelect.value;

  if (inputUnit.value.trim() === " ") {
    alert("Please enter Value to Convert");
    return;
  }
  if (selectValue === "Gross") {
    const input = inputUnit.value;
    const grossValue = input / 10;
    navigator.clipboard.writeText(grossValue.toFixed(2));
    previewUnit.innerHTML = grossValue.toFixed(2);
    previewUnit.classList.add("preview");
  } else if (selectValue === "Dozen") {
    const dozen = inputUnit.value / 12;
    navigator.clipboard.writeText(dozen.toFixed(2));
    previewUnit.innerHTML = dozen.toFixed(2);
    previewUnit.classList.add("preview");
  } else if (selectValue === "Piece") {
    const piece = inputUnit.value / 10;
    navigator.clipboard.writeText(piece);
    previewUnit.classList.add("preview");
  } else if (selectValue === "Pair") {
    const pair = inputUnit.value / 2;
    navigator.clipboard.writeText(pair.toFixed(2));
    previewUnit.textContent = pair.toFixed(2);
    previewUnit.classList.add("preview");
  }
  inputUnit.value = "";
  selectValue.value = "";
});
