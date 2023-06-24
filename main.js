x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
var apple;
var speak_data;


draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload(){
  apple = loadImage('apple.png');
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

    to_number = Number(content);
    if(Number.isInteger(to_number)){
      document.getElementById("status").innerHTML = "Started drawing the "  + content + " apple(s) ";
      draw_apple = "set"; 
    } else{
      document.getElementById("status").innerHTML = "The speech has not recognized a number. " + content; 
    }
}

function setup() {
 screen_width = window.innerWidth;
 screen_height = window.innerHeight;

 cnv = createCanvas(screen_width, screen_height-150);
 cnv.position(0, 150, 'fixed');
}

function draw() {
  if(draw_apple == "set")
  {
    for(let i = 0; i <= to_number; i++){
      x = Math.floor(Math.random*700);
      y = Math.floor(Math.random*400);
      image(apple, x, y, 3);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";

    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = to_number.concat("Apples Drawn.");
}
