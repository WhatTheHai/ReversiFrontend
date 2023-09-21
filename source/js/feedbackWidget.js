class FeedbackWidget {
  constructor (elementId) {
    this._elementId = elementId
  }
  get elementId () {
    //getter, set keyword voor setter methode
    return this._elementId
  }
  show (message, type) {
    let elem = document.getElementById(this._elementId)
    let typeEmoji = '✔️'
    let fact = 'Placeholder'
    elem.style.display = 'block'

    if (type != 'success') {
      type = 'danger'
      typeEmoji = '❌'
    }

    Game.API.getDogFact().then(data => {
      const fact = data.data[0].attributes.body
      elem.outerHTML = Game.Template.parseTemplate('feedbackWidget.body', {
        status: type,
        emoji: typeEmoji,
        text: message,
        quote: fact
      })
      this.log({ message: message, type: type })
    })
  }

  hide () {
    let elem = document.getElementById(this._elementId)
    elem.classList.add('fade-out')
    setTimeout(() => {
      elem.style.display = 'none'
      elem.classList.remove('fade-out')
      elem.classList.remove('fade-in')
    }, 749)
  }
  log (message) {
    let allMessages = JSON.parse(localStorage.getItem('feedback_widget'))

    if (allMessages == null) {
      allMessages = []
    } else if (allMessages.length >= 10) {
      allMessages.splice(0, 1)
    }
    allMessages.push(message)
    localStorage.setItem('feedback_widget', JSON.stringify(allMessages))
  }

  removeLog () {
    localStorage.removeItem('feedback_widget')
  }

  history () {
    let allMessages = JSON.parse(localStorage.getItem('feedback_widget'))
    let result = ''
    allMessages.forEach(message => {
      result += `type ${message['type']} - ${message['message']} \n`
    })
    console.log(result)
  }
}
