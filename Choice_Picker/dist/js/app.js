const tagsEl = document.getElementById('tags');
const textInput = document.getElementById('textarea');

textInput.focus();

textInput.addEventListener('keyup', function (e) {
   const createTags = (input) => {
      const tags = input.split(',').filter((item) => {
         return item.trim();
      }).map((item) => {
         return item.trim()
      })

      tagsEl.innerHTML = '';

      tags.forEach(function (item) {
         const tagEl = document.createElement('span');
         tagEl.classList.add('tag');
         tagEl.innerText = item;
         tagsEl.appendChild(tagEl);
      });
   }

   createTags(e.target.value);

   if (e.key === 'Enter') {
      // CLEAR INPUT
      setTimeout(function() {
         e.target.value = '';
      }, 10);


      // DECLEAR ALL THE FUNCTIONS
      const pickRandomTag = () => {
         const tags = document.querySelectorAll('.tag');   
         return tags[Math.floor(Math.random() * tags.length)];
      }

      const highlightTag = (tag) => {
         tag.classList.add('high');
      }

      const unhighlightTag = (tag) => {
         tag.classList.remove('high');
      }


      const selectRandom = () => {
         const times = 30;

         // BLINK EFFECT CHOOSE RANDOM
         const interval = setInterval(function() {
            
            const randomTag = pickRandomTag();
            highlightTag(randomTag);

            setTimeout(function() {
               unhighlightTag(randomTag);
            }, 100);

         }, 100);


         // CELAR EVERYTHING & SELECT
         setTimeout(function() {
            clearInterval(interval);

            setTimeout(function() {
               const randomTag = pickRandomTag();
               highlightTag(randomTag);
            }, 100);

         }, times * 100);
      }

      selectRandom();

   }
});
