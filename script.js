
let deck = [];
let player = [];
let dealer = [];

function buildDeck() {
  const cards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  deck = [];
  for (let i = 0; i < cards.length; i++) {
    for (let j = 0; j < 4; j++) {
      deck.push(cards[i]);
    }
  }
  deck.sort(() => Math.random() - 0.5);
}

function deal() {
  buildDeck();
  player = [deck.pop(), deck.pop()];
  dealer = [deck.pop(), deck.pop()];
  update();
}

function hit() {
  player.push(deck.pop());
  update();
}

function stand() {
  document.getElementById("status").textContent = "Dealer's turn...";
  while (sum(dealer) < 17) {
    dealer.push(deck.pop());
  }
  let pSum = sum(player);
  let dSum = sum(dealer);
  let result = (pSum > 21) ? "You bust!" :
               (dSum > 21 || pSum > dSum) ? "You win!" :
               (pSum < dSum) ? "Dealer wins!" : "It's a tie!";
  document.getElementById("status").textContent = result;
  update();
}

function sum(hand) {
  let values = hand.map(card => {
    if (card === 'A') return 11;
    if (['K','Q','J'].includes(card)) return 10;
    return parseInt(card);
  });
  let total = values.reduce((a, b) => a + b, 0);
  let aces = hand.filter(card => card === 'A').length;
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
}

function update() {
  document.getElementById("player").textContent = "👤 Player: " + player.join(", ");
  document.getElementById("dealer").textContent = "🤖 Dealer: " + dealer.join(", ");
}
