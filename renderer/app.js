const killEl = document.getElementById("kill");
const input = document.getElementById("input");
const desc = document.getElementById("desc");
const modeBtn = document.getElementById("modeBtn");
const applyBtn = document.getElementById("applyBtn");

const moneyInput = document.getElementById("moneyInput");
const rateInput = document.getElementById("rateInput");
const moneyBtn = document.getElementById("moneyBtn");

const unitLabelInput = document.getElementById("unitLabelInput");
const unitLabelSizer = document.getElementById("unitLabelSizer");
const killTitle = document.getElementById("killTitle");
const moneyDesc = document.getElementById("moneyDesc");

function getLabel() {
    return unitLabelInput.value.trim() || "キル";
}

function resizeUnitLabelInput() {
    unitLabelSizer.textContent = unitLabelInput.value || "キル";
    unitLabelInput.style.width = (unitLabelSizer.offsetWidth + 4) + "px";
}

let mode = "sub"; // add / sub

function onlyNumber(v) {
    return v.replace(/[^0-9]/g, "");
}

function updateStaticLabels() {
    const label = getLabel();
    killTitle.innerText = `残り${label}数`;
    moneyDesc.innerText = `金額から${label}数を計算`;
    rateInput.placeholder = `1${label}の値段`;
    desc.innerText =
        mode === "sub"
            ? `現在の${label}数から指定${label}数を減らします`
            : `現在の${label}数に指定${label}数を増やします`;
}

window.addEventListener("DOMContentLoaded", () => {
    input.focus();
    input.select();

    const rate = window.api.getRate();
    if (rate) {
        rateInput.value = rate;
    }

    const savedLabel = window.api.getUnitLabel();
    unitLabelInput.value = savedLabel;

    resizeUnitLabelInput();
    updateStaticLabels();
    updateApplyLabel();
    updateMoneyButton();
});

input.addEventListener("input", () => {
    input.value = onlyNumber(input.value);
    updateApplyLabel();
});

unitLabelInput.addEventListener("input", () => {
    resizeUnitLabelInput();
});

unitLabelInput.addEventListener("blur", () => {
    if (unitLabelInput.value.trim() === "") {
        unitLabelInput.value = "キル";
    }
    window.api.setUnitLabel(unitLabelInput.value);
    resizeUnitLabelInput();
    updateStaticLabels();
    updateApplyLabel();
    updateMoneyButton();
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        apply();
    }
});

// お金計算

rateInput.addEventListener("input", () => {
    rateInput.value = onlyNumber(rateInput.value);

    const v = Number(rateInput.value || 0);
    if (v > 0) {
        window.api.setRate(v);
    }

    updateMoneyButton();
});

[moneyInput, rateInput].forEach(el => {
    el.addEventListener("input", () => {
        el.value = onlyNumber(el.value);
        updateMoneyButton();
    });
});

[moneyInput, rateInput].forEach(el => {
    el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            applyMoney();
        }
    });
});

// 処理 // 

function refresh() {
    const val = window.api.getKill();
    killEl.innerText = val;
}

function toggleMode() {
    mode = mode === "sub" ? "add" : "sub";

    modeBtn.innerText = mode === "sub" ? "-" : "+";

    updateStaticLabels();
    updateApplyLabel();
}

function apply() {
    const v = Number(input.value || 0);
    if (v <= 0) return;

    if (mode === "add") {
        window.api.addKill(v);
    } else {
        window.api.subKill(v);
    }

    input.value = "";
    refresh();
    updateApplyLabel();
}

function updateApplyLabel() {
    const v = Number(input.value || 0);
    const label = getLabel();

    applyBtn.disabled = v <= 0;

    // 全部リセット
    applyBtn.classList.remove(
        "bg-blue-600", "hover:bg-blue-500",
        "bg-red-600", "hover:bg-red-500",
        "bg-gray-400"
    );

    // disable優先
    if (v <= 0) {
        applyBtn.classList.add("bg-gray-400");

        applyBtn.innerText =
            mode === "add"
                ? `${label}追加`
                : `${label}削除`;
        return;
    }

    // 有効時
    if (mode === "add") {
        applyBtn.classList.add("bg-blue-600", "hover:bg-blue-500");
    } else {
        applyBtn.classList.add("bg-red-600", "hover:bg-red-500");
    }

    applyBtn.innerText =
        mode === "add"
            ? `${v}${label}追加`
            : `${v}${label}削除`;
}

// お金計算処理 //

function updateMoneyButton() {
    const money = Number(moneyInput.value || 0);
    const rate = Number(rateInput.value || 0);
    const label = getLabel();

    const valid = money > 0 && rate > 0;

    moneyBtn.disabled = !valid;

    if (!valid) {
        moneyBtn.innerText = `${label}追加`;
        return;
    }

    const kill = Math.floor(money / rate);

    moneyBtn.innerText = `${kill}${label}追加`;
}

function applyMoney() {
    const money = Number(moneyInput.value || 0);
    const rate = Number(rateInput.value || 0);

    if (money <= 0 || rate <= 0) return;

    const kill = Math.floor(money / rate);
    if (kill <= 0) return;

    window.api.addKill(kill);

    moneyInput.value = "";

    refresh();
    updateMoneyButton();
}

refresh();