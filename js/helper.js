/******************************
PotatoClicker helper functions
******************************/

//Objects
function StoreItem(name, buttonname, persecond, price)
{
	this.name = name;
	this.persecond = persecond;
	this.buttonname = buttonname;
	this.price = price;
	this.originalprice = price;
	this.owned = 0;
}

function Achievement(title, description, xp)
{
	this.title = title;
	this.description = description;
	this.xp = xp;
	this.unlocked = false;
}

//Store

function buy(item)
{
	if(potatoes < item.price)
		return;

	potatoes -= item.price;
	potatoesSpent += item.price;
	perSecond += item.persecond;
	item.owned += 1;
	item.price = Math.ceil(item.originalprice * Math.pow(1.25, item.owned));
	totalUpgrades += 1;
}

function sell(item)
{
	if (item.owned <= 0)
		return;

	potatoes += getSellPrice(item);
	perSecond -= item.persecond;
	item.owned -= 1;
	item.price = Math.ceil(item.originalprice / Math.pow(1.25, item.owned));
	totalUpgrades -= 1;
}

function getSellPrice(item)
{
	return item.price / 2;
}

function sellAll()
{
	var response = confirm("Sell everything?");

	if (response)
	{
		for (var i = 0; i < storeItems.length; i++)
		{
			while (storeItems[i].owned >= 1)
			{
				sell(storeItems[i]);
			}
		}	
	}
}

//Local Storage

function supportsLocalStorage()
{
	try
	{
		return 'localStorage' in window && window['localStorage'] !== null;
	}
	catch (e) 
	{
		return false;
	}
}

function set(key, value)
{
	localStorage.setItem("PotatoClicker_" + key, value);
}

function get(key)
{
	return localStorage.getItem("PotatoClicker_" + key);
}

function clearSave()
{
	var response = confirm("Do you really want to start over?");
	var oldPotatoes = potatoes;
	var oldPerClick = perClick;
	var newPerClick;

	if (response)
	{
		potatoes = 0;
		potatoesThisGame = 0;
		potatoClicks = 0;
		potatoesSpent = 0;
		perClickIncrease = 1;
		perSecond = 0;

		for (var i = 0; i < storeItems.length; i++)
		{
			storeItems[i].price = storeItems[i].originalprice;
			storeItems[i].owned = 0;
		}

		var response2 = confirm("Remove statistics and achievements?");

		if (response2)
		{
			for (var i = 0; i < achievements.length; i++)
			{
				set("Achievement_" + achievements[i].title + "_Unlocked", "false");
			}
			totalPotatoes = 0;
			totalUpgrades = 0;
			gameStarted = new Date().getTime();
			level = 1;
			xp = 0;
			nextXp = 64;
			getName();
			saveStats();
		}
	}
}

//Misc

//Gets an HTML element by ID
function getByID(id)
{
	return document.getElementById(id);
}

//Add spaces to number
function addSpaces(x)
{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

//Takes a js timestamp and converts it to a more readable form
function convertTime(ts)
{
  var a = new Date(ts);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

function importSave() {

}

function exportSave() {
	for (var i = 0; i < localStorage.length; i++){
    	//console.log(localStorage.getItem(localStorage.getItem(i)) + ": " + localStorage.getItem(localStorage.key(i)));
	}
}