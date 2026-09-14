let x;
let y;
let tamanho;
let cor;

let pontos = 0;
let recorde = 0;

let forma = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  novaForma();
}

function draw() {
  background(255);

  // Desenha a forma
  fill(cor);
  desenharForma();

  // Mostra a pontuação e o recorde
  fill(100);
  textSize(18);

  text("Pontos: " + pontos, 20, 30);
  text("Recorde: " + recorde, 130, 30);
}


// CRIA UMA NOVA FORMA
function novaForma() {

  tamanho = random(60, 140);

  x = random(tamanho, width - tamanho);
  y = random(tamanho, height - tamanho);

  // A cada acerto, a cor fica mais próxima do branco
  let intensidade = min(253, 230 + pontos * 2);

  cor = color(intensidade);

  // Cria os pontos da forma
  forma = [];

  let quantidadePontos = 12;

  for (let i = 0; i < quantidadePontos; i++) {

    let angulo = map(
      i,
      0,
      quantidadePontos,
      0,
      TWO_PI
    );

    let raio = tamanho * random(0.7, 1.2);

    forma.push({
      angulo: angulo,
      raio: raio
    });
  }
}


// DESENHA A FORMA
function desenharForma() {

  beginShape();

  for (let ponto of forma) {

    let px = x + cos(ponto.angulo) * ponto.raio;
    let py = y + sin(ponto.angulo) * ponto.raio;

    vertex(px, py);
  }

  endShape(CLOSE);
}


// QUANDO O JOGADOR CLICA
function mousePressed() {

  let distancia = dist(
    mouseX,
    mouseY,
    x,
    y
  );

  // ACERTO
  if (distancia < tamanho) {

    pontos++;

    // Atualiza o recorde
    if (pontos > recorde) {
      recorde = pontos;
    }

    novaForma();
  }

  // ERRO
  else {

    pontos = 0;

    novaForma();
  }
}


// AJUSTA A TELA
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

  novaForma();
}
