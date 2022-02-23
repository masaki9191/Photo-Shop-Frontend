export const currentData = (data, current, itemsPerPage) => {
  const begin = (current - 1) * itemsPerPage;
  const end = begin + itemsPerPage;
  return data.slice(begin, end);
};

export const fadeZoomIn = {
  "data-aos": "fade-zoom-in",
  "data-aos-offset": 200,
  "data-aos-easing": "ease-in-sine",
  "data-aos-duration": 1000
}