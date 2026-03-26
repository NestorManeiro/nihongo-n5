import { useEffect, useState } from "react"

/* ─── Furigana tooltip component ─── */
function F({ k, r, es }) {
  return (
    <span className="furigana-wrap" title={es || ""}>
      <ruby>
        {k}<rt>{r}</rt>
      </ruby>
      {es && <span className="ft-tooltip">{es}</span>}
    </span>
  )
}

const LESSONS = [
  // ══════════════════════════════════════════
  // BLOQUE 0 — Antes de empezar
  // ══════════════════════════════════════════
  {
    id: "saludos",
    block: "Antes de empezar",
    label: "Lección 0A",
    title: "Saludos y expresiones fijas",
    goal: "Conocer los saludos esenciales del japonés cotidiano: mañana, tarde, noche, despedidas, agradecimientos y disculpas. Son fórmulas fijas — hay que memorizarlas tal cual.",
    sections: [
      {
        heading: "Saludos por momento del día",
        body: (
          <div>
            <p>En japonés el saludo cambia según la hora del día. No existe un «hola» universal para todo el día — en situaciones formales cada momento tiene su expresión.</p>
            <table className="tm-table">
              <thead><tr><th>Expresión</th><th>Lectura</th><th>Cuándo usarla</th></tr></thead>
              <tbody>
                {[
                  ["おはようございます", "おはようございます", "Buenos días (formal). おはよう a solas es informal."],
                  ["こんにちは", "こんにちは", "Buenas tardes / Hola (mediodía–tarde). No se escribe 'は' como partícula."],
                  ["こんばんは", "こんばんは", "Buenas noches (saludo al llegar). Solo al encontrarse, no al despedirse."],
                  ["おやすみなさい", "おやすみなさい", "Buenas noches (despedida). Solo al irse a dormir."],
                ].map(([k, r, es]) => (
                  <tr key={k}><td><F k={k} r={r} es={es} /></td><td className="tm-muted">{r}</td><td>{es}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="おはようございます" r="おはようございます" es="buenos días (formal)" />！</>,
            es: "¡Buenos días!",
          },
          {
            jp: <><F k="こんにちは" r="こんにちは" es="buenas tardes / hola" />、<F k="田中さん" r="たなかさん" es="Sr./Sra. Tanaka" />。</>,
            es: "Buenas tardes, Tanaka.",
          },
        ],
      },
      {
        heading: "Despedidas y expresiones del día a día",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Expresión</th><th>Uso</th></tr></thead>
              <tbody>
                {[
                  ["さようなら", "さようなら", "Adiós (despedida definitiva o larga). Con amigos se usa じゃあね."],
                  ["またね / またあとで", "またね／またあとで", "Hasta luego / hasta ahora (informal)."],
                  ["いってきます", "いってきます", "Me voy (y vuelvo). Lo dice quien sale de casa."],
                  ["いってらっしゃい", "いってらっしゃい", "Cuídate / hasta luego. Lo dice quien se queda."],
                  ["ただいま", "ただいま", "Ya llegué / estoy en casa. Al volver."],
                  ["おかえりなさい", "おかえりなさい", "Bienvenido a casa. Al recibir a quien llega."],
                  ["いただきます", "いただきます", "Expresión antes de comer (recibo/agradezco)."],
                  ["ごちそうさまでした", "ごちそうさまでした", "Expresión después de comer (fue un banquete)."],
                ].map(([k, r, es]) => (
                  <tr key={k}><td><F k={k} r={r} es={es} /></td><td>{es}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="いただきます" r="いただきます" es="expresión al empezar a comer" />！</>,
            es: "¡Itadakimasu! (antes de comer)",
          },
          {
            jp: <><F k="いってきます" r="いってきます" es="me voy (y vuelvo)" />。— <F k="いってらっしゃい" r="いってらっしゃい" es="cuídate / hasta luego" />。</>,
            es: "Me voy. — Cuídate.",
          },
        ],
      },
      {
        heading: "Agradecimientos y disculpas",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Expresión</th><th>Significado y contexto</th></tr></thead>
              <tbody>
                {[
                  ["ありがとうございます", "ありがとうございます", "Muchas gracias (formal). ありがとう a solas es informal."],
                  ["どういたしまして", "どういたしまして", "De nada (respuesta formal a las gracias)."],
                  ["すみません", "すみません", "Perdone / disculpe / gracias (sirve para llamar la atención también)."],
                  ["ごめんなさい", "ごめんなさい", "Lo siento (disculpa sincera, más personal que すみません)."],
                  ["はい", "はい", "Sí / de acuerdo (formal). うん es informal."],
                  ["いいえ", "いいえ", "No (formal). いや o ううん son informales."],
                  ["わかりました", "わかりました", "Entendido / de acuerdo (confirma comprensión)."],
                  ["わかりません", "わかりません", "No entiendo / no sé."],
                ].map(([k, r, es]) => (
                  <tr key={k}><td><F k={k} r={r} es={es} /></td><td>{es}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="すみません" r="すみません" es="disculpe / perdone" />、<F k="ちょっと" r="ちょっと" es="un momento / un poco" /><F k="いいですか" r="いいですか" es="¿está bien? / ¿puede ser?" />？</>,
            es: "Disculpe, ¿tiene un momento?",
          },
          {
            jp: <><F k="ありがとうございます" r="ありがとうございます" es="muchas gracias (formal)" />。— <F k="どういたしまして" r="どういたしまして" es="de nada" />。</>,
            es: "Muchas gracias. — De nada.",
          },
        ],
      },
    ],
  },

  {
    id: "numeros",
    block: "Antes de empezar",
    label: "Lección 0B",
    title: "Números — dos sistemas",
    goal: "Dominar los dos sistemas de conteo japonés: el sino-japonés (いち、に、さん…) para la mayoría de usos, y el nativo (ひとつ、ふたつ…) para objetos genéricos y preguntar la edad informalmente.",
    sections: [
      {
        heading: "Sistema sino-japonés (1–10.000)",
        body: (
          <div>
            <p>Es el sistema principal. Se usa para fechas, horas, precios, teléfonos, pisos, edad con さい, y la mayoría de contadores.</p>
            <table className="tm-table">
              <thead><tr><th>Número</th><th>Kanji</th><th>Lectura</th></tr></thead>
              <tbody>
                {[
                  ["1","一","いち"],["2","二","に"],["3","三","さん"],
                  ["4","四","し／よん"],["5","五","ご"],["6","六","ろく"],
                  ["7","七","しち／なな"],["8","八","はち"],["9","九","く／きゅう"],
                  ["10","十","じゅう"],["100","百","ひゃく"],["1000","千","せん"],
                  ["10000","万","まん"],
                ].map(([n, k, r]) => (
                  <tr key={n}><td className="tm-muted">{n}</td><td><F k={k} r={r} es={n} /></td><td className="tm-muted">{r}</td></tr>
                ))}
              </tbody>
            </table>
            <p style={{marginTop:"1rem", fontSize:".88rem", color:"var(--muted)", fontStyle:"italic"}}>
              ⚠ Atención: 4 es よん en contadores de tiempo y objetos (し suena a muerte). 7 es なな en contextos de conteo (しち puede confundirse). En la práctica, よん y なな son más seguras.
            </p>
          </div>
        ),
        examples: [
          {
            jp: <><F k="三百七十五" r="さんびゃくななじゅうご" es="375" /></>,
            es: "375 — さん (3) + びゃく (100) + なな (7) + じゅう (10) + ご (5)",
          },
          {
            jp: <><F k="二千二十六年" r="にせんにじゅうろくねん" es="año 2026" /></>,
            es: "Año 2026 — に (2) + せん (1000) + に (2) + じゅう (10) + ろく (6) + ねん (año)",
          },
        ],
      },
      {
        heading: "Sistema nativo japonés (1–10)",
        body: (
          <div>
            <p>Solo llega hasta 10. Se usa para contar objetos genéricos pequeños sin un contador específico, y también para preguntar la edad informalmente (おいくつ). A partir de 11 se usa siempre el sistema sino-japonés.</p>
            <table className="tm-table">
              <thead><tr><th>Número</th><th>Lectura</th></tr></thead>
              <tbody>
                {[
                  ["1","ひとつ"],["2","ふたつ"],["3","みっつ"],["4","よっつ"],
                  ["5","いつつ"],["6","むっつ"],["7","ななつ"],["8","やっつ"],
                  ["9","ここのつ"],["10","とお"],
                ].map(([n, r]) => (
                  <tr key={n}><td className="tm-muted">{n}</td><td><F k={r} r={r} es={`${n} (sistema nativo)`} /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="りんご" r="りんご" es="manzana" />を <F k="みっつ" r="みっつ" es="tres (sistema nativo)" /><F k="ください" r="ください" es="por favor dame" />。</>,
            es: "Dame tres manzanas, por favor.",
          },
          {
            jp: <><F k="おいくつ" r="おいくつ" es="¿cuántos años? (forma educada)" />ですか？— <F k="ふたつ" r="ふたつ" es="dos (años, sistema nativo)" />です。</>,
            es: "¿Cuántos años tiene? (a un niño pequeño) — Dos.",
          },
        ],
      },
      {
        heading: "Números especiales y excepciones de pronunciación",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Número</th><th>Lectura normal</th><th>Variante / excepción</th></tr></thead>
              <tbody>
                {[
                  ["300","さんびゃく","ひゃく → びゃく (sonorización)"],
                  ["600","ろっぴゃく","ひゃく → ぴゃく"],
                  ["800","はっぴゃく","ひゃく → ぴゃく"],
                  ["3000","さんぜん","せん → ぜん"],
                  ["8000","はっせん","せん (vocal contraída)"],
                  ["10000","いちまん","まん (no «せん»)"],
                ].map(([n, r, exc]) => (
                  <tr key={n}><td className="tm-muted">{n}</td><td className="tm-muted">{r}</td><td style={{fontSize:".82rem",color:"var(--muted)"}}>{exc}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="このシャツは" r="このシャツは" es="esta camiseta" /><F k="六百円" r="ろっぴゃくえん" es="seiscientos yenes" />です。</>,
            es: "Esta camiseta cuesta 600 yenes.",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 1 — Primeros pasos
  // ══════════════════════════════════════════
  {
    id: "presentaciones",
    block: "Primeros pasos",
    label: "Lección 1",
    title: "Presentaciones",
    goal: "Presentarte y hablar de ti mismo: nombre, nacionalidad, edad, profesión y de dónde eres.",
    sections: [
      {
        heading: "La estructura básica: ～は ～です",
        body: (
          <p>
            <F k="名前" r="なまえ" es="nombre" />は <F k="〜" r="〜" />です es la fórmula de oro.{" "}
            <strong>です</strong> es el equivalente de «es / soy / eres» —no cambia según la persona.
            Para preguntar usas <F k="〜は なんですか" r="なんですか" es="¿qué es…?" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="わたし" r="watashi" es="yo" />は <F k="ネストル" r="Nesutoru" es="Néstor (nombre)" />です。</>,
            es: "Soy Néstor.",
          },
          {
            jp: <><F k="スペイン" r="Supein" es="España" /><F k="人" r="じん" es="persona / -ense" />です。</>,
            es: "Soy español.",
          },
          {
            jp: <><F k="二十六" r="にじゅうろく" es="veintiséis" /><F k="歳" r="さい" es="años (edad)" />です。</>,
            es: "Tengo veintiséis años.",
          },
          {
            jp: <><F k="エンジニア" r="enjinia" es="ingeniero/a" />です。</>,
            es: "Soy ingeniero/a.",
          },
          {
            jp: <><F k="お名前" r="おなまえ" es="su nombre (forma educada)" />は <F k="何" r="なん" es="¿qué?" />ですか？</>,
            es: "¿Cómo se llama usted?",
          },
        ],
      },
      {
        heading: "Números para la edad",
        body: (
          <p>
            La edad se dice número + <F k="歳" r="さい" es="años (contador de edad)" />. Para preguntar: <F k="何歳" r="なんさい" es="¿cuántos años?" />ですか？ En contexto muy educado se usa <F k="おいくつ" r="おいくつ" es="¿cuántos años? (forma muy educada)" />ですか？
          </p>
        ),
        examples: [
          {
            jp: <><F k="何歳" r="なんさい" es="¿cuántos años?" />ですか？</>,
            es: "¿Cuántos años tienes?",
          },
          {
            jp: <><F k="三十" r="さんじゅう" es="treinta" /><F k="歳" r="さい" es="años" />です。</>,
            es: "Tengo treinta años.",
          },
        ],
      },
      {
        heading: "Partícula も — «yo también»",
        body: (
          <p>
            Cuando quieres añadir que algo aplica también a ti, reemplazas は por <F k="も" r="mo" es="también" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="わたし" r="watashi" es="yo" />も <F k="学生" r="がくせい" es="estudiante" />です。</>,
            es: "Yo también soy estudiante.",
          },
        ],
      },
    ],
  },

  {
    id: "negaciones",
    block: "Primeros pasos",
    label: "Lección 2",
    title: "Negaciones",
    goal: "Negar cualquier afirmación con です: decir que algo no es, no eres, o no existe como concepto.",
    sections: [
      {
        heading: "じゃないです / ではありません",
        body: (
          <p>
            La negación de です tiene dos formas. <strong>じゃないです</strong> es coloquial y muy usada en el habla cotidiana. <strong>ではありません</strong> es la forma formal escrita. Ambas son correctas en N5.
          </p>
        ),
        examples: [
          {
            jp: <><F k="学生" r="がくせい" es="estudiante" />じゃないです。</>,
            es: "No soy estudiante.",
          },
          {
            jp: <><F k="日本人" r="にほんじん" es="japonés/a" />ではありません。</>,
            es: "No soy japonés/a.",
          },
          {
            jp: <><F k="これ" r="kore" es="esto (cerca de mí)" />は <F k="本" r="ほん" es="libro" />じゃないです。</>,
            es: "Esto no es un libro.",
          },
          {
            jp: <><F k="田中" r="たなか" es="Tanaka (apellido)" />さんは <F k="先生" r="せんせい" es="profesor/a" />ではありません。</>,
            es: "El Sr. Tanaka no es profesor.",
          },
        ],
      },
      {
        heading: "Pregunta negativa + でも",
        body: (
          <p>
            Cuando alguien te niega algo puedes confirmarlo con <F k="でも" r="demo" es="pero / sin embargo" /> o con <F k="そうですね" r="そうですね" es="es verdad, sí" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="医者" r="いしゃ" es="médico/a" />じゃないですか？— いいえ、<F k="エンジニア" r="enjinia" es="ingeniero/a" />です。</>,
            es: "¿No eres médico? — No, soy ingeniero.",
          },
        ],
      },
    ],
  },

  {
    id: "preguntas",
    block: "Primeros pasos",
    label: "Lección 3",
    title: "Preguntas esenciales",
    goal: "Hacer y responder preguntas básicas usando か, interrogativos como なに・どこ・だれ・いつ・どう・なぜ, y el patrón 〜は〜ですか.",
    sections: [
      {
        heading: "La partícula か — convertir cualquier frase en pregunta",
        body: (
          <p>
            En japonés no cambias el orden de las palabras para preguntar. Añades <F k="か" r="ka" es="partícula de pregunta" /> al final de la frase. La entonación sube ligeramente, como en español.
          </p>
        ),
        examples: [
          {
            jp: <><F k="これ" r="kore" es="esto" />は <F k="何" r="なん" es="¿qué?" />ですか？</>,
            es: "¿Qué es esto?",
          },
          {
            jp: <><F k="あなた" r="anata" es="tú / usted (evitar en japonés)" />は <F k="学生" r="がくせい" es="estudiante" />ですか？</>,
            es: "¿Eres estudiante?",
          },
        ],
      },
      {
        heading: "Interrogativos del N5",
        body: (
          <div>
            <p>Los interrogativos van donde iría la respuesta. No se mueven al principio como en español.</p>
            <table className="tm-table">
              <thead><tr><th>Palabra</th><th>Lectura</th><th>Significado</th></tr></thead>
              <tbody>
                {[
                  ["何", "なに／なん", "¿qué?"],
                  ["誰", "だれ", "¿quién?"],
                  ["どこ", "どこ", "¿dónde?"],
                  ["いつ", "いつ", "¿cuándo?"],
                  ["どう", "どう", "¿cómo?"],
                  ["なぜ／どうして", "なぜ／どうして", "¿por qué?"],
                  ["いくら", "いくら", "¿cuánto (precio)?"],
                  ["いくつ", "いくつ", "¿cuántos? / ¿qué edad?"],
                  ["どれ", "どれ", "¿cuál? (entre varios)"],
                  ["どの", "どの", "¿qué…? (antes de sustantivo)"],
                ].map(([k, r, es]) => (
                  <tr key={k}><td><F k={k} r={r} es={es} /></td><td className="tm-muted">{r}</td><td>{es}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="トイレ" r="toire" es="baño / aseo" />は <F k="どこ" r="どこ" es="¿dónde?" />ですか？</>,
            es: "¿Dónde está el baño?",
          },
          {
            jp: <><F k="誕生日" r="たんじょうび" es="cumpleaños" />は <F k="いつ" r="いつ" es="¿cuándo?" />ですか？</>,
            es: "¿Cuándo es tu cumpleaños?",
          },
          {
            jp: <><F k="これ" r="kore" es="esto" />は <F k="いくら" r="いくら" es="¿cuánto cuesta?" />ですか？</>,
            es: "¿Cuánto cuesta esto?",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 1B — Demostrativos
  // ══════════════════════════════════════════
  {
    id: "demostrativos",
    block: "Primeros pasos",
    label: "Lección 3B",
    title: "Demostrativos — こ・そ・あ・ど",
    goal: "Usar correctamente los demostrativos japoneses para señalar objetos (これ/それ/あれ), lugares (ここ/そこ/あそこ) y modificar sustantivos (この/その/あの). Entender la lógica de distancia.",
    sections: [
      {
        heading: "La serie こ・そ・あ・ど",
        body: (
          <div>
            <p>Todo el sistema demostrativo japonés sigue una lógica de cuatro: <strong>こ</strong> = cerca de mí, <strong>そ</strong> = cerca de ti (o de lo que se habla), <strong>あ</strong> = lejos de ambos, <strong>ど</strong> = pregunta.</p>
            <table className="tm-table">
              <thead><tr><th></th><th>こ (aquí/esto)</th><th>そ (ahí/eso)</th><th>あ (allí/aquello)</th><th>ど (¿dónde?/¿cuál?)</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Objeto</strong></td>
                  <td><F k="これ" r="これ" es="esto (cerca de mí)" /></td>
                  <td><F k="それ" r="それ" es="eso (cerca de ti)" /></td>
                  <td><F k="あれ" r="あれ" es="aquello (lejos de ambos)" /></td>
                  <td><F k="どれ" r="どれ" es="¿cuál? (entre varios)" /></td>
                </tr>
                <tr>
                  <td><strong>Lugar</strong></td>
                  <td><F k="ここ" r="ここ" es="aquí (cerca de mí)" /></td>
                  <td><F k="そこ" r="そこ" es="ahí (cerca de ti)" /></td>
                  <td><F k="あそこ" r="あそこ" es="allí (lejos de ambos)" /></td>
                  <td><F k="どこ" r="どこ" es="¿dónde?" /></td>
                </tr>
                <tr>
                  <td><strong>Modificador</strong></td>
                  <td><F k="この" r="この" es="este/esta (+ sustantivo)" /></td>
                  <td><F k="その" r="その" es="ese/esa (+ sustantivo)" /></td>
                  <td><F k="あの" r="あの" es="aquel/aquella (+ sustantivo)" /></td>
                  <td><F k="どの" r="どの" es="¿qué…? (+ sustantivo)" /></td>
                </tr>
                <tr>
                  <td><strong>Tipo/manera</strong></td>
                  <td><F k="こんな" r="こんな" es="este tipo de / así (cerca)" /></td>
                  <td><F k="そんな" r="そんな" es="ese tipo de / así (medio)" /></td>
                  <td><F k="あんな" r="あんな" es="aquel tipo de / así (lejos)" /></td>
                  <td><F k="どんな" r="どんな" es="¿qué tipo de?" /></td>
                </tr>
              </tbody>
            </table>
            <p style={{marginTop:"1rem",fontSize:".88rem",color:"var(--muted)",fontStyle:"italic"}}>
              💡 <strong>これ vs この</strong>: これ va solo («esto»), この va delante de un sustantivo («este libro»). これ本 es INCORRECTO — lo correcto es この本.
            </p>
          </div>
        ),
        examples: [
          {
            jp: <><F k="これ" r="これ" es="esto" />は <F k="何" r="なん" es="¿qué?" />ですか？</>,
            es: "¿Qué es esto?",
          },
          {
            jp: <><F k="あの" r="あの" es="aquel/aquella" /><F k="建物" r="たてもの" es="edificio" />は <F k="図書館" r="としょかん" es="biblioteca" />です。</>,
            es: "Aquel edificio es la biblioteca.",
          },
          {
            jp: <><F k="すみません" r="すみません" es="disculpe" />、<F k="トイレ" r="toire" es="baño" />は <F k="どこ" r="どこ" es="¿dónde?" />ですか？— <F k="あそこ" r="あそこ" es="allí (lejos de ambos)" />です。</>,
            es: "Disculpe, ¿dónde está el baño? — Allí.",
          },
          {
            jp: <><F k="どんな" r="どんな" es="¿qué tipo de?" /><F k="音楽" r="おんがく" es="música" />が <F k="好き" r="すき" es="gustar" />ですか？</>,
            es: "¿Qué tipo de música te gusta?",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 2 — Tiempo y rutina
  // ══════════════════════════════════════════
  {
    id: "tiempo",
    block: "Tiempo y rutina",
    label: "Lección 4",
    title: "Horas, días y meses",
    goal: "Decir y preguntar la hora, los días de la semana y los meses del año. Usar に para momentos concretos y から・まで para rangos de tiempo.",
    sections: [
      {
        heading: "La hora — 〜時 y 〜分",
        body: (
          <p>
            La hora se dice número + <F k="時" r="じ" es="hora (contador)" />. Los minutos van con <F k="分" r="ふん／ぷん" es="minutos (contador)" />. Para preguntar la hora: <F k="今" r="いま" es="ahora / actualmente" />、<F k="何時" r="なんじ" es="¿qué hora?" />ですか？ Nótese que <F k="今" r="いま" es="ahora" /> da el contexto de «en este momento».
          </p>
        ),
        examples: [
          {
            jp: <><F k="今" r="いま" es="ahora" />、<F k="三時" r="さんじ" es="las tres" /><F k="半" r="はん" es="y media" />です。</>,
            es: "Ahora son las tres y media.",
          },
          {
            jp: <><F k="七時" r="しちじ" es="las siete" /><F k="十五分" r="じゅうごふん" es="quince minutos" />です。</>,
            es: "Son las siete y cuarto.",
          },
          {
            jp: <><F k="何時" r="なんじ" es="¿qué hora?" />に <F k="起きます" r="おきます" es="levantarse (presente)" />か？</>,
            es: "¿A qué hora te levantas?",
          },
          {
            jp: <><F k="六時" r="ろくじ" es="las seis" />に <F k="起きます" r="おきます" es="me levanto" />。</>,
            es: "Me levanto a las seis.",
          },
        ],
      },
      {
        heading: "から y まで — desde y hasta",
        body: (
          <p>
            <F k="から" r="から" es="desde / a partir de" /> indica el punto de inicio. <F k="まで" r="まで" es="hasta" /> indica el punto final. Se pueden combinar.
          </p>
        ),
        examples: [
          {
            jp: <><F k="九時" r="くじ" es="las nueve" />から <F k="五時" r="ごじ" es="las cinco" />まで <F k="働きます" r="はたらきます" es="trabajar (presente)" />。</>,
            es: "Trabajo de nueve a cinco.",
          },
          {
            jp: <><F k="月曜日" r="げつようび" es="lunes" />から <F k="金曜日" r="きんようび" es="viernes" />まで <F k="学校" r="がっこう" es="escuela" />があります。</>,
            es: "Hay escuela de lunes a viernes.",
          },
        ],
      },
      {
        heading: "Días de la semana",
        body: (
          <div>
            <p>Cada día lleva el nombre de un elemento natural o cuerpo celeste. Todos terminan en <F k="曜日" r="ようび" es="día de la semana" />.</p>
            <table className="tm-table">
              <thead><tr><th>Día</th><th>Lectura</th><th>Elemento</th></tr></thead>
              <tbody>
                {[
                  ["月曜日", "げつようび", "☽ Luna (月 = luna)"],
                  ["火曜日", "かようび", "🔥 Fuego (火 = fuego)"],
                  ["水曜日", "すいようび", "💧 Agua (水 = agua)"],
                  ["木曜日", "もくようび", "🌳 Madera (木 = árbol)"],
                  ["金曜日", "きんようび", "⭐ Metal/Oro (金 = oro)"],
                  ["土曜日", "どようび", "🪨 Tierra (土 = tierra)"],
                  ["日曜日", "にちようび", "☀ Sol (日 = sol / día)"],
                ].map(([k, r, es]) => (
                  <tr key={k}><td><F k={k} r={r} es={es} /></td><td className="tm-muted">{r}</td><td>{es}</td></tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: "1rem", fontStyle: "italic", color: "var(--muted)", fontSize: ".88rem" }}>
              🔥 かようび es «día de fuego». もくようび es «día del árbol». No hay mucha mnemotecnia más allá de asociar el kanji con el elemento — con práctica se fijan solos.
            </p>
          </div>
        ),
        examples: [
          {
            jp: <><F k="今日" r="きょう" es="hoy" />は <F k="水曜日" r="すいようび" es="miércoles" />です。</>,
            es: "Hoy es miércoles.",
          },
          {
            jp: <><F k="日曜日" r="にちようび" es="domingo" />に <F k="休みます" r="やすみます" es="descansar" />。</>,
            es: "Descanso el domingo.",
          },
        ],
      },
      {
        heading: "Meses del año",
        body: (
          <p>
            Los meses en japonés son sorprendentemente sencillos: número + <F k="月" r="がつ" es="mes" />. Enero es <F k="一月" r="いちがつ" es="primer mes" />, febrero <F k="二月" r="にがつ" es="segundo mes" />, y así hasta <F k="十二月" r="じゅうにがつ" es="duodécimo mes / diciembre" />. No hay nombres propios.
          </p>
        ),
        examples: [
          {
            jp: <><F k="誕生日" r="たんじょうび" es="cumpleaños" />は <F k="三月" r="さんがつ" es="marzo" /><F k="二十日" r="はつか" es="día 20 (lectura especial)" />です。</>,
            es: "Mi cumpleaños es el 20 de marzo.",
          },
          {
            jp: <><F k="四月" r="しがつ" es="abril" />から <F k="新学期" r="しんがっき" es="nuevo trimestre" />が <F k="始まります" r="はじまります" es="empieza" />。</>,
            es: "El nuevo trimestre empieza en abril.",
          },
        ],
      },
    ],
  },

  {
    id: "habitos",
    block: "Tiempo y rutina",
    label: "Lección 5",
    title: "Hábitos y frecuencia",
    goal: "Describir rutinas y hábitos usando adverbios de frecuencia, expresar «siempre», «a veces», «nunca», e indicar intervalos de tiempo con ごとに y おきに.",
    sections: [
      {
        heading: "Adverbios de frecuencia",
        body: (
          <div>
            <p>Van antes del verbo y no necesitan partícula.</p>
            <table className="tm-table">
              <thead><tr><th>Palabra</th><th>Lectura</th><th>Significado</th></tr></thead>
              <tbody>
                {[
                  ["いつも", "いつも", "siempre"],
                  ["よく", "よく", "a menudo / frecuentemente"],
                  ["時々", "ときどき", "a veces"],
                  ["あまり～ない", "あまり～ない", "no mucho (con negación)"],
                  ["めったに～ない", "めったに～ない", "raramente (con negación)"],
                  ["全然～ない", "ぜんぜん～ない", "nunca / para nada (con negación)"],
                  ["毎日", "まいにち", "todos los días"],
                  ["毎週", "まいしゅう", "cada semana"],
                  ["毎朝", "まいあさ", "cada mañana"],
                ].map(([k, r, es]) => (
                  <tr key={k}><td><F k={k} r={r} es={es} /></td><td className="tm-muted">{r}</td><td>{es}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="毎朝" r="まいあさ" es="cada mañana" /><F k="コーヒー" r="コーヒー" es="café" />を <F k="飲みます" r="のみます" es="beber (presente)" />。</>,
            es: "Cada mañana bebo café.",
          },
          {
            jp: <><F k="時々" r="ときどき" es="a veces" /><F k="映画" r="えいが" es="película" />を <F k="見ます" r="みます" es="ver (presente)" />。</>,
            es: "A veces veo películas.",
          },
          {
            jp: <><F k="全然" r="ぜんぜん" es="para nada" /><F k="運動" r="うんどう" es="ejercicio / deporte" />しません。</>,
            es: "No hago ejercicio para nada.",
          },
        ],
      },
      {
        heading: "Intervalos: ごとに y おきに",
        body: (
          <p>
            <F k="〜ごとに" r="ごとに" es="cada… (sin excepciones)" /> indica que algo ocurre cada X sin falta. <F k="〜おきに" r="おきに" es="cada… (con intervalo entre medias)" /> indica que hay un intervalo entre cada ocurrencia. «Cada dos horas» con おきに implica dos horas de espera entre cada vez.
          </p>
        ),
        examples: [
          {
            jp: <><F k="一時間" r="いちじかん" es="una hora" />ごとに <F k="休みます" r="やすみます" es="descansar" />。</>,
            es: "Descanso cada hora.",
          },
          {
            jp: <><F k="二日" r="ふつか" es="dos días" />おきに <F k="ジム" r="jimu" es="gimnasio" />に <F k="行きます" r="いきます" es="ir (presente)" />。</>,
            es: "Voy al gimnasio cada dos días (con un día de descanso entre medias).",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 3 — Verbos
  // ══════════════════════════════════════════
  {
    id: "verbos-diccionario",
    block: "Verbos",
    label: "Lección 6",
    title: "Forma diccionario y grupos verbales",
    goal: "Entender los tres grupos de verbos japoneses y reconocer su forma diccionario (forma base / informal presente).",
    sections: [
      {
        heading: "Los tres grupos",
        body: (
          <div>
            <p>
              Todos los verbos japoneses pertenecen a uno de tres grupos. Esto determina cómo se conjugan.
            </p>
            <table className="tm-table">
              <thead><tr><th>Grupo</th><th>También llamado</th><th>Cómo reconocerlos</th><th>Ejemplos</th></tr></thead>
              <tbody>
                <tr><td>Grupo 1</td><td>う-verbos / Godan</td><td>Terminan en cualquier う-sonido excepto る…iru/eru</td><td><F k="書く" r="かく" es="escribir" />、<F k="飲む" r="のむ" es="beber" />、<F k="話す" r="はなす" es="hablar" /></td></tr>
                <tr><td>Grupo 2</td><td>る-verbos / Ichidan</td><td>Terminan en -iru o -eru</td><td><F k="食べる" r="たべる" es="comer" />、<F k="見る" r="みる" es="ver" />、<F k="起きる" r="おきる" es="levantarse" /></td></tr>
                <tr><td>Grupo 3</td><td>Irregulares</td><td>Solo dos verbos</td><td><F k="する" r="する" es="hacer" />、<F k="来る" r="くる" es="venir" /></td></tr>
              </tbody>
            </table>
            <p style={{ marginTop: "1rem", fontStyle: "italic", color: "var(--muted)", fontSize: ".88rem" }}>
              ⚠ Atención: algunos verbos que terminan en -eru son Grupo 1: <F k="帰る" r="かえる" es="volver a casa" /> es Grupo 1, no Grupo 2. La práctica lo hace evidente.
            </p>
          </div>
        ),
        examples: [
          {
            jp: <><F k="毎日" r="まいにち" es="todos los días" /><F k="日本語" r="にほんご" es="japonés (idioma)" />を <F k="勉強する" r="べんきょうする" es="estudiar" />。</>,
            es: "Estudio japonés todos los días. (forma diccionario informal)",
          },
          {
            jp: <><F k="明日" r="あした" es="mañana" /><F k="友達" r="ともだち" es="amigo/a" />が <F k="来る" r="くる" es="venir" />。</>,
            es: "Mañana viene un amigo.",
          },
        ],
      },
      {
        heading: "De ます a diccionario y viceversa",
        body: (
          <p>
            La forma ます es la formal. La forma diccionario es la informal. Para pasar de ます a diccionario: Grupo 1 cambia la vocal i→u (<F k="書きます" r="かきます" es="escribir (formal)" />→<F k="書く" r="かく" es="escribir (diccionario)" />). Grupo 2 quita ます y añade る (<F k="食べます" r="たべます" es="comer (formal)" />→<F k="食べる" r="たべる" es="comer (diccionario)" />).
          </p>
        ),
        examples: [
          {
            jp: <><F k="飲みます" r="のみます" es="beber (formal)" /> → <F k="飲む" r="のむ" es="beber (diccionario)" /></>,
            es: "beber — forma ます → forma diccionario",
          },
          {
            jp: <><F k="します" r="します" es="hacer (formal)" /> → <F k="する" r="する" es="hacer (diccionario)" /></>,
            es: "hacer — irregular",
          },
        ],
      },
    ],
  },

  {
    id: "verbos-presente",
    block: "Verbos",
    label: "Lección 7",
    title: "Verbos en presente",
    goal: "Usar la forma ます para expresar acciones habituales o futuras, con sus formas afirmativa y negativa.",
    sections: [
      {
        heading: "Forma ます — presente / futuro formal",
        body: (
          <p>
            En japonés el presente y el futuro comparten la misma forma. <F k="食べます" r="たべます" es="como / comeré" /> puede ser «como (habitualmente)» o «comeré (después)» según el contexto. La negación es <F k="〜ません" r="〜ません" es="no + verbo (presente/futuro negativo formal)" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="毎日" r="まいにち" es="todos los días" /><F k="走ります" r="はしります" es="correr (presente)" />。</>,
            es: "Corro todos los días.",
          },
          {
            jp: <><F k="明日" r="あした" es="mañana" /><F k="学校" r="がっこう" es="escuela" />に <F k="行きます" r="いきます" es="ir (presente)" />。</>,
            es: "Mañana voy a la escuela.",
          },
          {
            jp: <><F k="お酒" r="おさけ" es="alcohol / sake" />は <F k="飲みません" r="のみません" es="no bebo (presente negativo)" />。</>,
            es: "No bebo alcohol.",
          },
        ],
      },
      {
        heading: "Partículas clave con verbos",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Partícula</th><th>Uso</th><th>Ejemplo</th></tr></thead>
              <tbody>
                <tr><td><F k="を" r="を" es="objeto directo" /></td><td>Objeto directo de la acción</td><td><F k="本" r="ほん" es="libro" />を <F k="読みます" r="よみます" es="leer" /></td></tr>
                <tr><td><F k="に" r="に" es="destino / momento" /></td><td>Destino o momento concreto</td><td><F k="東京" r="とうきょう" es="Tokio" />に <F k="行きます" r="いきます" es="ir" /></td></tr>
                <tr><td><F k="で" r="で" es="lugar de acción / medio" /></td><td>Lugar donde ocurre / medio</td><td><F k="図書館" r="としょかん" es="biblioteca" />で <F k="勉強します" r="べんきょうします" es="estudiar" /></td></tr>
                <tr><td><F k="と" r="と" es="con (compañía)" /></td><td>Compañía</td><td><F k="友達" r="ともだち" es="amigo/a" />と <F k="行きます" r="いきます" es="ir" /></td></tr>
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="バス" r="バス" es="autobús" />で <F k="学校" r="がっこう" es="escuela" />に <F k="行きます" r="いきます" es="ir (presente)" />。</>,
            es: "Voy a la escuela en autobús.",
          },
          {
            jp: <><F k="友達" r="ともだち" es="amigo/a" />と <F k="映画" r="えいが" es="película" />を <F k="見ます" r="みます" es="ver (presente)" />。</>,
            es: "Veo una película con un amigo.",
          },
        ],
      },
      {
        heading: "で — instrumento, medio e idioma",
        body: (
          <p>
            <F k="で" r="で" es="con / en / por medio de" /> tiene varios usos importantes. Indica el instrumento con que haces algo, el medio de transporte, y también el idioma en que hablas.
            La expresión <strong>〜は〜で〜です</strong> sirve para explicar cómo se dice algo en otro idioma.
          </p>
        ),
        examples: [
          {
            jp: <><F k="箸" r="はし" es="palillos" />で <F k="食べます" r="たべます" es="comer" />。</>,
            es: "Como con palillos.",
          },
          {
            jp: <><F k="日本語" r="にほんご" es="japonés (idioma)" />で <F k="話してください" r="はなしてください" es="por favor habla" />。</>,
            es: "Por favor habla en japonés.",
          },
          {
            jp: <><F k="「ありがとう」" r="" es="" />は <F k="スペイン語" r="スペインご" es="español (idioma)" />で <F k="「グラシアス」" r="" es="" />です。</>,
            es: "«ありがとう» en español es «gracias».",
          },
        ],
      },
    ],
  },

  {
    id: "verbos-pasado",
    block: "Verbos",
    label: "Lección 8",
    title: "Verbos en pasado",
    goal: "Conjugar verbos en pasado afirmativo y negativo con la forma ました／ませんでした y usarlos en contexto.",
    sections: [
      {
        heading: "ました y ませんでした",
        body: (
          <p>
            El pasado formal es completamente regular en la forma ます. <F k="〜ます" r="〜ます" es="presente formal" /> → <F k="〜ました" r="〜ました" es="pasado afirmativo formal" />. La negación: <F k="〜ません" r="〜ません" es="presente negativo" /> → <F k="〜ませんでした" r="〜ませんでした" es="pasado negativo formal" />. Sin excepciones.
          </p>
        ),
        examples: [
          {
            jp: <><F k="昨日" r="きのう" es="ayer" /><F k="映画" r="えいが" es="película" />を <F k="見ました" r="みました" es="vi (pasado)" />。</>,
            es: "Ayer vi una película.",
          },
          {
            jp: <><F k="今日" r="きょう" es="hoy" /><F k="朝ごはん" r="あさごはん" es="desayuno (comida de la mañana)" />を <F k="食べませんでした" r="たべませんでした" es="no comí (pasado negativo)" />。</>,
            es: "Hoy no desayuné.",
          },
          {
            jp: <><F k="先週" r="せんしゅう" es="la semana pasada" /><F k="東京" r="とうきょう" es="Tokio" />に <F k="行きました" r="いきました" es="fui (pasado)" />。</>,
            es: "La semana pasada fui a Tokio.",
          },
        ],
      },
      {
        heading: "もう y まだ — ya y todavía",
        body: (
          <p>
            <F k="もう" r="もう" es="ya (acción completada)" /> con pasado afirmativo indica que algo ya ocurrió. <F k="まだ" r="まだ" es="todavía / aún no" /> con negativo indica que aún no ha ocurrido. La expresión <strong>もう〜ましたか</strong> es muy frecuente para preguntar si algo ya está hecho.
          </p>
        ),
        examples: [
          {
            jp: <><F k="もう" r="もう" es="ya" /><F k="宿題" r="しゅくだい" es="deberes / tarea" />を <F k="しましたか" r="しましたか" es="¿hiciste?" />？</>,
            es: "¿Ya hiciste los deberes?",
          },
          {
            jp: <><F k="まだ" r="まだ" es="todavía no" /><F k="食べていません" r="たべていません" es="no he comido" />。</>,
            es: "Todavía no he comido.",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 4 — Existencia y ubicación
  // ══════════════════════════════════════════
  {
    id: "existencia",
    block: "Existencia y ubicación",
    label: "Lección 9",
    title: "Existencia y ubicación — います y あります",
    goal: "Expresar dónde está algo o alguien, si algo existe, y describir la posición de objetos usando palabras de lugar.",
    sections: [
      {
        heading: "います vs あります",
        body: (
          <div>
            <p>
              Esta es una distinción fundamental del japonés: <F k="います" r="います" es="estar / existir (seres vivos)" /> se usa para personas, animales y todo lo que puede moverse por sí solo. <F k="あります" r="あります" es="estar / existir / haber (cosas inanimadas)" /> se usa para objetos, plantas, cosas que no se mueven solas.
            </p>
            <table className="tm-table">
              <thead><tr><th></th><th>います</th><th>あります</th></tr></thead>
              <tbody>
                <tr><td>Usa con</td><td>personas, animales</td><td>objetos, plantas, lugares, eventos</td></tr>
                <tr><td>Negativo</td><td><F k="いません" r="いません" es="no está / no hay (seres vivos)" /></td><td><F k="ありません" r="ありません" es="no está / no hay (cosas)" /></td></tr>
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="猫" r="ねこ" es="gato" />が <F k="います" r="います" es="hay / está (ser vivo)" />。</>,
            es: "Hay un gato. / El gato está.",
          },
          {
            jp: <><F k="机" r="つくえ" es="escritorio" />の <F k="上" r="うえ" es="encima / arriba" />に <F k="本" r="ほん" es="libro" />が <F k="あります" r="あります" es="hay / está (cosa)" />。</>,
            es: "Hay un libro encima del escritorio.",
          },
          {
            jp: <><F k="誰" r="だれ" es="¿quién?" />も <F k="いません" r="いません" es="no hay nadie" />。</>,
            es: "No hay nadie.",
          },
        ],
      },
      {
        heading: "Palabras de ubicación",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Palabra</th><th>Lectura</th><th>Significado</th></tr></thead>
              <tbody>
                {[
                  ["上", "うえ", "encima / arriba"],
                  ["下", "した", "debajo / abajo"],
                  ["右", "みぎ", "derecha"],
                  ["左", "ひだり", "izquierda"],
                  ["前", "まえ", "delante / antes"],
                  ["後ろ", "うしろ", "detrás"],
                  ["中", "なか", "dentro / interior"],
                  ["外", "そと", "fuera / exterior"],
                  ["隣", "となり", "al lado / adyacente"],
                  ["近く", "ちかく", "cerca"],
                ].map(([k, r, es]) => (
                  <tr key={k}><td><F k={k} r={r} es={es} /></td><td className="tm-muted">{r}</td><td>{es}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="銀行" r="ぎんこう" es="banco" />は <F k="駅" r="えき" es="estación (de tren)" />の <F k="前" r="まえ" es="delante" />に <F k="あります" r="あります" es="está (cosa)" />。</>,
            es: "El banco está delante de la estación.",
          },
          {
            jp: <><F k="犬" r="いぬ" es="perro" />は <F k="ソファ" r="ソファ" es="sofá" />の <F k="下" r="した" es="debajo" />に <F k="います" r="います" es="está (ser vivo)" />。</>,
            es: "El perro está debajo del sofá.",
          },
        ],
      },
      {
        heading: "あります para posesión",
        body: (
          <p>
            <F k="あります" r="あります" es="tener (posesión de cosas)" /> también expresa posesión de objetos o la existencia de algo en abstracto. Muy común para decir que «tienes» algo.
          </p>
        ),
        examples: [
          {
            jp: <><F k="時間" r="じかん" es="tiempo / hora" />が <F k="あります" r="あります" es="tener / haber" />か？</>,
            es: "¿Tienes tiempo?",
          },
          {
            jp: <><F k="質問" r="しつもん" es="pregunta / duda" />が <F k="あります" r="あります" es="hay / tengo" />。</>,
            es: "Tengo una pregunta.",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 5 — Cantidades y contadores
  // ══════════════════════════════════════════
  {
    id: "contadores",
    block: "Cantidades",
    label: "Lección 10",
    title: "Contadores y cantidades",
    goal: "Usar los contadores más comunes del N5, preguntar cantidades con いくつ y どのくらい, y expresar duraciones.",
    sections: [
      {
        heading: "Contadores esenciales N5",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Contador</th><th>Lectura</th><th>Para qué</th><th>Ejemplo</th></tr></thead>
              <tbody>
                {[
                  ["〜つ", "〜つ", "objetos genéricos (1-9, japonés nativo)", "ひとつ、ふたつ…"],
                  ["〜個", "〜こ", "objetos pequeños", "りんごを三個"],
                  ["〜枚", "〜まい", "objetos planos (papel, ropa, tickets)", "きってを二枚"],
                  ["〜本", "〜ほん／ぼん／ぽん", "objetos largos (botellas, bolígrafos)", "ペンを一本"],
                  ["〜冊", "〜さつ", "libros y cuadernos", "本を五冊"],
                  ["〜台", "〜だい", "máquinas, vehículos", "くるまを一台"],
                  ["〜匹", "〜ひき", "animales pequeños", "ねこを二匹"],
                  ["〜頭", "〜とう", "animales grandes", "うしを一頭"],
                  ["〜人", "〜にん／ふたり", "personas", "さんにん (3)、ふたり (2)"],
                  ["〜回", "〜かい", "veces (repetición)", "いっかい (1 vez)"],
                  ["〜階", "〜かい", "pisos de un edificio", "さんかい (3er piso)"],
                  ["〜時間", "〜じかん", "horas (duración)", "にじかん (2 horas)"],
                  ["〜分", "〜ふん／ぷん", "minutos", "ごふん (5 min)"],
                  ["〜週間", "〜しゅうかん", "semanas", "いっしゅうかん (1 semana)"],
                  ["〜ヶ月", "〜かげつ", "meses (duración)", "さんかげつ (3 meses)"],
                  ["〜年", "〜ねん", "años", "いちねん (1 año)"],
                ].map(([k, r, es, ej]) => (
                  <tr key={k}><td><F k={k} r={r} es={es} /></td><td className="tm-muted">{r}</td><td>{es}</td><td className="tm-muted" style={{fontSize:".8rem"}}>{ej}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="猫" r="ねこ" es="gato" />が <F k="二匹" r="にひき" es="dos (animales pequeños)" /><F k="います" r="います" es="hay / están" />。</>,
            es: "Hay dos gatos.",
          },
          {
            jp: <><F k="本" r="ほん" es="libro" />を <F k="三冊" r="さんさつ" es="tres (libros)" /><F k="買いました" r="かいました" es="compré" />。</>,
            es: "Compré tres libros.",
          },
        ],
      },
      {
        heading: "Preguntas de cantidad: いくつ、なんまい、なんにん、なんかい",
        body: (
          <p>
            Para preguntar cantidad se usa <F k="何" r="なん" es="¿qué número?" /> + el contador correspondiente. <F k="いくつ" r="いくつ" es="¿cuántos? (objetos genéricos / edad)" /> es más versátil y no necesita contador.
          </p>
        ),
        examples: [
          {
            jp: <><F k="何人" r="なんにん" es="¿cuántas personas?" />いますか？</>,
            es: "¿Cuántas personas hay?",
          },
          {
            jp: <><F k="何枚" r="なんまい" es="¿cuántas hojas/tickets?" />ありますか？</>,
            es: "¿Cuántos (objetos planos) hay?",
          },
          {
            jp: <><F k="いくつ" r="いくつ" es="¿cuántos? (genérico)" />ありますか？</>,
            es: "¿Cuántos hay?",
          },
        ],
      },
      {
        heading: "どのくらい — duración e intensidad",
        body: (
          <p>
            <F k="どのくらい" r="どのくらい" es="¿cuánto tiempo? / ¿cuánto aproximadamente?" /> pregunta por una duración o distancia aproximada. Equivale a «¿cuánto tiempo?» o «¿cuánto más o menos?».
          </p>
        ),
        examples: [
          {
            jp: <><F k="東京" r="とうきょう" es="Tokio" />まで <F k="どのくらい" r="どのくらい" es="¿cuánto tiempo?" /><F k="かかります" r="かかります" es="tardar / llevar tiempo" />か？</>,
            es: "¿Cuánto se tarda hasta Tokio?",
          },
          {
            jp: <><F k="二時間" r="にじかん" es="dos horas" /><F k="ぐらい" r="ぐらい" es="aproximadamente" /><F k="かかります" r="かかります" es="tarda" />。</>,
            es: "Tarda aproximadamente dos horas.",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 6 — Adjetivos
  // ══════════════════════════════════════════
  {
    id: "adjetivos",
    block: "Adjetivos",
    label: "Lección 11",
    title: "Adjetivos い y な — reconocerlos, conjugarlos, usarlos",
    goal: "Distinguir los dos tipos de adjetivos, conjugarlos en presente y pasado, en afirmativo y negativo, y conectarlos con くて／で.",
    sections: [
      {
        heading: "Adjetivos い — se conjugan solos",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Forma</th><th>Cómo</th><th>Ejemplo con たかい</th></tr></thead>
              <tbody>
                <tr><td>Presente afirmativo</td><td>〜い + です</td><td><F k="高い" r="たかい" es="caro / alto" />です</td></tr>
                <tr><td>Presente negativo</td><td>〜い → 〜くない</td><td><F k="高くない" r="たかくない" es="no es caro" />です</td></tr>
                <tr><td>Pasado afirmativo</td><td>〜い → 〜かった</td><td><F k="高かった" r="たかかった" es="era caro" />です</td></tr>
                <tr><td>Pasado negativo</td><td>〜い → 〜くなかった</td><td><F k="高くなかった" r="たかくなかった" es="no era caro" />です</td></tr>
                <tr><td>Ante sustantivo</td><td>〜い + sustantivo</td><td><F k="高い" r="たかい" es="caro" /><F k="店" r="みせ" es="tienda" /></td></tr>
              </tbody>
            </table>
            <p style={{ marginTop: "1rem", fontStyle: "italic", fontSize: ".88rem", color: "var(--muted)" }}>
              ⚠ いい (bueno) es irregular: negativo → よくない, pasado → よかった.
            </p>
          </div>
        ),
        examples: [
          {
            jp: <><F k="この映画" r="このえいが" es="esta película" />は <F k="面白かった" r="おもしろかった" es="era / fue interesante" />です。</>,
            es: "Esta película fue interesante.",
          },
          {
            jp: <><F k="昨日" r="きのう" es="ayer" />は <F k="寒くなかった" r="さむくなかった" es="no hacía frío" />です。</>,
            es: "Ayer no hacía frío.",
          },
        ],
      },
      {
        heading: "Adjetivos な — necesitan な antes de sustantivo",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Forma</th><th>Ejemplo con しずか</th></tr></thead>
              <tbody>
                <tr><td>Presente afirmativo</td><td><F k="静か" r="しずか" es="tranquilo/a" />です</td></tr>
                <tr><td>Presente negativo</td><td><F k="静か" r="しずか" es="tranquilo/a" />じゃないです</td></tr>
                <tr><td>Pasado afirmativo</td><td><F k="静か" r="しずか" es="tranquilo/a" />でした</td></tr>
                <tr><td>Pasado negativo</td><td><F k="静か" r="しずか" es="tranquilo/a" />じゃなかったです</td></tr>
                <tr><td>Ante sustantivo</td><td><F k="静かな" r="しずかな" es="tranquilo/a" /><F k="町" r="まち" es="ciudad / pueblo" /></td></tr>
              </tbody>
            </table>
            <p style={{ marginTop: "1rem", fontStyle: "italic", fontSize: ".88rem", color: "var(--muted)" }}>
              ⚠ <F k="きれい" r="きれい" es="bonito/a / limpio/a" /> parece adjetivo い pero es な: きれいな + sustantivo.
            </p>
          </div>
        ),
        examples: [
          {
            jp: <><F k="東京" r="とうきょう" es="Tokio" />は <F k="にぎやか" r="にぎやか" es="animado / bullicioso" />な <F k="町" r="まち" es="ciudad" />です。</>,
            es: "Tokio es una ciudad animada.",
          },
          {
            jp: <><F k="部屋" r="へや" es="habitación" />は <F k="きれい" r="きれい" es="limpio/a" />じゃなかったです。</>,
            es: "La habitación no estaba limpia.",
          },
        ],
      },
      {
        heading: "Conectar adjetivos: くて (い) y で (な)",
        body: (
          <p>
            Para encadenar adjetivos o descripciones: los adjetivos い usan <F k="〜くて" r="〜くて" es="y… (adjetivo い conectivo)" />, los adjetivos な usan <F k="〜で" r="〜で" es="y… (adjetivo な / sustantivo conectivo)" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="安くて" r="やすくて" es="barato y…" /><F k="美味しい" r="おいしい" es="delicioso" /><F k="レストラン" r="レストラン" es="restaurante" />です。</>,
            es: "Es un restaurante barato y delicioso.",
          },
          {
            jp: <><F k="静かで" r="しずかで" es="tranquilo y…" /><F k="きれいな" r="きれいな" es="bonito/a" /><F k="部屋" r="へや" es="habitación" />です。</>,
            es: "Es una habitación tranquila y bonita.",
          },
        ],
      },
    ],
  },

  {
    id: "comparaciones",
    block: "Adjetivos",
    label: "Lección 12",
    title: "Pasado de adjetivos, comparaciones y superlativo",
    goal: "Conjugar adjetivos en pasado, comparar dos cosas con より y どちら, y usar el superlativo con いちばん.",
    sections: [
      {
        heading: "Comparación: A のほうが B より 〜",
        body: (
          <p>
            El elemento «más» o preferido lleva <F k="のほうが" r="のほうが" es="es más… / prefiero (lit. la dirección de)" />. El elemento de comparación lleva <F k="より" r="より" es="que / comparado con" />. Literalmente «en cuanto a la dirección de A, comparado con B».
          </p>
        ),
        examples: [
          {
            jp: <><F k="電車" r="でんしゃ" es="tren" />の<F k="ほうが" r="ほうが" es="es más" /><F k="バス" r="バス" es="autobús" /><F k="より" r="より" es="que" /><F k="速い" r="はやい" es="rápido" />です。</>,
            es: "El tren es más rápido que el autobús.",
          },
          {
            jp: <><F k="夏" r="なつ" es="verano" />の<F k="ほうが" r="ほうが" es="prefiero" /><F k="冬" r="ふゆ" es="invierno" /><F k="より" r="より" es="que" /><F k="好き" r="すき" es="gustar" />です。</>,
            es: "Prefiero el verano al invierno.",
          },
        ],
      },
      {
        heading: "どちら — ¿cuál de los dos?",
        body: (
          <p>
            <F k="どちら" r="どちら" es="¿cuál de los dos? / ¿cuál prefiere?" /> pregunta por la preferencia entre dos opciones. Es más formal que <F k="どっち" r="どっち" es="¿cuál? (coloquial)" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="コーヒー" r="コーヒー" es="café" />と <F k="お茶" r="おちゃ" es="té verde" />、<F k="どちら" r="どちら" es="¿cuál de los dos?" />が <F k="好き" r="すき" es="gustar / preferir" />ですか？</>,
            es: "¿Cuál prefieres, el café o el té?",
          },
          {
            jp: <><F k="コーヒー" r="コーヒー" es="café" />の<F k="ほうが" r="ほうが" es="prefiero" /><F k="好き" r="すき" es="gustar" />です。</>,
            es: "Prefiero el café.",
          },
        ],
      },
      {
        heading: "いちばん — superlativo",
        body: (
          <p>
            <F k="いちばん" r="いちばん" es="el más… / número uno" /> va antes del adjetivo y convierte cualquier cualidad en superlativo. Literalmente significa «número uno».
          </p>
        ),
        examples: [
          {
            jp: <><F k="日本" r="にほん" es="Japón" />で <F k="いちばん" r="いちばん" es="el más / número uno" /><F k="高い" r="たかい" es="alto / caro" /><F k="山" r="やま" es="montaña" />は <F k="富士山" r="ふじさん" es="monte Fuji" />です。</>,
            es: "La montaña más alta de Japón es el monte Fuji.",
          },
          {
            jp: <><F k="クラスで" r="クラスで" es="en clase" /><F k="いちばん" r="いちばん" es="el más" /><F k="好きな" r="すきな" es="favorito/a" /><F k="科目" r="かもく" es="asignatura / materia" />は <F k="何" r="なん" es="¿cuál?" />ですか？</>,
            es: "¿Cuál es tu asignatura favorita de clase?",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 7 — Gustos, habilidades y deseos
  // ══════════════════════════════════════════
  {
    id: "gustos-habilidades",
    block: "Gustos, habilidades y deseos",
    label: "Lección 13",
    title: "Gustos, habilidades y la partícula が",
    goal: "Usar la estructura 〜は〜が para expresar gustos (好き), habilidades (上手・下手・できます), posesión con あります, razones con から, y el contraste は vs が.",
    sections: [
      {
        heading: "X は Y が 〜 — la estructura clave",
        body: (
          <p>
            En japonés, los gustos y habilidades usan <F k="が" r="が" es="partícula de objeto con verbos de sentimiento/habilidad" /> en lugar de を. El tema va con は y el objeto de gusto o habilidad va con が. Esta estructura también funciona con <F k="分かる" r="わかる" es="entender / comprender" /> y <F k="できます" r="できます" es="poder / ser capaz de" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="わたし" r="わたし" es="yo" />は <F k="音楽" r="おんがく" es="música" />が <F k="好き" r="すき" es="gustar / que gusta" />です。</>,
            es: "Me gusta la música.",
          },
          {
            jp: <><F k="田中さん" r="たなかさん" es="el Sr./la Sra. Tanaka" />は <F k="英語" r="えいご" es="inglés (idioma)" />が <F k="上手" r="じょうず" es="hábil / bueno en" />です。</>,
            es: "Tanaka es bueno en inglés.",
          },
          {
            jp: <><F k="わたし" r="わたし" es="yo" />は <F k="スペイン語" r="スペインご" es="español (idioma)" />が <F k="分かります" r="わかります" es="entender / comprender" />。</>,
            es: "Entiendo el español.",
          },
          {
            jp: <><F k="わたし" r="わたし" es="yo" />は <F k="車" r="くるま" es="coche" />が <F k="あります" r="あります" es="tener (posesión)" />。</>,
            es: "Tengo un coche.",
          },
        ],
      },
      {
        heading: "は vs が — contraste fundamental",
        body: (
          <div>
            <p>Esta distinción es esencial y aparece en el examen N5. En general:</p>
            <table className="tm-table">
              <thead><tr><th>Partícula</th><th>Función principal</th><th>Ejemplo</th></tr></thead>
              <tbody>
                <tr>
                  <td><F k="は" r="は" es="partícula de tema" /></td>
                  <td>Marca el tema/contexto de la frase. Puede contrastar o enfatizar.</td>
                  <td><F k="猫は好きです" r="ねこはすきです" es="en cuanto a gatos, me gustan" /></td>
                </tr>
                <tr>
                  <td><F k="が" r="が" es="partícula de sujeto / objeto de sentimiento" /></td>
                  <td>Identifica o señala específicamente. Con verbos de estado/sentimiento.</td>
                  <td><F k="猫が好きです" r="ねこがすきです" es="son los gatos lo que me gustan" /></td>
                </tr>
              </tbody>
            </table>
            <p style={{marginTop:"1rem", fontSize:".88rem", color:"var(--muted)", fontStyle:"italic"}}>
              💡 Truco práctico: con 好き、嫌い、上手、下手、分かる、ある、いる usa siempre が para el objeto. は introduce el tema general de lo que hablas.
            </p>
          </div>
        ),
        examples: [
          {
            jp: <><F k="わたし" r="わたし" es="yo" />は <F k="犬" r="いぬ" es="perro" />は <F k="好き" r="すき" es="gustar" />ですが、<F k="猫" r="ねこ" es="gato" />は <F k="嫌い" r="きらい" es="no gustar / odiar" />です。</>,
            es: "Me gustan los perros pero no me gustan los gatos. (は crea contraste)",
          },
          {
            jp: <><F k="あ、バス" r="あ、バス" es="ah, el autobús" />が <F k="来た" r="きた" es="llegó" />！</>,
            es: "¡Ah, llegó el autobús! (が señala algo específico recién identificado)",
          },
        ],
      },
      {
        heading: "から — expresar razones",
        body: (
          <p>
            <F k="〜から" r="〜から" es="porque / ya que (razón)" /> al final de una cláusula expresa la razón. La causa va antes de から y la consecuencia después.
          </p>
        ),
        examples: [
          {
            jp: <><F k="眠い" r="ねむい" es="con sueño / somnoliento" />から、<F k="早く" r="はやく" es="pronto / temprano" /><F k="寝ます" r="ねます" es="dormir / acostarse" />。</>,
            es: "Tengo sueño, así que me voy a dormir pronto.",
          },
          {
            jp: <><F k="日本語" r="にほんご" es="japonés" />が <F k="好きだから" r="すきだから" es="porque me gusta" />、<F k="毎日" r="まいにち" es="todos los días" /><F k="勉強します" r="べんきょうします" es="estudiar" />。</>,
            es: "Como me gusta el japonés, lo estudio todos los días.",
          },
        ],
      },
    ],
  },

  {
    id: "deseos",
    block: "Gustos, habilidades y deseos",
    label: "Lección 14",
    title: "Expresar deseos — ほしい y 〜たい",
    goal: "Expresar lo que quieres tener con ほしい y lo que quieres hacer con 〜たい. Entender que ambas formas son solo para los deseos propios.",
    sections: [
      {
        heading: "ほしい — querer tener algo",
        body: (
          <p>
            <F k="ほしい" r="ほしい" es="querer tener / desear (objeto)" /> funciona como adjetivo い: se conjuga con です, su negativo es ほしくないです, su pasado es ほしかったです. Siempre va con が para el objeto deseado. Solo se usa para los propios deseos.
          </p>
        ),
        examples: [
          {
            jp: <><F k="新しい" r="あたらしい" es="nuevo/a" /><F k="パソコン" r="パソコン" es="ordenador / laptop" />が <F k="ほしい" r="ほしい" es="quiero tener" />です。</>,
            es: "Quiero un ordenador nuevo.",
          },
          {
            jp: <><F k="何" r="なに" es="¿qué?" />が <F k="ほしい" r="ほしい" es="¿qué quieres?" />ですか？</>,
            es: "¿Qué quieres?",
          },
        ],
      },
      {
        heading: "〜たい — querer hacer algo",
        body: (
          <p>
            Se forma quitando ます y añadiendo <F k="〜たい" r="〜たい" es="querer hacer… (deseo propio)" />. Se conjuga como adjetivo い: negativo たくない, pasado たかった. Para deseos de otra persona se usan otras formas que están fuera del N5.
          </p>
        ),
        examples: [
          {
            jp: <><F k="日本" r="にほん" es="Japón" />に <F k="行きたい" r="いきたい" es="quiero ir" />です。</>,
            es: "Quiero ir a Japón.",
          },
          {
            jp: <><F k="何" r="なに" es="¿qué?" />を <F k="食べたい" r="たべたい" es="quieres comer" />ですか？</>,
            es: "¿Qué quieres comer?",
          },
          {
            jp: <><F k="もっと" r="もっと" es="más / todavía más" /><F k="寝たい" r="ねたい" es="quiero dormir" />。</>,
            es: "Quiero dormir más.",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 8 — Forma て
  // ══════════════════════════════════════════
  {
    id: "forma-te",
    block: "Forma て",
    label: "Lección 15",
    title: "La forma て (て形)",
    goal: "Entender qué es la forma て, cómo formarla para los tres grupos verbales, y sus usos fundamentales.",
    sections: [
      {
        heading: "Cómo formar la forma て",
        body: (
          <div>
            <p>La forma て es la base de muchas construcciones importantes. Su formación depende del grupo verbal:</p>
            <table className="tm-table">
              <thead><tr><th>Grupo</th><th>Diccionario termina en</th><th>→ forma て</th><th>Ejemplo</th></tr></thead>
              <tbody>
                {[
                  ["G1", "く", "いて", "書く → 書いて"],
                  ["G1", "ぐ", "いで", "泳ぐ → 泳いで"],
                  ["G1", "す", "して", "話す → 話して"],
                  ["G1", "む・ぬ・ぶ", "んで", "飲む → 飲んで"],
                  ["G1", "る・う・つ", "って", "帰る(G1)→帰って / 買う→買って"],
                  ["G2", "〜る", "〜て", "食べる → 食べて / 見る → 見て"],
                  ["G3", "する", "して", "する → して"],
                  ["G3", "くる", "きて", "来る → 来て"],
                ].map(([g, end, result, ex], i) => (
                  <tr key={i}><td className="tm-muted">{g}</td><td><F k={end} r={end} es={end} /></td><td><strong>{result}</strong></td><td className="tm-muted" style={{fontSize:".8rem"}}>{ex}</td></tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: "1rem", fontStyle: "italic", fontSize: ".88rem", color: "var(--muted)" }}>
              ⚠ Excepción: <F k="行く" r="いく" es="ir" /> → <F k="行って" r="いって" es="ir (forma て)" /> (no «いいて»).
            </p>
          </div>
        ),
        examples: [
          {
            jp: <><F k="食べて" r="たべて" es="comer (forma て)" />、<F k="飲んで" r="のんで" es="beber (forma て)" />、<F k="寝ました" r="ねました" es="dormí" />。</>,
            es: "Comí, bebí y dormí. (secuencia de acciones)",
          },
        ],
      },
      {
        heading: "〜ています — acción en curso o estado resultante",
        body: (
          <p>
            <F k="〜ています" r="〜ています" es="estar + gerundio / estado resultante" /> tiene dos interpretaciones. Con verbos de acción continua indica que algo ocurre ahora mismo. Con verbos de cambio de estado indica el resultado de ese cambio.
          </p>
        ),
        examples: [
          {
            jp: <><F k="今" r="いま" es="ahora" /><F k="テレビ" r="テレビ" es="televisión" />を <F k="見ています" r="みています" es="estoy viendo" />。</>,
            es: "Ahora estoy viendo la tele.",
          },
          {
            jp: <><F k="結婚しています" r="けっこんしています" es="estar casado/a (resultado de casarse)" />。</>,
            es: "Estoy casado/a.",
          },
          {
            jp: <><F k="窓" r="まど" es="ventana" />が <F k="開いています" r="あいています" es="está abierta (resultado de abrirse)" />。</>,
            es: "La ventana está abierta.",
          },
        ],
      },
    ],
  },

  {
    id: "forma-te-usos",
    block: "Forma て",
    label: "Lección 16",
    title: "Usos de la forma て: permiso, prohibición y progreso",
    goal: "Usar 〜てください (petición), 〜てもいいですか (permiso), 〜てはいけません (prohibición) y 〜ています (progreso).",
    sections: [
      {
        heading: "〜てください — petición cortés",
        body: (
          <p>
            La forma más natural de pedir algo educadamente. Más directa que una sugerencia pero no una orden.
          </p>
        ),
        examples: [
          {
            jp: <><F k="ここ" r="ここ" es="aquí" />に <F k="名前" r="なまえ" es="nombre" />を <F k="書いてください" r="かいてください" es="por favor escribe" />。</>,
            es: "Por favor, escribe tu nombre aquí.",
          },
          {
            jp: <><F k="もう一度" r="もういちど" es="una vez más" /><F k="言ってください" r="いってください" es="por favor dilo" />。</>,
            es: "Por favor, dilo otra vez.",
          },
        ],
      },
      {
        heading: "〜てもいいですか — pedir permiso",
        body: (
          <p>
            Literalmente «aunque haga X, ¿está bien?». La respuesta afirmativa es <F k="いいですよ" r="いいですよ" es="sí, adelante / está bien" /> o <F k="どうぞ" r="どうぞ" es="adelante / por favor (invitación)" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="写真" r="しゃしん" es="foto / fotografía" />を <F k="撮ってもいいですか" r="とってもいいですか" es="¿puedo sacar una foto?" />？</>,
            es: "¿Puedo sacar una foto?",
          },
          {
            jp: <><F k="ここに" r="ここに" es="aquí" /><F k="座ってもいいですか" r="すわってもいいですか" es="¿puedo sentarme aquí?" />？</>,
            es: "¿Puedo sentarme aquí?",
          },
        ],
      },
      {
        heading: "〜てはいけません — prohibición",
        body: (
          <p>
            <F k="〜てはいけません" r="〜てはいけません" es="no se puede / está prohibido" /> expresa prohibición. En coloquial se acorta a <F k="〜ちゃいけない" r="〜ちゃいけない" es="no se puede (coloquial)" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="ここで" r="ここで" es="aquí" /><F k="タバコを吸ってはいけません" r="タバコをすってはいけません" es="no se puede fumar aquí" />。</>,
            es: "No se puede fumar aquí.",
          },
          {
            jp: <><F k="携帯" r="けいたい" es="móvil / teléfono" />を <F k="使ってはいけません" r="つかってはいけません" es="no se puede usar el móvil" />。</>,
            es: "No se puede usar el móvil.",
          },
        ],
      },
    ],
  },

  {
    id: "forma-te-secuencias",
    block: "Forma て",
    label: "Lección 17",
    title: "Secuencias, descripciones físicas y 〜てから",
    goal: "Encadenar acciones en secuencia estricta con 〜てから, describir con が, y conectar adjetivos y sustantivos.",
    sections: [
      {
        heading: "〜てから — después de hacer X, Y",
        body: (
          <p>
            <F k="〜てから" r="〜てから" es="después de hacer… / una vez que…" /> indica que la segunda acción ocurre estrictamente después de completar la primera. El orden es fijo e importante.
          </p>
        ),
        examples: [
          {
            jp: <><F k="手" r="て" es="mano" />を <F k="洗ってから" r="あらってから" es="después de lavarse las manos" />、<F k="食べます" r="たべます" es="comer" />。</>,
            es: "Después de lavarme las manos, como.",
          },
          {
            jp: <><F k="宿題" r="しゅくだい" es="deberes" />を <F k="してから" r="してから" es="después de hacer" />、<F k="ゲームをします" r="ゲームをします" es="jugar a videojuegos" />。</>,
            es: "Después de hacer los deberes, juego.",
          },
        ],
      },
      {
        heading: "〜ながら — hacer dos cosas a la vez",
        body: (
          <p>
            <F k="〜ながら" r="〜ながら" es="mientras / al mismo tiempo que" /> indica que dos acciones ocurren simultáneamente. La acción secundaria (la que dura más o es el fondo) lleva ながら. La acción principal va al final.
          </p>
        ),
        examples: [
          {
            jp: <><F k="音楽" r="おんがく" es="música" />を <F k="聴きながら" r="ききながら" es="mientras escucha música" />、<F k="勉強します" r="べんきょうします" es="estudiar" />。</>,
            es: "Estudio mientras escucho música.",
          },
          {
            jp: <><F k="歩きながら" r="あるきながら" es="mientras camina" /><F k="スマホを見ます" r="スマホをみます" es="mirar el móvil" />。</>,
            es: "Mira el móvil mientras camina.",
          },
        ],
      },
      {
        heading: "Descripción física con が",
        body: (
          <p>
            Para describir características físicas de personas se usa el patrón <strong>〜は 部位が 形容詞です</strong>. El rasgo físico va con が y el adjetivo describe ese rasgo.
          </p>
        ),
        examples: [
          {
            jp: <><F k="彼女" r="かのじょ" es="ella / novia" />は <F k="目" r="め" es="ojos" />が <F k="大きい" r="おおきい" es="grande" />です。</>,
            es: "Ella tiene los ojos grandes.",
          },
          {
            jp: <><F k="田中さん" r="たなかさん" es="el Sr./la Sra. Tanaka" />は <F k="髪" r="かみ" es="cabello / pelo" />が <F k="長い" r="ながい" es="largo" />です。</>,
            es: "Tanaka tiene el pelo largo.",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 9 — Forma ない
  // ══════════════════════════════════════════
  {
    id: "forma-nai",
    block: "Forma ない",
    label: "Lección 18",
    title: "Forma ない — negación informal y sus usos",
    goal: "Transformar verbos a forma ない y usarla en 〜ないでください, 〜なければなりません y 〜なくてもいいです.",
    sections: [
      {
        heading: "Cómo formar la forma ない",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Grupo</th><th>Regla</th><th>Ejemplo</th></tr></thead>
              <tbody>
                <tr><td>G1</td><td>vocal u → vocal a + ない</td><td><F k="書く" r="かく" es="escribir" /> → <F k="書かない" r="かかない" es="no escribir" /></td></tr>
                <tr><td>G1 (う solo)</td><td>う → わない</td><td><F k="買う" r="かう" es="comprar" /> → <F k="買わない" r="かわない" es="no comprar" /></td></tr>
                <tr><td>G2</td><td>quitar る + ない</td><td><F k="食べる" r="たべる" es="comer" /> → <F k="食べない" r="たべない" es="no comer" /></td></tr>
                <tr><td>G3 する</td><td>irregular</td><td><F k="する" r="する" es="hacer" /> → <F k="しない" r="しない" es="no hacer" /></td></tr>
                <tr><td>G3 くる</td><td>irregular</td><td><F k="来る" r="くる" es="venir" /> → <F k="来ない" r="こない" es="no venir" /></td></tr>
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="今日" r="きょう" es="hoy" />は <F k="行かない" r="いかない" es="no voy (informal)" />。</>,
            es: "Hoy no voy.",
          },
        ],
      },
      {
        heading: "〜ないでください — petición de no hacer",
        body: (
          <p>
            La contraparte de 〜てください. Pide educadamente que no se haga algo.
          </p>
        ),
        examples: [
          {
            jp: <><F k="写真" r="しゃしん" es="foto" />を <F k="撮らないでください" r="とらないでください" es="por favor no saque fotos" />。</>,
            es: "Por favor, no saque fotos.",
          },
          {
            jp: <><F k="遅刻" r="ちこく" es="llegar tarde / retraso" />しないでください。</>,
            es: "Por favor, no llegue tarde.",
          },
        ],
      },
      {
        heading: "〜なければなりません — obligación",
        body: (
          <p>
            Literalmente «si no hago X, no va bien». En habla coloquial se acorta a <F k="〜なきゃ" r="〜なきゃ" es="tengo que… (coloquial)" /> o <F k="〜ないといけない" r="〜ないといけない" es="tengo que… (coloquial)" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="薬" r="くすり" es="medicina / medicamento" />を <F k="飲まなければなりません" r="のまなければなりません" es="tengo que tomar la medicina" />。</>,
            es: "Tengo que tomar la medicina.",
          },
          {
            jp: <><F k="早く" r="はやく" es="rápido / pronto" /><F k="寝なきゃ" r="ねなきゃ" es="tengo que dormir (coloquial)" />。</>,
            es: "Tengo que dormir pronto. (coloquial)",
          },
        ],
      },
      {
        heading: "〜なくてもいいです — no es necesario",
        body: (
          <p>
            Expresa que algo no es obligatorio: «no hace falta que…». Es el opuesto de なければなりません.
          </p>
        ),
        examples: [
          {
            jp: <><F k="今日" r="きょう" es="hoy" />は <F k="来なくてもいいです" r="こなくてもいいです" es="no hace falta que vengas hoy" />。</>,
            es: "No hace falta que vengas hoy.",
          },
          {
            jp: <><F k="全部" r="ぜんぶ" es="todo / completamente" /><F k="食べなくてもいいです" r="たべなくてもいいです" es="no hace falta comerlo todo" />。</>,
            es: "No hace falta que te lo comas todo.",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 10 — Posibilidad y pasatiempos
  // ══════════════════════════════════════════
  {
    id: "posibilidad",
    block: "Posibilidad y pasatiempos",
    label: "Lección 19",
    title: "Posibilidad, habilidades y pasatiempos",
    goal: "Expresar posibilidad con 〜ことができます, hablar de pasatiempos con しゅみは〜ことです, indicar anterioridad con 〜まえに, y describir servicios con sustantivo＋ができます.",
    sections: [
      {
        heading: "〜ことができます — poder / ser capaz de",
        body: (
          <p>
            Se construye con la forma diccionario + <F k="ことができます" r="ことができます" es="poder hacer / ser capaz de" />. <F k="こと" r="こと" es="cosa (nominalizador de acciones)" /> convierte el verbo en sustantivo. También se puede usar solo <F k="できます" r="できます" es="poder / ser posible" /> con sustantivos de habilidad.
          </p>
        ),
        examples: [
          {
            jp: <><F k="日本語" r="にほんご" es="japonés" />を <F k="話すことができます" r="はなすことができます" es="puedo hablar japonés" />。</>,
            es: "Puedo hablar japonés.",
          },
          {
            jp: <><F k="ピアノ" r="ピアノ" es="piano" />が <F k="できます" r="できます" es="sé tocar / puedo" />。</>,
            es: "Sé tocar el piano.",
          },
          {
            jp: <><F k="ここでは" r="ここでは" es="aquí" /><F k="カード払い" r="カードばらい" es="pago con tarjeta" />が <F k="できます" r="できます" es="se puede / está disponible" />。</>,
            es: "Aquí se puede pagar con tarjeta.",
          },
        ],
      },
      {
        heading: "しゅみは〜ことです — hablar de pasatiempos",
        body: (
          <p>
            <F k="趣味" r="しゅみ" es="pasatiempo / hobby" />は + verbo diccionario + <F k="ことです" r="ことです" es="es (nominalizador)" /> es la forma estándar de presentar un hobby.
          </p>
        ),
        examples: [
          {
            jp: <><F k="趣味" r="しゅみ" es="hobby" />は <F k="ゲームをすること" r="ゲームをすること" es="jugar a videojuegos (nominalizado)" />です。</>,
            es: "Mi hobby es jugar a videojuegos.",
          },
          {
            jp: <><F k="趣味" r="しゅみ" es="hobby" />は <F k="写真を撮ること" r="しゃしんをとること" es="sacar fotos (nominalizado)" />です。</>,
            es: "Mi hobby es la fotografía.",
          },
        ],
      },
      {
        heading: "〜まえに — antes de",
        body: (
          <p>
            Verbo diccionario (o sustantivo) + <F k="まえに" r="まえに" es="antes de" />. Siempre se usa la forma diccionario aunque la frase principal esté en pasado.
          </p>
        ),
        examples: [
          {
            jp: <><F k="寝る" r="ねる" es="dormir / acostarse (diccionario)" /><F k="まえに" r="まえに" es="antes de" />、<F k="歯を磨きます" r="はをみがきます" es="me cepillo los dientes" />。</>,
            es: "Antes de dormir, me cepillo los dientes.",
          },
          {
            jp: <><F k="食事" r="しょくじ" es="comida (sustantivo)" />の<F k="まえに" r="まえに" es="antes de" />、<F k="手を洗います" r="てをあらいます" es="me lavo las manos" />。</>,
            es: "Antes de comer, me lavo las manos.",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 11 — Forma た
  // ══════════════════════════════════════════
  {
    id: "forma-ta",
    block: "Forma た",
    label: "Lección 20",
    title: "Forma た — experiencias, listas y cambios",
    goal: "Usar la forma た para hablar de experiencias pasadas con 〜たことがある, listar acciones con 〜たり〜たりする, y expresar cambios con 〜になります.",
    sections: [
      {
        heading: "La forma た — pasado informal",
        body: (
          <p>
            La forma た se construye exactamente igual que la forma て pero cambiando て→た y で→だ. Es el pasado afirmativo informal y la base de estas tres construcciones.
          </p>
        ),
        examples: [
          {
            jp: <><F k="食べた" r="たべた" es="comí / comiste (informal)" /></>,
            es: "comí (informal) — forma た de 食べる",
          },
          {
            jp: <><F k="行った" r="いった" es="fui / fue (informal)" /></>,
            es: "fui (informal) — forma た de 行く",
          },
        ],
      },
      {
        heading: "〜たことがある — haber hecho algo alguna vez",
        body: (
          <p>
            Expresa experiencia pasada: «he hecho X alguna vez». <F k="〜たことがない" r="〜たことがない" es="nunca he hecho" /> es la negación. Muy útil para contar experiencias de viajes o actividades.
          </p>
        ),
        examples: [
          {
            jp: <><F k="寿司" r="すし" es="sushi" />を <F k="食べたことがあります" r="たべたことがあります" es="he comido sushi alguna vez" />。</>,
            es: "He comido sushi alguna vez.",
          },
          {
            jp: <><F k="富士山" r="ふじさん" es="monte Fuji" />に <F k="登ったことがない" r="のぼったことがない" es="nunca he subido al monte Fuji" />。</>,
            es: "Nunca he subido al monte Fuji.",
          },
          {
            jp: <><F k="日本" r="にほん" es="Japón" />に <F k="行ったことがありますか" r="いったことがありますか" es="¿has ido alguna vez a Japón?" />？</>,
            es: "¿Has ido alguna vez a Japón?",
          },
        ],
      },
      {
        heading: "〜たり〜たりする — listar acciones representativas",
        body: (
          <p>
            Indica una lista no exhaustiva de acciones: «hacer cosas como X e Y». No implica que esas sean las únicas acciones, sino ejemplos representativos.
          </p>
        ),
        examples: [
          {
            jp: <><F k="週末" r="しゅうまつ" es="fin de semana" />は <F k="映画を見たり" r="えいがをみたり" es="ver películas (lista)" />、<F k="友達と話したり" r="ともだちとはなしたり" es="hablar con amigos (lista)" />します。</>,
            es: "Los fines de semana hago cosas como ver películas y quedar con amigos.",
          },
        ],
      },
      {
        heading: "〜になります — cambio de estado",
        body: (
          <p>
            <F k="〜になります" r="〜になります" es="llegar a ser / convertirse en / volverse" /> expresa un cambio. Con sustantivos o adjetivos な va になります directamente. Con adjetivos い se usa la forma く: <F k="暖かくなります" r="あたたかくなります" es="se vuelve cálido / va a hacer más calor" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="春" r="はる" es="primavera" />に <F k="なると" r="なると" es="cuando llega / al llegar" />、<F k="暖かくなります" r="あたたかくなります" es="se vuelve cálido" />。</>,
            es: "Cuando llega la primavera, se vuelve cálido.",
          },
          {
            jp: <><F k="来年" r="らいねん" es="el año que viene" />、<F k="先生に" r="せんせいに" es="maestro/a (meta)" /><F k="なります" r="なります" es="me convertiré en" />。</>,
            es: "El año que viene me haré profesor/a.",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 12 — Registro y citas
  // ══════════════════════════════════════════
  {
    id: "registro",
    block: "Registro y citas",
    label: "Lección 21",
    title: "Forma cortés vs forma simple, citas y probabilidad",
    goal: "Distinguir ていねいけい y ふつうけい, citar con 〜と思います y 〜と言います, y expresar probabilidad con 〜でしょう.",
    sections: [
      {
        heading: "ていねいけい vs ふつうけい",
        body: (
          <div>
            <p>
              <F k="丁寧形" r="ていねいけい" es="forma cortés (formal)" /> es la forma ます／です que se usa con desconocidos, superiores o en situaciones formales. <F k="普通形" r="ふつうけい" es="forma simple (informal)" /> es la forma diccionario／た／ない que se usa con amigos y familia.
            </p>
            <table className="tm-table">
              <thead><tr><th></th><th>Cortés (ていねい)</th><th>Simple (ふつう)</th></tr></thead>
              <tbody>
                <tr><td>Presente afirm.</td><td><F k="食べます" r="たべます" es="como (formal)" /></td><td><F k="食べる" r="たべる" es="como (informal)" /></td></tr>
                <tr><td>Presente neg.</td><td><F k="食べません" r="たべません" es="no como (formal)" /></td><td><F k="食べない" r="たべない" es="no como (informal)" /></td></tr>
                <tr><td>Pasado afirm.</td><td><F k="食べました" r="たべました" es="comí (formal)" /></td><td><F k="食べた" r="たべた" es="comí (informal)" /></td></tr>
                <tr><td>Pasado neg.</td><td><F k="食べませんでした" r="たべませんでした" es="no comí (formal)" /></td><td><F k="食べなかった" r="たべなかった" es="no comí (informal)" /></td></tr>
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="明日" r="あした" es="mañana" /><F k="行く" r="いく" es="voy (informal)" />よ。— <F k="明日" r="あした" es="mañana" /><F k="行きます" r="いきます" es="voy (formal)" />。</>,
            es: "Mañana voy. (informal) — Mañana voy. (formal)",
          },
        ],
      },
      {
        heading: "〜と思います — opinión personal",
        body: (
          <p>
            Cita el pensamiento propio. La cláusula antes de と usa la <strong>forma simple</strong>, no la forma ます. En japonés dar opiniones de forma directa puede sonar brusco, por lo que esta expresión es muy frecuente.
          </p>
        ),
        examples: [
          {
            jp: <><F k="明日" r="あした" es="mañana" />は <F k="雨だと" r="あめだと" es="que va a llover (cita)" /><F k="思います" r="おもいます" es="creo / pienso" />。</>,
            es: "Creo que mañana lloverá.",
          },
          {
            jp: <><F k="これは" r="これは" es="esto" /><F k="難しいと" r="むずかしいと" es="que es difícil (cita)" /><F k="思います" r="おもいます" es="me parece" />。</>,
            es: "Me parece que esto es difícil.",
          },
        ],
      },
      {
        heading: "〜と言います — citar lo que alguien dijo",
        body: (
          <p>
            <F k="〜と言います" r="〜といいます" es="decir que… / llamarse… (cita)" /> cita las palabras de otra persona. También se usa para explicar cómo se llama algo: <F k="〜は〜と言います" r="〜は〜といいます" es="〜 se llama 〜 / 〜 se dice 〜" />.
          </p>
        ),
        examples: [
          {
            jp: <><F k="先生" r="せんせい" es="profesor/a" />は <F k="明日" r="あした" es="mañana" /><F k="テストがあると" r="テストがあると" es="que hay un examen (cita)" /><F k="言いました" r="いいました" es="dijo" />。</>,
            es: "El profesor dijo que mañana hay examen.",
          },
          {
            jp: <><F k="これは" r="これは" es="esto" /><F k="日本語で" r="にほんごで" es="en japonés" /><F k="「ねこ」と言います" r="「ねこ」といいます" es="se dice 「ねこ」" />。</>,
            es: "Esto en japonés se dice 「ねこ」.",
          },
        ],
      },
      {
        heading: "〜でしょう — probabilidad o confirmación",
        body: (
          <p>
            <F k="〜でしょう" r="〜でしょう" es="probablemente… / ¿verdad? (probabilidad/confirmación)" /> expresa suposición o probabilidad. Con entonación descendente expresa «probablemente». Con entonación ascendente (〜でしょう？) pide confirmación.
          </p>
        ),
        examples: [
          {
            jp: <><F k="明日" r="あした" es="mañana" />は <F k="晴れでしょう" r="はれでしょう" es="probablemente hará sol" />。</>,
            es: "Probablemente mañana hará sol.",
          },
          {
            jp: <><F k="疲れたでしょう" r="つかれたでしょう" es="¿estás cansado/a, verdad?" />？</>,
            es: "¿Estás cansado/a, verdad?",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 13 — Gramática avanzada N5
  // ══════════════════════════════════════════
  {
    id: "modificacion-nominal",
    block: "Gramática avanzada N5",
    label: "Lección 22",
    title: "Modificación nominal — adjetivos verbales",
    goal: "Usar cláusulas enteras para modificar sustantivos, construyendo descripciones complejas tipo «la persona que fue a Tokio».",
    sections: [
      {
        heading: "連体修飾節 — cláusula relativa antes del sustantivo",
        body: (
          <p>
            En japonés los modificadores van <strong>siempre antes</strong> del sustantivo. Esto incluye cláusulas enteras. La cláusula usa la forma simple (ふつうけい) y va directamente antes del sustantivo sin partícula.
          </p>
        ),
        examples: [
          {
            jp: <><F k="昨日" r="きのう" es="ayer" /><F k="買った" r="かった" es="compré (forma た)" /><F k="本" r="ほん" es="libro" />は <F k="面白い" r="おもしろい" es="interesante" />です。</>,
            es: "El libro que compré ayer es interesante.",
          },
          {
            jp: <><F k="東京に住んでいる" r="とうきょうにすんでいる" es="que vive en Tokio (cláusula relativa)" /><F k="友達" r="ともだち" es="amigo/a" />が <F k="います" r="います" es="hay / tengo" />。</>,
            es: "Tengo un amigo que vive en Tokio.",
          },
          {
            jp: <><F k="日本語が話せる" r="にほんごがはなせる" es="que habla japonés (cláusula relativa)" /><F k="人" r="ひと" es="persona" />を <F k="知っていますか" r="しっていますか" es="¿conoces?" />？</>,
            es: "¿Conoces a alguien que hable japonés?",
          },
        ],
      },
    ],
  },

  {
    id: "to-toki",
    block: "Gramática avanzada N5",
    label: "Lección 23",
    title: "〜と (condicional natural) y 〜とき (cuando)",
    goal: "Usar 〜と para consecuencias naturales automáticas y 〜とき para expresar el momento en que ocurre algo.",
    sections: [
      {
        heading: "〜と — consecuencia natural",
        body: (
          <p>
            <F k="〜と" r="〜と" es="si… entonces (consecuencia automática)" /> expresa que una condición lleva siempre, de forma automática o natural, a un resultado. No se usa para peticiones o intenciones personales voluntarias.
          </p>
        ),
        examples: [
          {
            jp: <><F k="春になると" r="はるになると" es="cuando llega la primavera" />、<F k="桜が咲きます" r="さくらがさきます" es="florecen los cerezos" />。</>,
            es: "Cuando llega la primavera, florecen los cerezos.",
          },
          {
            jp: <><F k="右に曲がると" r="みぎにまがると" es="si giras a la derecha" />、<F k="駅があります" r="えきがあります" es="hay una estación" />。</>,
            es: "Si giras a la derecha, hay una estación.",
          },
        ],
      },
      {
        heading: "〜とき — en el momento de / cuando",
        body: (
          <p>
            <F k="〜とき" r="〜とき" es="cuando / en el momento de" /> indica el momento en que ocurre algo. La forma del verbo antes de とき cambia el matiz: diccionario + とき = «cuando estoy a punto de hacer», た + とき = «cuando ya he hecho».
          </p>
        ),
        examples: [
          {
            jp: <><F k="子供の時" r="こどものとき" es="cuando era niño/a" />、<F k="よく" r="よく" es="a menudo" /><F k="泳ぎました" r="およぎました" es="nadaba" />。</>,
            es: "Cuando era niño/a, nadaba a menudo.",
          },
          {
            jp: <><F k="困ったとき" r="こまったとき" es="cuando tengo problemas / cuando estoy en apuros" />、<F k="電話してください" r="でんわしてください" es="por favor llámame" />。</>,
            es: "Cuando tengas problemas, llámame.",
          },
        ],
      },
    ],
  },

  {
    id: "dar-recibir",
    block: "Gramática avanzada N5",
    label: "Lección 24",
    title: "Dar y recibir — あげます・くれます・もらいます",
    goal: "Dominar los tres verbos de intercambio, sus diferencias de perspectiva, las partículas に y から que los acompañan, y la forma auxiliar て+あげる/くれる/もらう.",
    sections: [
      {
        heading: "Los tres verbos — perspectiva es todo",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Verbo</th><th>Dirección</th><th>Partículas</th></tr></thead>
              <tbody>
                <tr><td><F k="あげます" r="あげます" es="dar (yo/otros → otra persona)" /></td><td>Yo → Otro / Otro → Otro (no hacia mí)</td><td>に para el receptor</td></tr>
                <tr><td><F k="くれます" r="くれます" es="dar (otro → yo/mi círculo)" /></td><td>Otro → Yo (o mi círculo)</td><td>に para el receptor (yo)</td></tr>
                <tr><td><F k="もらいます" r="もらいます" es="recibir (yo ← otro)" /></td><td>Yo ← Otro</td><td>に o から para la fuente</td></tr>
              </tbody>
            </table>
            <p style={{ marginTop: "1rem", fontStyle: "italic", fontSize: ".88rem", color: "var(--muted)" }}>
              La clave: くれます siempre va hacia ti o tu grupo. Si el receptor es otra persona, usa あげます.
            </p>
          </div>
        ),
        examples: [
          {
            jp: <><F k="友達" r="ともだち" es="amigo/a" />に <F k="プレゼント" r="プレゼント" es="regalo" />を <F k="あげました" r="あげました" es="di (a él/ella)" />。</>,
            es: "Le di un regalo a mi amigo/a.",
          },
          {
            jp: <><F k="友達" r="ともだち" es="amigo/a" />が <F k="プレゼント" r="プレゼント" es="regalo" />を <F k="くれました" r="くれました" es="me dio (a mí)" />。</>,
            es: "Mi amigo/a me dio un regalo.",
          },
          {
            jp: <><F k="友達" r="ともだち" es="amigo/a" />に <F k="プレゼント" r="プレゼント" es="regalo" />を <F k="もらいました" r="もらいました" es="recibí (de él/ella)" />。</>,
            es: "Recibí un regalo de mi amigo/a.",
          },
          {
            jp: <><F k="田中さん" r="たなかさん" es="el Sr./la Sra. Tanaka" />から <F k="本" r="ほん" es="libro" />を <F k="もらいました" r="もらいました" es="recibí" />。</>,
            es: "Recibí un libro de Tanaka. (から enfatiza el origen)",
          },
        ],
      },
      {
        heading: "Forma て＋あげる／くれる／もらう — hacer algo para alguien",
        body: (
          <p>
            Combinando la forma て con estos tres verbos se expresa hacer una acción para otra persona (o que alguien la haga para ti). Es una de las construcciones más frecuentes del japonés real.
          </p>
        ),
        examples: [
          {
            jp: <><F k="友達に" r="ともだちに" es="para mi amigo/a" /><F k="日本語を教えてあげました" r="にほんごをおしえてあげました" es="le enseñé japonés (hice algo por él/ella)" />。</>,
            es: "Le enseñé japonés a mi amigo. (yo hice algo por él)",
          },
          {
            jp: <><F k="先生が" r="せんせいが" es="el/la profesor/a" /><F k="説明してくれました" r="せつめいしてくれました" es="me explicó (lo hizo por mí)" />。</>,
            es: "La profesora me lo explicó. (lo hizo por mí, lo agradezco)",
          },
          {
            jp: <><F k="友達に" r="ともだちに" es="a mi amigo/a (fuente)" /><F k="駅まで送ってもらいました" r="えきまでおくってもらいました" es="me llevó a la estación (recibí el favor)" />。</>,
            es: "Mi amigo me llevó hasta la estación. (recibí el favor)",
          },
        ],
      },
    ],
  },

  {
    id: "invitar-proponer",
    block: "Gramática avanzada N5",
    label: "Lección 25",
    title: "Invitar, proponer y condiciones — 〜ませんか・〜ましょう・〜たら・〜ても",
    goal: "Hacer invitaciones y propuestas, y expresar condiciones hipotéticas con 〜たら y concesión con 〜ても.",
    sections: [
      {
        heading: "〜ませんか y 〜ましょう — invitar y proponer",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Forma</th><th>Uso</th><th>Ejemplo</th></tr></thead>
              <tbody>
                <tr>
                  <td><F k="〜ませんか" r="〜ませんか" es="¿no quieres…? / ¿te apetece…? (invitación)" /></td>
                  <td>Invitar a alguien a hacer algo contigo</td>
                  <td><F k="一緒に食べませんか" r="いっしょにたべませんか" es="¿no comemos juntos?" /></td>
                </tr>
                <tr>
                  <td><F k="〜ましょう" r="〜ましょう" es="¡vamos a…! / hagamos… (propuesta conjunta)" /></td>
                  <td>Proponer hacer algo juntos con entusiasmo</td>
                  <td><F k="行きましょう" r="いきましょう" es="¡vamos! / ¡vayamos!" /></td>
                </tr>
                <tr>
                  <td><F k="〜ましょうか" r="〜ましょうか" es="¿hacemos…? / ¿quieres que…? (oferta / sugerencia)" /></td>
                  <td>Ofrecer ayuda o hacer una sugerencia suave</td>
                  <td><F k="手伝いましょうか" r="てつだいましょうか" es="¿te ayudo?" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="今夜" r="こんや" es="esta noche" /><F k="映画" r="えいが" es="película" />を <F k="見ませんか" r="みませんか" es="¿no vemos una película?" />？</>,
            es: "¿Vemos una película esta noche?",
          },
          {
            jp: <><F k="そろそろ" r="そろそろ" es="ya va siendo hora / pronto" /><F k="行きましょう" r="いきましょう" es="¡vamos!" />！</>,
            es: "¡Ya va siendo hora de irnos!",
          },
        ],
      },
      {
        heading: "〜たら — condición (si ocurre X, entonces Y)",
        body: (
          <p>
            <F k="〜たら" r="〜たら" es="si / cuando / una vez que (condición)" /> expresa que una vez que se cumple la condición, ocurre la consecuencia. Es más versátil que 〜と y puede usarse con peticiones e intenciones.
          </p>
        ),
        examples: [
          {
            jp: <><F k="雨が降ったら" r="あめがふったら" es="si llueve" />、<F k="家にいます" r="いえにいます" es="me quedo en casa" />。</>,
            es: "Si llueve, me quedo en casa.",
          },
          {
            jp: <><F k="日本に行ったら" r="にほんにいったら" es="cuando vayas a Japón" />、<F k="寿司を食べてください" r="すしをたべてください" es="por favor come sushi" />。</>,
            es: "Cuando vayas a Japón, come sushi.",
          },
        ],
      },
      {
        heading: "〜ても — aunque / incluso si",
        body: (
          <p>
            <F k="〜ても" r="〜ても" es="aunque / incluso si (concesión)" /> expresa que la consecuencia se mantiene independientemente de la condición. «Aunque haga X, Y sigue siendo así.»
          </p>
        ),
        examples: [
          {
            jp: <><F k="雨が降っても" r="あめがふっても" es="aunque llueva" />、<F k="行きます" r="いきます" es="voy de todas formas" />。</>,
            es: "Aunque llueva, voy de todas formas.",
          },
          {
            jp: <><F k="忙しくても" r="いそがしくても" es="aunque esté ocupado/a" />、<F k="毎日" r="まいにち" es="todos los días" /><F k="運動します" r="うんどうします" es="hago ejercicio" />。</>,
            es: "Aunque esté ocupado/a, hago ejercicio todos los días.",
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════
  // BLOQUE 14 — Expresiones extra N5
  // ══════════════════════════════════════════
  {
    id: "ya-nado",
    block: "Expresiones extra N5",
    label: "Lección 26",
    title: "Listas y énfasis — や〜など、〜んです、〜よ・〜ね",
    goal: "Hacer listas no exhaustivas con や y など, usar 〜んです para explicar o pedir explicación, y añadir énfasis o búsqueda de acuerdo con よ y ね.",
    sections: [
      {
        heading: "や〜など — lista no exhaustiva",
        body: (
          <p>
            <F k="や" r="や" es="y / entre otros (lista no exhaustiva)" /> conecta sustantivos igual que と, pero implica que la lista no está completa. <F k="など" r="など" es="etc. / entre otros" /> al final refuerza esa idea. Equivale a «cosas como X e Y, entre otras».
            Contraste: <strong>と</strong> = lista completa y exhaustiva. <strong>や〜など</strong> = lista parcial, hay más.
          </p>
        ),
        examples: [
          {
            jp: <><F k="りんご" r="りんご" es="manzana" />や <F k="みかん" r="みかん" es="mandarina" />など <F k="くだもの" r="くだもの" es="fruta" />が <F k="好き" r="すき" es="gustar" />です。</>,
            es: "Me gustan frutas como manzanas y mandarinas (entre otras).",
          },
          {
            jp: <><F k="東京" r="とうきょう" es="Tokio" />や <F k="大阪" r="おおさか" es="Osaka" />など <F k="大きい" r="おおきい" es="grande" /><F k="都市" r="とし" es="ciudad" />に <F k="行きたい" r="いきたい" es="quiero ir" />です。</>,
            es: "Quiero ir a ciudades grandes como Tokio y Osaka (entre otras).",
          },
        ],
      },
      {
        heading: "〜んです — explicación y contexto",
        body: (
          <p>
            <F k="〜んです" r="〜んです" es="es que… / lo que pasa es que… (explicación)" /> (formal: <F k="〜のです" r="〜のです" es="es que… (explicación formal)" />) añade una capa de «explicación» o «contexto». Se usa para dar razones, pedir explicaciones, o señalar que algo requiere contexto. Con pregunta (〜んですか) invita al interlocutor a explicarse.
          </p>
        ),
        examples: [
          {
            jp: <><F k="どうして" r="どうして" es="¿por qué?" /><F k="遅かった" r="おそかった" es="llegaste tarde" /><F k="んですか" r="んですか" es="¿es que…? (pide explicación)" />？</>,
            es: "¿Por qué llegaste tarde? (pide explicación)",
          },
          {
            jp: <><F k="電車が" r="でんしゃが" es="el tren" /><F k="遅れた" r="おくれた" es="llegó tarde" /><F k="んです" r="んです" es="es que… (explica)" />。</>,
            es: "Es que el tren llegó tarde. (explica la razón)",
          },
          {
            jp: <><F k="頭が痛い" r="あたまがいたい" es="me duele la cabeza" /><F k="んです" r="んです" es="lo que pasa es que…" />。</>,
            es: "Lo que pasa es que me duele la cabeza.",
          },
        ],
      },
      {
        heading: "〜よ y 〜ね — partículas finales de énfasis",
        body: (
          <div>
            <table className="tm-table">
              <thead><tr><th>Partícula</th><th>Función</th><th>Ejemplo</th></tr></thead>
              <tbody>
                <tr>
                  <td><F k="〜よ" r="〜よ" es="¡eh! / te digo que… (énfasis, información nueva)" /></td>
                  <td>Afirmar algo con énfasis, dar información que el otro no sabe</td>
                  <td><F k="これはおいしいよ" r="これはおいしいよ" es="¡esto está rico, te digo!" /></td>
                </tr>
                <tr>
                  <td><F k="〜ね" r="〜ね" es="¿verdad? / ¿no? (busca acuerdo o confirmación)" /></td>
                  <td>Buscar confirmación, compartir una impresión</td>
                  <td><F k="いい天気ですね" r="いいてんきですね" es="hace buen tiempo, ¿verdad?" /></td>
                </tr>
                <tr>
                  <td><F k="〜よね" r="〜よね" es="¿verdad que…? (énfasis + búsqueda de acuerdo)" /></td>
                  <td>Combinar ambas: afirmar y buscar confirmación</td>
                  <td><F k="難しいよね" r="むずかしいよね" es="es difícil, ¿verdad?" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        examples: [
          {
            jp: <><F k="明日" r="あした" es="mañana" />は <F k="テストがある" r="テストがある" es="hay examen" /><F k="よ" r="よ" es="¡eh! (información nueva)" />！</>,
            es: "¡Oye, mañana hay examen! (el otro no lo sabía)",
          },
          {
            jp: <><F k="この映画" r="このえいが" es="esta película" />、<F k="面白い" r="おもしろい" es="interesante" /><F k="ね" r="ね" es="¿verdad?" />。</>,
            es: "Esta película es interesante, ¿verdad?",
          },
        ],
      },
    ],
  },
]

// ─── Group by block ───
function groupByBlock(lessons) {
  const blocks = []
  const seen = {}
  lessons.forEach(l => {
    if (!seen[l.block]) {
      seen[l.block] = true
      blocks.push({ block: l.block, lessons: [] })
    }
    blocks[blocks.length - 1].lessons.push(l)
  })
  return blocks
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target) }
      }),
      { threshold: 0.04 }
    )
    document.querySelectorAll(".reveal").forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function TemarioPage() {
  useReveal()
  const [openLesson, setOpenLesson] = useState(null)
  const blocks = groupByBlock(LESSONS)

  return (
    <>
      <style>{`
        /* ── Furigana tooltip ── */
        .furigana-wrap { position:relative; display:inline; cursor:help; }
        .furigana-wrap ruby { ruby-align:center; }
        .furigana-wrap rt { font-size:.6em; color:var(--red); font-family:var(--jp); }
        .ft-tooltip {
          display:none; position:absolute; bottom:calc(100% + 6px); left:50%;
          transform:translateX(-50%); background:var(--ink); color:#fff;
          font-size:.72rem; padding:.28rem .55rem; border-radius:3px; white-space:nowrap;
          pointer-events:none; z-index:100; font-family:var(--sans, sans-serif);
          font-style:normal; line-height:1.4;
        }
        .ft-tooltip::after {
          content:""; position:absolute; top:100%; left:50%; transform:translateX(-50%);
          border:4px solid transparent; border-top-color:var(--ink);
        }
        .furigana-wrap:hover .ft-tooltip { display:block; }

        /* ── Table ── */
        .tm-table { width:100%; border-collapse:collapse; font-size:.88rem; margin:.6rem 0; }
        .tm-table th { text-align:left; font-weight:600; padding:.5rem .7rem; border-bottom:2px solid var(--border); font-size:.8rem; color:var(--muted); text-transform:uppercase; letter-spacing:.04em; }
        .tm-table td { padding:.45rem .7rem; border-bottom:1px solid var(--border); vertical-align:top; line-height:1.6; }
        .tm-table tr:last-child td { border-bottom:none; }
        .tm-muted { color:var(--muted); font-size:.82rem; }

        /* ── Block header ── */
        .tm-block { margin-bottom:0; }
        .tm-block-header { padding:3rem 3rem 1.2rem; border-bottom:1px solid var(--border); background:linear-gradient(180deg,rgba(158,42,42,.03) 0%,transparent 100%); }
        .tm-block-label { font-family:var(--jp); font-size:2rem; color:var(--red); letter-spacing:.3em; display:block; margin-bottom:.4rem; }
        .tm-block-title { font-family:var(--serif, Georgia, serif); font-size:1.45rem; font-weight:700; }

        /* ── Lesson accordion ── */
        .tm-lesson { border-bottom:1px solid var(--border); background:var(--white); }
        .tm-lesson:last-child { border-bottom:none; }
        .tm-lesson-head {
          padding:1.3rem 3rem; display:grid;
          grid-template-columns:110px 1fr auto;
          gap:1.2rem; align-items:center; cursor:pointer; transition:background .15s;
          user-select:none;
        }
        .tm-lesson-head:hover { background:var(--paper-dark); }
        .tm-lbl { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.12em; color:var(--red); font-family:var(--mono, monospace); }
        .tm-ltitle { font-weight:600; font-size:1rem; }
        .tm-lgoal-inline { font-size:.8rem; color:var(--muted); font-style:italic; margin-top:.2rem; }
        .tm-toggle { font-family:var(--mono, monospace); font-size:.65rem; color:var(--muted); flex-shrink:0; }

        /* ── Lesson body ── */
        .tm-lesson-body { display:none; border-top:1px solid var(--border); }
        .tm-lesson-body.open { display:block; }
        .tm-goal-box { background:rgba(158,42,42,.05); border-left:3px solid var(--red); padding:1rem 1.6rem; font-size:.88rem; color:var(--muted); font-style:italic; line-height:1.8; margin:1.5rem 3rem 1rem; }

        /* ── Section ── */
        .tm-section { padding:1.2rem 3rem 0; }
        .tm-section:last-child { padding-bottom:2rem; }
        .tm-section-heading { font-weight:700; font-size:.95rem; margin-bottom:.8rem; padding-bottom:.4rem; border-bottom:1px solid var(--border); }

        /* ── Examples ── */
        .tm-examples { display:flex; flex-direction:column; gap:.5rem; margin-top:1rem; }
        .tm-ex { background:var(--paper-dark); padding:.8rem 1rem; border-radius:2px; }
        .tm-jp { font-family:var(--jp); font-size:1rem; display:block; margin-bottom:.25rem; line-height:1.8; }
        .tm-es { font-size:.8rem; color:var(--muted); font-style:italic; display:block; }

        /* ── Section body prose ── */
        .tm-section p { font-size:.9rem; color:var(--muted); line-height:1.85; margin-bottom:.6rem; }
        .tm-section strong { color:var(--ink); }

        @media(max-width:768px) {
          .tm-lesson-head { grid-template-columns:1fr auto; gap:.6rem; padding:1.1rem 1.4rem; }
          .tm-lbl { display:none; }
          .tm-block-header { padding:2rem 1.4rem 1rem; }
          .tm-section { padding:1rem 1.4rem 0; }
          .tm-section:last-child { padding-bottom:1.5rem; }
          .tm-goal-box { margin:1.2rem 1.4rem .8rem; }
        }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <div style={{ textAlign:"center", padding:"5rem 3rem 3rem", borderBottom:"1px solid var(--border)", background:"linear-gradient(180deg,rgba(158,42,42,.04) 0%,transparent 100%)", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(22,17,10,.025) 28px,rgba(22,17,10,.025) 29px)", pointerEvents:"none" }} />
        <span style={{ fontFamily:"var(--jp)", fontSize:"2.8rem", letterSpacing:".45em", color:"var(--red)", display:"block", marginBottom:".5rem", position:"relative" }}>日本語 N5</span>
        <h1 style={{ fontFamily:"var(--serif)", fontSize:"1.8rem", fontWeight:600, position:"relative" }}>Temario completo</h1>
        <p style={{ color:"var(--muted)", fontSize:".9rem", fontStyle:"italic", position:"relative", marginTop:".3rem" }}>28 lecciones · Todos los contenidos del nivel N5 organizados por bloques</p>
      </div>

      {/* ── BLOCKS ── */}
      {blocks.map(({ block, lessons }) => (
        <section key={block} className="tm-block reveal">
          <div className="tm-block-header">
            <p className="section-label">{block}</p>
            <div className="divider" />
          </div>
          <div style={{ border:"1px solid var(--border)", borderTop:"none" }}>
            {lessons.map(lesson => {
              const isOpen = openLesson === lesson.id
              return (
                <div key={lesson.id} className="tm-lesson">
                  <div className="tm-lesson-head" onClick={() => setOpenLesson(isOpen ? null : lesson.id)}>
                    <span className="tm-lbl">{lesson.label}</span>
                    <div>
                      <p className="tm-ltitle">{lesson.title}</p>
                      {!isOpen && <p className="tm-lgoal-inline">{lesson.goal}</p>}
                    </div>
                    <span className="tm-toggle">{isOpen ? "▲" : "▼"}</span>
                  </div>
                  <div className={`tm-lesson-body ${isOpen ? "open" : ""}`}>
                    <div className="tm-goal-box">{lesson.goal}</div>
                    {lesson.sections.map((sec, si) => (
                      <div key={si} className="tm-section">
                        {sec.heading && <p className="tm-section-heading">{sec.heading}</p>}
                        {sec.body}
                        {sec.examples?.length > 0 && (
                          <div className="tm-examples">
                            {sec.examples.map((ex, ei) => (
                              <div key={ei} className="tm-ex">
                                <span className="tm-jp">{ex.jp}</span>
                                <span className="tm-es">{ex.es}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}

      <div style={{ height:"3rem" }} />
    </>
  )
}