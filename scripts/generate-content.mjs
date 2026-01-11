import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'pages');

// Keywords from keywords.txt
const KEYWORDS = [
  { title: 'Oraciones de la mañana', slug: 'oraciones-de-la-manana' },
  { title: 'Oración de la mañana', slug: 'oracion-de-la-manana' },
  { title: 'Oración para empezar el día con fe', slug: 'oracion-para-empezar-el-dia-con-fe' },
  { title: 'Oración al despertar', slug: 'oracion-al-despertar' },
  { title: 'Oración para ofrecer el día a Dios', slug: 'oracion-para-ofrecer-el-dia-a-dios' },
  { title: 'Oración de la mañana corta', slug: 'oracion-de-la-manana-corta' },
  { title: 'Oración de la mañana católica', slug: 'oracion-de-la-manana-catolica' },
  { title: 'Oración para comenzar el día en paz', slug: 'oracion-para-comenzar-el-dia-en-paz' },
  { title: 'Oración para poner el día en manos de Dios', slug: 'oracion-para-poner-el-dia-en-manos-de-dios' },
  { title: 'Oración de la mañana para la familia', slug: 'oracion-de-la-manana-para-la-familia' },
  { title: 'Oración de la mañana para los hijos', slug: 'oracion-de-la-manana-para-los-hijos' },
  { title: 'Oración de la mañana para el trabajo', slug: 'oracion-de-la-manana-para-el-trabajo' },
  { title: 'Oración de la mañana para tomar decisiones', slug: 'oracion-de-la-manana-para-tomar-decisiones' },
  { title: 'Oración de la mañana para la protección', slug: 'oracion-de-la-manana-para-la-proteccion' },
  { title: 'Oración de la mañana para la ansiedad', slug: 'oracion-de-la-manana-para-la-ansiedad' },
  { title: 'Oración de la mañana para confiar en Dios', slug: 'oracion-de-la-manana-para-confiar-en-dios' },
  { title: 'Oración de la mañana salmo', slug: 'oracion-de-la-manana-salmo' },
  { title: 'Oración de la mañana con el Padre Nuestro', slug: 'oracion-de-la-manana-con-el-padre-nuestro' },
  { title: 'Oración de la mañana para un nuevo comienzo', slug: 'oracion-de-la-manana-para-un-nuevo-comienzo' },
  { title: 'Oración de la mañana para agradecer', slug: 'oracion-de-la-manana-para-agradecer' },
  { title: 'Oración de la mañana para pedir sabiduría', slug: 'oracion-de-la-manana-para-pedir-sabiduria' },
  { title: 'Oración de la mañana para la paz interior', slug: 'oracion-de-la-manana-para-la-paz-interior' },
  { title: 'Oración de la mañana para el hogar', slug: 'oracion-de-la-manana-para-el-hogar' },
  { title: 'Oración de la mañana para un día difícil', slug: 'oracion-de-la-manana-para-un-dia-dificil' },
];

// Content templates for different types
const TEMPLATES = {
  general: (keyword) => `## Oración

Señor Jesús, al comenzar este nuevo día te ofrezco mi corazón, mis pensamientos y cada acción que realice.

Que tu luz ilumine mi camino y tu amor guíe mis decisiones. ${generateSpecificPrayer(keyword)}

Ayúdame a vivir este día con fe, esperanza y caridad, siendo testimonio de tu amor en cada encuentro y circunstancia.

Que todo lo que haga sea para tu mayor gloria y el bien de quienes me rodean.

## ¿Por qué orar por la mañana?

La mañana es el momento ideal para conectar con Dios y establecer una base espiritual sólida para el día. Cuando ofrecemos nuestras primeras palabras y pensamientos al Señor, invitamos su presencia a acompañarnos en cada actividad.

La oración matutina nos ayuda a:

- Centrar nuestra mente en lo que verdaderamente importa
- Pedir guía divina antes de tomar decisiones
- Agradecer el don de un nuevo día
- Preparar nuestro corazón para servir con amor

## Cómo incorporar esta oración en tu rutina

Te sugerimos rezar esta oración al despertar, antes de revisar el teléfono o comenzar otras actividades. Puede ser:

- Al abrir los ojos, desde tu cama
- Durante tu momento de café o desayuno
- En un espacio tranquilo dedicado a la oración
- Mientras te preparas para el día

Lo importante no es el lugar perfecto, sino la disposición sincera del corazón.

## Oraciones relacionadas para la mañana

Además de esta oración, puedes complementar tu devocional matutino con:

- El Salmo 5: "Señor, escucha mis palabras, atiende a mis gemidos. Presta oído a mi clamor"
- El Padre Nuestro, oración que Jesús nos enseñó
- Un momento de silencio para escuchar a Dios
- Lecturas breves del Evangelio del día

Recuerda que Dios te espera cada mañana con amor infinito. Tu oración, por sencilla que sea, es preciosa para Él.

## La importancia de la constancia

La oración matutina se vuelve más poderosa con la constancia. No se trata de perfección, sino de fidelidad. Algunos días sentirás más fervor que otros, y está bien.

Lo importante es mantener el hábito de buscar a Dios al comenzar el día, incluso cuando no sientas consolación inmediata. La gracia obra en el silencio y la perseverancia.

Con el tiempo, notarás cómo esta práctica transforma tu perspectiva, tu paz interior y tu capacidad de enfrentar los desafíos cotidianos con esperanza.`,

  family: () => `## Oración

Padre celestial, al comenzar este nuevo día, te entrego a mi familia y nuestro hogar.

Protege a cada uno de los que amo con tu manto sagrado. Bendice a mis hijos, a mi esposo/a, a mis padres y a todos los que forman parte de mi vida.

Que tu paz reine en nuestro hogar, que el amor se fortalezca entre nosotros y que tu gracia nos sostenga en los momentos difíciles.

Ayúdanos a ser instrumentos de tu amor unos para otros, a tener paciencia, comprensión y ternura en cada palabra y acción.

## Por qué orar por la familia en la mañana

La familia es el núcleo donde se vive y se transmite la fe. Encomendar a nuestros seres queridos a Dios cada mañana es un acto de confianza y amor profundo.

Cuando oramos por nuestra familia al comenzar el día:

- Ponemos a nuestros seres queridos bajo la protección divina
- Pedimos sabiduría para ser mejores padres, hijos o cónyuges
- Fortalecemos los lazos de amor que nos unen
- Invitamos a Dios a ser el centro de nuestro hogar

La oración familiar matutina crea un escudo espiritual que acompaña a cada miembro durante el día, especialmente cuando están separados por trabajo, escuela o diferentes actividades.

## Cómo orar en familia por la mañana

Si es posible, reúne a tu familia aunque sea por unos minutos:

- Antes del desayuno o durante él
- En la sala, tomados de las manos
- Cada quien desde su habitación, pero al mismo tiempo
- A través de un mensaje de voz o texto compartido

Puedes alternar quién guía la oración cada día, incluyendo a los niños para que aprendan a hablar con Dios con sus propias palabras.

## El poder de la intercesión familiar

Cuando oramos por nuestra familia, no solo pedimos protección, sino que ejercemos nuestro sacerdocio común de intercesores. Los padres tienen una gracia especial para bendecir a sus hijos.

La Virgen María es nuestro modelo perfecto de intercesión familiar. Ella oraba constantemente por Jesús y los apóstoles, y ahora intercede por cada una de nuestras familias.

No subestimes el poder de tu oración matutina por tu familia. Dios escucha con amor especial estas peticiones que brotan del corazón de quien ama.

## Confianza en la providencia divina

Al encomendar a tu familia cada mañana, practicas la confianza en la providencia de Dios. Reconoces que, aunque haces tu parte, es Dios quien sostiene, protege y guía a los tuyos.

Esta confianza te liberará de la ansiedad excesiva y te dará paz para enfrentar el día, sabiendo que Dios cuida de los que amas incluso mejor que tú.

Que cada mañana sea una oportunidad de renovar tu fe en que Dios tiene un plan bueno para tu familia y que su amor nunca falla.`,

  work: () => `## Oración

Señor, al comenzar este día de trabajo, pongo en tus manos todas mis tareas y responsabilidades.

Dame sabiduría para tomar las decisiones correctas, fortaleza para cumplir con mis deberes y caridad para tratar a todos con respeto y amabilidad.

Que mi trabajo sea una ofrenda agradable a ti y un servicio a mis hermanos. Ayúdame a ver en cada tarea, por pequeña que sea, una oportunidad de glorificarte.

Protégeme de la pereza y del afán excesivo. Enséñame a trabajar con diligencia pero sin ansiedad, confiando en tu providencia.

## El trabajo como vocación

El trabajo no es solo un medio para ganarse la vida, sino una vocación a través de la cual cooperamos con la obra creadora de Dios y servimos al bien común.

Cuando comenzamos el día laboral con oración:

- Damos sentido trascendente a nuestras tareas cotidianas
- Pedimos la gracia de trabajar con excelencia y honestidad
- Nos abrimos a ver a Cristo en compañeros y clientes
- Ofrecemos nuestros esfuerzos como alabanza a Dios

San José, el trabajador humilde y fiel, es nuestro modelo perfecto de santificación a través del trabajo cotidiano.

## Cómo ofrecer el trabajo a Dios

Antes de comenzar tu jornada laboral, toma unos minutos para:

- Hacer la señal de la cruz sobre tu espacio de trabajo
- Ofrecer mentalmente cada tarea del día a Dios
- Pedir ayuda para las situaciones difíciles que prevés
- Agradecer la oportunidad de trabajar y servir

Esta ofrenda matutina transforma el trabajo en oración continua, convirtiendo cada acción en un acto de amor.

## Enfrentar las dificultades laborales con fe

El trabajo trae desafíos: presión, conflictos, fracasos, cansancio. La oración matutina te prepara espiritualmente para estos momentos.

Cuando has comenzado el día con Dios, es más fácil:

- Mantener la calma ante la presión
- Responder con paciencia a las críticas
- Buscar soluciones creativas con confianza
- Pedir perdón cuando te equivocas
- Perdonar a quienes te ofenden

La gracia que recibes en la oración matutina te acompaña durante toda la jornada, ayudándote a ser testimonio de Cristo en tu ambiente laboral.

## El equilibrio entre trabajo y vida espiritual

Orar por tu trabajo cada mañana te ayuda también a mantener una perspectiva equilibrada, recordando que el trabajo es importante pero no es todo en la vida.

Esta oración te recuerda que:

- Tu identidad no depende de tu éxito profesional
- Tu familia y tu vida espiritual también necesitan tiempo
- El descanso es un don de Dios, no un lujo
- El trabajo es para vivir, no vivir para el trabajo

Que tu oración matutina por el trabajo te ayude a ser excelente profesional sin dejar de ser, ante todo, hijo/a amado/a de Dios.`,
};

function generateSpecificPrayer(keyword) {
  const slug = keyword.slug;

  if (slug.includes('familia')) {
    return 'Bendice a mi familia y protege a cada uno de sus miembros. Que el amor y la unidad reinen en nuestro hogar.';
  } else if (slug.includes('hijo')) {
    return 'Te pido especialmente por mis hijos. Cuida de ellos, guía sus pasos y ayúdales a crecer en tu amor y sabiduría.';
  } else if (slug.includes('trabajo')) {
    return 'Bendice mi trabajo y ayúdame a realizarlo con excelencia, honestidad y como servicio a los demás.';
  } else if (slug.includes('proteccion')) {
    return 'Protégeme con tu mano poderosa de todo mal, peligro y tentación. Rodéame con tu ángel guardián.';
  } else if (slug.includes('ansiedad')) {
    return 'Calma mi ansiedad y llena mi corazón de tu paz. Ayúdame a confiar plenamente en ti.';
  } else if (slug.includes('decision')) {
    return 'Ilumina mi mente para tomar decisiones sabias y justas. Que tu Espíritu Santo sea mi consejero.';
  } else if (slug.includes('paz')) {
    return 'Llena mi corazón de tu paz que sobrepasa todo entendimiento. Que sea instrumento de paz para otros.';
  } else if (slug.includes('confiar')) {
    return 'Aumenta mi confianza en ti. Que pueda entregartesin reservas mis preocupaciones y miedos.';
  } else if (slug.includes('agradecer')) {
    return 'Te doy gracias por todas tus bendiciones, por este nuevo día, por mi vida y por tu amor infinito.';
  } else if (slug.includes('sabiduria')) {
    return 'Concédeme el don de la sabiduría para discernir tu voluntad y actuar conforme a ella.';
  } else if (slug.includes('nuevo-comienzo')) {
    return 'Gracias por esta oportunidad de comenzar de nuevo. Ayúdame a dejar atrás el pasado y caminar con esperanza.';
  } else if (slug.includes('dificil')) {
    return 'Sé que hoy enfrentaré desafíos. Dame fortaleza, paciencia y la certeza de que tú estás conmigo.';
  } else if (slug.includes('hogar')) {
    return 'Bendice mi hogar y a todos los que habitan en él. Que sea un lugar de amor, paz y encuentro contigo.';
  } else if (slug.includes('salmo')) {
    return 'Como dice el salmista: "Por la mañana hazme saber de tu gran amor, porque en ti he puesto mi confianza."';
  } else if (slug.includes('padre-nuestro')) {
    return 'Unido a la oración que nos enseñaste, te digo: Padre nuestro que estás en el cielo...';
  } else if (slug.includes('catolica')) {
    return 'En comunión con toda la Iglesia católica, te ofrezco este día bajo la protección de María Santísima.';
  } else if (slug.includes('ofrecer')) {
    return 'Te ofrezco todo lo que viva hoy: alegrías, trabajos, encuentros, dificultades. Que todo sea para tu gloria.';
  } else if (slug.includes('despertar')) {
    return 'Gracias por despertar hoy con vida y salud. Que este nuevo día sea vivido en tu presencia amorosa.';
  } else if (slug.includes('fe')) {
    return 'Fortalece mi fe para caminar con confianza, sabiendo que tú eres fiel y nunca me abandonas.';
  } else if (slug.includes('corta')) {
    return 'Señor, este día es tuyo. Ayúdame a vivirlo en tu amor. Amén.';
  } else {
    return 'Dame tu gracia para vivir este día como tú quieres, amando y sirviendo con alegría.';
  }
}

function generateMetaDescription(keyword) {
  const title = keyword.title.toLowerCase();

  if (title.includes('familia')) {
    return `${keyword.title} original y católica. Encomienda a tu familia a Dios cada mañana para protección, unidad y bendición en el hogar.`;
  } else if (title.includes('hijo')) {
    return `${keyword.title} original y católica. Confía tus hijos a Dios al comenzar el día, pidiendo protección, guía y bendiciones.`;
  } else if (title.includes('trabajo')) {
    return `${keyword.title} original y católica. Ofrece tu jornada laboral a Dios para trabajar con excelencia, honestidad y amor.`;
  } else if (title.includes('protección') || title.includes('proteccion')) {
    return `${keyword.title} original y católica. Pide la protección divina sobre tu vida, tu familia y tu día desde el amanecer.`;
  } else if (title.includes('ansiedad')) {
    return `${keyword.title} original y católica. Encuentra paz y calma al comenzar el día, confiando tus preocupaciones a Dios.`;
  } else if (title.includes('decisión') || title.includes('decision')) {
    return `${keyword.title} original y católica. Pide sabiduría divina para tomar las decisiones correctas durante tu día.`;
  } else if (title.includes('paz')) {
    return `${keyword.title} original y católica. Recibe la paz de Cristo desde la mañana para vivir con serenidad y confianza.`;
  } else if (title.includes('confiar')) {
    return `${keyword.title} original y católica. Fortalece tu confianza en Dios al despertar y entrega tu día a su providencia.`;
  } else if (title.includes('agradecer')) {
    return `${keyword.title} original y católica. Comienza tu día dando gracias a Dios por sus bendiciones y su amor infinito.`;
  } else if (title.includes('sabiduría') || title.includes('sabiduria')) {
    return `${keyword.title} original y católica. Pide el don de la sabiduría para discernir y actuar según la voluntad de Dios.`;
  } else if (title.includes('nuevo comienzo')) {
    return `${keyword.title} original y católica. Abraza cada mañana como una oportunidad nueva para comenzar con Dios.`;
  } else if (title.includes('difícil') || title.includes('dificil')) {
    return `${keyword.title} original y católica. Enfrenta los desafíos con fortaleza, sabiendo que Dios te acompaña.`;
  } else if (title.includes('hogar')) {
    return `${keyword.title} original y católica. Bendice tu hogar cada mañana para que sea un lugar de paz y amor.`;
  } else if (title.includes('salmo')) {
    return `${keyword.title} original y católica. Ora con las palabras de los salmos para comenzar el día en alabanza.`;
  } else if (title.includes('padre nuestro')) {
    return `${keyword.title} original y católica. Comienza tu día con la oración que Jesús nos enseñó.`;
  } else if (title.includes('católica')) {
    return `${keyword.title} original y tradicional. Inicia tu día en comunión con la Iglesia y bajo la protección de María.`;
  } else if (title.includes('ofrecer')) {
    return `${keyword.title} original y católica. Ofrece tu día completo a Dios para que todo sea para su gloria.`;
  } else if (title.includes('despertar')) {
    return `${keyword.title} original y católica. Da gracias a Dios por un nuevo día al abrir los ojos cada mañana.`;
  } else if (title.includes('fe')) {
    return `${keyword.title} original y católica. Fortalece tu fe desde el amanecer para caminar con confianza en Dios.`;
  } else if (title.includes('corta')) {
    return `${keyword.title} original y católica. Oración breve y poderosa para comenzar el día con Dios.`;
  } else {
    return `${keyword.title} original y católica. Comienza tu día con fe, paz y confianza en Dios desde el amanecer.`;
  }
}

function generateKeywords(keyword) {
  const base = [keyword.slug.replace(/-/g, ' '), 'oración de la mañana', 'oraciones católicas', 'oración matutina'];

  const title = keyword.title.toLowerCase();
  if (title.includes('familia')) base.push('oración por la familia', 'bendición familiar');
  if (title.includes('hijo')) base.push('oración por los hijos', 'bendición de hijos');
  if (title.includes('trabajo')) base.push('oración laboral', 'santificar el trabajo');
  if (title.includes('protección')) base.push('protección divina', 'oración de protección');
  if (title.includes('paz')) base.push('paz interior', 'serenidad');

  return base.slice(0, 5);
}

function selectTemplate(keyword) {
  const slug = keyword.slug;

  if (slug.includes('familia') || slug.includes('hijo') || slug.includes('hogar')) {
    return TEMPLATES.family();
  } else if (slug.includes('trabajo')) {
    return TEMPLATES.work();
  } else {
    return TEMPLATES.general(keyword);
  }
}

function generateMDX(keyword) {
  const content = selectTemplate(keyword);

  return `---
slug: "${keyword.slug}"
title: "${keyword.title}"
metaTitle: "${keyword.title} - Oración original católica para empezar el día"
metaDescription: "${generateMetaDescription(keyword)}"
keywords: ${JSON.stringify(generateKeywords(keyword))}
publishedAt: "2026-01-09"
updatedAt: "2026-01-09"
category: "manana"
---

${content}
`;
}

// Delete old files (except legal ones)
console.log('Cleaning old MDX files...');
const files = fs.readdirSync(CONTENT_DIR);
for (const file of files) {
  if (file.endsWith('.mdx') && file !== 'aviso-legal.mdx' && file !== 'politica-de-privacidad.mdx') {
    fs.unlinkSync(path.join(CONTENT_DIR, file));
    console.log(`Deleted: ${file}`);
  }
}

// Generate new files
console.log('\nGenerating new MDX files...');
for (const keyword of KEYWORDS) {
  const filename = `${keyword.slug}.mdx`;
  const filepath = path.join(CONTENT_DIR, filename);
  const content = generateMDX(keyword);

  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`Generated: ${filename}`);
}

console.log(`\n✅ Successfully generated ${KEYWORDS.length} MDX files!`);
