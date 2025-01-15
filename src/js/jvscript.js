document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  const clearButton = document.getElementById("clear");
  const equalsButton = document.getElementById("equals");

  let currentInput = "";
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-value");
      if (value && value !== "=" && value !== "C") {
        currentInput += value;
        display.value = currentInput;
      }
    });
  });

  equalsButton.addEventListener("click", () => {
    try {
      console.log(`Current Input: ${currentInput}`);

      currentInput = currentInput.replace(/([+*/])\1+/g, "$1");
      currentInput = currentInput.replace(/([+*/])-+/g, "$1-");
      currentInput = currentInput.replace(/^[+*/]+|[+\-*/]+$/g, "");

      if (!/^[-\d+*/().]+$/.test(currentInput)) {
        throw new Error("Invalid Input");
      }
      const result = eval(currentInput);

      display.value = result;
      currentInput = result.toString();
    } catch (error) {
      display.value = "Error";
      currentInput = "";
    }
  });

  clearButton.addEventListener("click", () => {
    currentInput = "";
    display.value = "";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      equalsButton.click();
    } else if (e.key === "Escape") {
      clearButton.click();
    } else if (/^[\d+\-*/().]$/.test(e.key)) {
      currentInput += e.key;
      display.value = currentInput;
    }
  });
});
