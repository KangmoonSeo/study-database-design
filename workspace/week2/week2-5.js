const bar = document.getElementById("js-range");
const text = document.getElementById("num");
const maximum = document.getElementById("max-number");
const result = document.getElementById("js-result");
const printForm = document.getElementById("submit");
const play = (e) => {
    e.preventDefault();
    const barNumber = bar.value;
    const textNumber = text.value;
    maximum.innerHTML = barNumber;

    const generateNumber = generateRandomNumber(0, barNumber);
    const isValid = (textNumber == generateNumber);

    let msg = `<p>You choose: ${textNumber}, the machine choose: ${generateNumber}.</p>`;
    msg += isValid ? `<p><b>You Win!</b></p>` : `<p><b>You lost!</b></p>`;

    result.innerHTML = msg;

}

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (Number(max) + 1));
}

printForm.addEventListener("click", play);