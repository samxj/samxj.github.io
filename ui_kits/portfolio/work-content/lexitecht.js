// This project's article: an ordered list of blocks rendered top to bottom on its detail page.
//   { type: 'paragraph', text: 'Some prose.' }
//   { type: 'image', src: 'assets/images/sjhw/2.jpg', caption: 'Optional caption.' }  // src: a single file, or a directory of images
//   { type: 'video', src: 'https://youtu.be/VIDEO_ID', title: 'Optional header.', caption: 'Optional caption.' }  // src: a YouTube link, or a file in assets/videos
//   { type: 'heading', text: 'A subheading.' }
//   { type: 'list', items: ['First item.', { text: 'Item with sub-points.', items: ['Nested one.', 'Nested two.'] }] }
//   { type: 'download', src: 'CV.pdf', label: 'Optional button label.' }  // src: a file in /public
export const content = [
    { type: 'heading', text: "Fed up with spreadsheets" },
    { type: 'paragraph', text: "After Leúiraciu, I made a few other, smaller languages – and kept having the problem of needing to navigate an ugly-looking spreadsheet, or trawl through pages of textbook to find the grammar I needed to translate something. I wanted an app that could:" },
    { type: 'list', items: [
        { text: "Keep track of my lexicon", items: [
            "Principal parts, and pronunciation with sound recording",
            "Spaces for notes and etymology",
            "Have the option to select a font I made to visualize the script on a computer",
        ] },
        { text: "Generate new words", items: [
            "A system which generates batches of new words according to a provided phonemic inventory, phonotactical constraints and other phonological rules.",
        ] },
        { text: "Apply sound changes to simulate language evolution", items: [
            "Given a set of words and a system for sounds to change, the app should be able to batch apply changes",
        ] },
        "Keep track of grammar with a space to store conjugations and declensions",
        "Be able to translate basic sentences between English and any conlang loaded into it.",
    ] },
    { type: 'paragraph', text: "I could find no app capable of these, so I decided to make it myself, applying those features in that order. It was like being a lexicon ‘architect’ – and so Lexitecht was born." },
    { type: 'heading', text: "Cutie Pie? No, PyQT." },
    { type: 'paragraph', text: "This was when AI was not widely used – I programmed every line of the program, using w3schools or YouTube videos to help. The only language I knew well enough to make such a complex task was Python 3, so I used the PyQt5 library for the GUI. Slowly but surely, each of the features was fairly straightforward to implement. Each language had its own custom .lxl language file." },
    { type: 'heading', text: "The Translation System" },
    { type: 'paragraph', text: "Then it became time to flesh out a system which can translate English to the conlang. To do this, I decided to make an ‘intermediate language’ – a way of encoding English text to their grammatical values. For example, ‘you’ is a 2nd person singular pronoun, so is encoded to PRN2S. Similarly, ‘eating’ is a participle, so is encoded to PTCP. This was done using the NLTK toolkit to identify individual words like this." },
    { type: 'paragraph', text: "However, the complication arose when looking at more than one word at a time – ‘am eating’ and ‘was eating’ are both two words, but they correspond to one unit of grammar: one compound tense. Therefore I had to create a whole set of systems encompassing all the English language’s tenses to decipher this – a present verb ‘am’ (encoded as VB1SPAI, PAI being present active indicative) followed by a PTCP ‘eating’, for example, makes VB1SCAI, where the ‘C’ is continuous present. This of course is a simplification of the algorithm, which is 500 lines of the 3,000-line program." },
    { type: 'paragraph', text: "However, somehow it was successful with simple sentences, and proved to be a huge help – it gave me an instant starting point for longer paragraphs rather than going through masses of spreadsheet. You can see the app on GitHub, linked here." },
];
