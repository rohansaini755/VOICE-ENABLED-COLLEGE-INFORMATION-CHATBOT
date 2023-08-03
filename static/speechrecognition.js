if ("webkitSpeechRecognition" in window) {
    let speechRecognition = new webkitSpeechRecognition();
    let final_transcript = "";
  
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
  
    speechRecognition.onstart = () => {
      document.querySelector("#status").style.display = "block";
    };
    speechRecognition.onerror = (err) => {
      document.querySelector("#status").style.display = "none";
      console.log("Speech Recognition Error");
      console.log(err);
    };
    speechRecognition.onend = () => {
      document.querySelector("#status").style.display = "none";
      console.log("Speech Recognition Ended");
    };
  
    speechRecognition.onresult = (event) => {
      let interim_transcript = "";
  
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript = event.results[i][0].transcript;
        } else {
          interim_transcript = event.results[i][0].transcript;
        }
      }
      console.log(final_transcript);
      document.getElementById("user-input").value = final_transcript;
      document.querySelector("#user-input").innerHTML = final_transcript;
      document.querySelector("#user-input").innerHTML = interim_transcript;
    };
  
    document.querySelector("#speak-btn").onclick = () => {
      console.log("start done");
      
      speechRecognition.start();
    };
    document.querySelector("#stop").onclick = () => {
      let question = document.getElementById("user-input").value;
      if(question === " "){}
      else{
        var spn = document.createElement('span')
        spn.style = "color:red;border:1px solid black;border-radius:8px;padding-left:3px;padding-right:3px;"
        spn.innerHTML = question
        // document.getElementById("chat-bodyid").innerHTML += "<br>" + question;
        document.getElementById("chat-bodyid").appendChild(spn);
        document.getElementById("chat-bodyid").innerHTML += "<br>"
        document.getElementById("chat-bodyid").innerHTML += "<br>"
      }
      // let question = "hello"
      var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
      axios.post('http://127.0.0.1:8000/get_answer/',{question:question},{headers:{'X-CSRFToken': csrftoken}})
      .then(response =>{
        const obj = response.data;
        const d = JSON.parse(obj);
        var spn = document.createElement('span')
        spn.style = "color:green;border:1px solid black;border-radius:8px;padding-left:3px;padding-right:3px;"
        spn.innerHTML = d['answer']
        document.getElementById("chat-bodyid").appendChild(spn);
        document.getElementById("chat-bodyid").innerHTML += "<br>"
        document.getElementById("chat-bodyid").innerHTML += "<br>"
        const datatospeek = d['answer'];
        console.log(datatospeek);
        answerSpeech(datatospeek);
      })
      .catch((err)=>{
        alert(err);
      })
      document.getElementById("user-input").value = "";
      speechRecognition.stop();
    };
  } 
  else {
    console.log("Speech Recognition Not Available");
}



//text to speech

let synth = speechSynthesis,
isSpeaking = true;
// synth.addEventListener("voiceschanged",voices); 
function answerSpeech(data){
  console.log("data entered to speech section");
  console.log(data);
  if(data == ""){
    text = "Hello"
  }
  else{
    text = data;
  }

  let utternance = new SpeechSynthesisUtterance(text);
  for(let voice of synth.getVoices()){
    if(voice.name === "Google Us English (de-US)"){
      utternance.voice = voice;
    }
  }
  synth.speak(utternance);

}
// function voices(){
//   for(let voice of synth.getVoices()){
//       let selected = voice.name === "Google US English" ? "selected" : "";
//       let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
//       voiceList.insertAdjacentHTML("beforeend",option);
//   }
// }

/*   fetchhing data from database */




// document.querySelector("#fetchTextid").onclick = () => {
//     fetchData(this);
// };

// function fetchData(element){
//     let p = fetch("http://13.231.225.7:8000/api/text/")
//     p.then((value1) =>{
//         return value1.json()
//     }).then((value2) => {
//         console.log(value2)
//         const obj = JSON.parse(value2)
//         const text = obj.name
//         const textn = hexToString(obj.hindiText)
//         const hint = obj.hintString
//         const hintn = hexToString(hint)
//         // document.getElementById("textarea2").value = textn
//         document.querySelector("#final2").innerHTML = textn
//         document.querySelector("#final3").innerHTML = hintn
//     })
// }


// function hexToString(hexRepresentation) {
//     let byteArray = new Uint8Array(hexRepresentation.match(/[\da-f]{2}/gi).map(function (h) {
//       return parseInt(h, 16)
//     }))
//     return new TextDecoder().decode(byteArray)
// }