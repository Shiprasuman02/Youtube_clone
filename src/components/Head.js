import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';


const Head = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    // console.log(searchQuery);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector((store) => store.search);
    const dispatch = useDispatch();
    /**
     * search Cache= {
     * "iphone": ["iphone 11", "iphone 14"]
     * }
     * searchQuery = iphone
     */
    useEffect(() => {
        //API call
        //   console.log(searchQuery);

        // make an api call after every key press
        // but if the difference between 2 API calls is <200ms
        // decline the API call
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            } else {
                getSearchSuggestions();
            }
        }, 200);


        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    /**
     * 
     * key-i
     * - render the component
     * - useEffect();
     * - start timer => make api call after 200ms
     * 
     * key - ip
     * - destroy the component(useEffect return method)
     * -  re-render the component
     * - useEffect()
     * - start timer => make api call after 200ms
     * 
     * 
     * 
     * setTimeout(200) - make an api call
     */
    const getSearchSuggestions = async () => {
        //     console.log("API CALL - " + searchQuery);
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        //   console.log(json[1]);
        setSuggestions(json[1]);

        //update cache
        dispatch(cacheResults({
            [searchQuery]: json[1],
        })
        );
    };


    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };

    return (
        <div className='grid grid-flow-col p-3 m-2 shadow-lg'>
            <div className='flex col-span-1 '>
                <img
                    onClick={() => toggleMenuHandler()}
                    className='h-6 cursor-pointer'
                    alt=" menu" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADPz89LS0uWlpaPj4/4+PhfX1/29vawsLAdHR3b29v8/PzExMQzMzOEhIRzc3MPDw+hoaGysrLq6uo8PDwXFxfh4eFkZGRXV1fGxsZGRkaHh4fX19d6enqnp6e7u7sLhoRgAAAChUlEQVR4nO3di1LCQAyF4eWOCIgIqPWC7/+UWhm8jZNs2Z3JJP2/J8gZK+1u02xKAAAAAAAAAAAAAAAAABDfcjWZjfyYTVbLTvl2rwN/Nrv8gBPrYi80ycw33VtXerH9NCvgwbrOAoeciGvrKous9YA31jUWutEC3ltXWOxeSfhgXWCxBzng3Lq+CuZiwivr8iq4EhNurMurYCMm9H2rOJFvGNbVVdHzhJ6f2M4WYsJH6/IqeBQTel03/SSvoYbW5VUwFBOmW+v6it3KAdPRusBiRyVhWlhXWEj+JW29WJdY6EVN6PzhW71GW1vrKgtscwKm1FjXebEmL+DHOtjjhvDHskle+/7JOPa2abofd9jyPpleD/24ztoKBgAAAAAAAAAAPs2b49iPY9PlvVPrbWT9Lqmz0VuHfEOf7QoLpZPm27N1qRdT29hPZtZ1FpjlBPTdJiw3CH+6s66x0J0W0H+zvnbb8P7JzGDwLAdcWtdXgfyp5cq6vApWwS9S7ab4ZF1eBU9iQv8twlqTsHV1VfT8bxj//zD+b2n8+2GEZxoxoOfV75nyXBpgbaH20vr+GCFjfdiDNX4P9mk8/9povzJfwu+Xpvh73q3o7y0AAAAAAAAAAIAjwedE7cbeZiavO836mvt8050/r83vzD25WehL+LmJvme0Zsy+jD+/1GeTwjd1Bq3va7SlXaf+m4SVWdDx53nHn8kef65+hLMRDmJC6+qq6HlCb2um/8jnzPhcNv0mtwl77/JuyZ3e/lv11Q+Bw5+71oOz89x/25UxOML3DSPjDMsenEMa/yzZ5HcNlXsecHJ6pvNrtwMulo2zc7mbbudyAwAAAAAAAAAAAAAAAIBP7y86VZGfUH/eAAAAAElFTkSuQmCC"

                />
                <a href="/">
                    <img
                        className='h-6 mx-5'
                        alt=" youtube-logo"
                        src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHMUb8U4VeW2y-RflH7U7Yp0tsx1hJv0PwQ&usqp=CAU" />
                </a>
            </div>
            <div className='flex col-span-10 px-40'>
                <div className='flex'>


                    <input className='w-[400px] border border-gray-400 p-2  rounded-l-full'
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                    />
                    <button className='border border-gray-400 p-3 py-2 rounded-r-full bg-gray-100 h-[41px]'>
                        <IoSearchOutline size={25} />
                    </button>
                </div>
                {showSuggestions && (
                    <div className='fixed bg-white py-2 px-2  mt-12 m-20 w-[25rem] ml-0.5  shadow-lg rounded-lg border border-gray-100'>
                        <ul>
                            {suggestions.map((s) => (
                                <li className='py-2 px-3 shadow-sm hover:bg-gray-100'>{s}</li>
                            ))}

                        </ul>
                    </div>
                )}
            </div>
            <div className='col-span-1'>
                <img
                    className='h-8'
                    src="data:image/png;base64,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" alt="user" />
            </div>
        </div>
    );
};

export default Head;
