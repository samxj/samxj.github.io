// This project's article: an ordered list of blocks rendered top to bottom on its detail page.
//   { type: 'paragraph', text: 'Some prose.' }
//   { type: 'image', src: 'assets/images/sjhw/2.jpg', caption: 'Optional caption.' }  // src: a single file, or a directory of images
//   { type: 'video', src: 'https://youtu.be/VIDEO_ID', title: 'Optional header.', caption: 'Optional caption.' }  // src: a YouTube link, or a file in assets/videos
//   { type: 'heading', text: 'A subheading.' }
//   { type: 'list', items: ['First item.', { text: 'Item with sub-points.', items: ['Nested one.', 'Nested two.'] }] }
//   { type: 'download', src: 'CV.pdf', label: 'Optional button label.' }  // src: a file in /public
export const content = [
    { type: 'heading', text: "Sabbatical" },
    { type: 'paragraph', text: "As my father is a vicar, he gets a two-month leave every seven years both to rest and to visit churches – one of those we visited for a few days as a family was Chanctonbury Church in Ashington. They happened to have a Mission Day event happening then – a day of events to support the local community in ways such as gardening and litter picking. I asked if I could make them a video to showcase this, which they agreed to; so I made the video solo, filming all the day’s events and compiling them to music. They liked it enough to play it in church the following Sunday!" },
];
