const killEl = document.getElementById("kill");
const input = document.getElementById("input");
const desc = document.getElementById("desc");
const modeBtn = document.getElementById("modeBtn");
const applyBtn = document.getElementById("applyBtn");

const moneyInput = document.getElementById("moneyInput");
const rateInput = document.getElementById("rateInput");
const moneyBtn = document.getElementById("moneyBtn");

let mode = "sub"; // add / sub

function onlyNumber(v) {
    return v.replace(/[^0-9]/g, "");
}

window.addEventListener("DOMContentLoaded", () => {
    input.focus();
    input.select();

    const rate = window.api.getRate();
    if (rate) {
        rateInput.value = rate;
    }

    updateApplyLabel();
    updateMoneyButton();
});

input.addEventListener("input", () => {
    input.value = onlyNumber(input.value);
    updateApplyLabel();
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

    desc.innerText =
        mode === "sub"
            ? "現在のキル数から指定キル数を減らします"
            : "現在のキル数に指定キル数を増やします";
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
                ? "キル追加"
                : "キル削除";
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
            ? `${v}キル追加`
            : `${v}キル削除`;
}

// お金計算処理 //

function updateMoneyButton() {
    const money = Number(moneyInput.value || 0);
    const rate = Number(rateInput.value || 0);

    const valid = money > 0 && rate > 0;

    moneyBtn.disabled = !valid;

    if (!valid) {
        moneyBtn.innerText = "キル追加";
        return;
    }

    const kill = Math.floor(money / rate);

    moneyBtn.innerText = `${kill}キル追加`;
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