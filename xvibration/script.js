const gamepadIndex = 0;
let gamepad = null;
let vibrationInterval = null;

// Check browser support for Gamepad API
const browserSupportStatusElement = document.getElementById('browser-support-status');
if ('getGamepads' in navigator) {
  browserSupportStatusElement.textContent = 'Yay this browser is supported!!! ';
} else {
  browserSupportStatusElement.textContent = 'Does not look like your browser is supported :`(';
}

function updateVibrationIntensity() {
  const inputBox = document.getElementById('vibration-intensity');
  const percentage = parseInt(inputBox.value, 10);
  const intensity = percentage / 100;

  if (gamepad && gamepad.vibrationActuator) {
    gamepad.vibrationActuator.playEffect("dual-rumble", {
      startDelay: 0,
      duration: 1000, // Vibrate for 1 second
      weakMagnitude: intensity,
      strongMagnitude: intensity,
    });
  }
}

function stopVibration() {
  if (vibrationInterval) {
    clearInterval(vibrationInterval);
    vibrationInterval = null;
  }
  if (gamepad && gamepad.vibrationActuator) {
    gamepad.vibrationActuator.playEffect("dual-rumble", {
      startDelay: 0,
      duration: 0, // Set to 0 to stop vibration
      weakMagnitude: 0,
      strongMagnitude: 0,
    });
  }
}

// Function to update the gamepad variable when a controller is connected or disconnected
function updateGamepadStatus() {
  const gamepads = navigator.getGamepads();
  const connectedGamepad = gamepads[gamepadIndex];

  if (connectedGamepad) {
    gamepad = connectedGamepad;
    document.getElementById('controller-status').textContent = 'Controller connected';
    document.getElementById('stop-vibration-button').disabled = false;
  } else {
    gamepad = null;
    document.getElementById('controller-status').textContent = 'Controller disconnected. Press "A" on the controller to connect. Or check if it is even connected to your device... ';
    document.getElementById('stop-vibration-button').disabled = true;
  }
}

// Call the updateGamepadStatus() function on page load
window.addEventListener('load', () => {
  updateGamepadStatus();
});

// Event listener to update the gamepad variable when a controller is connected or disconnected
window.addEventListener('gamepadconnected', updateGamepadStatus);
window.addEventListener('gamepaddisconnected', updateGamepadStatus);

// Add event listener to stop the vibration
document.getElementById('stop-vibration-button').addEventListener('click', stopVibration);

// Add event listener to update the vibration intensity while the input value changes
document.getElementById('vibration-intensity').addEventListener('input', () => {
  updateVibrationIntensity();
  
  // Automatically start the vibration after the user inputs the intensity
  if (!vibrationInterval) {
    vibrationInterval = setInterval(() => {
      updateVibrationIntensity();
    }, 1000); // Vibrate every 1 second
  }
});

const vibrationIntensityInput = document.getElementById('vibration-intensity');
const vibrationIntensityValue = document.getElementById('vibration-intensity-value');

vibrationIntensityInput.addEventListener('input', () => {
  const percentage = vibrationIntensityInput.value;
  vibrationIntensityValue.textContent = `${percentage}%`;
  updateVibrationIntensity(); // Call the function to update the vibration intensity when the slider changes
});

function showKnownIssues() {
    const popup = document.getElementById('bugs-popup');
    popup.style.display = 'block';
  }
  
  function hideKnownIssues() {
    const popup = document.getElementById('bugs-popup');
    popup.style.display = 'none';
  }
