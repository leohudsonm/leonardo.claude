#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generates print-ready A4 HTML covers for Jurisprudência Esquematizada."""

import os

DISCIPLINES = [
    ('Direito Administrativo',                         [2026]),
    ('Direito Administrativo Militar',                 [2026]),
    ('Direito Ambiental',                              [2021, 2022, 2023, 2024, 2025, 2026]),
    ('Direito Civil',                                  [2026]),
    ('Direito Constitucional',                         [2026]),
    ('Direito da Criança e do Adolescente',            [2026]),
    ('Direito do Consumidor',                          [2026]),
    ('Direito do Trabalho e Processual do Trabalho',   [2026]),
    ('Direito econômico',                              [2026]),
    ('Direito Eleitoral',                              [2026]),
    ('Direito Empresarial',                            [2026]),
    ('Direito Financeiro',                             [2026]),
    ('Direito Internacional',                          [2026]),
    ('Direito Notarial e Registral',                   [2026]),
    ('Direito Penal',                                  [2026]),
    ('Direito Penal e Processual Penal Militar',       [2026]),
    ('Direito Previdenciário',                         [2026]),
    ('Direito Processual Civil',                       [2026]),
    ('Direito Processual Penal',                       [2026]),
    ('Direito Tributário',                             [2026]),
]

TEMPLATE = """\
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>___DISCIPLINA___ \xb7 ___ANO___ \xb7 Jurisprud\xeancia Esquematizada</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0;
    background: #2a2a2a;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .topbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    background: #0A1E2E; color: #EDE6D3;
    padding: 10px 20px;
    font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 1px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .topbar button {
    background: #3FA89B; color: #fff; border: none;
    padding: 7px 18px; border-radius: 2px; cursor: pointer;
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
    letter-spacing: 2px; text-transform: uppercase;
  }
  .topbar button:hover { background: #2d8a7e; }
  body { padding-top: 46px; }

  /* A4 page */
  .page {
    width: 210mm; height: 297mm;
    margin: 10mm auto;
    overflow: hidden; position: relative;
    box-shadow: 0 4px 24px rgba(0,0,0,0.45);
    break-after: page; page-break-after: always;
  }
  .page:last-child { break-after: auto; page-break-after: auto; }

  /* Scale 1240x1754 cover to fit 210mm x 297mm */
  /* 210mm @ 96dpi = 793.7px; 1240/793.7 = 1.5623 -> scale 0.6401 */
  .cover-scale {
    width: 1240px; height: 1754px;
    transform: scale(0.6401);
    transform-origin: top left;
  }

  /* ── Cover ── */
  .cover-root {
    width: 1240px; height: 1754px;
    background: #0A1E2E;
    position: relative; overflow: hidden;
  }
  .cover-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle at 1px 1px, rgba(237,230,211,0.04) 1px, transparent 0);
    background-size: 24px 24px;
  }
  .cover-border {
    position: absolute; inset: 56px;
    border: 1px solid rgba(237,230,211,0.18);
  }
  .cover-inner {
    position: absolute; inset: 96px;
    display: flex; flex-direction: column;
    font-family: 'Inter', sans-serif;
  }
  .cover-logo-row { display: flex; justify-content: center; }
  .cover-logo { height: 80px; display: block; object-fit: contain; }
  .cover-centre {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .cover-title-block { text-align: center; }
  .cover-title-line1 {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    font-size: 124px; letter-spacing: 1px; line-height: 0.92;
    color: #EDE6D3; text-transform: uppercase;
  }
  .cover-title-line2 {
    font-family: 'Oswald', sans-serif; font-weight: 300;
    font-size: 124px; letter-spacing: 1px; line-height: 0.92;
    color: #3FA89B; text-transform: uppercase; margin-top: 6px;
  }
  .cover-subtitle {
    font-family: 'JetBrains Mono', monospace; font-size: 16px;
    letter-spacing: 5px; color: #3FA89B; text-transform: uppercase;
    margin-top: 40px;
  }
  .cover-footer {
    padding-top: 28px;
    border-top: 1px solid rgba(237,230,211,0.18);
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-end;
  }
  .cover-disciplina {
    font-family: 'Oswald', sans-serif; font-weight: 600;
    color: #EDE6D3; text-transform: uppercase;
    letter-spacing: 1px; line-height: 1; text-align: center;
    /* font-size set by JS based on text length */
  }
  .cover-year {
    font-family: 'Oswald', sans-serif; font-weight: 300;
    font-size: 52px; color: #3FA89B;
    letter-spacing: 8px; line-height: 1.2; margin-top: 16px;
  }

  @page { size: A4 portrait; margin: 0; }
  @media print {
    html, body { background: #fff; padding-top: 0; }
    .topbar { display: none; }
    .page { margin: 0; box-shadow: none; width: 210mm; height: 297mm; }
  }
</style>
</head>
<body>
<div class="topbar">
  <span>___DISCIPLINA___ &middot; ___ANO___ &middot; Jurisprudência Esquematizada &middot; Revisáculo</span>
  <button onclick="document.fonts.ready.then(()=>setTimeout(()=>window.print(),250))">&#8595; Exportar PDF</button>
</div>
<div class="page">
  <div class="cover-scale">
    <div class="cover-root">
      <div class="cover-dots"></div>
      <div class="cover-border"></div>
      <div class="cover-inner">
        <div class="cover-logo-row">
          <img class="cover-logo" src="___LOGO___" alt="Revisáculo">
        </div>
        <div class="cover-centre">
          <div class="cover-title-block">
            <div class="cover-title-line1">Jurisprudência</div>
            <div class="cover-title-line2">Esquematizada</div>
            <div class="cover-subtitle">Informativos do STJ e STF</div>
          </div>
        </div>
        <div class="cover-footer">
          <div class="cover-disciplina">___DISCIPLINA___</div>
          <div class="cover-year">___ANO___</div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
(function () {
  var el = document.querySelector('.cover-disciplina');
  if (!el) return;
  var len = el.textContent.trim().length;
  var avail = 1048; /* A4_W(1240) - 2*inset(96) */
  var factor = 0.47; /* Oswald condensed char-width at 1px */
  var fs = Math.min(82, Math.max(32, Math.floor(avail / (len * factor))));
  el.style.fontSize = fs + 'px';
}());
</script>
</body>
</html>
"""

BASE = '/home/claude/repo/capas'
count = 0

for disciplina, anos in DISCIPLINES:
    folder = os.path.join(BASE, disciplina)
    os.makedirs(folder, exist_ok=True)
    for ano in anos:
        logo_path = '../../project/assets/logo-horizontal.png'
        content = (TEMPLATE
                   .replace('___DISCIPLINA___', disciplina)
                   .replace('___ANO___', str(ano))
                   .replace('___LOGO___', logo_path))
        filepath = os.path.join(folder, f'{ano}.html')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f'  OK  {disciplina}/{ano}.html')

print(f'\n✓ {count} capas geradas em {BASE}/')
