module.exports.chunk  = function(array, n){  
    if (n == 0) {
        return [array];
    }
  return Array(Math.ceil(array.length/n)).fill().map((_,i) => array.slice(i*n,i*n+n));
}
  