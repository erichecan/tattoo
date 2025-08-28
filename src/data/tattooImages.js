// Tattoo Images Data - 2025-08-27 23:31:00
// 包含从艺术家官网爬取的真实图片

export const tattooImages = {
  Japanese: {
    name: 'Japanese Traditional / Irezumi',
    description: 'Traditional Japanese tattoo art with rich cultural symbolism',
    images: [
      '/Japanese/japanese_02.jpg',
      '/Japanese/japanese_03.jpeg',
      '/Japanese/japanese_04.jpg',
      '/Japanese/japanese_05.png',
      '/Japanese/japanese_06.webp',
      '/Japanese/japanese_07.jpg',
      '/Japanese/japanese_09.jpg',
      '/Japanese/japanese_10.jpg',
      '/Japanese/japanese_11.jpeg',
      '/Japanese/japanese_12.jpg',
      '/Japanese/japanese_13.jpg',
      '/Japanese/japanese_15.jpeg',
      '/Japanese/japanese_17.jpg',
      '/Japanese/japanese_18.jpg',
      '/Japanese/japanese_19.jpg',
      '/Japanese/japanese_20.webp',
      '/Japanese/japanese_21.jpeg',
      '/Japanese/japanese_22.jpeg',
      '/Japanese/japanese_23.jpeg',
      '/Japanese/japanese_24.jpg',
      '/Japanese/japanese_25.png',
      '/Japanese/japanese_26.jpg',
      '/Japanese/japanese_27.jpg',
      '/Japanese/japanese_28.jpg',
      '/Japanese/japanese_29.jpg',
      '/Japanese/japanese_30.jpeg'
    ]
  },
  Realism: {
    name: 'Black & Grey Realism',
    description: 'Photorealistic black and grey tattoo artistry',
    images: [
      '/Realism/realism_01.jpg',
      '/Realism/realism_02.jpg',
      '/Realism/realism_03.png',
      '/Realism/realism_04.jpg',
      '/Realism/realism_05.jpg',
      '/Realism/realism_06.jpg',
      '/Realism/realism_07.jpg',
      '/Realism/realism_08.jpg',
      '/Realism/realism_09.jpg',
      '/Realism/realism_10.jpg',
      '/Realism/realism_11.jpg',
      '/Realism/realism_12.jpg',
      '/Realism/realism_13.jpg',
      '/Realism/realism_14.jpg',
      '/Realism/realism_15.jpg',
      '/Realism/realism_16.jpg',
      '/Realism/realism_17.jpg',
      '/Realism/realism_18.jpg',
      '/Realism/realism_19.jpg',
      '/Realism/realism_20.jpg',
      '/Realism/realism_21.jpg',
      '/Realism/realism_22.jpg',
      '/Realism/realism_23.png',
      '/Realism/realism_24.jpg',
      '/Realism/realism_25.png',
      '/Realism/realism_26.jpg',
      '/Realism/realism_27.jpg',
      '/Realism/realism_28.png',
      '/Realism/realism_29.jpg',
      '/Realism/realism_30.jpg'
    ]
  },
  Traditional: {
    name: 'New Traditional / Color Realism',
    description: 'Bold traditional designs with vibrant colors',
    images: [
      '/Traditional/traditional_03.jpg',
      '/Traditional/traditional_05.jpg',
      '/Traditional/traditional_06.jpg',
      '/Traditional/traditional_07.png',
      '/Traditional/traditional_09.png',
      '/Traditional/traditional_10.webp',
      '/Traditional/traditional_11.png',
      '/Traditional/traditional_13.jpg',
      '/Traditional/traditional_14.jpg',
      '/Traditional/traditional_15.jpg',
      '/Traditional/traditional_16.jpg',
      '/Traditional/traditional_17.jpg',
      '/Traditional/traditional_18.jpg',
      '/Traditional/traditional_20.jpg',
      '/Traditional/traditional_21.jpg',
      '/Traditional/traditional_23.jpg',
      '/Traditional/traditional_24.jpg',
      '/Traditional/traditional_25.png',
      '/Traditional/traditional_26.png',
      '/Traditional/traditional_29.jpg',
      '/Traditional/traditional_30.png'
    ]
  },
  Chicano: {
    name: 'Chicano / Street Art',
    description: 'Urban street art style with cultural heritage',
    images: [
      '/Chicano/chicano_01.jpeg',
      '/Chicano/chicano_02.jpg',
      '/Chicano/chicano_03.jpeg',
      '/Chicano/chicano_04.jpg',
      '/Chicano/chicano_05.png',
      '/Chicano/chicano_06.jpg',
      '/Chicano/chicano_07.jpeg',
      '/Chicano/chicano_08.jpg',
      '/Chicano/chicano_09.jpg',
      '/Chicano/chicano_10.jpeg',
      '/Chicano/chicano_11.jpeg',
      '/Chicano/chicano_13.jpg',
      '/Chicano/chicano_14.jpg',
      '/Chicano/chicano_15.jpg',
      '/Chicano/chicano_16.jpg',
      '/Chicano/chicano_17.jpg',
      '/Chicano/chicano_18.jpg'
    ]
  },
  Geometric: {
    name: 'Sacred Geometry',
    description: 'Mathematical precision meets spiritual symbolism',
    images: []
  },
  Dark: {
    name: 'Surreal / Dark Style',
    description: 'Mysterious and surreal dark art tattoos',
    images: []
  },
  Blackwork: {
    name: 'Blackwork',
    description: 'Bold black ink designs with strong contrast',
    images: []
  },
  Tribal: {
    name: 'Tribal',
    description: 'Ancient tribal patterns and cultural designs',
    images: []
  },
  Watercolor: {
    name: 'Watercolor',
    description: 'Soft, flowing watercolor-style tattoos',
    images: []
  },
  Minimalist: {
    name: 'Minimalist',
    description: 'Simple, clean, and elegant designs',
    images: []
  }
};

// 获取所有可用的风格
export const availableStyles = Object.keys(tattooImages).filter(
  style => tattooImages[style].images.length > 0
);

// 获取指定风格的图片
export const getImagesByStyle = (style) => {
  return tattooImages[style]?.images || [];
};

// 获取所有图片用于 Portfolio 页面
export const getAllImages = () => {
  const allImages = [];
  Object.keys(tattooImages).forEach(style => {
    if (tattooImages[style].images.length > 0) {
      tattooImages[style].images.forEach((image, index) => {
        const filename = image.split('/').pop();
        const nameWithoutExt = filename.split('.')[0];
        allImages.push({
          id: `${style}_${index + 1}`,
          src: image,
          alt: `${tattooImages[style].name} - ${filename}`,
          style: style,
          title: `${tattooImages[style].name} Design`
        });
      });
    }
  });
  return allImages;
};
