package com.mobile;

import android.Manifest
import android.R
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.pm.PackageManager
import android.os.Build
import androidx.annotation.RequiresPermission
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class NotificationModule(context: ReactApplicationContext?) : ReactContextBaseJavaModule(context) {
    var notificationChannelId = "MyChannel"

    init {
        createNotificationChannel()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name: CharSequence = "Our channel name"
            val description = "Channel description"
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(notificationChannelId, name, importance)
            channel.description = description
            val notificationManager = reactApplicationContext.getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }
    }

    override fun getName(): String {
        // We will access this module as "Notification" in Javascript
        return "Notification"
    }

    @RequiresPermission(Manifest.permission.POST_NOTIFICATIONS) // notifications need to be allowed in the device
    @ReactMethod // this will allow JS to access this
    fun showNotification(title: String?, content: String?) {
        val builder = NotificationCompat.Builder(reactApplicationContext, notificationChannelId)
            .setSmallIcon(R.drawable.arrow_up_float)
            .setContentTitle(title)
            .setContentText(content)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
        val notificationManager = NotificationManagerCompat.from(reactApplicationContext)
        notificationManager.notify(666, builder.build()) // notificationId and the notification
    }

    @ReactMethod
    fun requestPermissions() {
        val permissions = arrayOf(
            Manifest.permission.POST_NOTIFICATIONS
        )
        val permissionsToRequest = permissions.filter { permission ->
            ContextCompat.checkSelfPermission(reactApplicationContext, permission) != PackageManager.PERMISSION_GRANTED
        }

        if (permissionsToRequest.isNotEmpty()) {
            currentActivity?.let {
                ActivityCompat.requestPermissions(
                    it,
                    permissionsToRequest.toTypedArray(),
                    666 // notificationId
                )
            }
        }
    }
}