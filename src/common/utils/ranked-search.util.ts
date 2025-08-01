  import * as stringSimilarity from 'string-similarity';

const rankedSearch = (target: string, query: string) => {
   if (!target || !query) return 0;
   
   const targetWords = target.split('');
   const queryWords = query.split('');

   let totalScore = 0;

   for(const queryWord of queryWords) {
      const { bestMatch } = stringSimilarity.findBestMatch(queryWord, targetWords);
      if (bestMatch.rating < 0.4) return 0;

      totalScore += bestMatch.rating;
   }

   return totalScore / queryWords.length;
}

export default rankedSearch;