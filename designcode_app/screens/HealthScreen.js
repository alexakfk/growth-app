import React, { useState, useEffect } from "react";
import GoogleFit, { Scopes } from 'react-native-google-fit';

const HealthScreen = (navigation) => {

    const [dailySteps, setdailySteps] = useState(0);
    const [heartRate, setHeartRate] = useState(0);
    const [calories, setCalories] = useState(0);
    const [hydration, setHydration] = useState(0);
    const [sleep, setSleep] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bloodPressure, setBloodPressure] = useState({});
    const [loading, setLoading] = useState(true);

    const options = {
        scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_BODY_WRITE,
            Scopes.FITNESS_BLOOD_PRESSURE_READ,
            Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
            Scopes.FITNESS_BLOOD_GLUCOSE_READ,
            Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
            Scopes.FITNESS_NUTRITION_WRITE,
            Scopes.FITNESS_SLEEP_READ,
        ],
    };

    useEffect(() => {
        GoogleFit.checkIsAuthorized().then(() => {
            var authorized = GoogleFit.isAuthorized;
            console.log(authorized);
            if (authorized) {
                // if already authorized, fetch data
            } else {
                // Authentication if already not authorized for a particular device
                GoogleFit.authorize(options)
                    .then(authResult => {
                        if (authResult.success) {
                            console.log('AUTH_SUCCESS');

                            // if successfully authorized, fetch data
                        } else {
                            console.log('AUTH_DENIED ' + authResult.message);
                        }
                    })
                    .catch(() => {
                        dispatch('AUTH_ERROR');
                    });
            }
        });
    })


}

export default HealthScreen