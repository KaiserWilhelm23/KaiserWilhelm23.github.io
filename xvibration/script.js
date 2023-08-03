const gamepadIndex = 0;
let gamepad = null;
let vibrationInterval = null;

// Check browser support for Gamepad API
const browserSupportStatusElement = document.getElementById('browser-support-status');
if ('getGamepads' in navigator) {
  browserSupportStatusElement.textContent = 'Browser supports Gamepad API';
} else {
  browserSupportStatusElement.textContent = 'Browser does not support Gamepad API';
}

function updateVibrationIntensity() {
  const inputBox = document.getElementById('vibration-intensity');
  const percentage = parseInt(inputBox.value, 10);
  const intensity = percentage / 100;

  if (gamepad && gamepad.vibrationActuator) {
    gamepad.vibrationActuator.playEffect("dual-rumble", {
      startDelay: 0,
      duration: 1000, // Vibrate for 1 second
      gain: intensity,
    });
  }
}

function startVibration() {
  stopVibration();
  if (gamepad && gamepad.vibrationActuator) {
    vibrationInterval = setInterval(() => {
      gamepad.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: 1000, // Vibrate for 1 second
        gain: 1, // Full intensity
      });
    }, 1000); // Vibrate every 1 second
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
      gain: 0,
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
    document.getElementById('start-vibration-button').disabled = false;
    document.getElementById('stop-vibration-button').disabled = false;
  } else {
    gamepad = null;
    document.getElementById('controller-status').textContent = 'Controller disconnected. Press "A" on the controller to connect.';
    document.getElementById('start-vibration-button').disabled = true;
    document.getElementById('stop-vibration-button').disabled = true;
  }
}

// Event listener to update the gamepad variable when a controller is connected or disconnected
window.addEventListener('gamepadconnected', updateGamepadStatus);
window.addEventListener('gamepaddisconnected', updateGamepadStatus);

// Add event listener to the button to start the vibration
document.getElementById('start-vibration-button').addEventListener('click', startVibration);

// Add event listener to stop the vibration
document.getElementById('stop-vibration-button').addEventListener('click', stopVibration);

// Add event listener to update the vibration intensity while the input value changes
document.getElementById('vibration-intensity').addEventListener('input', updateVibrationIntensity);
