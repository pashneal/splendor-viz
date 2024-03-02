// Import common/game.js before this file

/* =================== */
/* =====  CONST  ===== */
/* =================== */

const colors = [
	["gainsboro"  , "ghostwhite", "black"], // white (diamond)
	["dodgerblue" , "mediumblue", "white"], // blue (sapphire)
	["lightgreen" , "green"     , "white"], // green (emerald)
	["tomato"     , "red"       , "white"], // red (ruby)
	["dimgray"    , "black"     , "white"], // black (onyx)
	["lightyellow", "yellow"    , "black"], // yellow (gold)
	["darkgray"   , "darkgray"  , "black"]  // For noble
];

const different_gems_up_to_2 = [
	[0], [1], [2], [3], [4],
	[0,1], [0,2], [0,3], [0,4], [1,2], [1,3], [1,4], [2,3], [2,4], [3,4],
];

const different_gems_up_to_3 = [
	[0], [1], [2], [3], [4],
	[0,1], [0,2], [0,3], [0,4], [1,2], [1,3], [1,4], [2,3], [2,4], [3,4],
	[0,1,2], [0,1,3], [0,1,4], [0,2,3], [0,2,4], [0,3,4], [1,2,3], [1,2,4], [1,3,4], [2,3,4],
];

const all_nobles = [
	[[2,4], [3,4]],
	[[3,4], [4,4]],
	[[1,4], [2,4]],
	[[0,4], [4,4]],
	[[0,4], [1,4]],
	[[0,3], [3,3], [4,3]],
	[[0,3], [1,3], [2,3]],
	[[2,3], [3,3], [4,3]],
	[[1,3], [2,3], [3,3]],
	[[0,3], [1,3], [4,3]],
];

const list_of_files = [
	['splendor/Game.py', 'Game.py'],
	['splendor/proxy.py', 'proxy.py'],
	['splendor/MCTS.py', 'MCTS.py'],
	[pyConstantsFileName, 'SplendorGame.py'],
	['splendor/SplendorLogic.py', 'SplendorLogic.py'],
	['splendor/SplendorLogicNumba.py', 'SplendorLogicNumba.py'],
];

const tokensCoord      = [["20%", "83%"], ["20%", "53%"], ["50%", "83%"], ["50%", "53%"]];
const tokensCoordSmall = [["20%", "83%"], ["20%", "50%"], ["50%", "83%"], ["50%", "50%"]];
const tokensCoordNoble = [["25%", "83%"], ["25%", "50%"], ["25%", "16%"]];

function _svgIfSelected(selected, isCircle=false) {
	if (selected == 0) {
		return "";
	}

	let color = (selected == 1) ? 'aquamarine' : 'tan';
	if (selected == 3) {
		return `<circle cx="85%" cy="15%" r="5px" fill="${color}"/>`;
	}	else if (isCircle) {
		return `<circle cx="50%" cy="50%" r="45%" style="fill:none;stroke-width:10%;stroke:${color}" />`;
	} else {
		return `<rect width="100%" height="100%" style="fill:none;stroke-width:10%;stroke:${color}" />`;
	}
}

function generateSvgCard(colorIndex, points, tokens, selected) {
	let [bgColor, mainColor, fontColor] = colors[colorIndex]
	let svg = `<svg class="svgL" viewBox="0 0 60 60">`;
	// Draw background first
	svg += `<rect width="100%" height="100%" fill="${bgColor}"/>`;
	svg += `<rect width="100%" height="30%" fill="white" fill-opacity="50%"/>`;

	// Add head elements
	svg += `<rect width="13px" height="13px" x="65%" y="5%" fill="${mainColor}"/>`;
	if (points > 0) {
		svg += `<text x="25%" y="17%" text-anchor="middle" dominant-baseline="central" font-size="16px" font-weight="bolder" fill="${fontColor}">${points}</text>`;
	}

	// Add needed tokens if any
	for (const [index, token] of tokens.entries()) {
		let [x, y] = tokensCoord[index];
		let [col, tokValue] = tokens[index];
		let [notUsed, tokCol, fontCol] = colors[col];
		svg += `<circle cx="${x}" cy="${y}" r="0.5em" fill="${tokCol}" />`;
		svg += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="0.9em" font-weight="bolder" fill="${fontCol}">${tokValue}</text>`;
	}

	svg += _svgIfSelected(selected) + `</svg>`;
	return svg; 
}

function generateSvgNbCards(colorIndex, nbCards, hideIfZero=true) {
	if (nbCards <= 0 && hideIfZero) {
		return `<svg class="svgS" viewBox="0 0 32 32"></svg>`;
	}
	let [bgColor, mainColor, fontColor] = colors[colorIndex]
	let svg = `<svg class="svgS" viewBox="0 0 32 32">`;
	svg += `<rect width="100%" height="100%" fill="${mainColor}" />`;
	svg += `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" alignment-baseline="central" font-size="1.5em" font-weight="bolder" fill="${fontColor}">${nbCards}</text>`;
	svg += `</svg>`;
	return svg;
}

function generateSvgGem(colorIndex, nbGems, selected, hideIfZero=true, bank=false) {
	if (nbGems <= 0 && hideIfZero) {
		return `<svg class="${bank ? 'svgM' : 'svgS'}" viewBox="0 0 32 32">${_svgIfSelected(selected, true)}</svg>`;
	}
	let [bgColor, mainColor, fontColor] = colors[colorIndex]
	let svg = `<svg class="${bank ? 'svgM' : 'svgS'}" viewBox="0 0 32 32">`;
	svg += `<circle cx="50%" cy="50%" r="50%" fill="${mainColor}" />`;
	svg += `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" alignment-baseline="central" font-size="1.5em" font-weight="bolder" fill="${fontColor}">${nbGems}</text>`;
	svg += _svgIfSelected(selected, true) + `</svg>`;
	return svg;
}

function generateSvgSmallCard(colorIndex, points, tokens, selected) {
	let [bgColor, mainColor, fontColor] = colors[colorIndex]
	let svg = `<svg class="svgS" viewBox="0 0 32 32">`;
	// Draw background first
	svg += `<rect width="100%" height="100%" fill="${bgColor}"/>`;
	svg += `<rect width="100%" height="33%" fill="white" fill-opacity="50%"/>`;

	// Add head elements
	svg += `<rect width="0.4em" height="0.5em" x="65%" y="5%" fill="${mainColor}"/>`;
	if (points > 0) {
		svg += `<text x="25%" y="17%" text-anchor="middle" dominant-baseline="central" font-size="0.7em" font-weight="bolder" fill="${fontColor}">${points}</text>`;
	}

	// Add needed tokens if any
	for (const [index, token] of tokens.entries()) {
		let [x, y] = tokensCoordSmall[index];
		let [col, tokValue] = tokens[index];
		let [notUsed, tokCol, fontCol] = colors[col];
		svg += `<circle cx="${x}" cy="${y}" r="0.3em" fill="${tokCol}" />`;
		svg += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="0.6em" font-weight="bolder" fill="${fontCol}">${tokValue}</text>`;
	}

	svg += _svgIfSelected(selected) + `</svg>`;
	return svg; 
}

function generateSvgNoble(tokens, selected=0) {
	let [bgColor, mainColor, fontColor] = colors[6];
	let svg = `<svg class="svgS" viewBox="0 0 32 32">`;
	// Draw background first
	svg += `<rect width="100%" height="100%" fill="${bgColor}"/>`;
	svg += `<rect width="50%" height="100%" fill="white" fill-opacity="50%"/>`;
	for (const [index, token] of tokens.entries()) {
		let [x, y] = tokensCoordNoble[index];
		let [col, tokValue] = tokens[index];
		let [notUsed, tokCol, fontCol] = colors[col];
		svg += `<rect x="calc(${x} - 0.3em)" y="calc(${y} - 0.3em)" width="0.6em" height="0.6em" fill="${tokCol}" />`;
		svg += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-size="0.5em" font-weight="bolder" fill="${fontCol}">${tokValue}</text>`;
	}

	svg += _svgIfSelected(selected) + `</svg>`;
	return svg; 
}

function generateDeck(number, selected) {
	let svg = `<svg class="svgL" viewBox="0 0 60 60">`;
	svg += `<polygon points="0,0 60,0 60,60 0,60" fill="black"/>`;
	svg += `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="0.9em" font-weight="bolder" fill="darkgray">${number} cards</text>`;
	svg += _svgIfSelected(selected) + `</svg>`;
	return svg;
}

function generateTxtPoints(totalPoints, noblePoints, nbGems) {
	let result = ` AI - `;
	result += `${totalPoints} point${totalPoints !== 1 ? 's' : ''}`;
	if (noblePoints > 0) {
		result += ` (incl. ${noblePoints} <i class="chess queen icon"></i>)`;
	}
	result += ` - ${nbGems} <i class="gem icon"></i>`
	return result;
}

// Return 1 if main action, 2 if secondary action, 3 if previous action
// 0 otherwise
// lastAction=null: don't check previous action (never returns 3)
// currentMove=false: don't check current move (never returns 1 nor 2)
function _getSelectMode(itemType, index, lastAction=null, currentMove=true) {
	let result = 0;
	if (currentMove) {
		result = move_sel.isSelected(itemType, index);
	}
	if (!game.is_human_player('previous')) {
		// Previous mode was from AI
		if (lastAction !== null && result == 0) {
			if (lastAction[0] == itemType || (itemType == 'gemback' && lastAction[0] == 'gem') || (itemType == 'card' && lastAction[0] == 'rsv')) {
				if (Array.isArray(lastAction[1])) {
					if (lastAction[1].includes(index)) {
						result = 3;
					}
				} else if (lastAction[1] == index) {
					result = 3;
				}
			}
		}
	}

	return result;
}

function updateGameNobles() {
  fetch("/replay/nobles")
    .then(response => response.json())
    .then(response => {
      // Clear all nobles first 
      for (let index = 0; index < nb_players+1; index++) {
        document.getElementById('noble' + index).innerHTML = "" 
      }
      // Then update from backend
      response.success.nobles.forEach((tokens, index) => {
        document.getElementById('noble' + index).innerHTML = generateSvgNoble(tokens);
      });
    });
}

function updateGameCards() {
  fetch("/replay/cards")
    .then(response => response.json())
    .then(response => {
      // Clear all cards first 
      for (let tier = 0; tier < 3; tier++) {
        for (let index = 0; index < 4; index++) {
          document.getElementById('lv' + tier + '_' + index).innerHTML = "" 
        }
      }
      // Then update from backend
      response.success.cards.forEach((row, _) => {
        row.forEach((card, index) => {
          document.getElementById('lv' + card.tier + '_' + index).innerHTML = generateSvgCard(card.colorIndex, card.points, card.tokens);
        })
      });

    });
}

function updateGameDecks() {
  fetch("/replay/decks")
    .then(response => response.json())
    .then(response => {
      // Clear all decks first 
      for (let tier = 0; tier < 3; tier++) {
        document.getElementById('lv' + tier + '_deck').innerHTML = "" 
      }
      // Then update from backend
      response.success.decks.forEach((deck, _) => {
        document.getElementById('lv' + deck.tier + '_deck').innerHTML = generateDeck(deck.cardCount, false);
      });
    });
}

function updateGameBanks() {
  fetch("/replay/bank")
    .then(response => response.json())
    .then(response => {
      // Clear all banks first 
      for (let color = 0; color < 6; color++) {
        document.getElementById('bank_c' + color).innerHTML = "" 
      }
      // Then update from backend
      response.success.bank.forEach(([index, count], _) => {
        document.getElementById('bank_c' + index).innerHTML = generateSvgGem(index, count, false, true, true);
      });
    });
}

function updateGamePlayers() {
  fetch("/replay/players")
    .then(response => response.json())
    .then(response => {
      response.success.players.forEach((player, playerIndex) => {
        // Clear all reserved cards first
        for (let reservedIndex = 0; reservedIndex < 3; reservedIndex++) {
          document.getElementById('p' + playerIndex + '_r' + reservedIndex).innerHTML = ""
        }

        // Then update from backend
        player.developments.forEach(([colorIndex, amount], _) => {
          let div = document.getElementById('p' + playerIndex + '_c' + colorIndex);
          let svg = generateSvgNbCards(colorIndex, amount);
          div.innerHTML = svg;
        });
        player.gems.forEach(([colorIndex, amount], _) => {
          let div = document.getElementById('p' + playerIndex + '_g' + colorIndex);
          let svg = generateSvgGem(colorIndex, amount);
          div.innerHTML = svg;
        });
        player.reservedCards.forEach((card, reservedIndex) => {
          let div = document.getElementById('p' + playerIndex + '_r' + reservedIndex);
          let svg = generateSvgSmallCard(card.colorIndex, card.points, card.tokens);
          div.innerHTML = svg;
        });

		    document.getElementById('p' + playerIndex + '_details').innerHTML = generateTxtPoints(
          player.totalPoints, 
          player.noblePoints, 
          player.totalGems
        );
      });
    });
}

function refreshBoard() {
  updateGameNobles()
  updateGameCards()
  updateGameDecks()
  updateGameBanks()
  updateGamePlayers()
}

function refreshButtons(loading=false) {
	if (loading) {
		document.getElementById('allBtn').style = "display: none";
		document.getElementById('loadingBtn').style = "";
		return;
	} else {
		document.getElementById('allBtn').style = "";
		document.getElementById('loadingBtn').style = "display: none";
	}
	document.getElementById('btn_confirm').classList.remove('green', 'red', 'gray');

	if (game.is_ended()) {
		// Game is finished, looking for the winner
		console.log('End of game');
		let color; let message;
		if (game.gameEnded[0]>0) {
			if (game.gameEnded[1]>0) {
				color = 'gray'; message = 'Tie game';
			} else {
				color = 'green'; message = 'P0 wins';
			}
		} else {
			color = 'red'; message = 'P1 wins';
		}
		document.getElementById('btn_confirm').classList.add(color, 'disabled');
		document.getElementById('btn_confirm').classList.remove('basic');
		document.getElementById('btn_confirm').innerHTML = message;
	} else {
		let move_str = move_sel.getMoveShortDesc();
		let move = move_sel.getMoveIndex();
		
		if (move_str == 'none') {
			document.getElementById('btn_confirm').innerHTML = `CLICK ON A CARD OR A GEM`;
			document.getElementById('btn_confirm').classList.add('disabled', 'green', 'basic');
		} else if (game.validMoves[move]) {
			document.getElementById('btn_confirm').innerHTML = `Confirm to ${move_str}`;
			document.getElementById('btn_confirm').classList.remove('disabled', 'basic');
			document.getElementById('btn_confirm').classList.add('green');
		} else {
			document.getElementById('btn_confirm').innerHTML = `Cannot ${move_str}`;
			document.getElementById('btn_confirm').classList.add('disabled', 'basic');
		}
	}
}

/* =================== */
/* ===== ACTIONS ===== */
/* =================== */

function clickToSelect(itemType, index) {
	move_sel.click(itemType, index);
	refreshBoard();
	refreshButtons()
}

function confirmSelect() {
	let move = move_sel.getMoveIndex();
	let descr = move_sel.getMoveShortDesc();
	move_sel.reset();

	// Do move
	console.log('Move = ', move, ' = ', descr);
	game.move(move, true);

	refreshBoard();
	refreshButtons();

	ai_play_if_needed();
}

async function nextMove() {
  fetch("/replay/next", {method : "POST"})
    .then((r) => r.json())
    .then(r => {updateMoveInput(r.success.move_index)});
}

async function prevMove() {
  fetch("/replay/previous", {method : "POST"})
    .then((r) => r.json())
    .then(r => {updateMoveInput(r.success.move_index)});
}

async function gotoMove(move) {
  fetch("/replay/goto", 
    {
      method : "POST", 
      body : JSON.stringify({"move_index": move }),  
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  ).then((r) => r.json())
   .then(r => {updateMoveInput(r.success.move_index)});
}

async function validateInput()  {
  let is_valid = RegExp("^[0-9]+$").test(document.getElementById("moveInput").value);

  if (is_valid) {
    document.getElementById("move").classList.remove("error");
    gotoMove(parseInt(document.getElementById("moveInput").value));
  } else {
    document.getElementById("move").classList.add("error");
  }
}

async function updateMoveInput(move) {
  let moveInput = document.getElementById("moveInput");
  moveInput.value = move.toString();
  refreshBoard();
}
