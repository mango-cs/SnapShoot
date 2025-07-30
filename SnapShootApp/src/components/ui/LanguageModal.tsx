import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    onClose();
  };

  const languages: Language[] = ['en', 'hi', 'te', 'ta', 'kn'];

  const getLanguageLabel = (lang: Language): string => {
    switch (lang) {
      case 'en': return t('language.english');
      case 'hi': return t('language.hindi');
      case 'te': return t('language.telugu');
      case 'ta': return t('language.tamil');
      case 'kn': return t('language.kannada');
      default: return lang;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background.primary }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              {t('language.selectLanguage')}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={[styles.closeText, { color: theme.colors.text.secondary }]}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.languageList}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageItem,
                  { 
                    backgroundColor: language === lang 
                      ? theme.colors.brand.primary 
                      : theme.colors.background.secondary,
                  },
                ]}
                onPress={() => handleLanguageSelect(lang)}
              >
                <Text style={[
                  styles.languageText,
                  { 
                    color: language === lang 
                      ? theme.colors.background.primary 
                      : theme.colors.text.primary,
                  },
                ]}>
                  {getLanguageLabel(lang)}
                </Text>
                {language === lang && (
                  <Text style={[styles.checkmark, { color: theme.colors.background.primary }]}>
                    ✓
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 