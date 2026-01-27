import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface GlassCardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    intensity?: number;
    experimentalBlur?: boolean;
}

export function GlassCard({ children, style, intensity, experimentalBlur = true }: GlassCardProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const isDark = colorScheme === 'dark';

    const cardContent = (
        <View style={[
            styles.content,
            {
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
            }
        ]}>
            {children}
        </View>
    );

    return (
        <View style={[styles.container, style]}>
            {experimentalBlur ? (
                <BlurView
                    intensity={intensity ?? (isDark ? 25 : 60)}
                    tint={isDark ? 'dark' : 'light'}
                    style={styles.blur}
                >
                    {cardContent}
                </BlurView>
            ) : (
                cardContent
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.04,
                shadowRadius: 16,
            },
            android: {
                elevation: 0,
                backgroundColor: 'rgba(0,0,0,0.01)',
            }
        })
    },
    blur: {
        width: '100%',
    },
    content: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 24,
    }
});
