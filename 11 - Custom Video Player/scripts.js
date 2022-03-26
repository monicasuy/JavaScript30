// To play the video
// Query selector the button

const vid = document.querySelector('.player__video');
const playButton = document.querySelector('.player__button');


//AddEventListener to button. When clicked play video
playButton.addEventListener('click', () => {
  const isPaused = vid.paused;
  const video = vid[isPaused ? "play" : "pause"]();
})


//To change volume
//Query selector input toggle

const volumeInput = document.querySelector(".player__slider")
// Get video volume- Query selector video
// const vidVolume = vid.volume;



//Add event listener to input.  When change we increase  video sound by the increment.
volumeInput.addEventListener('change', () => {
  // Retrieve volume element from video
  //Video.sound will be equal to by the input value
  vid.volume = volumeInput.value;
  console.log(vid.volume);
})

//To change the speed
//Query selector speed input


const speedInput = document.querySelector('input[name="playbackRate"]')

//Add event listener to input. When change we increase/decrease sound input value

speedInput.addEventListener('change', () => {
  vid.playbackRate = speedInput.value;
  console.log(vid.playbackRate);
})


//Seevideo.playback to input value
//Progress bar
// Query selector progress bar
const progressBar = document.querySelector(".progress");
//Figure out video length
//Convert to percentage
//Set percentage to width of the progress bar

function handleProgress() {
  const progress = (vid.currentTime / vid.duration) * 100;
  const progressFilled = document.querySelector(".progress__filled");
  progressFilled.style.flexBasis = `${progress}%`;
}
vid.addEventListener('timeupdate', handleProgress);

progressBar.addEventListener('click', (e) => {
  const scrub = (e.offsetX / progressBar.offsetWidth) * vid.duration;
  vid.currentTime = scrub;
})

//+10 and +25
//Queryselect + Addevenet listener
// Incremenet video.

const minusTen = document.querySelectorAll('.player__button')[1];

minusTen.addEventListener('click', () => {
  vid.currentTime = vid.currentTime - 10;
})

const addTwentyFive = document.querySelectorAll('.player__button')[2];

addTwentyFive.addEventListener('click', () => {
  vid.currentTime = vid.currentTime + 25;
})

function changeIcon() {
  const icon = vid.paused ? "►" : "❚ ❚"
  playButton.textContent = icon;
}

vid.addEventListener('play', changeIcon)
vid.addEventListener('pause', changeIcon)
