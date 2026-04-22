// Capas A4 — Jurisprudência Esquematizada — Revisáculo
// Sistema serial: disciplina × ano.
// Usa logo horizontal (assets/logo-horizontal.png) como única marca — sem repetir "Revisáculo" em texto.
// Formato: 1240 x 1754 (A4 vertical @ 150dpi)

const BRAND = {
  navy: '#0A1E2E',
  navyDeep: '#06141F',
  navyMid: '#0F2A3E',
  cream: '#EDE6D3',
  creamDim: '#C9C2B0',
  teal: '#3FA89B',
  tealDeep: '#1B5A6E',
  rule: 'rgba(237, 230, 211, 0.18)',
  ruleOnCream: 'rgba(10, 30, 46, 0.15)',
};

const A4_W = 1240;
const A4_H = 1754;
const LOGO_ASPECT = 798 / 471; // 1.694

const DEFAULT_DISCIPLINA = 'Direito Constitucional';
const DEFAULT_ANO = '2025';

// Logo horizontal — aspect preservado. Passa só height, width é derivado.
function Logo({ height = 64, src = 'assets/logo-horizontal.png' }) {
  return (
    <img
      src={src}
      alt="Revisáculo"
      style={{
        height, width: height * LOGO_ASPECT,
        display: 'block', objectFit: 'contain',
      }}
    />
  );
}

// ═════════════════════════════════════════════════════════════
// V1 — CLÁSSICA SÓBRIA
// ═════════════════════════════════════════════════════════════
function CoverClassica({ disciplina = DEFAULT_DISCIPLINA, ano = DEFAULT_ANO }) {
  return (
    <div style={{
      width: A4_W, height: A4_H, background: BRAND.navy,
      position: 'relative', overflow: 'hidden',
      fontFamily: '"Inter", sans-serif', color: BRAND.cream,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(237,230,211,0.04) 1px, transparent 0)`,
        backgroundSize: '24px 24px',
      }} />
      <div style={{ position: 'absolute', inset: 56, border: `1px solid ${BRAND.rule}` }} />

      <div style={{
        position: 'absolute', inset: 96,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Topo só com logo */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Logo height={80} />
        </div>

        {/* Centro: título */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: '"Oswald", sans-serif', fontWeight: 700,
              fontSize: 124, letterSpacing: 1, lineHeight: 0.92,
              color: BRAND.cream, textTransform: 'uppercase',
            }}>
              Jurisprudência
            </div>
            <div style={{
              fontFamily: '"Oswald", sans-serif', fontWeight: 300,
              fontSize: 124, letterSpacing: 1, lineHeight: 0.92,
              color: BRAND.teal, textTransform: 'uppercase', marginTop: 6,
            }}>
              Esquematizada
            </div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 16,
              letterSpacing: 5, color: BRAND.teal, textTransform: 'uppercase',
              marginTop: 40,
            }}>
              Informativos do STJ e STF
            </div>
          </div>
        </div>

        {/* Rodapé: disciplina centralizada */}
        <div style={{
          paddingTop: 28, borderTop: `1px solid ${BRAND.rule}`,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        }}>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 600,
            fontSize: 82, color: BRAND.cream, textTransform: 'uppercase',
            letterSpacing: 1, lineHeight: 1, textAlign: 'center',
          }}>
            {disciplina}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V2 — ANO COMO MARCA + PRÉVIA DO MÉTODO
// ═════════════════════════════════════════════════════════════
function CoverEsquema({ disciplina = DEFAULT_DISCIPLINA, ano = DEFAULT_ANO }) {
  return (
    <div style={{
      width: A4_W, height: A4_H, background: BRAND.navy,
      position: 'relative', overflow: 'hidden',
      fontFamily: '"Inter", sans-serif', color: BRAND.cream,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(${BRAND.rule} 1px, transparent 1px),
          linear-gradient(90deg, ${BRAND.rule} 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        opacity: 0.3,
      }} />

      {/* Ano gigante em outline ao fundo */}
      <div style={{
        position: 'absolute', top: 40, right: 40,
        fontFamily: '"Oswald", sans-serif', fontWeight: 700,
        fontSize: 320, lineHeight: 0.8,
        color: 'transparent', WebkitTextStroke: `1.5px ${BRAND.teal}`,
        opacity: 0.45, letterSpacing: -4,
      }}>
        {ano}
      </div>

      <div style={{
        position: 'absolute', inset: 80,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Logo height={56} />
        </div>

        <div style={{ marginTop: 96 }}>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 600,
            fontSize: 64, letterSpacing: 1, color: BRAND.teal,
            textTransform: 'uppercase', marginBottom: 22, lineHeight: 1,
          }}>
            {disciplina}
          </div>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 700,
            fontSize: 118, letterSpacing: 0, lineHeight: 0.88,
            color: BRAND.cream, textTransform: 'uppercase',
          }}>
            Jurispru—<br/>dência
          </div>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 300,
            fontSize: 118, letterSpacing: 0, lineHeight: 0.88,
            textTransform: 'uppercase', marginTop: 4,
            WebkitTextStroke: `1.5px ${BRAND.teal}`, color: 'transparent',
          }}>
            Esquematizada
          </div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
            letterSpacing: 5, color: BRAND.teal, textTransform: 'uppercase',
            marginTop: 28,
          }}>
            — Informativos do STJ e STF
          </div>
        </div>

        <div style={{
          marginTop: 'auto',
          background: BRAND.navyMid, border: `1px solid ${BRAND.rule}`,
          padding: '26px 30px',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 18,
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            letterSpacing: 3, color: BRAND.creamDim, textTransform: 'uppercase',
          }}>
            <span>Prévia do método</span>
            <span>STF · STJ · Teses de {ano}</span>
          </div>
          <svg viewBox="0 0 1080 200" width="100%" height="200" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="v2-e" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={BRAND.teal} stopOpacity="0.9" />
                <stop offset="100%" stopColor={BRAND.tealDeep} stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <g>
              <rect x="20" y="75" width="160" height="50" fill={BRAND.teal} rx="2" />
              <text x="100" y="105" fill={BRAND.navy} fontSize="15" fontWeight="700"
                    fontFamily='"Oswald", sans-serif' textAnchor="middle" letterSpacing="1">
                ACÓRDÃO
              </text>
            </g>
            <path d="M 180 100 C 260 100, 260 30,  340 30"  stroke="url(#v2-e)" strokeWidth="1.5" fill="none" />
            <path d="M 180 100 C 260 100, 260 100, 340 100" stroke="url(#v2-e)" strokeWidth="1.5" fill="none" />
            <path d="M 180 100 C 260 100, 260 170, 340 170" stroke="url(#v2-e)" strokeWidth="1.5" fill="none" />
            {[
              { x: 340, y: 10,  label: 'TESE' },
              { x: 340, y: 80,  label: 'RATIO DECIDENDI' },
              { x: 340, y: 150, label: 'DISPOSITIVO' },
            ].map((n, i) => (
              <g key={i}>
                <rect x={n.x} y={n.y} width="220" height="40"
                      fill="none" stroke={BRAND.cream} strokeOpacity="0.4" rx="2" />
                <text x={n.x + 16} y={n.y + 26} fill={BRAND.cream} fontSize="13" fontWeight="600"
                      fontFamily='"JetBrains Mono", monospace' letterSpacing="1.5">
                  {n.label}
                </text>
              </g>
            ))}
            <path d="M 560 30  L 720 30"  stroke="url(#v2-e)" strokeWidth="1" fill="none" />
            <path d="M 560 100 L 720 100" stroke="url(#v2-e)" strokeWidth="1" fill="none" />
            <path d="M 560 170 L 720 170" stroke="url(#v2-e)" strokeWidth="1" fill="none" />
            {[
              { y: 12,  label: '# fundamento' },
              { y: 82,  label: '# precedentes citados' },
              { y: 152, label: '# modulação de efeitos' },
            ].map((l, i) => (
              <g key={i}>
                <circle cx={728} cy={l.y + 18} r="3" fill={BRAND.teal} />
                <text x={742} y={l.y + 23} fill={BRAND.creamDim} fontSize="12"
                      fontFamily='"JetBrains Mono", monospace' letterSpacing="1">
                  {l.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V3 — CADERNO ANUAL (ano-número gigante + disciplina)
// ═════════════════════════════════════════════════════════════
function CoverTipo({ disciplina = DEFAULT_DISCIPLINA, ano = DEFAULT_ANO }) {
  return (
    <div style={{
      width: A4_W, height: A4_H, background: BRAND.navy,
      position: 'relative', overflow: 'hidden',
      fontFamily: '"Inter", sans-serif', color: BRAND.cream,
    }}>
      <div style={{
        position: 'absolute', top: 420, left: '50%',
        transform: 'translateX(-50%)',
      }}>
        <svg viewBox="0 0 400 200" width={1100} height={550}>
          <path
            d="M 110 100
               C 110 50, 180 50, 200 100
               C 220 150, 290 150, 290 100
               C 290 50, 220 50, 200 100
               C 180 150, 110 150, 110 100 Z"
            fill="none"
            stroke={BRAND.teal}
            strokeWidth="0.8"
            opacity="0.55"
          />
        </svg>
      </div>

      <div style={{
        position: 'absolute', inset: 80,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          paddingBottom: 22, borderBottom: `1px solid ${BRAND.rule}`,
          display: 'flex', justifyContent: 'flex-start',
        }}>
          <Logo height={56} />
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 700,
            fontSize: 240, lineHeight: 0.78, color: BRAND.teal,
            letterSpacing: -4,
          }}>
            {ano}
          </div>
          <div style={{ paddingTop: 18 }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
              letterSpacing: 4, color: BRAND.creamDim, textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              Disciplina
            </div>
            <div style={{
              fontFamily: '"Oswald", sans-serif', fontWeight: 600,
              fontSize: 72, color: BRAND.cream, textTransform: 'uppercase',
              letterSpacing: 0.5, lineHeight: 1.05, maxWidth: 520,
            }}>
              {disciplina}
            </div>
            <div style={{ width: 40, height: 1, background: BRAND.teal, marginTop: 18 }} />
          </div>
        </div>

        <div style={{
          marginTop: 'auto', position: 'relative', zIndex: 2,
        }}>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 700,
            fontSize: 178, lineHeight: 0.82, letterSpacing: -1,
            color: BRAND.cream, textTransform: 'uppercase', marginLeft: -6,
          }}>
            Jurispru
          </div>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 700,
            fontSize: 178, lineHeight: 0.82, letterSpacing: -1,
            color: BRAND.cream, textTransform: 'uppercase', marginLeft: -6,
          }}>
            dência
          </div>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 300,
            fontSize: 132, lineHeight: 0.82, letterSpacing: -1,
            textTransform: 'uppercase', marginLeft: -6,
            WebkitTextStroke: `1.8px ${BRAND.teal}`, color: 'transparent',
          }}>
            Esquematizada
          </div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
            letterSpacing: 5, color: BRAND.teal, textTransform: 'uppercase',
            marginTop: 32,
          }}>
            Informativos do STJ e STF
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V4 — CARDS DE RESUMO
// ═════════════════════════════════════════════════════════════
function CoverCards({ disciplina = DEFAULT_DISCIPLINA, ano = DEFAULT_ANO }) {
  const cards = [
    { tag: `STF · ${ano}`,  titulo: 'Modulação temporal',      status: 'Repercussão geral' },
    { tag: `STJ · ${ano}`,  titulo: 'Distinguishing aplicado', status: 'Súmula ampliada' },
    { tag: `STF · ${ano}`,  titulo: 'Declaração incidental',   status: 'Pleno' },
  ];
  return (
    <div style={{
      width: A4_W, height: A4_H, background: BRAND.navy,
      position: 'relative', overflow: 'hidden',
      fontFamily: '"Inter", sans-serif', color: BRAND.cream,
    }}>
      <div style={{
        position: 'absolute', inset: 80,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo height={56} />
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 700,
            fontSize: 42, color: BRAND.teal, letterSpacing: 2,
            border: `1px solid ${BRAND.teal}`, padding: '8px 22px',
          }}>
            {ano}
          </div>
        </div>

        <div style={{ marginTop: 64 }}>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 600,
            fontSize: 64, letterSpacing: 1, color: BRAND.teal,
            textTransform: 'uppercase', marginBottom: 22, lineHeight: 1,
          }}>
            {disciplina}
          </div>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 700,
            fontSize: 110, letterSpacing: 0, lineHeight: 0.92,
            color: BRAND.cream, textTransform: 'uppercase',
          }}>
            Jurisprudência
          </div>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 300,
            fontSize: 110, letterSpacing: 0, lineHeight: 0.92,
            textTransform: 'uppercase', color: BRAND.teal, marginTop: 4,
          }}>
            Esquematizada
          </div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
            letterSpacing: 5, color: BRAND.teal, textTransform: 'uppercase',
            marginTop: 28,
          }}>
            — Informativos do STJ e STF
          </div>
        </div>

        <div style={{
          marginTop: 'auto',
          display: 'flex', gap: 16,
        }}>
          {cards.map((c, i) => (
            <div key={i} style={{
              flex: 1, background: BRAND.navyMid,
              border: `1px solid ${BRAND.rule}`,
              padding: '20px 22px',
              transform: i === 1 ? 'translateY(-16px)' : 'none',
              borderTop: `3px solid ${i === 1 ? BRAND.teal : BRAND.rule}`,
            }}>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                letterSpacing: 2, color: BRAND.teal, textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                {c.tag}
              </div>
              <div style={{
                fontFamily: '"Oswald", sans-serif', fontWeight: 600,
                fontSize: 22, color: BRAND.cream, letterSpacing: 0.5,
                lineHeight: 1.15, textTransform: 'uppercase', marginBottom: 18,
              }}>
                {c.titulo}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[100, 78, 92, 60].map((w, j) => (
                  <div key={j} style={{
                    height: 4, width: `${w}%`,
                    background: j === 0 ? BRAND.cream : BRAND.creamDim,
                    opacity: j === 0 ? 0.9 : 0.35,
                  }} />
                ))}
              </div>
              <div style={{
                marginTop: 18, paddingTop: 14,
                borderTop: `1px dashed ${BRAND.rule}`,
                fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                letterSpacing: 2, color: BRAND.creamDim, textTransform: 'uppercase',
              }}>
                {c.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// V5 — COLEÇÃO ANUAL (capa creme)
// ═════════════════════════════════════════════════════════════
function CoverCreme({ disciplina = DEFAULT_DISCIPLINA, ano = DEFAULT_ANO }) {
  return (
    <div style={{
      width: A4_W, height: A4_H, background: BRAND.cream,
      position: 'relative', overflow: 'hidden',
      fontFamily: '"Inter", sans-serif', color: BRAND.navy,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 620,
        background: BRAND.navy, padding: '80px 80px 40px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Logo height={64} />
        </div>

        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: '"Oswald", sans-serif', fontWeight: 700,
            fontSize: 220, color: BRAND.cream, lineHeight: 0.82,
            letterSpacing: -6,
          }}>
            {ano}
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', top: 620, left: 0, right: 0, height: 8,
        background: BRAND.teal,
      }} />

      <div style={{
        position: 'absolute', top: 680, left: 80, right: 80, bottom: 80,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          fontFamily: '"Oswald", sans-serif', fontWeight: 600,
          fontSize: 64, letterSpacing: 1, color: BRAND.tealDeep,
          textTransform: 'uppercase', marginBottom: 16, lineHeight: 1,
        }}>
          {disciplina}
        </div>

        <div style={{
          fontFamily: '"Oswald", sans-serif', fontWeight: 700,
          fontSize: 122, letterSpacing: 0, lineHeight: 0.9,
          color: BRAND.navy, textTransform: 'uppercase',
        }}>
          Jurispru—<br/>dência
        </div>
        <div style={{
          fontFamily: '"Oswald", sans-serif', fontWeight: 300,
          fontSize: 96, letterSpacing: 0, lineHeight: 0.9,
          textTransform: 'uppercase', color: BRAND.tealDeep, marginTop: 10,
        }}>
          Esquematizada
        </div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
          letterSpacing: 5, color: BRAND.tealDeep, textTransform: 'uppercase',
          marginTop: 32,
        }}>
          Informativos do STJ e STF
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  CoverClassica, CoverEsquema, CoverTipo, CoverCards, CoverCreme,
  Logo, BRAND, A4_W, A4_H, DEFAULT_DISCIPLINA, DEFAULT_ANO,
});
