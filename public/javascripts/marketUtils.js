function percenteageColour() {
    let number = document.getElementsByClassName('numeros');
    for (num of number)
        if (parseFloat(num.innerText) > 0) {
            num.style.color = "green";
        } else {
            num.style.color = "red";
        }
}