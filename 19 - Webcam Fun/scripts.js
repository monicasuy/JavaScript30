const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


// turn on the camera/ask for access

// display the video on the video div



// canvas.style.width = '800px';
// canvas.style.height = '800px';
// video.style.width = '800px';
// video.style.height = '800px';

function getVideo() {
  // const facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
  const constraints = {
    audio: false,
    video: true
  };

  /* Stream it to video element */
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(err=>alert('Error occurred: ', err));
}

function displayOnCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);

    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    ctx.putImageData(pixels, 0, 0);

  }, 16);
}
const width = video.videoWidth;
const height = video.videoHeight;

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  // when you click take photo, addeventlistener to button which should take a photo of the video
  const image_data_url = canvas.toDataURL('image/jpeg');
  const link = document.createElement("a");
  link.href = image_data_url;
  // download photo you've taken if you want
  link.setAttribute('download', 'photo')
  link.innerHTML = `<img src="${image_data_url}" alt="" />`;
  strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200;
    pixels.data[i + 1] = pixels.data[i + 1] - 50;
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

getVideo();


video.addEventListener('canplay', displayOnCanvas)
