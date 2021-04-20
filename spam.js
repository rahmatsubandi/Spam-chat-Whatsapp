var repeatingSpamFunction = null;
var message = "";

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

document.onclick = function () {
  createSpamButton();
};

function createSpamButton() {
  if (document.getElementById("spamButton") != null) return;
  var composeBar = getElementByXpath('//*[@id="main"]/footer/div[1]');
  if (composeBar == null) return;
  composeBar.oninput = function () {
    editSpamButton();
  };

  var spamButton = document.createElement("button");
  spamButton.setAttribute("id", "spamButton");
  spamButton.innerHTML = "BOM";
  spamButton.style.fontSize = "100%";
  spamButton.style.padding = "20px 10px";
  composeBar.append(spamButton);
  editSpamButton();
}

function sendMessage() {
  var evt = new Event("input", {
    bubbles: true,
  });

  var input = getElementByXpath(
    '//*[@id="main"]/footer/div[1]/div[2]/div/div[2]'
  );
  input.innerHTML = message;
  input.dispatchEvent(evt);

  getElementByXpath('//*[@id="main"]/footer/div[1]/div[3]/button').click();
}

function doSpam(element) {
  if (element.innerHTML == "BOM") {
    var input = getElementByXpath(
      '//*[@id="main"]/footer/div[1]/div[2]/div/div[2]'
    );
    if (input.innerHTML == "" || input.innerHTML == null) {
      window.alert(
        "Harap Masukkan Teks yang akan dikirimi spam sebelum klik tombol BOM."
      );
      return;
    }
    element.innerHTML = "STOP";
    message = input.innerHTML;
    var interval = parseInt(prompt("Harap masukkan spam-interval::", "0"));
    repeatingSpamFunction = window.setInterval(function () {
      sendMessage();
    }, interval);
  } else {
    element.innerHTML = "BOM";
    window.clearInterval(repeatingSpamFunction);
  }
  editSpamButton();
}

function editSpamButton() {
  var spamButton = document.getElementById("spamButton");
  var input = getElementByXpath(
    '//*[@id="main"]/footer/div[1]/div[2]/div/div[2]'
  );
  if (input.innerHTML == "" || input.innerHTML == null) {
    spamButton.style.cursor = "not-allowed";
    spamButton.style.color = "#D3D3D3";
    spamButton.style.padding = "20px 10px";
    spamButton.onclick = null;
  } else {
    spamButton.style.cursor = "pointer";
    spamButton.style.color = "#039be5";
    spamButton.style.padding = "20px 10px";
    spamButton.onclick = function () {
      doSpam(this);
    };
  }
}
