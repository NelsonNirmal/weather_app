import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

function Main() {
    const [userinput, setUserinput] = useState('salem');
    const [result, setResult] = useState('salem');
    const [temp, setTemp] = useState(null);
    const [weather, setWeather] = useState('');
    const [wind, setWind] = useState(null);
    const [humidity, setHumidity] = useState(null);

    function num() {
        const nu = String(userinput);
        setResult(nu);
    }

    async function meanings() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${result},india&appid=88b4c250dce9d196eed7ff4701c96260`);
            const data = await response.json();
            if (response.ok) {
                setTemp(data.main.temp);
                setHumidity(data.main.humidity);
                setWeather(data.weather[0].main);
                setWind(data.wind.speed);
            } else {
                console.error("Error fetching weather data:", data.message);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    let celcius = temp ? temp - 273.15 : null;
    let imgg = '';

    if (weather === 'rain') {
        imgg = 'https://cdn-icons-png.flaticon.com/512/3767/3767039.png';
    } else if (weather === 'Clouds') {
        imgg = 'https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Cloudy-512.png';
    } else if (weather === 'Clear') {
        imgg = 'https://www.shareicon.net/data/2016/07/22/799894_cloud_512x512.png';
    } else if (weather === 'Mist') {
        imgg = 'https://cdn0.iconfinder.com/data/icons/weather-346/64/fog-weather-mist-512.png';
    } else if (weather === 'Thunderstorm') {
        imgg = 'https://th.bing.com/th/id/R.f34389ddbc4136107b1846fab06c0772?rik=g5jHS0dHuPXsJg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2017%2f03%2fThunderstorm-Transparent.png&ehk=JRKKVrf%2flMC3sKyDuI5B7ZCLoCkVc1zMVfjie%2fxch6I%3d&risl=&pid=ImgRaw&r=0';
    } else if (weather === 'Sunny') {
        imgg = 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-1024.png';
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputCointainer}>
                <TextInput 
                    placeholder='Enter your location' 
                    onChangeText={setUserinput} 
                    style={styles.input} 
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        num();
                        meanings();
                    }}
                >
                    <Text style={styles.buttontitle}>Search</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cointainer2}>
                <Text style={styles.word}>{result}</Text>
                <Image source={{ uri: imgg }} style={styles.img} />
                <Text style={styles.word1}>{celcius !== null ? Math.round(celcius) + '°C' : 'N/A'}</Text>
            </View>
            <View style={styles.cointainer3}>
                <View>
                    <Image 
                        source={{ uri: "https://icon-library.com/images/wind-speed-icon/wind-speed-icon-6.jpg" }} 
                        style={styles.img1} 
                    />
                    <Text style={styles.word3}>{wind !== null ? Math.round(wind) + ' KM/hr' : 'N/A'}</Text>
                </View>
                <View>
                    <Image 
                        source={{ uri: "https://icon-library.com/images/humidity-icon/humidity-icon-17.jpg" }} 
                        style={styles.img1} 
                    />
                    <Text style={styles.word4}>{humidity !== null ? Math.round(humidity) + '%' : 'N/A'}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,  // Ensures content can grow and be scrollable
        alignItems: "center",
        justifyContent: "center",
    
    },
    img: {
        height: 90,
        width: 90,
    },
    img1: {
        height: 70,
        width: 70,
        marginTop: 50,
        marginRight: 80,
        marginLeft: 30,
    },
    word: {
        color: "black",
        padding: 10,
        fontFamily: "monospace",
        fontSize: 40,
        borderRadius: 20,
    },
    word3: {
        color: "black",
        padding: 5,
        fontFamily: "monospace",
        fontSize: 30,
        borderRadius: 20,
        marginRight: 40,
        marginLeft: 20,
    },
    word4: {
        color: "black",
        padding: 5,
        fontFamily: "monospace",
        fontSize: 30,
        borderRadius: 20,
        marginRight: 40,
        marginLeft: 40,
    },
    word1: {
        color: "black",
        padding: 10,
        fontFamily: "monospace",
        fontSize: 70,
        borderRadius: 20,
    },
    cointainer2: {
        height: 300,
        width: 300,
        backgroundColor: 'skyblue',
        marginTop: 30,
        borderRadius: 15,
        alignItems: 'center',
        marginLeft: 20,
    },
    cointainer3: {
        height: 200,
        width: 350,
        backgroundColor: 'skyblue',
        marginTop: 30,
        borderRadius: 15,
        alignItems: 'center',
        marginLeft: 20,
        flexDirection: 'row',
    },
    input: {
        backgroundColor: "rgba(250,250,250,0.3)",
        height: 60,
        width: 270,
        padding: 12,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        marginTop:50,
    },
    button: {
        height: 60,
        width: 40,
        color: "white",
        textAlign: "center",
        marginTop:50,
    },
    buttontitle: {
        color: "white",
        padding: 4,
        textAlign: "center",
        width: 70,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        height: 60,
        backgroundColor: "rgba(250,250,250,0.3)",
        color: "black",
        marginBottom: 100,
        paddingTop: 20,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
    },
    inputCointainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
    },
});

export default Main;
