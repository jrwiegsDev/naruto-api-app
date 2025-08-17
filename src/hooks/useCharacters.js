import { useState, useEffect } from 'react';

export function useCharacters() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [villages, setVillages] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [charResponse, villageResponse] = await Promise.all([
          fetch('https://dattebayo-api.onrender.com/characters?limit=1500'),
          fetch('https://dattebayo-api.onrender.com/villages'),
        ]);

        if (!charResponse.ok) throw new Error('Failed to fetch characters');
        if (!villageResponse.ok) throw new Error('Failed to fetch villages');

        const charData = await charResponse.json();
        const villageData = await villageResponse.json();
        
        const allRanks = charData.characters.flatMap(c => Object.values(c.rank?.ninjaRank || {})).filter(Boolean);
        const uniqueRanks = [...new Set(allRanks)].sort();

        setAllCharacters(charData.characters);
        setVillages(villageData.villages);
        setRanks(uniqueRanks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  return { allCharacters, villages, ranks, loading, error };
}