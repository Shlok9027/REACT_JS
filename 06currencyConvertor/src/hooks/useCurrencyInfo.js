import { useEffect, useState } from "react";

function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(() => {
        fetch (`https://cdn.jsdeliver.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
        .then((res) => res.json())
        .then((then) => setData(res[currency]))
        console.log(data);
    }, [currency])

    console.log(data);
    return data

}