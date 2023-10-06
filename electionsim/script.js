let candidates = [];
let editMode = false; // Track whether we are in Edit Mode
let editCandidateIndex = -1; // Track the index of the candidate being edited

function updateCandidateList() {
    const candidateList = document.getElementById('candidateList');
    candidateList.innerHTML = '';

    for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        const li = document.createElement('li');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => openEditPopup(i);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteCandidate(i);

        li.textContent = `${candidate.name} (Campaign Level: ${candidate.campaignLevel}, Party: ${candidate.partyAffiliation})`;

        if (candidate.isWinner) {
            const checkEmoji = document.createElement('span');
            checkEmoji.textContent = ' ✅'; // Check emoji
            li.appendChild(checkEmoji);
        }

        li.appendChild(editButton);
        li.appendChild(deleteButton);

        candidateList.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const simulateButton = document.getElementById('simulateButton');
    simulateButton.addEventListener('click', simulateElection);

    const addCandidateButton = document.getElementById('addCandidateButton');
    addCandidateButton.addEventListener('click', () => openPopup(false)); // Set Edit Mode to false for adding

    updateCandidateList();
});

function openPopup(isEditMode) {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    if (isEditMode) {
        // If in Edit Mode, change the popup title and button text
        document.querySelector('#popup h2').textContent = 'Edit Candidate';
        document.querySelector('#popup button').textContent = 'Save Edit';
    } else {
        // If in Add Mode, reset input fields and button text
        document.getElementById('newCandidateName').value = '';
        document.getElementById('newCampaignLevel').value = '';
        document.getElementById('newPartyAffiliation').value = 'R';
        document.getElementById('newIsWriteIn').value = 'N';
        document.querySelector('#popup h2').textContent = 'Add Candidate';
        document.querySelector('#popup button').textContent = 'Add Candidate';
    }

    editMode = isEditMode; // Set Edit Mode
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    editCandidateIndex = -1; // Reset the edit index
}

function addCandidate() {
    const name = document.getElementById('newCandidateName').value;
    const campaignLevel = parseInt(document.getElementById('newCampaignLevel').value);
    const partyAffiliation = document.getElementById('newPartyAffiliation').value;
    const isWriteIn = document.getElementById('newIsWriteIn').value === 'Y';

    if (campaignLevel > 100) {
        alert('Campaign Level cannot exceed 100.');
        return;
    }

    const totalCampaignLevels = candidates.reduce((total, candidate) => total + candidate.campaignLevel, 0);

    if (totalCampaignLevels + campaignLevel > 100) {
        alert('The sum of Campaign Levels for all candidates cannot exceed 100.');
        return;
    }

    const newCandidate = {
        name: name,
        campaignLevel: campaignLevel,
        partyAffiliation: partyAffiliation,
        isWriteIn: isWriteIn
    };

    if (editMode && editCandidateIndex >= 0) {
        // If in Edit Mode, replace the existing candidate
        candidates[editCandidateIndex] = newCandidate;
    } else {
        // If in Add Mode, add the new candidate
        candidates.push(newCandidate);
    }

    closePopup();
    updateCandidateList();
    clearPopupFields(); // Clear input fields after adding a new candidate
}

function clearPopupFields() {
    document.getElementById('newCandidateName').value = '';
    document.getElementById('newCampaignLevel').value = '';
    document.getElementById('newPartyAffiliation').value = 'R';
    document.getElementById('newIsWriteIn').value = 'N';
}

function editCandidate(index) {
    const name = document.getElementById('newCandidateName').value;
    const campaignLevel = parseInt(document.getElementById('newCampaignLevel').value);
    const partyAffiliation = document.getElementById('newPartyAffiliation').value;
    const isWriteIn = document.getElementById('newIsWriteIn').value === 'Y';

    if (campaignLevel > 100) {
        alert('Campaign Level cannot exceed 100.');
        return;
    }

    const totalCampaignLevels = candidates.reduce((total, candidate, i) => {
        if (i !== index) {
            return total + candidate.campaignLevel;
        }
        return total;
    }, 0);

    if (totalCampaignLevels + campaignLevel > 100) {
        alert('The sum of Campaign Levels for all candidates cannot exceed 100.');
        return;
    }

    const editedCandidate = {
        name: name,
        campaignLevel: campaignLevel,
        partyAffiliation: partyAffiliation,
        isWriteIn: isWriteIn
    };

    candidates[index] = editedCandidate;
    closePopup();
    updateCandidateList();
}

function deleteCandidate(index) {
    candidates.splice(index, 1);
    updateCandidateList();
}

function simulateElection() {
    const populationInput = document.getElementById('population');
    const partyAffiliationInput = document.getElementById('partyAffiliation');
    const resultsDiv = document.getElementById('results');

    const population = parseInt(populationInput.value);
    const partyAffiliation = partyAffiliationInput.value;

    if (isNaN(population) || population <= 0) {
        alert('Please enter a valid population size.');
        return;
    }

    const voteCount = {};

    for (const candidate of candidates) {
        // Generate a random campaign level adjustment between -10% to +10%
        const randomAdjustment = Math.random() * 0.2 - 0.1;
        let adjustedCampaignLevel = (candidate.campaignLevel / 100) + randomAdjustment;

        if (partyAffiliation === 'Republican') {
            if (candidate.partyAffiliation === 'R') {
                adjustedCampaignLevel *= 1.4;
            } else if (candidate.partyAffiliation === 'Leaning Republican') {
                adjustedCampaignLevel *= 1.2;
            }
        } else if (partyAffiliation === 'Democrat') {
            if (candidate.partyAffiliation === 'D') {
                adjustedCampaignLevel *= 1.4;
            } else if (candidate.partyAffiliation === 'Leaning Democrat') {
                adjustedCampaignLevel *= 1.2;
            }
        }

        const weight = Math.round(adjustedCampaignLevel * population);

        if (!voteCount[candidate.name]) {
            voteCount[candidate.name] = 0;
        }

        for (let i = 0; i < weight; i++) {
            voteCount[candidate.name]++;
        }
    }

    const maxVotes = Math.max(...Object.values(voteCount));
    
    for (const candidate in voteCount) {
        if (voteCount[candidate] === maxVotes) {
            candidates.find(c => c.name === candidate).isWinner = true;
        } else {
            candidates.find(c => c.name === candidate).isWinner = false;
        }
    }

    resultsDiv.innerHTML = "<h2>Election Results:</h2>";

    for (const candidate in voteCount) {
        const winnerEmoji = candidates.find(c => c.name === candidate).isWinner ? '✅' : '';
        resultsDiv.innerHTML += `${candidate}: ${voteCount[candidate]} votes${winnerEmoji}<br>`;
    }

    updateCandidateList(); // Update candidate list with winner emoji
}

function openEditPopup(index) {
    editCandidateIndex = index; // Set the edit index
    const candidate = candidates[index];
    const popup = document.getElementById('popup');

    document.getElementById('newCandidateName').value = candidate.name;
    document.getElementById('newCampaignLevel').value = candidate.campaignLevel;
    document.getElementById('newPartyAffiliation').value = candidate.partyAffiliation;
    document.getElementById('newIsWriteIn').value = candidate.isWriteIn ? 'Y' : 'N';

    const editCandidateButton = document.createElement('button');
    editCandidateButton.textContent = 'Save Edit';

    editCandidateButton.onclick = function () {
        editCandidate(editCandidateIndex); // Use the edit index
        popup.style.display = 'none';
    };

    popup.querySelector('h2').textContent = 'Edit Candidate';
    popup.querySelector('button').replaceWith(editCandidateButton);
    popup.style.display = 'block';
}
document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to toggle the explanation section
    const explanationHeader = document.getElementById('explanation-header');
    const explanationContent = document.getElementById('explanation-content');

    explanationHeader.addEventListener('click', function () {
        if (explanationContent.style.display === 'none') {
            explanationContent.style.display = 'block';
        } else {
            explanationContent.style.display = 'none';
        }
    });

    // Rest of your existing code
});
