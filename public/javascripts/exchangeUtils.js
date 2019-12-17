const CURR = {
    "BTC": { "BTC": 1.0000, "ETH": 46.1900, "XRP": 3254.0500, "LTC": 144.8000, "USD": 8765.0000 },
    "ETH": { "BTC": 0.0220, "ETH": 1.0000, "XRP": 703.0000, "LTC": 3.1300, "USD": 185.0000 },
    "XRP": { "BTC": 0.0001, "ETH": 0.0014, "XRP": 1.0000, "LTC": 0.0044, "USD": 0.2100 },
    "LTC": { "BTC": 0.0069, "ETH": 0.3200, "XRP": 225.2600, "LTC": 1.0000, "USD": 78.5000 },
    "USD": { "BTC": 8765.00, "ETH": 185.00, "XRP": 0.21, "LTC": 78.50, "USD": 1.00 }
};
//TODO hacer control de errores

window.onload = function getBalance() {
    if (localStorage.getItem("balance") === null || isNaN(localStorage.getItem("balance"))) {
        localStorage.setItem("balance", balance);
    } else {
        balance = this.localStorage.getItem("balance");
    }
    document.getElementById('balance').value = balance + "$";
}

function calculate() {
    let amount = document.getElementById('amount_buy').value;
    let coinValue = 0;
    let curr1 = document.getElementById('coin_buy').value;
    let curr2 = document.getElementById('coin_buy2').value;;
    coinValue = parseFloat(amount) * CURR[curr1][curr2];
    let coinValue1 = coinValue.toFixed(4);
    return coinValue;
}

function calculateUSD() {
    let res = 0;
    let amount = document.getElementById('amount_buy').value;
    let curr1 = document.getElementById('coin_buy').value;
    res = parseFloat(amount) * CURR[curr1]["USD"];
    let res1 = res.toFixed(4);
    return res1;
}

function paintResult() {
    let res = calculate();
    let res2 = calculateUSD();
    let amount_buy2 = document.getElementById('amount_buy2').value;

    if (isNaN(amount_buy) || amount_buy == "") {
        document.getElementById('amount_buy2').value = "";
        document.getElementById('total_buy').value = "";
    } else {
        document.getElementById('amount_buy2').value = res;
        document.getElementById('total_buy').value = res2;
    }
}

function calculate2() {
    let res = 0;
    let coin = document.getElementById('coin_toBuy').value;
    let amount = document.getElementById('buy_usd').value;
    res = parseFloat(amount) / CURR[coin]["USD"];
    let res1 = res.toFixed(4);
    return res1;
}

function paintResult2() {
    let res = calculate2();
    let usd = document.getElementById('buy_usd').value;
    if (isNaN(usd) || usd == "") {
        document.getElementById('total_toBuy').value = "";
    } else {
        document.getElementById('total_toBuy').value = res;
    }
}

function sus_balanace() {
    let final = document.getElementById('buy_usd').value;
    if (final < balance) {
        balance = parseFloat(balance) - parseFloat(final);
        localStorage.setItem("balance", balance);
    } else {
        alert('Add some money to your balance');
    }
}