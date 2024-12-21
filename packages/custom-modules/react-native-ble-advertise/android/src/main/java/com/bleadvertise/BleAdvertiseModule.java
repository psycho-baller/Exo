package com.bleadvertise;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.module.annotations.ReactModule;

import java.util.HashMap;
import java.util.Map;
import java.lang.Object;
import java.util.Hashtable;
import java.util.Set;
import java.util.UUID;
import java.nio.ByteBuffer;


import android.util.Log;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.le.AdvertiseCallback;
import android.bluetooth.le.AdvertiseData;
import android.bluetooth.le.AdvertiseSettings;
import android.bluetooth.le.BluetoothLeAdvertiser;

@ReactModule(name = BleAdvertiseModule.NAME)
public class BleAdvertiseModule extends ReactContextBaseJavaModule {
    public static final String NAME = "BleAdvertise";
    private BluetoothAdapter mBluetoothAdapter;
    private static Hashtable<String, BluetoothLeAdvertiser> mAdvertiserList;
    private static Hashtable<String, AdvertiseCallback> mAdvertiserCallbackList;
    private int companyId;
    private Boolean mObservedState;

    public BleAdvertiseModule(ReactApplicationContext reactContext) {
        super(reactContext);

        mAdvertiserList = new Hashtable<String, BluetoothLeAdvertiser>();
        mAdvertiserCallbackList = new Hashtable<String, AdvertiseCallback>();
        mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if (mBluetoothAdapter != null) {
            mObservedState = mBluetoothAdapter.isEnabled();
        }
        this.companyId = 0x0000;
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("ADVERTISE_MODE_BALANCED", AdvertiseSettings.ADVERTISE_MODE_BALANCED);
        constants.put("ADVERTISE_MODE_LOW_LATENCY", AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY);
        constants.put("ADVERTISE_MODE_LOW_POWER", AdvertiseSettings.ADVERTISE_MODE_LOW_POWER);
        constants.put("ADVERTISE_TX_POWER_HIGH", AdvertiseSettings.ADVERTISE_TX_POWER_HIGH);
        constants.put("ADVERTISE_TX_POWER_LOW", AdvertiseSettings.ADVERTISE_TX_POWER_LOW);
        constants.put("ADVERTISE_TX_POWER_MEDIUM", AdvertiseSettings.ADVERTISE_TX_POWER_MEDIUM);
        constants.put("ADVERTISE_TX_POWER_ULTRA_LOW", AdvertiseSettings.ADVERTISE_TX_POWER_ULTRA_LOW);
        return constants;
    }


    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    public void multiply(double a, double b, Promise promise) {
        promise.resolve(a * b);
    }

    @ReactMethod
    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    @ReactMethod
    public void broadcast(String uid, int major, int minor, String name, String localName, Promise promise) {
        try {
            if (mBluetoothAdapter == null) {
                Log.w("BleAdvertiseModule", "Device does not support Bluetooth. Adapter is Null");
                promise.reject("Device does not support Bluetooth. Adapter is Null");
                return;
            }

            if (companyId == 0x0000) {
                Log.w("BleAdvertiseModule", "Invalid company id");
                promise.reject("Invalid company id");
                return;
            }

            if (mBluetoothAdapter == null) {
                Log.w("BleAdvertiseModule", "mBluetoothAdapter unavailable");
                promise.reject("mBluetoothAdapter unavailable");
                return;
            }

            if (mBluetoothAdapter.isEnabled() == false) {
                Log.w("BleAdvertiseModule", "Bluetooth disabled");
                promise.reject("Bluetooth disabled");
                return;
            }
            Log.w("BleAdvertiseModule", "Broadcast call");
            Log.w("BleAdvertiseModule", "UID: " + uid);
            Log.w("BleAdvertiseModule", "Major: " + major);
            Log.w("BleAdvertiseModule", "Minor: " + minor);
            Log.w("BleAdvertiseModule", "Name: " + name);
            Log.w("BleAdvertiseModule", "Local Name: " + localName);

            BluetoothLeAdvertiser tempAdvertiser;
            AdvertiseCallback tempCallback;

            Log.i("BleAdvertiseModule", "Attempting to start advertising with UID: " + uid);

            // Check if the advertiser already exists
            if (mAdvertiserList.containsKey(uid)) {
                Log.i("BleAdvertiseModule", "Stopping existing advertising for UID: " + uid);
                tempAdvertiser = mAdvertiserList.remove(uid);
                tempCallback = mAdvertiserCallbackList.remove(uid);

                if (tempAdvertiser != null) {
                    tempAdvertiser.stopAdvertising(tempCallback);
                    Log.i("BleAdvertiseModule", "Successfully stopped advertising for UID: " + uid);
                } else {
                    Log.w("BleAdvertiseModule", "Failed to stop advertising: Advertiser not found for UID: " + uid);
                }
            } else {
                Log.i("BleAdvertiseModule", "No existing advertising found for UID: " + uid + ". Creating new advertiser.");
                tempAdvertiser = mBluetoothAdapter.getBluetoothLeAdvertiser();
                tempCallback = new BleAdvertiseModule.SimpleAdvertiseCallback(promise);
            }

            // Check if the advertiser is available
            if (tempAdvertiser == null) {
                Log.w("BleAdvertiseModule", "Advertiser Not Available");
                promise.reject("Advertiser unavailable on this device");
                return;
            } else {
                Log.i("BleAdvertiseModule", "Advertiser is available. Proceeding to set up advertising.");
            }

            // Convert major and minor values to byte arrays
            byte[] majorBytes = intToByteArray(major);
            byte[] minorBytes = intToByteArray(minor);

            // Log the major and minor byte values
            Log.i("BleAdvertiseModule", "Major bytes: " + majorBytes[0] + ", " + majorBytes[1]);
            Log.i("BleAdvertiseModule", "Minor bytes: " + minorBytes[0] + ", " + minorBytes[1]);

            // Prepare the payload
            byte[] payload = new byte[4];
            payload[0] = majorBytes[0];
            payload[1] = majorBytes[1];
            payload[2] = minorBytes[0];
            payload[3] = minorBytes[1];

            // Log the payload data
            Log.i("BleAdvertiseModule", "Payload data: " + bytesToHex(payload));

            // Build advertising settings and data
            AdvertiseSettings settings = buildAdvertiseSettings();
            AdvertiseData data = buildAdvertiseData(uid, payload, name, localName);

            // Start advertising
            Log.i("BleAdvertiseModule", "Starting advertising with settings: " + settings.toString());
            tempAdvertiser.startAdvertising(settings, data, tempCallback);

            // Store the advertiser and callback in the lists
            mAdvertiserList.put(uid, tempAdvertiser);
            mAdvertiserCallbackList.put(uid, tempCallback);
            Log.i("BleAdvertiseModule", "Advertising started successfully for UID: " + uid);
        }
        catch(Exception e) {
           Log.w("BleAdvertiseModule", "Error in broadcast call");
           promise.reject(e);
        }
    }

    public static final byte[] intToByteArray(int value) {
        return new byte[] {
                (byte)(value >>> 8),
                (byte)value};
    }

    private AdvertiseSettings buildAdvertiseSettings() {
        AdvertiseSettings.Builder settingsBuilder = new AdvertiseSettings.Builder();

        //if (options != null && options.hasKey("advertiseMode")) {
        //settingsBuilder.setAdvertiseMode(options.getInt("advertiseMode"));
        //}

        //if (options != null && options.hasKey("txPowerLevel")) {
        //settingsBuilder.setTxPowerLevel(options.getInt("txPowerLevel"));
        //}

        //if (options != null && options.hasKey("connectable")) {
        //settingsBuilder.setConnectable(options.getBoolean("connectable"));
        //}
        settingsBuilder.setAdvertiseMode(AdvertiseSettings.ADVERTISE_MODE_LOW_LATENCY);
        settingsBuilder.setTxPowerLevel(AdvertiseSettings.ADVERTISE_TX_POWER_HIGH);
        return settingsBuilder.build();
    }

    private AdvertiseData buildAdvertiseData(String sUUID, byte[] payload, String name, String localName) {
        Log.i(NAME, "Building advertisement data for UUID: " + sUUID);

        // Convert the UUID to a byte array
        byte[] MYUUID = UnicodeFormatter.getIdAsByte(UUID.fromString(sUUID));
        Log.i(NAME, "Converted UUID to byte array: " + bytesToHex(MYUUID));

        AdvertiseData.Builder dataBuilder = new AdvertiseData.Builder();

        // Allocate space for manufacturer data
        ByteBuffer mManufacturerData = ByteBuffer.allocate(24);
        Log.i(NAME, "Allocated ByteBuffer for manufacturer data with size: " + mManufacturerData.capacity());

        // Add Beacon Identifier
        mManufacturerData.put(0, (byte)0x02); // Beacon Identifier
        mManufacturerData.put(1, (byte)0x15); // Beacon Identifier
        Log.i(NAME, "Added Beacon Identifiers: 0x02 and 0x15");

        // Add UUID to manufacturer data
        for (int i = 2; i < 18; i++) {
            mManufacturerData.put(i, MYUUID[i - 2]); // adding the UUID
        }
        Log.i(NAME, "Added UUID to manufacturer data: " + bytesToHex(mManufacturerData.array()));

        // Add MAJOR and MINOR to manufacturer data
        for (int j = 18; j < 18 + payload.length; j++) {
            mManufacturerData.put(j, payload[j - 18]);  // MAJOR MINOR
        }
        Log.i(NAME, "Added payload (MAJOR and MINOR) to manufacturer data: " + bytesToHex(mManufacturerData.array()));

        // Add Tx power
        mManufacturerData.put(18 + payload.length, (byte)0xC7); // Tx power
        Log.i(NAME, "Added Tx power to manufacturer data: 0xC7");

        // Add name and local name
        mManufacturerData.put(19 + payload.length, (byte)0x09); // Name
        mManufacturerData.put(20 + payload.length, (byte)name.length()); // Name length
        for (int k = 0; k < name.length(); k++) {
            mManufacturerData.put(21 + payload.length + k, (byte)name.charAt(k));  // Name
        }
        mManufacturerData.put(21 + payload.length + name.length(), (byte)0x0A); // Local Name
        mManufacturerData.put(22 + payload.length + name.length(), (byte)localName.length()); // Local Name length
        for (int l = 0; l < localName.length(); l++) {
            mManufacturerData.put(23 + payload.length + name.length() + l, (byte)localName.charAt(l));  // Local Name
        }

        // Add manufacturer data to the data builder
        dataBuilder.addManufacturerData(companyId, mManufacturerData.array());
        Log.i(NAME, "Added manufacturer data to AdvertiseData with company ID: " + companyId);

        // Log the complete advertisement data
        Log.i(NAME, "Complete Advertisement Data: " + bytesToHex(mManufacturerData.array()));
        // 02 15 44 C1 3E 43 09 7A 9C 9F 53 7F 56 66 A6 84 0C 08 04 D2 10 E1 C7 00

        return dataBuilder.build();
    }

    // Helper method to convert byte array to hex string for logging
    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02X ", b));
        }
        return sb.toString();
    }

    @ReactMethod
    public void stopBroadcast(final Promise promise) {
        Log.w("BleAdvertiseModule", "Stop Broadcast call");

        if (mBluetoothAdapter == null) {
            Log.w("BleAdvertiseModule", "mBluetoothAdapter unavailable");
            promise.reject("mBluetoothAdapter unavailable");
            return;
        }

        if (mBluetoothAdapter.isEnabled() == false) {
            Log.w("BleAdvertiseModule", "Bluetooth disabled");
            promise.reject("Bluetooth disabled");
            return;
        }

        WritableArray promiseArray= Arguments.createArray();

        Set<String> keys = mAdvertiserList.keySet();
        for (String key : keys) {
            BluetoothLeAdvertiser tempAdvertiser = mAdvertiserList.remove(key);
            AdvertiseCallback tempCallback = mAdvertiserCallbackList.remove(key);
            if (tempAdvertiser != null) {
                tempAdvertiser.stopAdvertising(tempCallback);
                promiseArray.pushString(key);
            }
        }

        promise.resolve(promiseArray);
    }

    @ReactMethod
    public void enableAdapter() {
        if (mBluetoothAdapter == null) {
            return;
        }

        if (mBluetoothAdapter.getState() != BluetoothAdapter.STATE_ON && mBluetoothAdapter.getState() != BluetoothAdapter.STATE_TURNING_ON) {
            mBluetoothAdapter.enable();
        }
    }

    @ReactMethod
    public void disableAdapter() {
        if (mBluetoothAdapter == null) {
            return;
        }

        if (mBluetoothAdapter.getState() != BluetoothAdapter.STATE_OFF && mBluetoothAdapter.getState() != BluetoothAdapter.STATE_TURNING_OFF) {
            mBluetoothAdapter.disable();
        }
    }

    @ReactMethod
    public void checkIfBLESupported(Promise promise) {
        if (mBluetoothAdapter != null) {
            promise.resolve("80");
        }
        else
        {
            promise.resolve("100");
        }
    }

    private class SimpleAdvertiseCallback extends AdvertiseCallback {
        Promise promise;

        public SimpleAdvertiseCallback () {
        }

        public SimpleAdvertiseCallback (Promise promise) {
            this.promise = promise;
        }

        @Override
        public void onStartFailure(int errorCode) {
            super.onStartFailure(errorCode);
            Log.i(NAME, "Advertising failed with code "+ errorCode);

            if (promise == null) return;

            switch (errorCode) {
                case ADVERTISE_FAILED_FEATURE_UNSUPPORTED:
                    promise.reject("This feature is not supported on this platform.", "This feature is not supported on this platform."); break;
                case ADVERTISE_FAILED_TOO_MANY_ADVERTISERS:
                    promise.reject("Failed to start advertising because no advertising instance is available.", "Failed to start advertising because no advertising instance is available."); break;
                case ADVERTISE_FAILED_ALREADY_STARTED:
                    promise.reject("Failed to start advertising as the advertising is already started.", "Failed to start advertising as the advertising is already started."); break;
                case ADVERTISE_FAILED_DATA_TOO_LARGE:
                    promise.reject("Failed to start advertising as the advertise data to be broadcasted is larger than 31 bytes.", "Failed to start advertising as the advertise data to be broadcasted is larger than 31 bytes."); break;
                case ADVERTISE_FAILED_INTERNAL_ERROR:
                    promise.reject("Operation failed due to an internal error.", "Operation failed due to an internal error."); break;
            }
        }

        @Override
        public void onStartSuccess(AdvertiseSettings settingsInEffect) {
            super.onStartSuccess(settingsInEffect);
            Log.i(NAME, "Advertising successful");

            if (promise == null) return;
            promise.resolve(settingsInEffect.toString());
        }
    }
}
