// This project's article: an ordered list of blocks rendered top to bottom on its detail page.
//   { type: 'paragraph', text: 'Some prose.' }
//   { type: 'image', src: 'assets/images/sjhw/2.jpg', caption: 'Optional caption.' }  // src: a single file, or a directory of images
//   { type: 'video', src: 'https://youtu.be/VIDEO_ID', title: 'Optional header.', caption: 'Optional caption.' }  // src: a YouTube link, or a file in assets/videos
//   { type: 'heading', text: 'A subheading.' }
//   { type: 'list', items: ['First item.', { text: 'Item with sub-points.', items: ['Nested one.', 'Nested two.'] }] }
//   { type: 'download', src: 'CV.pdf', label: 'Optional button label.' }  // src: a file in /public
export const content = [
    { type: 'heading', text: "La Torre di Sopra" },
    { type: 'paragraph', text: "My grandfather, Bruno Sacchi, was a renowned architect in Italy in the 50s until the 80s – in the 70s he bought and redeveloped La Torre di Sopra, a watchtower dating to c. 950 AD. My family now rent it out, and to help with the website and social media, I took some drone shots, and did some photography around the garden. Some of what you see on torredisopra.com is my work." },
];
