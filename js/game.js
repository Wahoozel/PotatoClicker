/******************************
PotatoClicker game class
******************************/

var potatoes;
var perSecond;
var perClick;
var perClickIncrease;
var level;
var xp;
var nextXp;
var xpBoost;
var name;

//Statistics
var gameStarted;
var totalPotatoes;
var potatoesThisGame;
var potatoesSpent;
var potatoClicks;
var totalUpgrades;

var storeItems;
var itemMashedPotatoes;
var itemPotatoSalad;
var itemChips;
var itemFries;
var itemBakedPotato;
var itemBigPotato;
var itemHugePotato;
var itemPotatoPlanet;
var itemPotatoGod;
var itemPotatoGalaxy;
var itemPotatoUniverse;

var achievements;
var achievementSlave;
var achievementPeasant;
var achievementNoobFarmer;
var achievementBeginnerFarmer;
var achievementFarmer;
var achievementSeniorFarmer;

var sellmode;

function init()
{
	if(!supportsLocalStorage())
		alert("Warning: Your browser does not support HTML5 Web Storage. Potato Clicker will not work.");

	potatoes = 0;
	if (get("PotatoCount"))
		potatoes = parseFloat(get("PotatoCount"), 10);

	perSecond = 0;
	if (get("PerSecond"))
		perSecond = parseInt(get("PerSecond"), 10);

	perClick = 1;
	if (get("PerClick"))
		perClick = parseInt(get("PerClick"), 10);

	perClickIncrease = 1;
	if (get("PerClickIncrease"))
		perClickIncrease = parseInt(get("PerClickIncrease"), 10);

	level = 1;
	if (get("Level"))
		level = parseInt(get("Level"), 10);

	xp = 0;
	if (get("XP"))
		xp = parseInt(get("XP"), 10);

	nextXp = 64;
	if (get("NextXP"))
		nextXp = parseInt(get("NextXP"), 10);

	if (get("Name"))
		name = get("Name");
	else
		getName();

	//Statistics
	gameStarted = new Date().getTime();
	if (get("StatGameStarted"))
		gameStarted = parseInt(get("StatGameStarted"), 10);


	totalPotatoes = 0;
	if (get("StatTotalPotatoCount"))
		totalPotatoes = parseFloat(get("StatTotalPotatoCount"), 10);

	potatoesThisGame = 0;
	if (get("StatPotatoesThisGame"))
		potatoesThisGame = parseFloat(get("StatPotatoesThisGame"), 10);

	potatoesSpent = 0;
	if (get("StatPotatoesSpent"))
		potatoesSpent = parseFloat(get("StatPotatoesSpent"), 10);

	potatoClicks = 0;
	if (get("StatPotatoClicks"))
		potatoClicks = parseFloat(get("StatPotatoClicks"), 10);

	totalUpgrades = 0;
	if (get("StatTotalUpgrades"))
		totalUpgrades = parseInt(get("StatTotalUpgrades"), 10);

	createItems();
	createAchievements();
	saveStats();

	sellmode = false;

	setInterval(function() { addPotato(perSecond); }, 1000);
	setInterval(update, 1000 / 60);
}

function getName() {
	name = prompt("Welcome! What is your name?");
}

function createItems()
{
	storeItems = [];
	itemMashedPotatoes = new StoreItem("Mashed Potatoes", "MashedPotatoes", 1, 50);
	storeItems.push(itemMashedPotatoes);
	itemPotatoSalad = new StoreItem("Potato Salad", "PotatoSalad", 5, 500);
	storeItems.push(itemPotatoSalad);
	itemChips = new StoreItem("Chips", "Chips", 10, 5000);
	storeItems.push(itemChips);
	itemFries = new StoreItem("French Fries", "Fries", 20, 50000);
	storeItems.push(itemFries);
	itemBakedPotato = new StoreItem("Baked Potato", "BakedPotato", 50, 350000);
	storeItems.push(itemBakedPotato);
	itemBigPotato = new StoreItem("Big Potato", "BigPotato", 500, 750000);
	storeItems.push(itemBigPotato);
	itemHugePotato = new StoreItem("Huge Potato", "HugePotato", 1000, 1250000);
	storeItems.push(itemHugePotato);
	itemPotatoPlanet = new StoreItem("Potato Planet", "PotatoPlanet", 6500, 15000000);
	storeItems.push(itemPotatoPlanet);
	itemPotatoGod = new StoreItem("Potato God", "PotatoGod", 15000, 100000000);
	storeItems.push(itemPotatoGod);
	itemPotatoGalaxy = new StoreItem("Potato Galaxy", "PotatoGalaxy", 30000, 555555555);
	storeItems.push(itemPotatoGalaxy);
	itemPotatoUniverse = new StoreItem("Potato Universe", "PotatoUniverse", 100000,  1000000000)
	storeItems.push(itemPotatoUniverse)

	for (var i = 0; i < storeItems.length; i++)
	{
		if (get("Store_" + storeItems[i].buttonname + "_Price"))
		{
			storeItems[i].price = parseInt(get("Store_" + storeItems[i].buttonname + "_Price"), 10);
			storeItems[i].owned = parseInt(get("Store_" + storeItems[i].buttonname + "_Owned"), 10);
		}
	}	
}

function createAchievements()
{
	achievements = [];
	achievementSlave = new Achievement("Slave", "Harvest your first potato.", 5);
	achievements.push(achievementSlave);
	achievementPeasant = new Achievement("Peasant", "Harvest 100 potatoes.", 10);
	achievements.push(achievementPeasant);
	achievementNoobFarmer = new Achievement("Noob Farmer", "Harvest 1500 potatoes and own 1 upgrade.", 50);
	achievements.push(achievementNoobFarmer);
	achievementBeginnerFarmer = new Achievement("Beginner Farmer", "Harvest 5000 potatoes and own 10 upgrades.", 100);
	achievements.push(achievementBeginnerFarmer);
	achievementFarmer = new Achievement("Farmer", "Harvest 50000 potatoes and own 50 upgrades.", 500);
	achievements.push(achievementFarmer);
	achievementSeniorFarmer = new Achievement("Senior Farmer", "Harvest 125000 potatoes and own 100 upgrades.", 1000);
	achievements.push(achievementSeniorFarmer);

	for (var i = 0; i < achievements.length; i++)
	{
		if (get("Achievement_" + achievements[i].title + "_Unlocked") == "true") {
			unlockAchievement(achievements[i], false);
		}
	}
}

function update()
{
	getByID("potatoCount").innerHTML = addSpaces(Math.round(potatoes)) + " potatoes";
	getByID("perSecond").innerHTML = addSpaces(Math.round(perSecond)) + " per second";
	getByID("perClick").innerHTML = addSpaces(perClick.toFixed(2));
	getByID("storeTitle").innerHTML = name + "'s potato farm, level " + level + " - XP: " + xp +  " / " + nextXp;

	for (var i = 0; i < storeItems.length; i++) {
	/*{
		if (sellmode)
		{
			getByID("toggleSellmode").innerHTML = "Buy";
			getByID("buy" + storeItems[i].buttonname).innerHTML = "Sell for " + addSpaces(getSellPrice(storeItems[i]));
			getByID("buy" + storeItems[i].buttonname).disabled = storeItems[i].owned > 0 ? false : true;
		}
		else
		{
		getByID("toggleSellmode").innerHTML = "Sell";*/
		getByID("buy" + storeItems[i].buttonname).innerHTML = storeItems[i].name + ": " + addSpaces(Math.round(storeItems[i].price)) + ", +" + addSpaces(storeItems[i].persecond) + " (" + addSpaces(storeItems[i].owned) + ")";
		getByID("buy" + storeItems[i].buttonname).title = addSpaces(storeItems[i].owned) + " owned";
		getByID("buy" + storeItems[i].buttonname).disabled = potatoes < storeItems[i].price ? true : false;
		//}
	}

	if (xp >= nextXp) {
		level++;
		perClick = level;
		xp = 0;
		nextXp = nextXp * 2;
	}

	saveGame();
	saveStats();
	checkAchievements();
}

function unlockAchievement(achievement, shouldAlert) {
	if (!achievement.unlocked) {
		achievement.unlocked = true;
		var table = getByID("achievementsTable");
		var row = table.insertRow();
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);

		cell1.className = cell2.className = "achievement";

		cell1.innerHTML = achievement.title;
		cell2.innerHTML = achievement.description;

		if (shouldAlert) {
			//alert("Achievement unlocked: " + achievement.title + " - " + achievement.description + " XP + " + achievement.xp);
			xp += achievement.xp;
		}
	}
}

function checkAchievements() {
	if (totalPotatoes >= 1) {
		unlockAchievement(achievementSlave, true);
	}
	if (totalPotatoes >= 100) {
		unlockAchievement(achievementPeasant, true);
	}
	if (totalPotatoes >= 1500 && totalUpgrades >= 1) {
		unlockAchievement(achievementNoobFarmer, true);
	}
	if (totalPotatoes >= 5000 && totalUpgrades >= 10) {
		unlockAchievement(achievementBeginnerFarmer, true);
	}
	if (totalPotatoes >= 50000 && totalUpgrades >= 50) {
		unlockAchievement(achievementFarmer, true);
	}
	if (totalPotatoes >= 125000 && totalUpgrades >= 100) {
		unlockAchievement(achievementSeniorFarmer, true);
	}
}

function saveGame()
{
	for (var i = 0; i < storeItems.length; i++)
	{
		set("Store_" + storeItems[i].buttonname + "_Price", storeItems[i].price);
		set("Store_" + storeItems[i].buttonname + "_Owned", storeItems[i].owned);
	}	

	for (var i = 0; i < achievements.length; i++)
	{
		if (achievements[i].unlocked) {
			set("Achievement_" + achievements[i].title + "_Unlocked", "true");
		}
	}

	set("PerSecond", perSecond);
	set("PerClickIncrease", perClickIncrease);
}

function saveStats()
{
	set("StatGameStarted", gameStarted);
	set("StatTotalPotatoCount", totalPotatoes);
	set("StatPotatoesThisGame", potatoesThisGame);
	set("StatPotatoesSpent", potatoesSpent);
	set("StatPotatoClicks", potatoClicks);
	set("StatTotalUpgrades", totalUpgrades);

	set("Name", name);
	set("Level", level);
	set("XP", xp);
	set("NextXP", nextXp);

	getByID("statGameStarted").innerHTML = convertTime(gameStarted);
	getByID("statPotatoesThisGame").innerHTML = addSpaces(Math.round(potatoesThisGame));
	//getByID("statTotalPotatoes").innerHTML = addSpaces(Math.round(totalPotatoes));
	getByID("statPotatoesSpent").innerHTML = addSpaces(Math.round(potatoesSpent));
	getByID("statPotatoClicks").innerHTML = addSpaces(potatoClicks);
	getByID("statTotalUpgrades").innerHTML = addSpaces(Math.round(totalUpgrades));
}

function addPotato(amount)
{
	potatoes += amount;
	totalPotatoes += amount;
	potatoesThisGame += amount;

	set("PotatoCount", potatoes);
}

function clickPotato()
{
	potatoClicks += 1;
	xp += 1;
	addPotato(level);
}

function setPerSecond(amount)
{
	perSecond += amount;
	set("PerSecond", perSecond);
}