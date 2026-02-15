// FedEx MID generator logic per user's rules
(function () {
  const ignoreWords = new Set(["the", "and", "of", "a", "an"]);

  function sanitizeText(s) {
    return (s || "").trim();
  }

  function takeFirstChars(word, n) {
    word = (word || "").toUpperCase();
    if (word.length >= n) return word.slice(0, n);
    return (word + "X".repeat(n)).slice(0, n);
  }

  function manufacturerCode(name) {
    name = sanitizeText(name);
    if (!name) return "XXX" + "XXX";
    const parts = name
      .split(/\s+/)
      .map((p) => p.replace(/[^A-Za-z0-9]/g, ""))
      .filter((p) => p && !ignoreWords.has(p.toLowerCase()));

    const first = parts[0] || "";
    const second = parts[1] || "";
    const a = takeFirstChars(first, 3);
    const b = takeFirstChars(second, 3);
    return a + b; // 6 letters
  }

  function addressCode(address) {
    address = sanitizeText(address);
    // find all numbers in the address, pick the highest numeric value
    const nums = (address.match(/\d+/g) || []).map((s) => parseInt(s, 10));
    let chosen = 0;
    if (nums.length) chosen = Math.max(...nums);
    // turn into string and take first 4 digits (pad with 0 if needed)
    const str = String(chosen).padStart(4, "0");
    return str.slice(0, 4);
  }

  function cityCode(city) {
    city = sanitizeText(city).toUpperCase().replace(/[^A-Z]/g, "");
    if (!city) return "XXX";
    return (city + "XXX").slice(0, 3);
  }

  function countryCode(c) {
    c = sanitizeText(c).toUpperCase().replace(/[^A-Z]/g, "");
    if (c.length === 2) return c;
    // try words like United Kingdom -> GB mapping not implemented; just take first 2
    return (c + "XX").slice(0, 2);
  }

  function spaced(str) {
    return str.split("").join(" ");
  }

  function buildMID(values) {
    const cc = countryCode(values.country);
    const man = manufacturerCode(values.manufacturer);
    const addr = addressCode(values.address);
    const city = cityCode(values.city);
    const compact = (cc + man + addr + city).toUpperCase();
    const spacedOut = spaced(compact);
    return { compact, spacedOut, parts: { cc, man, addr, city } };
  }

  // DOM handlers
  document.addEventListener("DOMContentLoaded", function () {
    const country = document.getElementById("country");
    const manufacturer = document.getElementById("manufacturer");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const generate = document.getElementById("generate");
    const resultBox = document.getElementById("resultBox");
    const copyBtn = document.getElementById("copyBtn");
    const clearBtn = document.getElementById("clearBtn");

    function showResult(res) {
      resultBox.innerHTML = "<div>" +
        "<div class='mid-compact'>" + res.compact + "</div>" +
        "<div class='mid-spaced'>" + res.spacedOut + "</div>" +
        "<div class='mid-parts'>Country: " + res.parts.cc + " | Name: " + res.parts.man + " | Addr: " + res.parts.addr + " | City: " + res.parts.city + "</div>" +
        "</div>";
    }

    generate.addEventListener("click", function () {
      const vals = {
        country: country.value,
        manufacturer: manufacturer.value,
        address: address.value,
        city: city.value,
      };
      const res = buildMID(vals);
      showResult(res);
    });

    copyBtn.addEventListener("click", function () {
      const text = resultBox.textContent || "";
      const compact = text.split("\n")[0] || "";
      navigator.clipboard && navigator.clipboard.writeText(compact.trim()).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy Compact'), 1500);
      }, () => {
        // fallback
        alert('Copy not supported');
      });
    });

    clearBtn.addEventListener("click", function () {
      country.value = "";
      manufacturer.value = "";
      address.value = "";
      city.value = "";
      resultBox.innerHTML = "Fill the form to generate the MID code.";
      copyBtn.textContent = "Copy Code";
    });
  });

})();
