const { default: SlippiGame } = require('@slippi/slippi-js');
const fs = require('fs');

// const game = new SlippiGame("F:/Users/Trevor/Documents/Slippi_Replays_for_ML/BF_Only_Top_7/Falco_v_Falco_(BF).slp");
// const game = new SlippiGame("F:/Users/Trevor/Documents/Slippi_Replays_for_ML/Small_Test_Folder/Falcon_v_Falcon_(BF)_9a6uk.slp");
const game = new SlippiGame("F:/Users/Trevor/Documents/badfile.slp");

// Get game settings – stage, characters, etc
const settings = game.getSettings();
console.log(settings);
const playerIndex = settings.players[0].playerIndex;

// // Get metadata - start time, platform played on, etc
const metadata = game.getMetadata();
console.log(metadata);

// // Get computed stats - openings / kill, conversions, etc
try{
        const stats = game.getStats();
}
catch(err) {
        console.log('bad')
}
//console.log(stats);

// characters
const characterId1 = settings.players[0].characterId;
const characterId2 = settings.players[1].characterId;
console.log(characterId1);
console.log(characterId2);

// inputsPerMinute
console.log(Math.round(stats.overall[0].inputsPerMinute.ratio));

// win/lose
console.log(stats.overall[0].killCount === 4 ? 1 : 0)

// length of match in frames
console.log(stats.lastFrame)

// openings/kill
console.log(stats.overall[0].openingsPerKill.ratio)
console.log(stats.overall[0])

// damage per opening
console.log(stats.overall[0].damagePerOpening.ratio)

// neutral win ratio (character neutral wins / total neutral interactions)
console.log(stats.overall[0].neutralWinRatio.ratio)

// opening conversion rate
console.log(stats.overall[0].successfulConversions.ratio)

// dash dance count
console.log(stats.actionCounts[0].dashDanceCount)

// wavedash count
console.log(stats.actionCounts[0].wavedashCount)

// ledgegrab count
console.log(stats.actionCounts[0].ledgegrabCount)

// Get frames – animation state, inputs, etc
// This is used to compute your own stats or get more frame-specific info (advanced)
const frames = game.getFrames();

console.log(frames[1000].players);

let lastGrabFrame = 0;
let numGrabs = 0;
for(i = 0; i <= metadata.lastFrame; i++) {
        if(frames[i].players[playerIndex].pre.actionStateId === 212) {
                if(lastGrabFrame !== frames[i].players[playerIndex].pre.frame - 1) {
                numGrabs = numGrabs + 1;
                }
                lastGrabFrame = frames[i].players[playerIndex].pre.frame;
                //console.log(frames[i].players[playerIndex].pre.frame);
        }
         // Print frame when timer starts counting down
}

// number of grabs
console.log(numGrabs);

console.log(stats);

console.log(game.getGameEnd().gameEndMethod);