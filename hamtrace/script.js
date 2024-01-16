function getRegion() {
    var callSign = document.getElementById('callSign').value.toUpperCase();

    // Simplified check for the call sign format
    if (/^[KNW]\d\w+$/.test(callSign)) {
        var region = callSign.charAt(1);
        var regionName = getRegionName(region);
        var states = getStates(region);
        displayResult("Geographical Region: " + region + " (" + regionName + ")<br>States: " + states + "<br>Soon, this will not be extracting regions but finding callsigns inputed by others");
    } else {
        displayResult("Invalid call sign. Please enter a valid ham radio call sign. (Might have a spcace)");
    }
}

function getRegionName(region) {
    var regionNames = {
        '1': 'New England',
        '2': 'Atlantic',
        '3': 'Mid East',
        '4': 'Southeast',
        '5': 'South Central',
        '6': 'Pacific',
        '7': 'Mountain',
        '8': 'Great Lakes',
        '9': 'Plains',
        '0': 'Rocky Mountain',
        '11': 'Alaska',
        '12': 'Caribbean',
        '13': 'Pacific'
    };

    return regionNames[region] || 'Unknown Region';
}

function getStates(region) {
    var statesByRegion = {
        '1': ['CT', 'ME', 'MA', 'NH', 'RI', 'VT'],
        '2': ['NJ', 'NY'],
        '3': ['DE', 'DC', 'MD', 'PA'],
        '4': ['AL', 'FL', 'GA', 'KY', 'NC', 'SC', 'TN', 'VA'],
        '5': ['AR', 'LA', 'MS', 'NM', 'OK', 'TX'],
        '6': ['CA'],
        '7': ['AZ', 'ID', 'MT', 'NV', 'OR', 'UT', 'WA', 'WY'],
        '8': ['MI', 'OH', 'WV'],
        '9': ['IL', 'IN', 'WI'],
        '0': ['CO', 'IA', 'KS', 'MN', 'MO', 'NE', 'ND', 'SD'],
        '11': ['AK'],
        '12': ['VI', 'PR', 'Desecheo Island'],
        '13': ['AS', 'GU', 'JM', 'PM', 'PW', 'KH', 'UM', 'FM']
    };

    return statesByRegion[region] || ['Unknown States'];
}

function displayResult(message) {
    document.getElementById('result').innerHTML = message;
}

function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
}
