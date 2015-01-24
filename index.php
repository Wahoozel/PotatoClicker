<!doctype HTML>
<html>
<head>
	<title>Potato Clicker</title>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
	<script src="js/helper.js"></script>
	<script src="js/game.js"></script>

	<link href="style/main.css" rel="stylesheet" type="text/css">
	<link href='http://fonts.googleapis.com/css?family=Oswald:400,300' rel='stylesheet' type='text/css'>
	<link href="style/ui.css" rel="stylesheet" type="text/css">

	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
	<link rel="icon" href="/favicon.ico" type="image/x-icon">

	<meta charset="utf-8" />
	<meta name="description" content="A game where you click a potato." />
</head>
<body onload="init();">

<div id="game">

	<div id="areaLeft">
		<div id="stats">
			<h1>Stuff</h1>

			<div id="tabs">
				<ul>
					<li><a href="#options">Options</a></li>
					<li><a href="#stats">Stats</a></li>
					<li><a href="#achievements">Achievements</a></li>
					<li><a href="#updates">Updates</a></li>
				</ul>
				<div id="options">
					<button class="optionButton" onclick="clearSave();" style="color: red;">Delete Save</button><br>
					<button class="optionButton" onclick="getName();">Change Name</button><br>
				</div>
				<div id="stats">
					<table id="statsTable">
						<tr>
							<td class="statistic">Game Started</td>
							<td class="statistic" id="statGameStarted"></td>
						</tr>
						<tr>
							<td class="statistic">Total Potatoes</td>
							<td class="statistic" id="statPotatoesThisGame"></td>
						</tr>
						<tr>
							<td class="statistic">Potato Clicks</td>
							<td class="statistic" id="statPotatoClicks"></td>
						</tr>
						<tr>
							<td class="statistic">Potatoes Spent</td>
							<td class="statistic" id="statPotatoesSpent"></td>
						</tr>
						<tr>
							<td class="statistic">Total Items</td>
							<td class="statistic" id="statTotalUpgrades"></td>
						</tr>
						<tr>
							<td class="statistic">Per Click</td>
							<td class="statistic" id="perClick"></td>
						</tr>
					</table>
				</div>
				<div id="achievements">
					<table id="achievementsTable"></table>
				</div>
				<div id="updates">
					<div id="updates">
						<h1>Version 1.3 (2015-01-24)</h1>
						<p>- Tweaked upgrades</p><br />
						<h1>Version 1.2 (2015-01-12)</h1>
						<p>- Added achievements</p><br />
						<h1>Version 1.1 (2015-01-11)</h1>
						<p>- Added XP and levels</p><br />
						<h1>Version 1.0 (2014-12-07)</h1>
						<p>- Game released</p><br />
					</div>
				</div>
			</div>

			<p style="position: absolute; bottom: 12px; left: 5px;">Version 1.3</p>
			<div id="social">
				<a href="https://twitter.com/PotatoClicker" class="twitter-follow-button" data-show-count="false">Follow @PotatoClicker</a>
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
				<a href="//www.reddit.com/submit" onclick="window.open('//www.reddit.com/submit?url=' + encodeURIComponent(window.location), '_blank'); return false"> <img src="//www.redditstatic.com/spreddit7.gif" alt="submit to reddit" border="0" style="margin-bottom: 2px;" /> </a>
			</div>
		</div>
	</div>

	<div id="areaMiddle">
			<div id="potato">
				<div id="potatoText">
					<h1 id="potatoCount"></h1>
					<h2 id="perSecond" style="margin-bottom: 5px;"></h2>
				</div>
				<div id="potatoCointainer">
					<div id="potatoWraper">
						<img id="potatoImg" src="data/png/potato.png" draggable="false" class="noselect"
						alt="The Potato" width="300" height="400" onclick="clickPotato();"/>
					</div>
				</div>
		</div>
	</div>

	<div id="areaRight">
		<div id="store">
			<h1>Store</h1>
			<p id="storeTitle"></p>
			<p id="xp"></p> 
			<!--<button class="shopHeaderButton" id="toggleSellmode" onclick="sellmode =! sellmode;">Sell</button>
			<button class="shopHeaderButton" id="sellAll" onclick="sellAll();">Sell all</button>-->
			<table id="storeTable">
				<tr>
					<td class="storeImage"><img class="storeImage" src="data/png/MashedPotatoes.png" /></td>
					<td class="storeBuy"><button class="storeButton" id="buyMashedPotatoes" onclick="sellmode ? sell(itemMashedPotatoes) : buy(itemMashedPotatoes)"></button></td>
				</tr>
				<tr>
					<td class="storeImage"><img class="storeImage" src="data/png/PotatoSalad.png" /></td>
					<td class="storeBuy"><button class="storeButton" id="buyPotatoSalad" onclick="sellmode ? sell(itemPotatoSalad) : buy(itemPotatoSalad)"></button></td>
				</tr>
				<tr>
					<td class="storeImage"><img class="storeImage" src="data/png/Chips.png" /></td>
					<td class="storeBuy"><button class="storeButton" id="buyChips" onclick="sellmode ? sell(itemChips) : buy(itemChips)"></button></td>
				</tr>
				<tr>
					<td class="storeImage"><img class="storeImage" src="data/png/Fries.png" /></td>
					<td class="storeBuy"><button class="storeButton" id="buyFries" onclick="sellmode ? sell(itemFries) : buy(itemFries)"></button></td>
				</tr>
				<tr>
					<td class="storeImage"><img class="storeImage" src="data/png/BakedPotato.png" /></td>
					<td class="storeBuy"><button class="storeButton" id="buyBakedPotato" onclick="sellmode ? sell(itemBakedPotato) : buy(itemBakedPotato)"></button></td>
				</tr>
				<tr>
					<td class="storeImage"><img class="storeImage" src="data/png/BigPotato.png" /></td>
					<td class="storeBuy"><button class="storeButton" id="buyBigPotato" onclick="sellmode ? sell(itemBigPotato) : buy(itemBigPotato)"></button></td>
				</tr>
				<tr>
					<td class="storeImage"><img class="storeImage" src="data/png/HugePotato.png" /></td>
					<td class="storeBuy"><button class="storeButton" id="buyHugePotato" onclick="sellmode ? sell(itemHugePotato) : buy(itemHugePotato)"></button></td>
				</tr>
				<tr>
					<td class="storeImage"><img class="storeImage" src="data/png/PotatoPlanet.png" /></td>
					<td class="storeBuy"><button class="storeButton" id="buyPotatoPlanet" onclick="sellmode ? sell(itemPotatoPlanet) : buy(itemPotatoPlanet)"></button></td>
				</tr>
				<tr>
					<td class="storeImage"><img class="storeImage" src="data/png/PotatoGod.png" /></td>
					<td class="storeBuy"><button class="storeButton" id="buyPotatoGod" onclick="sellmode ? sell(itemPotatoGod) : buy(itemPotatoGod)"></button></td>
				</tr>
				<tr>
					<td class="storeImage"><img class="storeImage" src="data/png/PotatoGalaxy.png" /></td>
					<td class="storeBuy"><button class="storeButton" id="buyPotatoGalaxy" onclick="sellmode ? sell(itemPotatoGalaxy) : buy(itemPotatoGalaxy)"></button></td>
				</tr>
				<tr>
					<td class="storeImage"><img class="storeImage" src="data/png/PotatoUniverse.png" /></td>
					<td class="storeBuy"><button class="storeButton" id="buyPotatoUniverse" onclick="sellmode ? sell(itemPotatoUniverse) : buy(itemPotatoUniverse)"></button></td>
				</tr>
			</table>
		</div>
	</div>
</div>

<script>

$(document).ready(function()
{
	$("#tabs").tabs({ active: 2 });

	$("#potatoImg").mousedown(function() {
		$(this).stop().animate({
			width: "280",
			height: "380"
		}, 75);
	});

	$("#potatoImg").mouseup(function() {
		$(this).animate({
			width: "300",
			height: "400"
		}, 75);
	});
});

</script>

</body>
</html>