const fuzzySearch = (source: string, target: string) => {
   const MAX_DISTANCE = 2;
   const sourceLetters = source.toLowerCase().split('');
   const targetLetters = target.toLowerCase().split('');

   const rows = sourceLetters.length + 1;
   const cols = targetLetters.length + 1;

   const matriz: number[][] = [];

   for (let i = 0; i <= rows; i++) {
      matriz[i] = [];
      for (let j = 0; j <= cols; j++) {
         if(i === 0) { 
            matriz[i][j] = j;
         } else if(j === 0) {
            matriz[i][j] = i;
         } else {
            matriz[i][j] = 0
         }
      }
   }

   for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= cols; j++) {
         const letterFromSource = sourceLetters[i - 1];
         const letterFromTarget = targetLetters[j - 1];

         if(letterFromSource === letterFromTarget) {
            matriz[i][j] = matriz[i - 1][j - 1];
         } else {
            const insertion = matriz[i][j - 1];
            const deletion = matriz[i -1][j];
            const substitution = matriz[i - 1][j - 1];

            matriz[i][j] = Math.min(insertion, deletion, substitution) + 1;
         }
      }
   }

   return matriz[rows -1][cols - 1] <= MAX_DISTANCE;
}