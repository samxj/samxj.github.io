// This project's article: an ordered list of blocks rendered top to bottom on its detail page.
//   { type: 'paragraph', text: 'Some prose.' }
//   { type: 'image', src: 'assets/images/sjhw/2.jpg', caption: 'Optional caption.' }  // src: a single file, or a directory of images
//   { type: 'video', src: 'https://youtu.be/VIDEO_ID', title: 'Optional header.', caption: 'Optional caption.' }  // src: a YouTube link, or a file in assets/videos
//   { type: 'heading', text: 'A subheading.' }
//   { type: 'list', items: ['First item.', { text: 'Item with sub-points.', items: ['Nested one.', 'Nested two.'] }] }
//   { type: 'download', src: 'CV.pdf', label: 'Optional button label.' }  // src: a file in /public
export const content = [
    { type: 'heading', text: "What Red Robin Art was" },
    { type: 'paragraph', text: "In 2023, I left my prep school to join secondary; in the same year, my Art teacher left to start her own studio, about a 10 minute walk from my house, called Red Robin Art. As she was trying to build a social media presence, she asked me if I could make her a video to post on social media, and I gladly accepted. As always, I planned, shot and edited it all on my own – it is still on her website to this day." },
];
