
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

  // Recupera o recorde salvo no navegador
  recorde = Number(localStorage.getItem("recordeJogo")) || 0;

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

  // Evita que a forma ultrapasse os limites da tela
  let margemX = min(tamanho, width / 2);
  let margemY = min(tamanho, height / 2);

  x = random(margemX, width - margemX);
  y = random(margemY, height - margemY);

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
  // Solicita tela cheia no primeiro clique,
  // se o navegador ainda não estiver nesse modo.
  if (!fullscreen()) {
    fullscreen(true);
    return false;
  }

  let distancia = dist(
    mouseX,
    mouseY,
    x,
    y
  );

  // ACERTO
  if (distancia < tamanho) {
    pontos++;

    // Atualiza e salva o recorde
    if (pontos > recorde) {
      recorde = pontos;

      localStorage.setItem(
        "recordeJogo",
        String(recorde)
      );
    }

    novaForma();
  }

  // ERRO
  else {
    pontos = 0;
    novaForma();
  }

  return false;
}

// AJUSTA A TELA
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  novaForma();
}
