let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["tongkat kayu"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button = document.querySelector("button");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterLevelText = document.querySelector("#monsterLevel");
const audio3 = document.getElementById("soundTiga")
const audio2 = document.getElementById("sound2")
const weapons = [
  { name: 'tongkat kayu', power: 10 },
  { name: 'pisau kecil', power: 25  },
  { name: 'palu', power: 85 },
  { name: 'pedang kematian', power: 125 },
  { name: 'tombak yesus', power: 130}
];
const monsters = [
  {
    name: "Slime",
    level: 5,
    health: 50
  },
  {
    name: "Orc",
    level: 35,
    health: 100
  },
  {
    name: "Naga",
    level: 100,
    health: 1000
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Pergi ke toko", "Pergi ke dungeon", "Kalahkan naga!"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Kamu berada di alun-alun kota. Kamu melihat palang bertuliskan \"Toko Dwarf\"."
  },
  {
    name: "store",
    "button text": ["10 darah (10 koin emas)", "senjata (30 koin emas)", "Kembali"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Kamu masuk ke dalam toko, kemudian melihat ada seorang dari ras Dwarf yang sedang menjaga toko berbicara kepada mu. \"Hai petualang, silahkan membeli barang yang saya milki\""
  },
  {
    name: "cave",
    "button text": ["Serang slime", "Serang orc", "Kembali"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Kamu memasuki dungeon, terlihat beberapa monster."
  },
  {
    name: "fight",
    "button text": ["Serang", "Menghindar", "Kabur"],
    "button functions": [attack, dodge, goCave],
  },
  {
    name: "kill monster",
    "button text": ["Kembali", "Kembali", "Kembali"],
    "button functions": [goCave, goCave, easterEgg],
    text: 'Mahluk itu berteriak "Argggh!" ketika mati. Level mu bertambah dan menemukan sejumlah koin emas.'
  },
  {
    name: "lose",
    "button text": ["ULANG?", "ULANG?", "ULANG?"],
    "button functions": [restart, restart, restart],
    text: "Kamu mati. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["ULANG?", "ULANG?", "ULANG?"], 
    "button functions": [restart, restart, restart], 
    text: "Kamu baru saja mengalahkan naga! KAMU MENYELESAIKAN GAME INI! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Kembali?"],
    "button functions": [pickTwo, pickEight, goCave],
    text: "Kamu baru saja menemukan permainan rahasia. Pilih salah satu angka di atas. 10 angka akan di pilih secara acak dari 0 sampai dengan 10. Jika pilihan mu tepat dengan angka acak yang di pilih, kamu menang! begitu pun sebalik nya"
  }
];

// initialize buttons
button1.onclick = goStore, sound1();
button2.onclick = goCave;
button3.onclick = fightDragon;

function sound4() {
  const audio4 = document.getElementById("sound4");
  audio4.play();
}

function sound3() {
  if (!audio2.paused) {
    audio2.pause();
  audio2.currentTime = 0;
  audio3.play();
  } else if (audio3.play()){
  }
}

function sound2() {
  if (!audio3.paused) {
    audio3.pause();
    audio2.play();
  } else {
    audio2.play();
  }
}

function sound1() {
  const audio1 = document.getElementById("sound1");
  audio1.play();
}

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
  background("picture/alunkota2.jpeg");
  sound1();
  sound3();
}

function goStore() {
  update(locations[1]);
  background("picture/store.jpg");
  sound3();
  sound1();
}

function goCave() {
  update(locations[2]);
  background("picture/dungeon1.jpeg");
  sound1();
  sound2();
}

function setTime(text) {
  setTimeout (() => {
    text.style.color = '';
  }, 1000);
  }

function colorNotEnough() {
  goldText.style.color = 'maroon';
  goldText.style.borderBottom = '1.5px solid';
  setTimeout (() => {
    goldText.style.color = ''
    goldText.style.borderBottom = '';
  }, 1000);
}

function colorGold() {
  goldText.style.color = 'gold';
  setTime(goldText);
}

function colorLevel() {
  xpText.style.color = '#4682b4';
  setTime(xpText);
}

function colorHealth() {
  healthText.style.color = '#ff0000';
  setTime(healthText);
}

function colorDamageMonsters() {
  monsterHealthText.style.color = '#555555';
  setTime(monsterHealthText);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    colorHealth();
    colorGold();
    
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Koin emas mu tidak cukup untuk membeli!";
    colorNotEnough();
    sound4();
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      colorGold();
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = `Sekarang kamu mempunyai senjata baru! yaitu ${newWeapon}.`;
      inventory.push(newWeapon);
      text.innerText += " Isi tas mu sekarang adalah : " + inventory;
      sound1()
    } else {
      colorNotEnough();
      sound4()
      text.innerText = "Kamu tidak memiliki cukup cukup koin emas untuk membeli senjata.";
    }
  } else {
    text.innerText = "Kamu sudah memiliki senjata paling kuat!";
    button2.innerText = "Jual senjata (15 koin)";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Kamu baru saja menjual " + currentWeapon + ".";
    text.innerText += " Tas mu sekarang memiliki: " + inventory;
    colorGold();
    sound1();
  } else {
    text.innerText = "Kamu tidak bisa menjual satu-satu nya senjata milikmu!";
    sound4();
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
  sound1();
  text.innerText = 'mahluk hijau kecil berlendir dengan tampilan menggemaskan, awas! itu zat asam!'
}

function fightBeast() {
  fighting = 1;
  goFight();
  sound1();
  text.innerText = 'Orc besar berwarna hijau dengan memegang pentungan besar berduri. Terlihat sedang mencari makan'
}

function fightDragon() {
  fighting = 2;
  goFight();
  sound1();
  sound2();
  button3.onclick = goTown;
  background("picture/dragoncave.png");
  text.innerText = 'Terlihat dari kegelapan sosok gelap besar, dengan tatapan mata yang tajam sedang melihatmu!!'
}

function goFight() { 
    update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterLevelText.innerText = monsters[fighting].level;
  }


function attack() {
  text.innerText = monsters[fighting].name + " menyerang mu!";
  text.innerText += " Kamu menyerang mahluk itu dengan " + weapons[currentWeapon].name + "";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    colorDamageMonsters();
  } else {
    text.innerText += ", namun serangan mu meleset!.";
  }
  colorHealth();
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  sound1();
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
      colorLevel();
      colorGold();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Senjata " + inventory.pop() + " mu baru saja hancur!.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 3) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  health -= getMonsterAttackValue(monsters[fighting].level);
  healthText.innerText = health;
  text.innerText = "Naikan level mu untuk untuk mengurangi serangan monster!!";
  colorHealth()
  sound1()
  if (health <= 0) {
    lose();
  }
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 3);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["tongkat kayu"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
  sound1();
}

//easter egg bang
function easterEgg() {
  update(locations[7]);
  sound1()
}

function pickTwo() {
  pick(2);
  sound1();
}

function pickEight() {
  pick(8);
  sound1();
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Kamu memilih angka " + guess + ". Berikut angka acak yang di berikan:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += `${numbers[i]} \n`;
  }
  if (numbers.includes(guess)) {
    text.innerText += "Benar! Kamu memenangkan 20 koin emas!";
    gold += 20;
    goldText.innerText = gold;
    colorGold();
  } else {
    text.innerText += "salah! Kamu kehilangan 10 darah!";
    health -= 10;
    healthText.innerText = health;
    colorHealth();
    if (health <= 0) {
      lose();
    }
  }
}

// image
function background(imageUrl) {
    var body = document.body;
    body.style.backgroundImage = `url('${imageUrl}')`
}