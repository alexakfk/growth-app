import React, { useState, useEffect, useId } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";

import { NativeEventEmitter, NativeModules } from "react-native";

/* Permission options */
const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.Workout,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,

    ],
    write: [AppleHealthKit.Constants.Permissions.Steps],
  },
} as HealthKitPermissions;

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log("[ERROR] Cannot grant permissions!");
  }

  /* Can now read or write to HealthKit */
});

export default function HealthScreen() {
  const [authStatus, setAuthStatus] = useState<any>({});

  useEffect(() => { //WHY DO WE EVEN WANT HEALTH DATA? So that we can track patterns in confluence with the patients other behaviors
    const stepCountOptions = {
      date: new Date().toISOString(), // optional; default now
    };

    AppleHealthKit.getStepCount( // STEP COUNT
      stepCountOptions,
      (err: Object, results: HealthValue) => {
        if (err) {
          return;
        }
        console.log(results);
      }
    );

    const heartRateOptions = {
      startDate: new Date(2021, 0, 0).toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
      ascending: false, // optional; default false
      limit: 10, // optional; default no limit
    };

    AppleHealthKit.getHeartRateSamples( //HEART RATE
      heartRateOptions,
      (err: Object, results: Array<HealthValue>) => {
        if (err) {
          return;
        }
        console.log(results);
      }
    );

    let restingHeartRateOptions = {
      startDate: new Date(2021, 0, 0).toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
      ascending: false, // optional; default false
      limit: 10, // optional; default no limit
    }

    AppleHealthKit.getRestingHeartRateSamples( //RESTING HEART RATE
      restingHeartRateOptions,
      (err: Object, results: Array<HealthValue>) => {
        if (err) {
          return
        }
        console.log(results)
      },
    )

    let workoutOptions = {
      startDate: new Date(2021, 0, 0).toISOString(),
      endDate: new Date().toISOString(),
    }

    AppleHealthKit.getSamples(workoutOptions, (err: Object, results: Array<Object>) => {
      if (err) {
        return
      }
      console.log(results)
    })

 
  });

  const handlePressGetAuthStatus = () => {
    AppleHealthKit.getAuthStatus(permissions, (err, result) => {
      if (err) {
        console.error(err);
      }
      setAuthStatus(result);
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                React Native Health Example
              </Text>
              <Text onPress={handlePressGetAuthStatus}>
                Press me to get Auth Status
              </Text>
              <Text style={styles.sectionDescription}>
                {JSON.stringify(authStatus, null, 2)}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});
