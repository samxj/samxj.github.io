/**
 * Long-form project detail panels — one per FULL DETAIL button.
 *
 * The prose is Samuel Field's own writing, transcribed verbatim from the design
 * reference. Do not rewrite, paraphrase, tighten or "improve" any of it, and keep
 * the typographic characters as they are: curly quotes, en/em dashes, and the
 * non-breaking hyphens (U+2011) in "seed‑dropping", "A‑Levels", "Imm‑Aroy" etc.
 */

export type ProjectKey =
  | "plane"
  | "lexitecht"
  | "pudding"
  | "leuiraciu"
  | "stjohns"
  | "immaroy"
  | "redd"
  | "redrobin"
  | "unsplash"
  | "drums"
  | "florentine"
  | "journals";

/** Accent colour a panel is keyed to. */
export type PanelAccent = 'flame' | 'teal' | 'acid';

/** A run of body text, optionally a link. */
export type Inline = string | { text: string; href: string };

export interface MediaItem {
  type: 'image' | 'video';
  /** Swap this one line for real media. */
  src: string;
  alt: string;
  aspect: string;
}

export interface Fact {
  label: string;
  value: string;
  /** Outcomes and awards are set in acid yellow. */
  highlight?: boolean;
}

export type Block =
  | { kind: 'heading'; text: string }
  | { kind: 'paragraph'; content: Inline[] }
  | { kind: 'list'; items: string[] }
  | { kind: 'pullquote'; text: string }
  | { kind: 'note'; text: string; tone: 'default' | 'muted' }
  | { kind: 'excerpt'; eyebrow: string; title: string; paragraphs: string[] }
  | { kind: 'media'; columns: string; gap: string; items: MediaItem[] };

export interface Project {
  key: ProjectKey;
  eyebrow: string;
  accent: PanelAccent;
  title: string;
  facts: Fact[];
  blocks: Block[];
}

export const projects: Project[] = [
  {
    key: "plane",
    eyebrow: "TECHNICAL · 2026",
    accent: "flame",
    title: "AI seed‑dropping plane",
    facts: [
      { label: "YEAR", value: "2026" },
      { label: "MY ROLE", value: "Seed dispenser, stabilisation, project management" },
      { label: "TOOLS", value: "SolidWorks, Kalman filter, FrSKY, 3D printing" },
      { label: "OUTCOME", value: "First prize, all Year 11–13 projects", highlight: true },
    ],
    blocks: [
    { kind: 'heading', text: "Not exactly a flying start" },
    {
      kind: 'paragraph',
      content: [
        "A friend of mine wanted to try making an RC plane fully from scratch for the first time three years ago for the school’s annual STEM Fair. Many local primary schools pay a visit to it, and it’s judged by the school’s SLT. Spending many gruelling hours in SolidWorks, that year we succeeded in making a plane model from scratch; laser‑cutting parts, assembling it, wiring it up with fully operational electronics (the prop, control surfaces, buzzer etc), and establishing a remote connection with the widely used FrSKY controller set. Having even run a virtual wind tunnel test on the wing’s CAD model to obtain its lift constant, all looked good to fly. It was a disaster; it was flying for about a second before banking violently leftward and crashing. We realised this may have been exacerbated by the lack of a dihedral angle in the wing design, but eventually we figured the two main reasons for the crash:",
      ],
    },
    {
      kind: 'list',
      items: [
        "A component came loose in the plane and caused the precisely calculated centre of gravity to shift",
        "Some control surfaces may not have been accurately enough installed, so a bank input caused asymmetric lift.",
      ],
    },
    { kind: 'heading', text: "Take Two" },
    {
      kind: 'paragraph',
      content: [
        "The next year, we wanted to try a different focus – autopilot. Due to the complexity of designing an autopilot system from scratch we opted for a ready built foam plane we knew could fly. My role in this was the stabilisation system – using a Kalman filter to process instrument data, this kept the plane level when flying straight by compensating for bank and pitch movement not inputted by the user manually or by the flight computer. (Yaw movement was also adjusted but to a smaller extent due to high rudder sensitivity). Ground tests of the control system proved successful. Unfortunately a strong, untimely gust of wind knocked it off course about three seconds into the flight, causing a steep bank which my friend could not manually pilot back on course in time.",
      ],
    },
    { kind: 'heading', text: "Third Time Lucky" },
    {
      kind: 'paragraph',
      content: [
        "We now had two crashed planes – this year we were determined to not only make one that would fly, but a project with real‑world applications, to finally win the STEM Fair. This is where the AI seed‑dropping part comes in: the design was for a plane that could fly around a field on its own, taking photos of the ground below. Then it could, upon landing, send these images to an app on the ground (to minimise processing electronics onboard), which would then generate a flight plan over fertile locations. This flight plan would be sent back to the plane, and last year’s autopilot system would fly it.",
      ],
    },
    {
      kind: 'paragraph',
      content: [
        "This was a significant step up in terms of complexity – but, with the experience we’d gained and technology we’d built over the previous years, we felt our ability had stepped up enough to match.",
      ],
    },
    {
      kind: 'paragraph',
      content: [
        "Nevertheless, I decided we needed a more rigorous delegation plan, so I took up the task of project management. Preparing a 10‑page document on the details of what had to be done, by what time, in what order, and by whom, I appointed each member of the 4‑strong team with their tasks. When setbacks occurred, we updated the plan accordingly, and eventually everything was done. Last‑minute a member of our team even developed an iOS app to showcase the design on an iPad; we had it on our stall for passers‑by at the fair to learn more. Later on, we decided to try having a ground station processing while the plane was flying – the plane would be streaming image data to a computer station on the ground, where it would be processed, and the flight plan sent back in due course.",
      ],
    },
    {
      kind: 'paragraph',
      content: [
        "We all had something to do in everything, so I helped with some of the AI route‑planning app development by helping mount the onboard camera. Predominantly, however, I was in charge of the seed dispenser – a small box in the back of the plane, with a single servo to minimise complexity, it featured a mechanism to adjust the rate of flow of seeds, and was designed to make use of as much free space as we had in the fuselage. Of course, due to the centre of mass shifting as seeds are dispersed, we ensured the other components were arranged in such a way that the COG would remain within the wingspan at all times.",
      ],
    },
    {
      kind: 'paragraph',
      content: [
        "To make the planes repairable quickly, we used a publicly‑available 3D‑printed design, mounting new autopilot electronics we had spent time wiring and programming based off the previous year’s algorithms. Finally testing it in flight, we recorded its maiden voyage with a drone to better observe any faults. And it flew! Unfortunately only for about five seconds – when we tried to manually steer it from a tree, the rudder locked out at 90 degrees, and it all came crashing down again. However, having re‑printed and re‑assembled the parts, it was ready for the fair, where we showcased the whole system. And (to our surprise!) it won first prize for all Year 11, 12 and 13 projects!",
      ],
    },
    { kind: 'pullquote', text: "All in all, I think it was a case of ‘mission failed successfully.’" },
    {
      kind: 'media',
      columns: "1fr 1fr",
      gap: "14px",
      items: [
        { type: "image", src: "/assets/castlemotif.jpg", alt: "Placeholder image", aspect: "4 / 3" },
        { type: "video", src: "/assets/torre.jpg", alt: "Video placeholder", aspect: "4 / 3" },
      ],
    },
    ],
  },
  {
    key: "lexitecht",
    eyebrow: "TECHNICAL · IN PROGRESS",
    accent: "teal",
    title: "Lexitecht",
    facts: [
      { label: "STATUS", value: "Building" },
      { label: "MY ROLE", value: "Everything" },
      { label: "BUILT WITH", value: "Python 3, PyQt5, NLTK · 3,000 lines" },
    ],
    blocks: [
    { kind: 'heading', text: "Fed up with spreadsheets" },
    {
      kind: 'paragraph',
      content: [
        "After Leuiráciu, I made a few other, smaller languages – and kept having the problem of needing to navigate an ugly‑looking spreadsheet, or trawl through pages of textbook to find the grammar I needed to translate something. I wanted an app that could:",
      ],
    },
    {
      kind: 'list',
      items: [
        "Keep track of my lexicon — principal parts, and pronunciation with sound recording; spaces for notes and etymology; the option to select a font I made to visualise the script on a computer",
        "Generate new words — a system which generates batches of new words according to a provided phonemic inventory, phonotactical constraints and other phonological rules",
        "Apply sound changes to simulate language evolution — given a set of words and a system for sounds to change, the app should be able to batch apply changes",
        "Keep track of grammar with a space to store conjugations and declensions",
        "Be able to translate basic sentences between English and any conlang loaded into it",
      ],
    },
    {
      kind: 'paragraph',
      content: [
        "I could find no app capable of these, so I decided to make it myself, applying those features in that order. It was like being a lexicon ‘architect’ – and so Lexitecht was born.",
      ],
    },
    { kind: 'heading', text: "Cutie Pie? No, PyQt." },
    {
      kind: 'paragraph',
      content: [
        "This was when AI was not widely used – I programmed every line of the program, using w3schools or YouTube videos to help. The only language I knew well enough to make such a complex task was Python 3, so I used the PyQt5 library for the GUI. Slowly but surely, each of the features was fairly straightforward to implement. Each language had its own custom .lxl language file.",
      ],
    },
    { kind: 'heading', text: "The Translation System" },
    {
      kind: 'paragraph',
      content: [
        "Then it became time to flesh out a system which can translate English to the conlang. To do this, I decided to make an ‘intermediate language’ – a way of encoding English text to their grammatical values. For example, ‘you’ is a 2nd person singular pronoun, so is encoded to PRN2S. Similarly, ‘eating’ is a participle, so is encoded to PTCP. This was done using the NLTK toolkit to identify individual words like this.",
      ],
    },
    {
      kind: 'paragraph',
      content: [
        "However, the complication arose when looking at more than one word at a time – ‘am eating’ and ‘was eating’ are both two words, but they correspond to one unit of grammar: one compound tense. Therefore I had to create a whole set of systems encompassing all the English language’s tenses to decipher this – a present verb ‘am’ (encoded as VB1SPAI, PAI being present active indicative) followed by a PTCP ‘eating’, for example, makes VB1SCAI, where the ‘C’ is continuous present. This of course is a simplification of the algorithm, which is 500 lines of the 3,000‑line program.",
      ],
    },
    {
      kind: 'paragraph',
      content: [
        "However, somehow it was successful with simple sentences, and proved to be a huge help – it gave me an instant starting point for longer paragraphs rather than going through masses of spreadsheet. ",
        { text: "You can see the app on GitHub", href: "#" },
        ".",
      ],
    },
    {
      kind: 'media',
      columns: "1fr 1fr",
      gap: "14px",
      items: [
        { type: "image", src: "/assets/lampmoon.jpg", alt: "Placeholder image", aspect: "4 / 3" },
        { type: "video", src: "/assets/wideisa.jpg", alt: "Video placeholder", aspect: "4 / 3" },
      ],
    },
    ],
  },
  {
    key: "pudding",
    eyebrow: "TECHNICAL · BUILT FROM SCRATCH",
    accent: "flame",
    title: "Pudding Trolley",
    facts: [
      { label: "TYPE", value: "RC vehicle that tows a pudding trolley" },
      { label: "BRAINS", value: "2× Arduino Nano, NRF24L01 link" },
      { label: "DRIVE", value: "4 DC gearbox motors, 2× DRV8871, 11.1V li‑ion" },
      { label: "EXTRAS", value: "Gyroscope, ultrasound stop, God Save The King" },
    ],
    blocks: [
    { kind: 'heading', text: "What the…?" },
    {
      kind: 'paragraph',
      content: [
        "As a result of a long‑running family joke, we bought my mum a small second‑hand pudding trolley, to wheel puddings (usually yoghurt or overripe grapes) the 92 centimetres from the kitchen counter to dining table. However, this pudding trolley had one problem; it could not drive itself! So I decided to fix that, and thus ensued the Pudding Trolley Project.",
      ],
    },
    { kind: 'heading', text: "Design" },
    {
      kind: 'paragraph',
      content: [
        "I went through a number of design iterations, trying to figure out the simplest, most efficient design to move the pudding trolley. It would be powered by an Arduino Nano (from AliExpress) with 4 small brushed gearbox DC motors (also from AliExpress). Having all this mounted on the trolley itself was the original plan, but it was difficult to find large enough wheels with a small enough bore, so I opted for a standalone RC vehicle that would somehow pull/drag the trolley along with some mounting system. Pulling from the front would be simple, but have reduced mobility; a pivot directly underneath would maximise mobility but would need to be very strong; so finally, this is the design I went for. Each of the four holes slot into screws dangling through the mesh of the bottom rack of the trolley, reducing the load on each of them and providing a firm connection while allowing the vehicle to potentially spin on the spot.",
      ],
    },
    { kind: 'heading', text: "Electronics" },
    {
      kind: 'paragraph',
      content: [
        "After some torque & desired speed calculations with weight and wheel diameter factored in, I settled on motors and completed the electrical engineering. It used two DRV8871 motor drivers connected to two motors each, so two motors for the left side and another two for the right. A gyroscope was built in to allow for future speed calculation, but I haven’t made that part yet. A small speaker amp was included to play tones sounding like God Save The King (I originally planned to play it from an SD card to have the full song, but I ran into problems with other components on the I2C interfering with it.) I even put a small ultrasound distancing sensor to automatically stop if about to run into an obstacle. All ran from an 11.1V li‑ion battery connected with an XT30 connector, fed through a voltage sensor to estimate capacity. The controller was just another Arduino Nano on a breadboard, communicating to the vehicle with an NRF24L01 module.",
      ],
    },
    { kind: 'heading', text: "Construction" },
    {
      kind: 'paragraph',
      content: [
        "Used sticky‑backed breadboards for wiring and placed it into the frame. The motor holders went several iterations to ensure the perfect click‑in fit, and then I placed on the wheels. To mount it on to the trolley I used four bolts and washers, as shown in the images. And it drove!",
      ],
    },
    {
      kind: 'media',
      columns: "1fr 1fr",
      gap: "14px",
      items: [
        { type: "image", src: "/assets/wideisa.jpg", alt: "Placeholder image", aspect: "4 / 3" },
        { type: "video", src: "/assets/auracat.jpg", alt: "Video placeholder", aspect: "4 / 3" },
      ],
    },
    ],
  },
  {
    key: "leuiraciu",
    eyebrow: "TECHNICAL · 2025",
    accent: "flame",
    title: "Leuiráciu",
    facts: [
      { label: "YEAR", value: "2025" },
      { label: "CONTEXT", value: "Extended Learning Project · 35‑page textbook" },
      { label: "OUTCOME", value: "Headmaster’s award, jointly with three others", highlight: true },
    ],
    blocks: [
    { kind: 'heading', text: "Okraänian beginnings" },
    {
      kind: 'paragraph',
      content: [
        "Exacerbated by studying Latin since Year 5, and having an Italian bilingual mother, I have always loved languages and grammar systems – especially ancient ones as they tend to be more interesting. As a result I made my first conlang at 11 years old – entitled Okraän. Having spent months working on it, I eventually finished two Excel spreadsheets – one being the language’s dictionary, but the other, larger, far more complicated one containing the language’s entire grammar structure. I had done research on other languages such as Turkish and even Elvish, and got to grips with grammar features such as evidentiality that I hadn’t seen before. I learnt the basics of the International Phonetic Alphabet too, in order to craft a small phonemic inventory. This language, however, was only the start.",
      ],
    },
    { kind: 'heading', text: "Guy Deutscher’s mesmerising book" },
    {
      kind: 'paragraph',
      content: [
        "Over the next year I continued to become more interested in languages – starting to learn Ancient Greek in Year 8 (which I continued to GCSE), I read The Unfolding of Language by Guy Deutscher over the summer, covering not only how sounds from apes began to transform into functional linguistics, but also how and why languages evolve in more recent times, from 3000 BC or so to now. I found it utterly fascinating! That year, I then decided to do an Extended Learning Project (HELP) with the school studying the evolution of languages. And the way I decided to showcase their evolution was with the production of my second conlang, Leuiráciu.",
      ],
    },
    { kind: 'heading', text: "The birth of Leuiráciu" },
    {
      kind: 'paragraph',
      content: [
        "Leuiráciu, in concept, was a language designed to replicate the language that may have been spoken in Corsica if it had not been invaded nor populated by the French, Italians, or anyone for that matter. It aimed to show how linguistic features can arise simply from socioeconomic factors of its speakers, and more significantly the geography of where it is spoken. Nevertheless, it was also an opportunity for me to display my language‑making skills, which I loved – admittedly the mere creation of a language was a large proportion of the project rather than its evolution.",
      ],
    },
    { kind: 'heading', text: "Leuiráciu itself" },
    {
      kind: 'paragraph',
      content: [
        "Leuiráciu is too much of a complex language to simply be a spreadsheet, so I made a 35‑page textbook with all of its grammar systems. Due to its complexity, which is higher than that of Okraän’s, I can’t explain it here, so please read the textbook to find out! Throughout, each feature has been thought through with respect to Corsica’s real geography and hypothetical society. Explaining these connections is a short Realism Summary at the end of the textbook.",
      ],
    },
    { kind: 'note', tone: "default", text: "Note: Leuiráciu does indeed have its own simple script system, which I made a font for in Adobe Illustrator. You can download the font below." },
    {
      kind: 'media',
      columns: "1fr 1fr",
      gap: "14px",
      items: [
        { type: "image", src: "/assets/castlemotif.jpg", alt: "Placeholder image", aspect: "4 / 3" },
        { type: "image", src: "/assets/torre.jpg", alt: "Placeholder image", aspect: "4 / 3" },
      ],
    },
    ],
  },
  {
    key: "stjohns",
    eyebrow: "FILM · 2025 TO PRESENT",
    accent: "teal",
    title: "Thirty‑odd films for St John’s Hampton Wick",
    facts: [
      { label: "PERIOD", value: "2025 — present" },
      { label: "MY ROLE", value: "Planning, shooting, editing, delivery — alone" },
      { label: "TOOLS", value: "Premiere Pro, After Effects" },
    ],
    blocks: [
    { kind: 'heading', text: "Gather Youth taster videos" },
    {
      kind: 'paragraph',
      content: [
        "As St John’s has also taken over the neighbouring church St Mark’s, a new name was needed to merge the two – Gather Church. As a result, I was asked to make two videos – one to show teenagers in the congregation what happens at Gather Youth, and one to encourage adults to volunteer there – both from the same shoot.",
      ],
    },
    { kind: 'heading', text: "Love Local 2025 & 2026" },
    {
      kind: 'paragraph',
      content: [
        "Each year my church has a week of events to support the local community in practical ways – gardening, visiting the care home, and cleaning schools to name a few – called Love Local. I have been asked for two years in a row to make a film to showcase this on social media, and encourage the congregation to join next year. I planned, shot, and edited it all solo.",
      ],
    },
    { kind: 'heading', text: "Focus at St John’s" },
    {
      kind: 'paragraph',
      content: [
        "HTB Focus is a huge church camp that our church attends among many others each year. The congregation already know what happens at Focus – but to encourage even more to come, and to increase our church’s social media presence I was asked to make a video specifically on what St John’s get up to at Focus.",
      ],
    },
    { kind: 'heading', text: "Older work" },
    {
      kind: 'paragraph',
      content: [
        "My largest older works were the Easter Highlights video in 2024, showcasing all the church’s Easter events, and one about the Youth Summer Party. I have many others, however; the video for the old website’s background, a seven‑piece series of short videos called Rise and Reflect (though I only edited these), nineteen short sermon clips for social media, and editing a video on how to teach at the kids’ church, SJC.",
      ],
    },
    {
      kind: 'media',
      columns: "1fr 1fr",
      gap: "14px",
      items: [
        { type: "video", src: "/assets/lampmoon.jpg", alt: "Video placeholder", aspect: "16 / 9" },
        { type: "video", src: "/assets/wideisa.jpg", alt: "Video placeholder", aspect: "16 / 9" },
      ],
    },
    ],
  },
  {
    key: "immaroy",
    eyebrow: "PHOTOGRAPHY · 2025",
    accent: "teal",
    title: "Imm‑Aroy, Chinatown",
    facts: [
      { label: "YEAR", value: "2025" },
      { label: "USED FOR", value: "Menu and social" },
      { label: "MY ROLE", value: "Planning, shooting, grading" },
    ],
    blocks: [
    { kind: 'heading', text: "Imm‑Aroy" },
    {
      kind: 'paragraph',
      content: [
        "My friend’s family had recently opened a restaurant in Chinatown, serving Chai Ice Lattes, Mango Sticky Rice, various Thai ice creams, and spicy pork skewers to name a few. As they had not properly photographed their food or shop for better online presence, marketing, and making a menu, I offered to do some photography for them which they gladly accepted.",
      ],
    },
    { kind: 'heading', text: "The shoot" },
    {
      kind: 'paragraph',
      content: [
        "For each item on their menu, I took various photos setting up a photogenic scene for it. I then thoroughly edited the images in Adobe Lightroom Classic to ensure they were spotless and ready for social media or the menu, both of which they were used for. You can see the photos alongside.",
      ],
    },
    {
      kind: 'media',
      columns: "1fr 1fr 1fr",
      gap: "14px",
      items: [
        { type: "image", src: "/assets/torre.jpg", alt: "Placeholder image", aspect: "1 / 1" },
        { type: "image", src: "/assets/auracat.jpg", alt: "Placeholder image", aspect: "1 / 1" },
        { type: "image", src: "/assets/castlemotif.jpg", alt: "Placeholder image", aspect: "1 / 1" },
      ],
    },
    ],
  },
  {
    key: "redd",
    eyebrow: "FILM · 2026",
    accent: "teal",
    title: "RED‑d awareness shoot",
    facts: [
      { label: "YEAR", value: "2026" },
      { label: "MY ROLE", value: "Runner" },
      { label: "SUBJECT", value: "How freelance dancers are treated" },
    ],
    blocks: [
    {
      kind: 'paragraph',
      content: [
        "A professional shoot on how freelance dancers are treated. Rigging lights and cameras, prepping drinks and meals, some filming. I learnt how a shoot like this is structured. I loved it.",
      ],
    },
    { kind: 'note', tone: "muted", text: "ROOM FOR MORE HERE — WHO RAN IT, WHAT YOU TOOK AWAY" },
    {
      kind: 'media',
      columns: "1fr 1fr",
      gap: "14px",
      items: [
        { type: "image", src: "/assets/auracat.jpg", alt: "Placeholder image", aspect: "4 / 3" },
        { type: "video", src: "/assets/lampmoon.jpg", alt: "Video placeholder", aspect: "4 / 3" },
      ],
    },
    ],
  },
  {
    key: "redrobin",
    eyebrow: "FILM · 2022 AND 2023",
    accent: "teal",
    title: "Red Robin Art Studio & Chanctonbury Church",
    facts: [
      { label: "YEARS", value: "2022, 2023" },
      { label: "MY ROLE", value: "Shot, edited and delivered both" },
      { label: "USED FOR", value: "Studio site and socials; church Mission Day" },
    ],
    blocks: [
    { kind: 'heading', text: "What Red Robin Art was" },
    {
      kind: 'paragraph',
      content: [
        "In 2023, I left my prep school to join secondary; in the same year, my Art teacher left to start her own studio, about a 10 minute walk from my house, called Red Robin Art. As she was trying to build a social media presence, she asked me if I could make her a video to post on social media, and I gladly accepted. As always, I planned, shot and edited it all on my own – it is still on her website to this day.",
      ],
    },
    { kind: 'heading', text: "Chanctonbury Church: sabbatical" },
    {
      kind: 'paragraph',
      content: [
        "As my father is a vicar, he gets a two‑month leave every seven years both to rest and to visit churches – one of those we visited for a few days as a family was Chanctonbury Church in Ashington. They happened to have a Mission Day event happening then – a day of events to support the local community in ways such as gardening and litter picking. I asked if I could make them a video to showcase this, which they agreed to; so I made the video solo, filming all the day’s events and compiling them to music. They liked it enough to play it in church the following Sunday!",
      ],
    },
    {
      kind: 'paragraph',
      content: [
        { text: "Watch the Mission Day film on YouTube", href: "https://www.youtube.com/watch?v=BVbf1DHqSKo" },
      ],
    },
    {
      kind: 'media',
      columns: "1fr 1fr",
      gap: "14px",
      items: [
        { type: "video", src: "/assets/castlemotif.jpg", alt: "Video placeholder", aspect: "16 / 9" },
        { type: "video", src: "/assets/torre.jpg", alt: "Video placeholder", aspect: "16 / 9" },
      ],
    },
    ],
  },
  {
    key: "unsplash",
    eyebrow: "PHOTOGRAPHY · ONGOING",
    accent: "teal",
    title: "3.5M+ views on Unsplash",
    facts: [
      { label: "ACCOUNT", value: "@sgfphotography" },
      { label: "VIEWS", value: "3.5M+ · 35,000 downloads", highlight: true },
      { label: "KIT", value: "iPhone XR → EOS 400D → 200D → Lumix G9" },
      { label: "ALSO", value: "Drone work, torredisopra.com" },
    ],
    blocks: [
    { kind: 'heading', text: "The alternative to Instagram" },
    {
      kind: 'paragraph',
      content: [
        "I started photography at nine years old on my mum’s iPhone XR having done a photography course with one of her friends just before the Covid lockdown. I kept going and soon had an entry‑level DSLR, a Canon EOS 400D, which was a game‑changer for me. Wanting a place to publish these photos so I could show others, and not being allowed Instagram at that age, I turned to Unsplash, where I have published personal hobbyist photography ever since.",
      ],
    },
    { kind: 'heading', text: "Growing in photography" },
    {
      kind: 'paragraph',
      content: [
        "I then sold the 400D (albeit not for much at all!) and bought a 200D, which again felt like an entirely new experience, using this camera for many years. Then in June 2025, I sold that, along with the other lenses I had bought, for a Panasonic Lumix G9. Being a M43 sensor rather than an APS‑C one, it was arguably lower specs for photography – but by this stage I was doing lots of videography too, so I was after its budget‑friendly 4K60 and 10‑bit 4:2:2 video capabilities. The set had a Leica f/2.8 lens, the fastest of any lens I had owned prior, which again had a significant impact on my images.",
      ],
    },
    { kind: 'heading', text: "Unsplash grows along too" },
    {
      kind: 'paragraph',
      content: [
        "Now my account – @sgfphotography – has 3.5M+ views, with 35,000 downloads. Below you will find a selection of my favourite images.",
      ],
    },
    { kind: 'heading', text: "La Torre di Sopra: drone work" },
    {
      kind: 'paragraph',
      content: [
        "My grandfather, Bruno Sacchi, was a renowned architect in Italy in the 50s until the 80s – in the 70s he bought and redeveloped La Torre di Sopra, a watchtower dating to c. 950 AD. My family now rent it out, and to help with the website and social media, I took some drone shots, and did some photography around the garden. Some of what you see on torredisopra.com is my work.",
      ],
    },
    {
      kind: 'media',
      columns: "repeat(4, 1fr)",
      gap: "12px",
      items: [
        { type: "image", src: "/assets/wideisa.jpg", alt: "Placeholder image", aspect: "1 / 1" },
        { type: "image", src: "/assets/lampmoon.jpg", alt: "Placeholder image", aspect: "1 / 1" },
        { type: "image", src: "/assets/castlemotif.jpg", alt: "Placeholder image", aspect: "1 / 1" },
        { type: "image", src: "/assets/auracat.jpg", alt: "Placeholder image", aspect: "1 / 1" },
      ],
    },
    ],
  },
  {
    key: "drums",
    eyebrow: "MUSIC · SINCE 2021",
    accent: "acid",
    title: "Drums, and the band around them",
    facts: [
      { label: "DRUMS", value: "Grade 8" },
      { label: "PIANO", value: "Grade 4" },
      { label: "CHURCH BAND", value: "Every few Sundays since 2021" },
      { label: "ROCK CONCERT", value: "2026" },
    ],
    blocks: [
    {
      kind: 'paragraph',
      content: [
        "Grade 8 drums, Grade 4 piano. I have drummed for my local church every few Sundays since 2021 and played my school’s Rock Concert this year, so I know both the band side and the theory side.",
      ],
    },
    { kind: 'note', tone: "muted", text: "ROOM FOR MORE HERE — SET LIST, KIT, WHO YOU PLAY WITH" },
    {
      kind: 'media',
      columns: "1fr 1fr",
      gap: "14px",
      items: [
        { type: "video", src: "/assets/torre.jpg", alt: "Video placeholder", aspect: "16 / 9" },
        { type: "image", src: "/assets/auracat.jpg", alt: "Placeholder image", aspect: "16 / 9" },
      ],
    },
    ],
  },
  {
    key: "florentine",
    eyebrow: "WRITING · NATIONAL SHORTLIST",
    accent: "teal",
    title: "Florentine Skies",
    facts: [
      { label: "COMPETITION", value: "Walter Scott Young Writer’s Award 2025" },
      { label: "OUTCOME", value: "Shortlisted, around 10 in my age group", highlight: true },
      { label: "ALSO PUBLISHED", value: "The Lion Print" },
    ],
    blocks: [
    { kind: 'heading', text: "Writer’s Room" },
    {
      kind: 'paragraph',
      content: [
        "Since I joined my school I have been participating weekly in the Writer’s Room club, which I have loved – a chance to refine and maintain creative writing skills, which were all too rarely taught in our classrooms in my view. Having entered the Walter Scott Young Writer’s Award for 2025 with the piece Florentine Skies, a few months later I found myself shortlisted for my age group in a list of around 10 from a national competition. As a result, it was also published in our school’s annual Lion Print magazine, and there is to this day a poster in the English corridor bearing my achievement. You can read it below if you wish.",
      ],
    },
    {
      kind: 'excerpt',
      eyebrow: "THE PIECE, IN FULL",
      title: "Florentine Skies",
      paragraphs: [
        "I wonder what the sky tastes like. The morning sky is a soupy concoction of froth and fluff and cauliflower patches, glistening with the eggy blood spilled from the sun, swimming in a turquoise bowl. Birds, like pepper, dot the sky as they flutter along their perpetual pilgrimage, their destination lost in their journey. An airy mist dances in the valleys, choreographed by the planet’s gentle breath, before the day heats up and burns it all away.",
        "Florence, from up here, is a beautifully uneven array of crimson tiles, shattered into hundreds of homes, dwellings, and churches. Cobblestone alleyways wind their way among the rooftops, like stone‑cold blood vessels in some dormant creature. In my mind, those vessels really do carry Florence’s blood, as age‑old traditions and trade flow through its veins, radiating life and culture.",
        "The mountainous outskirts of the city are where the other half of Tuscan culture lies. Rolling, green hills, made of olives trees and built on tradition, make up the landscape. The odd hut pierces the verdant view, usually a farmer’s residence, and sometimes an olive press. Back here, in the fields surrounding the tower, we have our own olive grove. Every year, in the picking season, we go and hand‑pick each olive and let them drop onto nets we’ve used for generations. After tipping the contents of the nets into massive wooden crates, we take them by cart to our local press. This is my favourite part ‑ the cogs and wheels and machinery, all operated by hand. Each of the parts working for one purpose and one purpose only, and if one of them failed, nothing would work. It is an ingeniously complex marvel of engineering.",
        "It is that machine, and the wonders of nature in innovation, that planted a seed in my mind ‑ a seed that I’m sure will stick with me for life. That seed is already growing in my brain, sprouting its vivid roots of creativity ‑ and its fruits have become physical. Down in the Cantina, deep below the tower’s courtyard, I have been working on my most complex, adventurous, and wonderfully absurd project yet ‑ a flying machine. It is made to represent nature’s ingenuity, to replicate a bird ‑ specifically an Upupa, a uniquely crested bird that resides in one of the tower’s arrow‑slits. These birds have been supernaturally encoded for flight, and my plan has been to replicate that design with my creation, using wood and silk. And finally, after a year of glue and wood and sweat and toil, the main frame is complete. All that remains now is to install the membrane and implement the mechanisms.",
        "I hop off my windowsill, my bare feet making contact with the rough wooden flooring and my mind frantically vibrating with joyous anticipation. Today would be the day I’d finish the entire project, and I could prove to the world that nature held all the answers. I bound down the flights of stairs, the odd slit in the thick stone walls letting the sun fall inside as a sharp beam of orange. I race excitedly out onto the courtyard, and then down the final steps to the Cantina door. As I open it, its wise, wooden smell evoked a host of memories. It is the door I have opened every day, rain or shine. It is the door I have opened to reveal the work I love, and it is the final barrier to unleash the innovative glow of the flying machine.",
        "I step inside, walk over to the silk, and begin lacing it between the slats of wood on the wings, stitching it up when the piece runs out. For the entire afternoon, all that fills my mind is silk and stitching, the scent of glue and silk hanging in the air.",
        "By the time I stitch the final round of silk, it is evening. Anticipation flutters about in my stomach, coaxing me to end this journey. It is really happening. It feel as if my machine has been building itself a personality, coming alive, and beckoning me to flight. It is calling me to swim in the sky among the Upupas, and I daren’t refuse.",
        "Now it is all ready. I fold up the wings, and open the double doors from the Cantina. It barely makes it through, and after pulling it up the stairs with its wheels, I drag it to the field, my heart threatening to thump out of my chest. I chose this field as it was clear, and gently sloping down towards the city beyond.",
        "I line up years of effort on to the field, and unfold the wings.",
        "The horizon is glowing, like a fire encapsulating the earth. The sun is sinking into it, and as it melts into the night, it suddenly becomes my life. This could all fail. Are these my last moments? My very existence is melting into the horizon, sinking into the night, where it could cease to exist. I could die tonight; my duty here is done.",
        "Tentatively, with my stomach wrung tight like a muslin cloth, I enter my machine. My hands and feet find their way to the controls. I flap, and flap, and use all that remains of my might to power the initial lift. I feel the whole structure gently rise off the ground, and with my mind frozen in wonder, I cannot tell if I am about to leave home forever or return to where I belonged.",
      ],
    },
    {
      kind: 'media',
      columns: "1fr 1fr",
      gap: "14px",
      items: [
        { type: "image", src: "/assets/castlemotif.jpg", alt: "Placeholder image", aspect: "3 / 2" },
        { type: "image", src: "/assets/wideisa.jpg", alt: "Placeholder image", aspect: "3 / 2" },
      ],
    },
    ],
  },
  {
    key: "journals",
    eyebrow: "DESIGN · 2023–24",
    accent: "flame",
    title: "Christian Youth Journals, from scratch",
    facts: [
      { label: "YEARS", value: "2023–24" },
      { label: "MY ROLE", value: "Design, print, sale, distribution" },
      { label: "TOOLS", value: "Illustrator, then InDesign" },
      { label: "RESULT", value: "Two editions sold out · almost £1k profit", highlight: true },
    ],
    blocks: [
    { kind: 'heading', text: "The gap in the market" },
    {
      kind: 'paragraph',
      content: [
        "Journals exist for adults and teens alike in the secular industry. Journals for Christian adults exist too, but journals for Christian teens, after looking for one myself, are few and far between – leaving a variety far too small to ensure all Christian teens who want a journal have one. Already having experience in Adobe Illustrator as I helped my mum design greeting cards, I decided to make some myself with all the features I wanted.",
      ],
    },
    {
      kind: 'paragraph',
      content: [
        "Before fleshing out the design I spent a while figuring out what I was looking for in a youth journal, and what I thought my friends would also like. Eventually, the design was as per the images shown across the page; QR codes for music, links for those without a Bible, accessible book and app recommendations, daily verses with space to memorise them, places to keep track of prayers and life in general, blank pages to draw and listen to God, a unisex design theme and more.",
      ],
    },
    {
      kind: 'paragraph',
      content: [
        "These journals were selling well on my mum’s website for her business – I ordered 200 copies, breaking even having sold only 80 or so. Just before they ran out, I then created a revised second edition. Much of the content was similar, but it was made in Adobe InDesign instead of Illustrator – an app much more suitable for tasks such as these, resulting in a much more polished, coherent design. Then both versions sold out, in total resulting in almost £1k in profit.",
      ],
    },
    {
      kind: 'media',
      columns: "1fr 1fr",
      gap: "14px",
      items: [
        { type: "image", src: "/assets/torre.jpg", alt: "Placeholder image", aspect: "3 / 4" },
        { type: "image", src: "/assets/lampmoon.jpg", alt: "Placeholder image", aspect: "3 / 4" },
      ],
    },
    ],
  },
];

export const projectsByKey: Record<ProjectKey, Project> = Object.fromEntries(
  projects.map((project) => [project.key, project]),
) as Record<ProjectKey, Project>;
