let display = document.querySelector(".result");
let buttons = document.querySelectorAll("#buttons button");

buttons.forEach(function (btn) {

    btn.onclick = function () {

        let value = btn.innerText;
        let text = display.innerText;

        // for clear button
        if (value === "C") {
            display.innerText = "0";
            return;
        }

        // clicl on backspace
        if (btn.id === "backpace") {
            if (text.length === 1) {
                display.innerText = "0";
            }
            else {
                display.innerText = text.slice(0, text.length - 1);
            }
            return;
        }

        //click on equal
        if (value === "=") {

            let expression = text;

            expression = expression.replace("×", "*");
            expression = expression.replace("÷", "/");
            expression = expression.replace("−", "-");

            let result = eval(expression);

            // limit 4 digits after decimal
            if (result.toString().includes(".")) {
                result = parseFloat(result.toFixed(4));
            }

            // check result length
            let digits = result.toString().replace(".", "").replace("-", "");

            if (digits.length > 14) {
                display.innerText = "Result is too big!";
            } else {
                display.innerText = result;
            }
            return;
        }

        //operator check
        if (value === "+" || value === "−" || value === "×" || value === "÷") {

            let last = text[text.length - 1];

            if (last === "+" || last === "−" || last === "×" || last === "÷") {
                display.innerText = text.slice(0, text.length - 1) + value;
                return;
            }
        }

        // decimal check
        if (value === ".") {

            let parts = text.split(/[+\−×÷]/);
            let lastNumber = parts[parts.length - 1];

            if (lastNumber.includes(".")) {
                return;
            }
        }

        // for normal number input
        if (text === "0") {
            display.innerText = value;
        }
        else {
            display.innerText += value;
        }
    }
});