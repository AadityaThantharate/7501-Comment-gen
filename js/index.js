// ------------------ Popup Notification ------------------
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

// ------------------ Checklist Logic ------------------
document.addEventListener("change", function (e) {
  if (!e.target.classList.contains("yn-select")) return;

  const notes = e.target.closest(".row").querySelector(".note");
  if (e.target.value === "yes") {
    notes.value = "OK. Proceed to next step.";
    notes.style.border = "1px solid green";
    notes.style.color = "green";
    setTimeout(() => {
      notes.style.border = "1px solid #d1d1d1";
      notes.style.color = "green";
    }, 1200);
    showPopup("Item Approved ✅");
  } else if (e.target.value === "no") {
    notes.value = "This action will REJECT the shipment.";
    notes.style.border = "1px solid red";
    notes.style.color = "red";
    setTimeout(() => {
      notes.style.border = "1px solid #d1d1d1";
      notes.style.color = "red";
    }, 1200);
    showPopup("Item Rejected ❌");
  }
  checkShipmentStatus();
});

function checkShipmentStatus() {
  const selects = document.querySelectorAll(".yn-select");
  const finalStatus = document.getElementById("finalStatus");
  let rejected = false;
  let incomplete = false;

  selects.forEach((sel) => {
    if (sel.value === "") incomplete = true;
    if (sel.value === "no") rejected = true;
  });

  if (incomplete) {
    finalStatus.textContent = "Please complete all checklist items.";
    finalStatus.style.color = "#E68A00";
  } else if (rejected) {
    finalStatus.textContent = "Shipment Rejected.";
    finalStatus.style.color = "#D32F2F";
  } else {
    finalStatus.textContent = "Shipment Approved. Proceed further.";
    finalStatus.style.color = "#388E3C";
  }
}

// ------------------ Reset Button ------------------
document.getElementById("restAll").addEventListener("click", () => {
  document.querySelectorAll(".yn-select").forEach((sel) => (sel.value = ""));
  document.querySelectorAll(".note").forEach((note) => (note.value = ""));
  document.getElementById("finalStatus").textContent = "";
  showPopup("All fields reset 🔄");
});

// ------------------ Proceed Button ------------------
document.getElementById("proceed").addEventListener("click", () => {
  const inputCI = document.getElementById("inputCI");
  const inputTotal = document.getElementById("inputTotal");
  const finalStatus = document.getElementById("finalStatus");

  if (
    !inputCI.value ||
    Number(inputCI.value) <= 0 ||
    !inputTotal.value ||
    Number(inputTotal.value) <= 0
  ) {
    finalStatus.textContent = "Cannot proceed with entered CI Amount";
    finalStatus.style.color = "#D32F2F";
    showPopup("Check CI / Jupiter values ⚠️");
  } else {
    finalStatus.textContent = "You Can Proceed Shipment";
    finalStatus.style.color = "#388E3C";
    showPopup("Proceed to next step ✅");
  }
});
