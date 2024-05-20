import { Marker, InfoWindow, APIProvider, Map } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import './style.sass';

const center = {
    lat: -14.235004,
    lng: -51.92528
};

const FullMap = () => {
    const [selectedState, setSelectedState] = useState(null);
    const [covidData, setCovidData] = useState([]);

    const stateCoordinates = {
        'AC': { lat: -8.77, lon: -70.55 },
        'AL': { lat: -9.71, lon: -35.73 },
        'AM': { lat: -3.07, lon: -61.66 },
        'AP': { lat: 1.41, lon: -51.77 },
        'BA': { lat: -12.96, lon: -38.51 },
        'CE': { lat: -3.71, lon: -38.54 },
        'DF': { lat: -15.83, lon: -47.86 },
        'ES': { lat: -19.19, lon: -40.34 }, 
        'GO': { lat: -16.64, lon: -49.31 }, 
        'MA': { lat: -2.55, lon: -44.30 }, 
        'MT': { lat: -12.64, lon: -55.42 }, 
        'MS': { lat: -20.51, lon: -54.54 }
        , 'MG': { lat: -18.10, lon: -44.38 }
        , 'PA': { lat: -5.53, lon: -52.29 }
        , 'PB': { lat: -7.06, lon: -35.55 }
        , 'PR': { lat: -24.89, lon: -51.55 }
        , 'PE': { lat: -8.28, lon: -35.07 }
        , 'PI': { lat: -8.28, lon: -43.68 }
        , 'RJ': { lat: -22.84, lon: -43.15 }
        , 'RN': { lat: -5.22, lon: -36.52 }
        , 'RO': { lat: -11.22, lon: -62.80 }
        , 'RS': { lat: -30.01, lon: -51.22 }
        , 'RR': { lat: 1.89, lon: -61.22 }
        , 'SC': { lat: -27.33, lon: -49.44 }
        , 'SE': { lat: -10.90, lon: -37.07 }
        , 'SP': { lat: -23.55, lon: -46.64 }
        , 'TO': { lat: -10.25, lon: -48.25 }
    };

    useEffect(() => {
        fetch('https://covid19-brazil-api.vercel.app/api/report/v1')
            .then(response => response.json())
            .then(data => {
                const updatedData = data.data.map(state => ({
                    ...state,
                    lat: stateCoordinates[state.uf]?.lat,
                    lng: stateCoordinates[state.uf]?.lon
                }));
                setCovidData(updatedData);
            });

    }, []);

    return (
        <APIProvider apiKey="AIzaSyAaW5aqIFukaq7_CKMXOq69huNei_RqxXs">
            <Map
                className='mapContainer'
                zoom={4}
                center={center}
            >
                {console.log(covidData)}
                {covidData.map(state => (

                    <Marker
                        key={state.uf}
                        position={{ lat: state.lat, lng: state.lng }}
                        onClick={() => setSelectedState(state)}
                    />
                ))
                }

                {selectedState && (
                    <InfoWindow
                        position={{ lat: selectedState.latitude, lng: selectedState.longitude }}
                        onCloseClick={() => setSelectedState(null)}
                    >
                        <div className='infoWindow'>
                            <h2>{selectedState.state}</h2>
                            <p>Casos: {selectedState.cases}</p>
                            <p>Mortes: {selectedState.deaths}</p>
                        </div>
                    </InfoWindow>
                )}
            </Map>
        </APIProvider>
    );
};

export default FullMap;