/* $(function() {
  $('.item').text('Hello, world!');
  $('.start').on('click', function() {
      $('.container').addClass('container_active');
      $('.item').animate({
          top: '50%',
          left: '50%'
      }, {
          duration: 1000,
          easing: 'linear'
      });
  });
}); */

window.onload = function(){

  function animate(options) {

    var start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      // timeFraction от 0 до 1
      var timeFraction = (time - start) / options.duration;
      if (timeFraction > 1) timeFraction = 1;
  
      // текущее состояние анимации
      var progress = options.timing(timeFraction)
  
      options.draw(progress);
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
  }

  function getCoords(container, item){
    var computedStyleItem = getComputedStyle(item),
        computedStyleContainer = getComputedStyle(cotainer),
        topLocal = parseFloat(computedStyleItem.top.replace('px',''))/parseFloat(computedStyleContainer.height.replace('px',''))*100,
        leftLocal = parseFloat(computedStyleItem.left.replace('px',''))/parseFloat(computedStyleContainer.width.replace('px',''))*100;

    return {top: topLocal,
            left: leftLocal
           }    
  }

  var item = document.getElementsByClassName('item')[0],
      node = document.createTextNode('Hello, world!'),
      button = document.getElementsByClassName('start')[0],
      cotainer = document.getElementsByClassName('container')[0],
      startCoords = getCoords(cotainer, item);
  
  item.appendChild(node);

  button.addEventListener('click', function(e){
    e.preventDefault();

    cotainer.classList.add('container_active');
    animate({
      duration: 1000,
      timing: function(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        item.style.top = (startCoords.top + progress * 100 * 0.4) + '%';
        item.style.left = (startCoords.left + progress * 100 * 0.4) + '%';
      }
    });
  })
}  