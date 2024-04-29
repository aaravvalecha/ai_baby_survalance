img="";
status="";
object=[];
loadSound="";
function preload(){
    img = loadSound("alarm.wav");
}
function setup(){
canvas=createCanvas(380,400)
canvas.center();
video=createCapture(VIDEO);
video.size(380,400);
video.hide();
object_detector=ml5.objectDetector('cocossd',model_loaded);



}
function model_loaded(){
    console.log("model loaded");
    status=true;
   
    document.getElementById("status").innerHTML="Status : Detecting object";
}
function got_result(error,results){
    if(error){
console.error(error);
    }
    else{
        console.log(results);
        object=results;

    }
}
function draw(){
image(video,0,0,380,400);
if(status !=""){
r=(200);
g=(180);
b=(150);
object_detector.detect(video,got_result);
document.getElementById("status").innerHTML="Status : person not Detected";

for(i=0;i<object.length;i++){
    document.getElementById("no_objects").innerHTML="Number Of Objects Dectected are : "+object.length;
    fill(r,g,b);
    percent=floor(object[i].confidence*100);
text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+20);
noFill();
stroke(r,g,b);
rect(object[i].x,object[i].y,object[i].width,object[i].height);

if(object[0].label=="person"){
    document.getElementById("status").innerHTML="Status : person Detected";
alarm.play();
}
}
}



}