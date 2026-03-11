// KanjisPage.jsx — Página de kanjis N5
// Uso:
//   import Layout from "./Layout";
//   import KanjisPage from "./KanjisPage";
//   <Layout><KanjisPage /></Layout>

import { useState, useEffect, useRef } from "react";

/* ─── Datos ─── */
const SECTIONS = [
  { id:"numeros", label:"🔢 Números y Cantidades", kanjis:[
    {char:"一",meaning:"Uno",on:"イチ",kun:"ひと(つ)",str:1,ex:"一つ (hitotsu)",exs:"uno; 一度 (ichido) = una vez",logic:"Una sola línea horizontal. El número más simple posible.",parts:[["一","una línea = uno"]]},
    {char:"二",meaning:"Dos",on:"ニ",kun:"ふた(つ)",str:2,ex:"二つ (futatsu)",exs:"dos; 二日 (futsuka) = día 2",logic:"Dos líneas horizontales, una encima de la otra.",parts:[["二","dos líneas = dos"]]},
    {char:"三",meaning:"Tres",on:"サン",kun:"みっ(つ)",str:3,ex:"三つ (mittsu)",exs:"tres; 三日 (mikka) = día 3",logic:"Tres líneas horizontales. Pictograma directo.",parts:[["三","tres líneas = tres"]]},
    {char:"四",meaning:"Cuatro",on:"シ / ヨン",kun:"よっ(つ)",str:5,ex:"四つ (yottsu)",exs:"cuatro; 四日 (yokka) = día 4",logic:"Originalmente un pictograma de una nariz con dos fosas nasales.",parts:[["囗","recinto"],["儿","divisiones internas"]]},
    {char:"五",meaning:"Cinco",on:"ゴ",kun:"いつ(つ)",str:4,ex:"五つ (itsutsu)",exs:"cinco; 五日 (itsuka) = día 5",logic:"Deriva del pictograma de dos manos cruzadas.",parts:[["五","pictograma de manos / cinco"]]},
    {char:"六",meaning:"Seis",on:"ロク",kun:"むっ(つ)",str:4,ex:"六つ (muttsu)",exs:"seis; 六日 (muika) = día 6",logic:"Una casita 亠 y dos trazos abiertos. El seis es el número que 'entra' al segundo grupo.",parts:[["亠","casita/techo"],["儿","patas abiertas"]]},
    {char:"七",meaning:"Siete",on:"シチ / ナナ",kun:"なな(つ)",str:2,ex:"七つ (nanatsu)",exs:"siete; 七日 (nanoka) = día 7",logic:"Originalmente un pictograma de un cuchillo cortando.",parts:[["七","pictograma antiguo de 'cortar'"]]},
    {char:"八",meaning:"Ocho",on:"ハチ",kun:"やっ(つ)",str:2,ex:"八つ (yattsu)",exs:"ocho; 八日 (yooka) = día 8",logic:"Pictograma de algo que SE DIVIDE en dos partes.",parts:[["八","dividir / separarse en dos"]]},
    {char:"九",meaning:"Nueve",on:"キュウ / ク",kun:"ここの(つ)",str:2,ex:"九つ (kokonotsu)",exs:"nueve; 九日 (kokonoka) = día 9",logic:"Pictograma de un brazo doblado.",parts:[["九","brazo doblado / curva"]]},
    {char:"十",meaning:"Diez",on:"ジュウ",kun:"とお",str:2,ex:"十 (juu)",exs:"diez; 十日 (tooka) = día 10",logic:"Una cruz perfecta. La totalidad de los cuatro puntos cardinales.",parts:[["十","cruz = totalidad = diez"]]},
    {char:"百",meaning:"Cien",on:"ヒャク",kun:"—",str:6,ex:"百円 (hyakuen)",exs:"cien yenes; 三百 (sanbyaku) = 300",logic:"Arriba 一 (uno) y abajo 白 (blanco).",parts:[["一","uno"],["白","blanco/lleno"]]},
    {char:"千",meaning:"Mil",on:"セン",kun:"—",str:3,ex:"千円 (sen en)",exs:"mil yenes; 三千 (sanzen) = 3000",logic:"Arriba 人 (persona) ligeramente modificada, y debajo 十 (diez).",parts:[["人","persona (modificada)"],["十","diez"]]},
    {char:"万",meaning:"Diez mil",on:"マン",kun:"—",str:3,ex:"一万円 (ichiman en)",exs:"diez mil yenes",logic:"Pictograma antiguo de un escorpión. El 10.000 era 'infinito' en China antigua.",parts:[["万","pictograma antiguo = extensión total"]]},
    {char:"円",meaning:"Yen / Círculo",on:"エン",kun:"まる(い)",str:4,ex:"百円 (hyakuen)",exs:"cien yenes; 円い (marui) = redondo",logic:"Simplificación de 圓 (círculo completo). Las monedas son círculos.",parts:[["囗","recinto redondo"]]},
    {char:"半",meaning:"Mitad",on:"ハン",kun:"なか(ば)",str:5,ex:"三時半 (sanji han)",exs:"las tres y media; 半分 (hanbun) = la mitad",logic:"Arriba 八 (dividir) y abajo 牛 (vaca). Una vaca dividida en dos.",parts:[["八","dividir"],["牛","vaca"]]},
  ]},
  { id:"tiempo", label:"📅 Tiempo y Fechas", kanjis:[
    {char:"日",meaning:"Día / Sol",on:"ニチ / ジツ",kun:"ひ",str:4,ex:"日曜日 (nichiyōbi)",exs:"domingo; 毎日 (mainichi) = todos los días",logic:"Pictograma del sol: un círculo con una línea en el centro.",parts:[["日","pictograma del sol con núcleo"]]},
    {char:"月",meaning:"Mes / Luna",on:"ゲツ / ガツ",kun:"つき",str:4,ex:"月曜日 (getsuyōbi)",exs:"lunes; 先月 (sengetsu) = el mes pasado",logic:"Pictograma de la luna creciente. La luna mide los meses.",parts:[["月","pictograma de luna creciente"]]},
    {char:"年",meaning:"Año",on:"ネン",kun:"とし",str:6,ex:"今年 (kotoshi)",exs:"este año; 来年 (rainen) = el próximo año",logic:"Persona cargando una cosecha. La cosecha = el ciclo anual.",parts:[["年","persona con cosecha = ciclo anual"]]},
    {char:"時",meaning:"Hora / Tiempo",on:"ジ",kun:"とき",str:10,ex:"何時 (nanji)",exs:"¿qué hora?; 時々 (tokidoki) = a veces",logic:"Sol 日 + templo 寺. El templo que mide el sol = el reloj del templo.",parts:[["日","sol"],["寺","templo"]]},
    {char:"分",meaning:"Minuto / Dividir",on:"フン / プン",kun:"わか(る)",str:4,ex:"三十分 (sanjuppun)",exs:"treinta minutos; 自分 (jibun) = uno mismo",logic:"Arriba 八 (dividir) y abajo 刀 (cuchillo). Cortar = dividir el tiempo.",parts:[["八","dividir"],["刀","cuchillo"]]},
    {char:"午",meaning:"Mediodía",on:"ゴ",kun:"—",str:4,ex:"午前 (gozen)",exs:"AM; 午後 (gogo) = PM",logic:"Pictograma de un poste solar que marca el mediodía.",parts:[["午","gnomon solar = mediodía"]]},
    {char:"前",meaning:"Delante / Antes",on:"ゼン",kun:"まえ",str:9,ex:"午前 (gozen)",exs:"AM; 名前 (namae) = nombre",logic:"Pie + luna + cuchillo. Avanzar cortando el camino.",parts:[["止","pie"],["月","cuerpo"],["刀","espada"]]},
    {char:"後",meaning:"Después / Detrás",on:"ゴ / コウ",kun:"あと / うしろ",str:9,ex:"午後 (gogo)",exs:"PM; 後で (ato de) = después",logic:"Caminar + pequeño + pie retrasado. Alguien que se queda rezagado.",parts:[["彳","caminar"],["夂","pie retrasado"]]},
    {char:"毎",meaning:"Cada / Todo",on:"マイ",kun:"—",str:6,ex:"毎日 (mainichi)",exs:"todos los días; 毎週 (maishuu) = cada semana",logic:"Derivado de madre 母. La madre que hace algo todos los días.",parts:[["母","madre (modificada)"]]},
    {char:"今",meaning:"Ahora / Este",on:"コン / キン",kun:"いま",str:4,ex:"今日 (kyō)",exs:"hoy; 今週 (konshuu) = esta semana",logic:"Persona con una señal debajo. La persona que habla ahora.",parts:[["人","persona"],["一","señal = ahora"]]},
    {char:"先",meaning:"Antes / Primero",on:"セン",kun:"さき",str:6,ex:"先週 (senshuu)",exs:"la semana pasada; 先生 (sensei) = profesor",logic:"Tierra + persona que camina. La persona que ya fue adelante.",parts:[["土","tierra/camino"],["儿","persona en movimiento"]]},
    {char:"朝",meaning:"Mañana",on:"チョウ",kun:"あさ",str:12,ex:"今朝 (kesa)",exs:"esta mañana; 朝ご飯 = desayuno",logic:"Sol que sube + luna que se va. El amanecer.",parts:[["日","sol que sube"],["月","luna que se va"]]},
    {char:"夕",meaning:"Atardecer",on:"セキ",kun:"ゆう",str:3,ex:"夕方 (yūgata)",exs:"tarde; 夕食 (yūshoku) = cena",logic:"Pictograma de la luna a medias en el cielo al atardecer.",parts:[["夕","media luna del atardecer"]]},
    {char:"夜",meaning:"Noche",on:"ヤ",kun:"よる",str:8,ex:"今夜 (konya)",exs:"esta noche; 夜中 (yonaka) = medianoche",logic:"Techo + persona + atardecer. Una persona bajo techo al anochecer.",parts:[["亠","techo"],["人","persona"],["夕","atardecer"]]},
    {char:"春",meaning:"Primavera",on:"シュン",kun:"はる",str:9,ex:"春休み (haru yasumi)",exs:"vacaciones de primavera",logic:"Brotes que crecen + sol de abajo. El sol que hace brotar las plantas.",parts:[["艹","brotes/hierba"],["日","sol"]]},
    {char:"夏",meaning:"Verano",on:"カ",kun:"なつ",str:10,ex:"夏休み (natsu yasumi)",exs:"vacaciones de verano",logic:"Persona con máscara de festival y pies que danzan.",parts:[["頁","cabeza/máscara de festival"],["夊","pies danzando"]]},
    {char:"秋",meaning:"Otoño",on:"シュウ",kun:"あき",str:9,ex:"秋 (aki)",exs:"otoño; 秋分 = equinoccio de otoño",logic:"Cereal maduro + fuego. Los colores del otoño.",parts:[["禾","cereal maduro"],["火","fuego/color rojo"]]},
    {char:"冬",meaning:"Invierno",on:"トウ",kun:"ふゆ",str:5,ex:"冬休み (fuyu yasumi)",exs:"vacaciones de invierno",logic:"Extremos que se congelan. El camino que termina en el frío.",parts:[["夂","camino que termina"],["冫","hielo"]]},
    {char:"昨",meaning:"Ayer",on:"サク",kun:"—",str:9,ex:"昨日 (kinō)",exs:"ayer; 昨年 (sakunen) = el año pasado",logic:"Sol + algo que se corta de repente. El día que ya pasó.",parts:[["日","sol/día"],["乍","cortar/irse de repente"]]},
    {char:"去",meaning:"Pasar / Pasado",on:"キョ",kun:"さ(る)",str:5,ex:"去年 (kyonen)",exs:"el año pasado",logic:"Tierra + ir. Algo que se va por la tierra = que ya pasó.",parts:[["土","tierra/camino"],["厶","alejarse"]]},
  ]},
  { id:"direccion", label:"📍 Direcciones y Posiciones", kanjis:[
    {char:"上",meaning:"Arriba / Encima",on:"ジョウ",kun:"うえ / のぼる",str:3,ex:"上 (ue)",exs:"arriba; 上手 (jōzu) = hábil",logic:"Una línea base con algo que sobresale hacia ARRIBA.",parts:[["上","línea con marca hacia arriba"]]},
    {char:"下",meaning:"Abajo / Debajo",on:"カ / ゲ",kun:"した / くだ(さい)",str:3,ex:"下 (shita)",exs:"abajo; 地下 (chika) = subterráneo",logic:"Una línea base con algo que cuelga hacia ABAJO.",parts:[["下","línea con marca hacia abajo"]]},
    {char:"中",meaning:"Dentro / Centro",on:"チュウ",kun:"なか",str:4,ex:"中に (naka ni)",exs:"dentro de; 中国 (Chūgoku) = China",logic:"Una caja con una línea vertical exactamente en el centro.",parts:[["口","recinto/caja"],["｜","línea central"]]},
    {char:"外",meaning:"Fuera / Exterior",on:"ガイ",kun:"そと",str:5,ex:"外 (soto)",exs:"fuera; 外国 (gaikoku) = país extranjero",logic:"Atardecer/luna + bastón de adivino. Los adivinos trabajaban fuera de noche.",parts:[["夕","atardecer/luna"],["卜","bastón de adivino"]]},
    {char:"右",meaning:"Derecha",on:"ウ / ユウ",kun:"みぎ",str:5,ex:"右手 (migite)",exs:"mano derecha; 右折 (usetsu) = girar a la derecha",logic:"Mano + boca. La mano que lleva la comida a la boca = la dominante.",parts:[["ナ","mano"],["口","boca"]]},
    {char:"左",meaning:"Izquierda",on:"サ",kun:"ひだり",str:5,ex:"左手 (hidarite)",exs:"mano izquierda",logic:"Mano + herramienta 工.",parts:[["ナ","mano"],["工","herramienta"]]},
    {char:"東",meaning:"Este",on:"トウ",kun:"ひがし",str:8,ex:"東京 (Tōkyō)",exs:"Tokio; 東 (higashi) = este",logic:"Sol que atraviesa un árbol. El sol matutino sale por el este.",parts:[["日","sol"],["木","árbol"]]},
    {char:"西",meaning:"Oeste",on:"セイ / サイ",kun:"にし",str:6,ex:"西 (nishi)",exs:"oeste; 関西 (Kansai) = región de Osaka",logic:"Pictograma de un nido. Los pájaros vuelven al nido al atardecer.",parts:[["西","pictograma de nido de pájaro"]]},
    {char:"南",meaning:"Sur",on:"ナン",kun:"みなみ",str:9,ex:"南 (minami)",exs:"sur; 南口 = salida sur",logic:"Plantas que crecen hacia el sol del sur (hemisferio norte).",parts:[["十","crecimiento"],["南","plantas hacia el sol del sur"]]},
    {char:"北",meaning:"Norte",on:"ホク",kun:"きた",str:5,ex:"北 (kita)",exs:"norte; 北海道 (Hokkaidō) = isla del norte",logic:"Dos personas dándose la espalda. El norte era la dirección fría.",parts:[["比","dos personas de espaldas"]]},
    {char:"間",meaning:"Entre / Intervalo",on:"カン / ケン",kun:"あいだ",str:12,ex:"時間 (jikan)",exs:"tiempo; 間 (aida) = entre",logic:"Puerta 門 con sol 日. La luz que se cuela entre las puertas.",parts:[["門","puerta"],["日","sol/luz"]]},
  ]},
  { id:"naturaleza", label:"🌿 Naturaleza y Clima", kanjis:[
    {char:"山",meaning:"Montaña",on:"サン",kun:"やま",str:3,ex:"富士山 (Fujisan)",exs:"monte Fuji",logic:"Pictograma puro de tres picos de montaña.",parts:[["山","pictograma de tres picos"]]},
    {char:"川",meaning:"Río",on:"セン",kun:"かわ",str:3,ex:"川 (kawa)",exs:"río; 川辺 = orilla del río",logic:"Tres líneas verticales que fluyen hacia abajo.",parts:[["川","tres corrientes de agua fluyendo"]]},
    {char:"田",meaning:"Campo / Arrozal",on:"デン",kun:"た",str:5,ex:"田中 (Tanaka)",exs:"apellido; 田んぼ (tanbo) = arrozal",logic:"Pictograma de un arrozal dividido en parcelas.",parts:[["田","cuadrícula de arrozal visto desde arriba"]]},
    {char:"木",meaning:"Árbol / Madera",on:"モク / ボク",kun:"き",str:4,ex:"木曜日 (mokuyōbi)",exs:"jueves; 木 (ki) = árbol",logic:"Pictograma: tronco central, ramas arriba, raíces abajo.",parts:[["木","pictograma: raíces + tronco + ramas"]]},
    {char:"林",meaning:"Bosquecillo",on:"リン",kun:"はやし",str:8,ex:"林 (hayashi)",exs:"bosquecillo",logic:"Dos árboles 木 + 木 = bosquecillo.",parts:[["木","árbol"],["木","árbol"]]},
    {char:"森",meaning:"Bosque",on:"シン",kun:"もり",str:12,ex:"森 (mori)",exs:"bosque; 森林 (shinrin) = silvicultura",logic:"Tres árboles 木+木+木 = bosque denso.",parts:[["木","árbol"],["木","árbol"],["木","árbol"]]},
    {char:"花",meaning:"Flor",on:"カ",kun:"はな",str:7,ex:"花火 (hanabi)",exs:"fuegos artificiales",logic:"Planta 艹 + cambiar 化. Una planta que se transforma = florece.",parts:[["艹","hierba/planta"],["化","cambiar"]]},
    {char:"空",meaning:"Cielo / Vacío",on:"クウ",kun:"そら / から",str:8,ex:"空 (sora)",exs:"cielo; 空港 (kūkō) = aeropuerto",logic:"Caverna 穴 + trabajo 工. El agujero que se abre hacia arriba.",parts:[["穴","agujero/caverna"],["工","hacer"]]},
    {char:"雨",meaning:"Lluvia",on:"ウ",kun:"あめ",str:8,ex:"雨 (ame)",exs:"lluvia; 大雨 (ōame) = lluvia fuerte",logic:"Nube con gotas cayendo debajo.",parts:[["云","nube"],["灬","gotas de lluvia"]]},
    {char:"天",meaning:"Cielo / Paraíso",on:"テン",kun:"—",str:4,ex:"天気 (tenki)",exs:"tiempo atmosférico; 天ぷら = tempura",logic:"Grande 大 (persona con brazos abiertos) con una línea encima.",parts:[["大","persona con brazos abiertos"],["一","línea de arriba"]]},
    {char:"気",meaning:"Espíritu / Energía",on:"キ",kun:"—",str:6,ex:"元気 (genki)",exs:"enérgico; 天気 (tenki) = tiempo atmosférico",logic:"Vapor 气 + arroz 米. El vapor que sale del arroz al cocinarse.",parts:[["气","vapor/aire"],["米","arroz"]]},
    {char:"火",meaning:"Fuego",on:"カ",kun:"ひ",str:4,ex:"火曜日 (kayōbi)",exs:"martes; 火 (hi) = fuego",logic:"Pictograma de una llama con chispas.",parts:[["火","pictograma de llama con chispas"]]},
    {char:"水",meaning:"Agua",on:"スイ",kun:"みず",str:4,ex:"水曜日 (suiyōbi)",exs:"miércoles; 水 (mizu) = agua",logic:"Corriente central con trazos que fluyen a ambos lados.",parts:[["水","pictograma de agua fluyendo"]]},
    {char:"土",meaning:"Tierra / Suelo",on:"ド / ト",kun:"つち",str:3,ex:"土曜日 (doyōbi)",exs:"sábado; 土 (tsuchi) = tierra",logic:"Cruz con la barra horizontal en la parte baja = el suelo.",parts:[["土","línea de base = suelo"]]},
    {char:"石",meaning:"Piedra",on:"セキ / シャク",kun:"いし",str:5,ex:"石 (ishi)",exs:"piedra; 石川 (Ishikawa) = apellido",logic:"Acantilado 厂 + forma redonda 口. Una piedra que cae del acantilado.",parts:[["厂","acantilado"],["口","forma redonda"]]},
    {char:"風",meaning:"Viento",on:"フウ",kun:"かぜ",str:9,ex:"風 (kaze)",exs:"viento; 台風 (taifū) = tifón",logic:"Radical del viento + insecto. Los insectos vuelan con el viento.",parts:[["几","viento/aire"],["虫","insecto"]]},
    {char:"雪",meaning:"Nieve",on:"セツ",kun:"ゆき",str:11,ex:"雪 (yuki)",exs:"nieve; 大雪 = nevada fuerte",logic:"Lluvia 雨 + escoba. La lluvia que hay que barrer.",parts:[["雨","lluvia"],["彐","escoba"]]},
    {char:"犬",meaning:"Perro",on:"ケン",kun:"いぬ",str:4,ex:"犬 (inu)",exs:"perro; 子犬 (koinu) = cachorro",logic:"Grande 大 con un punto extra. Casi como una persona.",parts:[["大","grande"],["、","punto diferenciador"]]},
    {char:"猫",meaning:"Gato",on:"ビョウ",kun:"ねこ",str:11,ex:"猫 (neko)",exs:"gato; 子猫 (koneko) = gatito",logic:"Animal 犭 + brote de arroz 苗. El animal que caza en los arrozales.",parts:[["犭","animal (radical)"],["苗","brote de arroz"]]},
    {char:"魚",meaning:"Pescado / Pez",on:"ギョ",kun:"さかな",str:11,ex:"魚 (sakana)",exs:"pescado; 金魚 (kingyo) = pez dorado",logic:"Pictograma de un pez: cabeza, cuerpo, cola.",parts:[["⺈","cabeza"],["田","cuerpo"],["灬","cola"]]},
    {char:"牛",meaning:"Vaca / Buey",on:"ギュウ",kun:"うし",str:4,ex:"牛乳 (gyūnyū)",exs:"leche; 牛肉 (gyūniku) = carne de vaca",logic:"Pictograma de la cabeza de una vaca: cuernos arriba.",parts:[["牛","pictograma de cabeza de vaca"]]},
    {char:"鳥",meaning:"Pájaro",on:"チョウ",kun:"とり",str:11,ex:"鳥 (tori)",exs:"pájaro; 小鳥 (kotori) = pajarito",logic:"Pictograma de un pájaro completo. Los cuatro puntos son las patas.",parts:[["鳥","pictograma de pájaro completo"]]},
  ]},
  { id:"personas", label:"👤 Personas y Familia", kanjis:[
    {char:"人",meaning:"Persona",on:"ジン / ニン",kun:"ひと",str:2,ex:"日本人 (nihonjin)",exs:"japonés; 人々 = las personas",logic:"Pictograma de una persona vista de lado, caminando.",parts:[["人","pictograma de persona"]]},
    {char:"女",meaning:"Mujer / Chica",on:"ジョ / ニョ",kun:"おんな",str:3,ex:"女の子 (onnanoko)",exs:"chica; 女性 (josei) = mujer adulta",logic:"Figura arrodillada con brazos cruzados. Solo 3 trazos.",parts:[["女","pictograma de figura femenina"]]},
    {char:"男",meaning:"Hombre / Chico",on:"ダン / ナン",kun:"おとこ",str:7,ex:"男の子 (otokonoko)",exs:"chico; 男性 (dansei) = hombre adulto",logic:"Campo 田 + fuerza 力. El que trabaja con fuerza en el campo.",parts:[["田","campo/arrozal"],["力","fuerza"]]},
    {char:"子",meaning:"Niño / Hijo",on:"シ / ス",kun:"こ",str:3,ex:"子供 (kodomo)",exs:"niño/a; 子猫 (koneko) = gatito",logic:"Pictograma de un bebé con brazos extendidos.",parts:[["子","pictograma de bebé"]]},
    {char:"父",meaning:"Padre",on:"フ",kun:"ちち",str:4,ex:"父 (chichi)",exs:"(mi) padre; お父さん (otōsan) = papá",logic:"Mano sosteniendo un palo/vara. El padre = autoridad.",parts:[["父","mano con bastón de autoridad"]]},
    {char:"母",meaning:"Madre",on:"ボ",kun:"はは",str:5,ex:"母 (haha)",exs:"(mi) madre; お母さん (okāsan) = mamá",logic:"Figura femenina 女 con dos puntos = los pechos.",parts:[["女","mujer (modificada)"],["・・","pechos"]]},
    {char:"兄",meaning:"Hermano mayor",on:"ケイ / キョウ",kun:"あに",str:5,ex:"お兄さん (oniisan)",exs:"hermano mayor; 兄弟 (kyōdai) = hermanos",logic:"Boca 口 + persona 儿. El que habla con autoridad.",parts:[["口","boca grande"],["儿","persona"]]},
    {char:"姉",meaning:"Hermana mayor",on:"シ",kun:"あね",str:8,ex:"お姉さん (oneesan)",exs:"hermana mayor",logic:"Mujer 女 + mercado 市. La mujer que va al mercado.",parts:[["女","mujer"],["市","mercado"]]},
    {char:"弟",meaning:"Hermano menor",on:"テイ",kun:"おとうと",str:7,ex:"弟 (otōto)",exs:"(mi) hermano menor",logic:"Un hilo enrollado. El más joven rodeado por los mayores.",parts:[["弓","arco/cuerda"],["丨","palo central"]]},
    {char:"妹",meaning:"Hermana menor",on:"マイ",kun:"いもうと",str:8,ex:"妹 (imōto)",exs:"(mi) hermana menor",logic:"Mujer 女 + árbol joven 未. La mujer que aún no está madura.",parts:[["女","mujer"],["未","no maduro/joven"]]},
    {char:"友",meaning:"Amigo/a",on:"ユウ",kun:"とも",str:4,ex:"友達 (tomodachi)",exs:"amigo/a; 友人 (yūjin) = amigo (formal)",logic:"Dos manos = dos personas que se estrechan la mano.",parts:[["又","mano derecha"],["又","otra mano"]]},
    {char:"私",meaning:"Yo",on:"シ",kun:"わたし",str:7,ex:"私は… (watashi wa…)",exs:"yo soy…; 私立 (shiritsu) = privado",logic:"Cereal 禾 + privado 厶. Mi cereal, mi propiedad = yo.",parts:[["禾","cereal/trigo"],["厶","privado"]]},
    {char:"名",meaning:"Nombre / Fama",on:"メイ / ミョウ",kun:"な",str:6,ex:"名前 (namae)",exs:"nombre; 有名 (yūmei) = famoso",logic:"Atardecer 夕 + boca 口. De noche hay que decir tu nombre.",parts:[["夕","atardecer/oscuridad"],["口","boca"]]},
  ]},
  { id:"acciones", label:"⚡ Acciones y Verbos", kanjis:[
    {char:"食",meaning:"Comer / Comida",on:"ショク",kun:"たべる",str:9,ex:"食べ物 (tabemono)",exs:"comida; 食堂 (shokudō) = comedor",logic:"Tapa sobre algo bueno. Un cuenco tapado.",parts:[["亼","tapa"],["良","bueno"]]},
    {char:"飲",meaning:"Beber",on:"イン",kun:"のむ",str:12,ex:"飲み物 (nomimono)",exs:"bebida; 飲む (nomu) = beber",logic:"Comida 飠 + boca abierta 欠. Alguien abre la boca para recibir líquido.",parts:[["飠","comida"],["欠","boca abierta"]]},
    {char:"見",meaning:"Ver / Mirar",on:"ケン",kun:"みる",str:7,ex:"見る (miru)",exs:"ver; 見物 (kenbutsu) = ir a ver algo",logic:"Ojo 目 sobre persona 儿.",parts:[["目","ojo"],["儿","persona"]]},
    {char:"行",meaning:"Ir",on:"コウ / ギョウ",kun:"いく",str:6,ex:"行く (iku)",exs:"ir; 旅行 (ryokō) = viaje",logic:"Pictograma de una encrucijada de caminos.",parts:[["行","pictograma de cruce de caminos"]]},
    {char:"来",meaning:"Venir",on:"ライ",kun:"くる",str:7,ex:"来る (kuru)",exs:"venir; 来週 = la próxima semana",logic:"Árbol de trigo maduro con espigas cargadas.",parts:[["来","árbol con espigas"]]},
    {char:"帰",meaning:"Volver / Regresar",on:"キ",kun:"かえる",str:10,ex:"帰る (kaeru)",exs:"volver; 帰国 (kikoku) = volver al país",logic:"Camino + escoba. Limpiar el camino de vuelta a casa.",parts:[["彳","camino"],["帚","escoba"]]},
    {char:"読",meaning:"Leer",on:"ドク",kun:"よむ",str:14,ex:"読む (yomu)",exs:"leer; 読書 (dokusho) = lectura",logic:"Palabras 言 + vender 売. Las palabras que se intercambian.",parts:[["言","palabras"],["売","intercambiar"]]},
    {char:"書",meaning:"Escribir",on:"ショ",kun:"かく",str:10,ex:"書く (kaku)",exs:"escribir; 書道 (shodō) = caligrafía",logic:"Pincel 聿 + base 曰. El pincel que traza sobre una superficie.",parts:[["聿","pincel"],["曰","base/papel"]]},
    {char:"聞",meaning:"Escuchar",on:"ブン / モン",kun:"きく",str:14,ex:"聞く (kiku)",exs:"escuchar; 新聞 (shinbun) = periódico",logic:"Puerta 門 + oreja 耳. Oreja pegada a la puerta.",parts:[["門","puerta"],["耳","oreja"]]},
    {char:"話",meaning:"Hablar",on:"ワ",kun:"はなす",str:13,ex:"話す (hanasu)",exs:"hablar; 電話 (denwa) = teléfono",logic:"Palabras 言 + lengua 舌. La lengua que pronuncia palabras.",parts:[["言","palabras"],["舌","lengua"]]},
    {char:"言",meaning:"Decir / Palabra",on:"ゲン / ゴン",kun:"いう",str:7,ex:"言う (iu)",exs:"decir; 言葉 (kotoba) = palabra",logic:"Boca 口 con líneas de sonido encima.",parts:[["言","boca con ondas de sonido"]]},
    {char:"起",meaning:"Levantarse",on:"キ",kun:"おきる",str:10,ex:"起きる (okiru)",exs:"levantarse; 早起き = madrugar",logic:"Correr/ir 走 + cuerpo 己. El cuerpo que empieza a moverse.",parts:[["走","correr"],["己","cuerpo"]]},
    {char:"寝",meaning:"Dormir",on:"シン",kun:"ねる",str:13,ex:"寝る (neru)",exs:"dormir; 寝室 (shinshitsu) = dormitorio",logic:"Techo 宀 + persona acostada. Tumbada dentro de casa.",parts:[["宀","techo/casa"]]},
    {char:"使",meaning:"Usar",on:"シ",kun:"つかう",str:8,ex:"使う (tsukau)",exs:"usar; 大使 (taishi) = embajador",logic:"Persona 人 + funcionario 吏. Una persona que hace trabajar.",parts:[["イ","persona"],["吏","funcionario"]]},
    {char:"買",meaning:"Comprar",on:"バイ",kun:"かう",str:12,ex:"買い物 (kaimono)",exs:"ir de compras; 売買 = compraventa",logic:"Red 罒 + concha/dinero 貝. Atrapar con dinero.",parts:[["罒","red"],["貝","concha = dinero"]]},
    {char:"売",meaning:"Vender",on:"バイ",kun:"うる",str:7,ex:"売る (uru)",exs:"vender; 売店 (baiten) = quiosco",logic:"Persona + red. El que pone cosas para que otros las compren.",parts:[["士","persona"],["买","poner en red"]]},
    {char:"好",meaning:"Gustar / Querer",on:"コウ",kun:"すき",str:6,ex:"好き (suki)",exs:"gustar; 大好き (daisuki) = amar mucho",logic:"Mujer 女 + niño 子. Madre con su hijo = amor.",parts:[["女","mujer/madre"],["子","niño"]]},
    {char:"乗",meaning:"Subir / Montar",on:"ジョウ",kun:"のる",str:9,ex:"乗る (noru)",exs:"subir; 乗車 (jōsha) = embarcar",logic:"Árbol 木 con una persona encima.",parts:[["木","árbol"],["人","persona arriba"]]},
    {char:"歩",meaning:"Caminar",on:"ホ",kun:"あるく",str:8,ex:"歩く (aruku)",exs:"caminar; 散歩 (sanpo) = dar un paseo",logic:"Pie 止 + otra pierna. Dos piernas en movimiento alternado.",parts:[["止","pie/paso"]]},
    {char:"走",meaning:"Correr",on:"ソウ",kun:"はしる",str:7,ex:"走る (hashiru)",exs:"correr; 競走 (kyōsō) = carrera",logic:"Tierra + persona que se mueve rápido.",parts:[["土","tierra"],["人","persona"]]},
    {char:"働",meaning:"Trabajar",on:"ドウ",kun:"はたらく",str:13,ex:"働く (hataraku)",exs:"trabajar; 労働 (rōdō) = labor",logic:"Persona + movimiento pesado. Mover cosas pesadas.",parts:[["イ","persona"],["動","movimiento"]]},
  ]},
  { id:"lugares", label:"🏠 Lugares y Edificios", kanjis:[
    {char:"家",meaning:"Casa / Familia",on:"カ / ケ",kun:"いえ / うち",str:10,ex:"家族 (kazoku)",exs:"familia; お家 (ouchi) = mi casa",logic:"Techo 宀 + cerdo 豕. En la antigua China, cerdo bajo techo = hogar próspero.",parts:[["宀","techo"],["豕","cerdo"]]},
    {char:"学",meaning:"Estudiar",on:"ガク",kun:"まなぶ",str:8,ex:"学校 (gakkō)",exs:"escuela; 学生 = estudiante",logic:"Manos que enseñan + niño 子 bajo un techo.",parts:[["爻","manos que enseñan"],["宀","techo"],["子","niño"]]},
    {char:"校",meaning:"Escuela",on:"コウ",kun:"—",str:10,ex:"学校 (gakkō)",exs:"escuela; 高校 (kōkō) = bachillerato",logic:"Árbol 木 + cruce 交. Las vigas de la estructura del edificio.",parts:[["木","madera"],["交","cruzar"]]},
    {char:"駅",meaning:"Estación de tren",on:"エキ",kun:"—",str:14,ex:"東京駅 (Tōkyō-eki)",exs:"Estación de Tokio",logic:"Caballo 馬 + distancia 尺. El punto de cambio de caballos.",parts:[["馬","caballo"],["尺","medida"]]},
    {char:"店",meaning:"Tienda",on:"テン",kun:"みせ",str:8,ex:"店 (mise)",exs:"tienda",logic:"Cobertizo 广 + adivino 占. El que predice tus necesidades.",parts:[["广","cobertizo"],["占","predecir"]]},
    {char:"会",meaning:"Reunión / Encontrarse",on:"カイ / エ",kun:"あう",str:6,ex:"会う (au)",exs:"encontrarse; 会社 (kaisha) = empresa",logic:"Personas que se juntan bajo el mismo techo.",parts:[["合","juntar"],["会","lugar de reunión"]]},
    {char:"社",meaning:"Empresa / Santuario",on:"シャ",kun:"やしろ",str:7,ex:"会社 (kaisha)",exs:"empresa; 社長 (shachō) = director",logic:"Espíritu 示 + tierra 土. El lugar sagrado en la tierra.",parts:[["示","espíritu"],["土","tierra"]]},
    {char:"国",meaning:"País",on:"コク",kun:"くに",str:8,ex:"中国 (Chūgoku)",exs:"China; 外国 = país extranjero",logic:"Recinto 囗 + territorio valioso 玉.",parts:[["囗","murallas"],["玉","territorio"]]},
    {char:"寺",meaning:"Templo budista",on:"ジ",kun:"てら",str:6,ex:"お寺 (otera)",exs:"templo; 寺院 (jiin) = templo (formal)",logic:"Tierra 土 + mano con instrumento 寸. Manos que construyen.",parts:[["土","tierra"],["寸","mano"]]},
    {char:"病",meaning:"Enfermedad",on:"ビョウ",kun:"やむ",str:10,ex:"病気 (byōki)",exs:"enfermedad; 病院 (byōin) = hospital",logic:"Cama de enfermo 疒 + persona dentro.",parts:[["疒","cama de enfermo"],["丙","persona"]]},
    {char:"院",meaning:"Institución",on:"イン",kun:"—",str:10,ex:"病院 (byōin)",exs:"hospital; 大学院 = posgrado",logic:"Edificio elevado + patio cerrado. Institución con patio.",parts:[["阜","edificio elevado"],["完","patio"]]},
  ]},
  { id:"descripcion", label:"✨ Descripción y Cualidades", kanjis:[
    {char:"大",meaning:"Grande",on:"ダイ / オオ",kun:"おおきい",str:3,ex:"大きい (ōkii)",exs:"grande; 大学 = universidad",logic:"Pictograma de una persona con los brazos muy abiertos.",parts:[["大","persona con brazos abiertos"]]},
    {char:"小",meaning:"Pequeño",on:"ショウ",kun:"ちいさい",str:3,ex:"小さい (chiisai)",exs:"pequeño; 小学校 = escuela primaria",logic:"Línea central con dos puntitos a los lados.",parts:[["小","línea con puntitos pequeños"]]},
    {char:"高",meaning:"Alto / Caro",on:"コウ",kun:"たかい",str:10,ex:"高い (takai)",exs:"alto/caro; 高校 = bachillerato",logic:"Una torre o pagoda alta de varios pisos.",parts:[["高","pagoda/torre alta"]]},
    {char:"安",meaning:"Barato / Tranquilo",on:"アン",kun:"やすい",str:6,ex:"安い (yasui)",exs:"barato; 安心 (anshin) = tranquilidad",logic:"Techo 宀 + mujer 女. Una mujer bajo su techo = seguridad.",parts:[["宀","techo"],["女","mujer"]]},
    {char:"新",meaning:"Nuevo",on:"シン",kun:"あたらしい",str:13,ex:"新しい (atarashii)",exs:"nuevo; 新幹線 = Shinkansen",logic:"Árbol + hacha. Cortar un árbol nuevo = madera fresca.",parts:[["木","árbol"],["斤","hacha"]]},
    {char:"古",meaning:"Viejo / Antiguo",on:"コ",kun:"ふるい",str:5,ex:"古い (furui)",exs:"viejo; 古典 (koten) = clásico",logic:"Diez 十 generaciones + boca 口. Lo que ha pasado de boca en boca.",parts:[["十","diez generaciones"],["口","boca"]]},
    {char:"白",meaning:"Blanco",on:"ハク",kun:"しろ / しろい",str:5,ex:"白い (shiroi)",exs:"blanco; 白黒 = blanco y negro",logic:"Sol 日 con un rayo. El primer rayo de luz.",parts:[["日","sol"],["、","rayo de luz"]]},
    {char:"黒",meaning:"Negro",on:"コク",kun:"くろ / くろい",str:11,ex:"黒い (kuroi)",exs:"negro; 黒板 (kokuban) = pizarra",logic:"Fuego + tierra. El hollín que deja el fuego.",parts:[["炎","fuego"],["土","tierra + hollín"]]},
    {char:"赤",meaning:"Rojo",on:"セキ",kun:"あか / あかい",str:7,ex:"赤い (akai)",exs:"rojo; 赤ちゃん = bebé",logic:"Grande 大 (persona) + fuego. Una persona en llamas.",parts:[["大","persona grande"],["火","fuego"]]},
    {char:"青",meaning:"Azul / Verde",on:"セイ",kun:"あお / あおい",str:8,ex:"青い (aoi)",exs:"azul; 青空 (aozora) = cielo azul",logic:"Planta que brota 生 + luna 月. El color de la naturaleza.",parts:[["生","planta que brota"],["月","luna"]]},
    {char:"長",meaning:"Largo / Jefe",on:"チョウ",kun:"なが(い)",str:8,ex:"長い (nagai)",exs:"largo; 社長 (shachō) = director",logic:"Anciano con el pelo largo. Pelo largo = tiempo = mayor.",parts:[["長","anciano con pelo largo"]]},
    {char:"短",meaning:"Corto",on:"タン",kun:"みじか(い)",str:12,ex:"短い (mijikai)",exs:"corto; 短所 (tansho) = defecto",logic:"Flecha 矢 + recipiente 豆. La flecha que no llega al fondo.",parts:[["矢","flecha"],["豆","recipiente"]]},
    {char:"早",meaning:"Temprano / Rápido",on:"ソウ",kun:"はや(い)",str:6,ex:"早い (hayai)",exs:"temprano; 早起き = madrugar",logic:"Sol 日 que sale sobre un tallo. El amanecer.",parts:[["日","sol"],["十","horizonte"]]},
    {char:"多",meaning:"Mucho / Muchos",on:"タ",kun:"おおい",str:6,ex:"多い (ōi)",exs:"muchos; 多分 (tabun) = probablemente",logic:"Dos lunas crecientes 夕+夕. Muchas lunas = muchos días.",parts:[["夕","luna"],["夕","luna"]]},
    {char:"少",meaning:"Poco / Joven",on:"ショウ",kun:"すく(ない)",str:4,ex:"少し (sukoshi)",exs:"un poco; 少年 (shōnen) = chico joven",logic:"Pequeño 小 dividido aún más.",parts:[["小","pequeño"],["丿","trazo divisor"]]},
    {char:"明",meaning:"Brillante / Claro",on:"メイ / ミョウ",kun:"あかるい",str:8,ex:"明るい (akarui)",exs:"brillante; 明日 (ashita) = mañana",logic:"Sol 日 + luna 月. Cuando los dos brillan juntos = máxima claridad.",parts:[["日","sol"],["月","luna"]]},
    {char:"暗",meaning:"Oscuro",on:"アン",kun:"くら(い)",str:13,ex:"暗い (kurai)",exs:"oscuro; 暗記 (anki) = memorizar",logic:"Sol 日 + sonido 音. El sol que solo da ruido, sin luz.",parts:[["日","sol"],["音","sonido"]]},
    {char:"広",meaning:"Amplio",on:"コウ",kun:"ひろ(い)",str:5,ex:"広い (hiroi)",exs:"espacioso; 広告 (kōkoku) = publicidad",logic:"Cobertizo abierto 广 sin paredes.",parts:[["广","cobertizo abierto"]]},
    {char:"強",meaning:"Fuerte",on:"キョウ",kun:"つよ(い)",str:11,ex:"強い (tsuyoi)",exs:"fuerte; 勉強 (benkyō) = estudiar",logic:"Arco 弓 + insecto con caparazón 虫.",parts:[["弓","arco"],["虫","insecto"]]},
    {char:"弱",meaning:"Débil",on:"ジャク",kun:"よわ(い)",str:10,ex:"弱い (yowai)",exs:"débil; 弱点 (jakuten) = punto débil",logic:"Dos arcos 弓+弓 con los extremos caídos.",parts:[["弓","arco"],["弓","arco caído"]]},
  ]},
  { id:"estudio", label:"📚 Estudio y Comunicación", kanjis:[
    {char:"語",meaning:"Idioma / Palabra",on:"ゴ",kun:"—",str:14,ex:"日本語 (nihongo)",exs:"japonés; 英語 (eigo) = inglés",logic:"Hablar 言 + yo 吾. Mis palabras = mi idioma.",parts:[["言","palabras"],["吾","yo"]]},
    {char:"文",meaning:"Texto / Escritura",on:"ブン",kun:"—",str:4,ex:"文法 (bunpō)",exs:"gramática; 作文 (sakubun) = composición",logic:"Pictograma de un hombre con un tatuaje en el pecho.",parts:[["文","persona con marcas"]]},
    {char:"字",meaning:"Letra / Kanji",on:"ジ",kun:"—",str:6,ex:"漢字 (kanji)",exs:"kanji; 文字 (moji) = letra",logic:"Techo 宀 + hijo 子. Un niño bajo techo aprendiendo.",parts:[["宀","techo/escuela"],["子","niño"]]},
    {char:"漢",meaning:"Chino / Han",on:"カン",kun:"—",str:13,ex:"漢字 (kanji)",exs:"kanji; 漢方 (kanpō) = medicina china",logic:"Agua 氵 + magnificencia. El gran río Han de China.",parts:[["氵","agua/río"],["堇","magnificencia"]]},
    {char:"勉",meaning:"Esforzarse",on:"ベン",kun:"—",str:10,ex:"勉強 (benkyō)",exs:"estudiar",logic:"Obligar/forzar 免 + fuerza 力.",parts:[["免","obligar"],["力","fuerza"]]},
    {char:"問",meaning:"Pregunta",on:"モン",kun:"とう",str:11,ex:"質問 (shitsumon)",exs:"pregunta; 問題 (mondai) = problema",logic:"Puerta 門 + boca 口. La boca en la puerta preguntando.",parts:[["門","puerta"],["口","boca"]]},
    {char:"答",meaning:"Respuesta",on:"トウ",kun:"こたえる",str:12,ex:"答え (kotae)",exs:"respuesta; 回答 (kaitō) = contestación",logic:"Bambú 竹 + adecuado 合. Tablillas de bambú con la respuesta.",parts:[["竹","bambú"],["合","adecuado"]]},
  ]},
  { id:"cuerpo", label:"🫀 Cuerpo y Salud", kanjis:[
    {char:"体",meaning:"Cuerpo",on:"タイ",kun:"からだ",str:7,ex:"体 (karada)",exs:"cuerpo; 体温 (taion) = temperatura",logic:"Persona 人 + raíz 本. La persona con su raíz.",parts:[["イ","persona"],["本","raíz"]]},
    {char:"頭",meaning:"Cabeza",on:"トウ / ズ",kun:"あたま",str:16,ex:"頭 (atama)",exs:"cabeza; 頭痛 (zutsū) = dolor de cabeza",logic:"Frijol redondo + cabeza. Como un frijol encima del cuerpo.",parts:[["豆","frijol"],["頁","cabeza/página"]]},
    {char:"目",meaning:"Ojo",on:"モク / ボク",kun:"め",str:5,ex:"目 (me)",exs:"ojo; 目医者 = oftalmólogo",logic:"Pictograma de un ojo con su pupila.",parts:[["目","pictograma de ojo"]]},
    {char:"耳",meaning:"Oreja",on:"ジ",kun:"みみ",str:6,ex:"耳 (mimi)",exs:"oreja",logic:"Pictograma de una oreja vista de frente.",parts:[["耳","pictograma de oreja"]]},
    {char:"口",meaning:"Boca",on:"コウ / ク",kun:"くち",str:3,ex:"口 (kuchi)",exs:"boca; 出口 (deguchi) = salida",logic:"Pictograma simple de una boca abierta.",parts:[["口","pictograma de boca"]]},
    {char:"手",meaning:"Mano",on:"シュ",kun:"て",str:4,ex:"手 (te)",exs:"mano; 手紙 (tegami) = carta",logic:"Pictograma de una mano con cinco dedos.",parts:[["手","pictograma de mano"]]},
    {char:"足",meaning:"Pie / Pierna",on:"ソク",kun:"あし",str:7,ex:"足 (ashi)",exs:"pie/pierna; 足元 = a los pies",logic:"Rodilla 口 + pie 止. La pierna completa.",parts:[["口","rodilla"],["止","pie"]]},
    {char:"心",meaning:"Corazón / Mente",on:"シン",kun:"こころ",str:4,ex:"心 (kokoro)",exs:"corazón; 心配 (shinpai) = preocupación",logic:"Pictograma de un corazón latiendo.",parts:[["心","corazón latiendo"]]},
    {char:"顔",meaning:"Cara",on:"ガン",kun:"かお",str:18,ex:"顔 (kao)",exs:"cara; 顔色 (kaoiro) = expresión",logic:"Cabeza + rasgos marcados. La cara con todos sus detalles.",parts:[["頁","cabeza"],["彦","rasgos"]]},
  ]},
  { id:"transporte", label:"🚃 Transporte y Viajes", kanjis:[
    {char:"電",meaning:"Electricidad",on:"デン",kun:"—",str:13,ex:"電車 (densha)",exs:"tren; 電話 (denwa) = teléfono",logic:"Lluvia 雨 + relámpago 申. El rayo que cae con la lluvia.",parts:[["雨","lluvia"],["申","relámpago"]]},
    {char:"車",meaning:"Coche / Vehículo",on:"シャ",kun:"くるま",str:7,ex:"電車 (densha)",exs:"tren; 自動車 = coche",logic:"Pictograma de una rueda con su eje visto desde arriba.",parts:[["車","pictograma de rueda"]]},
    {char:"道",meaning:"Camino / Vía",on:"ドウ",kun:"みち",str:12,ex:"道 (michi)",exs:"camino; 神道 (shintō) = sintoísmo",logic:"Cabeza 首 que avanza 辶. La cabeza que sigue el camino.",parts:[["首","cabeza"],["辶","avanzar"]]},
    {char:"旅",meaning:"Viaje",on:"リョ",kun:"たび",str:10,ex:"旅行 (ryokō)",exs:"viaje",logic:"Bandera + grupo que camina. Viajeros con su bandera.",parts:[["方","bandera/dirección"]]},
    {char:"駅",meaning:"Estación",on:"エキ",kun:"—",str:14,ex:"東京駅 (Tōkyō-eki)",exs:"Estación de Tokio",logic:"Caballo 馬 + distancia 尺. Punto de parada.",parts:[["馬","caballo"],["尺","medida"]]},
    {char:"船",meaning:"Barco",on:"セン",kun:"ふね",str:11,ex:"船 (fune)",exs:"barco; 船旅 = viaje en barco",logic:"Bote 舟 + personas. Un bote con gente a bordo.",parts:[["舟","bote"],["八","personas"]]},
    {char:"線",meaning:"Línea / Vía",on:"セン",kun:"—",str:15,ex:"新幹線 (Shinkansen)",exs:"tren bala; 番線 (bansen) = andén",logic:"Hilo 糸 + manantial 泉. El hilo de agua que fluye = línea.",parts:[["糸","hilo"],["泉","manantial"]]},
  ]},
  { id:"comida", label:"🍱 Comida y Objetos", kanjis:[
    {char:"茶",meaning:"Té",on:"チャ",kun:"—",str:9,ex:"お茶 (ocha)",exs:"té; 紅茶 = té negro; 茶色 = marrón",logic:"Hierba 艹 + árbol 木. La hierba del árbol del té.",parts:[["艹","hierba"],["木","árbol"]]},
    {char:"肉",meaning:"Carne",on:"ニク",kun:"—",str:6,ex:"牛肉 (gyūniku)",exs:"carne de vaca; 豚肉 = cerdo",logic:"Pictograma de un trozo de carne con fibras musculares.",parts:[["肉","pictograma de carne"]]},
    {char:"米",meaning:"Arroz",on:"ベイ / マイ",kun:"こめ",str:6,ex:"白米 (hakumai)",exs:"arroz blanco; 米国 = EE.UU.",logic:"Pictograma de una planta de arroz con granos dispersándose.",parts:[["米","planta de arroz con granos"]]},
    {char:"本",meaning:"Libro / Origen",on:"ホン",kun:"もと",str:5,ex:"本 (hon)",exs:"libro; 日本 (Nihon) = Japón",logic:"Árbol 木 con la raíz marcada. La raíz = origen.",parts:[["木","árbol"],["一","línea que marca la raíz"]]},
    {char:"薬",meaning:"Medicamento",on:"ヤク",kun:"くすり",str:16,ex:"薬 (kusuri)",exs:"medicina; 薬局 (yakkyoku) = farmacia",logic:"Hierbas 艹 + alegría 楽. Las hierbas que traen alivio.",parts:[["艹","hierbas"],["楽","alegría"]]},
  ]},
];

/* ─── Component ─── */
export default function KanjisPage() {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");
  const [open, setOpen]       = useState(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.05 }
    );
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const q = search.toLowerCase();
  const filtered = SECTIONS.map(sec => ({
    ...sec,
    kanjis: sec.kanjis.filter(k => {
      if (filter !== "all" && sec.id !== filter) return false;
      if (!q) return true;
      return [k.char, k.meaning, k.on, k.kun, k.ex, k.exs, k.logic]
        .join(" ").toLowerCase().includes(q);
    })
  })).filter(sec => sec.kanjis.length > 0);

  const total = filtered.reduce((a, s) => a + s.kanjis.length, 0);
  const allTotal = SECTIONS.reduce((a, s) => a + s.kanjis.length, 0);

  const filterButtons = [
    { id: "all", label: "Todos" },
    { id: "numeros",     label: "🔢 Números" },
    { id: "tiempo",      label: "📅 Tiempo" },
    { id: "direccion",   label: "📍 Dirección" },
    { id: "naturaleza",  label: "🌿 Naturaleza" },
    { id: "personas",    label: "👤 Personas" },
    { id: "acciones",    label: "⚡ Acciones" },
    { id: "lugares",     label: "🏠 Lugares" },
    { id: "comida",      label: "🍱 Comida" },
    { id: "descripcion", label: "✨ Descripción" },
    { id: "estudio",     label: "📚 Estudio" },
    { id: "cuerpo",      label: "🫀 Cuerpo" },
    { id: "transporte",  label: "🚃 Transporte" },
  ];

  return (
    <>
      <style>{`
        /* Page-specific styles */
        .kp-hero {
          text-align: center;
          padding: 5rem 3rem 3rem;
          border-bottom: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(158,42,42,0.04) 0%, transparent 100%);
          position: relative;
        }
        .kp-hero::before {
          content: "";
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(22,17,10,0.025) 28px, rgba(22,17,10,0.025) 29px);
          pointer-events: none;
        }
        .kp-super {
          font-family: var(--jp); font-size: 2.8rem;
          letter-spacing: .45em; color: var(--red);
          display: block; margin-bottom: .5rem; position: relative;
        }
        .kp-hero h1 { font-family: var(--serif); font-size: 1.8rem; font-weight: 600; position: relative; }
        .kp-sub { color: var(--muted); font-size: .88rem; font-style: italic; position: relative; margin-top: .3rem; }
        .kp-badge {
          display: inline-block; background: var(--red); color: #fff;
          font-size: .68rem; border-radius: 20px; padding: .15rem .65rem;
          margin-left: .5rem; vertical-align: middle; font-family: var(--mono);
          letter-spacing: .04em;
        }
        .kp-controls {
          max-width: 1200px; margin: 0 auto; padding: 1.4rem 3rem .8rem;
        }
        .kp-search {
          width: 100%; padding: .65rem 1.2rem;
          border: 1.5px solid rgba(22,17,10,0.15); border-radius: 30px;
          font-family: var(--serif); font-size: .92rem;
          background: var(--white); color: var(--ink); outline: none;
          margin-bottom: .9rem; transition: border-color .2s;
        }
        .kp-search:focus { border-color: var(--gold, #7a5c00); }
        .kp-search::placeholder { color: #b5a48a; }
        .kp-filters { display: flex; gap: .4rem; flex-wrap: wrap; }
        .kp-fb {
          background: none; border: 1.5px solid #b0a080; color: #b0a080;
          padding: .28rem .75rem; border-radius: 20px;
          font-family: var(--mono); font-size: .7rem; cursor: pointer;
          transition: all .18s; letter-spacing: .04em;
        }
        .kp-fb:hover, .kp-fb.active {
          background: var(--ink); border-color: var(--ink); color: var(--paper);
        }
        .kp-stats {
          max-width: 1200px; margin: .2rem auto 0; padding: 0 3rem;
          font-family: var(--mono); font-size: .7rem; color: var(--muted);
        }

        /* Section heading */
        .ks-head {
          max-width: 1200px; margin: 2rem auto .7rem; padding: 0 3rem;
          display: flex; align-items: center; gap: .8rem;
        }
        .ks-head h2 {
          font-family: var(--serif); font-size: 1.2rem; font-weight: 600;
          color: var(--red); white-space: nowrap;
        }
        .ks-line { flex: 1; height: 1px; background: var(--border); }
        .ks-cnt {
          font-family: var(--mono); font-size: .68rem; color: var(--muted);
          background: var(--paper-dark); border-radius: 10px; padding: .1rem .45rem;
        }

        /* Grid */
        .ks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem; padding: .2rem 3rem 1rem;
          max-width: 1200px; margin: 0 auto;
        }

        /* Card */
        .k-card {
          background: var(--white); border-radius: 4px;
          border: 1px solid var(--border);
          box-shadow: 0 2px 8px rgba(22,17,10,0.05);
          cursor: pointer; transition: transform .17s, box-shadow .17s;
          overflow: hidden;
        }
        .k-card:hover { transform: translateY(-3px); box-shadow: 0 7px 20px rgba(22,17,10,0.11); }
        .k-top { display: flex; min-height: 100px; }
        .k-side {
          width: 90px; min-width: 90px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: .9rem .45rem;
        }
        .k-char {
          font-family: var(--jp); font-size: 2.7rem; line-height: 1;
          color: var(--ink); user-select: none;
        }
        .k-reads { margin-top: .35rem; text-align: center; }
        .k-ron { font-size: .57rem; color: var(--red); font-family: var(--jp); display: block; line-height: 1.4; }
        .k-kun { font-size: .57rem; color: var(--muted); font-family: var(--jp); display: block; line-height: 1.4; }
        .k-body {
          flex: 1; border-left: 1px solid var(--border);
          padding: .8rem .85rem .8rem .6rem; position: relative;
        }
        .k-sbadge {
          position: absolute; top: .38rem; right: .38rem;
          font-size: .56rem; color: var(--muted);
          background: var(--paper-dark); border-radius: 10px; padding: .07rem .33rem;
          font-family: var(--mono);
        }
        .k-meaning {
          font-family: var(--serif); font-size: 1.12rem; font-weight: 600;
          padding-right: 2.2rem; margin-bottom: .05rem;
        }
        .k-cat {
          font-family: var(--mono); font-size: .6rem; text-transform: uppercase;
          letter-spacing: .1em; color: var(--muted); margin-bottom: .4rem;
        }
        .k-ex { font-family: var(--jp); font-size: .76rem; color: var(--gold, #7a5c00); }
        .k-exs { font-size: .66rem; color: var(--muted); margin-top: .06rem; }

        .k-tog {
          text-align: center; font-size: .64rem; color: var(--muted);
          padding: .3rem; background: rgba(22,17,10,0.02);
          letter-spacing: .04em; user-select: none;
        }
        .k-expand {
          max-height: 0; overflow: hidden;
          transition: max-height .38s ease;
          border-top: 1px solid transparent;
        }
        .k-expand.open {
          max-height: 600px; border-top-color: var(--border);
        }
        .k-exp-in { padding: .9rem 1.05rem 1.05rem; }
        .k-sl {
          font-family: var(--mono); font-size: .58rem; text-transform: uppercase;
          letter-spacing: .12em; color: var(--red); font-weight: 500;
          margin-top: .65rem; margin-bottom: .3rem;
        }
        .k-sl:first-child { margin-top: 0; }
        .k-parts { display: flex; gap: .3rem; flex-wrap: wrap; }
        .k-chip {
          background: var(--paper-dark); border-radius: 3px;
          padding: .18rem .48rem; font-size: .74rem;
          font-family: var(--jp); border: 1px solid rgba(22,17,10,0.08);
          display: flex; align-items: center; gap: .22rem;
        }
        .k-chip em {
          font-family: var(--mono); font-size: .64rem;
          color: var(--muted); font-style: normal;
        }
        .k-logic {
          background: rgba(22,17,10,0.03); border-radius: 4px;
          padding: .55rem .78rem; font-size: .8rem; line-height: 1.65;
          color: #3a2e1e; font-family: var(--serif);
        }
        .k-empty {
          grid-column: 1/-1; text-align: center; padding: 3rem;
          color: var(--muted); font-style: italic; font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .kp-controls, .kp-stats, .ks-head, .ks-grid { padding-left: 1rem; padding-right: 1rem; }
          .kp-hero { padding: 4rem 1.5rem 2rem; }
        }
      `}</style>

      {/* HERO */}
      <div className="kp-hero">
        <span className="kp-super">漢字 N5</span>
        <h1>
          Guía Completa de Kanjis N5
          <span className="kp-badge">{allTotal} kanjis</span>
        </h1>
        <p className="kp-sub">Con la lógica original de cada kanji</p>
      </div>

      {/* CONTROLS */}
      <div className="kp-controls">
        <input
          className="kp-search"
          type="text"
          placeholder="🔍  Busca por kanji, significado, lectura..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="kp-filters">
          {filterButtons.map(fb => (
            <button
              key={fb.id}
              className={`kp-fb ${filter === fb.id ? "active" : ""}`}
              onClick={() => setFilter(fb.id)}
            >
              {fb.label}
            </button>
          ))}
        </div>
      </div>
      <div className="kp-stats">
        Mostrando {total} de {allTotal} kanjis
      </div>

      {/* SECTIONS */}
      {filtered.length === 0 ? (
        <div className="ks-grid"><div className="k-empty">No se encontraron kanjis...</div></div>
      ) : (
        filtered.map(sec => (
          <div key={sec.id}>
            <div className="ks-head reveal">
              <h2>{sec.label}</h2>
              <div className="ks-line" />
              <span className="ks-cnt">{sec.kanjis.length}</span>
            </div>
            <div className="ks-grid">
              {sec.kanjis.map(k => (
                <KanjiCard
                  key={k.char}
                  k={k}
                  isOpen={open === k.char}
                  onToggle={() => setOpen(open === k.char ? null : k.char)}
                  secLabel={sec.id}
                />
              ))}
            </div>
          </div>
        ))
      )}

      <div style={{ height: "3rem" }} />
    </>
  );
}

function KanjiCard({ k, isOpen, onToggle, secLabel }) {
  return (
    <div className="k-card" onClick={onToggle}>
      <div className="k-top">
        <div className="k-side">
          <span className="k-char">{k.char}</span>
          <div className="k-reads">
            <span className="k-ron">音: {k.on}</span>
            <span className="k-kun">訓: {k.kun}</span>
          </div>
        </div>
        <div className="k-body">
          <span className="k-sbadge">{k.str} trazos</span>
          <div className="k-meaning">{k.meaning}</div>
          <div className="k-cat">{secLabel}</div>
          <div className="k-ex">{k.ex}</div>
          <div className="k-exs">— {k.exs}</div>
        </div>
      </div>
      <div className="k-tog">{isOpen ? "▲ cerrar" : "▼ lógica y truco"}</div>
      <div className={`k-expand ${isOpen ? "open" : ""}`}>
        <div className="k-exp-in">
          <div className="k-sl">🧩 Partes</div>
          <div className="k-parts">
            {k.parts.map((p, i) => (
              <div key={i} className="k-chip">
                {p[0]} <em>{p[1]}</em>
              </div>
            ))}
          </div>
          <div className="k-sl">💡 Lógica original</div>
          <div className="k-logic">{k.logic}</div>
        </div>
      </div>
    </div>
  );
}
