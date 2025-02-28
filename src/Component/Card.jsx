import "./card.css";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import { useState, useEffect } from "react";

function Card() {
  // states
  // left box
  const [location, setLocation] = useState("haldia");
  const [value, setValue] = useState("");
  const [temp, setTemp] = useState("");
  const [currDate, SetcurrDate] = useState("");
  const [weather, setWeather] = useState("");
  const [currDay, setCurrDay] = useState("");
  const [iconUrl,setIconUrl] = useState("");
  // right box
  const [feelsLike, setFeelsLike] = useState("");
  const [visibility, setVisibility] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [pressure, setPressure] = useState("");
  const [wind, setWind] = useState("");
  const [sunRiseTime, setSunRiseTime] = useState("");
  const [sunSetTime, setSunSetTime] = useState("");

  // api key and url
  const apiId = "931f131dde3f4ae2fcbc3289fc646471";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric%20&appid=${apiId}`;

  // functions
  // today dates
  function getDates(timestamp) {
    // const timestamp ;
    const date = new Date(timestamp * 1000);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  }

  function getDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = weekdayNames[date.getDay()];
    return weekday;
  }

  function getTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const formattedDate = `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  }

  function handleChange(e) {
    setValue(e.target.value);
  }
  function btnHandle() {
    setLocation(value);
  }

  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        console.log("response : ", response.data);
        console.log("image : ", response.data);

        // date
        const timestamp = response.data.dt;
        const dt = getDates(timestamp);
        SetcurrDate(dt);
        // day
        const day = getDay(timestamp);
        setCurrDay(day);

        // temp from kelvin to celsius
        const kelvin = response.data.main.temp;
        const tempincelc = (kelvin - 273.15).toFixed(2);
        setTemp(tempincelc);
        // weather
        setWeather(response.data.weather[0].description);

        // icon url
        const iconCode = response.data.weather[0].icon // This would come from the API
        const iconBaseUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        setIconUrl(iconBaseUrl)

        // feels like
        const feelsLikeTemp = response.data.main.feels_like;
        const FeelsLikeInCelcius = (feelsLikeTemp - 273.15).toFixed(2);
        setFeelsLike(FeelsLikeInCelcius);

        // visibility
        const visible = response.data.visibility;
        const visibilityInKM = visible / 1000; // 10 km
        setVisibility(visibilityInKM);

        // min
        const mintemp = response.data.main.temp_min;
        setMinTemp(mintemp);

        // max
        const maxtemp = response.data.main.temp_max;
        setMaxTemp(maxtemp);

        // pressure
        const press = response.data.main.pressure;
        setPressure(press);

        // humidity
        const Humid = response.data.main.humidity;
        setHumidity(Humid);

        // wind
        const winds = response.data.wind.speed;
        setWind(winds);

        // sunrise
        const riseTime = response.data.sys.sunrise;
        const times = getTime(riseTime);
        setSunRiseTime(times);

        // sunset
        const setTime = response.data.sys.sunset;
        const sunSetTime = getTime(setTime);
        setSunSetTime(sunSetTime);
      })
      .catch(function (error) {
        console.log("error : ", error);
      });
  }, [location]);

  return (
    <>
      <div className="main">
        <div className="card">
          <div className="leftcard">
            <div className="container1">
              <h4 className="current-day">{currDay}</h4>
              <p className="current-date">{currDate}</p>
              <p className="locations">
                <IoLocationSharp />
                {location}
              </p>
            </div>
            <div className="container2">
              <img src={iconUrl} alt="" />
              <p className="temperature">
                {temp}
                <sup>o</sup>C
              </p>
              <p>{weather}</p>
            </div>
          </div>

          <div className="rightcard">
            <div className="locationbox">
              <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Enter Location"
              />
              <button className="btn" onClick={btnHandle}>
                Search
              </button>
            </div>
            <div className="details">
              <p>
                <span>FEELS LIKE</span>
                <span className="units">
                  {feelsLike} <sup>o</sup>C
                </span>
              </p>
              <p>
                <span>VISIBILITY </span>
                <span className="units">{visibility} Km</span>
              </p>
              <p>
                <span>MIN TEMPERATURE</span>
                <span className="units">{minTemp}</span>
              </p>
              <p>
                <span>MAX TEMPERATURE</span>
                <span className="units">{maxTemp}</span>
              </p>
              <p>
                <span>PRESSURE</span>
                <span className="units">{pressure}</span>
              </p>
              <p>
                <span>HUMIDITY</span> <span className="units">{humidity}%</span>
              </p>
              <p>
                <span>WIND SPEED</span>
                <span className="units">{wind}km/h</span>
              </p>
              <p>
                <span>SUNRISE </span>
                <span className="units">{sunRiseTime} AM</span>
              </p>
              <p>
                <span>SUNSET </span>
                <span className="units">{sunSetTime} PM</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
