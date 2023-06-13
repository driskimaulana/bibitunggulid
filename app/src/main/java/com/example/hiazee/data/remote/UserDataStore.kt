package com.example.hiazee.data.remote

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import com.example.hiazee.data.remote.models.UserData
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map

class UserDataStore(private val dataStore: DataStore<Preferences>) {

    companion object {
        private val USER_ID = intPreferencesKey("user_id")
        private val FULL_NAME = stringPreferencesKey("full_name")
        private val PHONE = stringPreferencesKey("phone")
        private val EMAIL = stringPreferencesKey("email")
        private val TOKEN = stringPreferencesKey("token")

        @Volatile
        private var INSTANCE: UserDataStore? = null
        fun getInstance(dataStore: DataStore<Preferences>): UserDataStore {
            return INSTANCE ?: synchronized(this) {
                val instance = UserDataStore(dataStore)
                INSTANCE = instance
                instance
            }
        }
    }

    val userDataFlow: Flow<UserData> = dataStore.data
        .catch { exception ->
            // Handle any exception that might occur when reading the data store
            emit(emptyPreferences())
        }
        .map { preferences ->
            val userId = preferences[USER_ID] ?: 0
            val fullName = preferences[FULL_NAME] ?: ""
            val phone = preferences[PHONE] ?: ""
            val email = preferences[EMAIL] ?: ""
            val token = preferences[TOKEN] ?: ""

            UserData(userId, fullName, phone, email, token)
        }

    suspend fun saveUserData(userData: UserData) {
        dataStore.edit { preferences ->
            preferences[USER_ID] = userData.id
            preferences[FULL_NAME] = userData.fullName
            preferences[PHONE] = userData.phone
            preferences[EMAIL] = userData.email
            preferences[TOKEN] = userData.token
        }
    }
}