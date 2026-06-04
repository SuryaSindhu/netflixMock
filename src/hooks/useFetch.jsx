import { useEffect, useState } from 'react';
import { TMDB_OPTIONS } from '../utils/constants';

const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!url) return;

        setData(null);

        fetch(url, TMDB_OPTIONS)
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error(err));
    }, [url]);

    return data;
};

export default useFetch;
