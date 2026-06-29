import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  RootStackScreenProps,
  RootStackParamList,
} from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';
import { Heading, Label } from '../../../components/Typography';

type NavigationProp = RootStackScreenProps<
  typeof ROUTES.QUICK_CREATE_TEAM
>['navigation'];
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTES.QUICK_CREATE_TEAM
>;

const QuickCreateTeamScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const { tournamentId } = route.params;

  const [form, setForm] = useState({
    name: '',
    tag: '',
    game: 'VALORANT',
    region: 'NA',
    language: 'English',
  });

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCreate = useCallback(() => {
    // In a real app, this would hit an API and then navigate back or to verification.
    // We'll just pop back to Select Team for this prototype.
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Icon name="arrow-left" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Create Team</Heading>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoPicker}>
          <View style={styles.logoPlaceholder}>
            <Icon name="camera-plus" size={32} color={Colors.text.muted} />
          </View>
          <Label style={styles.logoLabel}>Upload Team Logo</Label>
        </View>

        <View style={styles.formGroup}>
          <Label style={styles.inputLabel}>Team Name</Label>
          <TextInput
            style={styles.input}
            placeholder="e.g. Cloud9"
            placeholderTextColor={Colors.text.muted}
            value={form.name}
            onChangeText={t => setForm({ ...form, name: t })}
          />
        </View>

        <View style={styles.formGroup}>
          <Label style={styles.inputLabel}>Short Tag</Label>
          <TextInput
            style={styles.input}
            placeholder="e.g. C9"
            placeholderTextColor={Colors.text.muted}
            maxLength={4}
            value={form.tag}
            onChangeText={t => setForm({ ...form, tag: t })}
          />
        </View>

        <View style={styles.formGroup}>
          <Label style={styles.inputLabel}>Game</Label>
          <View style={styles.disabledInput}>
            <Label style={styles.disabledText}>{form.game}</Label>
            <Icon name="lock" size={16} color={Colors.text.muted} />
          </View>
        </View>

        <View style={styles.row}>
          <View
            style={[styles.formGroup, { flex: 1, marginRight: Spacing.sm }]}
          >
            <Label style={styles.inputLabel}>Region</Label>
            <TextInput
              style={styles.input}
              value={form.region}
              onChangeText={t => setForm({ ...form, region: t })}
            />
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: Spacing.sm }]}>
            <Label style={styles.inputLabel}>Language</Label>
            <TextInput
              style={styles.input}
              value={form.language}
              onChangeText={t => setForm({ ...form, language: t })}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            (!form.name || !form.tag) && styles.btnDisabled,
          ]}
          activeOpacity={0.8}
          onPress={handleCreate}
          disabled={!form.name || !form.tag}
        >
          <Heading style={styles.btnText}>Create Team</Heading>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backBtn: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: 18,
  },
  placeholder: {
    width: 32,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  logoPicker: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: Radius.lg,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.border,
    borderStyle: 'dashed',
    marginBottom: Spacing.sm,
  },
  logoLabel: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.dark.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 52,
    color: Colors.text.primary,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.border,
  },
  disabledInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.neutral.whiteTransparent.light,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 52,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  disabledText: {
    color: Colors.text.muted,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.border,
  },
  primaryBtn: {
    backgroundColor: Colors.primary.glow,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    backgroundColor: Colors.dark.cardAlt,
    opacity: 0.5,
  },
  btnText: {
    color: Colors.primary.main,
    fontSize: 16,
  },
});

export default QuickCreateTeamScreen;
