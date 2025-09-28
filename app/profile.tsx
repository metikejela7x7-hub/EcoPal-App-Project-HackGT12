
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import { router } from 'expo-router';
import SimpleBottomSheet from '../components/BottomSheet';
import { useUser } from '../context/UserContext';

export default function ProfileScreen() {
  const { userPoints, userLevel, streak, completedTasks, recentActivities } = useUser();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const totalChallengesCompleted = completedTasks.length + 8;

  const achievements = [
    { id: 1, title: 'First Steps', description: 'Complete your first challenge', icon: '🌱', unlocked: true },
    { id: 2, title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: true },
    { id: 3, title: 'Transport Hero', description: 'Complete 10 transport challenges', icon: '🚲', unlocked: true },
    { id: 4, title: 'Waste Warrior', description: 'Complete 15 waste challenges', icon: '♻️', unlocked: false },
    { id: 5, title: 'Energy Saver', description: 'Complete 20 energy challenges', icon: '⚡', unlocked: false },
    { id: 6, title: 'Water Guardian', description: 'Complete 25 water challenges', icon: '💧', unlocked: false },
  ];

  

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={[commonStyles.spaceBetween, { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[commonStyles.title, { marginBottom: 0 }]}>Profile</Text>
        <TouchableOpacity onPress={() => setIsSettingsVisible(true)}>
          <Icon name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[commonStyles.card, { alignItems: 'center', marginBottom: 20 }]}>
          <View style={{
            width: 100,
            height: 100,
            backgroundColor: colors.primary,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <Text style={{ fontSize: 50 }}>🌱</Text>
          </View>
          <Text style={[commonStyles.title, { marginBottom: 4 }]}>EarthGreen</Text>
          <Text style={[commonStyles.textLight, { marginBottom: 16 }]}>
            Eco Warrior since March 2024
          </Text>
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <View style={[commonStyles.center, { marginHorizontal: 20 }]}>
              <Text style={[commonStyles.title, { fontSize: 24, marginBottom: 0, color: colors.primary }]}>
                {userLevel}
              </Text>
              <Text style={commonStyles.textLight}>Level</Text>
            </View>
            <View style={[commonStyles.center, { marginHorizontal: 20 }]}>
              <Text style={[commonStyles.title, { fontSize: 24, marginBottom: 0, color: colors.success }]}>
                #4
              </Text>
              <Text style={commonStyles.textLight}>Rank</Text>
            </View>
            <View style={[commonStyles.center, { marginHorizontal: 20 }]}>
              <Text style={[commonStyles.title, { fontSize: 24, marginBottom: 0, color: colors.warning }]}>
                {streak}
              </Text>
              <Text style={commonStyles.textLight}>Streak</Text>
            </View>
          </View>
        </View>

        {/* Your Impact */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Your Impact</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <View style={[commonStyles.center, { width: '48%', marginBottom: 16 }]}>
              <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 4, color: colors.success }]}>
                {userPoints.toLocaleString()}
              </Text>
              <Text style={commonStyles.textLight}>Total Points</Text>
            </View>
            <View style={[commonStyles.center, { width: '48%', marginBottom: 16 }]}>
              <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 4, color: colors.primary }]}>
                {totalChallengesCompleted}
              </Text>
              <Text style={commonStyles.textLight}>Challenges</Text>
            </View>
            <View style={[commonStyles.center, { width: '48%' }]}>
              <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 4, color: colors.secondary }]}>
                145 kg {/* CO2 saved*/}
              </Text>
              <Text style={commonStyles.textLight}>CO₂ Saved</Text>
            </View>
            <View style={[commonStyles.center, { width: '48%' }]}>
              <Text style={[commonStyles.title, { fontSize: 20, marginBottom: 4, color: colors.accent }]}>
                8 {/* trees planted*/}
              </Text>
              <Text style={commonStyles.textLight}>Trees Planted</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Achievements</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {achievements.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={[
                  commonStyles.smallCard,
                  {
                    width: '48%',
                    marginBottom: 12,
                    opacity: achievement.unlocked ? 1 : 0.5,
                    backgroundColor: achievement.unlocked ? colors.card : colors.backgroundAlt,
                  }
                ]}
              >
                <View style={commonStyles.center}>
                  <Text style={{ fontSize: 32, marginBottom: 8 }}>{achievement.icon}</Text>
                  <Text style={[commonStyles.text, { fontWeight: '600', fontSize: 14, textAlign: 'center', marginBottom: 4 }]}>
                    {achievement.title}
                  </Text>
                  <Text style={[commonStyles.textLight, { fontSize: 12, textAlign: 'center' }]}>
                    {achievement.description}
                  </Text>
                  {achievement.unlocked && (
                    <Icon name="checkmark-circle" size={16} color={colors.success} style={{ marginTop: 4 }} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={{ marginBottom: 30 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Recent Activities</Text>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={[commonStyles.smallCard, { marginBottom: 8 }]}>
              <View style={commonStyles.spaceBetween}>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 2 }]}>
                    {activity.action}
                  </Text>
                  <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                    {activity.date}
                  </Text>
                </View>
                <Text style={[commonStyles.text, { fontWeight: '600', color: colors.success }]}>
                  +{activity.points}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Settings Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 20, textAlign: 'center' }]}>
            Settings
          </Text>
          
          <TouchableOpacity style={[commonStyles.smallCard, { marginBottom: 12 }]}>
            <View style={commonStyles.row}>
              <Icon name="notifications-outline" size={24} color={colors.text} />
              <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '600' }]}>
                Notifications
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[commonStyles.smallCard, { marginBottom: 12 }]}>
            <View style={commonStyles.row}>
              <Icon name="shield-outline" size={24} color={colors.text} />
              <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '600' }]}>
                Privacy
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[commonStyles.smallCard, { marginBottom: 12 }]}>
            <View style={commonStyles.row}>
              <Icon name="help-circle-outline" size={24} color={colors.text} />
              <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '600' }]}>
                Help & Support
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[commonStyles.smallCard, { marginBottom: 20 }]}>
            <View style={commonStyles.row}>
              <Icon name="information-circle-outline" size={24} color={colors.text} />
              <Text style={[commonStyles.text, { marginLeft: 16, fontWeight: '600' }]}>
                About
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              {
                backgroundColor: colors.primary,
                borderRadius: 25,
                paddingVertical: 12,
                alignItems: 'center',
              }
            ]}
            onPress={() => setIsSettingsVisible(false)}
          >
            <Text style={[commonStyles.text, { fontWeight: '600', color: colors.white }]}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>

      {/* Bottom Navigation */}
      <View style={[commonStyles.bottomTabBar, commonStyles.spaceBetween, { paddingHorizontal: 20 }]}>
        <TouchableOpacity style={commonStyles.center} onPress={() => router.push('/')}>
          <Icon name="home-outline" size={24} color={colors.text} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.center} onPress={() => router.push('/challenges')}>
          <Icon name="trophy-outline" size={24} color={colors.text} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
            Challenges
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.center} onPress={() => router.push('/community')}>
          <Icon name="people-outline" size={24} color={colors.text} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4 }]}>
            Community
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.center} onPress={() => router.push('/profile')}>
          <Icon name="person" size={24} color={colors.primary} />
          <Text style={[commonStyles.textLight, { fontSize: 12, marginTop: 4, color: colors.primary }]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
