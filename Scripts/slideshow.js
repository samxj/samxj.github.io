(function () {
      // Put the filenames from your Assets folder here (relative path)
      const images = [
        'Assets/Slideshow/lamp&moon.jpg',
        'Assets/Slideshow/hausonhill169.jpg',
        'Assets/Slideshow/ITAF rising 2.jpg',
        'Assets/Slideshow/Bike by Door Alt.jpg',
        'Assets/Slideshow/Rally Car 2!.jpg',
        'Assets/Slideshow/wide isa 2.jpg',
        'Assets/Slideshow/Red Arrows Twirl.jpg',
        'Assets/Slideshow/cat&lamp2.jpg',
        'Assets/Slideshow/Eiffel Shadow H.jpg',
        'Assets/Slideshow/evening road.jpg',
        'Assets/Slideshow/horse eye.jpg',
        'Assets/Slideshow/isa.jpg',
        'Assets/Slideshow/pingpong1.jpg',
        'Assets/Slideshow/pingpong2.jpg',
        'Assets/Slideshow/pingpong3.jpg',
        'Assets/Slideshow/playcat2bw.jpg',
        'Assets/Slideshow/playcatbw.jpg',
        'Assets/Slideshow/tawahh.jpg'
      ];

      if (!images.length) return;

      const a = document.getElementById('bgA');
      const b = document.getElementById('bgB');
      let front = a, back = b;
      let currentIndex = Math.floor(Math.random() * images.length);

      front.style.backgroundImage = `url('${images[currentIndex]}')`;
      front.classList.add('visible');

      function nextImage() {
        // pick a different random index
        let next;
        do {
          next = Math.floor(Math.random() * images.length);
        } while (next === currentIndex && images.length > 1);

        back.style.backgroundImage = `url('${images[next]}')`;
        // trigger crossfade
        back.classList.add('visible');
        front.classList.remove('visible');

        // swap references after transition so next time we can reuse back element
        [front, back] = [back, front];
        currentIndex = next;
      }

      // change every 5 seconds
      setInterval(nextImage, 4000);
    })();