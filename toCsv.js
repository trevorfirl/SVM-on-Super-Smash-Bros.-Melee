const { default: SlippiGame } = require('@slippi/slippi-js');
const fs = require('fs');


const slpFolder = 'F:/Users/Trevor/Documents/Slippi_Replays_for_ML/BF_Only_Top_4/half2';
const nameArray = [];
let gameTest;
const completeArray = [];
let numberOfFiles = 0;
let stats;
let badFiles = [];

fs.readdirSync(slpFolder).forEach(file => {
        let individualFileArray = [];
        nameArray.push(file);
        numberOfFiles = numberOfFiles + 1;
        if(numberOfFiles % 20 === 0) {
                console.log(numberOfFiles);
        }

        // new game
        game = new SlippiGame(`F:/Users/Trevor/Documents/Slippi_Replays_for_ML/BF_Only_Top_4/half2/${file}`);

        //console.log(file);
        try{
                stats = game.getStats();
        }
        catch(err) {
                stats = false;
                console.log('BAD FILE?')
                console.log(file);
                badFiles.push(file);
        }

        if(stats === false){
                console.log('stats is false');
        } else {
        const settings = game.getSettings();
        const metadata = game.getMetadata();

        // player index (important for frames to get grab count)
        const playerIndex = settings.players[0].playerIndex;

        // get random 0 or 1 to determine which player is the one to analyze
        // const zeroOr1 = Math.round(Math.random())

        // character id
        const characterId1 = settings.players[0].characterId;
        const characterId2 = settings.players[1].characterId;

        // inputs per minute
        const ipm = Math.round(stats.overall[0].inputsPerMinute.ratio);

        // win/lose
        const win = stats.overall[0].killCount === 4 ? 1 : 0;

        // length of game in frames
        const length = stats.lastFrame;

        // openings/kill
        const openingPerKill = stats.overall[0].openingsPerKill.ratio;

        // damage per opening
        const damagePerOpening = stats.overall[0].damagePerOpening.ratio;

        // neutral win ratio
        const neutralWinRatio = stats.overall[0].neutralWinRatio.ratio;

        // opening conversion rate
        const openingConversionRate = stats.overall[0].successfulConversions.ratio;

        // dash dance count
        const ddCount = stats.actionCounts[0].dashDanceCount;

        // wave dash count
        const wdCount = stats.actionCounts[0].wavedashCount;

        // ledge grab count
        const lgCount = stats.actionCounts[0].ledgegrabCount;

        // number of grabs
        const frames = game.getFrames();

        let lastGrabFrame = 0;
        let numGrabs = 0;
        for(i = 0; i <= metadata.lastFrame; i++) {
                //console.log(file);
                if(frames[i].players[playerIndex] !== undefined) {
                if(frames[i].players[playerIndex].pre.actionStateId === 212) {
                        if(lastGrabFrame !== frames[i].players[playerIndex].pre.frame - 1) {
                                numGrabs = numGrabs + 1;
                        }
                        lastGrabFrame = frames[i].players[playerIndex].pre.frame;
                        //console.log(frames[i].players[playerIndex].pre.frame);
                }
        }
        }

        individualFileArray.push(characterId1, characterId2, ipm, win, length, openingPerKill, damagePerOpening, neutralWinRatio, openingConversionRate, ddCount, wdCount, lgCount, numGrabs)
        completeArray.push(individualFileArray);
        }
});

//console.log(completeArray);

var file = fs.createWriteStream('array2.txt');
file.on('error', function(err) { /* error handling */ });
completeArray.forEach(function(v) { file.write(v.join(', ') + '\n'); });
file.end();

console.log(badFiles);