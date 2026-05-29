// ==================== 7501 PROC Comment Generator ====================

// ==================== DOM Element References ====================
const cooInput = document.getElementById("coo");
const linesInput = document.getElementById("lines");
const entryNoInput = document.getElementById("entryNo");
const patternDisplay = document.getElementById("patternDisplay");
const entryTypeSelect = document.getElementById("entryType");
const attributesSelect = document.getElementById("attributes");
const entryTypeText = document.getElementById("entryTypeText");
const attributesText = document.getElementById("attributesText");

// 7501 Completed
const generate7501CompletedBtn = document.getElementById("generate7501Completed");
const preview7501Completed = document.getElementById("preview7501Completed");
const copy7501CompletedBtn = document.getElementById("copy7501Completed");

// 7501 Review
const reasonForReviewSelect = document.getElementById("reasonForReview");
const subReasonSelect = document.getElementById("subReason");
const additionalCommentTA = document.getElementById("additionalComment");
const generateReviewBtn = document.getElementById("generateReview");
const previewReview = document.getElementById("previewReview");
const copyReviewBtn = document.getElementById("copyReview");

// Shipment In Use
const generateShipmentInUseBtn = document.getElementById("generateShipmentInUse");
const previewShipmentInUse = document.getElementById("previewShipmentInUse");
const copyShipmentInUseBtn = document.getElementById("copyShipmentInUse");

// Exit Shipment
const exitReasonTA = document.getElementById("exitReason");
const generateExitBtn = document.getElementById("generateExit");
const previewExit = document.getElementById("previewExit");
const copyExitBtn = document.getElementById("copyExit");

// HS Code Modifier
const hscodeInput = document.getElementById("hscodeInput");
const generateHSCodeBtn = document.getElementById("generateHSCode");
const previewHSCode = document.getElementById("previewHSCode");
const copyHSCodeBtn = document.getElementById("copyHSCode");

// ==================== Utility Functions ====================

/**
 * Show popup notification (from index.js)
 */
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

/**
 * Update Entry Type display
 */
function updateEntryTypeDisplay() {
  const value = entryTypeSelect.value;
  entryTypeText.textContent = value ? value : "None Selected";
}

/**
 * Update Attributes display
 */
function updateAttributesDisplay() {
  const value = attributesSelect.value;
  attributesText.textContent = value ? value : "None Selected";
}

/**
 * Get current values from top inputs
 */
function getInputValues() {
  return {
    coo: cooInput.value.trim().toUpperCase(),
    lines: linesInput.value.trim(),
    entryNo: entryNoInput.value.trim()
  };
}

/**
 * Join non-empty segments with - separators
 */
function joinCommentSegments(...segments) {
  return segments.filter((segment) => segment && segment.toString().trim() !== "").join(" - ");
}

/**
 * Update pattern display in real-time
 */
function updatePattern() {
  const { entryNo, coo, lines } = getInputValues();
  patternDisplay.textContent = joinCommentSegments(entryNo, "Keyed 87/01", coo, lines, "7501Proc");
}

/**
 * Show preview and optionally copy to clipboard
 */
async function showPreview(previewElement, text, shouldCopy = true) {
  previewElement.textContent = text;
  previewElement.classList.add("filled");
  
  if (shouldCopy) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("✅ Copied to clipboard:", text);
    } catch (err) {
      console.error("❌ Failed to copy:", err);
    }
  }
}

/**
 * Manual copy to clipboard with visual feedback
 */
async function copyToClipboard(text, buttonElement) {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = buttonElement.textContent;
    buttonElement.textContent = "Copied! ✓";
    setTimeout(() => {
      buttonElement.textContent = originalText;
    }, 2000);
  } catch (err) {
    alert("Failed to copy: " + err);
  }
}

// ==================== EVENT LISTENERS: Pattern Update ====================

cooInput.addEventListener("input", updatePattern);
linesInput.addEventListener("input", updatePattern);
entryNoInput.addEventListener("input", updatePattern);
entryTypeSelect.addEventListener("change", updateEntryTypeDisplay);
attributesSelect.addEventListener("change", updateAttributesDisplay);

// Call once on load
updatePattern();
updateEntryTypeDisplay();
updateAttributesDisplay();

// ==================== 1. 7501 COMPLETED COMMENT ====================

generate7501CompletedBtn.addEventListener("click", async function() {
  const { entryNo, coo, lines } = getInputValues();
  const comment = joinCommentSegments(entryNo, "Keyed 87/01", coo, lines, "7501Proc");
  await showPreview(preview7501Completed, comment, true);
});

copy7501CompletedBtn.addEventListener("click", async function() {
  const text = preview7501Completed.textContent;
  if (text) await copyToClipboard(text, copy7501CompletedBtn);
});

// ==================== 2. 7501 REVIEW COMMENT ====================

generateReviewBtn.addEventListener("click", async function() {
  if (!reasonForReviewSelect.value) {
    alert("Please select a Reason for Review");
    return;
  }
  
  const { coo, lines } = getInputValues();
  const reason = reasonForReviewSelect.value;
  const subReason = subReasonSelect.value || "[No Sub Reason]";
  const additionalComment = additionalCommentTA.value.trim() || "[No Additional Comment]";
  
  const comment = `Review - ${reason} - ${subReason} - ${additionalComment} - ${coo} - ${lines} - 7501Proc`;
  await showPreview(previewReview, comment, true);
});

copyReviewBtn.addEventListener("click", async function() {
  const text = previewReview.textContent;
  if (text) await copyToClipboard(text, copyReviewBtn);
});

// ==================== 3. SHIPMENT IN USE ====================

generateShipmentInUseBtn.addEventListener("click", async function() {
  const { entryNo, coo, lines } = getInputValues();
  const comment = joinCommentSegments("Shipment in use", entryNo, coo, lines, "7501Proc");
  await showPreview(previewShipmentInUse, comment, true);
});

copyShipmentInUseBtn.addEventListener("click", async function() {
  const text = previewShipmentInUse.textContent;
  if (text) await copyToClipboard(text, copyShipmentInUseBtn);
});

// ==================== 4. EXIT SHIPMENT ====================

generateExitBtn.addEventListener("click", async function() {
  if (!exitReasonTA.value.trim()) {
    alert("Please enter an Exit Reason");
    return;
  }
  
  const { coo, lines } = getInputValues();
  const exitReason = exitReasonTA.value.trim();
  const comment = joinCommentSegments("Exit", exitReason, coo, lines, "7501Proc");
  await showPreview(previewExit, comment, true);
});

copyExitBtn.addEventListener("click", async function() {
  const text = previewExit.textContent;
  if (text) await copyToClipboard(text, copyExitBtn);
});

// ==================== 5. HS CODE MODIFIER ====================
// NOTE: Does NOT include COO/Lines per requirements

generateHSCodeBtn.addEventListener("click", async function() {
  if (!hscodeInput.value.trim()) {
    alert("Please enter an HS Code");
    return;
  }
  
  // Remove dots from HS code
  const formattedCode = hscodeInput.value.trim().replace(/\./g, "");
  
  const comment = `HS Code: ${formattedCode}`;
  await showPreview(previewHSCode, comment, true);
  hscodeInput.value = ""; // Clear input after generation
});

copyHSCodeBtn.addEventListener("click", async function() {
  const text = previewHSCode.textContent.replace("HS Code: ", "");
  if (text) await copyToClipboard(text, copyHSCodeBtn);
});

// ==================== Initialization ====================

console.log("7501 PROC Comment Generator loaded successfully!");
