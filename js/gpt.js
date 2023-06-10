const API_KEY = "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";

window.localStorage.setItem("line", "3");
window.localStorage.setItem("temperature", "5");

function search() {
    const api_key = API_KEY;
    const keywords = document.getElementById('keywords').value;
    const lines = window.localStorage.getItem("line");
    const temperature = window.localStorage.getItem("temperature");

    let resultDiv = document.getElementById('result');

    resultDiv.innerHTML = "<br></br><div>Loading...</div><br></br>";
    
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: keywords},
    ]
    const config = {
      headers: {
        Authorization: `Bearer ${api_key}`,
        'Content-Type': 'application/json',
      },
    }
    const data = {
      model: 'gpt-3.5-turbo',
      temperature: Number(temperature)/10,
      n: Number(lines),
      messages: messages,
    }
    axios
      .post('https://api.openai.com/v1/chat/completions', data, config)
      .then(function (response) {
        resultDiv.innerHTML = ''
        let text = ""
        response.data.choices.forEach(function (choice, index) {
          text += choice.message.content;
        })
        let temp = text.split('.');
        let get = "";
        temp.forEach((line)=> {
          get += line + ".\n";
        })
        resultDiv.innerHTML += `<div>${get}</div>`;
      })
      .catch(function (error) {
        console.error(error)
      })
}