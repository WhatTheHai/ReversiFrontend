class FeedbackWidget {
  constructor(elementId) {
    this._elementId = elementId;
  }
  get elementId() {
    //getter, set keyword voor setter methode
    return this._elementId;
  }
  show(message, type) {
    let elem = document.getElementById(this._elementId);
    elem.style.display = "block";
    let textElement = elem.querySelector('.feedback-text--text');
    textElement.textContent = message;
    if (type == "success") {
      $(elem).attr("class","feedback-container--success");
      $(".feedback-text--emoji").text("✔️");
    } else {
      $(elem).attr("class", "feedback-container--danger");
      $(".feedback-text--emoji").text("❌");
    }
    $(elem).addClass("fade-in");
    this.log({ message: message, type: type });
  }
  hide() {
    let elem = document.getElementById(this._elementId);
    elem.classList.add("fade-out");
    setTimeout(() => {
      elem.style.display = "none";
      elem.classList.remove("fade-out");
      elem.classList.remove("fade-in");
    }, 3000)
  }
  log(message) {
    let allMessages = JSON.parse(localStorage.getItem("feedback_widget"));

    if (allMessages == null) {
      allMessages = [];
    } else if (allMessages.length >= 10) {
      allMessages.splice(0, 1);
    }
    allMessages.push(message);
    localStorage.setItem("feedback_widget", JSON.stringify(allMessages));
  }

  removeLog() {
    localStorage.removeItem("feedback_widget");
  }

  history() {
    let allMessages = JSON.parse(localStorage.getItem("feedback_widget"));
    let result = "";
    allMessages.forEach((message) => {
      result += `type ${message["type"]} - ${message["message"]} \n`;
    });
    console.log(result);
  }
}
