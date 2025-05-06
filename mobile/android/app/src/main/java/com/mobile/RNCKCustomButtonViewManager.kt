package com.mobile

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class RNCKCustomButtonViewManager: SimpleViewManager<RNCKCustomButtonModule>() {
    override fun getName(): String {
        return "RNCKCustomButton"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): RNCKCustomButtonModule {
        return RNCKCustomButtonModule(reactContext)
    }

    override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Map<String, Map<String, String>>> {
        return mapOf(
            "onPress" to mapOf(
                "phaseRegistrationNames" to mapOf(
                    "bubbled" to "onPress"
                )
            )
        )
    }

    @ReactProp(name = "disabled")
    fun setEnabled(button: RNCKCustomButtonModule, disabled: Boolean?) {
        button.isEnabled = !disabled!! // why 3 ! ?
    }

    @ReactProp(name = "text")
    fun setText(button: RNCKCustomButtonModule, text: String?) {
        button.text = text
    }
}