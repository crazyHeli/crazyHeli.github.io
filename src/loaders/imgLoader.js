export const imgsLoader = function(sources, callback) {
    const images = {};
    let loadedImages = 0;
    let numImages = 0;
    // get num of sources
    for(let src in sources) {
        numImages++;
    }
    for(let src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages && callback) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
    return images;
}
