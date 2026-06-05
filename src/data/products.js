export const modes = {
  tryOn: {
    categories: [
      { id: 'headwear', label: 'Headwear' },
      { id: 'eyewear', label: 'Eyewear' },
      { id: 'clothing', label: 'Clothing' },
    ],
    products: {
      headwear: [
        {
          id: 'hw-1',
          name: 'Boston Red Sox Cap',
          thumbnail: '/garments/headwear/boston-red-sox.avif',
          image: '/garments/headwear/boston-red-sox.avif',
          prompt: 'Add a navy blue fitted baseball cap with red B logo stitched on the front to the person\'s head, brim facing forward',
        },
        {
          id: 'hw-2',
          name: 'Lakers Snapback',
          thumbnail: '/garments/headwear/lakers.webp',
          image: '/garments/headwear/lakers.webp',
          prompt: 'Add a black flat-brim snapback cap with Los Angeles Lakers yellow and purple logo stitched on the front to the person\'s head',
        },
        {
          id: 'hw-3',
          name: 'Sombrero Mexicano',
          thumbnail: '/garments/headwear/sombrero-mexicano.png',
          image: '/garments/headwear/sombrero-mexicano.png',
          prompt: 'Add a traditional wide-brim Mexican sombrero, woven straw with green white and red stripes and red trim to the person\'s head',
        },
      ],
      eyewear: [
        {
          id: 'ew-1',
          name: 'Taxi Driver',
          thumbnail: '/garments/eyewear/taxi-driver.webp',
          image: '/garments/eyewear/taxi-driver.webp',
          prompt: 'Add gold metal aviator sunglasses with green tinted lenses and double bridge on the face',
        },
        {
          id: 'ew-2',
          name: 'Reservoir Dogs',
          thumbnail: '/garments/eyewear/reservoir-dogs.webp',
          image: '/garments/eyewear/reservoir-dogs.webp',
          prompt: 'Add tortoiseshell browline clubmaster sunglasses with gold metal lower rim and green lenses on the face',
        },
        {
          id: 'ew-3',
          name: 'Fight Club',
          thumbnail: '/garments/eyewear/fight-club.webp',
          image: '/garments/eyewear/fight-club.webp',
          prompt: 'Add silver rectangular metal frame sunglasses with copper brown polarized lenses on the face',
        },
      ],
      clothing: [
        {
          id: 'cl-1',
          name: 'Taupe Blazer',
          thumbnail: '/garments/clothing/blazer.webp',
          image: '/garments/clothing/blazer.webp',
          prompt: 'Substitute current top with a taupe structured single-button blazer, peaked lapels, flap pockets, tailored fit',
        },
        {
          id: 'cl-2',
          name: 'Bomber Jacket',
          thumbnail: '/garments/clothing/bomber.webp',
          image: '/garments/clothing/bomber.webp',
          prompt: 'Substitute current top with an olive green satin bomber jacket, ribbed collar and cuffs, zip front, zip pockets, oversized fit',
        },
        {
          id: 'cl-3',
          name: 'Blue Hoodie',
          thumbnail: '/garments/clothing/hoodie.webp',
          image: '/garments/clothing/hoodie.webp',
          prompt: 'Substitute current top with a light blue cotton pullover hoodie, drawstring hood, kangaroo pocket, relaxed fit',
        },
      ],
    },
  },
  restyle: {
    categories: [
      { id: 'cinematic', label: 'Cinematic' },
      { id: 'animated', label: 'Animated' },
      { id: 'era', label: 'Era' },
    ],
    products: {
      cinematic: [
        {
          id: 'rs-cn-1',
          name: 'Film Noir',
          thumbnail: '/styles/cinematic/noir.svg',
          prompt: 'Black and white film noir, high contrast, deep shadows, venetian blind light',
        },
        {
          id: 'rs-cn-2',
          name: 'Blade Runner',
          thumbnail: '/styles/cinematic/blade-runner.svg',
          prompt: 'Cyberpunk neon city at night, rain, teal and magenta lights, cinematic',
        },
        {
          id: 'rs-cn-3',
          name: 'Wes Anderson',
          thumbnail: '/styles/cinematic/wes-anderson.svg',
          prompt: 'Wes Anderson style, symmetrical composition, pastel palette, soft warm light',
        },
      ],
      animated: [
        {
          id: 'rs-an-1',
          name: 'Studio Ghibli',
          thumbnail: '/styles/animated/ghibli.svg',
          prompt: 'Studio Ghibli animation style, hand-painted backgrounds, soft watercolor light',
        },
        {
          id: 'rs-an-2',
          name: 'Anime',
          thumbnail: '/styles/animated/anime.svg',
          prompt: 'Modern anime style, cel-shaded, bold line art, vibrant colors',
        },
        {
          id: 'rs-an-3',
          name: 'Pixar',
          thumbnail: '/styles/animated/pixar.svg',
          prompt: 'Pixar 3D animation style, stylized characters, soft global illumination',
        },
      ],
      era: [
        {
          id: 'rs-er-1',
          name: '1920s',
          thumbnail: '/styles/era/1920s.svg',
          prompt: '1920s portrait, photorealistic, period clothing — three-piece suit and bow tie or flapper dress with beaded neckline, slicked-back pomade hair or finger-waved bob, cloche hat, sepia black and white film, soft studio lighting, fine grain',
        },
        {
          id: 'rs-er-2',
          name: '80s VHS',
          thumbnail: '/styles/era/vhs.svg',
          prompt: '80s VHS home video, scan lines, chromatic aberration, faded colors',
        },
        {
          id: 'rs-er-3',
          name: 'Renaissance',
          thumbnail: '/styles/era/renaissance.svg',
          prompt: 'Renaissance oil painting, chiaroscuro lighting, rich earthy palette',
        },
        {
          id: 'rs-er-4',
          name: 'Vaporwave',
          thumbnail: '/styles/era/vaporwave.svg',
          prompt: 'Vaporwave aesthetic, pink and cyan gradients, retro computer graphics',
        },
      ],
    },
  },
}

export const categories = modes.tryOn.categories
export const products = modes.tryOn.products
