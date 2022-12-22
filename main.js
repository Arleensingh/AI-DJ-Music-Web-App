song1 = "";
song2 = "";
rightWristX = 0;
leftWristX = 0;
rightWristY = 0;
leftWristY = 0;
song1_status = "";
song2_status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(400, 130);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded!");
}

function gotPoses(results) {
    if(results.length > 0) {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
    }
}

function draw() {
    image(video, 0, 0, 500, 400);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("blue");
    stroke("blue");

    if(scoreRightWrist > 0.1) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();

        if(song1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Song Name : Harry Potter Theme Song";
        }
    }

    if(scoreLeftWrist > 0.1) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();

        if(song2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Song Name : Peter Pan Song";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}