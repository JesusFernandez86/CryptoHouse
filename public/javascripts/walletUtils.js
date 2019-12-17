window.onload = function getBalance() {
    if (localStorage.getItem("balance") === null || isNaN(localStorage.getItem("balance"))) {
        localStorage.setItem("balance", balance);
    } else {
        balance = this.localStorage.getItem("balance");
    }
    document.getElementById('balance').value = balance + "$";
}


function calculate() {
    let amount = document.getElementById('amount').value;
    let finValue = document.getElementById('finalValue').value;
    if (isNaN(amount)) {
        document.getElementById('amount').value = "";
    }
    let coinValue = 0;
    let selectCoin = document.getElementById('selectCoin').value;
    let finalValue = 0;
    switch (selectCoin) {
        case "BTC":
            coinValue = 8765;
            break;
        case "ETH":
            coinValue = 185;
            break;
        case "XRP":
            coinValue = 0.21;
            break;
        case "LTC":
            coinValue = 78.5;
            break;
    }
    finalValue = parseFloat(amount) * coinValue;
    if (isNaN(amount)) {
        document.getElementById('finalValue').value = "";
    } else {
        if (document.getElementById('amount').value != "") {
            document.getElementById('finalValue').value = finalValue.toFixed(4) + " $";
        } else {
            document.getElementById('finalValue').value = "";
        }
    }
}

function addBalance() {
    let final = document.getElementById('finalValue').value;
    balance = parseFloat(balance) + parseFloat(final);
    localStorage.setItem("balance", balance);
}

function checkAmountCoins() {
    let coinsAmount = document.getElementsByClassName('currency_amount');
    let coins = document.getElementsByClassName('currency_name');
    let coin = document.getElementById('selectCoin').value;
    let amount = document.getElementById('amount').value;
    let flag = false;
    for (let j = 0; j < coins.length && flag == false; j++) {
        if (coin == coins[j].innerText && amount > parseFloat(coinsAmount[j].innerText)) {
            document.getElementById('amount').value = "";
            alert("You cannot trade what you do not own");
            flag = true;
        }
    }
    if (flag) {
        document.getElementById('finalValue').value = "";
    } else {
        addBalance();
    }
};