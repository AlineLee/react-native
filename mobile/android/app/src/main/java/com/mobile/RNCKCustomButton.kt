package com.mobile;

import android.content.Context
import android.graphics.Color
import android.view.View
import androidx.appcompat.widget.AppCompatButton
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter

class RNCKCustomButton(context: Context?): AppCompatButton(context!!) {
    init {
        setTextColor(Color.BLUE)
        setOnClickListener { _: View? ->  // set on click listener
            val event = Arguments.createMap() // Create empty map for event data
            event.putString("action", "click") // add entry to event
            val reactContext = getContext() as ReactContext
            reactContext
                .getJSModule(RCTEventEmitter::class.java)
                .receiveEvent(
                    id,  // Id of native view
                    "onPress",  // Event's name
                    event // Event's data
                )
    }
}}