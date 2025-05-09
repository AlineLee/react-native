package com.mobile

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class RNCKCustomButtonViewManager: SimpleViewManager<RNCKCustomButton>() {
    override fun getName(): String {
        return "RNCKCustomButton"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RNCKCustomButton {
        return RNCKCustomButton(reactContext)
    }

    override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any>? {
        return mapOf(
            "onPress" to mapOf(
                "phasedRegistrationNames" to mapOf(
                    "bubbled" to "onPress"
                )
            )
        )
    }

    @ReactProp(name = "disabled")
    fun setEnabled(button: RNCKCustomButton, disabled: Boolean?) {
        button.isEnabled = disabled == false
    }

    @ReactProp(name = "text")
    fun setText(button: RNCKCustomButton, text: String?) {
        button.text = text
    }
}