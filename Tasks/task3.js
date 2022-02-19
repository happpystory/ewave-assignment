function Fighter(name, strength, agility, vitality) {
    strength = typeof strength !== "number" || strength > 30 ? 30 : strength;
    agility = typeof agility !== "number" || agility > 30 ? 30 : agility;
    vitality = typeof vitality !== "number" || vitality > 30 ? 30 : vitality;

    // Setup Damage
    this.damage = 10;
    this.damage += strength * 5;
    this.damage -= agility * 3;

    // Setup Defense
    this.defense = 10;
    this.defense += agility * 5;
    this.defense += strength * 3;
    this.defense += vitality * 1;

    // Setup HP 
    this.hp = 50;
    this.hp += vitality * 10;
    this.hp += strength * 5;
    this.hp += agility * 3;
    
    // Methods
    this.getName = () => name;
    this.getHp = () => this.hp;
    this.takeDamage = (DamagePoints) => this.hp -= DamagePoints;
    this.dealDamage = (rival) => rival.hp -= this.damage
}

  const figther1 = new Fighter('Boris', 40, 30, 30)
  const figther2 = new Fighter('Oscar', 20, 20, 20)
  

  function fight(figther1, figther2) {
   
    figther1.dealDamage(figther2)
    document.getElementById('figther1-status').innerHTML = `HP: ${figther2.getHp()}, Name: ${figther2.getName()}`
    figther2.dealDamage(figther1)
    document.getElementById('figther2-status').innerHTML = `HP: ${figther1.getHp()}, Name: ${figther1.getName()}`

    if(figther1.getHp() <= 0) {
      document.getElementById('figther1-status').innerHTML = `${figther2.getName()} is the winner!`
      return;
    }
    if(figther2.getHp() <= 0) {
      document.getElementById('figther2-status').innerHTML = `${figther1.getName()} is the winner!`
      return;
    }

  }

  //fight(figther1, figther2)